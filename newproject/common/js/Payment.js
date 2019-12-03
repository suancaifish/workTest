/*
 * @Desc: 调期微信支付
 * @Author: suancaifish
 * @Date: 2019-11-26 14:30:24
 * @Param: {timeStamp, 时间戳
            nonceStr, 随机字符串
            pack, 数据包package
            paySign  签名
            orderID 订单id
        }
 * @LastEditTime: 2019-11-28 16:20:00
 */
import $http from "@/common/js/http";
import $api from "@/common/js/api";
export default {
    nowPay(obj) {
        let {
            timeStamp,
            nonceStr,
            pack,
            paySign,
            orderID
        } = obj
        return new Promise((resolve, reject) => {
            uni.requestPayment({
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: pack,
                signType: "MD5",
                paySign: paySign,
                success: function (res) {
                    console.log(res);
                    //支付成功验证
                    uni.showLoading({
                        title: "订单更新中",
                        mask: true
                    });

                    $http
                        .get(
                            `${$api.order.checkPay}?orderID=${orderID}`, {
                                "Content-Type": "application/json;charset=UTF-8"
                            }
                        )
                        .then(res => {
                            resolve(res);
                            console.log(res);
                        }).catch(e => {
                            reject(e)
                        });
                },
                fail: function (res) {
                    reject(res)
                    // console.log(res);

                },
                complete: () => {}
            });
        }).catch((e) => { });
    }
   
}