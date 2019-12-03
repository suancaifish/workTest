/**
 * @desc 底层request函数
 * @param option 弹出参数表，
 {
        url : 同微信,
        data : 同微信,
        header : 同微信,
        method : 同微信,
        success : 同微信,
        fail : 同微信,
        complete : 同微信
   }
 * @param callback 回调函数，
 * @date 2018/09/30 09:29:47
 * @author honhaocheng
 */
import util from "./util";
import constant from "./constant";
import $mpweixinUtil from "../../platforms/mp-weixin/util";
function request(option, callback) {
    let ssk = util.getParam("param").session,
        header =  option.header ? option.header : {"content-type": "application/x-www-form-urlencoded"};
    header.version = constant.version;
    header.ssk = ssk;
    option.url = `${option.url}?ssk=${ssk}`;
    let data = option.data ? option.data : {};
    data.ssk = ssk;
    uni.request({
        "url": option.url,
        "data": data,
        "method": option.method ? option.method : "GET",
        "header": header,
        "success": function (response) {
            if (response.data.status == 401 || response.data.code == 403) {
                $mpweixinUtil.loginCode(() => {
                    request(option, callback);
                });
            } else {
                if (response.data.code == 0) {
                    option.success && typeof option.success == "function" && option.success(response);
                } else {
                    option.fail && typeof option.fail == "function" && option.fail(response);
                }
            }
        },
        "fail": function (response) {
            uni.getNetworkType({
                success: function(res) {
                    if(res.networkType=="none"){
                        uni.showModal({title: "请检查网络是否正常"});
                    }
                },
                fail:function () {
                }
            });
        },
        "complete": function (response) {
            option.complete && typeof option.complete == "function" && option.complete(response);
        }
    });
}

function requestPromise(action, method, header, data, complete, callback) {
    if (!data) {
        data = {};
    }
    return new Promise((resolve, reject) => {
        request({
            "url": action,
            "data": data,
            "method": method,
            "header": header,
            "success": function (res) {
                if (res.data.code == 0) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            },
            "fail": function (res) {
                reject(res.data);
            },
            "complete": function () {
                typeof complete == "function" && complete();
            }
        }, callback);
    });
}

function iget(action, param, header, complete, callback) {
    return requestPromise(action, "GET", header, param, complete, callback);
}

function ipost(action, param, header, complete, callback) {
    return requestPromise(action, "POST", header, param, complete, callback);
}

export default {get: iget, post: ipost};
