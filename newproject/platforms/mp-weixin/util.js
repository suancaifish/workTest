import $http from "common/js/http";
import $api from "common/js/api";
import $path from "common/js/path";
import $util from "common/js/util";

export default {
    getUpdataVerSion() {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            // console.log(res.hasUpdate)
        });
        updateManager.onUpdateReady(function () {
            uni.showModal({
                title: '更新提示',
                content: '有新版本的更新哦，是否重启应用？',
                success: function (res) {

                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })

        });
        updateManager.onUpdateFailed(function () {

            // 新的版本下载失败
        });
    },
    judgeAuthority(callback) {
        let authorityFlag = false;
        // 查看是否授权
        uni.getSetting({
            success: function (res) {
                if (res.authSetting["scope.userInfo"]) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    authorityFlag = true;
                } else {
                    authorityFlag = false;
                }
                // console.log(authorityFlag);
                typeof callback == "function" && callback(authorityFlag);
            }
        });
    },
    /**
     * @desc 检测是否登录绑定
     * @date 2019/07/25 17:13:28
     * @author honhaocheng
     */
    checkLogin(obj) {
        let flag = true,
            param = $util.getParam("param"),
            { url, callback } = obj;
        let authorityFlag = $util.getParam("authorityFlag");
        if (!authorityFlag) {
            $util.getPages(obj);
            flag = false;
        } else {
            if (!param || (param && !param.isBind) || (param && param.isBind && !param.hasUnion)) {
                obj.goAuthorityPage = false;
                $util.getPages(obj);
                uni.navigateTo({
                    url: $path.common.signinUrl
                });
                flag = false;
            } else {
                if (obj.url) {
                    if (obj.openType === "reLaunch") {
                        uni.reLaunch({
                            url
                        });
                    } else {
                        uni.navigateTo({
                            url
                        });
                    }
                }
            }
        }
        typeof callback === "function" && callback(flag);
    },
    /**
     * @desc 检测ssk有效性
     * @param fn 传入执行的函数
     * @date 2018/10/19 10:35:15
     * @author honhaocheng
     */
    checkSession(fn) {
        let param = $util.getParam("param"),
            publicFunc = () => {
                typeof fn == "function" && fn();
            };
        uni.checkSession({
            success: () => {
                //session_key 未过期，并且在本生命周期一直有效
                if (param) {
                    $http.get($api.default.checkssk, {ssk: param.session}).then(res => {
                        publicFunc()
                    }, res => {
                        this.loginCode(() => {
                            publicFunc();
                        });
                    });
                } else {
                    this.loginCode(() => {
                        publicFunc();
                    });
                }
            },
            fail: () => {
                // session_key 已经失效，需要重新执行登录流程
                this.loginCode(() => {
                    publicFunc();
                });
            }
        });
    },
    /**
     * @desc 获取ssk参数和绑定状态
     * @param callback 回调函数
     * @date 2018/11/12 10:38:40
     * @author honhaocheng
     */
    loginCode(callback) {
        uni.login({
            success: function (res) {
                // console.log(res);
                let code = res.code;
                //发起网络请求
                code && uni.request({
                    url: $api.default.login,
                    data: {
                        code: code
                    },
                    success: function (res) {
                        // console.log(res);
                        if (res && res.data && res.data.data) {
                            uni.setStorageSync("param", res.data.data);
                            if (typeof callback != "undefined") {
                                callback(res.data.data);
                            }
                        }
                    }
                });

            }
        });
    },
    /**
     * @desc 获取openID和unionID的缓存信息
     * @param obj 用户相关信息对象
     * @param jumpToBindFlag 是否需要跳转绑定
     * @date 2019/07/25 16:30:04
     * @author honhaocheng
     */
    getCacheFunc(obj, jumpToBindFlag = true) {
        let param = $util.getParam("param");
        $http.get($api.user.getCache, {
            ssk: param.session
        }).then(resData => {
            let cacheInfo = resData.data;
            if (!cacheInfo.hasUnionid) {
                this.setUnionIDAndUserInfoFunc(obj, cacheInfo);
            } else if (cacheInfo.hasOpenid && cacheInfo.hasUnionid && jumpToBindFlag) {
                $util.jumpFunc();
            }
        });
    },
    /**
     * @desc 如果已经授权可以自动获取用户信息
     * @param jumpToBindFlag 是否需要跳转绑定
     * @date 2019/07/25 16:29:40
     * @author honhaocheng
     */
    getUserInfoFunc(jumpToBindFlag) {
        let authorityFlag = $util.getParam("authorityFlag");
        // 查看是否授权
        if (authorityFlag) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            uni.getUserInfo({
                success: res => {
                    uni.setStorageSync("userInfo", {nickName: res.userInfo.nickName, avatarUrl: res.userInfo.avatarUrl});
                    this.getCacheFunc(res, jumpToBindFlag);
                }
            });
        }
    },
    /**
     * @desc 设置unionID，老用户直接补全存到数据库，新用户存储到缓存
     * @param obj 用户相关信息对象
     * @param cacheInfo openID和unionID的缓存信息
     * @date 2019/07/25 16:29:12
     * @author honhaocheng
     */
    setUnionIDAndUserInfoFunc(obj, cacheInfo) {
        this.updateParamHasUnionFunc(() => {
            let param = $util.getParam("param");
            // console.log(param);
            // console.log(cacheInfo);
            if (!param.hasUnion && !cacheInfo.hasUnionid) {
                $util.loadingTipModal("处理中...");
                //发起网络请求
                let bindUnionParam = {
                    "ssk": param.session,
                    "userInfo[iv]": obj.iv,
                    "userInfo[encryptedData]": obj.encryptedData
                };
                $http.post($api.user.setUnion, bindUnionParam).then(resData => {
                    if (param.isBind) {
                        param.hasUnion = true;
                        uni.setStorageSync("param", param);
                        $util.jumpFunc();
                        // console.log(param);
                    } else {
                        uni.navigateTo({
                            url: $path.common.signinUrl
                        });
                    }
                }).finally(() => {
                    uni.hideLoading();
                });
            } else {
                $util.jumpFunc();
            }
        });
    },
    /**
     * @desc 更新param中的hasUnion的值
     * @param fn 执行函数
     * @date 2019/07/25 16:28:55
     * @author honhaocheng
     */
    updateParamHasUnionFunc(fn) {
        let param = $util.getParam("param");
        $http.get($api.user.bindInfo, {
            ssk: param.session
        }).then(resData => {
            param.isBind = resData.data.isBind;
            param.hasUnion = resData.data.hasUnionid;
            uni.setStorageSync("param", param);
            typeof fn == "function" && fn();
        });
    }
};
