var _0x586b = ["exports", "string", "constructor", "appVersion", "monitorHttpData", "sampleRate", "silentPage", "function", "isSampled", "isFiltered", "done", "length", "symbol", "getSystemInfoSync", "ios", "message", "object", "time", "App", "userInfo", "setUserInfo", "getSystemInfo", "getLocation", "wgs84", "onUnload", "forEach", "monitorMethodCall", "keys", "error", "info", "request", "dataType", "http", "captureBreadcrumb", "fundebug.notify()的message参数类型必须为string!", "metaData", "prototype", "fundebug.notifyHttpError()必须指定res参数!", "call"];
(function (t, e) {
    var n = function (e) {
        while (--e) {
            t["push"](t["shift"]())
        }
    };
    n(++e)
})(_0x586b, 194);
var _0x275e = function (e, t) {
    e = e - 0;
    var n = _0x586b[e];
    return n
};
module["exports"] = function (n) {
    var r = {};

    function o(e) {
        if (r[e]) return r[e]["exports"];
        var t = r[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return n[e][_0x275e("0x0")](t[_0x275e("0x1")], t, t["exports"], o), t["l"] = !0, t["exports"]
    }
    return o["m"] = n, o["c"] = r, o["d"] = function (e, t, n) {
        o["o"](e, t) || Object["defineProperty"](e, t, {
            enumerable: !0,
            get: n
        })
    }, o["r"] = function (e) {
        "undefined" != typeof Symbol && Symbol["toStringTag"] && Object["defineProperty"](e, Symbol["toStringTag"], {
            value: "Module"
        }), Object["defineProperty"](e, "__esModule", {
            value: !0
        })
    }, o["t"] = function (t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t["__esModule"]) return t;
        var n = Object["create"](null);
        if (o["r"](n), Object["defineProperty"](n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && _0x275e("0x2") != typeof t)
            for (var r in t) o["d"](n, r, function (e) {
                return t[e]
            } ["bind"](null, r));
        return n
    }, o["n"] = function (e) {
        var t = e && e["__esModule"] ? function () {
            return e["default"]
        } : function () {
            return e
        };
        return o["d"](t, "a", t), t
    }, o["o"] = function (e, t) {
        return Object["prototype"]["hasOwnProperty"]["call"](e, t)
    }, o["p"] = "", o(o["s"] = 0)
}([function (e, t, n) {
    var r = n(1),
        o = n(11),
        i = n(12),
        u = n(13),
        a = n(14),
        c = {},
        f = [],
        s = {};
    c["init"] = r(s, f, c), c["test"] = o(s, f, c), c["notify"] = i(s, f, c), c["notifyError"] = u(s, f, c), c["notifyHttpError"] = a(s, f, c), e["exports"] = c
}, function (e, t, n) {
    function o(e) {
        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e[_0x275e("0x3")] === Symbol && e !== Symbol["prototype"] ? "symbol" : typeof e
        })(e)
    }
    var i = n(2),
        u = n(8),
        a = n(9),
        c = n(10),
        f = n(7),
        s = !1;
    e[_0x275e("0x1")] = function (n, e, r) {
        return function (t) {
            if (s = !0, t && "object" === o(t)) {
                ["apikey", _0x275e("0x4"), "releaseStage", "metaData", "filters", "silent", "silentHttpHeader", _0x275e("0x5"), "httpTimeout", "monitorMethodCall", "monitorMethodArguments", "methodWhitelist", "setUserInfo", _0x275e("0x6"), "silentBehavior", "silentApp", _0x275e("0x7"), "callback"]["forEach"](function (e) {
                    n[e] = t[e]
                }), t["silentConsole"] || t["silentBehavior"] || a(e), t["silentInject"] || t["silent"] || (i(n, e, r), u(n, e), t["silentHttp"] || c(n, e, r)), f["getNetworkType"](), t["setSystemInfo"] && f["getSystemInfo"](), t["setLocation"] && f["getLocation"]()
            }
        }
    }, setTimeout(function () {
        !1 === s && console["error"]("请使用fundebug.init(https://docs.fundebug.com/notifier/wxjs/api/init.html)配置apikey!")
    }, 1e3)
}, function (e, t, n) {
    var i = n(3),
        a = n(4),
        c = n(7);
    e["exports"] = function (n, r, o) {
        var u = {},
            e = App;
        u["onLaunch"] = function (e) {
            n.scene = e && e.scene;
            var t = {
                type: _0x275e("0x8"),
                time: (new Date).getTime(),
                belong: "App",
                method: "onLaunch",
                path: e && e.path,
                query: e && e.query,
                scene: e && e.scene
            };
            i.captureBreadcrumb(r, t, n.silentBehavior)
        };
        u["onShow"] = function (e) {
            n.scene = e && e.scene;
            var t = {
                type: "function",
                time: (new Date).getTime(),
                belong: "App",
                method: "onShow",
                path: e && e.path,
                query: e && e.query,
                scene: e && e.scene
            };
            i.captureBreadcrumb(r, t, n.silentBehavior)
        };
        u["onHide"] = function () {
            var e = {
                type: "function",
                time: (new Date).getTime(),
                belong: "App",
                method: "onHide",
                route: n.currentPage && n.currentPage.route,
                options: n.currentPage && n.currentPage.options
            };
            i.captureBreadcrumb(r, e, n.silentBehavior)
        };
        u["onError"] = function (e) {
            if (e) {
                var t = c.getEvent(n, r, o);
                t.error = e, t.type = "uncaught", a.sendToFundebug(t, n.filters, n.sampleRate, n.callback)
            }
        };
        App = function (i) {
            Object["keys"](u)["forEach"](function (e) {
                var t, n, r, o;
                r = u[n = e], o = (t = i)[n], t[n] = function () {
                    try {
                        r["apply"](this, arguments)
                    } catch (e) {
                        console["error"](e)
                    }
                    return o && o["apply"](this, arguments)
                }
            }), e(i)
        }
    }
}, function (e, t) {
    t["captureBreadcrumb"] = function (e, t, n) {
        n || (e["push"](t), 20 < e["length"] && e["shift"]())
    }, t["getCurrentPage"] = function () {
        var e = getCurrentPages();
        if (e["length"]) return e[e["length"] - 1]
    }, t[_0x275e("0x9")] = function (e) {
        return !e && 0 !== e || (e = parseFloat(e), !!isNaN(e) || Math["random"]() <= e)
    }
}, function (e, t, n) {
    var i = n(5),
        u = n(3),
        a = n(6),
        c = 50,
        f = 5;
    t["sendToFundebug"] = function (e, t, n, r) {
        if (e["metaData"] = a["copyWithoutCircle"](e["metaData"]), function (e) {
                if (!e["apikey"]) return void console["error"]("请使用fundebug.init(https://docs.fundebug.com/notifier/wxjs/api/init.html)配置apikey!");
                return !(!c || !f || (c--, f--, 0))
            }(e)) {
            if (r && "function" == typeof r) {
                var o = Object["assign"]({}, e);
                delete o["breadcrumbs"], r(o)
            }
            i[_0x275e("0xa")](e, t) || u["isSampled"](n) && wx["request"]({
                url: "https://fundebug.com/wxjs/",
                method: "POST",
                data: e,
                complete: function () {
                    f++
                }
            })
        }
    }
}, function (e, t) {
    function r(e, t) {
        if (!e) return !1;
        if (!t) return !1;
        if (Object["keys"] && !Object["keys"](t)["length"]) return !1;
        for (var n in t)
            if (t["hasOwnProperty"](n))
                if (t[n]["constructor"] === RegExp) {
                    if (!t[n]["test"](e[n])) return !1
                } else if (t[n]["constructor"] === Object) {
            if (!r(e[n], t[n])) return !1
        } else {
            if (t[n]["constructor"] !== String || "inexistence" !== t[n]) return !1;
            if (e["hasOwnProperty"](n)) return !1
        }
        return !0
    }
    t["isFiltered"] = function (e, t) {
        if (!t || !t["length"]) return !1;
        for (var n = 0; n < t["length"]; n++)
            if (r(e, t[n])) return !0;
        return !1
    }
}, function (e, t) {
    function a(e, t) {
        return function (e) {
            if (Array["isArray"](e)) return e
        }(e) || function (e, t) {
            var n = [],
                r = !0,
                o = !1,
                i = void 0;
            try {
                for (var u, a = e[Symbol["iterator"]](); !(r = (u = a["next"]())[_0x275e("0xb")]) && (n["push"](u["value"]), !t || n[_0x275e("0xc")] !== t); r = !0);
            } catch (e) {
                o = !0, i = e
            } finally {
                try {
                    r || null == a["return"] || a["return"]()
                } finally {
                    if (o) throw i
                }
            }
            return n
        }(e, t) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    function c(e) {
        return (c = _0x275e("0x8") == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e[_0x275e("0x3")] === Symbol && e !== Symbol["prototype"] ? _0x275e("0xd") : typeof e
        })(e)
    }
    var n = !1;
    try {
        var r = wx[_0x275e("0xe")]();
        if (_0x275e("0xf") === r["platform"]) parseInt(r["system"]["match"](/iOS (\d+)\./)[1]) < 11 && (n = !0)
    } catch (e) {
        console["error"](e)
    }
    t["copyWithoutCircle"] = function (e) {
        return e && "object" === c(e) && function (e) {
            try {
                JSON["stringify"](e)
            } catch (e) {
                return -1 !== e[_0x275e("0x10")]["indexOf"]("Converting circular structure to JSON") || -1 !== e["message"]["indexOf"]("JSON.stringify cannot serialize cyclic structures")
            }
            return !1
        }(e) ? n ? {} : function o(t, i) {
            try {
                var u = {};
                return Object["entries"](t)["forEach"](function (e) {
                    var t = a(e, 2),
                        n = t[0],
                        r = t[1];
                    _0x275e("0x11") === c(r) && null !== r ? i["has"](r) ? u[n] = "property removed because of circular structure" : 10 < i["size"] ? u[n] = "property removed to avoid deep recursion" : (i["add"](r), u[n] = o(r, i)) : u[n] = r
                }), u
            } catch (e) {
                return t
            }
        }(e, new Set([e])) : e
    }
}, function (e, t, n) {
    var r = n(3),
        o = n(6),
        i = {};
    i["notifierVersion"] = "1.3.1";
    t["getEvent"] = function (e, t, n) {
        return i["scene"] = e["scene"], i["apikey"] = e["apikey"], i["appVersion"] = e[_0x275e("0x4")], i["releaseStage"] = e["releaseStage"], i["metaData"] = n["metaData"] || e["metaData"], i["breadcrumbs"] = t, i[_0x275e("0x12")] = (new Date)["getTime"](), e["silentApp"] || (i[_0x275e("0x13")] = o["copyWithoutCircle"](getApp())), e["silentPage"] || (i["Page"] = o["copyWithoutCircle"](r["getCurrentPage"]())), i[_0x275e("0x14")] || (n["userInfo"] ? i["userInfo"] = n["userInfo"] : e[_0x275e("0x15")] && wx["getUserInfo"]({
            success: function (e) {
                i["userInfo"] = e["userInfo"]
            }
        })), i
    }, t["getNetworkType"] = function () {
        wx["getNetworkType"]({
            success: function (e) {
                i["networkType"] = e["networkType"]
            }
        })
    }, t[_0x275e("0x16")] = function () {
        wx["getSystemInfo"]({
            success: function (e) {
                i["systemInfo"] = e
            }
        })
    }, t["getLocation"] = function () {
        wx[_0x275e("0x17")]({
            type: _0x275e("0x18"),
            success: function (e) {
                i["locationInfo"] = e
            }
        })
    }
}, function (e, t, n) {
    var a = n(3);
    e["exports"] = function (r, o) {
        var i = ["onLoad", "onShow", "onReady", "onHide", _0x275e("0x19"), "onPullDownRefresh", "onReachBottom", "onShareAppMessage"];

        function n(e, t) {
            var n = e[t];
            e[t] = function () {
                try {
                    "onLoad" !== t && "onShow" !== t || (r["currentPage"] = a["getCurrentPage"]());
                    var e = {};
                    e["type"] = _0x275e("0x8");
                    e["time"] = (new Date).getTime();
                    e["belong"] = "Page";
                    e["method"] = t;
                    e["route"] = r.currentPage && r.currentPage.route;
                    e["options"] = r.currentPage && r.currentPage.options;
                    "onLoad" === t && (e["args"] = arguments), r["monitorMethodArguments"] && !u(i, t) && (e["args"] = arguments),
                        function (e) {
                            var t = r["methodWhitelist"],
                                n = r["methodBlacklist"];
                            if ("onPageScroll" === e) return !1;
                            return t && t[_0x275e("0xc")] ? Boolean(u(t, e)) : !n || !n["length"] || Boolean(!u(n, e))
                        }(t) && a["captureBreadcrumb"](o, e, r["silentBehavior"])
                } catch (e) {
                    console["error"](e)
                }
                return n && n["apply"](this, arguments)
            }
        }
        var e = Page;

        function u(e, t) {
            for (var n = 0; n < e["length"]; n++)
                if (e[n] === t) return !0;
            return !1
        }
        Page = function (t) {
            i[_0x275e("0x1a")](function (e) {
                t[e] && n(t, e)
            }), r[_0x275e("0x1b")] && Object[_0x275e("0x1c")](t)["forEach"](function (e) {
                "function" != typeof t[e] || u(i, e) || n(t, e)
            }), e(t)
        }
    }
}, function (e, t, n) {
    var o = n(3),
        i = n(6);
    e["exports"] = function (r) {
        ["log", _0x275e("0x1d"), _0x275e("0x1e"), "warn"]["forEach"](function (e) {
            var t, n;
            t = e, n = console[t], console[t] = function () {
                try {
                    var e = {};
                    e["type"] = "console";
                    e["time"] = (new Date).getTime();
                    e["method"] = t;
                    e["args"] = i.copyWithoutCircle(arguments);
                    o["captureBreadcrumb"](r, e)
                } catch (e) {
                    console["error"](e)
                }
                _0x275e("0x1d") === t && arguments[0] && /^\[non-writable\] modification of global variable ".+" is not allowed when using plugins at app\.json\.$/ ["test"](arguments[0]) ? (n && n["apply"](this, arguments), console["error"]("当使用小程序插件时，微信禁止Fundebug重写App/Page/wx等全局变量，请使用fundebug.init将silentInject(https://docs.fundebug.com/notifier/wxjs/customize/silentinject.html)设为true，并使用fundebug.notifyError(https://docs.fundebug.com/notifier/wxjs/api/notifyerror.html)上报onError捕获的错误。详情请查看Fundebug文档(https://docs.fundebug.com/notifier/wxjs/other/non_writable.html)")) : n && n["apply"](this, arguments)
            }
        })
    }
}, function (e, t, n) {
    var s = n(3),
        l = n(4),
        p = n(7);
    e["exports"] = function (a, c, f) {
        var e = Object["assign"]({}, wx),
            n = e[_0x275e("0x1f")];

        function r(o, e, i) {
            var u = o[e];
            o[e] = function () {
                try {
                    var e = arguments[0],
                        t = function (e) {
                            var t = {};
                            t["url"] = e.url;
                            t["data"] = e.data;
                            t["header"] = e.header;
                            t["method"] = e.method;
                            t[_0x275e("0x20")] = e.dataType;
                            t["responseType"] = e.responseType;
                            a["silentHttpHeader"] && delete t["header"];
                            a["monitorHttpData"] || delete t["data"];
                            return t
                        }(o),
                        n = (new Date)["getTime"]() - i;
                    ! function (e, t, n) {
                        if (function (e, t) {
                                if (!/^2\d\d$/ ["test"](e)) return !0;
                                var n = a["httpTimeout"];
                                if ("number" == typeof n && n < t) return !0;
                                return !1
                            }(t["statusCode"], n)) {
                            var r = p["getEvent"](a, c, f);
                            r["type"] = "httpError", r["req"] = e, r["res"] = t, r["elapsedTime"] = n, l["sendToFundebug"](r, a["filters"], a["sampleRate"], a["callback"])
                        }
                    }(t, e, n), r = {
                        type: _0x275e("0x21"),
                        time: i,
                        req: t,
                        res: e,
                        elapsedTime: n
                    }, s[_0x275e("0x22")](c, r, a["silentBehavior"])
                } catch (e) {
                    console["error"](e)
                }
                var r;
                return u && u["apply"](this, arguments)
            }
        }
        Object["defineProperty"](e, "request", {
            writable: !0,
            enumerable: !0,
            configurable: !0,
            value: function (e) {
                try {
                    if (e && !/fundebug\.com/ ["test"](e["url"])) {
                        var t = (new Date)["getTime"]();
                        r(e, "success", t), r(e, "fail", t)
                    }
                } catch (e) {
                    console["error"](e)
                }
                return n(e)
            }
        }), wx = e
    }
}, function (e, t, n) {
    var u = n(4),
        a = n(7);
    e["exports"] = function (r, o, i) {
        return function (e, t) {
            try {
                if (r["silent"]) return;
                if (e && "string" != typeof e) return void console[_0x275e("0x1d")]("fundebug.test()的name参数类型必须为string!");
                if (t && "string" != typeof t) return void console["error"]("fundebug.test()的message参数类型必须为string!");
                var n = a["getEvent"](r, o, i);
                n["type"] = "test", n["name"] = e || "Test", n["message"] = t || "Hello, Fundebug!", u["sendToFundebug"](n, r["filters"], r["sampleRate"], r["callback"])
            } catch (e) {
                console["error"](e)
            }
        }
    }
}, function (e, t, n) {
    function a(e) {
        return (a = "function" == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e["constructor"] === Symbol && e !== Symbol["prototype"] ? "symbol" : typeof e
        })(e)
    }
    var c = n(4),
        f = n(7);
    e["exports"] = function (o, i, u) {
        return function (e, t, n) {
            try {
                if (o["silent"]) return;
                if (!e) return void console["error"]("fundebug.notify()必须指定name参数!");
                if ("string" != typeof e) return void console["error"]("fundebug.notify()的name参数类型必须为string!");
                if (t && "string" != typeof t) return void console["error"](_0x275e("0x23"));
                if (n && "object" !== a(n)) return void console[_0x275e("0x1d")]("fundebug.notify()的option参数类型必须为object!");
                var r = f["getEvent"](o, i, u);
                r["type"] = "notification", r["name"] = e, r["message"] = t, n && n["metaData"] && (r[_0x275e("0x24")] = n["metaData"]), c["sendToFundebug"](r, o["filters"], o["sampleRate"], o["callback"])
            } catch (e) {
                console["error"](e)
            }
        }
    }
}, function (e, t, n) {
    function u(e) {
        return (u = "function" == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e["constructor"] === Symbol && e !== Symbol["prototype"] ? "symbol" : typeof e
        })(e)
    }
    var a = n(4),
        c = n(7);
    e[_0x275e("0x1")] = function (r, o, i) {
        return function (e, t) {
            try {
                if (r["silent"]) return;
                if (!e) return void console["error"]("fundebug.notifyError()必须指定error参数!");
                if (t && "object" !== u(t)) return void console["error"]("fundebug.notifyError()的option参数类型必须为object!");
                var n = c["getEvent"](r, o, i);
                e instanceof Error ? n["error"] = {
                    name: e["name"],
                    message: e[_0x275e("0x10")],
                    stack: e["stack"]
                } : n["error"] = e, n["type"] = "caught", t && (t["name"] && (n["name"] = t["name"]), t["metaData"] && (n["metaData"] = t["metaData"])), a["sendToFundebug"](n, r["filters"], r["sampleRate"], r["callback"])
            } catch (e) {
                console["error"](e)
            }
        }
    }
}, function (e, t, n) {
    function a(e) {
        return (a = _0x275e("0x8") == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e[_0x275e("0x3")] === Symbol && e !== Symbol[_0x275e("0x25")] ? "symbol" : typeof e
        })(e)
    }
    var c = n(4),
        f = n(7);
    e["exports"] = function (o, i, u) {
        return function (e, t, n) {
            try {
                if (o["silent"]) return;
                if (!e) return void console["error"]("fundebug.notifyHttpError()必须指定req参数!");
                if (!t) return void console[_0x275e("0x1d")](_0x275e("0x26"));
                if (e && "object" !== a(e)) return void console["error"]("fundebug.notifyHttpError()的req参数类型必须为object!");
                if (t && "object" !== a(t)) return void console["error"]("fundebug.notifyHttpError()的res参数类型必须为object!");
                if (n && "object" !== a(n)) return void console[_0x275e("0x1d")]("fundebug.notifyHttpError()的option参数类型必须为object!");
                var r = f["getEvent"](o, i, u);
                r["type"] = "httpError", r["req"] = e, r["res"] = t, n && n["metaData"] && (r["metaData"] = n["metaData"]), c["sendToFundebug"](r, o["filters"], o["sampleRate"], o["callback"])
            } catch (e) {
                console["error"](e)
            }
        }
    }
}]);