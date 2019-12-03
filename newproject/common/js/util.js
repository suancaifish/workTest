import $path from "common/js/path";
import $mpweixinUtil from "platforms/mp-weixin/util";
import _ from "common/js/underscore-min";
export default {
    formatTime: function (time) {
        if (typeof time !== 'number' || time < 0) {
            return time
        }

        var hour = parseInt(time / 3600)
        time = time % 3600
        var minute = parseInt(time / 60)
        time = time % 60
        var second = time

        return ([hour, minute, second]).map(function (n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }).join(':')
    },
    formatLocation: function (longitude, latitude) {
        if (typeof longitude === 'string' && typeof latitude === 'string') {
            longitude = parseFloat(longitude)
            latitude = parseFloat(latitude)
        }

        longitude = longitude.toFixed(2)
        latitude = latitude.toFixed(2)

        return {
            longitude: longitude.toString().split('.'),
            latitude: latitude.toString().split('.')
        }
    },
    dateUtils: {
        UNITS: {
            '年': 31557600000,
            '月': 2629800000,
            '天': 86400000,
            '小时': 3600000,
            '分钟': 60000,
            '秒': 1000
        },
        humanize: function (milliseconds) {
            var humanize = '';
            for (var key in this.UNITS) {
                if (milliseconds >= this.UNITS[key]) {
                    humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
                    break;
                }
            }
            return humanize || '刚刚';
        },
        format: function (dateStr) {
            var date = this.parse(dateStr)
            var diff = Date.now() - date.getTime();
            if (diff < this.UNITS['天']) {
                return this.humanize(diff);
            }
            var _format = function (number) {
                return (number < 10 ? ('0' + number) : number);
            };
            return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
                _format(date.getHours()) + ':' + _format(date.getMinutes());
        },
        parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
            var a = str.split(/[^0-9]/);
            return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
        }
    },
    stotime(s) {
        //获取长度之后,转化成时间的格式
        let t = "";
        if (s > -1) {
            let hour = Math.floor(s / 3600);
            let min = Math.floor(s / 60) % 60;
            let sec = Math.floor(s % 60);
            if (s >= 3600) {
                if (hour < 10) {
                    t += "0";
                }
                t += hour + ":";
            }
            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec;
        }
        return t;
    },
    activityCountDown(name, currentTime, startTime) {
        let str = "",
            checktime = (i) => {
                if (i < 10) {
                    i = "0" + i;
                }
                else {
                    i = i;
                }
                return i;
            };
        let endtime = new Date(startTime),
            nowtime = new Date(currentTime),
            lefttime = parseInt(endtime.getTime() - nowtime.getTime()),    //这是毫秒，如果再/1000就是秒
            // 获取剩下的日、小时、分钟、秒钟
            // 一天有多少毫秒，一小时有多少毫秒，一分钟有多少毫秒，一秒钟有多少毫秒
            dm = 24 * 60 * 60 * 1000,
            d = parseInt(lefttime / dm),
            hm = 60 * 60 * 1000,
            h = parseInt((lefttime / hm) % 24),
            mm = 60 * 1000,
            m = parseInt((lefttime / mm) % 60),
            s = parseInt((lefttime / 1000) % 60);
        m = checktime(m);
        s = checktime(s);
        str = `距离${name}开始还有${d}天${h}小时${m}分钟${s}秒`;
        if (lefttime < 0) {
            str = `${name}已结束`;
        }
        return str;
    },
    /**
     * description 验证手机号格式是否正确
     * param value 需要判断的值
     */
    isPoneAvailable(value) {
        let myreg = /^[1][3-9][0-9]{9}$/;
        if (!myreg.test(value)) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * @desc 判断是否含有中文字符
     * @param str 字符串
     * @date 2019/10/17 09:39:25
     * @author honhaocheng
     */
    isChinese(str) {
        let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if(reg.test(str)){
            return true;
        } else {
            return false;
        }
    },
    setFunc(vm, target, key, val) {
        if (!target[key]) {
            vm.$set(target, key, val);
        } else {
            target[key] = val;
        }
    },
    delFunc(vm, target, key) {
        if (target[key]) {
            vm.$delete(target, key);
        }
    },
    /**
     * @desc toast简易封装(success)
     * @param txt 提示文本
     * @param ms 毫秒数
     * @param icon 图标类型
     * @date 2019/03/27 16:13:50
     * @author honhaocheng
     */
    toastTipModal(txt, ms = 2000, icon = "success") {
        uni.showToast({
            title: txt,
            icon: icon,
            duration: ms,
            mask: true
        });
    },
    /**
     * @desc toast简易封装(loading)
     * @param txt 提示文本
     * @date 2019/03/27 16:14:53
     * @author honhaocheng
     */
    loadingTipModal(txt) {
        uni.showLoading({
            title: txt,
            mask: true
        });
    },
    /**
     * @desc 获取指定缓存
     * @param key 键值
     * @date 2018/11/12 10:39:11
     * @author honhaocheng
     */
    getParam(key) {
        try {
            return uni.getStorageSync(key);
        } catch (e) {
            // Do something when catch error
        }
    },
    /**
     * description 获取当前页面栈
     */
    getPages(obj) {
        let authorityUrl = $path.common.authorityUrl;
        if (obj && obj.url) {
            uni.setStorageSync("login_pre_page", {
                route: obj.url.slice(1),
                options: obj.options || {},
                openType: obj.openType || "redirectTo"
            });
        } else {
            let pages;
            // 判断当前页面栈，存储上一个页面信息
            if ((pages = getCurrentPages()).length) {
                let r = pages[pages.length - 1];
                r && authorityUrl.slice(1) != r.route && uni.setStorageSync("login_pre_page", _.pick(r, ["route", "options"]));
            }
        }
        if (typeof obj.goAuthorityPage === "undefined") {
            obj.goAuthorityPage = true;
        }
        // 调整至授权页面
        obj.goAuthorityPage && uni.navigateTo({
            url: authorityUrl
        });
    },
    /**
     * description 通用页面栈跳转函数
     */
    jumpFunc() {
        // 获取授权前访问的页面信息，若无直接访问首页
        let t = uni.getStorageSync("login_pre_page"),
            param = this.getParam("param"),
            options = t.options;
        if (param) {
            if (!param.isBind) {
                uni.navigateTo({
                    url: $path.common.signinUrl
                });
            } else {
                if (t && t.route) {
                    uni.removeStorageSync("login_pre_page");
                    if (Object.keys(options).length > 0) {
                        for (let key in options) {
                            t.route += t.route.indexOf("?") == -1 ? `?${key}=${options[key]}` : `&${key}=${options[key]}`;
                        }
                    }
                    //跳转至授权前页面地址
                    if (t.openType) {
                        uni[t.openType]({
                            url: `/${t.route}`
                        });
                    } else {
                        uni.reLaunch({
                            url: `/${t.route}`
                        });
                    }
                } else {
                    uni.reLaunch({
                        url: $path.common.indexUrl
                    });
                }
            }
        } else {
            this.toastTipModal("网络异常，请重试！");
        }

    },
    checkLogin(obj) {
        // #ifdef MP-WEIXIN
        $mpweixinUtil.checkLogin(obj);
        // #endif

        // #ifdef APP-PLUS || H5
        let param = this.getParam("param");
        if (!param) {
            uni.navigateTo({
                url: $path.common.signinUrl
            });
        }
        // #endif
    },
    publicCheckSession(fn, jumpToBindFlag) {
        // #ifdef MP-WEIXIN
        $mpweixinUtil.checkSession(() => {
            let param = this.getParam("param");
            if (!param.isBind && !param.hasUnion) {
                $mpweixinUtil.getUserInfoFunc(jumpToBindFlag);
            } else if (param.isBind && !param.hasUnion) {
                $mpweixinUtil.getUserInfoFunc(jumpToBindFlag);
            }
            typeof fn === "function" && fn();
        });
        // #endif
    },
    //js获取url传过来的参数值
    getQueryStringV(queryString,par) {
        let setting = { name: par, queryString: queryString}
        // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
        if (setting.queryString.indexOf("=") == -1 || setting.queryString.indexOf(setting.name + '=') == -1) {
            return '';
        }
        // 获取链接中参数部分
        var queryString = setting.queryString;
        // 分离参数对 ?key=value&key2=value2
        var parameters = queryString.split("&");
        var pos, paraName, paraValue;
        for (var i = 0; i < parameters.length; i++) {
            // 获取等号位置
            pos = parameters[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            // 获取name 和 value
            paraName = parameters[i].substring(0, pos);
            paraValue = parameters[i].substring(pos + 1);

            if (paraName == setting.name) {
                // return unescape(paraValue.replace(/\+/g, " "));
                return decodeURIComponent(paraValue.replace(/\+/g, " "));
            }
        }
        return '';

    },
    /**
     * @随机字符串
     * @param len
     * @returns {string}
     */
    random_string(len) {
        var len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    /**
     * @时间戳转日期
     * @param data
     * @returns {string}
     */
    toLocaleString(data) {
        return data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + "  " + data.getHours() + ":" + (data.getMinutes() > 10 ? data.getMinutes() : "0" + data.getMinutes()) ;
    },
    /**
     * @desc 查询指定节点的属性
     * @param selector 选择器
     * @param callback 回调函数
     * @date 2018/11/16 14:03:57
     * @author honhaocheng
     */
    queryNodeProperty(selector, callback) {
        if (uni.canIUse("createSelectorQuery")) {
            let query = uni.createSelectorQuery();
            query.select(selector).boundingClientRect(function (res) {
                typeof callback == "function" && callback(res);
            }).exec();
        }
    },
    /**
     * @desc 清除定时器(新)
     * @param vm vue内部this
     * @param timerKeyArr 需要清除的定时器数组
     * @param type 需要清除的定时器类型
     * @date 2019/08/28 17:35:30
     * @author honhaocheng
     */
    clearTimer(vm, timerKeyArr, type = "T") {
        timerKeyArr.forEach(function (key) {
            if (vm[key]) {
                type == "T" ? clearTimeout(vm[key]) : clearInterval(vm[key]);
                vm[key] = null;
            }
        });
    },
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    /**
     * @desc JS过滤HTML标签
     * @param str 需要过滤的字符串
     * @date 2019/09/03 12:04:02
     * @author honhaocheng
     */
    filterHTMLTag(str) {
        // 去除HTML Tag
        str = str.replace(/<\/?[^>]*>/g, "");
        // 去除行尾空格
        str = str.replace(/[|]*\n/, "");
        // 去掉npsp
        str = str.replace(/&nbsp;/ig, "");
        return str;
    },
    /**
     * @desc 复制文本函数
     * @param txt 文本
     * @param fn 执行函数
     * @date 2019/10/21 15:13:23
     * @author honhaocheng
     */
    copyFunc(txt, fn) {
        uni.setClipboardData({
            data: txt,
            success: res => {
                typeof fn === "function" && fn();
                uni.getClipboardData({
                    success: res => {
                        // console.log(res.data) // data
                    }
                })
            }
        });
    },
    /**
     * @desc 获取当前页带参数的url
     * @date 2019/09/03 12:11:57
     * @author honhaocheng
     */
    getCurrentPageUrlWithArgs() {
            // 获取加载的页面
        let pages = getCurrentPages(),
            // 获取当前页面的对象
            currentPage = pages[pages.length - 1],
            // 当前页面url
            url = currentPage.route,
            // 如果要获取url中所带的参数可以查看options
            options = currentPage.options;

        // 拼接url的参数
        let urlWithArgs = url + "?";
        for (let key in options) {
            let value = options[key];
            urlWithArgs += key + "=" + value + "&";
        }
        urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);

        return urlWithArgs;
    },
    /**
     * @desc 通用分享配置函数
     * @param res 转发事件来源对象
     * @date 2019/09/03 13:43:02
     * @author honhaocheng
     */
    shareConfigFunc(res, shareObj) {
        if (res.from === "button") {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return shareObj || {
            title: "威学一百",
            path: $path.common.indexUrl,
            imageUrl: ""
        }
    },
    /**
     * @desc 弹窗动画
     * @param vm vue内部this
     * @param status 区分是显示或关闭弹窗的属性
     * @param animationKey 动画实例key
     * @param setAnimationKey 设置动画实例key
     * @param showModalKey 显示或隐藏弹窗key
     * @date 2019/09/03 14:34:34
     * @author honhaocheng
     */
    modalAnimationFunc(vm, status, animationKey, setAnimationKey, showModalKey) {
        /* 动画部分 */
        // 第1步：创建动画实例
        let animation = uni.createAnimation({
            duration: 300,                  // 动画时长
            timingFunction: "ease-in-out",  // 动画以低速开始和结束
            delay: 0                        // 0则不延迟
        })
        // 第2步：这个动画实例赋给当前的动画实例
        vm[animationKey] = animation;
        // 第3步：执行第一组动画
        animation.opacity(0).scale3d(0, 0, 0).step();
        // 第4步：导出动画对象赋给数据对象储存
        vm[setAnimationKey] = animation.export();
        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(() => {
            // 执行第二组动画
            animation.opacity(1).scale3d(1, 1, 1).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            vm[setAnimationKey] = animation;
            if (status == "close") {
                vm[showModalKey] = false;
            }
        }, 200);
        if (status == "open") {
            vm[showModalKey] = true;
        }
    },
    /**
     * @desc 显示抽屉动画
     * @param vm vue内部this
     * @param status 区分是显示或关闭抽屉的属性
     * @param animationKey 动画实例key
     * @param setAnimationKey 设置动画实例key
     * @param showDrawerKey 显示或隐藏抽屉key
     * @date 2019/10/09 11:35:58
     * @author honhaocheng
     */
    drawerAnimationFunc(vm, status, animationKey, setAnimationKey, showDrawerKey) {
        /* 动画部分 */
        // 第1步：创建动画实例
        let animation = uni.createAnimation({
            duration: 300,                  // 动画时长
            timingFunction: "ease",       // 线性
            delay: 0                        // 0则不延迟
        });
        // 第2步：这个动画实例赋给当前的动画实例
        vm[animationKey] = animation;
        // 第3步：执行第一组动画
        animation.translate3d(0, "100%", 0).step();
        // 第4步：导出动画对象赋给数据对象储存
        vm[setAnimationKey] = animation.export();
        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(() => {
            // 执行第二组动画
            animation.translate3d(0, 0, 0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            vm[setAnimationKey] = animation;
            if (status == "close") {
                vm[showDrawerKey] = false;
            }
        }, 200);
        if (status == "open") {
            vm[showDrawerKey] = true;
        }
    },
    //取消收藏
    delCollect(ssk,id,_this){
        var subParam = {
            ssk: ssk,
            id: id
        };
        // console.log(subParam);
        _this.$http.get(_this.$api.collect.deleteFavorite, subParam).then(res => {

        }).finally(() => {

        });
    },
    //点击图片查看大图
    clickImg(url,index){
        uni.previewImage({
            urls: url, //需要预览的图片http链接列表，注意是数组
            current: url[index], // 当前显示图片的http链接，默认是第一个
            success: function (res) {
            },
            fail: function (res) {
            },
            complete: function (res) {
            },
        });
    },
    /**
     * @desc 设置倒计时
     * @date 2018/11/13 15:07:26
     * @author honhaocheng
     */
    setCountDownTimer(vm, timerKey, TIME_COUNT, callback) {
        if (!vm[timerKey]) {
            let count = TIME_COUNT;
            vm[timerKey] = setInterval(() => {
                if (count > 0 && count <= TIME_COUNT) {
                    count--;
                    typeof callback === "function" && callback({status: "timing", count});
                } else {
                    clearInterval(vm[timerKey]);
                    vm[timerKey] = null;
                    typeof callback === "function" && callback({status: "timeEnd", count: -1});
                }
            }, 1000);
        }
    },
    getPrevPage() {
        let pages = getCurrentPages(),
            prevPage = null;
        if (pages.length > 1) {
            prevPage = pages[pages.length - 2];
        }
        return prevPage;
    }
}
