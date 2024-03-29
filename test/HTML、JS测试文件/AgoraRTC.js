/*! AgoraRTC|BUILD v3.1.0-0-g75afd8f */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("AgoraRTC", [], t) : "object" == typeof exports ? exports.AgoraRTC = t() : e.AgoraRTC = t()
}(window, function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i])
                return t[i].exports;
            var a = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(a.exports, a, a.exports, n),
            a.l = !0,
            a.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var i = Object.create(null);
            if (n.r(i),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var a in e)
                    n.d(i, a, function(t) {
                        return e[t]
                    }
                    .bind(null, a));
            return i
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 36)
    }([function(e, t, n) {
        "use strict";
        n.r(t);
        var i = n(9)
          , a = n.n(i)
          , r = n(12)
          , o = n(3)
          , s = n(2)
          , c = 0
          , d = "free"
          , u = []
          , l = []
          , f = 0;
        setInterval(function() {
            Object(o.getParameter)("UPLOAD_LOG") && p.info("console log upload")
        }, 9e5);
        var p = function() {
            var e, t, n, i, p, g, m = "https://".concat(Object(o.getParameter)("LOG_UPLOAD_SERVER"), "/upload/v1"), v = ["DEBUG", "INFO", "WARNING", "ERROR", "NONE"], S = 0, h = function e(t) {
                d = "uploading",
                setTimeout(function() {
                    !function(e, t, n) {
                        var i;
                        Array.isArray(e) || (e = [e]),
                        e = e.map(function(e) {
                            return {
                                log_item_id: c++,
                                log_level: e.log_level,
                                payload_str: e.payload
                            }
                        }),
                        i = {
                            sdk_version: o.VERSION,
                            process_id: Object(s.a)(),
                            payload: JSON.stringify(e)
                        };
                        try {
                            Object(r.post)(m, i, function(e) {
                                "OK" === e ? t && t(e) : n && n(e)
                            }, function(e) {
                                n && n(e)
                            }, {
                                withCredentials: !0
                            })
                        } catch (e) {
                            n && n(e)
                        }
                    }(t, function() {
                        f = 0,
                        0 !== u.length ? (l = u.length < 10 ? u.splice(0, u.length) : u.splice(0, 10),
                        e(l)) : d = "free"
                    }, function() {
                        setTimeout(function() {
                            e(l)
                        }, f++ < 2 ? 200 : 1e4)
                    })
                }, 3e3)
            };
            t = function() {
                for (var t = [0], n = 0; n < arguments.length; n++)
                    t.push(arguments[n]);
                e.apply(this, t)
            }
            ,
            n = function() {
                for (var t = [1], n = 0; n < arguments.length; n++)
                    t.push(arguments[n]);
                e.apply(this, t)
            }
            ,
            i = function() {
                for (var t = [2], n = 0; n < arguments.length; n++)
                    t.push(arguments[n]);
                e.apply(this, t)
            }
            ,
            p = function() {
                for (var t = [3], n = 0; n < arguments.length; n++)
                    t.push(arguments[n]);
                e.apply(this, t)
            }
            ;
            var _ = {};
            return g = function(e) {
                _[e] || (i.apply(void 0, arguments),
                _[e] = !0)
            }
            ,
            {
                DEBUG: 0,
                INFO: 1,
                WARNING: 2,
                ERROR: 3,
                NONE: 4,
                enableLogUpload: function() {
                    Object(o.setParameter)("UPLOAD_LOG", !0)
                },
                disableLogUpload: function() {
                    Object(o.setParameter)("UPLOAD_LOG", !1)
                },
                setProxyServer: function(e) {
                    m = e ? "https://".concat(e, "/ls/?h=").concat(Object(o.getParameter)("LOG_UPLOAD_SERVER"), "&p=443&d=upload/v1") : "https://".concat(Object(o.getParameter)("LOG_UPLOAD_SERVER"), "/upload/v1")
                },
                setLogLevel: function(e) {
                    e > 4 ? e = 4 : e < 0 && (e = 0),
                    S = e
                },
                log: e = function() {
                    var e, t = arguments[0], n = arguments;
                    if (n[0] = (e = new Date).toTimeString().split(" ")[0] + ":" + e.getMilliseconds() + " Agora-SDK [" + (v[t] || "DEFAULT") + "]:",
                    function(e, t) {
                        if (Object(o.getParameter)("UPLOAD_LOG"))
                            try {
                                t = Array.prototype.slice.call(t);
                                var n = "";
                                t.forEach(function(e) {
                                    "object" === a()(e) && (e = JSON.stringify(e)),
                                    n = n + e + " "
                                }),
                                u.push({
                                    payload: n,
                                    log_level: e
                                }),
                                "free" === d && (l = u.length < 10 ? u.splice(0, u.length) : u.splice(0, 10),
                                h(l))
                            } catch (e) {}
                    }(t, n),
                    !(t < S))
                        switch (t) {
                        case 0:
                        case 1:
                            console.log.apply(console, n);
                            break;
                        case 2:
                            console.warn.apply(console, n);
                            break;
                        case 3:
                            console.log.apply(console, n);
                            break;
                        default:
                            return void console.log.apply(console, n)
                        }
                }
                ,
                debug: t,
                info: n,
                warning: i,
                deprecate: g,
                error: p
            }
        }();
        t.default = p
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "checkValidObject", function() {
            return o
        }),
        n.d(t, "checkValidString", function() {
            return s
        }),
        n.d(t, "checkValidNumber", function() {
            return c
        }),
        n.d(t, "checkValidFloatNumber", function() {
            return d
        }),
        n.d(t, "checkValidBoolean", function() {
            return u
        }),
        n.d(t, "checkValidEnum", function() {
            return r
        }),
        n.d(t, "isValidString", function() {
            return l
        }),
        n.d(t, "isValidNumber", function() {
            return f
        }),
        n.d(t, "isValidBoolean", function() {
            return g
        }),
        n.d(t, "isASCII", function() {
            return S
        }),
        n.d(t, "isInteger", function() {
            return h
        }),
        n.d(t, "isNumber", function() {
            return _
        }),
        n.d(t, "isString", function() {
            return E
        }),
        n.d(t, "isArray", function() {
            return I
        }),
        n.d(t, "isEmpty", function() {
            return T
        }),
        n.d(t, "isValidToken", function() {
            return m
        }),
        n.d(t, "isValidChannelName", function() {
            return v
        });
        var i = n(9)
          , a = n.n(i)
          , r = function(e, t, n) {
            for (var i = 0; i < n.length; i++)
                if (e === n[i])
                    return !0;
            throw new Error("".concat(t, " can only be set as ").concat(JSON.stringify(n)))
        }
          , o = function(e, t) {
            if (!e)
                throw new Error("Invalid param: ".concat(t || "param", " cannot be empty"));
            if ("object" !== a()(e))
                throw new Error("".concat(t || "This paramter", " is of the object type"));
            return !0
        }
          , s = function(e, t, n, i, a) {
            if (T(n) && (n = 1),
            i = i || 255,
            T(a) && (a = !0),
            T(e))
                throw new Error("".concat(t || "param", " cannot be empty"));
            if (!l(e, n, i, a))
                throw new Error("Invalid ".concat(t || "string param", ": Length of the string: [").concat(n, ",").concat(i, "].").concat(a ? " ASCII characters only." : ""))
        }
          , c = function(e, t, n, i) {
            if (T(n) && (n = 1),
            i = i || 1e4,
            T(e))
                throw new Error("".concat(t || "param", " cannot be empty"));
            if (!f(e, n, i))
                throw new Error("Invalid ".concat(t || "number param", ": The value range is [").concat(n, ",").concat(i, "]. integer only"))
        }
          , d = function(e, t, n, i) {
            if (null == e)
                throw new Error("".concat(t || "param", " cannot be null"));
            if (T(n) && (n = 0),
            i = i || 1e4,
            T(e))
                throw new Error("".concat(t || "param", " cannot be empty"));
            if (!p(e, n, i))
                throw new Error("Invalid ".concat(t || "number param", ": The value range is [").concat(n, ",").concat(i, "]."))
        }
          , u = function(e, t) {
            if (T(e))
                throw new Error("".concat(t || "param", " cannot be empty"));
            if (!g(e))
                throw new Error("Invalid ".concat(t || "boolean param", ": The value is of the boolean type."))
        }
          , l = function(e, t, n, i) {
            return t || (t = 0),
            n || (n = Number.MAX_SAFE_INTEGER),
            T(i) && (i = !0),
            E(e) && (!i || S(e)) && e.length >= t && e.length <= n
        }
          , f = function(e, t, n) {
            return h(e) && e >= t && e <= n
        }
          , p = function(e, t, n) {
            return _(e) && e >= t && e <= n
        }
          , g = function(e) {
            return "boolean" == typeof e
        }
          , m = function(e) {
            return l(e, 1, 2047)
        }
          , v = function(e) {
            return E(e) && /^[a-zA-Z0-9 \!\#\$\%\&\(\)\+\-\:\;\<\=\.\>\?\@\[\]\^\_\{\}\|\~\,]{1,64}$/.test(e)
        }
          , S = function(e) {
            if ("string" == typeof e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e.charCodeAt(t);
                    if (n < 0 || n > 255)
                        return !1
                }
                return !0
            }
        }
          , h = function(e) {
            return "number" == typeof e && e % 1 == 0
        }
          , _ = function(e) {
            return "number" == typeof e
        }
          , E = function(e) {
            return "string" == typeof e
        }
          , I = function(e) {
            return e instanceof Array
        }
          , T = function(e) {
            return null == e
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = n(15)
          , a = n.n(i)
          , r = n(6)
          , o = n.n(r)
          , s = n(3)
          , c = n(0)
          , d = n(12)
          , u = n(16)
          , l = n.n(u);
        n.d(t, "b", function() {
            return S
        }),
        n.d(t, "a", function() {
            return v
        });
        var f, p, g = {
            eventType: null,
            sid: null,
            lts: null,
            success: null,
            cname: null,
            uid: null,
            peer: null,
            cid: null,
            elapse: null,
            extend: null,
            vid: 0
        }, m = null, v = function() {
            return m || (m = "process-" + l()(),
            c.default.info("processId: " + m)),
            m
        }, S = (p = 0,
        (f = {
            list: {},
            setProxyServer: function(e) {
                f.proxyServerURL = e
            },
            getUrl: function() {
                return f.proxyServerURL ? "https://".concat(f.proxyServerURL, "/rs/?h=").concat(Object(s.getParameter)("EVENT_REPORT_DOMAIN"), "&p=6443&d=events/message") : "https://".concat(Object(s.getParameter)("EVENT_REPORT_DOMAIN"), ":6443/events/message")
            },
            getBackUrl: function() {
                return f.proxyServerURL ? "https://".concat(f.proxyServerURL, "/rs/?h=").concat(Object(s.getParameter)("EVENT_REPORT_BACKUP_DOMAIN"), "&p=6443&d=events/message") : "https://".concat(Object(s.getParameter)("EVENT_REPORT_BACKUP_DOMAIN"), ":6443/events/message")
            },
            sessionInit: function(e, t) {
                var n = o()({}, g);
                n.startTime = +new Date,
                n.sid = e,
                n.cname = t.cname,
                f.list[e] = n;
                var i = o()({}, {
                    willUploadConsoleLog: Object(s.getParameter)("UPLOAD_LOG")
                }, t.extend)
                  , a = o()({}, n);
                a.eventType = "session_init",
                a.appid = t.appid,
                a.browser = navigator.userAgent,
                a.build = s.BUILD,
                a.lts = +new Date,
                a.elapse = a.lts - a.startTime,
                a.extend = JSON.stringify(i),
                a.mode = t.mode,
                a.process = v(),
                a.success = t.succ,
                a.version = s.VERSION,
                delete a.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.Session",
                    data: a
                }),
                f._flushInvokeReport(e)
            },
            joinChooseServer: function(e, t, n) {
                if (f.list[e]) {
                    t.uid && (f.list[e].uid = parseInt(t.uid)),
                    t.cid && (f.list[e].cid = parseInt(t.cid));
                    var i = o()({}, f.list[e]);
                    i.eventType = "join_choose_server";
                    var a = t.lts;
                    i.lts = Date.now(),
                    i.eventElapse = i.lts - a,
                    i.chooseServerAddr = t.csAddr,
                    i.errorCode = t.ec,
                    i.elapse = i.lts - i.startTime,
                    i.success = t.succ,
                    i.chooseServerAddrList = JSON.stringify(t.serverList),
                    delete i.startTime,
                    f.send({
                        type: "io.agora.pb.Wrtc.JoinChooseServer",
                        data: i
                    })
                }
            },
            reqUserAccount: function(e, t) {
                t.vid && (f.list[e].vid = t.vid);
                var n = o()({}, f.list[e])
                  , i = t.lts;
                n.eventType = "req_user_account",
                n.lts = Date.now(),
                n.success = t.success,
                n.serverAddress = t.serverAddress,
                n.stringUid = t.stringUid,
                n.uid = t.uid,
                n.errorCode = t.errorCode,
                n.elapse = n.lts - n.startTime,
                n.eventElapse = n.lts - i,
                n.extend = "string" == typeof t.extend ? t.extend : JSON.stringify(t.extend),
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.ReqUserAccount",
                    data: n
                })
            },
            joinGateway: function(e, t) {
                t.vid && (f.list[e].vid = t.vid);
                var n = o()({}, f.list[e])
                  , i = t.lts;
                n.eventType = "join_gateway",
                n.lts = Date.now(),
                n.gatewayAddr = t.addr,
                n.success = t.succ,
                n.errorCode = t.ec,
                n.elapse = n.lts - n.startTime,
                n.eventElapse = n.lts - i,
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.JoinGateway",
                    data: n
                })
            },
            publish: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "publish";
                var i = t.lts;
                n.lts = Date.now(),
                n.eventElapse = n.lts - i,
                n.elapse = n.lts - n.startTime,
                n.success = t.succ,
                n.errorCode = t.ec,
                t.videoName && (n.videoName = t.videoName),
                t.audioName && (n.audioName = t.audioName),
                t.screenName && (n.screenName = t.screenName),
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.Publish",
                    data: n
                }),
                f._flushInvokeReport(e)
            },
            subscribe: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "subscribe";
                var i = t.lts;
                n.lts = Date.now(),
                n.eventElapse = n.lts - i,
                n.elapse = n.lts - n.startTime,
                n.errorCode = t.ec,
                n.success = t.succ,
                isFinite(t.peerid) ? n.peer = t.peerid : n.peerSuid = "" + t.peerid,
                "boolean" == typeof t.video && (n.video = t.video),
                "boolean" == typeof t.audio && (n.audio = t.audio),
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.Subscribe",
                    data: n
                }),
                f._flushInvokeReport(e)
            },
            firstRemoteFrame: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "first_remote_frame";
                var i = t.lts;
                n.lts = Date.now(),
                n.eventElapse = n.lts - i,
                n.elapse = n.lts - n.startTime,
                n.width = t.width,
                n.height = t.height,
                n.success = t.succ,
                n.errorCode = t.ec,
                isFinite(t.peerid) ? n.peer = t.peerid : n.peerSuid = "" + t.peerid,
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.FirstFrame",
                    data: n
                })
            },
            firstVideoReceived: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "first_video_received",
                n.lts = Date.now(),
                n.peer = t.peerid,
                n.uid = t.uid,
                n.elapse = t.elapse,
                f.send({
                    type: "io.agora.pb.Wrtc.FirstVideoReceived",
                    data: n
                })
            },
            firstAudioReceived: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "first_audio_received",
                n.lts = Date.now(),
                n.peer = t.peerid,
                n.uid = t.uid,
                n.elapse = t.elapse,
                f.send({
                    type: "io.agora.pb.Wrtc.FirstAudioReceived",
                    data: n
                })
            },
            firstVideoDecode: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "first_video_decode",
                n.lts = Date.now(),
                n.peer = t.peerid,
                n.uid = t.uid,
                n.elapse = t.elapse,
                n.videowidth = t.width,
                n.videoheight = t.height,
                f.send({
                    type: "io.agora.pb.Wrtc.FirstVideoDecode",
                    data: n
                })
            },
            firstAudioDecode: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "first_audio_decode",
                n.lts = Date.now(),
                n.uid = t.uid,
                n.peer = t.peerid,
                n.elapse = t.elapse,
                f.send({
                    type: "io.agora.pb.Wrtc.FirstAudioDecode",
                    data: n
                })
            },
            onAddAudioStream: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "on_add_audio_stream",
                n.lts = Date.now(),
                n.uid = t.uid,
                n.peer = t.peerid,
                f.send({
                    type: "io.agora.pb.Wrtc.OnAddAudioStream",
                    data: n
                })
            },
            onAddVideoStream: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "on_add_video_stream",
                n.lts = Date.now(),
                n.uid = t.uid,
                n.peer = t.peerid,
                f.send({
                    type: "io.agora.pb.Wrtc.OnAddVideoStream",
                    data: n
                })
            },
            onUpdateStream: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "on_update_stream",
                n.lts = Date.now(),
                n.uid = t.uid,
                n.peer = t.peerid,
                n.audio = t.audio,
                n.video = t.video,
                f.send({
                    type: "io.agora.pb.Wrtc.OnUpdateStream",
                    data: n
                })
            },
            onRemoveStream: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "on_remove_stream",
                n.lts = Date.now(),
                n.uid = t.uid,
                n.peer = t.peerid,
                f.send({
                    type: "io.agora.pb.Wrtc.OnRemoveStream",
                    data: n
                })
            },
            streamSwitch: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "stream_switch",
                n.lts = Date.now(),
                n.isDual = t.isdual,
                n.elapse = n.lts - n.startTime,
                n.success = n.succ,
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.StreamSwitch",
                    data: n
                })
            },
            audioSendingStopped: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "audio_sending_stopped",
                n.lts = Date.now(),
                n.elapse = n.lts - n.startTime,
                n.reason = t.reason,
                n.success = t.succ,
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.AudioSendingStopped",
                    data: n
                })
            },
            videoSendingStopped: function(e, t) {
                var n = o()({}, f.list[e]);
                n.eventType = "video_sending_stopped",
                n.lts = Date.now(),
                n.elapse = n.lts - n.startTime,
                n.reson = t.reason,
                n.success = t.succ,
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.VideoSendingStopped",
                    data: n
                })
            },
            requestProxyAppCenter: function(e, t) {
                var n = o()({}, f.list[e])
                  , i = t.lts;
                n.eventType = "request_proxy_appcenter",
                n.lts = Date.now(),
                n.eventElapse = n.lts - i,
                n.elapse = n.lts - n.startTime,
                n.extend = t.extend + "",
                n.APAddr = t.APAddr,
                n.workerManagerList = t.workerManagerList,
                n.response = t.response,
                n.errorCode = t.ec,
                n.success = t.succ,
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.RequestProxyAppCenter",
                    data: n
                })
            },
            requestProxyWorkerManager: function(e, t) {
                var n = o()({}, f.list[e])
                  , i = t.lts;
                n.eventType = "request_proxy_worker_manager",
                n.lts = Date.now(),
                n.eventElapse = n.lts - i,
                n.elapse = n.lts - n.startTime,
                n.extend = t.extend,
                n.workerManagerAddr = t.workerManagerAddr,
                n.response = t.response,
                n.errorCode = t.ec,
                n.success = t.succ,
                delete n.startTime,
                f.send({
                    type: "io.agora.pb.Wrtc.RequestProxyWorkerManager",
                    data: n
                })
            }
        }).reportApiInvoke = function(e, t) {
            var n = t.tag
              , i = t.name
              , r = t.getStates
              , o = t.options
              , d = t.timeout
              , u = void 0 === d ? 6e4 : d
              , l = t.callback
              , f = t.reportResult
              , g = void 0 === f || f
              , m = Date.now()
              , v = 0
              , h = p++
              , _ = function() {
                return a()({
                    tag: n,
                    invokeId: h,
                    sid: e,
                    name: i,
                    apiInvokeTime: m,
                    options: o
                }, r && {
                    states: (t = r(),
                    Object.keys(t).reduce(function(e, n) {
                        var i = e;
                        return null != t[n] && (i[n] = t[n]),
                        i
                    }, {}))
                });
                var t
            }
              , E = !!Object(s.getParameter)("SHOW_REPORT_INVOKER_LOG");
            E && c.default.info("".concat(i, " start"));
            var I = setTimeout(function() {
                S._sendApiInvoke(a()({}, _(), {
                    error: "API_INVOKE_TIMEOUT",
                    success: !1
                }))
            }, u);
            return function(e, t) {
                if (clearTimeout(I),
                ++v > 1 && (e = "EXECUTOR_INVOKE_".concat(v)),
                e)
                    return S._sendApiInvoke(a()({}, _(), {
                        success: !1,
                        error: e
                    }, r && {
                        states: r()
                    })),
                    E && c.default.info("".concat(i, " onFailure"), e),
                    l && l(e);
                S._sendApiInvoke(a()({}, _(), {
                    success: !0
                }, g && {
                    result: t
                }, r && {
                    states: r()
                })),
                E && c.default.info("".concat(i, " onSuccess")),
                l && l(null, t)
            }
        }
        ,
        f._cachedItems = [],
        f._cacheInvokeReport = function(e) {
            e.lts || (e.lts = Date.now()),
            f._cachedItems.push(e),
            f._cachedItems.length > 50 && f._cachedItems.shift()
        }
        ,
        f._flushInvokeReport = function(e) {
            if (f._cachedItems.length) {
                var t = f._cachedItems;
                f._cachedItems = [],
                c.default.debug("Flush cached event reporting:", t.length),
                t.forEach(function(t, n) {
                    t.sid = e,
                    setTimeout(function() {
                        f._sendApiInvoke(t)
                    }, 5e3 + 500 * n)
                })
            }
        }
        ,
        f._sendApiInvoke = function(e) {
            var t = e.tag
              , n = e.invokeId
              , i = e.sid
              , r = e.name
              , o = e.result
              , c = e.states
              , d = e.options
              , u = e.error
              , l = e.success
              , p = e.apiInvokeTime
              , g = e.lts
              , m = Object(s.getParameter)("NOT_REPORT_EVENT");
            if (!(t && m instanceof Array && -1 !== m.indexOf(t)))
                if (f.list[i]) {
                    var v = f.list[i]
                      , S = v.startTime
                      , h = v.cname
                      , _ = v.uid
                      , E = v.cid
                      , I = (g = g || Date.now()) - S
                      , T = g - p
                      , y = "";
                    if (d)
                        try {
                            y = JSON.stringify(d)
                        } catch (e) {
                            y = d.toString()
                        }
                    var b = a()({
                        invokeId: n,
                        sid: i,
                        cname: h,
                        cid: E,
                        lts: g,
                        uid: _,
                        success: l,
                        elapse: I,
                        apiName: r,
                        execElapse: T
                    }, void 0 !== d && {
                        options: y
                    }, void 0 !== c && {
                        execStates: JSON.stringify(c)
                    }, void 0 !== u && {
                        errorCode: JSON.stringify(u)
                    }, void 0 !== o && {
                        execResult: JSON.stringify(o)
                    });
                    f.send({
                        type: "io.agora.pb.Wrtc.ApiInvoke",
                        data: b
                    })
                } else
                    f._cacheInvokeReport(arguments[0])
        }
        ,
        f._send = function(e) {
            try {
                var t = [];
                e && e.data && e.data.apiName ? t.push(["apiName", "" + e.data.apiName]) : e && e.data && e.data.eventType && t.push(["eventType", e.data.eventType]);
                var n = t.map(function(e) {
                    return "".concat(e[0], "=").concat(encodeURIComponent(e[1]))
                }).join("&")
                  , i = f.getUrl();
                i = -1 === f.getUrl().indexOf("?") ? "".concat(i, "?").concat(n) : i,
                Object(d.post)(i, e, null, function(t) {
                    var i = f.getBackUrl();
                    i = -1 === i.indexOf("?") ? "".concat(i, "?").concat(n) : i,
                    Object(d.post)(i, e, null, function(e) {}, {
                        timeout: 1e4
                    })
                }, {
                    timeout: 1e4
                })
            } catch (e) {
                console.error(e)
            }
        }
        ,
        f.sendCache = [],
        f.sendTimer = null,
        f.send = function(e) {
            if (e.data) {
                var t = e.data;
                f._lastLts && f._lastLts >= t.lts && (t.lts = f._lastLts + 1),
                f._lastLts = t.lts
            }
            if (f.sendCache.push(e),
            null === f.sendTimer)
                return function e() {
                    f.sendTimer = setTimeout(function() {
                        if (0 !== f.sendCache.length)
                            return f._send(f.sendCache.shift()),
                            e();
                        f.sendTimer = null
                    }, Object(s.getParameter)("EVENT_REPORT_SEND_INTERVAL"))
                }()
        }
        ,
        f)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.BUILD = "v3.1.0-0-g75afd8f";
        t.VERSION = "3.1.0";
        var i = 0 * Date.now() + 11499 + 86604 + 5615 + 6547 + 846;
        t.SUPPORT_RESOLUTION_LIST = {
            "90p_1": [160, 90, null, null, null, null],
            "120p_1": [160, 120, 15, 15, 30, 65],
            "120p_3": [120, 120, 15, 15, 30, 50],
            "120p_4": [212, 120, null, null, null, null],
            "180p_1": [320, 180, 15, 15, 30, 140],
            "180p_3": [180, 180, 15, 15, 30, 100],
            "180p_4": [240, 180, 15, 15, 30, 120],
            "240p_1": [320, 240, 15, 15, 40, 200],
            "240p_3": [240, 240, 15, 15, 40, 140],
            "240p_4": [424, 240, 15, 15, 40, 220],
            "360p_1": [640, 360, 15, 15, 80, 400],
            "360p_3": [360, 360, 15, 15, 80, 260],
            "360p_4": [640, 360, 30, 30, 80, 600],
            "360p_6": [360, 360, 30, 30, 80, 400],
            "360p_7": [480, 360, 15, 15, 80, 320],
            "360p_8": [480, 360, 30, 30, 80, 490],
            "360p_9": [640, 360, 15, 15, 80, 800],
            "360p_10": [640, 360, 24, 24, 80, 800],
            "360p_11": [640, 360, 24, 24, 80, 1e3],
            "480p_1": [640, 480, 15, 15, 100, 500, 1, 5],
            "480p_2": [640, 480, 30, 30, 100, 1e3, 25, 30],
            "480p_3": [480, 480, 15, 15, 100, 400],
            "480p_4": [640, 480, 30, 30, 100, 750],
            "480p_6": [480, 480, 30, 30, 100, 600],
            "480p_8": [848, 480, 15, 15, 100, 610],
            "480p_9": [848, 480, 30, 30, 100, 930],
            "480p_10": [640, 480, 10, 10, 100, 400],
            "720p_1": [1280, 720, 15, 15, 120, 1130, 1, 5],
            "720p_2": [1280, 720, 30, 30, 120, 2e3, 25, 30],
            "720p_3": [1280, 720, 30, 30, 120, 1710],
            "720p_5": [960, 720, 15, 15, 120, 910],
            "720p_6": [960, 720, 30, 30, 120, 1380],
            "1080p_1": [1920, 1080, 15, 15, 120, 2080, 1, 5],
            "1080p_2": [1920, 1080, 30, 30, 120, 3e3, 25, 30],
            "1080p_3": [1920, 1080, 30, 30, 120, 3150],
            "1080p_5": [1920, 1080, 60, 60, 120, 4780],
            "1440p_1": [2560, 1440, 30, 30, 120, 4850],
            "1440p_2": [2560, 1440, 60, 60, 120, 7350],
            "4k_1": [3840, 2160, 30, 30, 120, 8910],
            "4k_3": [3840, 2160, 60, 60, 120, 13500]
        };
        t.AUDIO_PROFILE_SETTINGS = {
            speech_low_quality: [!1, !1, !0, !0],
            speech_standard: [!1, !1, !0, !1],
            music_standard: [!1, !1, !1, !1],
            standard_stereo: [!1, !0, !1, !1],
            high_quality: [!0, !1, !1, !1],
            high_quality_stereo: [!0, !0, !1, !1],
            default: [!1, !1, !1, !1]
        };
        var a = {
            WEBCS_DOMAIN: ["webrtc2-ap-web-1.agora.io", "webrtc2-ap-web-2.agoraio.cn"],
            WEBCS_DOMAIN_BACKUP_LIST: ["webrtc2-ap-web-3.agora.io", "webrtc2-ap-web-4.agoraio.cn"],
            PROXY_CS: ["ap-proxy-1.agora.io", "ap-proxy-2.agora.io"],
            CDS_AP: ["cds-ap-web-1.agora.io", "cds-ap-web-2.agoraio.cn", "cds-ap-web-3.agora.io", "cds-ap-web-4.agoraio.cn"],
            ACCOUNT_REGISTER: ["sua-ap-web-1.agora.io", "sua-ap-web-2.agoraio.cn", "sua-ap-web-3.agora.io", "sua-ap-web-4.agoraio.cn"],
            UAP_AP: ["uap-ap-web-1.agora.io", "uap-ap-web-2.agoraio.cn", "uap-ap-web-3.agora.io", "uap-ap-web-4.agoraio.cn"],
            ENABLE_LIVE_SERVER_LIST: !1,
            LIVE_SERVER_LIST: [],
            ACCOUNT_REGISTER_RETRY_TIMEOUT: 1,
            ACCOUNT_REGISTER_RETRY_RATIO: 2,
            ACCOUNT_REGISTER_RETRY_TIMEOUT_MAX: 6e4,
            ACCOUNT_REGISTER_RETRY_COUNT_MAX: 1e5,
            AUDIO_CONTEXT: null,
            GATEWAY_DOMAINS: ["edge.agora.io", "edge.agoraio.cn"],
            LOG_UPLOAD_SERVER: "logservice.agora.io",
            EVENT_REPORT_DOMAIN: "webcollector-1.agora.io",
            EVENT_REPORT_BACKUP_DOMAIN: "webcollector-2.agoraio.cn",
            WEBCS_BACKUP_CONNECT_TIMEOUT: 6e3,
            LIVESTREAMING_ALIGN: !0,
            HTTP_CONNECT_TIMEOUT: 5e3,
            PLAYER_STATE_DEFER: 2e3,
            SIGNAL_REQUEST_TIMEOUT: 1e7,
            SIGNAL_REQUEST_WATCH_INTERVAL: 1e3,
            REPORT_STATS: !0,
            REPORT_STATS_TIMEOUT: 3e3,
            UPLOAD_LOG: !1,
            NOT_REPORT_EVENT: [],
            FILEPATH_LENMAX: 255,
            SUBSCRIBE_TCC: !1,
            PING_PONG_TIME_OUT: 10,
            DUALSTREAM_OPERATION_CHECK: !0,
            WEBSOCKET_TIMEOUT_MIN: 1e4,
            EVENT_REPORT_SEND_INTERVAL: 1e3,
            MEDIA_ELEMENT_EXISTS_DEPTH: 3,
            CANDIDATE_TIMEOUT: 2e3,
            SHIM_CANDIDATE: !1,
            LEAVE_MSG_TIMEOUT: 2e3,
            TICKET_RENEW_TIMEOUT: 828e5,
            SHOW_REPORT_INVOKER_LOG: !1,
            STATS_FILTER: {
                transportId: !0,
                googTrackId: !0
            },
            FORCE_TURN: !1,
            TURN_ENABLE_TCP: !0,
            TURN_ENABLE_UDP: !0,
            FORCE_CHANGED_GATEWAY_FLAG: !1,
            JOIN_EXTEND: "",
            PUB_EXTEND: "",
            SUB_EXTEND: "",
            CHROME_NEW_STATS: !1,
            AP_BACKOFF_MAX_TIME: 8,
            SET_DEFAULT_TURNSERVER: !0,
            TURN_SERVER_PASSWORD: i.toString()
        };
        t.setParameter = function(e, t) {
            return void 0 !== a[e] && (a[e] = t,
            !0)
        }
        ;
        t.getParameter = function(e) {
            return void 0 !== a[e] ? a[e] : null
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "APErrorCode", function() {
            return i
        }),
        n.d(t, "GatewayErrorCode", function() {
            return a
        }),
        n.d(t, "StringUidErrorCode", function() {
            return r
        }),
        n.d(t, "JOIN_GS_TRYNEXT_LIST", function() {
            return o
        }),
        n.d(t, "JOIN_CS_RETRY_LIST", function() {
            return s
        }),
        n.d(t, "INJECT_STREAM_STATUS", function() {
            return c
        });
        var i = {
            101100: "NO_FLAG_SET",
            101101: "FLAG_SET_BUT_EMPTY",
            101102: "INVALID_FALG_SET",
            101203: "NO_SERVICE_AVIABLE",
            0: "OK_CODE",
            5: "INVALID_VENDOR_KEY",
            7: "INVALID_CHANNEL_NAME",
            8: "INTERNAL_ERROR",
            9: "NO_AUTHORIZED",
            10: "DYNAMIC_KEY_TIMEOUT",
            11: "NO_ACTIVE_STATUS",
            13: "DYNAMIC_KEY_EXPIRED",
            14: "STATIC_USE_DYANMIC_KEY",
            15: "DYNAMIC_USE_STATIC_KEY",
            1010100: "NO_FLAG_SET",
            1010101: "FLAG_SET_BUT_EMPTY",
            1010102: "INVALID_FALG_SET",
            1010200: "NO_SERVICE_AVAILABLE",
            1010203: "NO_SERVICE_AVAILABLE_WEBRTC",
            1010205: "NO_SERVICE_AVAILABLE_DISPATCHER",
            1010208: "NO_SERVICE_AVAILABLE_APPCENTER",
            1010211: "NO_SERVICE_AVAILABLE_SUA",
            2010005: "INVALID_VENDOR_KEY",
            2010007: "INVALID_CHANNEL_NAME",
            2010008: "INTERNAL_ERROR",
            2010009: "NO_AUTHORIZED",
            2010010: "DYNAMIC_KEY_TIMEOUT",
            2010011: "NO_ACTIVE_STATUS",
            2010013: "DYNAMIC_KEY_EXPIRED",
            2010014: "STATIC_USE_DYANMIC_KEY",
            2010015: "DYNAMIC_USE_STATIC_KEY"
        }
          , a = {
            2000: "ERR_NO_VOCS_AVAILABLE",
            2001: "ERR_NO_VOS_AVAILABLE",
            2002: "ERR_JOIN_CHANNEL_TIMEOUT",
            2003: "WARN_REPEAT_JOIN",
            2004: "ERR_JOIN_BY_MULTI_IP",
            2011: "ERR_NOT_JOINED",
            2012: "WARN_REPEAT_JOIN",
            2013: "ERR_INVALID_VENDOR_KEY",
            2014: "ERR_INVALID_CHANNEL_NAME",
            2015: "ERR_INVALID_STRINGUID",
            2016: "ERR_TOO_MANY_USERS",
            2017: "ERR_SET_CLIENT_ROLE_TIMEOUT",
            2018: "ERR_SET_CLIENT_ROLE_NO_PERMISSION",
            2019: "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE",
            2020: "ERR_PUBLISH_REQUEST_INVALID",
            2021: "ERR_SUBSCRIBE_REQUEST_INVALID",
            2022: "ERR_NOT_SUPPORTED_MESSAGE",
            2023: "ERR_ILLEAGAL_PLUGIN",
            101: "ERR_INVALID_VENDOR_KEY",
            102: "ERR_INVALID_CHANNEL_NAME",
            103: "WARN_NO_AVAILABLE_CHANNEL",
            104: "WARN_LOOKUP_CHANNEL_TIMEOUT",
            105: "WARN_LOOKUP_CHANNEL_REJECTED",
            106: "WARN_OPEN_CHANNEL_TIMEOUT",
            107: "WARN_OPEN_CHANNEL_REJECTED",
            108: "WARN_REQUEST_DEFERRED",
            109: "ERR_DYNAMIC_KEY_TIMEOUT",
            110: "ERR_NO_AUTHORIZED",
            111: "ERR_VOM_SERVICE_UNAVAILABLE",
            112: "ERR_NO_CHANNEL_AVAILABLE_CODE",
            113: "ERR_TOO_MANY_USERS",
            114: "ERR_MASTER_VOCS_UNAVAILABLE",
            115: "ERR_INTERNAL_ERROR",
            116: "ERR_NO_ACTIVE_STATUS",
            117: "ERR_INVALID_UID",
            118: "ERR_DYNAMIC_KEY_EXPIRED",
            119: "ERR_STATIC_USE_DYANMIC_KE",
            120: "ERR_DYNAMIC_USE_STATIC_KE",
            2: "K_TIMESTAMP_EXPIRED",
            3: "K_CHANNEL_PERMISSION_INVALID",
            4: "K_CERTIFICATE_INVALID",
            5: "K_CHANNEL_NAME_EMPTY",
            6: "K_CHANNEL_NOT_FOUND",
            7: "K_TICKET_INVALID",
            8: "K_CHANNEL_CONFLICTED",
            9: "K_SERVICE_NOT_READY",
            10: "K_SERVICE_TOO_HEAVY",
            14: "K_UID_BANNED",
            15: "K_IP_BANNED",
            16: "K_CHANNEL_BANNED"
        }
          , r = {
            1: "ERROR_ILLEAGAL_APPID",
            2: "ERROR_ILLEAGAL_UID",
            3: "INTERNAL_SERVER_ERROR"
        }
          , o = ["ERR_NO_VOCS_AVAILABLE", "ERR_NO_VOS_AVAILABLE", "ERR_JOIN_CHANNEL_TIMEOUT", "WARN_LOOKUP_CHANNEL_TIMEOUT", "WARN_OPEN_CHANNEL_TIMEOUT", "ERR_VOM_SERVICE_UNAVAILABLE", "ERR_TOO_MANY_USERS", "ERR_MASTER_VOCS_UNAVAILABLE", "ERR_INTERNAL_ERROR"]
          , s = ["NO_FLAG_SET", "NO_SERVICE_AVIABLE", "FLAG_SET_BUT_EMPTY", "EMPTY_ADDRESS_RESPONSE"]
          , c = {
            INJECT_STREAM_STATUS_START_SUCCESS: 0,
            INJECT_STREAM_STATUS_START_ALREADY_EXISTS: 1,
            INJECT_STREAM_STATUS_START_UNAUTHORIZED: 2,
            INJECT_STREAM_STATUS_START_TIMEDOUT: 3,
            INJECT_STREAM_STATUS_START_FAILED: 4,
            INJECT_STREAM_STATUS_STOP_SUCCESS: 5,
            INJECT_STREAM_STATUS_STOP_NOT_FOUND: 6,
            INJECT_STREAM_STATUS_STOP_UNAUTHORIZED: 7,
            INJECT_STREAM_STATUS_STOP_TIMEDOUT: 8,
            INJECT_STREAM_STATUS_STOP_FAILED: 9,
            INJECT_STREAM_STATUS_BROKEN: 10
        };
        t.default = {
            FAILED: "FAILED",
            INVALID_KEY: "INVALID_KEY",
            INVALID_CLIENT_MODE: "INVALID_CLIENT_MODE",
            INVALID_CLIENT_CODEC: "INVALID_CLIENT_CODEC",
            CLIENT_MODE_CODEC_MISMATCH: "CLIENT_MODE_CODEC_MISMATCH",
            WEB_API_NOT_SUPPORTED: "WEB_API_NOT_SUPPORTED",
            INVALID_PARAMETER: "INVALID_PARAMETER",
            NO_TRACK_IN_STREAM: "NO_TRACK_IN_STREAM",
            INVALID_OPERATION: "INVALID_OPERATION",
            INVALID_LOCAL_STREAM: "INVALID_LOCAL_STREAM",
            INVALID_REMOTE_STREAM: "INVALID_REMOTE_STREAM",
            INVALID_DYNAMIC_KEY: "INVALID_DYNAMIC_KEY",
            DYNAMIC_KEY_TIMEOUT: "DYNAMIC_KEY_TIMEOUT",
            NO_VOCS_AVAILABLE: "NO_VOCS_AVAILABLE",
            NO_VOS_AVAILABLE: "ERR_NO_VOS_AVAILABLE",
            JOIN_CHANNEL_TIMEOUT: "ERR_JOIN_CHANNEL_TIMEOUT",
            NO_AVAILABLE_CHANNEL: "NO_AVAILABLE_CHANNEL",
            LOOKUP_CHANNEL_TIMEOUT: "LOOKUP_CHANNEL_TIMEOUT",
            LOOKUP_CHANNEL_REJECTED: "LOOKUP_CHANNEL_REJECTED",
            OPEN_CHANNEL_TIMEOUT: "OPEN_CHANNEL_TIMEOUT",
            OPEN_CHANNEL_REJECTED: "OPEN_CHANNEL_REJECTED",
            REQUEST_DEFERRED: "REQUEST_DEFERRED",
            STREAM_ALREADY_PUBLISHED: "STREAM_ALREADY_PUBLISHED",
            STREAM_NOT_YET_PUBLISHED: "STREAM_NOT_YET_PUBLISHED",
            JOIN_TOO_FREQUENT: "JOIN_TOO_FREQUENT",
            SOCKET_ERROR: "SOCKET_ERROR",
            SOCKET_DISCONNECTED: "SOCKET_DISCONNECTED",
            PEERCONNECTION_FAILED: "PEERCONNECTION_FAILED",
            CONNECT_GATEWAY_ERROR: "CONNECT_GATEWAY_ERROR",
            SERVICE_NOT_AVAILABLE: "SERVICE_NOT_AVAILABLE",
            JOIN_CHANNEL_FAILED: "JOIN_CHANNEL_FAILED",
            PUBLISH_STREAM_FAILED: "PUBLISH_STREAM_FAILED",
            UNPUBLISH_STREAM_FAILED: "UNPUBLISH_STREAM_FAILED",
            SUBSCRIBE_STREAM_FAILED: "SUBSCRIBE_STREAM_FAILED",
            UNSUBSCRIBE_STREAM_FAILED: "UNSUBSCRIBE_STREAM_FAILED",
            NO_SUCH_REMOTE_STREAM: "NO_SUCH_REMOTE_STREAM",
            ERR_FAILED: "1",
            ERR_INVALID_VENDOR_KEY: "101",
            ERR_INVALID_CHANNEL_NAME: "102",
            WARN_NO_AVAILABLE_CHANNEL: "103",
            WARN_LOOKUP_CHANNEL_TIMEOUT: "104",
            WARN_LOOKUP_CHANNEL_REJECTED: "105",
            WARN_OPEN_CHANNEL_TIMEOUT: "106",
            WARN_OPEN_CHANNEL_REJECTED: "107",
            WARN_REQUEST_DEFERRED: "108",
            ERR_DYNAMIC_KEY_TIMEOUT: "109",
            ERR_INVALID_DYNAMIC_KEY: "110",
            ERR_NO_VOCS_AVAILABLE: "2000",
            ERR_NO_VOS_AVAILABLE: "2001",
            ERR_JOIN_CHANNEL_TIMEOUT: "2002",
            IOS_NOT_SUPPORT: "IOS_NOT_SUPPORT",
            WECHAT_NOT_SUPPORT: "WECHAT_NOT_SUPPORT",
            SHARING_SCREEN_NOT_SUPPORT: "SHARING_SCREEN_NOT_SUPPORT",
            STILL_ON_PUBLISHING: "STILL_ON_PUBLISHING",
            LOW_STREAM_ALREADY_PUBLISHED: "LOW_STREAM_ALREADY_PUBLISHED",
            LOW_STREAM_NOT_YET_PUBLISHED: "LOW_STREAM_ALREADY_PUBLISHED",
            HIGH_STREAM_NOT_VIDEO_TRACE: "HIGH_STREAM_NOT_VIDEO_TRACE",
            NOT_FIND_DEVICE_BY_LABEL: "NOT_FIND_DEVICE_BY_LABEL",
            ENABLE_DUALSTREAM_FAILED: "ENABLE_DUALSTREAM_FAILED",
            DISABLE_DUALSTREAM_FAILED: "DISABLE_DUALSTREAM_FAILED",
            PLAYER_NOT_FOUND: "PLAYER_NOT_FOUND",
            ELECTRON_NOT_SUPPORT_SHARING_SCREEN: "ELECTRON_NOT_SUPPORT_SHARING_SCREEN",
            BAD_ENVIRONMENT: "BAD_ENVIRONMENT",
            LOAD_AUDIO_FAILED: "LOAD_AUDIO_FAILED"
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "getBrowserInfo", function() {
            return h
        }),
        n.d(t, "getBrowserVersion", function() {
            return f
        }),
        n.d(t, "getBrowserOS", function() {
            return p
        }),
        n.d(t, "isChrome", function() {
            return i
        }),
        n.d(t, "isSafari", function() {
            return a
        }),
        n.d(t, "isFireFox", function() {
            return o
        }),
        n.d(t, "isOpera", function() {
            return s
        }),
        n.d(t, "isEdge", function() {
            return r
        }),
        n.d(t, "isQQBrowser", function() {
            return c
        }),
        n.d(t, "isWeChatBrowser", function() {
            return d
        }),
        n.d(t, "isLegacyChrome", function() {
            return m
        }),
        n.d(t, "isSupportedPC", function() {
            return u
        }),
        n.d(t, "isSupportedMobile", function() {
            return l
        }),
        n.d(t, "getChromeKernelVersion", function() {
            return S
        }),
        n.d(t, "isChromeKernel", function() {
            return g
        });
        var i = function() {
            var e = h();
            return e.name && "Chrome" === e.name
        }
          , a = function() {
            var e = h();
            return e.name && "Safari" === e.name
        }
          , r = function() {
            var e = h();
            return e.name && "Edge" === e.name
        }
          , o = function() {
            var e = h();
            return e.name && "Firefox" === e.name
        }
          , s = function() {
            var e = h();
            return e.name && "OPR" === e.name
        }
          , c = function() {
            var e = h();
            return e.name && "QQBrowser" === e.name
        }
          , d = function() {
            var e = h();
            return e.name && "MicroMessenger" === e.name
        }
          , u = function() {
            var e = p();
            return "Linux" === e || "Mac OS X" === e || "Mac OS" === e || -1 !== e.indexOf("Windows")
        }
          , l = function() {
            var e = p();
            return "Android" === e || "iOS" === e
        }
          , f = function() {
            return h().version
        }
          , p = function() {
            return h().os
        }
          , g = function() {
            return !!navigator.userAgent.match(/chrome\/[\d]./i)
        };
        function m() {
            return window.navigator.appVersion && null !== window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) && window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] <= 35
        }
        var v, S = function() {
            var e = navigator.userAgent.match(/chrome\/[\d]./i);
            return e && e[0] && e[0].split("/")[1]
        }, h = (v = function() {
            var e, t = navigator.userAgent, n = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            "Chrome" === n[1] && null != (e = t.match(/(OPR(?=\/))\/?(\d+)/i)) && (n = e),
            "Safari" === n[1] && null != (e = t.match(/version\/(\d+)/i)) && (n[2] = e[1]),
            ~t.toLowerCase().indexOf("qqbrowser") && null != (e = t.match(/(qqbrowser(?=\/))\/?(\d+)/i)) && (n = e),
            ~t.toLowerCase().indexOf("micromessenger") && null != (e = t.match(/(micromessenger(?=\/))\/?(\d+)/i)) && (n = e),
            ~t.toLowerCase().indexOf("edge") && null != (e = t.match(/(edge(?=\/))\/?(\d+)/i)) && (n = e),
            ~t.toLowerCase().indexOf("trident") && null != (e = /\brv[ :]+(\d+)/g.exec(t) || []) && (n = [null, "IE", e[1]]);
            var i = void 0
              , a = [{
                s: "Windows 10",
                r: /(Windows 10.0|Windows NT 10.0)/
            }, {
                s: "Windows 8.1",
                r: /(Windows 8.1|Windows NT 6.3)/
            }, {
                s: "Windows 8",
                r: /(Windows 8|Windows NT 6.2)/
            }, {
                s: "Windows 7",
                r: /(Windows 7|Windows NT 6.1)/
            }, {
                s: "Windows Vista",
                r: /Windows NT 6.0/
            }, {
                s: "Windows Server 2003",
                r: /Windows NT 5.2/
            }, {
                s: "Windows XP",
                r: /(Windows NT 5.1|Windows XP)/
            }, {
                s: "Windows 2000",
                r: /(Windows NT 5.0|Windows 2000)/
            }, {
                s: "Windows ME",
                r: /(Win 9x 4.90|Windows ME)/
            }, {
                s: "Windows 98",
                r: /(Windows 98|Win98)/
            }, {
                s: "Windows 95",
                r: /(Windows 95|Win95|Windows_95)/
            }, {
                s: "Windows NT 4.0",
                r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
            }, {
                s: "Windows CE",
                r: /Windows CE/
            }, {
                s: "Windows 3.11",
                r: /Win16/
            }, {
                s: "Android",
                r: /Android/
            }, {
                s: "Open BSD",
                r: /OpenBSD/
            }, {
                s: "Sun OS",
                r: /SunOS/
            }, {
                s: "Linux",
                r: /(Linux|X11)/
            }, {
                s: "iOS",
                r: /(iPhone|iPad|iPod)/
            }, {
                s: "Mac OS X",
                r: /Mac OS X/
            }, {
                s: "Mac OS",
                r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
            }, {
                s: "QNX",
                r: /QNX/
            }, {
                s: "UNIX",
                r: /UNIX/
            }, {
                s: "BeOS",
                r: /BeOS/
            }, {
                s: "OS/2",
                r: /OS\/2/
            }, {
                s: "Search Bot",
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }];
            for (var r in a) {
                var o = a[r];
                if (o.r.test(navigator.userAgent)) {
                    i = o.s;
                    break
                }
            }
            return {
                name: n[1],
                version: n[2],
                os: i
            }
        }(),
        function() {
            return v
        }
        )
    }
    , function(e, t) {
        function n() {
            return e.exports = n = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n)
                        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                }
                return e
            }
            ,
            n.apply(this, arguments)
        }
        e.exports = n
    }
    , function(e, t, n) {
        e.exports = n(26)
    }
    , function(e, t, n) {
        "use strict";
        var i, a = this && this.__extends || (i = function(e, t) {
            return (i = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            i(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), r = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))(function(a, r) {
                function o(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function c(e) {
                    e.done ? a(e.value) : new n(function(t) {
                        t(e.value)
                    }
                    ).then(o, s)
                }
                c((i = i.apply(e, t || [])).next())
            }
            )
        }
        , o = this && this.__generator || function(e, t) {
            var n, i, a, r, o = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function s(r) {
                return function(s) {
                    return function(r) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (n = 1,
                                i && (a = 2 & r[0] ? i.return : r[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, r[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (r = [2 & r[0], a.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    a = r;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    i = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(a = (a = o.trys).length > 0 && a[a.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!a || r[1] > a[0] && r[1] < a[3])) {
                                        o.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && o.label < a[1]) {
                                        o.label = a[1],
                                        a = r;
                                        break
                                    }
                                    if (a && o.label < a[2]) {
                                        o.label = a[2],
                                        o.ops.push(r);
                                        break
                                    }
                                    a[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                r = t.call(e, o)
                            } catch (e) {
                                r = [6, e],
                                i = 0
                            } finally {
                                n = a = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, s])
                }
            }
        }
        , s = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = s(n(32))
          , d = n(3)
          , u = s(n(0))
          , l = n(1)
          , f = n(12)
          , p = n(10)
          , g = function(e) {
            function t(t, n) {
                var i = e.call(this) || this;
                return i._state = _.RELAY_STATE_IDLE,
                i._onStatus = function(e) {
                    u.default.debug("[" + i.clientId + "] ChannelMediaStatus: " + JSON.stringify(e)),
                    e && e.command && ("onAudioPacketReceived" === e.command && i.emit("event", h.PACKET_RECEIVED_AUDIO_FROM_SRC),
                    "onVideoPacketReceived" === e.command && i.emit("event", h.PACKET_RECEIVED_VIDEO_FROM_SRC),
                    "onSrcTokenPrivilegeDidExpire" === e.command && (i._state = _.RELAY_STATE_FAILURE,
                    i.emit("state", _.RELAY_STATE_FAILURE, E.SRC_TOKEN_EXPIRED)),
                    "onDestTokenPrivilegeDidExpire" === e.command && (i._state = _.RELAY_STATE_FAILURE,
                    i.emit("state", _.RELAY_STATE_FAILURE, E.DEST_TOKEN_EXPIRED, e.channelName ? {
                        came: e.channelName
                    } : null)))
                }
                ,
                i._onClose = function() {
                    return r(i, void 0, void 0, function() {
                        var e;
                        return o(this, function(t) {
                            switch (t.label) {
                            case 0:
                                if (u.default.debug("[" + this.clientId + "] ChannelMediaSocket onClose"),
                                this.emit("event", h.NETWORK_DISCONNECTED),
                                this.state = _.RELAY_STATE_IDLE,
                                !this._prevChannelMediaConfig)
                                    return [3, 4];
                                t.label = 1;
                            case 1:
                                return t.trys.push([1, 3, , 4]),
                                [4, this.startChannelMediaRelay(this._prevChannelMediaConfig)];
                            case 2:
                                return t.sent(),
                                [3, 4];
                            case 3:
                                return (e = t.sent())instanceof T && (e.message === v.WS_ABORT || e.message === v.AP_REQUEST_ABORT) ? [2] : (this.emit("state", _.RELAY_STATE_FAILURE, E.SERVER_CONNECTION_LOST),
                                [3, 4]);
                            case 4:
                                return [2]
                            }
                        })
                    })
                }
                ,
                i.token = t.appId,
                i.appId = t.appId,
                i.cname = t.cname,
                i.uid = t.uid,
                i.sid = t.sid,
                i.clientId = n,
                i
            }
            return a(t, e),
            Object.defineProperty(t.prototype, "state", {
                get: function() {
                    return this._state
                },
                set: function(e) {
                    var t = this._state;
                    this._state = e,
                    t !== e && this.emit("state", e)
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.startChannelMediaRelay = function(e) {
                return r(this, void 0, void 0, function() {
                    return o(this, function(t) {
                        switch (t.label) {
                        case 0:
                            if (this.state !== _.RELAY_STATE_IDLE)
                                throw new T(v.BAD_STATE);
                            return this.state = _.RELAY_STATE_CONNECTING,
                            [4, this._connect()];
                        case 1:
                            return t.sent(),
                            u.default.debug("[" + this.clientId + "] startChannelMediaRelay: connect success"),
                            [4, this._sendStartRelayMessage(e)];
                        case 2:
                            return t.sent(),
                            this._prevChannelMediaConfig = e,
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype.updateChannelMediaRelay = function(e) {
                return r(this, void 0, void 0, function() {
                    return o(this, function(t) {
                        switch (t.label) {
                        case 0:
                            if (this.state !== _.RELAY_STATE_RUNNING)
                                throw new T(v.BAD_STATE);
                            return [4, this._sendUpdateMessage(e)];
                        case 1:
                            return t.sent(),
                            this._prevChannelMediaConfig = e,
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype.stopChannelMediaRelay = function() {
                return r(this, void 0, void 0, function() {
                    return o(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return [4, this._sendStopRelayMessage()];
                        case 1:
                            return e.sent(),
                            u.default.debug("[" + this.clientId + "] stopChannelMediaRelay: send stop message success"),
                            this.state = _.RELAY_STATE_IDLE,
                            this.dispose(),
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype.dispose = function() {
                u.default.debug("[" + this.clientId + "] disposeChannelMediaRelay"),
                this.state = _.RELAY_STATE_IDLE,
                this.emit("dispose"),
                this._signal && this._signal.dispose(),
                this._prevChannelMediaConfig = null,
                this.removeEvent()
            }
            ,
            t.prototype._requestOneAP = function(e) {
                var t = this;
                return new Promise(function(n, i) {
                    var a = {
                        command: "convergeAllocateEdge",
                        sid: t.sid,
                        appId: t.appId,
                        token: "",
                        ts: +new Date,
                        version: d.VERSION,
                        cname: t.cname,
                        uid: t.uid + "",
                        seq: 1,
                        requestId: 1
                    }
                      , r = {
                        service_name: "tele_channel",
                        json_body: JSON.stringify(a)
                    }
                      , o = "https://" + e;
                    f.post(o, r, function(e) {
                        var t = null
                          , a = null;
                        try {
                            t = JSON.parse(e)
                        } catch (e) {
                            i(new T(v.AP_JSON_PARSE_ERROR,e))
                        }
                        0 !== t.code && i(new T(v.AP_REQUEST_ERROR,t));
                        try {
                            a = JSON.parse(t.json_body)
                        } catch (e) {
                            i(new T(v.AP_JSON_PARSE_ERROR,e))
                        }
                        200 !== a.code && i(new T(v.AP_REQUEST_ERROR,a)),
                        a.servers ? n(a.servers) : i(new T(v.AP_JSON_PARSE_ERROR,a))
                    }, function(e) {
                        return i(e)
                    }, {
                        "X-Packet-Service-Type": 0,
                        "X-Packet-URI": 61
                    })
                }
                )
            }
            ,
            t.prototype._requestAP = function() {
                var e = this
                  , t = d.getParameter("UAP_AP");
                return new Promise(function(n, i) {
                    setTimeout(function() {
                        i(new T(v.AP_REQUEST_TIMEOUT))
                    }, 3e3),
                    e.on("dispose", function() {
                        i(new T(v.AP_REQUEST_ABORT))
                    }),
                    t.forEach(function(t) {
                        t += "/api/v1",
                        e._requestOneAP(t).then(function(i) {
                            u.default.debug("[" + e.clientId + "] startChannelMediaRelay request AP " + t + " success: " + JSON.stringify(i));
                            var a = i[0]
                              , r = "wss://" + a.address.replace(/\./g, "-") + ".edge.agora.io:" + a.wss;
                            n(r)
                        }).catch(function(n) {
                            u.default.debug("[" + e.clientId + "] startChannelMediaRelay request AP " + t + " failed: " + JSON.stringify(n))
                        })
                    })
                }
                )
            }
            ,
            t.prototype._connectWebsocket = function(e) {
                return this._signal = new I(this.appId,this.cname,this.uid,this.sid),
                this._signal.connect(e)
            }
            ,
            t.prototype._connect = function() {
                return r(this, void 0, void 0, function() {
                    var e;
                    return o(this, function(t) {
                        switch (t.label) {
                        case 0:
                            return [4, this._requestAP()];
                        case 1:
                            return e = t.sent(),
                            [4, this._connectWebsocket(e)];
                        case 2:
                            return t.sent(),
                            this._signal.on("close", this._onClose.bind(this)),
                            this._signal.on("status", this._onStatus.bind(this)),
                            this.emit("event", h.NETWORK_CONNECTED),
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype._sendStartRelayMessage = function(e) {
                return r(this, void 0, void 0, function() {
                    var t, n, i, a, r, s;
                    return o(this, function(o) {
                        switch (o.label) {
                        case 0:
                            return this._checkSignal(),
                            t = this._genMessage(S.StopPacketTransfer),
                            [4, this._signal.request(t)];
                        case 1:
                            return o.sent(),
                            [4, this._signal.waitStatus("Normal Quit")];
                        case 2:
                            return o.sent(),
                            u.default.debug("[" + this.clientId + "] startChannelMediaRelay: StopPacketTransfer success"),
                            n = this._genMessage(S.SetSdkProfile, e),
                            [4, this._signal.request(n)];
                        case 3:
                            return o.sent(),
                            u.default.debug("[" + this.clientId + "] startChannelMediaRelay: SetSdkProfile success"),
                            i = this._genMessage(S.SetSourceChannel, e),
                            [4, this._signal.request(i)];
                        case 4:
                            return o.sent(),
                            [4, this._signal.waitStatus("SetSourceChannelStatus")];
                        case 5:
                            return o.sent(),
                            this.emit("event", h.PACKET_JOINED_SRC_CHANNEL),
                            u.default.debug("[" + this.clientId + "] startChannelMediaRelay: SetSourceChannel success"),
                            a = this._genMessage(S.SetSourceUserId, e),
                            [4, this._signal.request(a)];
                        case 6:
                            return o.sent(),
                            u.default.debug("[" + this.clientId + "] startChannelMediaRelay: SetSourceUserId success"),
                            r = this._genMessage(S.SetDestChannel, e),
                            [4, this._signal.request(r)];
                        case 7:
                            return o.sent(),
                            [4, this._signal.waitStatus("SetDestChannelStatus")];
                        case 8:
                            return o.sent(),
                            this.emit("event", h.PACKET_JOINED_DEST_CHANNEL),
                            u.default.debug("[" + this.clientId + "] startChannelMediaRelay: SetDestChannel success"),
                            s = this._genMessage(S.StartPacketTransfer, e),
                            [4, this._signal.request(s)];
                        case 9:
                            return o.sent(),
                            this.emit("event", h.PACKET_SENT_TO_DEST_CHANNEL),
                            this.state = _.RELAY_STATE_RUNNING,
                            u.default.debug("[" + this.clientId + "] startChannelMediaRelay: StartPacketTransfer success"),
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype._sendReconnectMessage = function(e) {
                return r(this, void 0, void 0, function() {
                    var t;
                    return o(this, function(n) {
                        switch (n.label) {
                        case 0:
                            return this._checkSignal(),
                            t = this._genMessage(S.Reconnect, e),
                            [4, this._signal.request(t)];
                        case 1:
                            return n.sent(),
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype._sendUpdateMessage = function(e) {
                return r(this, void 0, void 0, function() {
                    var t;
                    return o(this, function(n) {
                        switch (n.label) {
                        case 0:
                            return this._checkSignal(),
                            t = this._genMessage(S.UpdateDestChannel, e),
                            [4, this._signal.request(t)];
                        case 1:
                            return n.sent(),
                            this.emit("event", h.PACKET_UPDATE_DEST_CHANNEL),
                            u.default.debug("[" + this.clientId + "] sendUpdateMessage: UpdateDestChannel success"),
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype._sendStopRelayMessage = function() {
                return r(this, void 0, void 0, function() {
                    var e;
                    return o(this, function(t) {
                        switch (t.label) {
                        case 0:
                            return this._checkSignal(),
                            e = this._genMessage(S.StopPacketTransfer),
                            [4, this._signal.request(e)];
                        case 1:
                            return t.sent(),
                            u.default.debug("[" + this.clientId + "] sendStopRelayMessage: StopPacketTransfer success"),
                            [2]
                        }
                    })
                })
            }
            ,
            t.prototype._genMessage = function(e, t) {
                var n = this
                  , i = []
                  , a = []
                  , r = []
                  , o = {
                    appId: this.appId,
                    cname: this.cname,
                    uid: this.uid + "",
                    sdkVersion: d.VERSION,
                    sid: this.sid,
                    ts: +new Date,
                    requestId: 0,
                    seq: 0,
                    allocate: !0,
                    clientRequest: {}
                }
                  , s = null;
                switch (e) {
                case S.SetSdkProfile:
                    return o.clientRequest = {
                        command: "SetSdkProfile",
                        type: "multi_channel"
                    },
                    o;
                case S.SetSourceChannel:
                    return s = t.getSrcChannelMediaInfo(),
                    o.clientRequest = {
                        command: "SetSourceChannel",
                        uid: s.uid + "",
                        channelName: s.channelName,
                        token: s.token || this.appId
                    },
                    o;
                case S.SetSourceUserId:
                    return s = t.getSrcChannelMediaInfo(),
                    o.clientRequest = {
                        command: "SetSourceUserId",
                        uid: this.uid + ""
                    },
                    o;
                case S.SetDestChannel:
                    return t.getDestChannelMediaInfos().forEach(function(e) {
                        i.push(e.channelName),
                        a.push(e.uid + ""),
                        r.push(e.token || n.appId)
                    }),
                    o.clientRequest = {
                        command: "SetDestChannel",
                        channelName: i,
                        uid: a,
                        token: r
                    },
                    o;
                case S.StartPacketTransfer:
                    return o.clientRequest = {
                        command: "StartPacketTransfer"
                    },
                    o;
                case S.Reconnect:
                    return o.clientRequest = {
                        command: "Reconnect"
                    },
                    o;
                case S.StopPacketTransfer:
                    return o.clientRequest = {
                        command: "StopPacketTransfer"
                    },
                    o;
                case S.UpdateDestChannel:
                    return t.getDestChannelMediaInfos().forEach(function(e) {
                        i.push(e.channelName),
                        a.push(e.uid + ""),
                        r.push(e.token || n.appId)
                    }),
                    o.clientRequest = {
                        command: "UpdateDestChannel",
                        channelName: i,
                        uid: a,
                        token: r
                    },
                    o
                }
            }
            ,
            t.prototype._checkSignal = function() {
                if (!this._signal || !this._signal.isConnect())
                    throw new T(v.WS_DISCONNECTED)
            }
            ,
            t
        }(c.default);
        t.default = g;
        var m = function() {
            function e() {
                this.destChannelMediaInfos = new Map
            }
            return e.prototype.setSrcChannelInfo = function(e) {
                l.checkValidObject(e, "srcInfo");
                var t = e.uid
                  , n = e.channelName
                  , i = e.token;
                if (i && !l.isValidToken(i))
                    throw new Error("Invalid token in SrcChannelInfo");
                if (!l.isValidChannelName(n))
                    throw new Error("Invalid channelName in SrcChannelInfo");
                if (!p.is32Uint(t))
                    throw new Error("Invalid uid in SrcChannelInfo");
                this.srcChannelMediaInfo = e
            }
            ,
            e.prototype.setDestChannelInfo = function(e, t) {
                if (!l.isValidChannelName(e))
                    throw new Error("Invalid channelName in DestChannelInfo");
                l.checkValidObject(t, "destInfo");
                var n = t.uid
                  , i = t.token
                  , a = t.channelName;
                if (i && !l.isValidToken(i))
                    throw new Error("Invalid token in DestChannelInfo");
                if (!l.isValidChannelName(a))
                    throw new Error("Invalid channelName in DestChannelInfo");
                if (!p.is32Uint(n))
                    throw new Error("Invalid uid in DestChannelInfo");
                this.destChannelMediaInfos.set(e, t)
            }
            ,
            e.prototype.removeDestChannelInfo = function(e) {
                if (!l.isValidChannelName(e))
                    throw new Error("Invalid channelName when invoke removeDestChannelInfo");
                this.destChannelMediaInfos.delete(e)
            }
            ,
            e.prototype.getSrcChannelMediaInfo = function() {
                return this.srcChannelMediaInfo
            }
            ,
            e.prototype.getDestChannelMediaInfos = function() {
                return this.destChannelMediaInfos
            }
            ,
            e
        }();
        t.ChannelMediaRelayConfiguration = m;
        var v, S, h, _, E, I = function(e) {
            function t(t, n, i, a) {
                var r = e.call(this) || this;
                return r._onOpen = function() {
                    r.emit("open")
                }
                ,
                r._onClose = function(e) {
                    r.emit("close"),
                    r.dispose()
                }
                ,
                r._onMessage = function(e) {
                    var t = JSON.parse(e.data);
                    if (!t || "serverResponse" !== t.command || !t.requestId)
                        return t && "serverStatus" === t.command && t.serverStatus && t.serverStatus.command ? (r.emit("status", t.serverStatus),
                        void r.emit(t.serverStatus.command, t.serverStatus)) : void 0;
                    r.emit("req_" + t.requestId, t)
                }
                ,
                r._requestId = 1,
                r.appId = t,
                r.cname = n,
                r.uid = i,
                r.sid = a,
                r
            }
            return a(t, e),
            t.prototype.isConnect = function() {
                return this._ws && this._ws.readyState === WebSocket.OPEN
            }
            ,
            t.prototype.sendMessage = function(e) {
                if (!this._ws || this._ws.readyState !== WebSocket.OPEN)
                    throw new T(v.WS_DISCONNECTED);
                var t = this._requestId++;
                return e.requestId = t,
                e.seq = t,
                this._ws.send(JSON.stringify(e)),
                t
            }
            ,
            t.prototype.waitStatus = function(e) {
                var t = this;
                return new Promise(function(n, i) {
                    var a = window.setTimeout(function() {
                        i(new T(v.WAIT_STATUS_TIMEOUT,e))
                    }, 5e3);
                    t.once(e, function(t) {
                        clearTimeout(a),
                        t.state && 0 !== t.state ? i(new T(v.WAIT_STATUS_ERROR,e)) : n()
                    }),
                    t.once("dispose", function() {
                        clearTimeout(a),
                        i(new T(v.WS_ABORT))
                    })
                }
                )
            }
            ,
            t.prototype.request = function(e) {
                var t = this;
                return new Promise(function(n, i) {
                    var a = t.sendMessage(e)
                      , r = window.setTimeout(function() {
                        t.removeAllListeners("req_" + a),
                        i(new T(v.REQUEST_TIMEOUT))
                    }, 3e3);
                    t.once("req_" + a, function(e) {
                        clearTimeout(r),
                        e && 200 === e.code ? n(e) : i(new T(v.REQUEST_FAILED,e))
                    }),
                    t.once("dispose", function() {
                        clearTimeout(r),
                        i(new T(v.WS_ABORT))
                    })
                }
                )
            }
            ,
            t.prototype.connect = function(e) {
                var t = this;
                return new Promise(function(n, i) {
                    t._ws = new WebSocket(e),
                    t._ws.onopen = function() {
                        t._onOpen(),
                        t._prvUrl = e,
                        t._ws.onmessage = t._onMessage,
                        t._ws.onclose = t._onClose,
                        t._startHeartBeatCheck(),
                        n()
                    }
                    ,
                    t._ws.onclose = function(e) {
                        t._ws = null,
                        i(new T(v.CONNECT_FAILED,"websocket error code: " + e.code))
                    }
                    ,
                    setTimeout(function() {
                        t._ws && t._ws.readyState !== WebSocket.OPEN && (t._ws.onopen = null,
                        t._ws.onclose = null,
                        t._ws.close(),
                        t._ws = null,
                        i(new T(v.CONNECT_TIMEOUT)))
                    }, 5e3),
                    t.once("dispose", function() {
                        i(new T(v.WS_ABORT))
                    })
                }
                )
            }
            ,
            t.prototype.dispose = function() {
                this._clearHeartBeatCheck(),
                this.emit("dispose"),
                this.removeEvent(),
                this._ws && (this._ws.onopen = null,
                this._ws.onclose = null,
                this._ws.onmessage = null,
                this._ws.close()),
                this._ws = null
            }
            ,
            t.prototype._sendPing = function(e) {
                if (!this._ws || this._ws.readyState !== WebSocket.OPEN)
                    throw new T(v.WS_DISCONNECTED);
                var t = this._requestId++;
                return e.requestId = t,
                this._ws.send(JSON.stringify(e)),
                t
            }
            ,
            t.prototype._startHeartBeatCheck = function() {
                var e = this;
                this._heartBeatTimer = window.setInterval(function() {
                    e._sendPing({
                        command: "ping",
                        appId: e.appId,
                        cname: e.cname,
                        uid: e.uid + "",
                        sid: e.sid,
                        ts: +new Date,
                        requestId: 0
                    })
                }, 3e3)
            }
            ,
            t.prototype._clearHeartBeatCheck = function() {
                window.clearInterval(this._heartBeatTimer)
            }
            ,
            t
        }(c.default), T = function() {
            return function(e, t, n) {
                void 0 === e && (e = ""),
                this.code = n,
                this.data = t,
                this.message = e
            }
        }();
        t.ChannelMediaError = T,
        function(e) {
            e.CONNECT_FAILED = "connect failed",
            e.CONNECT_TIMEOUT = "connect timeout",
            e.WS_DISCONNECTED = "websocket disconnected",
            e.REQUEST_TIMEOUT = "request timeout",
            e.REQUEST_FAILED = "request failed",
            e.WAIT_STATUS_TIMEOUT = "wait status timeout",
            e.WAIT_STATUS_ERROR = "wait status error",
            e.BAD_STATE = "bad state",
            e.WS_ABORT = "ws abort",
            e.AP_REQUEST_TIMEOUT = "AP request timeout",
            e.AP_JSON_PARSE_ERROR = "AP json parse error",
            e.AP_REQUEST_ERROR = "AP request error",
            e.AP_REQUEST_ABORT = "AP request abort"
        }(v = t.CHANNEL_MEDIA_ERROR || (t.CHANNEL_MEDIA_ERROR = {})),
        function(e) {
            e[e.SetSdkProfile = 0] = "SetSdkProfile",
            e[e.SetSourceChannel = 1] = "SetSourceChannel",
            e[e.SetSourceUserId = 2] = "SetSourceUserId",
            e[e.SetDestChannel = 3] = "SetDestChannel",
            e[e.StartPacketTransfer = 4] = "StartPacketTransfer",
            e[e.StopPacketTransfer = 5] = "StopPacketTransfer",
            e[e.UpdateDestChannel = 6] = "UpdateDestChannel",
            e[e.Reconnect = 7] = "Reconnect",
            e[e.SetVideoProfile = 8] = "SetVideoProfile"
        }(S || (S = {})),
        function(e) {
            e[e.NETWORK_DISCONNECTED = 0] = "NETWORK_DISCONNECTED",
            e[e.NETWORK_CONNECTED = 1] = "NETWORK_CONNECTED",
            e[e.PACKET_JOINED_SRC_CHANNEL = 2] = "PACKET_JOINED_SRC_CHANNEL",
            e[e.PACKET_JOINED_DEST_CHANNEL = 3] = "PACKET_JOINED_DEST_CHANNEL",
            e[e.PACKET_SENT_TO_DEST_CHANNEL = 4] = "PACKET_SENT_TO_DEST_CHANNEL",
            e[e.PACKET_RECEIVED_VIDEO_FROM_SRC = 5] = "PACKET_RECEIVED_VIDEO_FROM_SRC",
            e[e.PACKET_RECEIVED_AUDIO_FROM_SRC = 6] = "PACKET_RECEIVED_AUDIO_FROM_SRC",
            e[e.PACKET_UPDATE_DEST_CHANNEL = 7] = "PACKET_UPDATE_DEST_CHANNEL",
            e[e.PACKET_UPDATE_DEST_CHANNEL_REFUSED = 8] = "PACKET_UPDATE_DEST_CHANNEL_REFUSED",
            e[e.PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE = 9] = "PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE"
        }(h = t.CHANNEL_MEDIA_RELAY_EVENT || (t.CHANNEL_MEDIA_RELAY_EVENT = {})),
        function(e) {
            e[e.RELAY_STATE_IDLE = 0] = "RELAY_STATE_IDLE",
            e[e.RELAY_STATE_CONNECTING = 1] = "RELAY_STATE_CONNECTING",
            e[e.RELAY_STATE_RUNNING = 2] = "RELAY_STATE_RUNNING",
            e[e.RELAY_STATE_FAILURE = 3] = "RELAY_STATE_FAILURE"
        }(_ = t.CHANNEL_MEDIA_RELAY_STATE || (t.CHANNEL_MEDIA_RELAY_STATE = {})),
        function(e) {
            e[e.RELAY_OK = 0] = "RELAY_OK",
            e[e.SERVER_ERROR_RESPONSE = 1] = "SERVER_ERROR_RESPONSE",
            e[e.SERVER_NO_RESPONSE = 2] = "SERVER_NO_RESPONSE",
            e[e.NO_RESOURCE_AVAILABLE = 3] = "NO_RESOURCE_AVAILABLE",
            e[e.FAILED_JOIN_SRC = 4] = "FAILED_JOIN_SRC",
            e[e.FAILED_JOIN_DEST = 5] = "FAILED_JOIN_DEST",
            e[e.FAILED_PACKET_RECEIVED_FROM_SRC = 6] = "FAILED_PACKET_RECEIVED_FROM_SRC",
            e[e.FAILED_PACKET_SENT_TO_DEST = 7] = "FAILED_PACKET_SENT_TO_DEST",
            e[e.SERVER_CONNECTION_LOST = 8] = "SERVER_CONNECTION_LOST",
            e[e.INTERNAL_ERROR = 9] = "INTERNAL_ERROR",
            e[e.SRC_TOKEN_EXPIRED = 10] = "SRC_TOKEN_EXPIRED",
            e[e.DEST_TOKEN_EXPIRED = 11] = "DEST_TOKEN_EXPIRED",
            e[e.RELAY_ALREADY_START = 12] = "RELAY_ALREADY_START",
            e[e.RELAY_NOT_START = 13] = "RELAY_NOT_START",
            e[e.OPERATION_ABORT = 14] = "OPERATION_ABORT"
        }(E = t.CHANNEL_MEDIA_RELAY_ERROR || (t.CHANNEL_MEDIA_RELAY_ERROR = {}))
    }
    , function(e, t) {
        function n(e) {
            return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function i(t) {
            return "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? e.exports = i = function(e) {
                return n(e)
            }
            : e.exports = i = function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : n(e)
            }
            ,
            i(t)
        }
        e.exports = i
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "isLiveTranscodingValid", function() {
            return v
        }),
        n.d(t, "generateSessionId", function() {
            return p
        }),
        n.d(t, "audioLevelHelper", function() {
            return f
        }),
        n.d(t, "vsResHack", function() {
            return g
        }),
        n.d(t, "is32Uint", function() {
            return m
        }),
        n.d(t, "safeCall", function() {
            return l
        }),
        n.d(t, "random", function() {
            return h
        }),
        n.d(t, "popBanTip", function() {
            return I
        }),
        n.d(t, "lengthInUtf8Bytes", function() {
            return _
        }),
        n.d(t, "audioTimerLoop", function() {
            return E
        });
        var i = n(9)
          , a = n.n(i)
          , r = n(5)
          , o = n(0)
          , s = n(16)
          , c = n.n(s)
          , d = n(14)
          , u = n(13)
          , l = function() {
            var e = arguments[0];
            if ("function" == typeof e) {
                var t = Array.prototype.slice.call(arguments, 1);
                e.apply(null, t)
            }
        }
          , f = function(e) {
            return this.audioContext = Object(d.a)(),
            this.sourceNode = e.otWebkitAudioSource || this.audioContext.createMediaStreamSource(e),
            this.analyser = this.audioContext.createAnalyser(),
            this.timeDomainData = new Uint8Array(this.analyser.frequencyBinCount),
            this.sourceNode.connect(this.analyser),
            this.getAudioLevel = function() {
                if (this.analyser) {
                    this.analyser.getByteTimeDomainData(this.timeDomainData);
                    for (var e = 0, t = 0; t < this.timeDomainData.length; t++)
                        e = Math.max(e, Math.abs(this.timeDomainData[t] - 128));
                    return e / 128
                }
                return o.default.warning("can't find analyser in audioLevelHelper"),
                0
            }
            ,
            this
        };
        function p() {
            return c()().replace(/-/g, "").toUpperCase()
        }
        var g = function(e, t, n) {
            try {
                o.default.debug("start vsResHack", e);
                var i = document.createElement("video");
                i.setAttribute("autoplay", ""),
                i.setAttribute("muted", ""),
                i.muted = !0,
                i.setAttribute("playsinline", ""),
                i.setAttribute("style", "position: absolute; top: 0; left: 0; width:1px; high:1px;"),
                document.body.appendChild(i),
                i.addEventListener("playing", function(n) {
                    r.isFireFox() ? i.videoWidth && (o.default.debug("[vsResHack] get stream resolution: ", "".concat(i.videoWidth, " x ").concat(i.videoHeight), e),
                    t(i.videoWidth, i.videoHeight),
                    document.body.removeChild(i)) : (o.default.debug("[vsResHack] get stream resolution: ", "".concat(i.videoWidth, " x ").concat(i.videoHeight), e),
                    t(i.videoWidth, i.videoHeight),
                    document.body.removeChild(i))
                }),
                Object(u.setSrcObject)(i, e)
            } catch (e) {
                n(e)
            }
        }
          , m = function(e) {
            return "number" == typeof e && 0 <= e && e <= 4294967295
        }
          , v = function(e) {
            var t = ["lowLatency", "userConfigExtraInfo", "transcodingUsers"];
            for (var n in e)
                if ("lowLatency" === n && "boolean" != typeof e[n] || "userConfigExtraInfo" === n && "object" !== a()(e[n]) || "transcodingUsers" === n && !S(e[n]) || !~t.indexOf(n) && "number" != typeof e[n])
                    throw new Error("Param [" + n + "] is inValid");
            return !0
        }
          , S = function(e) {
            for (var t = 0; t < e.length; t++)
                for (var n in e[t])
                    if ("number" != typeof e[t][n])
                        throw new Error("Param user[" + t + "] - [" + n + "] is inValid");
            return !0
        }
          , h = function(e) {
            isNaN(e) && (e = 1e3);
            var t = +new Date
              , n = (t = (9301 * t + 49297) % 233280) / 233280;
            return Math.ceil(n * e)
        }
          , _ = function(e) {
            var t = encodeURIComponent(e).match(/%[89ABab]/g);
            return e.length + (t ? t.length : 0)
        }
          , E = function(e, t) {
            var n = 1 / t
              , i = Object(d.a)()
              , a = i.createGain();
            a.gain.value = 0,
            a.connect(i.destination);
            var r = !1;
            return function t() {
                var o = i.createOscillator();
                o.onended = t,
                o.connect(a),
                o.start(0),
                o.stop(i.currentTime + n),
                e(i.currentTime),
                r && (o.onended = function() {}
                )
            }(),
            function() {
                r = !0
            }
        }
          , I = function() {
            if (!document.getElementById("agora-ban-tip")) {
                var e = document.createElement("div");
                e.id = "agora-ban-tip",
                e.style = "position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: #fff;",
                document.querySelector("body").prepend(e);
                var t = document.createElement("div");
                t.style = "background: #000; width: 346px; height: 116px; z-index: 100000; opacity: 0.6; border-radius: 10px; box-shadow: 0 2px 4px #000;",
                e.append(t);
                var n = document.createElement("div");
                n.style = "height: 76px; display: flex; justify-content: center; align-items: center;";
                var i = document.createElement("span");
                i.style = "height: 28px; width: 28px; color: #000; text-align: center; line-height: 30px; background: #fff; border-radius: 50%; font-weight: 600; font-size: 20px;margin-right: 5px;",
                i.innerText = "!";
                var a = document.createElement("span");
                a.innerText = "This browser does not support webRTC",
                n.append(i),
                n.append(a);
                var r = document.createElement("div");
                r.style = "height: 38px; display: flex; border-top: #fff 1px solid; justify-content: center; align-items: center;",
                r.innerText = "OK",
                t.append(n),
                t.append(r),
                r.onclick = function() {
                    var e = document.getElementById("agora-ban-tip");
                    e.parentNode.removeChild(e)
                }
            }
        }
    }
    , function(e, t) {
        function n(e, t, n, i, a, r, o) {
            try {
                var s = e[r](o)
                  , c = s.value
            } catch (e) {
                return void n(e)
            }
            s.done ? t(c) : Promise.resolve(c).then(i, a)
        }
        e.exports = function(e) {
            return function() {
                var t = this
                  , i = arguments;
                return new Promise(function(a, r) {
                    var o = e.apply(t, i);
                    function s(e) {
                        n(o, a, r, s, c, "next", e)
                    }
                    function c(e) {
                        n(o, a, r, s, c, "throw", e)
                    }
                    s(void 0)
                }
                )
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "post", function() {
            return u
        }),
        n.d(t, "shouldUseHttps", function() {
            return l
        }),
        n.d(t, "getHTTPSendBytes", function() {
            return s
        }),
        n.d(t, "getHTTPRecvBytes", function() {
            return c
        }),
        n.d(t, "resetHTTPByetsCount", function() {
            return d
        });
        var i = n(3)
          , a = n(10)
          , r = 0
          , o = 0
          , s = function() {
            return r
        }
          , c = function() {
            return o
        }
          , d = function() {
            r = 0,
            o = 0
        }
          , u = function(e, t, n, s, c) {
            var d = new XMLHttpRequest;
            if (d.timeout = t.timeout || Object(i.getParameter)("HTTP_CONNECT_TIMEOUT"),
            d.open("POST", e, !0),
            d.setRequestHeader("Content-type", "application/json; charset=utf-8"),
            c)
                for (var u in c)
                    "withCredentials" == u ? d.withCredentials = !0 : d.setRequestHeader(u, c[u]);
            d.onload = function(e) {
                o += Object(a.lengthInUtf8Bytes)(d.responseText),
                n && n(d.responseText)
            }
            ,
            d.onerror = function(t) {
                s && s(t, e)
            }
            ,
            d.ontimeout = function(t) {
                s && s(t, e)
            }
            ;
            var l = JSON.stringify(t);
            r += Object(a.lengthInUtf8Bytes)(l),
            d.send(l)
        }
          , l = function() {
            return "https:" == document.location.protocol
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "RTCPeerConnection", function() {
            return y
        }),
        n.d(t, "getUserMedia", function() {
            return o
        }),
        n.d(t, "attachMediaStream", function() {
            return s
        }),
        n.d(t, "reattachMediaStream", function() {
            return c
        }),
        n.d(t, "setSrcObject", function() {
            return p
        }),
        n.d(t, "getSrcObject", function() {
            return g
        }),
        n.d(t, "webrtcDetectedBrowser", function() {
            return d
        }),
        n.d(t, "webrtcDetectedVersion", function() {
            return u
        }),
        n.d(t, "webrtcMinimumVersion", function() {
            return l
        }),
        n.d(t, "webrtcTesting", function() {
            return b
        }),
        n.d(t, "webrtcUtils", function() {
            return S
        });
        var i = n(9)
          , a = n.n(i)
          , r = n(5)
          , o = null
          , s = null
          , c = null
          , d = null
          , u = null
          , l = null
          , f = null
          , p = null
          , g = null
          , m = null
          , v = {
            addStream: null
        }
          , S = {
            log: function() {},
            extractVersion: function(e, t, n) {
                var i = e.match(t);
                return i && i.length >= n && parseInt(i[n])
            }
        };
        if ("object" == ("undefined" == typeof window ? "undefined" : a()(window)) ? (!window.HTMLMediaElement || "srcObject"in window.HTMLMediaElement.prototype ? (p = function(e, t) {
            e.srcObject = t
        }
        ,
        g = function(e) {
            return e.srcObject
        }
        ) : (p = function(e, t) {
            "mozSrcObject"in e ? e.mozSrcObject = t : (e._srcObject = t,
            e.src = t ? URL.createObjectURL(t) : null)
        }
        ,
        g = function(e) {
            return "mozSrcObject"in e ? e.mozSrcObject : e._srcObject
        }
        ),
        o = window.navigator && window.navigator.getUserMedia) : (p = function(e, t) {
            e.srcObject = t
        }
        ,
        g = function(e) {
            return e.srcObject
        }
        ),
        s = function(e, t) {
            p(e, t)
        }
        ,
        c = function(e, t) {
            p(e, g(t))
        }
        ,
        "undefined" != typeof window && window.navigator)
            if (navigator.mozGetUserMedia && window.mozRTCPeerConnection) {
                for (var h in S.log("This appears to be Firefox"),
                d = "firefox",
                u = S.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1),
                l = 31,
                m = mozRTCPeerConnection,
                v)
                    v[h] = m.prototype[h];
                if (f = function(e, t) {
                    if (u < 38 && e && e.iceServers) {
                        for (var n = [], i = 0; i < e.iceServers.length; i++) {
                            var a = e.iceServers[i];
                            if (a.hasOwnProperty("urls"))
                                for (var r = 0; r < a.urls.length; r++) {
                                    var o = {
                                        url: a.urls[r]
                                    };
                                    0 === a.urls[r].indexOf("turn") && (o.username = a.username,
                                    o.credential = a.credential),
                                    n.push(o)
                                }
                            else
                                n.push(e.iceServers[i])
                        }
                        e.iceServers = n
                    }
                    var s = new m(e,t);
                    for (var c in v)
                        s[c] = v[c];
                    return s
                }
                ,
                window.RTCSessionDescription || (window.RTCSessionDescription = mozRTCSessionDescription),
                window.RTCIceCandidate || (window.RTCIceCandidate = mozRTCIceCandidate),
                o = function(e, t, n) {
                    var i = function(e) {
                        if ("object" !== a()(e) || e.require)
                            return e;
                        var t = [];
                        return Object.keys(e).forEach(function(n) {
                            if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                                var i = e[n] = "object" === a()(e[n]) ? e[n] : {
                                    ideal: e[n]
                                };
                                if (void 0 === i.min && void 0 === i.max && void 0 === i.exact || t.push(n),
                                void 0 !== i.exact && ("number" == typeof i.exact ? i.min = i.max = i.exact : e[n] = i.exact,
                                delete i.exact),
                                void 0 !== i.ideal) {
                                    e.advanced = e.advanced || [];
                                    var r = {};
                                    "number" == typeof i.ideal ? r[n] = {
                                        min: i.ideal,
                                        max: i.ideal
                                    } : r[n] = i.ideal,
                                    e.advanced.push(r),
                                    delete i.ideal,
                                    Object.keys(i).length || delete e[n]
                                }
                            }
                        }),
                        t.length && (e.require = t),
                        e
                    };
                    return u < 38 && (S.log("spec: " + JSON.stringify(e)),
                    e.audio && (e.audio = i(e.audio)),
                    e.video && (e.video = i(e.video)),
                    S.log("ff37: " + JSON.stringify(e))),
                    navigator.mozGetUserMedia(e, t, n)
                }
                ,
                navigator.getUserMedia = o,
                navigator.mediaDevices || (navigator.mediaDevices = {
                    getUserMedia: T,
                    addEventListener: function() {},
                    removeEventListener: function() {}
                }),
                navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function() {
                    return new Promise(function(e) {
                        e([{
                            kind: "audioinput",
                            deviceId: "default",
                            label: "",
                            groupId: ""
                        }, {
                            kind: "videoinput",
                            deviceId: "default",
                            label: "",
                            groupId: ""
                        }])
                    }
                    )
                }
                ,
                u < 41) {
                    var _ = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
                    navigator.mediaDevices.enumerateDevices = function() {
                        return _().then(void 0, function(e) {
                            if ("NotFoundError" === e.name)
                                return [];
                            throw e
                        })
                    }
                }
            } else if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection) {
                for (var h in S.log("This appears to be Chrome"),
                d = "chrome",
                u = S.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2),
                l = 38,
                m = webkitRTCPeerConnection,
                v)
                    v[h] = m.prototype[h];
                f = function(e, t) {
                    e && e.iceTransportPolicy && (e.iceTransports = e.iceTransportPolicy);
                    var n = new m(e,t);
                    for (var i in v)
                        n[i] = v[i];
                    var a = n.getStats.bind(n);
                    return n.getStats = function(e, t, n) {
                        var i = arguments;
                        i.length > 0 && "function" == typeof e && (t ? (n = t,
                        t = e,
                        i = [e = null, t, n]) : (t = e,
                        i = [e = null, t]));
                        if (i.length >= 2) {
                            return a.apply(this, [function(e) {
                                i[1](function(e) {
                                    var t = {};
                                    return e.result().forEach(function(e) {
                                        var n = {
                                            id: e.id,
                                            timestamp: e.timestamp,
                                            type: e.type
                                        };
                                        e.names().forEach(function(t) {
                                            n[t] = e.stat(t)
                                        }),
                                        t[n.id] = n
                                    }),
                                    t
                                }(e))
                            }
                            , i[0]])
                        }
                        return a()
                    }
                    ,
                    n
                }
                ,
                ["createOffer", "createAnswer"].forEach(function(e) {
                    var t = webkitRTCPeerConnection.prototype[e];
                    webkitRTCPeerConnection.prototype[e] = function() {
                        var e = this;
                        if (arguments.length < 1 || 1 === arguments.length && "object" === a()(arguments[0])) {
                            var n = 1 === arguments.length ? arguments[0] : void 0;
                            return new Promise(function(i, a) {
                                t.apply(e, [i, a, n])
                            }
                            )
                        }
                        return t.apply(this, arguments)
                    }
                }),
                ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(e) {
                    var t = webkitRTCPeerConnection.prototype[e];
                    webkitRTCPeerConnection.prototype[e] = function() {
                        var e = arguments
                          , n = this;
                        return new Promise(function(i, a) {
                            t.apply(n, [e[0], function() {
                                i(),
                                e.length >= 2 && e[1].apply(null, [])
                            }
                            , function(t) {
                                a(t),
                                e.length >= 3 && e[2].apply(null, [t])
                            }
                            ])
                        }
                        )
                    }
                });
                var E = function(e) {
                    if ("object" !== a()(e) || e.mandatory || e.optional)
                        return e;
                    var t = {};
                    return Object.keys(e).forEach(function(n) {
                        if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                            var i = "object" === a()(e[n]) ? e[n] : {
                                ideal: e[n]
                            };
                            void 0 !== i.exact && "number" == typeof i.exact && (i.min = i.max = i.exact);
                            var r = function(e, t) {
                                return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
                            };
                            if (void 0 !== i.ideal) {
                                t.optional = t.optional || [];
                                var o = {};
                                "number" == typeof i.ideal ? (o[r("min", n)] = i.ideal,
                                t.optional.push(o),
                                (o = {})[r("max", n)] = i.ideal,
                                t.optional.push(o)) : (o[r("", n)] = i.ideal,
                                t.optional.push(o))
                            }
                            void 0 !== i.exact && "number" != typeof i.exact ? (t.mandatory = t.mandatory || {},
                            t.mandatory[r("", n)] = i.exact) : ["min", "max"].forEach(function(e) {
                                void 0 !== i[e] && (t.mandatory = t.mandatory || {},
                                t.mandatory[r(e, n)] = i[e])
                            })
                        }
                    }),
                    e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
                    t
                };
                if (o = function(e, t, n) {
                    return e.audio && (e.audio = E(e.audio)),
                    e.video && (e.video = E(e.video)),
                    S.log("chrome: " + JSON.stringify(e)),
                    navigator.webkitGetUserMedia(e, t, n)
                }
                ,
                navigator.getUserMedia = o,
                navigator.mediaDevices || (navigator.mediaDevices = {
                    getUserMedia: T,
                    enumerateDevices: function() {
                        return new Promise(function(e) {
                            var t = {
                                audio: "audioinput",
                                video: "videoinput"
                            };
                            return MediaStreamTrack.getSources(function(n) {
                                e(n.map(function(e) {
                                    return {
                                        label: e.label,
                                        kind: t[e.kind],
                                        deviceId: e.id,
                                        groupId: ""
                                    }
                                }))
                            })
                        }
                        )
                    }
                }),
                navigator.mediaDevices.getUserMedia) {
                    if ((Object(r.getBrowserVersion)() ? Number(Object(r.getBrowserVersion)().split(".")[0]) : void 0) < 46) {
                        var I = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                        navigator.mediaDevices.getUserMedia = function(e) {
                            return S.log("spec:   " + JSON.stringify(e)),
                            e.audio = E(e.audio),
                            e.video = E(e.video),
                            S.log("chrome: " + JSON.stringify(e)),
                            I(e)
                        }
                    }
                } else
                    navigator.mediaDevices.getUserMedia = function(e) {
                        return T(e)
                    }
                    ;
                void 0 === navigator.mediaDevices.addEventListener && (navigator.mediaDevices.addEventListener = function() {
                    S.log("Dummy mediaDevices.addEventListener called.")
                }
                ),
                void 0 === navigator.mediaDevices.removeEventListener && (navigator.mediaDevices.removeEventListener = function() {
                    S.log("Dummy mediaDevices.removeEventListener called.")
                }
                ),
                s = function(e, t) {
                    u >= 43 ? p(e, t) : void 0 !== e.src ? e.src = t ? URL.createObjectURL(t) : null : S.log("Error attaching stream to element.")
                }
                ,
                c = function(e, t) {
                    u >= 43 ? p(e, g(t)) : e.src = t.src
                }
            } else
                navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) ? (S.log("This appears to be Edge"),
                d = "edge",
                u = S.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2),
                l = 12) : S.log("Browser does not appear to be WebRTC-capable");
        else
            S.log("This does not appear to be a browser"),
            d = "not a browser";
        function T(e) {
            return new Promise(function(t, n) {
                o(e, t, n)
            }
            )
        }
        var y, b = {};
        try {
            Object.defineProperty(b, "version", {
                set: function(e) {
                    u = e
                }
            })
        } catch (e) {}
        f ? y = f : "undefined" != typeof window && (y = window.RTCPeerConnection)
    }
    , function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
            return s
        });
        var i = window.AudioContext || window.webkitAudioContext
          , a = n(3)
          , r = a.getParameter
          , o = a.setParameter
          , s = function() {
            return r("AUDIO_CONTEXT") || (console.log("Creating Audio Context"),
            o("AUDIO_CONTEXT", function() {
                if (i)
                    return new i;
                throw new Error("AUDIO_CONTEXT_NOT_SUPPORTED")
            }())),
            r("AUDIO_CONTEXT")
        }
    }
    , function(e, t, n) {
        var i = n(25);
        e.exports = function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {}
                  , a = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (a = a.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))),
                a.forEach(function(t) {
                    i(e, t, n[t])
                })
            }
            return e
        }
    }
    , function(e, t, n) {
        var i = n(23)
          , a = n(24);
        e.exports = function(e, t, n) {
            var r = t && n || 0;
            "string" == typeof e && (t = "binary" === e ? new Array(16) : null,
            e = null);
            var o = (e = e || {}).random || (e.rng || i)();
            if (o[6] = 15 & o[6] | 64,
            o[8] = 63 & o[8] | 128,
            t)
                for (var s = 0; s < 16; ++s)
                    t[r + s] = o[s];
            return t || a(o)
        }
    }
    , function(e, t, n) {
        var i = n(33)
          , a = n(34)
          , r = n(35);
        e.exports = function(e) {
            return i(e) || a(e) || r()
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, r = i(n(0)), o = n(13);
        !function(e) {
            e.NEW = "new",
            e.PREPARING_OFFER = "preparing-offer",
            e.OFFER_SENT = "offer-sent",
            e.ESTABLISHED = "established",
            e.CLOSED = "closed"
        }(a || (a = {}));
        var s = function() {
            function e(e) {
                this.candidate = null,
                this.state = a.NEW,
                this.config = e,
                this.isSubscriber = this.config.isSubscriber,
                this.peerConnection = this.initPeecConnection(e),
                this.peerConnection.onicecandidate = this._onicecandidate.bind(this),
                this.peerConnection.oniceconnectionstatechange = this._oniceconnectionstatechange.bind(this),
                this.peerConnection.onaddstream = this._onaddstream.bind(this),
                this.peerConnection.ontrack = this._ontrack.bind(this),
                this.processSignalingMessage = this.setAnswer.bind(this),
                this.peerConnection.createOffer({
                    offerToReceiveAudio: !0,
                    offerToReceiveVideo: !0
                }).then(this.setLocalSDP.bind(this)),
                this.sendVideoStats = {
                    id: "",
                    type: "",
                    mediaType: "",
                    googCodecName: "h264" === this.config.codec ? "H264" : "VP8",
                    bytesSent: "0",
                    packetsLost: "0",
                    packetsSent: "0",
                    googAdaptationChanges: "0",
                    googAvgEncodeMs: "0",
                    googEncodeUsagePercent: "0",
                    googFirsReceived: "0",
                    googFrameHeightSent: "0",
                    googFrameHeightInput: "0",
                    googFrameRateInput: "0",
                    googFrameRateSent: "0",
                    googFrameWidthSent: "0",
                    googFrameWidthInput: "0",
                    googNacksReceived: "0",
                    googPlisReceived: "0",
                    googRtt: "0",
                    googFramesEncoded: "0"
                },
                this.sendAudioStats = {
                    id: "",
                    type: "",
                    mediaType: "",
                    googCodecName: "opus",
                    aecDivergentFilterFraction: "0",
                    audioInputLevel: "0",
                    bytesSent: "0",
                    packetsSent: "0",
                    googEchoCancellationReturnLoss: "0",
                    googEchoCancellationReturnLossEnhancement: "0"
                },
                this.receiveAudioStats = {
                    id: "",
                    type: "",
                    mediaType: "",
                    audioOutputLevel: "0",
                    bytesReceived: "0",
                    packetsLost: "0",
                    packetsReceived: "0",
                    googAccelerateRate: "0",
                    googCurrentDelayMs: "0",
                    googDecodingCNG: "0",
                    googDecodingCTN: "0",
                    googDecodingCTSG: "0",
                    googDecodingNormal: "0",
                    googDecodingPLC: "0",
                    googDecodingPLCCNG: "0",
                    googExpandRate: "0",
                    googJitterBufferMs: "0",
                    googJitterReceived: "0",
                    googPreemptiveExpandRate: "0",
                    googPreferredJitterBufferMs: "0",
                    googSecondaryDecodedRate: "0",
                    googSpeechExpandRate: "0"
                },
                this.receiveVideoStats = {
                    id: "",
                    type: "",
                    mediaType: "",
                    googTargetDelayMs: "0",
                    packetsLost: "0",
                    googDecodeMs: "0",
                    googMaxDecodeMs: "0",
                    googRenderDelayMs: "0",
                    googFrameWidthReceived: "0",
                    googFrameHeightReceived: "0",
                    googFrameRateReceived: "0",
                    googFrameRateDecoded: "0",
                    googFrameRateOutput: "0",
                    googFramesDecoded: "0",
                    googFrameReceived: "0",
                    googJitterBufferMs: "0",
                    googCurrentDelayMs: "0",
                    googMinPlayoutDelayMs: "0",
                    googNacksSent: "0",
                    googPlisSent: "0",
                    googFirsSent: "0",
                    bytesReceived: "0",
                    packetsReceived: "0"
                }
            }
            return e.prototype.addStream = function(e) {
                this.peerConnection.addStream(e)
            }
            ,
            e.prototype.setAnswer = function(e) {
                var t = JSON.parse(e);
                this.peerConnection.setRemoteDescription(new RTCSessionDescription({
                    sdp: t.sdp,
                    type: "answer"
                })),
                this.onsignalingmessage && this.onsignalingmessage("")
            }
            ,
            e.prototype.close = function() {
                this.peerConnection.close()
            }
            ,
            e.prototype.getStats = function(e, t) {
                if (void 0 === t && (t = 500),
                t = t > 500 ? 500 : t,
                Date.now() - this.lastTimeGetStats < t) {
                    var n = [];
                    this.config.isSubscriber ? (n.push(this.receiveVideoStats),
                    n.push(this.receiveAudioStats)) : (n.push(this.sendAudioStats),
                    n.push(this.sendVideoStats)),
                    n.push({
                        id: "time",
                        startTime: this.connectedTime,
                        timestamp: Date.now()
                    }),
                    e && e(n)
                } else
                    this._getStats(e)
            }
            ,
            e.prototype._getStats = function(e) {
                var t = this
                  , n = [];
                this.peerConnection.getStats(null).then(function(i) {
                    t.lastTimeGetStats = Date.now(),
                    Object.keys(i).map(function(e) {
                        var n = i[e];
                        t.config.isSubscriber ? n.type && "inboundrtp" === n.type && n.mediaType && "audio" === n.mediaType ? (t.receiveAudioStats.id = n.id + "recv",
                        t.receiveAudioStats.type = n.type + "",
                        t.receiveAudioStats.mediaType = n.mediaType + "",
                        t.receiveAudioStats.packetsReceived = n.packetsReceived + "",
                        t.receiveAudioStats.bytesReceived = n.bytesReceived + "",
                        t.receiveAudioStats.packetsLost = n.packetsLost + "",
                        t.receiveAudioStats.googJitterReceived = n.jitter + "") : n.type && "inboundrtp" === n.type && n.mediaType && "video" === n.mediaType ? (t.receiveVideoStats.id = n.id + "recv",
                        t.receiveVideoStats.type = n.type + "",
                        t.receiveVideoStats.mediaType = n.mediaType + "",
                        t.receiveVideoStats.packetsReceived = n.packetsReceived + "",
                        t.receiveVideoStats.bytesReceived = n.bytesReceived + "",
                        t.receiveVideoStats.packetsLost = n.packetsLost + "",
                        t.receiveVideoStats.googJitterBufferMs = n.jitter + "",
                        t.receiveVideoStats.googPlisSent = n.pliCount + "",
                        t.receiveVideoStats.googFirsSent = n.firCount + "",
                        t.receiveVideoStats.googNacksSent = n.nackCount + "") : n.remoteSource && n.type && "track" === n.type && n.trackIdentifier && -1 !== n.trackIdentifier.indexOf("v") ? (t.receiveVideoStats.googFrameHeightReceived = n.frameHeight + "",
                        t.receiveVideoStats.googFrameWidthReceived = n.frameWidth + "",
                        t.receiveVideoStats.googFrameRateDecoded = n.framesPerSecond + "",
                        t.receiveVideoStats.googFrameRateOutput = n.framesPerSecond + "",
                        t.receiveVideoStats.googFrameRateReceived = n.framesPerSecond + "",
                        t.receiveVideoStats.googFramesDecoded = n.framesDecoded + "",
                        t.receiveVideoStats.googFrameReceived = n.framesReceived + "") : n.remoteSource && n.type && "track" === n.type && n.trackIdentifier && -1 !== n.trackIdentifier.indexOf("a") && (t.receiveAudioStats.audioOutputLevel = n.audioLevel + "") : !n.isRemote && n.type && "outboundrtp" === n.type && n.mediaType && "audio" === n.mediaType ? (t.sendAudioStats.id = n.id + "send",
                        t.sendAudioStats.type = n.type + "",
                        t.sendAudioStats.mediaType = n.mediaType + "",
                        t.sendAudioStats.packetsSent = n.packetsSent + "",
                        t.sendAudioStats.bytesSent = n.bytesSent + "") : !n.isRemote && n.type && "outboundrtp" === n.type && n.mediaType && "video" === n.mediaType ? (t.sendVideoStats.id = n.id + "send",
                        t.sendVideoStats.type = n.type + "",
                        t.sendVideoStats.mediaType = n.mediaType + "",
                        t.sendVideoStats.packetsSent = n.packetsSent + "",
                        t.sendVideoStats.bytesSent = n.bytesSent + "",
                        t.sendVideoStats.googRtt = n.roundTripTime + "",
                        t.sendVideoStats.googPlisReceived = n.pliCount + "",
                        t.sendVideoStats.googFirsReceived = n.firCount + "",
                        t.sendVideoStats.googNacksReceived = n.nackCount + "") : !n.remoteSource && n.type && "track" === n.type && n.framesSent && 0 !== n.framesSent && (t.sendVideoStats.googFrameHeightSent = n.frameHeight + "",
                        t.sendVideoStats.googFrameHeightInput = n.frameHeight + "",
                        t.sendVideoStats.googFrameWidthSent = n.frameWidth + "",
                        t.sendVideoStats.googFrameWidthInput = n.frameWidth + "",
                        t.sendVideoStats.googFramesEncoded = n.framesSent + "",
                        t.sendVideoStats.googFrameRateSent = n.framesPerSecond + "")
                    }),
                    t.config.isSubscriber ? (n.push(t.receiveVideoStats),
                    n.push(t.receiveAudioStats)) : (n.push(t.sendAudioStats),
                    n.push(t.sendVideoStats)),
                    n.push({
                        id: "time",
                        startTime: t.connectedTime,
                        timestamp: Date.now()
                    }),
                    e && e(n)
                })
            }
            ,
            e.prototype.getStatsRate = function(e) {
                this.getStats(e)
            }
            ,
            e.prototype.initPeecConnection = function(e) {
                var t = e.stunServerUrl
                  , n = e.turnServer
                  , i = e.iceServers;
                return this.pcConfig = {
                    iceServers: [{
                        urls: "stun:webcs.agora.io:3478"
                    }]
                },
                i instanceof Array ? this.pcConfig.iceServers = e.iceServers : t && (t instanceof Array ? t.map(function(e) {
                    "string" == typeof e && "" !== e && this.pcConfig.iceServers.push({
                        urls: e
                    })
                }) : "string" == typeof t && "" !== t && this.pcConfig.iceServers.push({
                    urls: t
                })),
                n && (n instanceof Array ? n.map(function(e) {
                    "string" == typeof e.url && "" !== e.url && this.pcConfig.iceServers.push({
                        username: e.username,
                        credential: e.credential,
                        url: e.url
                    })
                }) : "auto" !== n.mode && "manual" !== n.mode || (n.udpport && this.pcConfig.iceServers.push({
                    username: n.username,
                    credential: n.credential,
                    credentialType: "password",
                    urls: "turn:" + n.url + ":" + n.udpport + "?transport=udp"
                }),
                "string" == typeof n.tcpport && "" !== n.tcpport && this.pcConfig.iceServers.push({
                    username: n.username,
                    credential: n.credential,
                    credentialType: "password",
                    urls: "turn:" + n.url + ":" + n.tcpport + "?transport=tcp"
                }),
                !0 === n.forceturn && (this.pcConfig.iceTransportPolicy = "relay"))),
                new o.RTCPeerConnection(this.pcConfig)
            }
            ,
            e.prototype._ontrack = function(e) {
                this.onaddstream && this.onaddstream(e, "ontrack")
            }
            ,
            e.prototype._onaddstream = function(e) {
                this.onaddstream && this.onaddstream(e, "onaddstream")
            }
            ,
            e.prototype._oniceconnectionstatechange = function(e) {
                "connected" === e.currentTarget.iceConnectionState && (this.state = a.ESTABLISHED,
                this.connectedTime = Date.now()),
                this.oniceconnectionstatechange && this.oniceconnectionstatechange(e.currentTarget.iceConnectionState)
            }
            ,
            e.prototype._onicecandidate = function(e) {
                !this.candidate && e && (this.candidate = e.candidate,
                this.peerConnection.createOffer({
                    offerToReceiveAudio: !0,
                    offerToReceiveVideo: !0
                }).then(this.editLocalSDP.bind(this)).then(this.setLocalSDP.bind(this)).then(this.sendOffer.bind(this)).catch())
            }
            ,
            e.prototype.setLocalSDP = function(e) {
                return this.peerConnection.setLocalDescription(new RTCSessionDescription({
                    sdp: e.sdp,
                    type: "offer"
                })),
                this.state = a.PREPARING_OFFER,
                e
            }
            ,
            e.prototype.editLocalSDP = function(e) {
                return e.sdp = this.setBandWidth(e.sdp),
                e.sdp = this.reviseOpus(e.sdp),
                e.sdp = this.addCandidate(e.sdp),
                e
            }
            ,
            e.prototype.setSendRecv = function(e) {
                return e = (e = (e = e.replace(/a=recvonly\r\n/g, "a=sendrecv\r\n")).replace(/a=sendonly\r\n/g, "a=sendrecv\r\n")).replace(/a=inactive\r\n/g, "a=sendrecv\r\n")
            }
            ,
            e.prototype.setBandWidth = function(e) {
                var t, n, i = this.config, a = i.codec, o = i.minVideoBW, s = i.maxVideoBW, c = i.maxAudioBW, d = i.clientId;
                if ((t = e.match(/m=video.*\r\n/)) && o && s) {
                    n = t[0] + "b=AS:" + s + "\r\n";
                    var u = 0
                      , l = 0;
                    "h264" === a ? (u = e.search(/a=rtpmap:(\d+) H264\/90000\r\n/),
                    l = e.search(/H264\/90000\r\n/)) : "vp8" === a && (u = e.search(/a=rtpmap:(\d+) VP8\/90000\r\n/),
                    l = e.search(/VP8\/90000\r\n/)),
                    -1 !== u && -1 !== l && l - u > 10 && (n = n + "a=fmtp:" + e.slice(u + 9, l - 1) + " x-google-min-bitrate=" + o + "\r\n"),
                    e = e.replace(t[0], n),
                    r.default.debug("[" + d + "]Set Video Bitrate - min:" + o + " max:" + s)
                }
                return (t = e.match(/m=audio.*\r\n/)) && c && (n = t[0] + "b=AS:" + c + "\r\n",
                e = e.replace(t[0], n)),
                e
            }
            ,
            e.prototype.reviseOpus = function(e) {
                return e = (e = e.replace(/a=rtpmap:102 opus\/48000\/2/g, "a=rtpmap:111 opus/48000/2")).replace(/m=audio 9 UDP\/TLS\/RTP\/SAVPF 102 0 8 97 13 118 101/g, "m=audio 9 UDP/TLS/RTP/SAVPF 111 0 8 97 13 118 101")
            }
            ,
            e.prototype.addCandidate = function(e) {
                return e += "a=candidate:2243255435 1 udp 2122194687 192.168.0.1 30000 typ host generation 0 network-id 1\r\n"
            }
            ,
            e.prototype.sendOffer = function(e) {
                this.config.callback(JSON.stringify({
                    sdp: e.sdp,
                    messageType: "OFFER",
                    tiebreaker: Math.floor(429496723 * Math.random() + 1)
                })),
                this.state = a.OFFER_SENT
            }
            ,
            e
        }();
        t.default = s
    }
    , function(e, t, n) {
        var i = n(28)
          , a = n(29)
          , r = n(30);
        e.exports = function(e, t) {
            return i(e) || a(e, t) || r()
        }
    }
    , function(e, t, n) {
        var i, a;
        a = this,
        void 0 === (i = function() {
            return function() {
                "use strict";
                var e, t = this;
                function n(e) {
                    t.console && (t.console.error ? t.console.error(e) : t.console.log && t.console.log(e))
                }
                function i(e, t, i, a) {
                    var r = a || n
                      , o = e.createShader(i);
                    e.shaderSource(o, t),
                    e.compileShader(o);
                    var s = e.getShaderParameter(o, e.COMPILE_STATUS);
                    if (!s) {
                        var c = e.getShaderInfoLog(o);
                        return r("*** Error compiling shader '" + o + "':" + c),
                        e.deleteShader(o),
                        null
                    }
                    return o
                }
                function a(e, t, i, a, r) {
                    var o = r || n
                      , s = e.createProgram();
                    t.forEach(function(t) {
                        e.attachShader(s, t)
                    }),
                    i && i.forEach(function(t, n) {
                        e.bindAttribLocation(s, a ? a[n] : n, t)
                    }),
                    e.linkProgram(s);
                    var c = e.getProgramParameter(s, e.LINK_STATUS);
                    if (!c) {
                        var d = e.getProgramInfoLog(s);
                        return o("Error in program linking:" + d),
                        e.deleteProgram(s),
                        null
                    }
                    return s
                }
                (e = e || t) === e.top && (console.log("%c%s", "color:blue;font-weight:bold;", "for more about webgl-utils.js see:"),
                console.log("%c%s", "color:blue;font-weight:bold;", "http://webglfundamentals.org/webgl/lessons/webgl-boilerplate.html"));
                var r, o = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
                return !document.documentMode && window.StyleMedia && (HTMLCanvasElement.prototype.getContext = (r = HTMLCanvasElement.prototype.getContext,
                function() {
                    var e = arguments
                      , t = e[0];
                    return "webgl" === t && ((e = [].slice.call(arguments))[0] = "experimental-webgl"),
                    r.apply(this, e)
                }
                )),
                {
                    createProgram: a,
                    createProgramFromSources: function(e, t, n, r, s) {
                        for (var c = [], d = 0; d < t.length; ++d)
                            c.push(i(e, t[d], e[o[d]], s));
                        return a(e, c, n, r, s)
                    }
                }
            }
            .call(a)
        }
        .apply(t, [])) || (e.exports = i)
    }
    , function(e, t, n) {
        "use strict";
        var i = this && this.__awaiter || function(e, t, n, i) {
            return new (n || (n = Promise))(function(a, r) {
                function o(e) {
                    try {
                        c(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        c(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function c(e) {
                    e.done ? a(e.value) : new n(function(t) {
                        t(e.value)
                    }
                    ).then(o, s)
                }
                c((i = i.apply(e, t || [])).next())
            }
            )
        }
          , a = this && this.__generator || function(e, t) {
            var n, i, a, r, o = {
                label: 0,
                sent: function() {
                    if (1 & a[0])
                        throw a[1];
                    return a[1]
                },
                trys: [],
                ops: []
            };
            return r = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function s(r) {
                return function(s) {
                    return function(r) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; o; )
                            try {
                                if (n = 1,
                                i && (a = 2 & r[0] ? i.return : r[0] ? i.throw || ((a = i.return) && a.call(i),
                                0) : i.next) && !(a = a.call(i, r[1])).done)
                                    return a;
                                switch (i = 0,
                                a && (r = [2 & r[0], a.value]),
                                r[0]) {
                                case 0:
                                case 1:
                                    a = r;
                                    break;
                                case 4:
                                    return o.label++,
                                    {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++,
                                    i = r[1],
                                    r = [0];
                                    continue;
                                case 7:
                                    r = o.ops.pop(),
                                    o.trys.pop();
                                    continue;
                                default:
                                    if (!(a = (a = o.trys).length > 0 && a[a.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === r[0] && (!a || r[1] > a[0] && r[1] < a[3])) {
                                        o.label = r[1];
                                        break
                                    }
                                    if (6 === r[0] && o.label < a[1]) {
                                        o.label = a[1],
                                        a = r;
                                        break
                                    }
                                    if (a && o.label < a[2]) {
                                        o.label = a[2],
                                        o.ops.push(r);
                                        break
                                    }
                                    a[2] && o.ops.pop(),
                                    o.trys.pop();
                                    continue
                                }
                                r = t.call(e, o)
                            } catch (e) {
                                r = [6, e],
                                i = 0
                            } finally {
                                n = a = 0
                            }
                        if (5 & r[0])
                            throw r[1];
                        return {
                            value: r[0] ? r[1] : void 0,
                            done: !0
                        }
                    }([r, s])
                }
            }
        }
          , r = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
          , o = this;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(31)
          , c = n(5)
          , d = r(n(0));
        t.getSupportedCodec = function(e) {
            return i(o, void 0, void 0, function() {
                var t, n, i, r, o;
                return a(this, function(a) {
                    switch (a.label) {
                    case 0:
                        return t = {
                            video: [],
                            audio: []
                        },
                        "undefined" != typeof window ? [3, 1] : (d.default.error("getSupportedCodec: NOT_BROWSER_ENV"),
                        [2, Promise.reject("NOT_BROWSER_ENV")]);
                    case 1:
                        try {
                            n = s.createRTCPeerConnection({
                                iceServers: []
                            })
                        } catch (e) {
                            return d.default.error("Failed to init RTCPeerConnection", e),
                            [2, Promise.reject(e)]
                        }
                        return n ? [3, 2] : (d.default.warning("getSupportedCodec: no RTCPeerConnection constructor is detected"),
                        [2, Promise.resolve(t)]);
                    case 2:
                        return e && e.stream ? [3, 7] : (i = {
                            mandatory: {
                                OfferToReceiveAudio: !0,
                                OfferToReceiveVideo: !0
                            }
                        },
                        r = void 0,
                        (c.isSafari() || c.isFireFox() || c.isWeChatBrowser()) && n.addTransceiver ? (n.addTransceiver("audio"),
                        n.addTransceiver("video"),
                        [4, n.createOffer()]) : [3, 4]);
                    case 3:
                        return r = a.sent(),
                        [3, 6];
                    case 4:
                        return [4, new Promise(function(e, t) {
                            var a = setTimeout(function() {
                                t("CREATEOFFER_TIMEOUT")
                            }, 3e3);
                            n.createOffer(function(t) {
                                clearTimeout(a),
                                e(t)
                            }, function(e) {
                                clearTimeout(a),
                                t(e)
                            }, i)
                        }
                        )];
                    case 5:
                        r = a.sent(),
                        a.label = 6;
                    case 6:
                        return n.close(),
                        o = r.sdp,
                        [2, u(o)];
                    case 7:
                        return e.stream.getTracks && n.addTrack ? e.stream.getTracks().forEach(function(t) {
                            n.addTrack(t, e.stream)
                        }) : n.addStream(e.stream),
                        r = void 0,
                        c.isSafari() || c.isFireFox() ? [4, n.createOffer()] : [3, 9];
                    case 8:
                        return r = a.sent(),
                        [3, 11];
                    case 9:
                        return [4, new Promise(function(e, t) {
                            n.createOffer(e, t)
                        }
                        )];
                    case 10:
                        r = a.sent(),
                        a.label = 11;
                    case 11:
                        return n.close(),
                        o = r.sdp,
                        [2, u(o)]
                    }
                })
            })
        }
        ;
        var u = function(e) {
            var t = {
                video: [],
                audio: []
            };
            return e.match(/ VP8/i) && t.video.push("VP8"),
            e.match(/ H264/i) && t.video.push("H264"),
            e.match(/ opus/i) && t.audio.push("OPUS"),
            Promise.resolve(t)
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i(n(4))
          , r = i(n(0))
          , o = n(10);
        t.default = function(e, t) {
            void 0 === t && (t = {
                width: 160,
                height: 120,
                framerate: 15
            });
            var n = t.width
              , i = t.height
              , s = t.framerate
              , c = e.stream;
            if (!c)
                throw a.default.INVALID_LOCAL_STREAM;
            if (!c.getVideoTracks()[0])
                throw a.default.HIGH_STREAM_NOT_VIDEO_TRACE;
            var d = c.getVideoTracks()[0];
            r.default.debug("Start getLowStream");
            var u = document.createElement("video")
              , l = document.createElement("canvas");
            u.setAttribute("style", "display:none"),
            u.setAttribute("muted", ""),
            u.muted = !0,
            u.setAttribute("autoplay", ""),
            u.autoplay = !0,
            u.setAttribute("playsinline", ""),
            l.setAttribute("style", "display:none"),
            l.setAttribute("width", n.toString()),
            l.setAttribute("height", i.toString());
            var f = l.getContext("2d");
            if (!f)
                throw new Error("not get canvas context");
            u.srcObject = c,
            document.body.append(u),
            document.body.append(l),
            u.play(),
            r.default.debug("Start render lowStream");
            var p = o.audioTimerLoop(function() {
                return function() {
                    if (u.paused && u.play(),
                    u.videoHeight > 2 && u.videoWidth > 2) {
                        var t = u.videoWidth
                          , n = u.videoHeight / t
                          , i = l.width * n;
                        Math.abs(i - l.height) >= 2 && (r.default.debug("adjust low stream resolution", l.width + "x" + l.height + " -> " + l.width + "x" + i),
                        l.height = i)
                    }
                    f.drawImage(u, 0, 0, l.width, l.height);
                    var a = e.stream;
                    if (a) {
                        var o = a.getVideoTracks()[0];
                        d !== o && (r.default.debug("adjust low stream track"),
                        u.srcObject = a,
                        d = o)
                    }
                }()
            }, s)
              , g = l.captureStream(s)
              , m = g.getVideoTracks()[0];
            return m.requestFrame && m.requestFrame(),
            g.clean = function() {
                r.default.debug("Start clean lowStream"),
                p(),
                (u || u.parentNode || u.parentNode.removeChild) && u.parentNode.removeChild(u),
                (l || l.parentNode || l.parentNode.removeChild) && l.parentNode.removeChild(l),
                r.default.debug("Clean lowStream")
            }
            ,
            g
        }
    }
    , function(e, t) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var i = new Uint8Array(16);
            e.exports = function() {
                return n(i),
                i
            }
        } else {
            var a = new Array(16);
            e.exports = function() {
                for (var e, t = 0; t < 16; t++)
                    0 == (3 & t) && (e = 4294967296 * Math.random()),
                    a[t] = e >>> ((3 & t) << 3) & 255;
                return a
            }
        }
    }
    , function(e, t) {
        for (var n = [], i = 0; i < 256; ++i)
            n[i] = (i + 256).toString(16).substr(1);
        e.exports = function(e, t) {
            var i = t || 0
              , a = n;
            return [a[e[i++]], a[e[i++]], a[e[i++]], a[e[i++]], "-", a[e[i++]], a[e[i++]], "-", a[e[i++]], a[e[i++]], "-", a[e[i++]], a[e[i++]], "-", a[e[i++]], a[e[i++]], a[e[i++]], a[e[i++]], a[e[i++]], a[e[i++]]].join("")
        }
    }
    , function(e, t) {
        e.exports = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
    }
    , function(e, t, n) {
        var i = function() {
            return this || "object" == typeof self && self
        }() || Function("return this")()
          , a = i.regeneratorRuntime && Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime") >= 0
          , r = a && i.regeneratorRuntime;
        if (i.regeneratorRuntime = void 0,
        e.exports = n(27),
        a)
            i.regeneratorRuntime = r;
        else
            try {
                delete i.regeneratorRuntime
            } catch (e) {
                i.regeneratorRuntime = void 0
            }
    }
    , function(e, t) {
        !function(t) {
            "use strict";
            var n, i = Object.prototype, a = i.hasOwnProperty, r = "function" == typeof Symbol ? Symbol : {}, o = r.iterator || "@@iterator", s = r.asyncIterator || "@@asyncIterator", c = r.toStringTag || "@@toStringTag", d = "object" == typeof e, u = t.regeneratorRuntime;
            if (u)
                d && (e.exports = u);
            else {
                (u = t.regeneratorRuntime = d ? e.exports : {}).wrap = E;
                var l = "suspendedStart"
                  , f = "suspendedYield"
                  , p = "executing"
                  , g = "completed"
                  , m = {}
                  , v = {};
                v[o] = function() {
                    return this
                }
                ;
                var S = Object.getPrototypeOf
                  , h = S && S(S(k([])));
                h && h !== i && a.call(h, o) && (v = h);
                var _ = b.prototype = T.prototype = Object.create(v);
                y.prototype = _.constructor = b,
                b.constructor = y,
                b[c] = y.displayName = "GeneratorFunction",
                u.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === y || "GeneratorFunction" === (t.displayName || t.name))
                }
                ,
                u.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : (e.__proto__ = b,
                    c in e || (e[c] = "GeneratorFunction")),
                    e.prototype = Object.create(_),
                    e
                }
                ,
                u.awrap = function(e) {
                    return {
                        __await: e
                    }
                }
                ,
                R(A.prototype),
                A.prototype[s] = function() {
                    return this
                }
                ,
                u.AsyncIterator = A,
                u.async = function(e, t, n, i) {
                    var a = new A(E(e, t, n, i));
                    return u.isGeneratorFunction(t) ? a : a.next().then(function(e) {
                        return e.done ? e.value : a.next()
                    })
                }
                ,
                R(_),
                _[c] = "Generator",
                _[o] = function() {
                    return this
                }
                ,
                _.toString = function() {
                    return "[object Generator]"
                }
                ,
                u.keys = function(e) {
                    var t = [];
                    for (var n in e)
                        t.push(n);
                    return t.reverse(),
                    function n() {
                        for (; t.length; ) {
                            var i = t.pop();
                            if (i in e)
                                return n.value = i,
                                n.done = !1,
                                n
                        }
                        return n.done = !0,
                        n
                    }
                }
                ,
                u.values = k,
                w.prototype = {
                    constructor: w,
                    reset: function(e) {
                        if (this.prev = 0,
                        this.next = 0,
                        this.sent = this._sent = n,
                        this.done = !1,
                        this.delegate = null,
                        this.method = "next",
                        this.arg = n,
                        this.tryEntries.forEach(N),
                        !e)
                            for (var t in this)
                                "t" === t.charAt(0) && a.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = n)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type)
                            throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(e) {
                        if (this.done)
                            throw e;
                        var t = this;
                        function i(i, a) {
                            return s.type = "throw",
                            s.arg = e,
                            t.next = i,
                            a && (t.method = "next",
                            t.arg = n),
                            !!a
                        }
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r]
                              , s = o.completion;
                            if ("root" === o.tryLoc)
                                return i("end");
                            if (o.tryLoc <= this.prev) {
                                var c = a.call(o, "catchLoc")
                                  , d = a.call(o, "finallyLoc");
                                if (c && d) {
                                    if (this.prev < o.catchLoc)
                                        return i(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc)
                                        return i(o.finallyLoc)
                                } else if (c) {
                                    if (this.prev < o.catchLoc)
                                        return i(o.catchLoc, !0)
                                } else {
                                    if (!d)
                                        throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc)
                                        return i(o.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var i = this.tryEntries[n];
                            if (i.tryLoc <= this.prev && a.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                                var r = i;
                                break
                            }
                        }
                        r && ("break" === e || "continue" === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
                        var o = r ? r.completion : {};
                        return o.type = e,
                        o.arg = t,
                        r ? (this.method = "next",
                        this.next = r.finallyLoc,
                        m) : this.complete(o)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type)
                            throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                        this.method = "return",
                        this.next = "end") : "normal" === e.type && t && (this.next = t),
                        m
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.finallyLoc === e)
                                return this.complete(n.completion, n.afterLoc),
                                N(n),
                                m
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.tryLoc === e) {
                                var i = n.completion;
                                if ("throw" === i.type) {
                                    var a = i.arg;
                                    N(n)
                                }
                                return a
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(e, t, i) {
                        return this.delegate = {
                            iterator: k(e),
                            resultName: t,
                            nextLoc: i
                        },
                        "next" === this.method && (this.arg = n),
                        m
                    }
                }
            }
            function E(e, t, n, i) {
                var a = t && t.prototype instanceof T ? t : T
                  , r = Object.create(a.prototype)
                  , o = new w(i || []);
                return r._invoke = function(e, t, n) {
                    var i = l;
                    return function(a, r) {
                        if (i === p)
                            throw new Error("Generator is already running");
                        if (i === g) {
                            if ("throw" === a)
                                throw r;
                            return D()
                        }
                        for (n.method = a,
                        n.arg = r; ; ) {
                            var o = n.delegate;
                            if (o) {
                                var s = C(o, n);
                                if (s) {
                                    if (s === m)
                                        continue;
                                    return s
                                }
                            }
                            if ("next" === n.method)
                                n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if (i === l)
                                    throw i = g,
                                    n.arg;
                                n.dispatchException(n.arg)
                            } else
                                "return" === n.method && n.abrupt("return", n.arg);
                            i = p;
                            var c = I(e, t, n);
                            if ("normal" === c.type) {
                                if (i = n.done ? g : f,
                                c.arg === m)
                                    continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                }
                            }
                            "throw" === c.type && (i = g,
                            n.method = "throw",
                            n.arg = c.arg)
                        }
                    }
                }(e, n, o),
                r
            }
            function I(e, t, n) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, n)
                    }
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    }
                }
            }
            function T() {}
            function y() {}
            function b() {}
            function R(e) {
                ["next", "throw", "return"].forEach(function(t) {
                    e[t] = function(e) {
                        return this._invoke(t, e)
                    }
                })
            }
            function A(e) {
                var t;
                this._invoke = function(n, i) {
                    function r() {
                        return new Promise(function(t, r) {
                            !function t(n, i, r, o) {
                                var s = I(e[n], e, i);
                                if ("throw" !== s.type) {
                                    var c = s.arg
                                      , d = c.value;
                                    return d && "object" == typeof d && a.call(d, "__await") ? Promise.resolve(d.__await).then(function(e) {
                                        t("next", e, r, o)
                                    }, function(e) {
                                        t("throw", e, r, o)
                                    }) : Promise.resolve(d).then(function(e) {
                                        c.value = e,
                                        r(c)
                                    }, function(e) {
                                        return t("throw", e, r, o)
                                    })
                                }
                                o(s.arg)
                            }(n, i, t, r)
                        }
                        )
                    }
                    return t = t ? t.then(r, r) : r()
                }
            }
            function C(e, t) {
                var i = e.iterator[t.method];
                if (i === n) {
                    if (t.delegate = null,
                    "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return",
                        t.arg = n,
                        C(e, t),
                        "throw" === t.method))
                            return m;
                        t.method = "throw",
                        t.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return m
                }
                var a = I(i, e.iterator, t.arg);
                if ("throw" === a.type)
                    return t.method = "throw",
                    t.arg = a.arg,
                    t.delegate = null,
                    m;
                var r = a.arg;
                return r ? r.done ? (t[e.resultName] = r.value,
                t.next = e.nextLoc,
                "return" !== t.method && (t.method = "next",
                t.arg = n),
                t.delegate = null,
                m) : r : (t.method = "throw",
                t.arg = new TypeError("iterator result is not an object"),
                t.delegate = null,
                m)
            }
            function O(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]),
                2 in e && (t.finallyLoc = e[2],
                t.afterLoc = e[3]),
                this.tryEntries.push(t)
            }
            function N(e) {
                var t = e.completion || {};
                t.type = "normal",
                delete t.arg,
                e.completion = t
            }
            function w(e) {
                this.tryEntries = [{
                    tryLoc: "root"
                }],
                e.forEach(O, this),
                this.reset(!0)
            }
            function k(e) {
                if (e) {
                    var t = e[o];
                    if (t)
                        return t.call(e);
                    if ("function" == typeof e.next)
                        return e;
                    if (!isNaN(e.length)) {
                        var i = -1
                          , r = function t() {
                            for (; ++i < e.length; )
                                if (a.call(e, i))
                                    return t.value = e[i],
                                    t.done = !1,
                                    t;
                            return t.value = n,
                            t.done = !0,
                            t
                        };
                        return r.next = r
                    }
                }
                return {
                    next: D
                }
            }
            function D() {
                return {
                    value: n,
                    done: !0
                }
            }
        }(function() {
            return this || "object" == typeof self && self
        }() || Function("return this")())
    }
    , function(e, t) {
        e.exports = function(e) {
            if (Array.isArray(e))
                return e
        }
    }
    , function(e, t) {
        e.exports = function(e, t) {
            var n = []
              , i = !0
              , a = !1
              , r = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value),
                !t || n.length !== t); i = !0)
                    ;
            } catch (e) {
                a = !0,
                r = e
            } finally {
                try {
                    i || null == s.return || s.return()
                } finally {
                    if (a)
                        throw r
                }
            }
            return n
        }
    }
    , function(e, t) {
        e.exports = function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = "object" == typeof window && window.RTCPeerConnection
          , a = "object" == typeof window && window.webkitRTCPeerConnection
          , r = "object" == typeof window && window.mozRTCPeerConnection;
        t.createRTCPeerConnection = function(e) {
            var t = i || a || r;
            return t ? new t(e) : null
        }
    }
    , function(e, t, n) {
        var i;
        /*!
 * EventEmitter v5.2.8 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */
        !function(t) {
            "use strict";
            function a() {}
            var r = a.prototype
              , o = t.EventEmitter;
            function s(e, t) {
                for (var n = e.length; n--; )
                    if (e[n].listener === t)
                        return n;
                return -1
            }
            function c(e) {
                return function() {
                    return this[e].apply(this, arguments)
                }
            }
            r.getListeners = function(e) {
                var t, n, i = this._getEvents();
                if (e instanceof RegExp)
                    for (n in t = {},
                    i)
                        i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
                else
                    t = i[e] || (i[e] = []);
                return t
            }
            ,
            r.flattenListeners = function(e) {
                var t, n = [];
                for (t = 0; t < e.length; t += 1)
                    n.push(e[t].listener);
                return n
            }
            ,
            r.getListenersAsObject = function(e) {
                var t, n = this.getListeners(e);
                return n instanceof Array && ((t = {})[e] = n),
                t || n
            }
            ,
            r.addListener = function(e, t) {
                if (!function e(t) {
                    return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
                }(t))
                    throw new TypeError("listener must be a function");
                var n, i = this.getListenersAsObject(e), a = "object" == typeof t;
                for (n in i)
                    i.hasOwnProperty(n) && -1 === s(i[n], t) && i[n].push(a ? t : {
                        listener: t,
                        once: !1
                    });
                return this
            }
            ,
            r.on = c("addListener"),
            r.addOnceListener = function(e, t) {
                return this.addListener(e, {
                    listener: t,
                    once: !0
                })
            }
            ,
            r.once = c("addOnceListener"),
            r.defineEvent = function(e) {
                return this.getListeners(e),
                this
            }
            ,
            r.defineEvents = function(e) {
                for (var t = 0; t < e.length; t += 1)
                    this.defineEvent(e[t]);
                return this
            }
            ,
            r.removeListener = function(e, t) {
                var n, i, a = this.getListenersAsObject(e);
                for (i in a)
                    a.hasOwnProperty(i) && -1 !== (n = s(a[i], t)) && a[i].splice(n, 1);
                return this
            }
            ,
            r.off = c("removeListener"),
            r.addListeners = function(e, t) {
                return this.manipulateListeners(!1, e, t)
            }
            ,
            r.removeListeners = function(e, t) {
                return this.manipulateListeners(!0, e, t)
            }
            ,
            r.manipulateListeners = function(e, t, n) {
                var i, a, r = e ? this.removeListener : this.addListener, o = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp)
                    for (i = n.length; i--; )
                        r.call(this, t, n[i]);
                else
                    for (i in t)
                        t.hasOwnProperty(i) && (a = t[i]) && ("function" == typeof a ? r.call(this, i, a) : o.call(this, i, a));
                return this
            }
            ,
            r.removeEvent = function(e) {
                var t, n = typeof e, i = this._getEvents();
                if ("string" === n)
                    delete i[e];
                else if (e instanceof RegExp)
                    for (t in i)
                        i.hasOwnProperty(t) && e.test(t) && delete i[t];
                else
                    delete this._events;
                return this
            }
            ,
            r.removeAllListeners = c("removeEvent"),
            r.emitEvent = function(e, t) {
                var n, i, a, r, o = this.getListenersAsObject(e);
                for (r in o)
                    if (o.hasOwnProperty(r))
                        for (n = o[r].slice(0),
                        a = 0; a < n.length; a++)
                            !0 === (i = n[a]).once && this.removeListener(e, i.listener),
                            i.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, i.listener);
                return this
            }
            ,
            r.trigger = c("emitEvent"),
            r.emit = function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t)
            }
            ,
            r.setOnceReturnValue = function(e) {
                return this._onceReturnValue = e,
                this
            }
            ,
            r._getOnceReturnValue = function() {
                return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
            }
            ,
            r._getEvents = function() {
                return this._events || (this._events = {})
            }
            ,
            a.noConflict = function() {
                return t.EventEmitter = o,
                a
            }
            ,
            void 0 === (i = function() {
                return a
            }
            .call(t, n, t, e)) || (e.exports = i)
        }("undefined" != typeof window ? window : this || {})
    }
    , function(e, t) {
        e.exports = function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = new Array(e.length); t < e.length; t++)
                    n[t] = e[t];
                return n
            }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))
                return Array.from(e)
        }
    }
    , function(e, t) {
        e.exports = function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }
    }
    , function(t, n, a) {
        "use strict";
        a.r(n);
        var r = a(3)
          , o = a(0)
          , s = a(2)
          , c = function() {
            var e = {
                dispatcher: {}
            };
            return e.dispatcher.eventListeners = {},
            e.addEventListener = function(t, n) {
                void 0 === e.dispatcher.eventListeners[t] && (e.dispatcher.eventListeners[t] = []),
                e.dispatcher.eventListeners[t].push(n)
            }
            ,
            e.hasListeners = function(t) {
                return !(!e.dispatcher.eventListeners[t] || !e.dispatcher.eventListeners[t].length)
            }
            ,
            e.on = e.addEventListener,
            e.removeEventListener = function(t, n) {
                var i;
                e.dispatcher.eventListeners[t] && -1 !== (i = e.dispatcher.eventListeners[t].indexOf(n)) && e.dispatcher.eventListeners[t].splice(i, 1)
            }
            ,
            e.dispatchEvent = function(t) {
                var n;
                for (n in e.dispatcher.eventListeners[t.type])
                    if (e.dispatcher.eventListeners[t.type] && e.dispatcher.eventListeners[t.type].hasOwnProperty(n) && "function" == typeof e.dispatcher.eventListeners[t.type][n])
                        try {
                            e.dispatcher.eventListeners[t.type][n](t)
                        } catch (n) {
                            o.default.debug("[".concat(e.clientId, "] Error in ").concat(t.type, " event"), n)
                        }
            }
            ,
            e.dispatchSocketEvent = function(t) {
                var n;
                for (n in e.dispatcher.eventListeners[t.type])
                    e.dispatcher.eventListeners[t.type] && e.dispatcher.eventListeners[t.type].hasOwnProperty(n) && "function" == typeof e.dispatcher.eventListeners[t.type][n] && e.dispatcher.eventListeners[t.type][n](t.msg)
            }
            ,
            e
        }
          , d = function(e) {
            var t = {};
            return t.type = e.type,
            t
        }
          , u = function(e) {
            var t = d(e);
            return t.stream = e.stream,
            t.reason = e.reason,
            t.msg = e.msg,
            t
        }
          , l = function(e) {
            var t = d(e);
            return t.uid = e.uid,
            t.attr = e.attr,
            t.stream = e.stream,
            t
        }
          , f = function(e) {
            var t = d(e);
            return t.msg = e.msg,
            t
        }
          , p = function(e) {
            var t = d(e);
            return t.url = e.url,
            t.uid = e.uid,
            t.status = e.status,
            t.reason = e.reason,
            t
        }
          , g = a(5)
          , m = function() {};
        m.prototype.set = function(e, t) {
            ["BatteryLevel"].indexOf(e) > -1 && (this[e] = t)
        }
        ;
        var v = new function() {
            var e = c();
            return e.states = {
                UNINIT: "UNINIT",
                INITING: "INITING",
                INITED: "INITED"
            },
            e.state = e.states.UNINIT,
            e.batteryManager = null,
            e._init = function(t, n) {
                e.state = e.states.INITING,
                navigator.getBattery ? navigator.getBattery().then(function(n) {
                    e.batteryManager = n,
                    t && setTimeout(function() {
                        t()
                    }, 0)
                }).catch(function(e) {
                    o.default.debug("navigator.getBattery is disabled", e),
                    t && t()
                }) : (e.state = e.states.INITED,
                t && t())
            }
            ,
            e._getBatteryStats = function() {
                var t = {};
                return e.batteryManager && e.batteryManager.level ? t.BatteryLevel = Math.floor(100 * e.batteryManager.level) : t.BatteryLevel = "UNSUPPORTED",
                t
            }
            ,
            e.getStats = function(t, n) {
                var i = new m
                  , a = e._getBatteryStats();
                a && a.BatteryLevel && i.set("BatteryLevel", a.BatteryLevel),
                t && t(i)
            }
            ,
            e._init(),
            e
        }
          , S = a(6)
          , h = a.n(S)
          , _ = function(e) {
            var t = c(e);
            return t.url = ".",
            t
        }
          , E = a(13)
          , I = a(4)
          , T = 0
          , y = function(e) {
            var t = _({});
            t.id = e.id,
            t.playerId = T++,
            t.destroyed = !1,
            t.fit = e.options && e.options.fit,
            "contain" !== t.fit && "cover" !== t.fit && (t.fit = null),
            t.url = e.url,
            t.stream = e.stream.stream,
            t.isFreeze = !1,
            t.freezeCount = 0,
            t.lastFreezeCount = 0,
            t.lastTimeupdateTime = 0,
            t.elementID = e.elementID,
            t.setAudioOutput = function(e, n, i) {
                var a = t.video || t.audio;
                return a ? a.setSinkId ? void a.setSinkId(e).then(function() {
                    return o.default.debug("[" + t.id + "] " + "video ".concat(t.id, " setAudioOutput ").concat(e, " SUCCESS")),
                    a == t.video && t.audio ? t.audio.setSinkId(e) : Promise.resolve()
                }).then(function() {
                    return o.default.debug("[" + t.id + "] " + "audio ".concat(t.id, " setAudioOutput ").concat(e, " SUCCESS")),
                    n && n()
                }).catch(function(e) {
                    return o.default.error("[" + t.id + "] VideoPlayer.setAudioOutput", e),
                    i && i(e)
                }) : (o.default.error("[" + t.id + "] ", I.default.WEB_API_NOT_SUPPORTED),
                i && i(I.default.WEB_API_NOT_SUPPORTED)) : (o.default.error("[" + t.id + "] ", I.default.PLAYER_NOT_FOUND),
                i && i(I.default.PLAYER_NOT_FOUND))
            }
            ,
            t.destroy = function() {
                o.default.debug("[".concat(t.id, "] destroy ").concat(e.stream.local ? "local" : "remote", " Player ").concat(t.id)),
                Object(E.setSrcObject)(t.video, null),
                Object(E.setSrcObject)(t.audio, null),
                t.video.pause(),
                t.freezeCheckInterval && clearInterval(t.freezeCheckInterval),
                t.destroyed = !0,
                delete t.resizer,
                document.getElementById(t.div.id) && t.parentNode.contains(t.div) && t.parentNode.removeChild(t.div),
                ["video", "audio"].forEach(function(n) {
                    t[n];
                    var i = a[n];
                    clearTimeout(i.playDeferTimeout),
                    i.formerMediaState = null;
                    var r = {
                        playerId: t.playerId,
                        stateId: i.stateId + 1,
                        playDeferTimeout: null,
                        error: !1,
                        status: "aborted",
                        reason: "stop",
                        updatedAt: Date.now()
                    };
                    a[n] = r;
                    var c = {
                        type: "player-status-change",
                        playerId: t.playerId,
                        mediaType: n,
                        status: r.status,
                        reason: r.reason,
                        isErrorState: !1,
                        streamId: t.id
                    };
                    o.default.debug("[".concat(t.id, "] Media Player Status Change Triggered by destroy()"), c),
                    e.stream.dispatchEvent(c),
                    s.b.reportApiInvoke(e.stream.sid, {
                        name: "Stream.playerStatusChange",
                        options: c,
                        tag: "tracer"
                    })()
                })
            }
            ,
            t.div = document.createElement("div"),
            t.div.setAttribute("id", "player_" + t.id),
            e.stream.video ? t.div.setAttribute("style", "width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;") : t.div.setAttribute("style", "width: 100%; height: 100%; position: relative; overflow: hidden;"),
            t.video = document.createElement("video"),
            t.video.setAttribute("id", "video" + t.id),
            e.stream.local && !e.stream.screen ? e.stream.mirror ? t.video.setAttribute("style", "width: 100%; height: 100%; position: absolute; transform: rotateY(180deg); object-fit: ".concat(t.fit || "cover", ";")) : t.video.setAttribute("style", "width: 100%; height: 100%; position: absolute; object-fit: ".concat(t.fit || "cover", ";")) : e.stream.video ? t.video.setAttribute("style", "width: 100%; height: 100%; position: absolute; object-fit: ".concat(t.fit || "cover", ";")) : e.stream.screen ? t.video.setAttribute("style", "width: 100%; height: 100%; position: absolute; object-fit: ".concat(t.fit || "contain")) : t.video.setAttribute("style", "width: 100%; height: 100%; position: absolute; display: none; object-fit: ".concat(t.fit || "cover"));
            var n = {
                autoplay: !0,
                muted: !!e.stream.local || !(!g.isSafari() && "iOS" !== g.getBrowserOS()) && "video_element_muted",
                playsinline: !0,
                controls: !1,
                volume: null
            }
              , i = h()({}, n, e.options);
            !0 !== i.muted || i.volume || (i.volume = 0),
            t.video.setAttribute("autoplay", ""),
            t.video.setAttribute("muted", ""),
            t.video.muted = !0,
            t.video.autoplay = !0,
            i.playsinline && t.video.setAttribute("playsinline", ""),
            i.controls && t.video.setAttribute("controls", ""),
            i.contains && (t.video.controls = !0),
            Number.isFinite(i.volume) && (t.video.volume = i.volume),
            t.audio = document.createElement("audio"),
            t.audio.setAttribute("id", "audio" + t.id),
            !0 === i.muted && t.audio.setAttribute("muted", ""),
            !0 === i.muted && (t.audio.muted = !0),
            i.playsinline && t.audio.setAttribute("playsinline", ""),
            Number.isFinite(i.volume) && (t.audio.volume = i.volume),
            void 0 !== t.elementID ? (document.getElementById(t.elementID).appendChild(t.div),
            t.container = document.getElementById(t.elementID)) : (document.body.appendChild(t.div),
            t.container = document.body),
            t.parentNode = t.div.parentNode;
            var a = {
                video: {
                    playerId: t.playerId,
                    stateId: 0,
                    playDeferTimeout: null,
                    error: !1,
                    status: "init",
                    reason: null,
                    updatedAt: Date.now()
                },
                audio: {
                    playerId: t.playerId,
                    stateId: 0,
                    playDeferTimeout: null,
                    error: !1,
                    status: "init",
                    reason: null,
                    updatedAt: Date.now()
                }
            };
            t.mediaElemExists = function(e) {
                for (var t = e, n = 0; n < Object(r.getParameter)("MEDIA_ELEMENT_EXISTS_DEPTH") && t; n++)
                    t = t.parentNode;
                return !!t
            }
            ;
            var c = function(e) {
                return t.mediaElemExists(e) ? e.paused ? "paused" : "play" : "aborted"
            }
              , d = function(e, t, n) {
                var i = c(e)
                  , a = !0;
                return "paused" === i ? ("audio" === t && !0 === n.muted && (a = !1),
                n.autoplay || (a = !1)) : "play" === i ? "video" === t ? a = !1 : !0 === n.muted ? e.muted && (a = !1) : e.muted || (a = !1) : "aborted" === i && (a = !1),
                a
            }
              , u = function(n) {
                var u, l = this;
                if (l === t.video ? u = "video" : l === t.audio && (u = "audio"),
                u) {
                    n.type || o.default.error("[".concat(t.id, "] Unexpected evt"), n);
                    var f = c(l);
                    clearTimeout(a[u].playDeferTimeout),
                    a[u].playDeferTimeout = setTimeout(function() {
                        a[u].playDeferTimeout = null;
                        var r = a[u]
                          , p = c(l);
                        if (f === p) {
                            var g = {
                                playerId: t.playerId,
                                stateId: r.stateId + 1,
                                playDeferTimeout: null,
                                error: d(l, u, i),
                                status: c(l),
                                reason: n.type,
                                updatedAt: Date.now()
                            };
                            if (r.status !== g.status) {
                                a[u] = g;
                                var m = {
                                    type: "player-status-change",
                                    playerId: t.playerId,
                                    mediaType: u,
                                    status: g.status,
                                    reason: g.reason,
                                    isErrorState: g.error,
                                    streamId: t.id
                                };
                                o.default.debug("[".concat(t.id, "] Media Player Status Change"), m),
                                e.stream.dispatchEvent(m),
                                s.b.reportApiInvoke(e.stream.sid, {
                                    name: "Stream.playerStatusChange",
                                    options: m,
                                    tag: "tracer"
                                })()
                            }
                        } else
                            o.default.debug("[".concat(t.id, "] Status Change after event Triggered.") + "Stream ".concat(t.id, " PlayerId ").concat(t.playerId, " mediaType ").concat(u, " Status ").concat(f, "=>").concat(p))
                    }, Object(r.getParameter)("PLAYER_STATE_DEFER"))
                } else
                    o.default.error("[".concat(t.id, "] Unknown media element"), l)
            };
            t.video.addEventListener("playing", function(e) {
                !function e() {
                    t.video.videoWidth * t.video.videoHeight > 4 ? o.default.debug("[" + t.id + "] video dimensions:", t.video.videoWidth, t.video.videoHeight) : setTimeout(e, 50)
                }()
            });
            t.freezeCheckInterval = setInterval(function() {
                Date.now() - t.lastTimeupdateTime > 500 ? (t.isFreeze = !0,
                t.freezeCount += 1) : t.isFreeze = !1
            }, 500),
            t.video.addEventListener("playing", u),
            t.video.addEventListener("canplay", u),
            t.video.addEventListener("abort", u),
            t.video.addEventListener("onerror", u),
            t.video.addEventListener("suspend", u),
            t.video.addEventListener("stalled", u),
            t.video.addEventListener("pause", u),
            t.video.addEventListener("timeupdate", function() {
                t.lastTimeupdateTime = Date.now()
            }),
            t.audio.addEventListener("playing", u),
            t.audio.addEventListener("canplay", u),
            t.audio.addEventListener("abort", u),
            t.audio.addEventListener("onerror", u),
            t.audio.addEventListener("suspend", u),
            t.audio.addEventListener("stalled", u),
            t.audio.addEventListener("pause", u);
            var l = t.audio
              , f = "audio";
            if (e.stream.hasVideo() || e.stream.hasScreen())
                t.div.appendChild(t.video),
                t.div.appendChild(t.audio),
                g.isEdge() ? t.video.srcObject = e.stream.stream : (Object(E.attachMediaStream)(t.video, e.stream.stream),
                Object(E.attachMediaStream)(t.audio, e.stream.stream));
            else {
                !1 !== i.muted && "video_element_muted" !== i.muted || (t.video.removeAttribute("muted"),
                t.video.muted = !1),
                t.video.removeAttribute("autoplay"),
                t.video.autoplay = !1,
                t.div.appendChild(t.video),
                l = t.video,
                f = "video";
                var p = a.audio
                  , m = {
                    playerId: t.playerId,
                    stateId: p.stateId + 1,
                    playDeferTimeout: null,
                    error: !1,
                    status: "aborted",
                    reason: "audioonly",
                    updatedAt: Date.now()
                };
                a.audio = m;
                var v = {
                    type: "player-status-change",
                    playerId: t.playerId,
                    mediaType: "audio",
                    status: m.status,
                    reason: m.reason,
                    isErrorState: m.error,
                    streamId: t.id
                };
                if (o.default.debug("[".concat(t.id, "] Media Player Status Change"), v),
                Promise.resolve().then(function() {
                    return e.stream.dispatchEvent(v)
                }),
                s.b.reportApiInvoke(e.stream.sid, {
                    name: "Stream.playerStatusChange",
                    options: v,
                    tag: "tracer"
                })(),
                window.MediaStream && (g.isSafari() || "iOS" === g.getBrowserOS())) {
                    var S = new MediaStream(e.stream.stream.getAudioTracks());
                    Object(E.setSrcObject)(t.video, S)
                } else
                    Object(E.setSrcObject)(t.video, e.stream.stream)
            }
            if (i.autoplay && l) {
                var y = l.play();
                y && y.catch && y.catch(function(n) {
                    if (!t.destroyed && l) {
                        var r = a[f]
                          , u = {
                            playerId: t.playerId,
                            stateId: r.stateId + 1,
                            playDeferTimeout: null,
                            error: d(l, f, i),
                            status: c(l),
                            reason: "error",
                            updatedAt: Date.now()
                        };
                        if (r.status !== u.status) {
                            o.default.debug("[".concat(t.id, "] Player ").concat(t.playerId, " Status Changed Detected by promise error: ").concat(r.status, "=>").concat(u.status), n),
                            a[f] = u;
                            var p = {
                                type: "player-status-change",
                                playerId: t.playerId,
                                mediaType: f,
                                status: u.status,
                                reason: u.reason,
                                isErrorState: u.error,
                                streamId: t.id
                            };
                            o.default.debug("[".concat(t.id, "] Media Player Status Change"), p),
                            e.stream.dispatchEvent(p),
                            s.b.reportApiInvoke(e.stream.sid, {
                                name: "Stream.playerStatusChange",
                                options: p,
                                tag: "tracer"
                            })()
                        }
                    }
                })
            }
            return t.setAudioVolume = function(e) {
                var n = parseInt(e) / 100;
                isFinite(n) && (n < 0 ? n = 0 : n > 1 && (n = 1),
                t.video && (t.video.volume = n),
                t.audio && (t.audio.volume = n))
            }
            ,
            t
        }
          , b = function(e) {
            var t = {}
              , n = E.RTCPeerConnection;
            t.uid = e.uid,
            t.isVideoMute = e.isVideoMute,
            t.isAudioMute = e.isAudioMute,
            t.isSubscriber = e.isSubscriber,
            t.clientId = e.clientId,
            t.filterStatsCache = [],
            t.originStatsCache = [],
            t.lastTimeGetStats = null,
            t.pc_config = {
                iceServers: [{
                    url: "stun:webcs.agora.io:3478"
                }]
            };
            var i = {
                id: "outbound_audio_ssrc_send",
                type: "ssrc",
                mediaType: "",
                googCodecName: "opus",
                aecDivergentFilterFraction: "0",
                audioInputLevel: "0",
                bytesSent: "0",
                packetsSent: "0",
                googEchoCancellationReturnLoss: "0",
                googEchoCancellationReturnLossEnhancement: "0"
            }
              , a = {
                id: "outbound_video_ssrc_send",
                type: "ssrc",
                mediaType: "",
                googCodecName: "h264" === e.codec ? "H264" : "VP8",
                bytesSent: "0",
                packetsLost: "0",
                packetsSent: "0",
                googAdaptationChanges: "0",
                googAvgEncodeMs: "0",
                googEncodeUsagePercent: "0",
                googFirsReceived: "0",
                googFrameHeightSent: "0",
                googFrameHeightInput: "0",
                googFrameRateInput: "0",
                googFrameRateSent: "0",
                googFrameWidthSent: "0",
                googFrameWidthInput: "0",
                googNacksReceived: "0",
                googPlisReceived: "0",
                googRtt: "0"
            }
              , s = {
                id: "inbound_audio_ssrc_recv",
                type: "ssrc",
                mediaType: "",
                googCodecName: "opus",
                audioOutputLevel: "0",
                bytesReceived: "0",
                packetsLost: "0",
                packetsReceived: "0",
                googAccelerateRate: "0",
                googCurrentDelayMs: "0",
                googDecodingCNG: "0",
                googDecodingCTN: "0",
                googDecodingCTSG: "0",
                googDecodingNormal: "0",
                googDecodingPLC: "0",
                googDecodingPLCCNG: "0",
                googExpandRate: "0",
                googJitterBufferMs: "0",
                googJitterReceived: "0",
                googPreemptiveExpandRate: "0",
                googPreferredJitterBufferMs: "0",
                googSecondaryDecodedRate: "0",
                googSpeechExpandRate: "0"
            }
              , c = {
                id: "inbound_video_ssrc_recv",
                type: "ssrc",
                mediaType: "",
                googTargetDelayMs: "0",
                packetsLost: "0",
                googDecodeMs: "0",
                googMaxDecodeMs: "0",
                googRenderDelayMs: "0",
                googFrameWidthReceived: "0",
                googFrameHeightReceived: "0",
                googFrameRateReceived: "0",
                googFrameRateDecoded: "0",
                googFrameRateOutput: "0",
                googJitterBufferMs: "0",
                googCurrentDelayMs: "0",
                googMinPlayoutDelayMs: "0",
                googNacksSent: "0",
                googPlisSent: "0",
                googFirsSent: "0",
                bytesReceived: "0",
                packetsReceived: "0",
                googFramesReceived: "0",
                googFramesDecoded: "0"
            }
              , d = {
                id: "bweforvideo",
                type: "VideoBwe",
                googAvailableSendBandwidth: "0",
                googAvailableReceiveBandwidth: "0",
                googActualEncBitrate: "0",
                googRetransmitBitrate: "0",
                googTargetEncBitrate: "0",
                googBucketDelay: "0",
                googTransmitBitrate: "0"
            };
            t.con = {
                optional: [{
                    DtlsSrtpKeyAgreement: !0
                }]
            },
            e.iceServers instanceof Array ? t.pc_config.iceServers = e.iceServers : (e.stunServerUrl && (e.stunServerUrl instanceof Array ? e.stunServerUrl.map(function(e) {
                "string" == typeof e && "" !== e && t.pc_config.iceServers.push({
                    url: e
                })
            }) : "string" == typeof e.stunServerUrl && "" !== e.stunServerUrl && t.pc_config.iceServers.push({
                url: e.stunServerUrl
            })),
            e.turnServers && (e.turnServers instanceof Array ? e.turnServers.map(function(e) {
                e.udpport && t.pc_config.iceServers.push({
                    username: e.username,
                    credential: e.credential,
                    credentialType: "password",
                    urls: "turn:" + e.url + ":" + e.udpport + "?transport=udp"
                }),
                "string" == typeof e.tcpport && "" !== e.tcpport && t.pc_config.iceServers.push({
                    username: e.username,
                    credential: e.credential,
                    credentialType: "password",
                    urls: "turn:" + e.url + ":" + e.tcpport + "?transport=tcp"
                }),
                !0 === e.forceturn && (t.pc_config.iceTransportPolicy = "relay")
            }) : o.default.error("[".concat(t.clientId, "] turnServers is not a array")))),
            void 0 === e.audio && (e.audio = !0),
            void 0 === e.video && (e.video = !0),
            t.mediaConstraints = {
                mandatory: {
                    OfferToReceiveVideo: e.video,
                    OfferToReceiveAudio: e.audio
                }
            },
            t.roapSessionId = 103;
            try {
                t.pc_config.sdpSemantics = "plan-b",
                t.peerConnection = new n(t.pc_config,t.con)
            } catch (e) {
                delete t.pc_config.sdpSemantics,
                t.peerConnection = new n(t.pc_config,t.con)
            }
            t.iceCandidateTimer = setTimeout(function() {
                t.iceCandidateTimer = null,
                o.default.debug("[".concat(t.clientId, "]Candidates collected: ").concat(t.iceCandidateCount)),
                t.moreIceComing && (t.moreIceComing = !1,
                t.markActionNeeded())
            }, Object(r.getParameter)("CANDIDATE_TIMEOUT")),
            t.peerConnection.onicecandidate = function(e) {
                var n, i, a, r;
                i = (n = t.peerConnection.localDescription.sdp).match(/a=candidate:.+typ\ssrflx.+\r\n/),
                a = n.match(/a=candidate:.+typ\shost.+\r\n/),
                r = n.match(/a=candidate:.+typ\srelay.+\r\n/),
                null === i && null === a && null === r || void 0 !== t.ice || !t.iceCandidateTimer || (o.default.debug("[" + t.clientId + "]srflx candidate : " + i + " relay candidate: " + r + " host candidate : " + a),
                clearTimeout(t.iceCandidateTimer),
                t.iceCandidateTimer = null,
                t.ice = 0,
                t.moreIceComing = !1,
                t.markActionNeeded()),
                t.iceCandidateCount = t.iceCandidateCount + 1
            }
            ,
            o.default.debug("[" + t.clientId + ']Created webkitRTCPeerConnnection with config "' + JSON.stringify(t.pc_config) + '".');
            var u = function(t) {
                return e.screen && (t = t.replace("a=x-google-flag:conference\r\n", "")),
                t
            }
              , l = function(n) {
                var i, a;
                if ((i = n.match(/m=video.*\r\n/)) && e.minVideoBW && e.maxVideoBW) {
                    a = i[0] + "b=AS:" + e.maxVideoBW + "\r\n";
                    var r = 0
                      , s = 0;
                    "h264" === e.codec ? (r = n.search(/a=rtpmap:(\d+) H264\/90000\r\n/),
                    s = n.search(/H264\/90000\r\n/)) : "vp8" === e.codec && (r = n.search(/a=rtpmap:(\d+) VP8\/90000\r\n/),
                    s = n.search(/VP8\/90000\r\n/)),
                    -1 !== r && -1 !== s && s - r > 10 && (a = a + "a=fmtp:" + n.slice(r + 9, s - 1) + " x-google-min-bitrate=" + e.minVideoBW + "\r\n"),
                    n = n.replace(i[0], a),
                    o.default.debug("[" + t.clientId + "]Set Video Bitrate - min:" + e.minVideoBW + " max:" + e.maxVideoBW)
                }
                return (i = n.match(/m=audio.*\r\n/)) && e.maxAudioBW && (a = i[0] + "b=AS:" + e.maxAudioBW + "\r\n",
                n = n.replace(i[0], a)),
                n
            };
            t.processSignalingMessage = function(e) {
                var n, i = JSON.parse(e);
                t.incomingMessage = i,
                "new" === t.state ? "OFFER" === i.messageType ? (n = {
                    sdp: i.sdp,
                    type: "offer"
                },
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)).catch(function(e) {}),
                t.state = "offer-received",
                t.markActionNeeded()) : t.error("Illegal message for this state: " + i.messageType + " in state " + t.state) : "offer-sent" === t.state ? "ANSWER" === i.messageType ? ((n = {
                    sdp: i.sdp,
                    type: "answer"
                }).sdp = u(n.sdp),
                n.sdp = l(n.sdp),
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)).catch(function(e) {}),
                t.state = "established") : "pr-answer" === i.messageType ? (n = {
                    sdp: i.sdp,
                    type: "pr-answer"
                },
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)).catch(function(e) {})) : "offer" === i.messageType ? t.error("Not written yet") : t.error("Illegal message for this state: " + i.messageType + " in state " + t.state) : "established" === t.state && ("OFFER" === i.messageType ? (n = {
                    sdp: i.sdp,
                    type: "offer"
                },
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)).catch(function(e) {}),
                t.state = "offer-received",
                t.markActionNeeded()) : "ANSWER" === i.messageType ? ((n = {
                    sdp: i.sdp,
                    type: "answer"
                }).sdp = u(n.sdp),
                n.sdp = l(n.sdp),
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)).catch(function(e) {})) : t.error("Illegal message for this state: " + i.messageType + " in state " + t.state))
            }
            ;
            var f = 0
              , p = 0;
            return t.getVideoRelatedStats = function(e) {
                t.getStats(function(n) {
                    n.forEach(function(n) {
                        if (t.isSubscriber) {
                            if ("video" === n.mediaType && n.id && ~n.id.indexOf("recv")) {
                                if (g.isChromeKernel() && +g.getBrowserVersion() >= 76) {
                                    var i = +n.googFramesReceived - f
                                      , a = +n.googFramesDecoded - p;
                                    t._setStat(c, "googFrameRateReceived", i),
                                    t._setStat(c, "googFrameRateDecoded", a),
                                    t._setStat(c, "googFrameRateOutput", a),
                                    f = +n.googFramesReceived,
                                    p = +n.googFramesDecoded
                                }
                                e && e({
                                    mediaType: "video",
                                    peerId: t.uid,
                                    isVideoMute: t.isVideoMute,
                                    frameRateReceived: n.googFrameRateReceived,
                                    frameRateDecoded: n.googFrameRateDecoded,
                                    bytesReceived: n.bytesReceived,
                                    packetsReceived: n.packetsReceived,
                                    packetsLost: n.packetsLost
                                })
                            }
                        } else
                            "video" === n.mediaType && n.id && ~n.id.indexOf("send") && e && e({
                                mediaType: "video",
                                isVideoMute: t.isVideoMute,
                                frameRateInput: n.googFrameRateInput,
                                frameRateSent: n.googFrameRateSent,
                                googRtt: n.googRtt
                            })
                    })
                })
            }
            ,
            t.getAudioRelatedStats = function(e) {
                t.getStats(function(n) {
                    n.forEach(function(n) {
                        t.isSubscriber && "audio" === n.mediaType && n.id && ~n.id.indexOf("recv") && e && e({
                            mediaType: "audio",
                            peerId: t.uid,
                            isAudioMute: t.isAudioMute,
                            frameDropped: parseInt(n.googDecodingPLC) + parseInt(n.googDecodingPLCCNG) + "",
                            frameReceived: n.googDecodingCTN,
                            googJitterReceived: n.googJitterReceived,
                            bytesReceived: n.bytesReceived,
                            packetsReceived: n.packetsReceived,
                            packetsLost: n.packetsLost
                        })
                    })
                })
            }
            ,
            t.getStatsRate = function(e) {
                t.getStats(function(t) {
                    e(t)
                })
            }
            ,
            t.getStats = function(e, n) {
                n = (n = n || 500) > 500 ? 500 : n,
                t.lastTimeGetStats && Date.now() - t.lastTimeGetStats < n ? e && e(t.filterStatsCache, t.originStatsCache) : (t.lastTimeGetStats = Date.now(),
                this._getStats(function(n, i) {
                    t.filterStatsCache = n,
                    t.originStatsCache = i,
                    e && e(n, i)
                }))
            }
            ,
            t._setStat = function(e, t, n) {
                e.hasOwnProperty(t) && (null != n && n !== 1 / 0 && n == n || (n = 0),
                e[t] = n + "")
            }
            ,
            t._processGetStatsAfterChrome76 = function(e) {
                var n = this;
                t.lastStats || (t.lastStats = new Map),
                t.peerConnection.getStats().then(function(r) {
                    var o = []
                      , u = []
                      , l = new Map
                      , f = new Date
                      , p = !0
                      , g = !1
                      , m = void 0;
                    try {
                        for (var v, S = r.values()[Symbol.iterator](); !(p = (v = S.next()).done); p = !0) {
                            var _ = v.value;
                            "codec" != _.type ? "candidate-pair" != _.type ? ("inbound-rtp" === _.type && "video" === _.mediaType && l.set("inbound-video", _),
                            "inbound-rtp" === _.type && "audio" === _.mediaType && l.set("inbound-audio", _),
                            "outbound-rtp" === _.type && "audio" === _.mediaType && l.set("outbound-audio", _),
                            "outbound-rtp" === _.type && "video" === _.mediaType && l.set("outbound-video", _),
                            "track" === _.type && "video" === _.kind && _.remoteSource && l.set("remote-video-track", _),
                            "track" === _.type && "audio" === _.kind && _.remoteSource && l.set("remote-audio-track", _),
                            "remote-inbound-rtp" === _.type && "video" === _.mediaType && l.set("remote-inbound-video", _),
                            "remote-inbound-rtp" === _.type && "audio" === _.mediaType && l.set("remote-inbound-audio", _),
                            "track" !== _.type || "video" !== _.kind || _.remoteSource || l.set("local-video-track", _),
                            "track" !== _.type || "audio" !== _.kind || _.remoteSource || l.set("local-audio-track", _),
                            "media-source" === _.type && "video" === _.kind && l.set("media-source-video", _),
                            "media-source" === _.type && "audio" === _.kind && l.set("media-source-audio", _)) : u.push(_) : o.push(_)
                        }
                    } catch (e) {
                        g = !0,
                        m = e
                    } finally {
                        try {
                            p || null == S.return || S.return()
                        } finally {
                            if (g)
                                throw m
                        }
                    }
                    l.set("codec", o),
                    l.set("candidatePairs", u),
                    l.set("timestamp", +f);
                    var E = null
                      , I = null;
                    if (c.timestamp = f,
                    s.timestamp = f,
                    i.timestamp = f,
                    i.timestamp = f,
                    d.timestamp = f,
                    n.isSubscriber)
                        (E = l.get("inbound-video")) && (t._setStat(c, "id", "inbound_video_ssrc_recv"),
                        t._setStat(c, "mediaType", E.mediaType),
                        t._setStat(c, "packetsLost", E.packetsLost),
                        t._setStat(c, "googDecodeMs", null),
                        t._setStat(c, "googMaxDecodeMs", null),
                        t._setStat(c, "googRenderDelayMs", null),
                        t._setStat(c, "googMinPlayoutDelayMs", null),
                        t._setStat(c, "googNacksSent", E.nackCount),
                        t._setStat(c, "googPlisSent", E.pliCount),
                        t._setStat(c, "googFirsSent", E.firCount),
                        t._setStat(c, "bytesReceived", E.bytesReceived),
                        t._setStat(c, "packetsReceived", E.packetsReceived)),
                        (E = l.get("inbound-audio")) && (t._setStat(s, "id", "inbound_audio_ssrc_recv"),
                        t._setStat(s, "mediaType", E.mediaType),
                        t._setStat(s, "bytesReceived", E.bytesReceived),
                        t._setStat(s, "packetsLost", E.packetsLost),
                        t._setStat(s, "packetsReceived", E.packetsReceived),
                        t._setStat(s, "googAccelerateRate", E.removedSamplesForAcceleration),
                        t._setStat(s, "googCurrentDelayMs", E.jitterBufferDelay),
                        t._setStat(s, "googDecodingCNG", null),
                        t._setStat(s, "googDecodingCTN", null),
                        t._setStat(s, "googDecodingCTSG", null),
                        t._setStat(s, "googDecodingNormal", null),
                        t._setStat(s, "googDecodingPLC", null),
                        t._setStat(s, "googDecodingPLCCNG", null),
                        t._setStat(s, "googJitterReceived", E.jitter),
                        t._setStat(s, "googPreferredJitterBufferMs", null),
                        t._setStat(s, "googSecondaryDecodedRate", null)),
                        (E = l.get("remote-video-track")) && (t._setStat(c, "googTargetDelayMs", E.jitterBufferDelay),
                        t._setStat(c, "googFrameWidthReceived", E.frameWidth),
                        t._setStat(c, "googFrameHeightReceived", E.frameHeight),
                        t._setStat(c, "googJitterBufferMs", E.jitterBufferDelay / E.jitterBufferEmittedCount * 1e3),
                        t._setStat(c, "googCurrentDelayMs", E.jitterBufferDelay),
                        t._setStat(c, "googFramesDecoded", E.framesDecoded),
                        t._setStat(c, "googFramesReceived", E.framesReceived)),
                        (E = l.get("remote-audio-track")) && (t._setStat(s, "audioOutputLevel", 32767 * E.audioLevel),
                        t._setStat(s, "googJitterBufferMs", E.jitterBufferDelay / E.jitterBufferEmittedCount * 1e3),
                        t._setStat(s, "googExpandRate", E.concealedSamples),
                        t._setStat(s, "googPreemptiveExpandRate", E.insertedSamplesForDeceleration),
                        t._setStat(s, "googSpeechExpandRate", E.silentConcealedSamples));
                    else {
                        var T = t.lastStats.get("timestamp")
                          , y = t.lastStats.get("outbound-video");
                        if ((E = l.get("outbound-audio")) && (t._setStat(i, "id", "outbound_audio_ssrc_send"),
                        t._setStat(i, "mediaType", E.mediaType),
                        t._setStat(i, "aecDivergentFilterFraction", null),
                        t._setStat(i, "bytesSent", E.bytesSent),
                        t._setStat(i, "packetsSent", E.packetsSent),
                        I = E.transportId),
                        E = l.get("outbound-video")) {
                            if (t._setStat(a, "id", "outbound_video_ssrc_send"),
                            t._setStat(a, "mediaType", E.mediaType),
                            t._setStat(a, "bytesSent", E.bytesSent),
                            t._setStat(a, "packetsSent", E.packetsSent),
                            t._setStat(a, "googAdaptationChanges", E.qualityLimitationDurations),
                            t._setStat(a, "googAvgEncodeMs", null),
                            t._setStat(a, "googEncodeUsagePercent", null),
                            I = E.transportId,
                            E.totalEncodedBytesTarget && y && y.totalEncodedBytesTarget) {
                                var b = (E.totalEncodedBytesTarget - y.totalEncodedBytesTarget) / (+new Date - T);
                                t._setStat(d, "googTargetEncBitrate", Math.floor(8 * b * 1e3))
                            }
                            if (E.retransmittedBytesSent && y && y.retransmittedBytesSent) {
                                var R = (E.retransmittedBytesSent - y.retransmittedBytesSent) / (+new Date - T);
                                t._setStat(d, "googRetransmitBitrate", Math.floor(8 * R * 1e3))
                            }
                            if (E.bytesSent && y && y.bytesSent) {
                                var A = (E.bytesSent - y.bytesSent) / (+new Date - T);
                                t._setStat(d, "googTransmitBitrate", Math.floor(8 * A * 1e3)),
                                t._setStat(d, "googActualEncBitrate", Math.floor(8 * A * 1e3))
                            }
                            if (E.totalPacketSendDelay && y && y.totalPacketSendDelay) {
                                var C = (E.totalPacketSendDelay - y.totalPacketSendDelay) / (+new Date - T);
                                t._setStat(d, "googBucketDelay", Math.floor(1e3 * C))
                            }
                        }
                        if ((E = l.get("remote-inbound-video")) && (t._setStat(a, "packetsLost", E.packetsLost),
                        t._setStat(a, "googRtt", E.roundTripTime)),
                        (E = l.get("local-video-track")) && (t._setStat(a, "googFrameHeightSent", E.frameHeight),
                        t._setStat(a, "googFrameWidthSent", E.frameWidth),
                        void 0 !== E.framesPerSecond && t._setStat(a, "googFrameRateSent", E.framesPerSecond)),
                        (E = l.get("local-audio-track")) && (t._setStat(i, "googEchoCancellationReturnLoss", E.echoReturnLoss),
                        t._setStat(i, "googEchoCancellationReturnLossEnhancement", E.echoReturnLossEnhancement)),
                        (E = l.get("media-source-video")) && (t._setStat(a, "googFrameHeightInput", E.height),
                        t._setStat(a, "googFrameWidthInput", E.width),
                        t._setStat(a, "googFrameRateInput", E.framesPerSecond)),
                        (E = l.get("media-source-audio")) && t._setStat(i, "audioInputLevel", 32767 * E.totalAudioEnergy),
                        (E = l.get("inbound-video")) && (t._setStat(a, "googFirsReceived", E.firCount),
                        t._setStat(a, "googNacksReceived", E.nackCount),
                        t._setStat(a, "googPlisReceived", E.pliCount)),
                        I)
                            l.get("candidatePairs").map(function(e) {
                                I == e.transportId && t._setStat(d, "googAvailableSendBandwidth", e.availableOutgoingBitrate)
                            });
                        else {
                            var O = l.get("candidatePairs")[0];
                            O && t._setStat(d, "googAvailableSendBandwidth", O.availableOutgoingBitrate)
                        }
                    }
                    t.lastStats = l;
                    var N = [h()({}, a), h()({}, i), h()({}, c), h()({}, s), h()({}, d)];
                    N.push({
                        id: "time",
                        startTime: t.connectedTime,
                        timestamp: new Date
                    }),
                    e(N)
                })
            }
            ,
            t._processGetStatsBeforeChrome76 = function(e) {
                t.peerConnection.getStats(function(n) {
                    var r = []
                      , o = []
                      , u = null;
                    Object.keys(n).forEach(function(e) {
                        var t = n[e];
                        t && (o.push(t),
                        u = t.timestamp,
                        "VideoBwe" === t.type ? d = t : t.id.indexOf("_send") > -1 && "video" === t.mediaType ? a = t : t.id.indexOf("_send") > -1 && "audio" === t.mediaType ? i = t : t.id.indexOf("_recv") > -1 && "video" === t.mediaType ? c = t : t.id.indexOf("_recv") > -1 && "audio" === t.mediaType && (s = t))
                    }),
                    (r = [h()({}, a), h()({}, i), h()({}, c), h()({}, s), h()({}, d)]).push({
                        id: "time",
                        startTime: t.connectedTime,
                        timestamp: u || new Date
                    }),
                    e(r, o)
                })
            }
            ,
            t._getStats = function(e) {
                Object(r.getParameter)("CHROME_NEW_STATS") && g.isChromeKernel() && +g.getBrowserVersion() >= 76 ? t._processGetStatsAfterChrome76(e) : t._processGetStatsBeforeChrome76(e)
            }
            ,
            t.addTrack = function(e, n) {
                t.peerConnection.addTrack(e, n)
            }
            ,
            t.removeTrack = function(e, n) {
                t.peerConnection.removeTrack(t.peerConnection.getSenders().find(function(t) {
                    return t.track == e
                }))
            }
            ,
            t.addStream = function(e) {
                t.peerConnection.addStream(e),
                t.markActionNeeded()
            }
            ,
            t.removeStream = function() {
                t.markActionNeeded()
            }
            ,
            t.close = function() {
                t.state = "closed",
                t.peerConnection.close()
            }
            ,
            t.markActionNeeded = function() {
                t.actionNeeded = !0,
                t.doLater(function() {
                    t.onstablestate()
                })
            }
            ,
            t.doLater = function(e) {
                window.setTimeout(e, 1)
            }
            ,
            t.onstablestate = function() {
                var e;
                if (t.actionNeeded) {
                    if ("new" === t.state || "established" === t.state)
                        t.peerConnection.createOffer(function(e) {
                            if (e.sdp !== t.prevOffer)
                                return t.peerConnection.setLocalDescription(e),
                                t.state = "preparing-offer",
                                void t.markActionNeeded();
                            o.default.debug("[" + t.clientId + "]Not sending a new offer")
                        }, function(e) {
                            o.default.debug("[" + t.clientId + "]peer connection create offer failed ", e)
                        }, t.mediaConstraints);
                    else if ("preparing-offer" === t.state) {
                        if (t.moreIceComing)
                            return;
                        t.prevOffer = t.peerConnection.localDescription.sdp,
                        t.offerCandidates = t.prevOffer.match(/a=candidate.+\r\n/g) || [],
                        t.offerCandidates.length || (o.default.warning("[".concat(t.clientId, "]No Ice Candidate generated")),
                        Object(r.getParameter)("SHIM_CANDIDATE") ? (o.default.debug("Shimming fake candidate"),
                        t.prevOffer += "a=candidate:2243255435 1 udp 2122194687 192.168.0.1 30000 typ host generation 0 network-id 1\r\n") : o.default.error("[".concat(t.clientId, "]None Ice Candidate not allowed"))),
                        t.prevOffer = t.prevOffer.replace(/a=candidate:.+typ\shost.+\r\n/g, "a=candidate:2243255435 1 udp 2122194687 192.168.0.1 30000 typ host generation 0 network-id 1\r\n"),
                        t.sendMessage("OFFER", t.prevOffer),
                        t.state = "offer-sent"
                    } else if ("offer-received" === t.state)
                        t.peerConnection.createAnswer(function(e) {
                            if (t.peerConnection.setLocalDescription(e),
                            t.state = "offer-received-preparing-answer",
                            t.iceStarted)
                                t.markActionNeeded();
                            else {
                                var n = new Date;
                                o.default.debug("[" + t.clientId + "]" + n.getTime() + ": Starting ICE in responder"),
                                t.iceStarted = !0
                            }
                        }, function(e) {
                            o.default.debug("[" + t.clientId + "]peer connection create answer failed ", e)
                        }, t.mediaConstraints);
                    else if ("offer-received-preparing-answer" === t.state) {
                        if (t.moreIceComing)
                            return;
                        e = t.peerConnection.localDescription.sdp,
                        t.sendMessage("ANSWER", e),
                        t.state = "established"
                    } else
                        o.default.debug("[".concat(t.clientId, "] Dazed and confused in state ' + that.state + ', stopping here'"));
                    t.actionNeeded = !1
                }
            }
            ,
            t.sendMessage = function(e, n) {
                var i = {};
                i.messageType = e,
                i.sdp = n,
                "OFFER" === e ? (i.offererSessionId = t.sessionId,
                i.answererSessionId = t.otherSessionId,
                i.seq = t.sequenceNumber += 1,
                i.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (i.offererSessionId = t.incomingMessage.offererSessionId,
                i.answererSessionId = t.sessionId,
                i.seq = t.incomingMessage.seq),
                t.onsignalingmessage(JSON.stringify(i))
            }
            ,
            t._getSender = function(e) {
                if (t.peerConnection && t.peerConnection.getSenders) {
                    var n = t.peerConnection.getSenders().find(function(t) {
                        return t.track.kind == e
                    });
                    if (n)
                        return n
                }
                return null
            }
            ,
            t.hasSender = function(e) {
                return !!t._getSender(e)
            }
            ,
            t.replaceTrack = function(e, n, i) {
                var a = t._getSender(e.kind);
                if (!a)
                    return i("NO_SENDER_FOUND");
                try {
                    a.replaceTrack(e)
                } catch (e) {
                    return i && i(e)
                }
                setTimeout(function() {
                    return n && n()
                }, 50)
            }
            ,
            t.error = function(e) {
                throw "Error in RoapOnJsep: " + e
            }
            ,
            t.sessionId = t.roapSessionId += 1,
            t.sequenceNumber = 0,
            t.actionNeeded = !1,
            t.iceStarted = !1,
            t.moreIceComing = !0,
            t.iceCandidateCount = 0,
            t.onsignalingmessage = e.callback,
            t.peerConnection.ontrack = function(e) {
                t.onaddstream && (t.onaddstream(e, "ontrack"),
                t.peerConnection.onaddstream = null)
            }
            ,
            t.peerConnection.onaddstream = function(e) {
                t.onaddstream && (t.onaddstream(e, "onaddstream"),
                t.peerConnection.ontrack = null)
            }
            ,
            t.peerConnection.onremovestream = function(e) {
                t.onremovestream && t.onremovestream(e)
            }
            ,
            t.peerConnection.oniceconnectionstatechange = function(e) {
                "connected" === e.currentTarget.iceConnectionState && (t.connectedTime = new Date),
                t.oniceconnectionstatechange && t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)
            }
            ,
            t.renegotiate = function() {
                void 0 !== t.prevOffer && t.peerConnection.createOffer().then(function(e) {
                    return e.sdp = e.sdp.replace(/a=recvonly\r\n/g, "a=inactive\r\n"),
                    e.sdp = u(e.sdp),
                    e.sdp = l(e.sdp),
                    t.peerConnection.setLocalDescription(e)
                }).then(function() {
                    t.onnegotiationneeded && t.onnegotiationneeded(t.peerConnection.localDescription.sdp)
                }).catch(function(e) {
                    console.log("createOffer error: ", e)
                })
            }
            ,
            t.peerConnection.onnegotiationneeded = t.renegotiate,
            t.onaddstream = null,
            t.onremovestream = null,
            t.onnegotiationneeded = null,
            t.state = "new",
            t.markActionNeeded(),
            t
        }
          , R = function(e) {
            var t = {}
              , n = E.RTCPeerConnection;
            t.uid = e.uid,
            t.isVideoMute = e.isVideoMute,
            t.isAudioMute = e.isAudioMute,
            t.isSubscriber = e.isSubscriber,
            t.clientId = e.clientId,
            t.filterStatsCache = [],
            t.originStatsCache = [],
            t.lastTimeGetStats = null,
            t.pc_config = {
                iceServers: [{
                    urls: ["stun:webcs.agora.io:3478", "stun:stun.l.google.com:19302"]
                }],
                bundlePolicy: "max-bundle"
            },
            t.con = {
                optional: [{
                    DtlsSrtpKeyAgreement: !0
                }]
            },
            e.iceServers instanceof Array ? t.pc_config.iceServers = e.iceServers : (e.stunServerUrl && (e.stunServerUrl instanceof Array ? e.stunServerUrl.map(function(e) {
                "string" == typeof e && "" !== e && t.pc_config.iceServers.push({
                    url: e
                })
            }) : "string" == typeof e.stunServerUrl && "" !== e.stunServerUrl && t.pc_config.iceServers.push({
                url: e.stunServerUrl
            })),
            e.turnServers && (e.turnServers instanceof Array ? e.turnServers.map(function(e) {
                e.udpport && t.pc_config.iceServers.push({
                    username: e.username,
                    credential: e.credential,
                    credentialType: "password",
                    urls: "turn:" + e.url + ":" + e.udpport + "?transport=udp"
                }),
                "string" == typeof e.tcpport && "" !== e.tcpport && t.pc_config.iceServers.push({
                    username: e.username,
                    credential: e.credential,
                    credentialType: "password",
                    urls: "turn:" + e.url + ":" + e.tcpport + "?transport=tcp"
                }),
                !0 === e.forceturn && (t.pc_config.iceTransportPolicy = "relay")
            }) : o.default.error("[".concat(t.clientId, "] turnServers is not a array")))),
            void 0 === e.audio && (e.audio = !0),
            void 0 === e.video && (e.video = !0),
            t.mediaConstraints = {
                mandatory: {
                    OfferToReceiveVideo: e.video,
                    OfferToReceiveAudio: e.audio
                }
            },
            t.roapSessionId = 103;
            try {
                t.pc_config.sdpSemantics = "plan-b",
                t.peerConnection = new n(t.pc_config,t.con)
            } catch (e) {
                delete t.pc_config.sdpSemantics,
                t.peerConnection = new n(t.pc_config,t.con)
            }
            o.default.debug("[" + t.clientId + ']safari Created RTCPeerConnnection with config "' + JSON.stringify(t.pc_config) + '".'),
            t.iceCandidateTimer = setTimeout(function() {
                t.iceCandidateTimer = null,
                o.default.debug("[".concat(t.clientId, "]Candidates collected: ").concat(t.iceCandidateCount)),
                t.moreIceComing && (t.moreIceComing = !1,
                t.markActionNeeded())
            }, Object(r.getParameter)("CANDIDATE_TIMEOUT")),
            t.peerConnection.onicecandidate = function(e) {
                var n, i, a, r;
                i = (n = t.peerConnection.localDescription.sdp).match(/a=candidate:.+typ\ssrflx.+\r\n/),
                a = n.match(/a=candidate:.+typ\shost.+\r\n/),
                r = n.match(/a=candidate:.+typ\srelay.+\r\n/),
                0 === t.iceCandidateCount && (t.timeout = setTimeout(function() {
                    t.moreIceComing && (t.moreIceComing = !1,
                    t.markActionNeeded())
                }, 1e3)),
                null === i && null === a && null === r || void 0 !== t.ice || !t.iceCandidateTimer || (o.default.debug("[" + t.clientId + "]srflx candidate : " + i + " relay candidate: " + r + " host candidate : " + a),
                clearTimeout(t.iceCandidateTimer),
                t.iceCandidateTimer = null,
                t.ice = 0,
                t.moreIceComing = !1,
                t.markActionNeeded()),
                t.iceCandidateCount = t.iceCandidateCount + 1
            }
            ;
            var i = function(t) {
                return e.screen && (t = t.replace("a=x-google-flag:conference\r\n", "")),
                t
            }
              , a = function(n) {
                var i, a;
                return (i = n.match(/m=video.*\r\n/)) && e.minVideoBW && e.maxVideoBW && (a = i[0] + "b=AS:" + e.maxVideoBW + "\r\n",
                n = n.replace(i[0], a),
                o.default.debug("[" + t.clientId + "]Set Video Bitrate - min:" + e.minVideoBW + " max:" + e.maxVideoBW)),
                (i = n.match(/m=audio.*\r\n/)) && e.maxAudioBW && (a = i[0] + "b=AS:" + e.maxAudioBW + "\r\n",
                n = n.replace(i[0], a)),
                n
            };
            t.processSignalingMessage = function(e) {
                var n, r = JSON.parse(e);
                t.incomingMessage = r,
                "new" === t.state ? "OFFER" === r.messageType ? (n = {
                    sdp: r.sdp,
                    type: "offer"
                },
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)),
                t.state = "offer-received",
                t.markActionNeeded()) : t.error("Illegal message for this state: " + r.messageType + " in state " + t.state) : "offer-sent" === t.state ? "ANSWER" === r.messageType ? ((n = {
                    sdp: r.sdp,
                    type: "answer"
                }).sdp = i(n.sdp),
                n.sdp = a(n.sdp),
                n.sdp = n.sdp.replace(/a=x-google-flag:conference\r\n/g, ""),
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)),
                t.state = "established") : "pr-answer" === r.messageType ? (n = {
                    sdp: r.sdp,
                    type: "pr-answer"
                },
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n))) : "offer" === r.messageType ? t.error("Not written yet") : t.error("Illegal message for this state: " + r.messageType + " in state " + t.state) : "established" === t.state && ("OFFER" === r.messageType ? (n = {
                    sdp: r.sdp,
                    type: "offer"
                },
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n)),
                t.state = "offer-received",
                t.markActionNeeded()) : "ANSWER" === r.messageType ? ((n = {
                    sdp: r.sdp,
                    type: "answer"
                }).sdp = i(n.sdp),
                n.sdp = a(n.sdp),
                t.peerConnection.setRemoteDescription(new RTCSessionDescription(n))) : t.error("Illegal message for this state: " + r.messageType + " in state " + t.state))
            }
            ;
            var s = {
                id: "",
                type: "",
                mediaType: "",
                googCodecName: "opus",
                aecDivergentFilterFraction: "0",
                audioInputLevel: "0",
                bytesSent: "0",
                packetsSent: "0",
                googEchoCancellationReturnLoss: "0",
                googEchoCancellationReturnLossEnhancement: "0"
            }
              , c = {
                id: "",
                type: "",
                mediaType: "",
                googCodecName: "h264" === e.codec ? "H264" : "VP8",
                bytesSent: "0",
                packetsLost: "0",
                packetsSent: "0",
                googAdaptationChanges: "0",
                googAvgEncodeMs: "0",
                googEncodeUsagePercent: "0",
                googFirsReceived: "0",
                googFrameHeightSent: "0",
                googFrameHeightInput: "0",
                googFrameRateInput: "0",
                googFrameRateSent: "0",
                googFrameWidthSent: "0",
                googFrameWidthInput: "0",
                googNacksReceived: "0",
                googPlisReceived: "0",
                googRtt: "0",
                googFramesEncoded: "0"
            }
              , d = {
                id: "",
                type: "",
                mediaType: "",
                audioOutputLevel: "0",
                bytesReceived: "0",
                packetsLost: "0",
                packetsReceived: "0",
                googAccelerateRate: "0",
                googCurrentDelayMs: "0",
                googDecodingCNG: "0",
                googDecodingCTN: "0",
                googDecodingCTSG: "0",
                googDecodingNormal: "0",
                googDecodingPLC: "0",
                googDecodingPLCCNG: "0",
                googExpandRate: "0",
                googJitterBufferMs: "0",
                googJitterReceived: "0",
                googPreemptiveExpandRate: "0",
                googPreferredJitterBufferMs: "0",
                googSecondaryDecodedRate: "0",
                googSpeechExpandRate: "0"
            }
              , u = {
                id: "",
                type: "",
                mediaType: "",
                googTargetDelayMs: "0",
                packetsLost: "0",
                googDecodeMs: "0",
                googMaxDecodeMs: "0",
                googRenderDelayMs: "0",
                googFrameWidthReceived: "0",
                googFrameHeightReceived: "0",
                googFrameRateReceived: "0",
                googFrameRateDecoded: "0",
                googFrameRateOutput: "0",
                googFramesDecoded: "0",
                googFrameReceived: "0",
                googJitterBufferMs: "0",
                googCurrentDelayMs: "0",
                googMinPlayoutDelayMs: "0",
                googNacksSent: "0",
                googPlisSent: "0",
                googFirsSent: "0",
                bytesReceived: "0",
                packetsReceived: "0"
            }
              , l = {
                id: "bweforvideo",
                type: "VideoBwe",
                googAvailableSendBandwidth: "0",
                googAvailableReceiveBandwidth: "0",
                googActualEncBitrate: "0",
                googRetransmitBitrate: "0",
                googTargetEncBitrate: "0",
                googBucketDelay: "0",
                googTransmitBitrate: "0"
            }
              , f = 0
              , p = 0
              , g = 0;
            return t.isRemoteVideoStats = function(e) {
                return !!(e.frameHeight && e.frameWidth && e.remoteSource)
            }
            ,
            t.getVideoRelatedStats = function(n) {
                t.peerConnection.getStats().then(function(i) {
                    var a = {
                        peerId: t.uid,
                        mediaType: "video",
                        isVideoMute: t.isVideoMute
                    };
                    i.forEach(function(i) {
                        if (t.isSubscriber) {
                            if ("track" === i.type && (~i.id.indexOf("video") || ~i.trackIdentifier.indexOf("v") || t.isRemoteVideoStats(i))) {
                                if (!t.lastReport)
                                    return void (t.lastReport = i);
                                a.frameRateReceived = i.framesReceived - t.lastReport.framesReceived + "",
                                a.frameRateDecoded = i.framesDecoded - t.lastReport.framesDecoded + "",
                                t.lastReport = i
                            }
                            "inbound-rtp" === i.type && ~i.id.indexOf("Video") && (a.bytesReceived = i.bytesReceived + "",
                            a.packetsReceived = i.packetsReceived + "",
                            a.packetsLost = i.packetsLost + "")
                        } else if ("outbound-rtp" === i.type && ~i.id.indexOf("Video")) {
                            if (!t.lastReport)
                                return void (t.lastReport = i);
                            n && n({
                                mediaType: "video",
                                isVideoMute: t.isVideoMute,
                                frameRateInput: e.maxFrameRate + "",
                                frameRateSent: i.framesEncoded - t.lastReport.framesEncoded + ""
                            }),
                            t.lastReport = i
                        }
                    }),
                    n && n(a)
                })
            }
            ,
            t.getAudioRelatedStats = function(e) {
                t.peerConnection.getStats().then(function(n) {
                    n.forEach(function(n) {
                        t.isSubscriber && "inbound-rtp" === n.type && ~n.id.indexOf("Audio") && e && e({
                            peerId: t.uid,
                            mediaType: "audio",
                            isAudioMute: t.isAudioMute,
                            frameDropped: n.packetsLost + "",
                            frameReceived: n.packetsReceived + "",
                            googJitterReceived: n.jitter + "",
                            bytesReceived: n.bytesReceived + "",
                            packetsReceived: n.packetsReceived + "",
                            packetsLost: n.packetsLost + ""
                        })
                    })
                })
            }
            ,
            t.getStatsRate = function(e) {
                t.getStats(function(t) {
                    t.forEach(function(e) {
                        "outbound-rtp" === e.type && "video" === e.mediaType && e.googFramesEncoded && (e.googFrameRateSent = ((e.googFramesEncoded - f) / 3).toString(),
                        f = e.googFramesEncoded),
                        "inbound-rtp" === e.type && -1 != e.id.indexOf("55543") && (e.googFrameRateReceived && (e.googFrameRateReceived = ((e.googFrameReceived - g) / 3).toString(),
                        g = e.googFrameReceived),
                        e.googFrameRateDecoded && (e.googFrameRateDecoded = ((e.googFramesDecoded - p) / 3).toString(),
                        p = e.googFramesDecoded))
                    }),
                    e(t)
                })
            }
            ,
            t.getStats = function(e, n) {
                n = (n = n || 500) > 500 ? 500 : n,
                t.lastTimeGetStats && Date.now() - t.lastTimeGetStats < n ? e && e(t.filterStatsCache, t.originStatsCache) : this._getStats(function(n, i) {
                    t.filterStatsCache = n,
                    t.originStatsCache = i,
                    t.lastTimeGetStats = Date.now(),
                    e && e(n, i)
                })
            }
            ,
            t._getStats = function(e) {
                var n = [];
                t.peerConnection.getStats().then(function(i) {
                    i.forEach(function(e) {
                        n.push(e),
                        "outbound-rtp" === e.type && "audio" === e.mediaType && (s.id = e.id,
                        s.type = e.type,
                        s.mediaType = e.mediaType,
                        s.bytesSent = e.bytesSent ? e.bytesSent + "" : "0",
                        s.packetsSent = e.packetsSent ? e.packetsSent + "" : "0"),
                        "outbound-rtp" === e.type && "video" === e.mediaType && (c.id = e.id,
                        c.type = e.type,
                        c.mediaType = e.mediaType,
                        c.bytesSent = e.bytesSent ? e.bytesSent + "" : "0",
                        c.packetsSent = e.packetsSent ? e.packetsSent + "" : "0",
                        c.googPlisReceived = e.pliCount ? e.pliCount + "" : "0",
                        c.googNacksReceived = e.nackCount ? e.nackCount + "" : "0",
                        c.googFirsReceived = e.firCount ? e.firCount + "" : "0",
                        c.googFramesEncoded = e.framesEncoded ? e.framesEncoded + "" : "0"),
                        "inbound-rtp" === e.type && -1 != e.id.indexOf("44444") && (d.id = e.id,
                        d.type = e.type,
                        d.mediaType = "audio",
                        d.packetsReceived = e.packetsReceived ? e.packetsReceived + "" : "0",
                        d.bytesReceived = e.bytesReceived ? e.bytesReceived + "" : "0",
                        d.packetsLost = e.packetsLost ? e.packetsLost + "" : "0",
                        d.packetsReceived = e.packetsReceived ? e.packetsReceived + "" : "0",
                        d.googJitterReceived = e.jitter ? e.jitter + "" : "0"),
                        "inbound-rtp" === e.type && -1 != e.id.indexOf("55543") && (u.id = e.id,
                        u.type = e.type,
                        u.mediaType = "video",
                        u.packetsReceived = e.packetsReceived ? e.packetsReceived + "" : "0",
                        u.bytesReceived = e.bytesReceived ? e.bytesReceived + "" : "0",
                        u.packetsLost = e.packetsLost ? e.packetsLost + "" : "0",
                        u.googJitterBufferMs = e.jitter ? e.jitter + "" : "0",
                        u.googNacksSent = e.nackCount ? e.nackCount + "" : "0",
                        u.googPlisSent = e.pliCount ? e.pliCount + "" : "0",
                        u.googFirsSent = e.firCount ? e.firCount + "" : "0"),
                        "track" !== e.type || -1 == e.id.indexOf("55543") && !~e.trackIdentifier.indexOf("v") && null != e.audioLevel || (u.googFrameWidthReceived = e.frameWidth ? e.frameWidth + "" : "0",
                        u.googFrameHeightReceived = e.frameHeight ? e.frameHeight + "" : "0",
                        u.googFrameReceived = e.framesReceived ? e.framesReceived + "" : "0",
                        u.googFramesDecoded = e.framesDecoded ? e.framesDecoded + "" : "0"),
                        "track" !== e.type || -1 == e.id.indexOf("44444") && !~e.trackIdentifier.indexOf("a") && void 0 === e.audioLevel || (d.audioOutputLevel = e.audioLevel + "",
                        s.audioInputLevel = e.audioLevel + ""),
                        "candidate-pair" === e.type && (0 == e.availableIncomingBitrate ? l.googAvailableSendBandwidth = e.availableOutgoingBitrate + "" : l.googAvailableReceiveBandwidth = e.availableIncomingBitrate + "")
                    });
                    var a = [l, s, c, d, u];
                    a.push({
                        id: "time",
                        startTime: t.connectedTime,
                        timestamp: new Date
                    }),
                    e(a, n)
                }).catch(function(e) {
                    o.default.error("[" + t.clientId + "] ", e)
                })
            }
            ,
            t.addTrack = function(e, n) {
                t.peerConnection.addTrack(e, n)
            }
            ,
            t.removeTrack = function(e, n) {
                var i = t.peerConnection.getSenders().find(function(t) {
                    return t.track == e
                });
                i.replaceTrack(null),
                t.peerConnection.removeTrack(i)
            }
            ,
            t.addStream = function(e) {
                window.navigator.userAgent.indexOf("Safari") > -1 && -1 === navigator.userAgent.indexOf("Chrome") ? e.getTracks().forEach(function(n) {
                    return t.peerConnection.addTrack(n, e)
                }) : t.peerConnection.addStream(e),
                t.markActionNeeded()
            }
            ,
            t.removeStream = function() {
                t.markActionNeeded()
            }
            ,
            t.close = function() {
                t.state = "closed",
                t.peerConnection.close()
            }
            ,
            t.markActionNeeded = function() {
                t.actionNeeded = !0,
                t.doLater(function() {
                    t.onstablestate()
                })
            }
            ,
            t.doLater = function(e) {
                window.setTimeout(e, 1)
            }
            ,
            t.onstablestate = function() {
                var n;
                if (t.actionNeeded) {
                    if ("new" === t.state || "established" === t.state)
                        e.isSubscriber && (t.peerConnection.addTransceiver("audio", {
                            direction: "recvonly"
                        }),
                        t.peerConnection.addTransceiver("video", {
                            direction: "recvonly"
                        })),
                        t.peerConnection.createOffer(t.mediaConstraints).then(function(n) {
                            if (n.sdp = a(n.sdp),
                            e.isSubscriber || (n.sdp = n.sdp.replace(/a=.*video-orientation\r\n/g, "")),
                            n.sdp !== t.prevOffer)
                                return t.peerConnection.setLocalDescription(n),
                                t.state = "preparing-offer",
                                void t.markActionNeeded();
                            o.default.debug("[" + t.clientId + "]Not sending a new offer")
                        }).catch(function(e) {
                            o.default.debug("[" + t.clientId + "]peer connection create offer failed ", e)
                        });
                    else if ("preparing-offer" === t.state) {
                        if (t.moreIceComing)
                            return;
                        t.prevOffer = t.peerConnection.localDescription.sdp,
                        t.offerCandidates = t.prevOffer.match(/a=candidate.+\r\n/g) || [],
                        t.offerCandidates.length || (o.default.warning("[".concat(t.clientId, "]No Ice Candidate generated")),
                        Object(r.getParameter)("SHIM_CANDIDATE") ? (o.default.debug("Shimming fake candidate"),
                        t.prevOffer += "a=candidate:2243255435 1 udp 2122194687 192.168.0.1 30000 typ host generation 0 network-id 1\r\n") : o.default.error("[".concat(t.clientId, "]None Ice Candidate not allowed"))),
                        t.prevOffer = t.prevOffer.replace(/a=candidate:.+typ\shost.+\r\n/g, "a=candidate:2243255435 1 udp 2122194687 192.168.0.1 30000 typ host generation 0 network-id 1\r\n"),
                        t.sendMessage("OFFER", t.prevOffer),
                        t.state = "offer-sent"
                    } else if ("offer-received" === t.state)
                        t.peerConnection.createAnswer(function(e) {
                            if (t.peerConnection.setLocalDescription(e),
                            t.state = "offer-received-preparing-answer",
                            t.iceStarted)
                                t.markActionNeeded();
                            else {
                                var n = new Date;
                                o.default.debug("[" + t.clientId + "]" + n.getTime() + ": Starting ICE in responder"),
                                t.iceStarted = !0
                            }
                        }, function(e) {
                            o.default.debug("[" + t.clientId + "]peer connection create answer failed ", e)
                        }, t.mediaConstraints);
                    else if ("offer-received-preparing-answer" === t.state) {
                        if (t.moreIceComing)
                            return;
                        n = t.peerConnection.localDescription.sdp,
                        t.sendMessage("ANSWER", n),
                        t.state = "established"
                    } else
                        t.debug("Dazed and confused in state " + t.state + ", stopping here");
                    t.actionNeeded = !1
                }
            }
            ,
            t.sendMessage = function(e, n) {
                var i = {};
                i.messageType = e,
                i.sdp = n,
                "OFFER" === e ? (i.offererSessionId = t.sessionId,
                i.answererSessionId = t.otherSessionId,
                i.seq = t.sequenceNumber += 1,
                i.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (i.offererSessionId = t.incomingMessage.offererSessionId,
                i.answererSessionId = t.sessionId,
                i.seq = t.incomingMessage.seq),
                t.onsignalingmessage(JSON.stringify(i))
            }
            ,
            t._getSender = function(e) {
                if (t.peerConnection && t.peerConnection.getSenders) {
                    var n = t.peerConnection.getSenders().find(function(t) {
                        return t.track.kind == e
                    });
                    if (n)
                        return n
                }
                return null
            }
            ,
            t.hasSender = function(e) {
                return !!t._getSender(e)
            }
            ,
            t.replaceTrack = function(e, n, i) {
                var a = t._getSender(e.kind);
                if (!a)
                    return i("NO_SENDER_FOUND");
                try {
                    a.replaceTrack(e)
                } catch (e) {
                    return i && i(e)
                }
                setTimeout(function() {
                    return n && n()
                }, 50)
            }
            ,
            t.error = function(e) {
                throw "Error in RoapOnJsep: " + e
            }
            ,
            t.sessionId = t.roapSessionId += 1,
            t.sequenceNumber = 0,
            t.actionNeeded = !1,
            t.iceStarted = !1,
            t.moreIceComing = !0,
            t.iceCandidateCount = 0,
            t.onsignalingmessage = e.callback,
            t.peerConnection.ontrack = function(e) {
                console.log("!!! ontrack, ", e.track.kind, e.track),
                t.onaddstream && t.onaddstream(e, "ontrack")
            }
            ,
            t.peerConnection.onremovestream = function(e) {
                t.onremovestream && t.onremovestream(e)
            }
            ,
            t.peerConnection.oniceconnectionstatechange = function(e) {
                "connected" === e.currentTarget.iceConnectionState && (t.connectedTime = new Date),
                t.oniceconnectionstatechange && t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)
            }
            ,
            t.renegotiate = function() {
                void 0 !== t.prevOffer && t.peerConnection.createOffer().then(function(e) {
                    return e.sdp = e.sdp.replace(/a=recvonly\r\n/g, "a=inactive\r\n"),
                    e.sdp = i(e.sdp),
                    e.sdp = a(e.sdp),
                    t.peerConnection.setLocalDescription(e)
                }).then(function() {
                    t.onnegotiationneeded && t.onnegotiationneeded(t.peerConnection.localDescription.sdp)
                }).catch(function(e) {
                    console.log("createOffer error: ", e)
                })
            }
            ,
            t.peerConnection.onnegotiationneeded = t.renegotiate,
            t.onaddstream = null,
            t.onremovestream = null,
            t.state = "new",
            t.markActionNeeded(),
            t
        }
          , A = function(e) {
            var t = {}
              , n = (mozRTCPeerConnection,
            mozRTCSessionDescription)
              , i = !1;
            t.uid = e.uid,
            t.isVideoMute = e.isVideoMute,
            t.isAudioMute = e.isAudioMute,
            t.isSubscriber = e.isSubscriber,
            t.clientId = e.clientId,
            t.filterStatsCache = [],
            t.originStatsCache = [],
            t.lastTimeGetStats = null,
            t.pc_config = {
                iceServers: []
            },
            e.iceServers instanceof Array ? e.iceServers.map(function(e) {
                0 === e.url.indexOf("stun:") && t.pc_config.iceServers.push({
                    url: e.url
                })
            }) : (e.stunServerUrl && (e.stunServerUrl instanceof Array ? e.stunServerUrl.map(function(e) {
                "string" == typeof e && "" !== e && t.pc_config.iceServers.push({
                    url: e
                })
            }) : "string" == typeof e.stunServerUrl && "" !== e.stunServerUrl && t.pc_config.iceServers.push({
                url: e.stunServerUrl
            })),
            e.turnServers && (e.turnServers instanceof Array ? e.turnServers.map(function(e) {
                e.udpport && t.pc_config.iceServers.push({
                    username: e.username,
                    credential: e.credential,
                    credentialType: "password",
                    urls: "turn:" + e.url + ":" + e.udpport + "?transport=udp"
                }),
                "string" == typeof e.tcpport && "" !== e.tcpport && t.pc_config.iceServers.push({
                    username: e.username,
                    credential: e.credential,
                    credentialType: "password",
                    urls: "turn:" + e.url + ":" + e.tcpport + "?transport=tcp"
                }),
                !0 === e.forceturn && (t.pc_config.iceTransportPolicy = "relay")
            }) : o.default.error("[".concat(t.clientId, "] turnServers is not a array")))),
            void 0 === e.audio && (e.audio = !0),
            void 0 === e.video && (e.video = !0),
            t.mediaConstraints = {
                offerToReceiveAudio: e.audio,
                offerToReceiveVideo: e.video,
                mozDontOfferDataChannel: !0
            },
            t.roapSessionId = 103,
            t.peerConnection = new E.RTCPeerConnection(t.pc_config),
            o.default.debug("[" + t.clientId + ']safari Created RTCPeerConnnection with config "' + JSON.stringify(t.pc_config) + '".'),
            t.iceCandidateTimer = setTimeout(function() {
                t.iceCandidateTimer = null,
                o.default.debug("[".concat(t.clientId, "]Candidates collected: ").concat(t.iceCandidateCount)),
                t.moreIceComing && (t.moreIceComing = !1,
                t.markActionNeeded())
            }, Object(r.getParameter)("CANDIDATE_TIMEOUT")),
            t.peerConnection.onicecandidate = function(e) {
                var n, i, a, r;
                i = (n = t.peerConnection.localDescription.sdp).match(/a=candidate:.+typ\ssrflx.+\r\n/),
                a = n.match(/a=candidate:.+typ\shost.+\r\n/),
                r = n.match(/a=candidate:.+typ\srelay.+\r\n/),
                null === i && null === a && null === r || void 0 !== t.ice || !t.iceCandidateTimer || (o.default.debug("[" + t.clientId + "]srflx candidate : " + i + " relay candidate: " + r + " host candidate : " + a),
                clearTimeout(t.iceCandidateTimer),
                t.iceCandidateTimer = null,
                t.ice = 0,
                t.moreIceComing = !1,
                t.markActionNeeded()),
                t.iceCandidateCount = t.iceCandidateCount + 1
            }
            ,
            t.checkMLineReverseInSDP = function(e) {
                return !(!~e.indexOf("m=audio") || !~e.indexOf("m=video")) && e.indexOf("m=audio") > e.indexOf("m=video")
            }
            ,
            t.reverseMLineInSDP = function(e) {
                var t = e.split("m=audio")
                  , n = t[1].split("m=video")
                  , i = "m=video" + n[1]
                  , a = "m=audio" + n[0];
                return e = t[0] + i + a
            }
            ,
            t.processSignalingMessage = function(e) {
                var i, a = JSON.parse(e);
                t.incomingMessage = a,
                "new" === t.state ? "OFFER" === a.messageType ? (a.sdp = l(a.sdp),
                i = {
                    sdp: a.sdp,
                    type: "offer"
                },
                t.peerConnection.setRemoteDescription(new n(i), function() {
                    o.default.debug("[" + t.clientId + "]setRemoteDescription succeeded")
                }, function(e) {
                    o.default.info("[" + t.clientId + "]setRemoteDescription failed: " + e.name)
                }),
                t.state = "offer-received",
                t.markActionNeeded()) : t.error("Illegal message for this state: " + a.messageType + " in state " + t.state) : "offer-sent" === t.state ? "ANSWER" === a.messageType ? (a.sdp = l(a.sdp),
                a.sdp = a.sdp.replace(/ generation 0/g, ""),
                a.sdp = a.sdp.replace(/ udp /g, " UDP "),
                -1 !== a.sdp.indexOf("a=group:BUNDLE") ? (a.sdp = a.sdp.replace(/a=group:BUNDLE audio video/, "a=group:BUNDLE sdparta_0 sdparta_1"),
                a.sdp = a.sdp.replace(/a=mid:audio/, "a=mid:sdparta_0"),
                a.sdp = a.sdp.replace(/a=mid:video/, "a=mid:sdparta_1")) : (a.sdp = a.sdp.replace(/a=mid:audio/, "a=mid:sdparta_0"),
                a.sdp = a.sdp.replace(/a=mid:video/, "a=mid:sdparta_0")),
                i = {
                    sdp: a.sdp,
                    type: "answer"
                },
                t.peerConnection.setRemoteDescription(new n(i), function() {
                    o.default.debug("[" + t.clientId + "]setRemoteDescription succeeded")
                }, function(e) {
                    o.default.info("[" + t.clientId + "]setRemoteDescription failed: " + e)
                }),
                t.state = "established") : "pr-answer" === a.messageType ? (i = {
                    sdp: a.sdp,
                    type: "pr-answer"
                },
                t.peerConnection.setRemoteDescription(new n(i), function() {
                    o.default.debug("[" + t.clientId + "]setRemoteDescription succeeded")
                }, function(e) {
                    o.default.info("[" + t.clientId + "]setRemoteDescription failed: " + e.name)
                })) : "offer" === a.messageType ? t.error("Not written yet") : t.error("Illegal message for this state: " + a.messageType + " in state " + t.state) : "established" === t.state && ("OFFER" === a.messageType ? (i = {
                    sdp: a.sdp,
                    type: "offer"
                },
                t.peerConnection.setRemoteDescription(new n(i), function() {
                    o.default.debug("[" + t.clientId + "]setRemoteDescription succeeded")
                }, function(e) {
                    o.default.info("[" + t.clientId + "]setRemoteDescription failed: " + e.name)
                }),
                t.state = "offer-received",
                t.markActionNeeded()) : t.error("Illegal message for this state: " + a.messageType + " in state " + t.state))
            }
            ;
            var a = {
                id: "",
                type: "",
                mediaType: "opus",
                googCodecName: "opus",
                aecDivergentFilterFraction: "0",
                audioInputLevel: "0",
                bytesSent: "0",
                packetsSent: "0",
                googEchoCancellationReturnLoss: "0",
                googEchoCancellationReturnLossEnhancement: "0"
            }
              , s = {
                id: "",
                type: "",
                mediaType: "",
                googCodecName: "h264" === e.codec ? "H264" : "VP8",
                bytesSent: "0",
                packetsLost: "0",
                packetsSent: "0",
                googAdaptationChanges: "0",
                googAvgEncodeMs: "0",
                googEncodeUsagePercent: "0",
                googFirsReceived: "0",
                googFrameHeightSent: "0",
                googFrameHeightInput: "0",
                googFrameRateInput: "0",
                googFrameRateSent: "0",
                googFrameWidthSent: "0",
                googFrameWidthInput: "0",
                googNacksReceived: "0",
                googPlisReceived: "0",
                googRtt: "0"
            }
              , c = {
                id: "",
                type: "",
                mediaType: "",
                audioOutputLevel: "0",
                bytesReceived: "0",
                packetsLost: "0",
                packetsReceived: "0",
                googAccelerateRate: "0",
                googCurrentDelayMs: "0",
                googDecodingCNG: "0",
                googDecodingCTN: "0",
                googDecodingCTSG: "0",
                googDecodingNormal: "0",
                googDecodingPLC: "0",
                googDecodingPLCCNG: "0",
                googExpandRate: "0",
                googJitterBufferMs: "0",
                googJitterReceived: "0",
                googPreemptiveExpandRate: "0",
                googPreferredJitterBufferMs: "0",
                googSecondaryDecodedRate: "0",
                googSpeechExpandRate: "0"
            }
              , d = {
                id: "",
                type: "",
                mediaType: "",
                googTargetDelayMs: "0",
                packetsLost: "0",
                googDecodeMs: "0",
                googMaxDecodeMs: "0",
                googRenderDelayMs: "0",
                googFrameWidthReceived: "0",
                googFrameHeightReceived: "0",
                googFrameRateReceived: "0",
                googFrameRateDecoded: "0",
                googFrameRateOutput: "0",
                googJitterBufferMs: "0",
                googCurrentDelayMs: "0",
                googMinPlayoutDelayMs: "0",
                googNacksSent: "0",
                googPlisSent: "0",
                googFirsSent: "0",
                bytesReceived: "0",
                packetsReceived: "0",
                googFramesDecoded: "0"
            }
              , u = 0;
            t.getVideoRelatedStats = function(e) {
                t.peerConnection.getStats().then(function(n) {
                    var i = !0
                      , a = !1
                      , r = void 0;
                    try {
                        for (var o, s = n.values()[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                            var c = o.value;
                            if (t.isSubscriber) {
                                if (("inbound-rtp" === c.type || "inboundrtp" === c.type) && "video" === c.mediaType) {
                                    if (!t.lastReport)
                                        return void (t.lastReport = c);
                                    e && e({
                                        browser: "firefox",
                                        mediaType: "video",
                                        peerId: t.uid,
                                        isVideoMute: t.isVideoMute,
                                        frameRateReceived: c.framerateMean + "",
                                        frameRateDecoded: c.framesDecoded - t.lastReport.framesDecoded + "",
                                        bytesReceived: c.bytesReceived + "",
                                        packetsReceived: c.packetsReceived + "",
                                        packetsLost: c.packetsLost + ""
                                    }),
                                    t.lastReport = c
                                }
                            } else if (("outbound-rtp" === c.type || "outboundrtp" === c.type) && "video" === c.mediaType) {
                                if (!t.lastReport)
                                    return void (t.lastReport = c);
                                e && e({
                                    mediaType: "video",
                                    isVideoMute: t.isVideoMute,
                                    frameRateInput: c.framerateMean + "",
                                    frameRateSent: c.framesEncoded - t.lastReport.framesEncoded + ""
                                }),
                                t.lastReport = c
                            }
                        }
                    } catch (e) {
                        a = !0,
                        r = e
                    } finally {
                        try {
                            i || null == s.return || s.return()
                        } finally {
                            if (a)
                                throw r
                        }
                    }
                })
            }
            ,
            t.getAudioRelatedStats = function(e) {
                t.peerConnection.getStats().then(function(n) {
                    var i = !0
                      , a = !1
                      , r = void 0;
                    try {
                        for (var o, s = n.values()[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) {
                            var c = o.value;
                            t.isSubscriber && ("inbound-rtp" !== c.type && "inboundrtp" !== c.type || "audio" !== c.mediaType || e && e({
                                browser: "firefox",
                                mediaType: "audio",
                                peerId: t.uid,
                                isAudioMute: t.isAudioMute,
                                frameDropped: c.packetsLost + "",
                                frameReceived: c.packetsReceived + "",
                                googJitterReceived: c.jitter + "",
                                bytesReceived: c.bytesReceived + "",
                                packetsReceived: c.packetsReceived + "",
                                packetsLost: c.packetsLost + ""
                            }))
                        }
                    } catch (e) {
                        a = !0,
                        r = e
                    } finally {
                        try {
                            i || null == s.return || s.return()
                        } finally {
                            if (a)
                                throw r
                        }
                    }
                })
            }
            ,
            t.getStatsRate = function(e) {
                t.getStats(function(t) {
                    t.forEach(function(e) {
                        "inbound-rtp" !== e.type && "inboundrtp" !== e.type || "video" !== e.mediaType || e.googFrameRateDecoded && (e.googFrameRateDecoded = ((e.googFramesDecoded - u) / 3).toString(),
                        u = e.googFramesDecoded)
                    }),
                    e(t)
                })
            }
            ,
            t.getStats = function(e, n) {
                n = (n = n || 500) > 500 ? 500 : n,
                t.lastTimeGetStats && Date.now() - t.lastTimeGetStats < n ? e && e(t.filterStatsCache, t.originStatsCache) : this._getStats(function(n, i) {
                    t.filterStatsCache = n,
                    t.originStatsCache = i,
                    t.lastTimeGetStats = Date.now(),
                    e && e(n, i)
                })
            }
            ,
            t._getStats = function(e) {
                t.peerConnection.getStats().then(function(n) {
                    var i = []
                      , r = !0
                      , o = !1
                      , u = void 0;
                    try {
                        for (var l, f = n.values()[Symbol.iterator](); !(r = (l = f.next()).done); r = !0) {
                            var p = l.value;
                            i.push(p),
                            "outbound-rtp" !== p.type && "outboundrtp" !== p.type || "video" !== p.mediaType || -1 !== p.id.indexOf("rtcp") || (s.id = p.id,
                            s.type = p.type,
                            s.mediaType = p.mediaType,
                            s.bytesSent = p.bytesSent ? p.bytesSent + "" : "0",
                            s.packetsSent = p.packetsSent ? p.packetsSent + "" : "0",
                            s.googPlisReceived = p.pliCount ? p.pliCount + "" : "0",
                            s.googNacksReceived = p.nackCount ? p.nackCount + "" : "0",
                            s.googFirsReceived = p.firCount ? p.firCount + "" : "0",
                            s.googFrameRateSent = p.framerateMean ? p.framerateMean + "" : "0"),
                            "outbound-rtp" !== p.type && "outboundrtp" !== p.type || "audio" !== p.mediaType || -1 !== p.id.indexOf("rtcp") || (a.id = p.id,
                            a.type = p.type,
                            a.mediaType = p.mediaType,
                            a.bytesSent = p.bytesSent ? p.bytesSent + "" : "0",
                            a.packetsSent = p.packetsSent ? p.packetsSent + "" : "0"),
                            "inbound-rtp" !== p.type && "inboundrtp" !== p.type || "audio" !== p.mediaType || p.isRemote || -1 !== p.id.indexOf("rtcp") || (c.id = p.id,
                            c.type = p.type,
                            c.mediaType = p.mediaType,
                            c.bytesReceived = p.bytesReceived ? p.bytesReceived + "" : "0",
                            c.packetsLost = p.packetsLost ? p.packetsLost + "" : "0",
                            c.packetsReceived = p.packetsReceived ? p.packetsReceived + "" : "0",
                            c.googJitterReceived = p.jitter ? p.jitter + "" : "0"),
                            "inbound-rtp" !== p.type && "inboundrtp" !== p.type || "video" !== p.mediaType || p.isRemote || -1 !== p.id.indexOf("rtcp") || (d.id = p.id,
                            d.type = p.type,
                            d.mediaType = p.mediaType,
                            d.bytesReceived = p.bytesReceived ? p.bytesReceived + "" : "0",
                            d.googFrameRateReceived = p.framerateMean ? p.framerateMean + "" : "0",
                            d.googFramesDecoded = p.framesDecoded ? p.framesDecoded + "" : "0",
                            d.packetsLost = p.packetsLost ? p.packetsLost + "" : "0",
                            d.packetsReceived = p.packetsReceived ? p.packetsReceived + "" : "0",
                            d.googJitterBufferMs = p.jitter ? p.jitter + "" : "0",
                            d.googNacksSent = p.nackCount ? p.nackCount + "" : "0",
                            d.googPlisSent = p.pliCount ? p.pliCount + "" : "0",
                            d.googFirsSent = p.firCount ? p.firCount + "" : "0"),
                            -1 !== p.id.indexOf("outbound_rtcp_video") && (s.packetsLost = p.packetsLost ? p.packetsLost + "" : "0")
                        }
                    } catch (e) {
                        o = !0,
                        u = e
                    } finally {
                        try {
                            r || null == f.return || f.return()
                        } finally {
                            if (o)
                                throw u
                        }
                    }
                    var g = [s, a, c, d];
                    g.push({
                        id: "time",
                        startTime: t.connectedTime,
                        timestamp: new Date
                    }),
                    e(g, i)
                }, function(e) {
                    o.default.error("[" + t.clientId + "]" + e)
                })
            }
            ,
            t.addStream = function(e) {
                i = !0,
                t.peerConnection.addStream(e),
                t.markActionNeeded()
            }
            ,
            t.removeStream = function() {
                t.markActionNeeded()
            }
            ,
            t.close = function() {
                t.state = "closed",
                t.peerConnection.close()
            }
            ,
            t.markActionNeeded = function() {
                t.actionNeeded = !0,
                t.doLater(function() {
                    t.onstablestate()
                })
            }
            ,
            t.doLater = function(e) {
                window.setTimeout(e, 1)
            }
            ,
            t.onstablestate = function() {
                if (t.actionNeeded) {
                    if ("new" === t.state || "established" === t.state)
                        i && (t.mediaConstraints = void 0),
                        t.peerConnection.createOffer(function(e) {
                            if (e.sdp = l(e.sdp),
                            e.sdp = e.sdp.replace(/a=extmap:1 http:\/\/www.webrtc.org\/experiments\/rtp-hdrext\/abs-send-time/, "a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time"),
                            e.sdp !== t.prevOffer)
                                return t.peerConnection.setLocalDescription(e),
                                t.state = "preparing-offer",
                                void t.markActionNeeded();
                            o.default.debug("[" + t.clientId + "]Not sending a new offer")
                        }, function(e) {
                            o.default.debug("[" + t.clientId + "]Ups! create offer failed ", e)
                        }, t.mediaConstraints);
                    else if ("preparing-offer" === t.state) {
                        if (t.moreIceComing)
                            return;
                        t.prevOffer = t.peerConnection.localDescription.sdp,
                        t.offerCandidates = t.prevOffer.match(/a=candidate.+\r\n/g) || [],
                        t.offerCandidates.length || (o.default.warning("[".concat(t.clientId, "]No Ice Candidate generated")),
                        Object(r.getParameter)("SHIM_CANDIDATE") ? (o.default.debug("Shimming fake candidate"),
                        t.prevOffer += "a=candidate:2243255435 1 udp 2122194687 192.168.0.1 30000 typ host generation 0 network-id 1\r\n") : o.default.error("[".concat(t.clientId, "]None Ice Candidate not allowed"))),
                        t.prevOffer = t.prevOffer.replace(/a=candidate:.+typ\shost.+\r\n/g, "a=candidate:2243255435 1 udp 2122194687 192.168.0.1 30000 typ host generation 0 network-id 1\r\n"),
                        t.sendMessage("OFFER", t.prevOffer),
                        t.state = "offer-sent"
                    } else if ("offer-received" === t.state)
                        t.peerConnection.createAnswer(function(e) {
                            if (t.peerConnection.setLocalDescription(e),
                            t.state = "offer-received-preparing-answer",
                            t.iceStarted)
                                t.markActionNeeded();
                            else {
                                var n = new Date;
                                o.default.debug("[" + t.clientId + "]" + n.getTime() + ": Starting ICE in responder"),
                                t.iceStarted = !0
                            }
                        }, function() {
                            o.default.debug("[" + t.clientId + "]Ups! Something went wrong")
                        });
                    else if ("offer-received-preparing-answer" === t.state) {
                        if (t.moreIceComing)
                            return;
                        var e = t.peerConnection.localDescription.sdp;
                        t.sendMessage("ANSWER", e),
                        t.state = "established"
                    } else
                        t.debug("Dazed and confused in state " + t.state + ", stopping here");
                    t.actionNeeded = !1
                }
            }
            ,
            t.sendMessage = function(e, n) {
                var i = {};
                i.messageType = e,
                i.sdp = n,
                "OFFER" === e ? (i.offererSessionId = t.sessionId,
                i.answererSessionId = t.otherSessionId,
                i.seq = t.sequenceNumber += 1,
                i.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (i.offererSessionId = t.incomingMessage.offererSessionId,
                i.answererSessionId = t.sessionId,
                i.seq = t.incomingMessage.seq),
                t.onsignalingmessage(JSON.stringify(i))
            }
            ,
            t._getSender = function(e) {
                if (t.peerConnection && t.peerConnection.getSenders) {
                    var n = t.peerConnection.getSenders().find(function(t) {
                        return t.track.kind == e
                    });
                    if (n)
                        return n
                }
                return null
            }
            ,
            t.hasSender = function(e) {
                return !!t._getSender(e)
            }
            ,
            t.replaceTrack = function(e, n, i) {
                var a = t._getSender(e.kind);
                if (!a)
                    return i("NO_SENDER_FOUND");
                try {
                    a.replaceTrack(e)
                } catch (e) {
                    return i && i(e)
                }
                setTimeout(function() {
                    return n && n()
                }, 50)
            }
            ,
            t.error = function(e) {
                throw "Error in RoapOnJsep: " + e
            }
            ,
            t.sessionId = t.roapSessionId += 1,
            t.sequenceNumber = 0,
            t.actionNeeded = !1,
            t.iceStarted = !1,
            t.moreIceComing = !0,
            t.iceCandidateCount = 0,
            t.onsignalingmessage = e.callback,
            t.peerConnection.ontrack = function(e) {
                t.onaddstream && t.onaddstream(e, "ontrack")
            }
            ,
            t.peerConnection.onremovestream = function(e) {
                t.onremovestream && t.onremovestream(e)
            }
            ,
            t.peerConnection.oniceconnectionstatechange = function(e) {
                "connected" === e.currentTarget.iceConnectionState && (t.connectedTime = new Date),
                t.oniceconnectionstatechange && t.oniceconnectionstatechange(e.currentTarget.iceConnectionState)
            }
            ;
            var l = function(t) {
                var n;
                if (e.video && e.maxVideoBW && (null == (n = t.match(/m=video.*\r\n/)) && (n = t.match(/m=video.*\n/)),
                n && n.length > 0)) {
                    var i = n[0] + "b=TIAS:" + 1e3 * e.maxVideoBW + "\r\n";
                    t = t.replace(n[0], i)
                }
                return e.audio && e.maxAudioBW && (null == (n = t.match(/m=audio.*\r\n/)) && (n = t.match(/m=audio.*\n/)),
                n && n.length > 0) && (i = n[0] + "b=TIAS:" + 1e3 * e.maxAudioBW + "\r\n",
                t = t.replace(n[0], i)),
                t
            };
            return t.onaddstream = null,
            t.onremovestream = null,
            t.state = "new",
            t.markActionNeeded(),
            t
        }
          , C = a(18)
          , O = a.n(C)
          , N = null
          , w = function() {
            try {
                N = window.require("electron")
            } catch (e) {}
            return N
        }
          , k = function(e) {
            var t = s.b.reportApiInvoke(null, {
                callback: e,
                name: "getScreenSources",
                options: arguments,
                tag: "tracer"
            })
              , n = w();
            if (!n)
                return t && t("electron is null");
            try {
                var i = n.desktopCapturer.getSources({
                    types: ["window", "screen"]
                })
            } catch (e) {
                console.log(e)
            }
            if (i instanceof Promise)
                console.log("electron.desktopCapturer.getSources return type is Promise"),
                i.then(function(e) {
                    return t && t(null, e)
                }).catch(function(e) {
                    return t && t(e)
                });
            else
                i = n.desktopCapturer.getSources({
                    types: ["window", "screen"]
                }, function(e, n) {
                    console.log("electron.desktopCapturer.getSources return type is callback"),
                    t && t(null, n)
                })
        }
          , D = function(e, t, n) {
            var i = t.width;
            t = {
                audio: !1,
                video: {
                    mandatory: {
                        chromeMediaSource: "desktop",
                        chromeMediaSourceId: e,
                        maxHeight: t.height,
                        maxWidth: i,
                        maxFrameRate: t.frameRate && t.frameRate.max,
                        minFrameRate: t.frameRate && t.frameRate.min
                    }
                }
            };
            navigator.webkitGetUserMedia(t, function(e) {
                n && n(null, e)
            }, function(e) {
                n && n(e)
            })
        }
          , L = function() {
            return !!w()
        }
          , M = k
          , P = D
          , x = function(e, t) {
            k(function(n, i) {
                if (n)
                    return t && t(n);
                !function(e, t) {
                    var n = document.createElement("div");
                    n.innerText = "share screen",
                    n.setAttribute("style", "text-align: center; height: 25px; line-height: 25px; border-radius: 4px 4px 0 0; background: #D4D2D4; border-bottom:  solid 1px #B9B8B9;");
                    var i = document.createElement("div");
                    i.setAttribute("style", "width: 100%; height: 500px; padding: 15px 25px ; box-sizing: border-box;");
                    var a = document.createElement("div");
                    a.innerText = "Agora Web Screensharing wants to share the contents of your screen with webdemo.agorabeckon.com. Choose what you'd like to share.",
                    a.setAttribute("style", "height: 12%;");
                    var r = document.createElement("div");
                    r.setAttribute("style", "width: 100%; height: 80%; background: #FFF; border:  solid 1px #CBCBCB; display: flex; flex-wrap: wrap; justify-content: space-around; overflow-y: scroll; padding: 0 15px; box-sizing: border-box;");
                    var o = document.createElement("div");
                    o.setAttribute("style", "text-align: right; padding: 16px 0;");
                    var s = document.createElement("button");
                    s.innerHTML = "cancel",
                    s.setAttribute("style", "width: 85px;"),
                    s.onclick = function() {
                        document.body.removeChild(c),
                        t && t("NotAllowedError")
                    }
                    ,
                    o.appendChild(s),
                    i.appendChild(a),
                    i.appendChild(r),
                    i.appendChild(o);
                    var c = document.createElement("div");
                    c.setAttribute("style", "position: absolute; z-index: 99999999; top: 50%; left: 50%; width: 620px; height: 525px; background: #ECECEC; border-radius: 4px; -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%);"),
                    c.appendChild(n),
                    c.appendChild(i),
                    document.body.appendChild(c),
                    e.map(function(e) {
                        if (e.id) {
                            var n = document.createElement("div");
                            n.setAttribute("style", "width: 30%; height: 160px; padding: 20px 0; text-align: center;box-sizing: content-box;"),
                            n.innerHTML = '<div style="height: 120px; display: table-cell; vertical-align: middle;"><img style="width: 100%; background: #333333; box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);" src=' + e.thumbnail.toDataURL() + ' /></div><span style="\theight: 40px; line-height: 40px; display: inline-block; width: 70%; word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + e.name + "</span>",
                            n.onclick = function() {
                                document.body.removeChild(c),
                                t && t(null, e.id)
                            }
                            ,
                            r.appendChild(n)
                        }
                    })
                }(i, function(n, i) {
                    if (n)
                        return t && t(n);
                    D(i, e, t)
                })
            })
        }
          , U = 103
          , V = function(e) {
            var t = {};
            if (t.clientId = e.clientId,
            e.session_id = U += 1,
            "undefined" == typeof window || !window.navigator)
                throw o.default.error("[" + t.streamId + "][" + t.clientId + "]Publish/subscribe video/audio streams not supported yet"),
                new Error("NON_BROWSER_ENV_DETECTED");
            return null !== window.navigator.userAgent.match("Firefox") ? (t.browser = "mozilla",
            t = A(e)) : "iOS" === g.getBrowserOS() || g.isSafari() ? (o.default.debug("[" + t.streamId + "][" + t.clientId + "]Safari"),
            (t = R(e)).browser = "safari") : ~window.navigator.userAgent.indexOf("Edge") ? t = new O.a(e) : (t = b(e)).browser = "chrome-stable",
            t
        }
          , j = function(e, t, n) {
            var i = {};
            i.config = e,
            i.streamId = e.streamId,
            delete e.streamId,
            navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            var a = 0
              , r = 1
              , s = !1
              , c = null
              , d = function(e) {
                if (a++,
                c)
                    if (c === e)
                        o.default.debug("Using Video Source/ Audio Source");
                    else {
                        var n = c.getVideoTracks()[0]
                          , i = c.getAudioTracks()[0]
                          , d = e.getVideoTracks()[0]
                          , u = e.getAudioTracks()[0];
                        d && (n && c.removeTrack(n),
                        c.addTrack(d)),
                        u && (i && c.removeTrack(i),
                        c.addTrack(u))
                    }
                else
                    c = e;
                a !== r || s || (s = !0,
                setTimeout(function() {
                    t(c)
                }, 0))
            }
              , u = function(e) {
                o.default.error("Failed to GetUserMedia", e.name, e.code, e.message, e),
                a++,
                s || (s = !0,
                setTimeout(function() {
                    n && n(e)
                }, 0))
            }
              , l = function() {
                var t = {
                    video: e.video,
                    audio: e.audio
                };
                if (o.default.debug("GetUserMedia", JSON.stringify(t)),
                navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
                    navigator.mediaDevices.getUserMedia(t).then(d).catch(u);
                else if ("undefined" != typeof navigator && navigator.getMedia)
                    navigator.getMedia(e, d, u);
                else {
                    var a = {
                        name: "MEDIA_NOT_SUPPORT",
                        message: "Video/audio streams not supported yet"
                    };
                    o.default.error("[" + i.streamId + "]" + a.message),
                    n && n(a)
                }
            };
            if ((e.videoSource || e.audioSource) && (c = new MediaStream,
            e.videoSource && c.addTrack(e.videoSource),
            e.audioSource && c.addTrack(e.audioSource)),
            e.video || e.audio || e.screen || e.screenAudio) {
                if (!e.screen && e.screenAudio)
                    return n && n({
                        code: "Set screen to true before sharing the audio"
                    });
                if (e.screen) {
                    if (L())
                        return e.screen.sourceId ? P(e.screen.sourceId, e.screen, function(t, n) {
                            t ? u(t) : (e.audio && (r++,
                            l()),
                            d(n))
                        }) : x(e.screen, function(t, n) {
                            t ? u(t) : (e.audio && (r++,
                            l()),
                            d(n))
                        });
                    if (g.isFireFox()) {
                        o.default.debug("[" + i.streamId + "]Screen access requested");
                        if (!~["screen", "window", "application"].indexOf(e.screen.mediaSource))
                            return n && n({
                                code: "Invalid mediaSource, mediaSource should be one of [screen, window, application]"
                            });
                        navigator.getMedia({
                            video: e.screen
                        }, function(t) {
                            e.audio && (r++,
                            l()),
                            d(t)
                        }, u)
                    } else if (g.isChromeKernel() && e.screen.extensionId) {
                        if (window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] < 34)
                            return void n({
                                code: "This browser does not support screen sharing"
                            });
                        o.default.debug("[" + i.streamId + "]Screen access on chrome stable, looking for extension");
                        try {
                            chrome.runtime.sendMessage(e.screen.extensionId, {
                                getStream: !0
                            }, function(t) {
                                if (void 0 === t) {
                                    o.default.error("[" + i.streamId + "]No response from Chrome Plugin. Plugin not installed properly");
                                    u({
                                        name: "PluginNotInstalledProperly",
                                        message: "No response from Chrome Plugin. Plugin not installed properly."
                                    })
                                } else
                                    e.screen.mandatory.chromeMediaSourceId = t.streamId,
                                    navigator.getMedia({
                                        video: e.screen
                                    }, function(t) {
                                        e.audio && (r++,
                                        l()),
                                        d(t)
                                    }, u)
                            })
                        } catch (e) {
                            o.default.debug("[" + i.streamId + "]AgoraRTC screensharing plugin is not accessible");
                            return void n({
                                code: "no_plugin_present"
                            })
                        }
                    } else {
                        if (window.navigator.mediaDevices.getDisplayMedia) {
                            var f = {};
                            return "number" == typeof e.screen.width && "number" == typeof e.screen.height ? f.video = {
                                width: {
                                    ideal: e.screen.width
                                },
                                height: {
                                    ideal: e.screen.height
                                }
                            } : f.video = {
                                width: e.screen.width,
                                height: e.screen.height
                            },
                            e.screen.frameRate && e.screen.frameRate.min ? f.video.frameRate = {
                                ideal: e.screen.frameRate.max,
                                max: e.screen.frameRate.max
                            } : f.video.frameRate = e.screen.frameRate,
                            e.screenAudio && (f.audio = e.screenAudio),
                            o.default.debug("use getDisplayMedia, constraints:", f),
                            window.navigator.mediaDevices.getDisplayMedia(f).then(function(t) {
                                !e.screenAudio && e.audio && (r++,
                                l()),
                                d(t)
                            }).catch(u)
                        }
                        o.default.error("[" + i.streamId + "]This browser does not support screenSharing"),
                        n({
                            code: "This browser does not support screen sharing"
                        })
                    }
                } else
                    l()
            } else
                d(c)
        }
          , F = a(10)
          , B = function(e, t, n) {
            if (["End2EndDelay", "TransportDelay", "PacketLossRate", "RecvLevel", "RecvBitrate", "CodecType", "MuteState", "TotalFreezeTime", "TotalPlayDuration", "RecordingLevel", "SendLevel", "SamplingRate", "SendBitrate", "CodecType", "MuteState", "End2EndDelay", "TransportDelay", "PacketLossRate", "RecvBitrate", "RecvResolutionWidth", "RecvResolutionHeight", "RenderResolutionHeight", "RenderResolutionWidth", "RenderFrameRate", "TotalFreezeTime", "TotalPlayDuration", "TargetSendBitrate", "SendFrameRate", "SendFrameRate", "SendBitrate", "SendResolutionWidth", "SendResolutionHeight", "CaptureResolutionHeight", "CaptureResolutionWidth", "EncodeDelay", "MuteState", "TotalFreezeTime", "TotalDuration", "CaptureFrameRate", "RTT", "OutgoingAvailableBandwidth", "Duration", "UserCount", "SendBytes", "RecvBytes", "SendBitrate", "RecvBitrate", "accessDelay", "audioSendBytes", "audioSendPackets", "videoSendBytes", "videoSendPackets", "videoSendPacketsLost", "videoSendFrameRate", "audioSendPacketsLost", "videoSendResolutionWidth", "videoSendResolutionHeight", "accessDelay", "audioReceiveBytes", "audioReceivePackets", "audioReceivePacketsLost", "videoReceiveBytes", "videoReceivePackets", "videoReceivePacketsLost", "videoReceiveFrameRate", "videoReceiveDecodeFrameRate", "videoReceiveResolutionWidth", "videoReceiveResolutionHeight", "endToEndDelay", "videoReceiveDelay", "audioReceiveDelay", "FirstFrameTime", "VideoFreezeRate", "AudioFreezeRate", "RenderResolutionWidth", "RenderResolutionHeight"].indexOf(t) > -1 && ("string" == typeof n || isFinite(n)))
                return e[t] = "" + n
        }
          , W = new function() {
            var e = c();
            return e.devicesHistory = {},
            e.states = {
                UNINIT: "UNINIT",
                INITING: "INITING",
                INITED: "INITED"
            },
            e.state = e.states.UNINIT,
            e.deviceStates = {
                ACTIVE: "ACTIVE",
                INACTIVE: "INACTIVE"
            },
            e.deviceReloadTimer = null,
            e._init = function(t, n) {
                e.state = e.states.INITING,
                e.devicesHistory = {},
                e._reloadDevicesInfo(function() {
                    e.state = e.states.INITED,
                    e.dispatchEvent({
                        type: "inited"
                    }),
                    t && t()
                }, function(t) {
                    o.default.warning("Device Detection functionality cannot start properly."),
                    e.state = e.states.UNINIT,
                    n && n(t)
                })
            }
            ,
            e._enumerateDevices = function(e, t) {
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
                    return o.default.warning("enumerateDevices() not supported."),
                    t && t("enumerateDevices() not supported");
                navigator.mediaDevices.enumerateDevices().then(function(t) {
                    e && setTimeout(function() {
                        e(t)
                    }, 0)
                }).catch(function(e) {
                    t && t(e)
                })
            }
            ,
            e._reloadDevicesInfo = function(t, n) {
                var i = [];
                e._enumerateDevices(function(n) {
                    var a = Date.now();
                    for (var r in n.forEach(function(t) {
                        var n = e.devicesHistory[t.deviceId];
                        if ((n ? n.state : e.deviceStates.INACTIVE) != e.deviceStates.ACTIVE) {
                            var r = n || {
                                initAt: a
                            };
                            r.device = t,
                            r.state = e.deviceStates.ACTIVE,
                            i.push(r),
                            e.devicesHistory[t.deviceId] = r
                        }
                        e.devicesHistory[t.deviceId].lastReloadAt = a
                    }),
                    e.devicesHistory) {
                        var s = e.devicesHistory[r];
                        s && s.state == e.deviceStates.ACTIVE && s.lastReloadAt !== a && (s.state = e.deviceStates.INACTIVE,
                        i.push(s)),
                        s.lastReloadAt = a
                    }
                    e.state == e.states.INITED && i.forEach(function(t) {
                        var n = h()({}, t);
                        switch (t.device.kind) {
                        case "audioinput":
                            n.type = "recordingDeviceChanged";
                            break;
                        case "audiooutput":
                            n.type = "playoutDeviceChanged";
                            break;
                        case "videoinput":
                            n.type = "cameraChanged";
                            break;
                        default:
                            o.default.warning("Unknown device change", n),
                            n.type = "unknownDeviceChanged"
                        }
                        e.dispatchEvent(n)
                    }),
                    t && t()
                }, n)
            }
            ,
            e.getDeviceById = function(t, n, i) {
                e.getDevices(function(e) {
                    for (var a = 0; a < e.length; a++) {
                        var r = e[a];
                        if (r && r.deviceId === t)
                            return n && n(r)
                    }
                    return i && i()
                })
            }
            ,
            e.searchDeviceNameById = function(t) {
                var n = e.devicesHistory[t];
                return n ? n.device.label || n.device.deviceId : null
            }
            ,
            e.getDevices = function(t, n) {
                e._enumerateDevices(t, function(e) {
                    n && n(e.name + ": " + e.message)
                })
            }
            ,
            e.getVideoCameraIdByLabel = function(t, n, i) {
                e.getCameras(function(e) {
                    var a = !0
                      , r = !1
                      , o = void 0;
                    try {
                        for (var s, c = e[Symbol.iterator](); !(a = (s = c.next()).done); a = !0) {
                            var d = s.value;
                            if (d.label === t)
                                return n && n(d.deviceId)
                        }
                    } catch (e) {
                        r = !0,
                        o = e
                    } finally {
                        try {
                            a || null == c.return || c.return()
                        } finally {
                            if (r)
                                throw o
                        }
                    }
                    return i && i(I.default.NOT_FIND_DEVICE_BY_LABEL)
                }, i)
            }
            ,
            e.getRecordingDevices = function(t, n) {
                return e._enumerateDevices(function(e) {
                    var n = e.filter(function(e) {
                        return "audioinput" == e.kind
                    });
                    t && t(n)
                }, function(e) {
                    n && n(e)
                })
            }
            ,
            e.getPlayoutDevices = function(t, n) {
                return e._enumerateDevices(function(e) {
                    var n = e.filter(function(e) {
                        return "audiooutput" == e.kind
                    });
                    t && t(n)
                }, function(e) {
                    n && n(e)
                })
            }
            ,
            e.getCameras = function(t, n) {
                return e._enumerateDevices(function(e) {
                    var n = e.filter(function(e) {
                        return "videoinput" == e.kind
                    });
                    t && t(n)
                }, function(e) {
                    n && n(e)
                })
            }
            ,
            e._init(function() {
                navigator.mediaDevices && navigator.mediaDevices.addEventListener && navigator.mediaDevices.addEventListener("devicechange", function() {
                    e._reloadDevicesInfo()
                }),
                e.deviceReloadTimer = setInterval(e._reloadDevicesInfo, 5e3)
            }),
            e
        }
          , H = a(1)
          , G = a(14);
        var q = a(7)
          , Y = a.n(q)
          , J = a(11)
          , K = a.n(J)
          , z = a(19)
          , X = a.n(z)
          , Q = a(20)
          , $ = a.n(Q)
          , Z = 5
          , ee = [31, 222, 239, 159, 192, 236, 164, 81, 54, 227, 176, 149, 2, 247, 75, 141, 183, 54, 213, 216, 158, 92, 111, 49, 228, 111, 150, 6, 135, 79, 35, 212, 4, 155, 200, 168, 37, 107, 243, 110, 144, 179, 51, 81, 55, 78, 223, 242, 191, 211, 74, 119, 203, 151, 142, 62, 31, 41, 132, 22, 35, 155, 87, 123, 119, 117, 216, 57, 201, 53, 228, 67, 201, 40, 106, 24, 80, 176, 187, 253, 60, 63, 136, 100, 20, 12, 177, 99, 64, 38, 101, 143, 111, 176, 251, 211, 145, 136, 34, 23, 79, 136, 202, 95, 105, 199, 125, 67, 180, 44, 210, 179, 228, 4, 85, 160, 188, 64, 26, 46, 6, 61, 201, 103, 248, 18, 97, 254, 140, 36, 115, 106, 48, 124, 102, 216, 155, 120, 36, 227, 165, 217, 7, 227, 191, 128, 212, 157, 80, 37, 117, 175, 24, 214, 47, 221, 183, 211, 51, 174, 251, 223, 159, 167, 152, 53, 36, 107, 199, 223, 91, 62, 46, 194, 11, 80, 121, 188, 219, 2, 99, 99, 232, 229, 173, 234, 21, 30, 236, 177, 243, 142, 97, 48, 108, 56, 62, 172, 56, 216, 3, 42, 79, 138, 23, 88, 182, 39, 5, 118, 68, 135, 178, 56, 9, 94, 189, 44, 104, 9, 238, 231, 174, 122, 85, 247, 231, 86, 74, 8, 189, 147, 218, 180, 58, 76, 227, 17, 46, 90, 194, 100, 51, 178, 72, 163, 151, 243, 166, 130, 85, 1, 223, 130, 152, 242, 85, 255, 28, 173, 97, 252, 119, 215, 177, 119, 86, 104, 136, 82, 40, 72, 53, 11, 18, 26, 240, 188, 76, 110, 39, 31, 189];
        function te(e) {
            for (var t = new Uint8Array([99, 114, 121, 112, 116, 105, 105]), n = t.length, i = e, a = i.length, r = new Uint8Array(a), o = new Uint8Array(256), s = 0; s < 256; s++)
                o[s] = s;
            for (var c = 0, d = 0; d < 256; d++) {
                var u = [o[c = (c + o[d] + t[d % n]) % 256], o[d]];
                o[d] = u[0],
                o[c] = u[1]
            }
            var l, f = 0;
            c = 0;
            for (var p = 0; p < 0 + a; p++) {
                var g = [o[c = (c + o[f = (f + 1) % 256]) % 256], o[f]];
                o[f] = g[0],
                o[c] = g[1],
                l = o[(o[f] + o[c]) % 256],
                p >= 0 && (r[p - 0] = i[p - 0] ^ l)
            }
            var m = String.fromCharCode.apply(null, r);
            return Function("var winSize = " + Z + "; return `" + m + "`")()
        }
        function ne(e, t) {
            var n = te(t)
              , i = $.a.createProgramFromSources(e, [te(ee), n])
              , a = e.getAttribLocation(i, "a_position")
              , r = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, r),
            e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), e.STATIC_DRAW),
            e.enableVertexAttribArray(a);
            var o = 2
              , s = e.FLOAT
              , c = !1
              , d = 0
              , u = 0;
            e.vertexAttribPointer(a, o, s, c, d, u);
            var l = e.getAttribLocation(i, "a_texCoord")
              , f = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, f),
            e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), e.STATIC_DRAW),
            e.enableVertexAttribArray(l);
            o = 2,
            s = e.FLOAT,
            c = !1,
            d = 0,
            u = 0;
            return e.vertexAttribPointer(l, o, s, c, d, u),
            i
        }
        var ie = [11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141, 133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134, 108, 152, 221, 191, 124, 116, 248, 106, 130, 251, 59, 105, 43, 91, 135, 199, 181, 223, 10, 51, 134, 194, 240, 46, 9, 3, 141, 22, 35, 146, 76, 23, 109, 117, 208, 41, 201, 45, 218, 76, 203, 105, 51, 58, 97, 154, 145, 236, 49, 18, 183, 127, 27, 12, 210, 122, 73, 42, 37, 143, 36, 207, 251, 211, 145, 191, 56, 10, 88, 222, 181, 125, 22, 238, 123, 71, 177, 107, 218, 254, 173, 28, 34, 253, 249, 67, 83, 97, 73, 111, 219, 43, 181, 82, 38, 230, 136, 109, 22, 67];
        function ae(e, t, n) {
            var i = e.gl;
            this.program = ne(i, ie),
            this.setUniforms = function() {
                i.getUniformLocation(this.program, "u_image");
                var e = i.getUniformLocation(this.program, "u_flipY");
                i.uniform1f(e, 1)
            }
        }
        var re = [11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141, 133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134, 108, 155, 210, 164, 99, 114, 228, 96, 130, 251, 59, 105, 43, 91, 135, 199, 181, 223, 10, 51, 133, 194, 247, 34, 31, 39, 142, 28, 2, 130, 18, 109, 84, 124, 223, 62, 140, 52, 128, 47, 208, 47, 115, 39, 4, 200, 220, 171, 53, 36, 150, 101, 10, 75, 247, 121, 74, 36, 35, 143, 108, 176, 235, 211, 135, 164, 36, 11, 88, 160, 148, 35, 6, 221, 41, 32, 166, 109, 205, 171, 228, 4, 26, 169, 244, 82, 119, 102, 86, 61, 201, 103, 248, 18, 97, 242, 182, 34, 121, 70, 28, 71, 126, 197, 223, 126, 14, 244, 149, 192, 12, 176, 187, 149, 212, 156, 22, 44, 36, 133, 10, 216, 63, 198, 213, 154, 116, 230, 253, 154, 154, 249, 215, 55, 60, 34, 196, 229, 76, 50, 44, 135, 22, 77, 113, 247, 142, 94, 60, 23, 172, 145, 175, 218, 81, 86, 162, 239, 180, 205, 63, 118, 3, 110, 123, 224, 127, 158, 124, 15, 127, 157, 27, 66, 176, 33, 24, 51, 53, 194, 178, 56, 6, 74, 191, 111, 51, 78, 174, 157, 229, 17, 22, 178, 231, 92, 25, 23, 191, 157, 137, 188, 54, 64, 176, 13, 22, 81, 207, 45, 108, 203, 83, 186, 130, 237, 186, 153, 110, 8, 196, 168, 152, 161, 28, 238, 46, 184, 36, 185, 20, 203, 183, 98, 95, 41, 149, 93, 105, 37, 116, 91, 68, 105, 164, 217, 30, 42, 60, 53, 173, 213, 177, 216, 195, 53, 204, 173, 128, 243, 42, 122, 205, 65, 97, 129, 194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 220, 161, 39, 214, 146, 183, 193, 225, 23, 177, 201, 243, 128, 160, 33, 75, 86, 126, 139, 254, 232, 14, 13, 85, 2, 112, 17, 150, 36, 180, 86, 226, 225, 126, 197, 17, 228, 225, 142, 245, 37, 170, 39, 96, 187, 190, 2, 35, 85, 237, 11, 189, 1, 79, 237, 2, 1, 114, 246, 109, 190, 66, 54, 153, 43, 218, 204, 70, 6, 204, 162, 247, 18, 130, 123, 30, 60, 165, 130, 142, 210, 133, 91, 127, 117, 71, 38, 145, 172, 7, 5, 16, 220, 222, 111, 98, 141, 239, 208, 125, 26, 238, 28, 0, 216, 89, 13, 7, 119, 134, 194, 75, 41, 67, 174, 1, 217, 80, 101, 40, 26, 59, 28, 59, 46, 108, 138, 38, 157, 167, 28, 234, 73, 177, 42, 42, 102, 108, 26, 181, 27, 178, 42, 43, 52, 28, 110, 117, 198, 173, 176, 178, 101, 225, 150, 36, 139, 108, 105, 10, 237, 222, 3, 143, 126, 18, 144, 115, 74, 56, 114, 134, 231, 159, 212, 62, 126, 80, 173, 216, 167, 4, 81, 18, 52, 17, 144, 218, 32, 139, 207, 104, 128, 229, 99, 84, 120, 31, 87, 227, 154, 91, 196, 63, 123, 111, 125, 36, 52, 57, 168, 113, 150, 189, 204, 24, 104, 196, 237, 86, 163, 68, 197, 202, 170, 212, 191, 81, 193, 111, 255, 162, 181, 202, 156, 146, 196, 96, 16, 118, 117, 55, 71, 156, 31, 163, 242, 204, 239, 11, 150, 27, 126, 115, 154, 107, 247, 134, 158, 125, 255, 146, 35, 183, 209, 36, 116, 87, 215, 172, 5, 251, 133, 114, 254, 141, 195, 6, 145, 4, 111, 182, 167, 74, 154, 152, 68, 18, 146, 88, 106, 200, 154, 15, 176, 94, 86, 66, 178, 101, 219, 35, 188, 129, 66, 28, 41, 110, 174, 53, 88, 174, 64, 191, 206, 127, 48, 126, 214, 216, 93, 119, 2, 166, 99, 181, 222, 29, 218, 28, 195, 219, 125, 44, 50, 16, 99, 174, 225, 51, 133, 120, 184, 159, 168, 75, 242, 162, 124, 255, 81, 25, 153, 109, 69, 220, 176, 4, 237, 196, 233, 19, 8, 240, 160, 39, 122, 81, 29, 188, 144, 249, 170, 174, 137, 30, 10, 93, 133, 151, 199, 248, 175, 38, 41, 144, 229, 245, 149, 25, 240, 138, 179, 114, 182, 84, 50, 103, 95, 31, 199, 31, 87, 208, 203, 199, 135, 49, 211, 43, 52, 36, 74, 59, 37, 22, 136, 171, 244, 126, 18, 251, 39, 159, 241, 66, 206, 127, 149, 159, 182, 143, 232, 199, 136, 46, 150, 32, 51, 221, 74, 22, 102, 93, 22, 44, 132, 140, 199, 43, 69, 249, 77, 75, 140, 70, 4, 252, 98, 235, 77, 190, 125, 18, 56, 21, 10, 244, 42, 2, 246, 62, 127, 241, 123, 137, 22, 247, 219, 177, 160, 84, 18, 10, 84, 97, 251, 127, 102, 16, 209, 181, 100, 94, 56, 238, 209, 207, 76, 189, 95, 15, 165, 139, 143, 189, 96, 225, 55, 112, 178, 27, 218, 198, 223, 251, 52, 123, 94, 130, 220, 142, 216, 116, 237, 18, 254, 49, 59, 128, 41, 29, 15, 179, 164, 85, 76, 167, 166, 151, 39, 221, 2, 190, 68, 167, 26, 177, 114, 141, 4, 67, 25, 69, 182, 38, 166, 160, 27, 151, 148, 108, 48, 227, 60, 112, 48, 22, 159, 76, 127, 251, 63, 254, 177, 113, 217, 197, 95, 179, 109, 128, 138, 99, 27, 249, 10, 174, 155, 129, 80, 39, 165, 252, 85, 60, 131, 183, 98, 107, 68, 207, 19, 233, 231, 55, 225, 126, 77, 49, 53, 145, 203, 113, 29, 208, 64, 237, 182, 229, 165, 7, 11, 169, 106, 253, 116, 141, 200, 62, 16, 38, 121, 55, 148, 91, 83, 160, 140, 126, 121, 12, 79, 189, 72, 172, 31, 243, 240, 209, 229, 32, 220, 91, 229, 81, 94, 247, 121, 153, 151, 232, 182, 171, 198, 50, 31, 152, 245, 172, 151, 130, 55, 62, 125, 38, 155, 229, 78, 207, 148, 201, 2, 78, 63, 119, 107, 168, 78, 139, 141, 163, 177, 191, 239, 141, 39, 182, 174, 40, 76, 226, 62, 125, 209, 6, 6, 34, 37, 147, 85, 204, 103, 51, 191, 36, 248, 17, 175, 20, 1, 53, 16, 35, 143, 237, 177, 125, 86, 29, 219, 235, 20, 121, 205, 59, 5, 250, 107, 109, 32, 224, 30, 152, 143, 113, 151, 95, 85, 19, 254, 164, 135, 124, 68, 136, 199, 29, 31, 244, 91, 10, 84, 127, 101, 210, 70, 226, 195, 140, 70, 166, 54, 217, 165, 84, 42, 165, 175, 100, 234, 124, 121, 105, 53, 101, 118, 174, 101, 220, 147, 68, 161, 37, 0, 182, 220, 142, 221, 155, 230, 115, 164, 10, 214, 208, 120, 91, 152, 66, 27, 81, 184, 48, 84, 70, 7, 128, 153, 217, 218, 249, 226, 70, 130, 200, 156, 61, 227, 21, 164, 137, 193, 221, 119, 10, 134, 204, 23, 20, 17, 90, 94, 105, 204, 39, 99, 1, 64, 153, 45, 213, 19, 247, 97, 194, 49, 35, 125, 255, 195, 139, 63, 209, 175, 208, 147, 189, 244, 204, 24, 211, 99, 142, 18, 92, 130, 254, 182, 231, 235, 93, 10, 127, 175, 87, 35, 62, 110, 137, 184, 39, 114, 200, 150, 11, 190, 40, 162, 168, 223, 203, 110, 242, 192, 234, 26, 11, 54, 155, 38, 48, 79, 109, 101, 119, 165, 187, 223, 5, 20, 168, 171, 241, 20, 243, 108, 199, 3, 155, 69, 244, 149, 0, 187, 110, 12, 233, 42, 151, 189, 139, 133, 104, 3, 30, 16, 200, 69, 4, 123, 103, 144, 12, 106, 182, 1, 127, 91, 125, 158, 12, 144, 238, 232, 209, 101, 159, 56, 163, 240, 179, 50, 169, 120, 219, 176, 87, 77, 45, 247, 153, 190, 82, 132, 50, 137, 209, 97, 19, 35, 247, 161, 62, 77, 16, 71, 152, 72, 61, 50, 99, 157, 154, 56, 58, 175, 27, 73, 121, 229, 195, 228, 132, 69, 233, 169, 100, 21, 123, 17, 3, 164, 6, 146, 106, 196, 29, 3, 250, 217, 164, 23, 171, 203, 14, 242, 239, 249, 169, 116, 138, 209, 98, 113, 181, 122, 35, 162, 216, 46, 230, 4, 155, 142, 118, 216, 232, 229, 28, 12, 158, 153, 126, 149, 171, 172, 231, 99, 211, 57, 114, 136, 183, 114, 74, 35, 233, 115, 127, 253, 157, 38, 49, 136, 141, 25, 161, 255, 232, 110, 101, 208, 166, 186, 226, 12, 185, 19, 155, 53, 93, 155, 39, 161, 7, 124, 213, 52, 223, 125, 211, 242, 253, 22, 13, 131, 115, 167, 198, 188, 90, 209, 63, 224, 92, 112, 118, 220, 165, 31, 164, 43, 58, 197, 77, 17, 247, 77, 164, 74, 77, 218, 18, 187, 41, 76, 189, 127, 98, 18, 226, 231, 71, 115, 236, 68, 183, 111, 50, 168, 88, 247, 9, 123, 65, 180, 88, 74, 44, 101, 101, 173, 11];
        function oe(e, t, n) {
            var i = e.gl
              , a = 1 / t
              , r = 1 / n
              , o = 5;
            this.program = ne(i, re),
            this.setUniforms = function() {
                i.getUniformLocation(this.program, "u_image");
                var e = i.getUniformLocation(this.program, "u_flipY")
                  , t = i.getUniformLocation(this.program, "u_singleStepOffset")
                  , n = i.getUniformLocation(this.program, "u_denoiseLevel");
                i.uniform2f(t, a, r),
                i.uniform1f(n, o),
                i.uniform1f(e, 1)
            }
            ,
            this.setParameters = function(e) {
                void 0 !== e.denoiseLevel && (o = e.denoiseLevel)
            }
            ,
            this.setSize = function(e, t) {
                a = 1 / e,
                r = 1 / t
            }
        }
        var se = [11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222, 172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210, 20, 131, 156, 165, 108, 122, 254, 125, 130, 229, 55, 109, 113, 11, 210, 238, 163, 213, 86, 116, 156, 248, 215, 63, 20, 48, 173, 31, 55, 133, 18, 105, 32, 16, 204, 35, 128, 38, 212, 87, 200, 97, 114, 40, 12, 210, 193, 171, 59, 33, 158, 108, 14, 75, 228, 74, 65, 32, 57, 192, 112, 156, 234, 250, 140, 189, 40, 20, 6, 230, 135, 52, 17, 200, 123, 68, 183, 44, 215, 187, 234, 2, 13, 169, 234, 94, 115, 60, 6, 107, 224, 118, 254, 88, 2, 235, 134, 36, 120, 5, 85, 94, 126, 222, 223, 101, 105, 227, 147, 199, 64, 185, 246, 143, 183, 210, 30, 37, 127, 226, 79, 156, 118, 147, 208, 131, 51, 248, 232, 217, 206, 181, 218, 58, 61, 112, 244, 227, 68, 45, 41, 206, 69, 12, 45, 163, 205, 75, 6, 23, 167, 145, 250, 237, 92, 84, 164, 240, 253, 216, 54, 85, 7, 108, 62, 255, 42, 217, 3, 27, 0, 196, 94, 28, 241, 120, 80, 92, 89, 135, 228, 125, 2, 3, 242, 39, 116, 64, 248, 216, 177, 122, 66, 178, 180, 9, 7, 33, 186, 208, 213, 188, 59, 78, 243, 95, 123, 28, 142, 45, 99, 130, 7, 167, 194, 156, 238, 199, 10, 71, 141, 251, 221, 158, 16, 255, 38, 181, 36, 184, 20, 136, 240, 55, 27, 51, 191, 82, 105, 55, 97, 78, 74, 121, 191, 161, 91, 126, 105, 103, 174, 139, 223, 145, 150, 120, 156, 240, 252, 182, 105, 104, 205, 65, 97, 129, 194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 201, 211, 39, 203, 146, 225, 246, 252, 21, 161, 250, 188, 137, 190, 42, 4, 90, 126, 211, 171, 240, 113, 67, 28, 92, 57, 77, 200, 125, 224, 19, 178, 142, 112, 202, 5, 233, 229, 128, 235, 105, 239, 102, 52, 179, 224, 87, 45, 68, 211, 10, 187, 9, 38, 190, 86, 25, 43, 175, 56, 231, 11, 108, 220, 36, 129, 131, 19, 93, 163, 239, 169, 118, 205, 50, 77, 121, 139, 139, 141, 197, 170, 20, 44, 39, 19, 97, 205, 228, 8, 106, 67, 210, 135, 111, 127, 141, 185, 175, 123, 26, 226, 42, 29, 217, 16, 99, 9, 46, 157, 232, 22, 3, 105, 174, 73, 144, 23, 110, 55, 84, 46, 4, 116, 39, 113, 205, 58, 158, 242, 7, 208, 75, 162, 55, 115, 35, 52, 124, 235, 114, 178, 55, 43, 98, 17, 100, 33, 134, 237, 190, 230, 60, 184, 192, 104, 146, 52, 58, 79, 174, 180, 81, 155, 114, 0, 153, 113, 90, 51, 86, 150, 254, 136, 205, 104, 39, 11, 190, 187, 233, 80, 81, 81, 56, 18, 222, 148, 116, 155, 156, 33, 132, 226, 127, 84, 34, 83, 28, 249, 153, 18, 197, 10, 116, 102, 125, 45, 47, 36, 235, 46, 212, 166, 209, 3, 125, 132, 237, 124, 163, 68, 197, 202, 232, 152, 234, 75, 235, 103, 248, 160, 241, 213, 151, 144, 130, 37, 23, 51, 48, 55, 12, 227, 31, 163, 242, 251, 245, 22, 129, 77, 20, 35, 150, 20, 181, 203, 138, 69, 233, 215, 109, 178, 209, 52, 85, 96, 221, 179, 56, 249, 138, 111, 250, 141, 134, 95, 152, 92, 109, 183, 174, 104, 151, 156, 31, 66, 211, 10, 57, 141, 167, 18, 177, 27, 126, 74, 252, 29, 143, 121, 173, 203, 8, 27, 44, 123, 148, 57, 88, 163, 68, 228, 158, 62, 98, 121, 192, 228, 94, 92, 72, 241, 33, 230, 173, 0, 197, 1, 194, 144, 111, 91, 60, 0, 106, 181, 203, 51, 133, 120, 250, 158, 184, 93, 216, 184, 126, 253, 21, 22, 155, 99, 80, 205, 227, 69, 231, 141, 165, 71, 70, 252, 223, 105, 51, 93, 22, 165, 135, 233, 177, 164, 139, 53, 5, 85, 151, 134, 214, 165, 249, 100, 24, 186, 207, 245, 149, 68, 218, 204, 252, 32, 190, 90, 48, 76, 57, 31, 201, 15, 52, 130, 135, 152, 206, 63, 198, 100, 126, 36, 2, 104, 116, 0, 160, 163, 186, 2, 91, 165, 57, 149, 163, 12, 239, 121, 152, 209, 224, 136, 248, 135, 136, 46, 150, 32, 51, 154, 6, 105, 0, 71, 30, 44, 175, 147, 139, 34, 91, 184, 78, 31, 145, 18, 3, 250, 122, 166, 47, 252, 109, 19, 40, 10, 123, 163, 99, 76, 133, 119, 37, 180, 38, 207, 79, 171, 185, 188];
        function ce(e, t, n) {
            var i = e.gl
              , a = 1 / t
              , r = 1 / n
              , o = 5;
            this.program = ne(i, se),
            this.setUniforms = function() {
                i.getUniformLocation(this.program, "u_image");
                var e = i.getUniformLocation(this.program, "u_flipY")
                  , t = i.getUniformLocation(this.program, "u_singleStepOffset")
                  , n = i.getUniformLocation(this.program, "u_denoiseLevel");
                i.uniform2f(t, a, r),
                i.uniform1f(n, o),
                i.uniform1f(e, 1)
            }
            ,
            this.setParameters = function(e) {
                void 0 !== e.denoiseLevel && (o = e.denoiseLevel)
            }
            ,
            this.setSize = function(e, t) {
                a = 1 / e,
                r = 1 / t
            }
        }
        var de = [11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222, 172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210, 20, 131, 156, 160, 96, 121, 255, 120, 207, 227, 114, 120, 38, 72, 149, 145, 165, 227, 75, 122, 158, 250, 232, 46, 34, 52, 135, 9, 30, 144, 17, 110, 126, 110, 130, 71, 156, 46, 210, 67, 202, 51, 119, 97, 3, 211, 214, 227, 45, 109, 151, 97, 21, 10, 229, 53, 80, 26, 51, 202, 119, 128, 230, 197, 140, 135, 40, 14, 88, 128, 202, 95, 21, 208, 96, 83, 185, 98, 216, 242, 224, 15, 25, 224, 233, 86, 96, 46, 80, 120, 220, 48, 187, 86, 30, 240, 140, 46, 95, 81, 48, 90, 117, 140, 177, 51, 107, 235, 158, 137, 5, 241, 191, 154, 149, 219, 30, 126, 85, 175, 10, 216, 63, 139, 216, 151, 122, 251, 224, 202, 220, 227, 221, 53, 122, 34, 213, 224, 94, 45, 14, 200, 68, 31, 61, 175, 208, 17, 120, 82, 244, 138, 208, 165, 21, 19, 236, 232, 180, 217, 50, 74, 70, 126, 114, 227, 62, 192, 124, 9, 85, 148, 33, 77, 255, 117, 75, 102, 87, 151, 255, 87, 74, 74, 181, 111, 108, 9, 249, 220, 174, 59, 80, 254, 168, 29, 30, 94, 171, 133, 133, 195, 105, 64, 254, 68, 65, 18, 158, 54, 73, 203, 65, 175, 151, 170, 236, 138, 17, 119, 128, 237, 214, 189, 28, 250, 38, 149, 97, 242, 81, 212, 254, 57, 18, 120, 155, 64, 96, 108, 75, 78, 74, 121, 191, 243, 30, 42, 60, 103, 165, 196, 160, 195, 216, 99, 182, 173, 214, 182, 105, 53, 231, 3, 45, 212, 144, 101, 217, 65, 141, 44, 230, 125, 151, 154, 123, 57, 134, 223, 98, 133, 156, 238, 137, 181, 80, 175, 230, 167, 131, 180, 13, 69, 77, 44, 156, 165, 252, 14, 27, 85, 71, 1, 82, 196, 64, 243, 26, 167, 146, 98, 201, 6, 195, 247, 200, 224, 44, 177, 104, 109, 187, 231, 83, 118, 28, 159, 92, 179, 28, 14, 162, 81, 84, 21, 168, 34, 156, 21, 127, 215, 88, 218, 208, 11, 92, 161, 239, 239, 82, 221, 59, 86, 83, 201, 199, 216, 151, 139, 23, 54, 39, 52, 103, 204, 247, 24, 102, 94, 157, 138, 42, 49, 131, 183, 208, 50, 95, 236, 54, 6, 211, 26, 68, 72, 56, 212, 134, 24, 91, 114, 132, 1, 217, 80, 38, 47, 29, 47, 0, 107, 102, 99, 129, 33, 140, 243, 74, 251, 89, 247, 103, 12, 114, 58, 113, 240, 72, 188, 39, 48, 72, 89, 45, 102, 206, 245, 247, 231, 56, 167, 129, 122, 222, 47, 40, 78, 227, 159, 64, 206, 34, 127, 203, 127, 87, 40, 108, 152, 238, 147, 231, 46, 104, 89, 182, 180, 232, 86, 89, 91, 57, 10, 222, 202, 59, 199, 135, 60, 199, 189, 40, 84, 125, 28, 84, 162, 210, 91, 143, 34, 106, 117, 118, 3, 125, 126, 237, 60, 131, 173, 153, 69, 49, 212, 204, 117, 163, 31, 239, 202, 232, 152, 234, 3, 162, 32, 176, 184, 184, 196, 154, 131, 144, 115, 6, 53, 122, 55, 69, 166, 19, 230, 183, 175, 244, 1, 156, 11, 37, 121, 134, 121, 152, 142, 158, 125, 229, 150, 44, 183, 216, 109, 7, 65, 222, 169, 56, 222, 140, 110, 233, 157, 138, 66, 208, 6, 111, 166, 188, 76, 208, 222, 4, 104, 211, 10, 57, 141, 243, 65, 228, 86, 85, 88, 169, 91, 237, 56, 249, 133, 77, 21, 32, 37, 230, 55, 0, 184, 110, 228, 158, 62, 98, 45, 147, 177, 19, 119, 89, 164, 103, 132, 239, 84, 139, 68, 204, 157, 49, 41, 50, 89, 113, 159, 203, 51, 133, 120, 184, 210, 237, 15, 249, 187, 100, 253, 50, 16, 154, 112, 64, 193, 254, 10, 235, 200, 253, 84, 31, 169, 171, 39, 122, 70, 46, 186, 139, 212, 162, 173, 158, 41, 23, 86, 148, 172, 196, 237, 242, 58, 102, 180, 150, 238, 191, 25, 240, 204, 252, 125, 148, 29, 124, 51, 95, 10, 196, 55, 49, 159, 138, 144, 255, 126, 205, 43, 49, 42, 17, 59, 60, 77, 139, 177, 239, 64, 36, 224, 98, 205, 234, 70, 199, 103, 139, 218, 206, 207, 178, 217, 255, 32, 134, 59, 25, 221, 74, 22, 102, 82, 19, 20, 170, 142, 134, 42, 106, 249, 64, 80, 222, 28, 21, 169, 50, 235, 4, 237, 56, 81, 87, 76, 32, 251, 42, 6, 173, 105, 54, 191, 8, 136, 5, 245, 206, 239, 176, 9, 116, 24];
        function ue(e, t, n) {
            var i = e.gl
              , a = 1 / t
              , r = 1 / n
              , o = 5;
            this.program = ne(i, de),
            this.setUniforms = function() {
                i.getUniformLocation(this.program, "u_image");
                var e = i.getUniformLocation(this.program, "u_flipY")
                  , t = i.getUniformLocation(this.program, "u_singleStepOffset")
                  , n = i.getUniformLocation(this.program, "u_denoiseLevel");
                i.uniform2f(t, a, r),
                i.uniform1f(n, o),
                i.uniform1f(e, 1)
            }
            ,
            this.setParameters = function(e) {
                void 0 !== e.denoiseLevel && (o = e.denoiseLevel)
            }
            ,
            this.setSize = function(e, t) {
                a = 1 / e,
                r = 1 / t
            }
        }
        var le = [11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222, 172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210, 20, 131, 156, 190, 100, 112, 230, 97, 199, 225, 96, 74, 99, 94, 248, 222, 162, 213, 95, 122, 158, 212, 233, 42, 22, 37, 217, 115, 36, 152, 30, 123, 116, 104, 212, 109, 129, 41, 220, 77, 213, 97, 124, 45, 4, 219, 197, 171, 40, 18, 149, 104, 20, 4, 248, 102, 64, 9, 50, 217, 124, 131, 180, 188, 159, 170, 63, 1, 84, 130, 150, 117, 14, 212, 118, 67, 165, 97, 207, 242, 251, 15, 30, 187, 188, 77, 79, 122, 67, 101, 252, 109, 244, 82, 37, 191, 227, 35, 114, 87, 57, 71, 99, 218, 155, 54, 101, 239, 138, 197, 13, 226, 228, 176, 157, 158, 87, 98, 55, 251, 79, 150, 64, 138, 200, 135, 40, 132, 135, 207, 146, 252, 222, 57, 58, 111, 151, 225, 78, 59, 36, 210, 70, 29, 121, 160, 210, 31, 109, 67, 167, 194, 177, 236, 91, 108, 164, 229, 130, 211, 59, 66, 93, 18, 107, 226, 54, 210, 51, 8, 77, 217, 19, 73, 187, 33, 30, 59, 9, 135, 162, 49, 5, 11, 225, 111, 119, 11, 247, 218, 129, 115, 83, 205, 170, 21, 4, 69, 210, 133, 134, 245, 109, 15, 177, 9, 81, 81, 203, 105, 42, 158, 12, 255, 151, 165, 230, 205, 5, 92, 196, 251, 211, 187, 27, 214, 43, 186, 91, 233, 85, 192, 229, 15, 71, 38, 220, 20, 38, 101, 44, 78, 7, 60, 251, 186, 75, 103, 108, 53, 166, 220, 186, 208, 194, 120, 207, 230, 159, 248, 22, 32, 142, 124, 96, 157, 222, 60, 191, 65, 145, 6, 239, 125, 151, 147, 50, 58, 130, 207, 110, 131, 223, 231, 137, 238, 28, 182, 216, 167, 198, 191, 37, 67, 76, 1, 144, 232, 218, 79, 72, 28, 65, 101, 43, 216, 64, 253, 16, 173, 179, 123, 140, 27, 233, 245, 199, 230, 36, 181, 102, 114, 247, 162, 18, 34, 20, 212, 25, 171, 24, 28, 143, 80, 94, 40, 167, 34, 209, 61, 117, 130, 1, 198, 196, 7, 21, 252, 180, 255, 92, 128, 119, 9, 48, 156, 138, 136, 151, 143, 23, 44, 52, 3, 40, 197, 228, 31, 123, 67, 163, 140, 32, 54, 204, 187, 149, 80, 19, 255, 82, 120, 195, 12, 110, 65, 56, 212, 143, 22, 78, 44, 234, 72, 140, 29, 118, 103, 18, 36, 7, 122, 50, 37, 139, 47, 142, 243, 25, 208, 88, 237, 126, 50, 103, 127, 19, 183, 29, 169, 29, 1, 55, 23, 100, 32, 129, 239, 243, 160, 61, 178, 197, 117, 199, 45, 57, 26, 165, 135, 92, 218, 59, 0, 197, 54, 13, 96, 40, 141, 212, 221, 131, 103, 46, 22, 228, 191, 167, 73, 20, 86, 62, 11, 147, 217, 116, 205, 203, 110, 134, 249, 51, 6, 123, 23, 86, 231, 157, 8, 144, 83, 126, 115, 118, 35, 96, 36, 229, 36, 220, 228, 143, 71, 45, 223, 129, 48, 236, 5, 145, 202, 188, 208, 184, 70, 241, 104, 255, 188, 181, 146, 210, 206, 144, 53, 77, 101, 120, 38, 8, 245, 80, 230, 165, 160, 183, 83, 202, 79, 127, 57, 214, 126, 242, 150, 208, 40, 239, 148, 35, 163, 201, 97, 74, 70, 214, 181, 63, 240, 147, 33, 253, 149, 140, 77, 197, 82, 126, 189, 231, 7, 196, 212, 80, 14, 151, 24, 57, 144, 243, 81, 234, 66, 24, 19, 236, 2, 137, 121, 246, 129, 65, 7, 99, 110, 174, 54, 74, 182, 81, 234, 142, 37, 72, 110, 220, 255, 64, 119, 10, 188, 111, 191, 228, 1, 205, 9, 204, 143, 56, 62, 125, 84, 106, 225, 131, 97, 192, 43, 240, 157, 161, 75, 168, 247, 44, 175, 65, 81, 192, 48, 21, 157, 167, 80, 191, 130, 161, 75, 85, 186, 174, 42, 117, 1, 68, 252, 204, 138, 254, 203, 152, 21, 13, 64, 144, 195, 207, 238, 229, 54, 103, 247, 159, 245, 211, 85, 191, 141, 168, 32, 234, 85, 46, 118, 12, 5, 199, 4, 19, 217, 203, 202, 156, 33, 143, 114, 116, 60, 66, 40, 58, 77, 208, 237, 171, 26, 72, 175, 114, 205, 248, 87, 137, 62, 210, 143, 151, 197, 167, 210, 241, 122, 150, 104, 122, 154, 2, 70, 102, 83, 19, 36, 141, 136, 199, 42, 79, 229, 71, 86, 194, 109, 31, 236, 80, 166, 17, 230, 109, 1, 40, 28, 46, 224, 56, 20, 230, 47, 100, 254, 116, 208, 76, 169, 157, 241, 175, 3, 70, 85, 31, 38, 245, 58, 33, 80, 145, 237, 8, 22, 71, 224, 158, 156, 31, 249, 81, 87, 247, 230, 199, 237, 96, 167, 123, 63, 243, 79, 156, 206, 203, 160, 54, 124, 68, 253, 215, 132, 235, 57, 185, 92, 238, 55, 59, 210, 104, 71, 26, 183, 180, 71, 12, 255, 224, 192, 65, 154, 72, 244, 8, 164, 10, 248, 46, 207, 30, 92, 1, 80, 244, 31, 189, 138, 88, 216, 218, 63, 100, 227, 116, 57, 119, 94, 135, 5, 126, 255, 32, 191, 163, 61, 209, 194, 88, 248, 112, 139, 173, 43, 69, 134, 3, 160, 151, 137, 25, 98, 239, 166, 19, 123, 208, 180, 31, 120, 30, 191, 75, 183, 179, 126, 180, 125, 92, 107, 105, 206, 138, 28, 67, 139, 3, 188, 230, 184, 255, 121, 13, 181, 45, 160, 114, 202, 194, 123, 87, 55, 124, 97, 164, 82, 95, 232, 216, 117, 62, 5, 90, 176, 82, 167, 52, 160, 153, 174, 168, 105, 146, 91, 248, 81, 79, 249, 97, 138, 133, 170, 245, 229, 132, 61, 5, 149, 224, 246, 194, 213, 61, 12, 109, 44, 136, 235, 95, 219, 133, 220, 27, 93, 36, 93, 124, 180, 81, 141, 152, 220, 170, 163, 229, 197, 124, 171, 232, 48, 70, 251, 106, 119, 150, 20, 16, 49, 119, 247, 42, 132, 36, 76, 254, 124, 177, 66, 175, 9, 1, 39, 92, 127, 195, 171, 198, 34, 2, 64, 144, 179, 72, 40, 151, 110, 89, 229, 42, 125, 33, 238, 16, 220, 228, 51, 203, 8, 1, 68, 145, 253, 133, 118, 93, 163, 129, 22, 13, 248, 65, 12, 4, 63, 101, 210, 70, 170, 138, 203, 14, 246, 54, 194, 195, 27, 107, 241, 175, 35, 171, 49, 52, 106, 121, 45, 36, 152, 85, 215, 132, 78, 167, 34, 18, 167, 245, 152, 133, 134, 170, 120, 182, 10, 146, 191, 37, 2, 205, 47, 125, 20, 203, 44, 88, 81, 32, 150, 223, 220, 218, 238, 254, 30, 212, 167, 221, 115, 156, 82, 226, 137, 220, 221, 97, 3, 139, 202, 33, 9, 27, 26, 126, 40, 215, 25, 126, 9, 82, 208, 49, 217, 14, 161, 81, 196, 61, 60, 87, 254, 213, 194, 81, 216, 161, 151, 209, 166, 222, 230, 24, 128, 117, 140, 92, 4, 203, 254, 170, 253, 249, 88, 90, 112, 226, 18, 44, 122, 39, 158, 158, 56, 69, 204, 159, 5, 179, 51, 197, 233, 139, 216, 102, 226, 206, 248, 15, 78, 112, 214, 126, 67, 28, 40, 38, 98, 190, 178, 206, 67, 94, 245, 254, 160, 101, 176, 32, 157, 26, 132, 83, 252, 228, 87, 242, 32, 127, 160, 112, 210, 224, 133, 149, 115, 41, 30, 16, 200, 69, 89, 81, 77, 144, 12, 106, 182, 73, 54, 28, 53, 195, 28, 216, 179, 179, 136, 35, 141, 102, 234, 177, 240, 34, 186, 106, 145, 245, 3, 84, 48, 251, 157, 245, 11, 217, 111, 227, 138, 42, 67, 114, 211, 177, 37, 103, 16, 71, 152, 72, 117, 123, 36, 213, 202, 56, 124, 227, 84, 8, 45, 229, 149, 165, 214, 69, 244, 169, 55, 68, 62, 94, 104, 228, 74, 205, 123, 222, 17, 7, 172, 158, 227, 74, 206, 149, 67, 175, 171, 251, 185, 121, 151, 223, 63, 35, 229, 32, 49, 190, 209, 120, 137, 69, 213, 214, 19, 150, 187, 177, 28, 12, 158, 153, 126, 149, 171, 167, 234, 120, 129, 109, 32, 157, 180, 75, 66, 56, 233, 115, 127, 230, 157, 32, 34, 143, 156, 31, 230, 168, 174, 125, 118, 195, 249, 243, 165, 81, 246, 10, 144, 15, 103, 139, 55, 173, 7, 59, 136, 69, 172, 54, 132, 165, 140, 78, 77, 230, 33, 169, 129, 188, 71, 209, 109, 161, 8, 57, 57, 199, 143, 31, 164, 43, 58, 130, 1, 110, 145, 31, 229, 13, 46, 149, 94, 244, 106, 76, 238, 105, 107, 1, 183, 177, 10, 61, 225, 94, 185, 116, 58, 183, 95, 225, 22, 119, 19, 248, 28, 13, 123, 125, 108, 158, 64, 184, 77, 245, 153, 162, 217, 227, 208, 41, 185, 211, 235, 41, 153, 181, 54, 166, 165, 11, 154, 55, 21, 184, 209, 192, 249, 44, 164, 160, 29, 229, 159, 82, 156, 198, 241, 183, 114, 83, 137, 186, 151, 148, 31, 21, 197, 216, 145, 32, 13, 50, 22, 241, 137, 39, 71, 28, 142, 160, 215, 107, 221, 45, 202, 104, 227, 110, 186, 12, 150, 145, 240, 51, 49, 44, 196, 115, 224, 238, 149, 189, 134, 99, 67, 241, 62, 157, 240, 114, 247, 195, 26, 200, 141, 97, 147, 249, 23, 150, 174, 10, 13, 219, 81, 73, 58, 242, 96, 250, 243, 15, 49, 218, 58, 230, 104, 252, 175, 150, 123, 86, 185, 84, 90, 198, 6, 36, 0, 99, 72, 28, 166, 238, 115, 231, 171, 249, 179, 71, 174, 68, 156, 227, 17, 198, 79, 73, 142, 99, 144, 20, 80, 62, 80, 191, 142, 46, 71, 9, 243, 6, 8, 214, 116, 72, 190, 106, 161, 19, 185, 100, 9, 187, 64, 94, 86, 203, 174, 156, 245, 222, 95, 54, 30, 148, 19, 11, 50, 112, 96, 61, 237, 159, 173, 7, 154, 127, 175, 79, 48, 97, 89, 78, 126, 66, 171, 204, 158, 195, 27, 226, 205, 222, 157, 89, 251, 90, 125, 37, 212, 27, 97, 3, 141, 247, 175, 50, 121, 7, 187, 68, 196, 181, 202, 167, 189, 57, 84, 81, 222, 23, 27, 84, 130, 176, 98, 66, 240, 207, 18, 23, 28, 163, 163, 194, 45, 37, 129, 202, 170, 97, 189, 0, 81, 238, 0, 39, 199, 163, 35, 211, 206, 247, 65, 29, 116, 242, 67, 102, 235, 13, 136, 232, 230, 114, 146, 187, 7, 254, 142, 26, 121, 16, 237, 5, 160, 201, 114, 94, 178, 199, 95, 212, 241, 45, 112, 180, 188, 72, 86, 114, 189, 155, 149, 149, 163, 210, 112, 101, 12, 69, 225, 75, 202, 223, 28, 242, 90, 215, 156, 169, 224, 245, 135, 128, 92, 148, 217, 131, 208, 255, 25, 135, 117, 136, 5, 104, 185, 249, 161, 228, 214, 16, 105, 204, 9, 182, 135, 153, 220, 101, 244, 160, 207, 58, 182, 118, 185, 240, 57, 245, 123, 13, 112, 182, 106, 229, 220, 90, 29, 86, 215, 96, 147, 232, 2, 55, 131, 225, 137, 68, 245, 89, 141, 252, 97, 3, 129, 155, 216, 223, 98, 116, 45, 78, 85, 141, 161, 74, 215, 7, 150, 171, 225, 59, 78, 221, 152, 236, 14, 117, 100, 208, 158, 86, 13, 185, 124, 87, 157, 111, 40, 187, 182, 124, 173, 71, 173, 23, 199, 52, 155, 190, 134, 11, 23, 64, 25, 215, 39, 115, 231, 173, 77, 72, 114, 54, 252, 116, 178, 59, 221, 106, 241, 119, 254, 30, 226, 241, 204, 233, 113, 197, 96, 146, 0, 41, 67, 3, 231, 126, 12, 218, 202, 22, 171, 114, 249, 176, 134, 160, 19, 216, 31, 229, 118, 226, 62, 242, 126, 126, 42, 127, 130, 68, 218, 218, 81, 202, 106, 217, 191, 25, 177, 82, 97, 81, 36, 232, 137, 58, 90, 216, 190, 117, 235, 20, 194, 144, 76, 178, 27, 213, 13, 208, 18, 29, 118, 126, 49, 98, 203, 179, 128, 237, 100, 32, 242, 189, 212, 6, 210, 210, 188, 161, 205, 13, 124, 119, 13, 215, 112, 41, 183, 176, 215, 168, 210, 182, 111, 1, 115, 2, 239, 141, 8, 177, 124, 112, 48, 197, 2, 239, 11, 99, 4, 36, 77, 69, 47, 244, 19, 153, 61, 19, 2, 96, 176, 7, 112, 122, 131, 169, 25, 189, 116, 171, 49, 12, 121, 162, 79, 154, 74, 251, 50, 233, 182, 63, 180, 224, 118, 49, 253, 21, 20, 16, 31, 144, 184, 93, 174, 231, 244, 183, 13, 49, 225, 189, 211, 73, 185, 49, 110, 142, 25, 226, 45, 176, 233, 204, 74, 33, 16, 205, 88, 131, 92, 157, 170, 175, 68, 170, 61, 53, 116, 165, 16, 27, 182, 160, 181, 87, 241, 15, 151, 85, 107, 76, 167, 129, 25, 172, 127, 184, 138, 153, 222, 228, 125, 64, 44, 45, 32, 12, 227, 148, 106, 152, 83, 240, 166, 54, 235, 32, 190, 12, 242, 164, 123, 189, 53, 194, 141, 104, 43, 202, 110, 4, 168, 119, 245, 232, 179, 178, 198, 1, 224, 87, 86, 160, 31, 19, 140, 233, 102, 191, 204, 4, 98, 138, 163, 191, 106, 24, 213, 47, 208, 82, 137, 132, 131, 16, 253, 84, 25, 144, 90, 159, 148, 16, 196, 84, 166, 61, 160, 101, 229, 227, 93, 118, 59, 87, 66, 16, 128, 59, 96, 131, 250, 20, 184, 150, 205, 91, 227, 201, 62, 35, 79, 180, 172, 173, 85, 197, 106, 153, 238, 229, 60, 204, 65, 193, 230, 94, 101, 177, 134, 6, 165, 53, 171, 142, 208, 155, 2, 11, 4, 202, 127, 54, 17, 142, 117, 227, 121, 128, 204, 192, 147, 147, 92, 189, 5, 224, 148, 72, 18, 83, 101, 126, 124, 228, 153, 242, 123, 229, 247, 92, 221, 6, 73, 227, 250, 87, 167, 194, 129, 187, 73, 38, 185, 109, 217, 240, 193, 88, 50, 178, 180, 151, 54, 197, 187, 137, 190, 166, 233, 1, 103, 204, 88, 31, 127, 185, 29, 65, 1, 29, 254, 223, 14, 83, 167, 215, 114, 248, 30, 173, 89, 173, 187, 69, 5, 105, 117, 15, 106, 94, 173, 63, 227, 25, 230, 190, 136, 168, 177, 175, 107, 91, 126, 254, 34, 188, 25, 118, 48, 12, 226, 130, 153, 162, 57, 47, 181, 212, 79, 160, 97, 64, 157, 246, 90, 53, 43, 149, 76, 102, 15, 195, 107, 58, 242, 84, 172, 29, 81, 198, 113, 81, 251, 138, 182, 154, 111, 30, 171, 129, 56, 17, 45, 214, 153, 112, 117, 203, 174, 40, 38, 234, 236, 32, 4, 112, 225, 26, 187, 195, 246, 252, 9, 218, 69, 160, 223, 178, 54, 148, 81, 8, 134, 151, 75, 248, 63, 224, 240, 48, 75, 250, 221, 85, 46, 100, 50, 3, 70, 64, 102, 111, 160, 155, 233, 59, 147, 184, 57, 61, 6, 126, 79, 176, 16, 185, 94, 166, 33, 135, 78, 42, 75, 140, 208, 140, 44, 153, 187, 64, 103, 119, 160, 236, 16, 239, 74, 218, 219, 212, 207, 110, 53, 30, 76, 248, 40, 111, 98, 44, 20, 113, 204, 233, 109, 135, 96, 107, 39, 163, 203, 125, 45, 157, 152, 71, 239, 175, 174, 159, 147, 80, 111, 93, 38, 253, 228, 154, 225, 181, 101, 12, 241, 127, 65, 49, 189, 5, 85, 151, 237, 213, 143, 14, 104, 138, 54, 52, 27, 4, 132, 67, 35, 156, 86, 157, 73, 16, 229, 222, 245, 110, 79, 165, 179, 56, 179, 53, 218, 229, 100, 58, 87, 149, 48, 231, 64, 63, 115, 67, 3, 172, 6, 186, 115, 154, 60, 53, 214, 152, 149, 89, 234, 37, 143, 82, 255, 64, 28, 183, 93, 112, 39, 70, 185, 57, 0, 199, 9, 61, 175, 219, 41, 76, 37, 176, 82, 125, 65, 53, 160, 214, 105, 62, 153, 244, 222, 96, 205, 6, 178, 85, 41, 240, 113, 0, 96, 149, 38, 3, 195, 18, 152, 41, 246, 3, 103, 29, 110, 134, 30, 101, 75, 46, 103, 199, 184, 20, 230, 8, 55, 120, 4, 229, 168, 35, 43, 7, 28, 161, 143, 87, 27, 87, 79, 255, 186, 44, 195, 158, 155, 181, 119, 81, 172, 217, 107, 95, 98, 55, 243, 186, 66, 105, 48, 224, 123, 232, 84, 156, 20, 10, 156, 208, 204, 52, 34, 228, 136, 97, 242, 200, 246, 211, 67, 202, 40, 241, 91, 92, 253, 9, 54, 72, 131, 221, 106, 178, 32, 44, 182, 4, 225, 193, 37, 20, 249, 249, 231, 10, 206, 18, 71, 254, 221, 187, 172, 88, 204, 6, 127, 138, 102, 7, 208, 75, 147, 219, 199, 177, 79, 36, 170, 101, 207, 177, 109, 95, 143, 217, 41, 199, 80, 183, 201, 2, 254, 12, 55, 23, 198, 14, 255, 69, 245, 138, 155, 129, 227, 167, 168, 130, 156, 135, 14, 96, 93, 48, 99, 143, 107, 126, 92, 117, 143, 112, 108, 193, 228, 84, 13, 41, 186, 27, 172, 92, 201, 149, 116, 19, 112, 197, 116, 209, 128, 102, 1, 55, 152, 177, 28, 37, 34, 50, 83, 41, 199, 74, 178, 59, 111, 67, 118, 35, 252, 36, 33, 87, 28, 170, 17, 215, 47, 90, 154, 124, 137, 15, 14, 211, 59, 75, 59, 30, 77, 0, 49, 37, 225, 191, 87, 101, 127, 214, 227, 160, 99, 174, 234, 82, 148, 235, 16, 241, 219, 147, 170, 127, 221, 250, 116, 39, 218, 156, 72, 227, 172, 55, 0, 79, 188, 76, 51, 222, 232, 24, 36, 62, 94, 154, 3, 61, 230, 146, 114, 253, 0, 128, 58, 253, 90, 72, 211, 242, 38, 39, 133, 153, 161, 119, 105, 195, 152, 225, 208, 105, 140, 80, 217, 186, 196, 157, 21, 116, 230, 116, 139, 25, 159, 143, 118, 128, 77, 201, 238, 247, 228, 15, 168, 4, 133, 148, 21, 148, 12, 44, 241, 7, 115, 17, 129, 176, 202, 46, 130, 122, 129, 235, 141, 223, 85, 21, 199, 65, 181, 169, 52, 174, 161, 153, 62, 25, 164, 115, 213, 89, 138, 199, 103, 79, 200, 165, 135, 249, 244, 27, 209, 178, 240, 129, 211, 61, 9, 111, 157, 147, 119, 36, 119, 255, 110, 130, 84, 49, 210, 225, 247, 100, 26, 121, 127, 163, 160, 26, 79, 99, 24, 77, 65, 32, 178, 109, 36, 27, 253, 173, 110, 183, 11, 14, 211, 57, 130, 254, 124, 104, 165, 219, 31, 70, 97, 14, 194, 39, 61, 26, 141, 125, 228, 126, 194, 184, 101, 160, 204, 106, 128, 144, 106, 103, 171, 18, 246, 129, 220, 85, 172, 151, 123, 5, 73, 155, 192, 175, 91, 157, 239, 61, 237, 116, 170, 65, 233, 56, 19, 49, 114, 168, 190, 3, 214, 53, 250, 90, 213, 244, 88, 101, 30, 229, 248, 124, 15, 71, 141, 27, 172, 235, 21, 129, 211, 72, 61, 172, 112, 170, 128, 135, 96, 196, 221, 255, 27, 176, 105, 188, 183, 121, 33, 37, 149, 53, 131, 226, 233, 29, 167, 234, 218, 109, 53, 185, 152, 36, 248, 53, 61, 235, 78, 21, 201, 214, 210, 163, 12, 251, 187, 45, 188, 137, 126, 127, 237, 92, 234, 91, 240, 225, 38, 194, 57, 213, 251, 237, 171, 30, 99, 52, 14, 49, 84, 101, 252, 237, 7, 166, 122, 114, 32, 107, 32, 207, 239, 136, 168, 178, 12, 11, 241, 233, 230, 146, 132, 18, 83, 233, 41, 172, 17, 6, 161, 42, 113, 87, 40, 255, 185, 1, 146, 128, 5, 240, 126, 131, 71, 42, 54, 124, 205, 2, 122, 71, 30, 222, 229, 40, 134, 142, 102, 97, 239, 151, 177, 1, 230, 231, 49, 123, 219, 28, 129, 91, 152, 112, 13, 154, 81, 197, 226, 255, 112, 158, 178, 177, 55, 181, 108, 138, 185, 245, 29, 186, 21, 73, 188, 209, 154, 200, 89, 116, 235, 198, 144, 36, 87, 248, 22, 7, 200, 122, 7, 148, 44, 42, 87, 140, 238, 204, 95, 231, 252, 0, 136, 0, 22, 39, 70, 123, 125, 165, 113, 227, 172, 146, 163, 128, 158, 36, 52, 91, 19, 36, 245, 27, 150, 138, 141, 11, 67, 239, 224, 65, 24, 116, 101, 7, 39, 46, 142, 172, 164, 243, 148, 0, 33, 226, 59, 47, 203, 137, 156, 241, 66, 250, 157, 30, 204, 101, 143, 134, 98, 238, 155, 226, 25, 184, 136, 219, 89, 100, 193, 11, 143, 71, 139, 243, 230, 151, 0, 249, 1, 78, 26, 32, 93, 104, 157, 67, 97, 164, 248, 86, 124, 146, 93, 74, 222, 228, 167, 55, 53, 100, 135, 216, 109, 13, 64, 37, 106, 177, 200, 200, 182, 92, 251, 69, 31, 243, 89, 80, 198, 14, 132, 203, 72, 103, 28, 104, 217, 24, 97, 223, 113, 11, 29, 178, 191, 210, 46, 162, 255, 68, 99, 8, 237, 213, 162, 152, 193, 183, 121, 203, 19, 108, 182, 29, 86, 26, 192, 103, 220, 103, 205, 154, 179, 197, 9, 22, 73, 127, 175, 146, 38, 119, 210, 0, 24, 180, 21, 245, 215, 204, 91, 186, 119, 138, 183, 239, 15, 155, 231, 248, 133, 39, 24, 101, 144, 236, 10, 230, 54, 174, 227, 73, 21, 110, 10, 160, 241, 232, 131, 14, 212, 127, 232, 59, 122, 65, 146, 54, 163, 9, 189, 190, 121, 88, 170, 62, 194, 14, 204, 152, 245, 38, 131, 37, 91, 81, 72, 114, 29, 115, 239, 182, 56, 44, 156, 159, 177, 180, 82, 160, 93, 97, 86, 183, 236, 50, 95, 85, 39, 71, 181, 225, 152, 143, 63, 123, 117, 34, 44, 109, 160, 166, 229, 240, 91, 138, 102, 54, 180, 173, 44, 50, 80, 42, 124, 7, 50, 124, 211, 239, 21, 94, 197, 185, 239, 213, 107, 142, 64, 95, 124, 125, 17, 180, 97, 189, 101, 52, 48, 19, 112, 12, 70, 9, 212, 177, 54, 118, 66, 84, 147, 236, 248, 26, 124, 95, 103, 135, 254, 124, 49, 112, 186, 99, 120, 90, 8, 194, 191, 88, 57, 242, 65, 61, 10, 104, 246, 197, 252, 19, 159, 58, 194, 75, 173, 242, 103, 8, 115, 84, 69, 238, 149, 26, 15, 159, 182, 141, 132, 119, 70, 29, 53, 20, 143, 46, 163, 204, 6, 236, 59, 45, 185, 172, 89, 119, 83, 38, 144, 36, 222, 96, 151, 26, 99, 195, 163, 170, 133, 92, 159, 214, 53, 150, 116, 90, 176, 69, 145, 130, 15, 172, 140, 217, 215, 101, 163, 115, 161, 65, 101, 8, 7, 183, 113, 213, 134, 58, 175, 130, 251, 143, 173, 248, 168, 135, 60, 159, 30, 194, 68, 208, 119, 120, 2, 40, 178, 227, 247, 161, 77, 47, 136, 46, 244, 163, 72, 65, 158, 25, 225, 195, 61, 132, 182, 204, 177, 186, 200, 81, 2, 65, 105, 212, 72, 94, 203, 232, 217, 182, 123, 251, 228, 160, 1, 161, 204, 123, 20, 37, 1, 77, 208, 179, 45, 149, 181, 122, 102, 190, 123, 213, 164, 231, 41, 216, 130, 234, 248, 208, 251, 252, 220, 84, 209, 67, 47, 61, 220, 5, 142, 162, 26, 236, 121, 142, 248, 132, 255, 65, 122, 203, 196, 102, 191, 187, 2, 195, 127, 255, 193, 92, 49, 91, 186, 154, 39, 156, 29, 211, 172, 49, 104, 245, 114, 153, 223, 211, 199, 249, 35, 130, 160, 128, 0, 152, 176, 183, 20, 236, 113, 193, 108, 26, 255, 11, 237, 102, 133, 245, 94, 115, 114, 10, 89, 229, 214, 221, 99, 149, 30, 99, 37, 246, 10, 26, 26, 39, 92, 123, 170, 73, 211, 127, 227, 54, 30, 86, 133, 159, 112, 225, 91, 148, 100, 174, 149, 75, 143, 14, 140, 20, 44, 64, 212, 5, 243, 8, 116, 63, 30, 97, 42, 123, 20, 73, 212, 85, 207, 83, 122, 27, 251, 233, 84, 10, 17, 236, 232, 83, 200, 127, 119, 143, 163, 204, 220, 167, 59, 231, 20, 106, 186, 222, 191, 8, 40, 234, 21, 25, 180, 13, 116, 250, 152, 224, 174, 75, 3, 205, 38, 173, 215, 236, 151, 185, 121, 254, 244, 154, 239, 17, 53, 106, 164, 61, 49, 116, 216, 118, 94, 150, 35, 181, 26, 238, 66, 49, 211, 221, 132, 146, 166, 115, 39, 136, 36, 205, 230, 179, 31, 197, 51, 148, 165, 109, 38, 70, 37, 148, 52, 44, 209, 250, 98, 58, 246, 225, 103, 198, 101, 26, 25, 196, 207, 8, 166, 21, 88, 252, 175, 253, 10, 88, 107, 157, 19, 225, 61, 12, 246, 221, 37, 239, 186, 167, 137, 142, 135, 222, 128, 174, 62, 95, 216, 38, 141, 157, 45, 232, 97, 217, 173, 203, 234, 116, 129, 69, 206, 189, 94, 221, 12, 54, 139, 186, 247, 184, 16, 200, 121, 244, 104, 8, 7, 35, 111, 47, 188, 10, 140, 92, 73, 143, 206, 203, 72, 122, 184, 20, 102, 197, 130, 64, 150, 63, 96, 239, 8, 132, 111, 217, 84, 91, 198, 32, 43, 100, 138, 241, 15, 160, 42, 190, 253, 193, 184, 164, 124, 29, 210, 96, 67, 224, 221, 182, 29, 218, 129, 149, 29, 128, 174, 98, 88, 88, 125, 56, 40, 255, 120, 5, 0, 87, 174, 42, 150, 90, 112, 201, 183, 169, 19, 57, 195, 191, 12, 58, 244, 235, 132, 25, 145, 72, 146, 214, 8, 125, 100, 135, 12, 5, 102, 97, 248, 174, 24, 159, 90, 33, 43, 187, 6, 61, 212, 241, 225, 190, 219, 252, 197, 123, 129, 164, 108, 123, 55, 230, 4, 153, 166, 105, 234, 15, 85, 216, 23, 56, 32, 3, 41, 110, 68, 146, 172, 133, 202, 98, 41, 7, 47, 152, 35, 255, 168, 106, 241, 226, 222, 77, 244, 52, 185, 65, 252, 227, 32, 66, 38, 11, 172, 60, 28, 28, 103, 84, 1, 1, 205, 182, 190, 28, 189, 102, 253, 43, 1, 191, 148, 116, 10, 227, 18, 81, 93, 80, 239, 157, 232, 215, 180, 163, 165, 161, 109, 177, 71, 150, 244, 144, 208, 160, 110, 22, 174, 60, 206, 43, 103, 121, 55, 103, 114, 115, 173, 238, 13, 10, 227, 251, 41, 176, 216, 158, 229, 216, 55, 234, 128, 128, 20, 167, 106, 181, 86, 163, 130, 215, 110, 149, 191, 10, 227, 215, 8, 214, 154, 178, 181, 15, 19, 0, 247, 250, 97, 74, 43, 157, 55, 94, 174, 41, 41, 9, 199, 97, 20, 91, 32, 18, 10, 43, 98, 240, 247, 203, 20, 250, 117, 160, 44, 229, 202, 187, 64, 54, 124, 15, 184, 169, 129, 27, 160, 240, 26, 61, 255, 60, 166, 60, 144, 209, 84, 55, 187, 186, 168, 13, 124, 125, 29, 17, 100, 249, 227, 62, 205, 78, 179, 163, 168, 139, 168, 21, 38, 83, 239, 151, 74, 43, 66, 2, 92, 72, 71, 94, 216, 134, 238, 20, 45, 158, 213, 164, 73, 57, 80, 47, 198, 184, 130, 223, 227, 71, 132, 133, 235, 177, 85, 174, 142, 124, 172, 200, 54, 229, 40, 126, 60, 76, 92, 216, 153, 56, 241, 174, 66, 141, 90, 226, 3, 30, 68, 234, 71, 187, 163, 112, 146, 255, 22, 143, 170, 204, 3, 127, 179, 81, 139, 160, 37, 77, 246, 128, 220, 196, 158, 153, 73, 177, 65, 199, 119, 29, 197, 144, 130, 248, 206, 155, 253, 108, 213, 124, 7, 223, 221, 162, 146, 134, 242, 65, 99, 162, 107, 120, 247, 214, 207, 96, 150, 169, 131, 208, 218, 221, 28, 24, 112, 208, 23, 1, 130, 142, 232, 56, 104, 45, 33, 158, 95, 255, 123, 31, 74, 76, 120, 178, 155, 213, 6, 195, 164, 8, 8, 69, 241, 197, 127, 83, 169, 21, 167, 19, 94, 143, 252, 33, 159, 248, 241, 170, 153, 147, 1, 149, 199, 201, 131, 170, 79, 236, 212, 209, 143, 107, 98, 24, 123, 56, 33, 193, 85, 247, 64, 225, 135, 210, 78, 145, 57, 16, 145, 71, 170, 20, 133, 87, 235, 4, 166, 239, 100, 82, 235, 81, 50, 223, 9, 193, 52, 49, 86, 129, 190, 196, 82, 165, 107, 63, 115, 161, 98, 33, 20, 193, 29, 42, 151, 205, 252, 124, 72, 245, 48, 181, 67, 7, 13, 21, 127, 59, 226, 188, 144, 129, 112, 244, 192, 121, 213, 80, 42, 196, 1, 13, 107, 108, 78, 0, 40, 121, 225, 148, 237, 234, 209, 216, 238, 9, 147, 226, 254, 96, 89, 212, 72, 193, 106, 75, 135, 74, 227, 67, 255, 92, 191, 81, 188, 124, 226, 149, 152, 142, 15, 159, 195, 238, 114, 55, 255, 166, 157, 230, 59, 148, 170, 166, 151, 65, 213, 104, 253, 253, 112, 150, 82, 147, 137, 27, 214, 100, 247, 65, 81, 92, 47, 86, 217, 7, 45, 120, 81, 130, 31, 236, 243, 76, 78, 3, 45, 105, 172, 220, 71, 48, 220, 94, 196, 249, 163, 193, 133, 50, 236, 205, 20, 55, 2, 63, 14, 127, 69, 113, 212, 204, 12, 58, 79, 89, 86, 29, 61, 199, 201, 64, 149, 6, 144, 182, 150, 129, 31, 18, 167, 120, 248, 82, 107, 25, 143, 128, 27, 161, 28, 25, 153, 183, 217, 238, 78, 186, 106, 92, 27, 202, 219, 165, 96, 0, 216, 234, 169, 73, 101, 39, 182, 113, 217, 240, 170, 116, 172, 221, 250, 233, 48, 49, 242, 83, 227, 92, 181, 184, 72, 230, 180, 21, 15, 108, 135, 25, 38, 153, 25, 124, 227, 26, 149, 73, 236, 39, 211, 244, 149, 58, 183, 132, 26, 223, 219, 174, 144, 117, 233, 219, 165, 205, 157, 159, 222, 184, 52, 47, 241, 201, 123, 65, 24, 44, 55, 215, 177, 168, 250, 179, 115, 190, 227, 123, 158, 163, 179, 224, 69, 196, 66, 207, 254, 243, 101, 221, 193, 140, 250, 4, 28, 222, 52, 96, 138, 160, 33, 218, 64, 118, 214, 234, 201, 152, 148, 91, 178, 111, 107, 144, 142, 6, 182, 102, 72, 188, 34, 213, 181, 26, 223, 58, 255, 103, 81, 17, 47, 169, 11, 245, 224, 123, 148, 215, 237, 186, 107, 75, 152, 90, 202, 166, 22, 149, 197, 5, 246, 238, 78, 76, 229, 106, 199, 94, 127, 195, 0, 45, 82, 6, 159, 103, 96, 138, 231, 71, 46, 107, 59, 216, 39, 43, 12, 221, 27, 214, 56, 155, 145, 66, 187, 169, 250, 235, 78, 211, 179, 239, 183, 198, 163, 93, 5, 196, 24, 174, 143, 225, 106, 139, 89, 98, 13, 127, 207, 184, 194, 30, 1, 165, 198, 169, 8, 197, 118, 86, 163, 221, 138, 23, 209, 61, 116, 79, 99, 233, 43, 130, 60, 244, 85, 229, 243, 172, 123, 148, 200, 120, 192, 127, 211, 52, 11, 159, 41, 95, 212, 230, 188, 169, 156, 137, 29, 212, 12, 148, 168, 148, 133, 243, 44, 241, 139, 127, 24, 246, 220, 227, 125, 209, 97, 60, 52, 162, 192, 146, 49, 161, 92, 138, 112, 189, 128, 59, 126, 125, 46, 207, 60, 79, 231, 174, 152, 209, 68, 223, 205, 2, 38, 14, 91, 116, 159, 255, 28, 27, 178, 248, 164, 104, 158, 79, 69, 214, 234, 157, 12, 75, 163, 83, 253, 245, 202, 61, 213, 176, 6, 197, 230, 29, 208, 166, 253, 194, 254, 235, 29, 141, 241, 70, 249, 15, 62, 0, 148, 163, 135, 52, 122, 40, 96, 87, 31, 179, 152, 51, 216, 133, 184, 122, 198, 203, 60, 115, 218, 191, 193, 16, 178, 25, 148, 252, 112, 104, 103, 252, 36, 92, 221, 28, 179, 43, 199, 198, 151, 128, 100, 252, 217, 161, 249, 34, 201, 172, 118, 52, 180, 252, 104, 7, 223, 44, 116, 102, 212, 21, 40, 224, 184, 55, 163, 210, 21, 207, 161, 239, 51, 54, 155, 41, 133, 18, 67, 48, 3, 165, 130, 251, 4, 79, 214, 57, 72, 130, 157, 212, 144];
        function fe(e, t, n) {
            var i = e.gl
              , a = 5
              , r = .1
              , o = .5
              , s = 175 / 180 * 3.141593
              , c = 115 / 180 * 3.141593
              , d = 173 / 180 * 3.141593
              , u = 116 / 180 * 3.141593
              , l = 2.04203545
              , f = 0
              , p = 0
              , g = 0
              , m = []
              , v = [0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 29, 31, 34, 36, 39, 41, 44, 46, 49, 51, 54, 56, 59, 61, 64, 65, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89, 90, 91, 92, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 109, 110, 111, 112, 113, 114, 116, 117, 118, 119, 120, 121, 123, 124, 125, 126, 127, 128, 129, 131, 132, 133, 134, 135, 136, 138, 139, 140, 141, 142, 143, 145, 146, 147, 148, 149, 150, 151, 153, 154, 155, 156, 157, 158, 160, 161, 162, 163, 164, 165, 166, 168, 169, 170, 171, 172, 173, 175, 176, 177, 178, 179, 180, 182, 183, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 195, 197, 198, 199, 200, 201, 202, 204, 205, 206, 207, 208, 209, 210, 212, 213, 214, 215, 216, 217, 219, 220, 221, 222, 223, 224, 226, 226, 226, 227, 227, 227, 228, 228, 228, 229, 229, 229, 230, 230, 231, 231, 231, 232, 232, 232, 233, 233, 233, 234, 234, 235, 235, 235, 236, 236, 236, 237, 237, 237, 238, 238, 239, 239, 239, 240, 240, 240, 241, 241, 241, 242, 242, 243, 243, 243, 244, 244, 244, 245, 245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248, 249, 249, 249, 250, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 255]
              , S = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 39, 40, 42, 43, 44, 46, 47, 49, 50, 51, 53, 54, 56, 57, 58, 59, 61, 62, 63, 64, 66, 67, 68, 69, 71, 72, 73, 74, 76, 77, 78, 79, 81, 82, 83, 84, 86, 87, 88, 90, 91, 92, 93, 95, 96, 97, 98, 100, 101, 102, 103, 105, 106, 107, 108, 110, 111, 112, 113, 115, 116, 117, 118, 120, 121, 122, 124, 125, 126, 127, 129, 130, 131, 132, 134, 135, 136, 137, 139, 140, 141, 142, 144, 145, 146, 147, 149, 150, 151, 152, 154, 155, 156, 158, 159, 160, 161, 163, 164, 165, 166, 168, 169, 170, 171, 173, 174, 175, 176, 178, 179, 180, 181, 183, 184, 185, 186, 188, 189, 190, 192, 193, 194, 195, 197, 198, 199, 200, 202, 203, 204, 205, 207, 208, 209, 210, 212, 213, 214, 215, 217, 218, 219, 220, 222, 223, 224, 226, 226, 226, 227, 227, 228, 228, 229, 229, 230, 230, 231, 231, 232, 232, 233, 233, 234, 234, 234, 235, 235, 236, 236, 237, 237, 238, 238, 239, 239, 240, 240, 241, 241, 242, 242, 243, 243, 243, 244, 244, 244, 245, 245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248, 249, 249, 249, 250, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 255]
              , h = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62, 63, 65, 66, 67, 68, 69, 70, 72, 73, 74, 76, 77, 78, 80, 81, 83, 84, 85, 87, 88, 89, 91, 92, 94, 95, 96, 98, 99, 100, 102, 103, 105, 106, 107, 109, 110, 111, 113, 114, 116, 117, 118, 120, 121, 122, 124, 125, 127, 128, 129, 131, 132, 133, 135, 136, 138, 139, 140, 142, 143, 144, 146, 147, 149, 150, 151, 153, 154, 155, 157, 158, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 192, 193, 193, 194, 195, 195, 196, 197, 197, 198, 199, 199, 200, 201, 201, 202, 203, 203, 204, 205, 205, 206, 207, 207, 208, 209, 209, 210, 211, 211, 212, 213, 213, 214, 215, 215, 216, 217, 217, 218, 219, 219, 220, 221, 221, 222, 223, 223, 224, 225, 225, 226, 227, 227, 228, 229, 229, 230, 231, 231, 232, 233, 233, 234, 235, 235, 236, 237, 237, 238, 239, 239, 240, 241, 241, 242, 243, 243, 244, 245, 245, 246, 247, 247, 248, 249, 249, 250, 251, 251, 252, 253, 253, 254, 255];
            this.program = ne(i, le),
            this.setUniforms = function() {
                var t = i.getUniformLocation(this.program, "u_flipY")
                  , n = i.getUniformLocation(this.program, "u_denoiseLevel");
                i.uniform1f(n, a),
                i.uniform1f(t, 1);
                var v = i.getUniformLocation(this.program, "light");
                i.uniform1f(v, r);
                var S = i.getUniformLocation(this.program, "redness");
                i.uniform1f(S, o);
                var h = i.getUniformLocation(this.program, "skin_he_max")
                  , _ = i.getUniformLocation(this.program, "skin_he_min")
                  , E = i.getUniformLocation(this.program, "skin_hc_max")
                  , I = i.getUniformLocation(this.program, "skin_hc_min")
                  , T = i.getUniformLocation(this.program, "skin_hc_axis")
                  , y = i.getUniformLocation(this.program, "facts_rotate_c")
                  , b = i.getUniformLocation(this.program, "facts_rotate_le")
                  , R = i.getUniformLocation(this.program, "facts_rotate_ge");
                i.uniform1f(h, s),
                i.uniform1f(_, c),
                i.uniform1f(E, d),
                i.uniform1f(I, u),
                i.uniform1f(T, l),
                i.uniform1f(y, f),
                i.uniform1f(b, p),
                i.uniform1f(R, g);
                var A = i.getUniformLocation(this.program, "u_originImage");
                i.activeTexture(i.TEXTURE2),
                i.bindTexture(i.TEXTURE_2D, e.inputTexture),
                i.uniform1i(A, 2);
                for (var C = ["lighten_lut"], O = [i.TEXTURE3], N = 0; N < C.length; N++) {
                    var w = i.getUniformLocation(this.program, C[N]);
                    i.activeTexture(O[N]),
                    i.bindTexture(i.TEXTURE_2D, m[N]),
                    i.uniform1i(w, N + 3)
                }
            }
            ,
            this.setParameters = function(e) {
                void 0 !== e.denoiseLevel && (a = e.denoiseLevel),
                void 0 !== e.lightLevel && (r = e.lightLevel),
                void 0 !== e.rednessLevel && (o = e.rednessLevel,
                this._updateRedness(o)),
                void 0 !== e.lighteningContrastLevel && this._updateLut(e.lighteningContrastLevel)
            }
            ,
            this._updateRedness = function(e) {
                var t, n, i = 3.141593, a = e, r = a;
                a > 1 && (a = 1),
                a < 0 && (a = 0),
                r > 1 && (r = 1),
                r < 0 && (r = 0),
                f = .8 * a,
                r < .8 && (r = 0),
                (l = (117 - 4 * r) / 180 * i) < (u = (116 - 4 * r) / 180 * i) && (l = u),
                u < i / 2 && (u = i / 2),
                l < i / 2 && (l = i / 2),
                (c = (115 - 4 * r) / 180 * i) < i / 2 && (c = i / 2),
                (d = 173 / 180 * i) > i && (d = i),
                l > i && (l = i),
                (s = 175 / 180 * i) > i && (s = i),
                n = d - l,
                g = (t = s - d) > .01 ? f * n / t : f,
                n = l - u,
                p = (t = u - c) > .01 ? f * n / t : f
            }
            ,
            this._updateLut = function(e) {
                var t = null;
                0 == e && (t = S),
                1 == e && (t = h),
                2 == e && (t = v);
                for (var n = [new Uint8Array(t)], a = [256], r = [1], o = 0; o < n.length; o++)
                    i.bindTexture(i.TEXTURE_2D, m[o]),
                    i.texImage2D(i.TEXTURE_2D, 0, i.LUMINANCE, a[o], r[o], 0, i.LUMINANCE, i.UNSIGNED_BYTE, n[o])
            }
            ,
            this._init = function() {
                var e = null;
                e = S;
                for (var t = [new Uint8Array(e)], n = [256], a = [1], r = 0; r < t.length; r++) {
                    var o = i.createTexture();
                    i.bindTexture(i.TEXTURE_2D, o),
                    i.texImage2D(i.TEXTURE_2D, 0, i.LUMINANCE, n[r], a[r], 0, i.LUMINANCE, i.UNSIGNED_BYTE, t[r]),
                    i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE),
                    i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE),
                    i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR),
                    i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR),
                    m.push(o)
                }
            }
            ,
            this._init()
        }
        var pe = !1;
        function ge() {
            this.programs = [];
            var e = this
              , t = null
              , n = null;
            e.gl = null,
            e.inputTexture = null;
            var i = []
              , a = []
              , r = 0
              , o = 0;
            e._initGl = function(n, s) {
                e.inputTexture = t.createTexture(),
                t.bindTexture(t.TEXTURE_2D, e.inputTexture),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR);
                for (var c = 0; c < 4; c++) {
                    var d = t.createTexture();
                    t.bindTexture(t.TEXTURE_2D, d),
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                    c < 2 ? t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, n, s, 0, t.RGBA, t.UNSIGNED_BYTE, null) : t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, s, n, 0, t.RGBA, t.UNSIGNED_BYTE, null);
                    var u = t.createFramebuffer();
                    t.bindFramebuffer(t.FRAMEBUFFER, u),
                    t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, d, 0),
                    i.push(d),
                    a.push(u)
                }
                t.viewport(0, 0, n, s),
                r = n,
                o = s
            }
            ,
            e.render = function(s) {
                if (t) {
                    var c = 0;
                    o == s.videoWidth && r === s.videoHeight && (c = 2),
                    t.viewport(0, 0, s.videoWidth, s.videoHeight),
                    t.bindTexture(t.TEXTURE_2D, e.inputTexture),
                    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, s);
                    for (var d = pe ? e.programs.length - 1 : 0, u = 0; u <= d; u++) {
                        var l = e.programs[u].program;
                        t.useProgram(l);
                        var f = t.getUniformLocation(l, "u_image");
                        e.programs[u].setUniforms(),
                        t.bindFramebuffer(t.FRAMEBUFFER, a[c + u % 2]),
                        t.clearColor(0, 0, 0, 1),
                        t.clear(t.COLOR_BUFFER_BIT),
                        t.drawArrays(t.TRIANGLES, 0, 6),
                        t.activeTexture(t.TEXTURE0),
                        t.bindTexture(t.TEXTURE_2D, i[c + u % 2]),
                        t.uniform1i(f, 0)
                    }
                    t.useProgram(n);
                    var p = t.getUniformLocation(n, "u_flipY");
                    t.uniform1f(p, -1),
                    t.bindFramebuffer(t.FRAMEBUFFER, null),
                    t.clearColor(0, 0, 0, 1),
                    t.clear(t.COLOR_BUFFER_BIT),
                    t.drawArrays(t.TRIANGLES, 0, 6)
                }
            }
            ,
            e.setEnableBeauty = function(e) {
                pe = e
            }
            ,
            e.init = function(i, a, r) {
                if ("undefined" == typeof WebGLRenderingContext)
                    throw new Error("NOT_SUPPORT");
                t = r.getContext("webgl"),
                e.gl = t,
                e._initGl(i, a),
                e.programs.push(new ae(this,i,a)),
                e.programs.push(new oe(this,i,a)),
                e.programs.push(new ce(this,i,a)),
                e.programs.push(new ue(this,i,a)),
                e.programs.push(new fe(this,i,a)),
                n = e.programs[0].program
            }
            ,
            e.release = function() {
                e.gl = null,
                t = null,
                n = null,
                e.inputTexture = null,
                e.programs = [],
                i = [],
                a = []
            }
            ,
            e.setDenoiseLevel = function(t) {
                e.programs.forEach(function(e) {
                    e.setParameters && e.setParameters({
                        denoiseLevel: t
                    })
                })
            }
            ,
            e.setLightLevel = function(t) {
                e.programs.forEach(function(e) {
                    e.setParameters && e.setParameters({
                        lightLevel: t
                    })
                })
            }
            ,
            e.setRednessLevel = function(t) {
                e.programs.forEach(function(e) {
                    e.setParameters && e.setParameters({
                        rednessLevel: t
                    })
                })
            }
            ,
            e.setContrastLevel = function(t) {
                e.programs.forEach(function(e) {
                    e.setParameters && e.setParameters({
                        lighteningContrastLevel: t
                    })
                })
            }
            ,
            e.setSize = function(t, n) {
                e.programs.forEach(function(e) {
                    e.setSize && e.setSize(t, n)
                })
            }
        }
        ge._instance = null,
        ge.getInstance = function() {
            return ge._instance || (ge._instance = new ge),
            ge._instance
        }
        ;
        var me = {
            addVideoEffectCapability: function(e) {
                e.videoEffect = {
                    canvas: null,
                    video: null,
                    fps: 30,
                    stopChromeBackgroundLoop: null,
                    enableBeauty: !1,
                    denoiseLevel: 5,
                    lightLevel: .35,
                    rednessLevel: .5,
                    lighteningContrastLevel: 1,
                    videoContextInited: !1,
                    originVideoTrack: null,
                    canvasVideoTrack: null,
                    ctx: null
                },
                e._initVideoContext = function() {
                    if (e.videoEffect.videoContextInited)
                        throw new Error("Failed to init video context. Already inited");
                    if (!e.stream)
                        throw new Error("Failed to init video context. Local Stream not initialized");
                    e.videoEffect.originVideoTrack = e.stream.getVideoTracks()[0],
                    e.attributes && e.attributes.maxFrameRate && (e.videoEffect.fps = e.attributes.maxFrameRate),
                    e.videoEffect.videoContextInited = !0
                }
                ,
                e._renderWithWebGL = function(t) {
                    return new Promise(function(n) {
                        e.videoEffect.canvas || (e.videoEffect.canvas = document.createElement("canvas")),
                        e.videoEffect.video || (e.videoEffect.video = document.createElement("video")),
                        e.videoEffect.video.setAttribute("autoplay", ""),
                        e.videoEffect.video.setAttribute("muted", ""),
                        e.videoEffect.video.muted = !0,
                        e.videoEffect.video.setAttribute("playsinline", ""),
                        e.videoEffect.video.setAttribute("style", "display:none"),
                        e.videoEffect.video.srcObject = t;
                        var i = t.getVideoTracks()[0].getSettings()
                          , a = i.width
                          , r = i.height;
                        console.log("Width: ".concat(a, ", Height: ").concat(r)),
                        e.videoEffect.canvas.setAttribute("width", a),
                        e.videoEffect.canvas.setAttribute("height", r),
                        e.videoEffect.video.setAttribute("width", a),
                        e.videoEffect.video.setAttribute("height", r);
                        var o = ge.getInstance();
                        o.init(e.videoEffect.video.width, e.videoEffect.video.height, e.videoEffect.canvas),
                        o.setDenoiseLevel(e.videoEffect.denoiseLevel),
                        o.setLightLevel(e.videoEffect.lightLevel),
                        o.setRednessLevel(e.videoEffect.rednessLevel),
                        o.setContrastLevel(e.videoEffect.lighteningContrastLevel),
                        e.videoEffect.video.addEventListener("playing", function t() {
                            var i = e.videoEffect.canvas.captureStream(e.videoEffect.fps);
                            e.videoEffect.video.removeEventListener("playing", t, !0),
                            n([i.getVideoTracks()[0], e.videoEffect.video])
                        }, !0),
                        e.videoEffect.video.play()
                    }
                    )
                }
                ,
                e._disableEffect = function() {
                    e.videoEffect.videoContextInited || e._initVideoContext();
                    var t = e.videoEffect.originVideoTrack;
                    if (!t)
                        return o.default.warning("Video track is null, fail to disable video effect!"),
                        Promise.resolve();
                    if (e.pc && e.pc.peerConnection && e.pc.peerConnection) {
                        var n = (e.pc.peerConnection && e.pc.peerConnection.getSenders()).find(function(e) {
                            return e && e.track && "video" == e.track.kind
                        });
                        if (n && n.replaceTrack && t)
                            return n.replaceTrack(t)
                    }
                    return Promise.resolve()
                }
                ,
                e._releaseEffect = function() {
                    var t;
                    return t = e.videoEffect.enableBeauty ? e._disableEffect() : Promise.resolve(),
                    ge.getInstance().release(),
                    e.videoEffect.videoContextInited = !1,
                    e.videoEffect.canvasVideoTrack = null,
                    t
                }
                ,
                e._enableEffect = function() {
                    return e.videoEffect.videoContextInited || e._initVideoContext(),
                    e.videoEffect.originVideoTrack ? (e.videoEffect.canvasVideoTrack ? (e._showEffectInLocalPlayer(),
                    e._replaceWithCanvasTrack()) : e._renderWithWebGL(e.stream).then(function(t) {
                        var n = X()(t, 2)
                          , i = n[0]
                          , a = n[1];
                        e.videoEffect.canvasVideoTrack = i;
                        var r = ge.getInstance();
                        requestAnimationFrame(function t() {
                            e.videoEffect.enableBeauty && r.render(a),
                            e.videoEffect.videoContextInited && requestAnimationFrame(t)
                        }),
                        g.isChrome() && document.addEventListener("visibilitychange", function() {
                            document.hidden,
                            document.hidden ? e.videoEffect.stopChromeBackgroundLoop = function(e, t) {
                                var n = 1 / t
                                  , i = new AudioContext
                                  , a = i.createGain();
                                a.gain.value = 0,
                                a.connect(i.destination),
                                function t() {
                                    var o = i.createOscillator();
                                    o.onended = t,
                                    o.connect(a),
                                    o.start(0),
                                    o.stop(i.currentTime + n),
                                    e(i.currentTime),
                                    r && (o.onended = function() {
                                        i.close()
                                    }
                                    )
                                }();
                                var r = !1;
                                return function() {
                                    r = !0
                                }
                            }(function() {
                                e.videoEffect.enableBeauty && r.render(a)
                            }, e.videoEffect.fps) : e.videoEffect.stopChromeBackgroundLoop && (e.videoEffect.stopChromeBackgroundLoop(),
                            e.videoEffect.stopChromeBackgroundLoop = null)
                        }, !1),
                        e._showEffectInLocalPlayer(),
                        e._replaceWithCanvasTrack()
                    }),
                    Promise.resolve()) : (o.default.warning("Video track is null, fail to enable video effect!"),
                    Promise.resolve())
                }
                ,
                e._showEffectInLocalPlayer = function() {
                    if (e.player) {
                        var t = e.player.div.children[0];
                        if ("none" !== t.style.display && (e.player.div.appendChild(e.videoEffect.canvas),
                        "video" === t.tagName.toLowerCase())) {
                            var n = t.getAttribute("style");
                            e.videoEffect.canvas.setAttribute("style", n),
                            "none" !== t.style.display && (t.style.display = "none")
                        }
                    }
                }
                ,
                e._removeEffectFromLocalPlayer = function() {
                    if (e.player && e.player.div && e.videoEffect.enableBeauty && e.videoEffect.canvas) {
                        e.player.div.removeChild(e.videoEffect.canvas);
                        var t = e.player.div.children[0];
                        "video" === t.tagName.toLowerCase() && (e.videoEffect.canvas.style.display = "none",
                        t.style.display = "block")
                    }
                }
                ,
                e._replaceWithCanvasTrack = function() {
                    var t = null;
                    e.pc && e.pc.peerConnection && e.pc.peerConnection && (t = (e.pc.peerConnection && e.pc.peerConnection.getSenders()).find(function(e) {
                        return e && e.track && "video" == e.track.kind
                    })),
                    t && t.replaceTrack && e.videoEffect.canvasVideoTrack && t.replaceTrack(e.videoEffect.canvasVideoTrack)
                }
                ,
                e.setBeautyEffectOptions = (t = K()(Y.a.mark(function t(n, i) {
                    var a, r = arguments;
                    return Y.a.wrap(function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (Object(H.checkValidBoolean)(n, "enabled"),
                                a = ge.getInstance(),
                                e.videoEffect.enableBeauty == n) {
                                    t.next = 14;
                                    break
                                }
                                if (a.setEnableBeauty(n),
                                !n) {
                                    t.next = 9;
                                    break
                                }
                                return t.next = 7,
                                e._enableEffect();
                            case 7:
                                t.next = 12;
                                break;
                            case 9:
                                return e._removeEffectFromLocalPlayer(),
                                t.next = 12,
                                e._releaseEffect();
                            case 12:
                                e.videoEffect.enableBeauty = n,
                                s.b.reportApiInvoke(e.sid, {
                                    callback: null,
                                    options: r,
                                    name: "Stream.setBeautyEffectOptions",
                                    tag: "tracer"
                                });
                            case 14:
                                if (n) {
                                    t.next = 16;
                                    break
                                }
                                return t.abrupt("return");
                            case 16:
                                if (!i) {
                                    t.next = 20;
                                    break
                                }
                                Object(H.checkValidObject)(i, "options"),
                                t.next = 21;
                                break;
                            case 20:
                                return t.abrupt("return");
                            case 21:
                                if (void 0 !== i.smoothnessLevel && (Object(H.checkValidFloatNumber)(i.smoothnessLevel, "smoothnessLevel", 0, 1),
                                e.videoEffect.denoiseLevel = 10 * i.smoothnessLevel,
                                e.videoEffect.denoiseLevel < .1 && (e.videoEffect.denoiseLevel = .1),
                                a.setDenoiseLevel(e.videoEffect.denoiseLevel)),
                                void 0 !== i.lighteningLevel && (Object(H.checkValidFloatNumber)(i.lighteningLevel, "lighteningLevel", 0, 1),
                                e.videoEffect.lightLevel = i.lighteningLevel / 2,
                                e.videoEffect.lightLevel < .01 && (e.videoEffect.lightLevel = .01),
                                a.setLightLevel(e.videoEffect.lightLevel)),
                                void 0 !== i.rednessLevel && (Object(H.checkValidFloatNumber)(i.rednessLevel, "rednessLevel", 0, 1),
                                e.videoEffect.rednessLevel = i.rednessLevel,
                                e.videoEffect.rednessLevel < .01 && (e.videoEffect.rednessLevel = .01),
                                a.setRednessLevel(e.videoEffect.rednessLevel)),
                                void 0 === i.lighteningContrastLevel) {
                                    t.next = 29;
                                    break
                                }
                                if (0 === i.lighteningContrastLevel || 1 === i.lighteningContrastLevel || 2 === i.lighteningContrastLevel) {
                                    t.next = 27;
                                    break
                                }
                                throw new Error("Invalid lighteningContrastLevel: The value should be 0, 1 or 2.");
                            case 27:
                                e.videoEffect.lighteningContrastLevel = parseFloat(i.lighteningContrastLevel),
                                a.setContrastLevel(e.videoEffect.lighteningContrastLevel);
                            case 29:
                            case "end":
                                return t.stop()
                            }
                    }, t, this)
                })),
                function(e, n) {
                    return t.apply(this, arguments)
                }
                );
                var t
            },
            restoreVideoEffect: function(e) {
                return e.videoEffect.enableBeauty ? e._enableEffect() : Promise.resolve()
            },
            disableVideoEffect: function(e) {
                return e._releaseEffect ? e._releaseEffect() : Promise.resolve()
            },
            applyEffectInPlayer: function(e) {
                e.videoEffect.enableBeauty && e.videoEffect.canvas && e._showEffectInLocalPlayer()
            },
            removeEffectFromLocalPlayer: function(e) {
                e._removeEffectFromLocalPlayer()
            },
            replaceWithCanvasTrack: function(e) {
                e.videoEffect.enableBeauty && e._replaceWithCanvasTrack()
            },
            checkVideoEffectEnabled: function(e) {
                if (e.videoEffect.enableBeauty && e.videoEffect && e.videoEffect.videoContextInited)
                    return o.default.error("Operation not permitted: ".concat("VIDEO_EFFECT_ENABLED")),
                    "VIDEO_EFFECT_ENABLED";
                return !1
            }
        }
          , ve = a(9)
          , Se = a.n(ve)
          , he = function(e) {
            Object(H.checkValidString)(e, "profileName"),
            -1 === (e = e.toLowerCase()).indexOf("_") && (e += "_1"),
            Object(H.checkValidEnum)(e, "profileName", Object.keys(r.SUPPORT_RESOLUTION_LIST));
            var t = r.SUPPORT_RESOLUTION_LIST[e];
            t || (e = Object(r.getParameter)("DEFAULT_PROFILE"),
            t = r.SUPPORT_RESOLUTION_LIST[e]);
            var n = {
                profileName: e,
                video: {
                    width: t[0],
                    height: t[1]
                },
                attributes: {
                    resolution: "".concat(t[0], "x").concat(t[1]),
                    minFrameRate: t[2],
                    maxFrameRate: t[3],
                    minVideoBW: t[4],
                    maxVideoBW: t[5]
                }
            };
            return t[2] && t[3] && (n.video.frameRate = {
                ideal: t[2],
                max: t[3]
            }),
            t[6] && t[7] && (n.screen = {
                width: t[0],
                height: t[1],
                frameRate: {
                    min: t[6],
                    max: t[7]
                }
            }),
            n
        }
          , _e = function(e) {
            return Object.keys(r.SUPPORT_RESOLUTION_LIST).filter(function(t) {
                var n = r.SUPPORT_RESOLUTION_LIST[t]
                  , i = ["width", "height", "frameRate"];
                for (var a in i) {
                    var o = i[a];
                    if (e[o] && n[a]) {
                        if ("number" == typeof e[o].max && e[o].max < n[a])
                            return !1;
                        if ("number" == typeof e[o].min && e[o].min > n[a])
                            return !1
                    }
                }
                return !0
            }).reverse()
        }
          , Ee = function(e) {
            var t = r.AUDIO_PROFILE_SETTINGS[e] || r.AUDIO_PROFILE_SETTINGS.default;
            return {
                highQuality: t[0],
                stereo: t[1],
                speech: t[2],
                lowQuality: t[3]
            }
        };
        var Ie = function(e) {
            var t = c();
            if (t.params = h()({}, e),
            t.stream = e.stream,
            t.url = e.url,
            t.onClose = void 0,
            t.local = !1,
            t.videoSource = e.videoSource,
            t.audioSource = e.audioSource,
            e.video = !(!e.videoSource && !e.video),
            t.video = e.video,
            e.audio = !(!e.audioSource && !e.audio),
            t.audio = e.audio,
            t.screen = !!e.screen,
            t.screenAudio = !!e.screenAudio,
            t.screenAttributes = {
                width: 1920,
                height: 1080,
                maxFr: 5,
                minFr: 1
            },
            t.videoSize = e.videoSize,
            t.player = void 0,
            t.audioLevelHelper = null,
            e.attributes = e.attributes || {},
            t.attributes = e.attributes,
            t.microphoneId = e.microphoneId,
            t.cameraId = e.cameraId,
            t.facingMode = e.facingMode,
            t.inSwitchDevice = !1,
            t.userMuteVideo = !1,
            t.userMuteAudio = !1,
            t.peerMuteVideo = !1,
            t.peerMuteAudio = !1,
            t.lowStream = null,
            t.videoWidth = 0,
            t.videoHeight = 0,
            t.streamId = e.streamID,
            t.userId = null,
            t.uintId = e.uintUID || null,
            t.mirror = !1 !== e.mirror,
            t.DTX = e.audioProcessing && e.audioProcessing.DTX,
            t.audioProcessing = e.audioProcessing,
            t.highQuality = !1,
            t.stereo = !1,
            t.speech = !1,
            t.screen || delete t.screen,
            !(void 0 === t.videoSize || t.videoSize instanceof Array && 4 === t.videoSize.length))
                throw Error("Invalid Video Size");
            function n() {
                var e = {};
                t.getVideoTrack() === this ? (o.default.debug("Video Track Ended"),
                e.type = "videoTrackEnded",
                e.track = this) : t.getAudioTrack() === this ? (o.default.debug("Audio Track Ended"),
                e.type = "audioTrackEnded",
                e.track = this) : o.default.debug("Detached Track ended", this.kind, this.label, this),
                e.type && t.dispatchEvent(e)
            }
            return t.videoSize = [640, 480, 640, 480],
            void 0 !== e.local && !0 !== e.local || (t.local = !0),
            t.initialized = !t.local,
            t._streamInitID = null,
            function(e) {
                e.audioMixing = {
                    audioContextInited: !1,
                    defaultVolume: 100,
                    inEarMonitoring: "FILE",
                    sounds: {},
                    states: {
                        IDLE: "IDLE",
                        STARTING: "STARTING",
                        BUSY: "BUSY",
                        PAUSED: "PAUSED"
                    },
                    inEarMonitoringModes: {
                        NONE: "NONE",
                        FILE: "FILE",
                        MICROPHONE: "MOCROPHONE",
                        ALL: "ALL"
                    },
                    ctx: null,
                    mediaStreamSource: null,
                    mediaStreamDest: null,
                    buffer: {}
                },
                e._initSoundIfNotExists = function(t, n) {
                    e.audioMixing.sounds[t] || (e.audioMixing.sounds[t] = {
                        soundId: t,
                        state: "IDLE",
                        muted: e.userMuteAudio,
                        filePath: n,
                        volume: e.audioMixing.defaultVolume,
                        startAt: null,
                        startOffset: null,
                        pauseAt: null,
                        pauseOffset: null,
                        resumeAt: null,
                        resumeOffset: null,
                        stopAt: null,
                        options: null,
                        source: null
                    })
                }
                ,
                e._initSoundIfNotExists(-1),
                e.loadAudioBuffer = function(t, n, i) {
                    var a = s.b.reportApiInvoke(e.sid, {
                        callback: i,
                        name: "Stream.loadAudioBuffer",
                        options: arguments,
                        tag: "tracer"
                    });
                    Object(H.checkValidString)(n, "url", 1, 1024, !1),
                    Object(H.checkValidString)(t, "id", 1, 1024, !1);
                    var r = function(t) {
                        o.default.error("[".concat(e.streamId, "] loadAudioBuffer Failed: ") + t),
                        a(I.default.LOAD_AUDIO_FAILED)
                    }
                      , c = new XMLHttpRequest;
                    c.open("GET", n, !0),
                    c.responseType = "arraybuffer",
                    c.onload = function() {
                        if (c.status > 400)
                            r("".concat(c.status, " ").concat(c.statusText));
                        else {
                            var n = c.response;
                            e.audioMixing.audioContextInited || e._initAudioContext(),
                            e.audioMixing.ctx.decodeAudioData(n, function(n) {
                                e.audioMixing.buffer[t] = n,
                                a(null)
                            }, function(t) {
                                o.default.error("[".concat(e.streamId, "] decodeAudioData Failed: "), t),
                                a(t)
                            })
                        }
                    }
                    ,
                    c.onerror = function() {
                        return r("load error")
                    }
                    ,
                    c.ontimeout = function() {
                        return r("timeout")
                    }
                    ,
                    c.send()
                }
                ,
                e.createAudioBufferSource = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.createAudioBufferSource",
                        options: arguments,
                        tag: "tracer"
                    });
                    if (e.audioMixing.buffer[t.id]) {
                        var i = e.audioMixing.buffer[t.id]
                          , a = e.audioMixing.ctx.createBufferSource();
                        a.buffer = i;
                        var r = e.audioMixing.ctx.createGain();
                        if (a.connect(r),
                        r.connect(e.audioMixing.mediaStreamDest),
                        a.gainNode = r,
                        t.loop)
                            a.loop = !0,
                            a.start(0, t.playTime / 1e3);
                        else if (t.cycle > 1)
                            if (Object(g.isChrome)()) {
                                a.loop = !0;
                                var c = t.cycle * i.duration * 1e3 - (t.playTime || 0);
                                a.start(0, t.playTime / 1e3, c / 1e3)
                            } else
                                o.default.warning("[".concat(e.streamId, "] Cycle Param is ignored by current browser")),
                                a.start(0, t.playTime / 1e3);
                        else
                            a.start(0, t.playTime / 1e3);
                        var d = e.audioMixing.sounds[t.soundId];
                        return d.source = a,
                        e._flushAudioMixingMuteStatus(),
                        a.addEventListener("ended", function() {
                            a === d.source && e.dispatchEvent({
                                type: "audioSourceEnded",
                                soundId: t.soundId,
                                source: a,
                                sound: d
                            })
                        }),
                        n(),
                        a
                    }
                    return o.default.error("[".concat(e.streamId, "] "), "AUDIOBUFFER_NOT_FOUND", t.id),
                    n(!1),
                    !1
                }
                ,
                e.on("audioSourceEnded", function(t) {
                    var n = t.source
                      , i = t.sound;
                    i && i.state === e.audioMixing.states.BUSY && !i.pauseAt && (i.state = e.audioMixing.states.IDLE,
                    i.startAt = null,
                    i.startOffset = null,
                    i.resumeAt = null,
                    i.resumeOffset = null,
                    n.gainNode && n.gainNode.disconnect && n.gainNode.disconnect(),
                    n.buffer = null,
                    e.audioMixing.mediaStreamSource.connect(e.audioMixing.mediaStreamDest))
                }),
                e.clearAudioBufferSource = function() {
                    e.audioBufferSource.forEach(function(e) {
                        e.stop()
                    })
                }
                ,
                e._isSoundExists = function(t) {
                    return !!e.audioMixing.sounds[t.soundId] || (o.default.error("SoundId not exists. #".concat(t.soundId)),
                    !1)
                }
                ,
                e._initAudioContext = function() {
                    if (e.audioMixing.audioContextInited)
                        throw new Error("Failed to init audio context. Already inited");
                    if (!e.stream)
                        throw new Error("Failed to init audio context. Local Stream not initialized");
                    e.audioMixing.ctx = Object(G.a)(),
                    e.audioMixing.mediaStreamSource = e.audioMixing.ctx.createMediaStreamSource(e.stream),
                    e.audioMixing.mediaStreamDest = e.audioMixing.ctx.createMediaStreamDestination(),
                    e.audioMixing.mediaStreamSource.connect(e.audioMixing.mediaStreamDest);
                    var t = e.stream.getVideoTracks()[0];
                    if (t && e.audioMixing.mediaStreamDest.stream.addTrack(t),
                    e._isAudioMuted() ? (e._unmuteAudio(),
                    e.stream = e.audioMixing.mediaStreamDest.stream,
                    e._muteAudio()) : e.stream = e.audioMixing.mediaStreamDest.stream,
                    e.audioLevelHelper = null,
                    e.pc && e.pc.peerConnection && e.pc.peerConnection) {
                        var n = (e.pc.peerConnection && e.pc.peerConnection.getSenders()).find(function(e) {
                            return e && e.track && "audio" == e.track.kind
                        })
                          , i = e.audioMixing.mediaStreamDest.stream.getAudioTracks()[0];
                        n && n.replaceTrack && i && n.replaceTrack(i)
                    }
                    e.audioMixing.audioContextInited = !0
                }
                ,
                e._cleanupAudioMixing = function() {
                    if (e.audioMixing.audioContextInited) {
                        for (var t in e.audioMixing.sounds) {
                            var n = e.audioMixing.sounds[t];
                            n.state !== e.audioMixing.states.BUSY && n.state !== e.audioMixing.states.PAUSED || e._stopOneEffect({
                                soundId: t
                            })
                        }
                        e.audioLevelHelper = null,
                        e.audioMixing.audioContextInited = !1
                    }
                }
                ,
                e._reloadInEarMonitoringMode = function(t) {
                    if (t) {
                        if (!e.audioMixing.inEarMonitoringModes[t])
                            return o.default.error("[".concat(e.streamId, "] Invalid InEarMonitoringMode ").concat(t));
                        e.audioMixing.inEarMonitoring = t
                    }
                    switch (e.audioMixing.audioContextInited || e._initAudioContext(),
                    e.audioMixing.inEarMonitoring) {
                    case e.audioMixing.inEarMonitoringModes.FILE:
                        e.audioMixing.mediaStreamSource.connectedToDestination && (e.audioMixing.mediaStreamSource.disconnect(e.audioMixing.ctx.destination),
                        e.audioMixing.mediaStreamSource.connectedToDestination = !1);
                    case e.audioMixing.inEarMonitoringModes.ALL:
                        for (var n in e.audioMixing.sounds) {
                            var i = e.audioMixing.sounds[n];
                            i && i.source && !i.source.connectedToDestination && (i.source.gainNode.connect(e.audioMixing.ctx.destination),
                            i.source.connectedToDestination = !0)
                        }
                    }
                    switch (e.audioMixing.inEarMonitoring) {
                    case e.audioMixing.inEarMonitoringModes.MICROPHONE:
                        e.audioMixing.source.forEach(function(t) {
                            t.connectedToDestination && (t.gainNode.disconnect(e.audioMixing.ctx.destination),
                            t.connectedToDestination = !1)
                        });
                    case e.audioMixing.inEarMonitoringModes.ALL:
                        e.audioMixing.mediaStreamSource.connectedToDestination || (e.audioMixing.mediaStreamSource.connect(e.audioMixing.ctx.destination),
                        e.audioMixing.mediaStreamSource.connectedToDestination = !0)
                    }
                }
                ,
                e._startAudioMixingBufferSource = function(t) {
                    e.audioMixing.audioContextInited || e._initAudioContext();
                    var n = {
                        soundId: t.soundId,
                        id: t.filePath,
                        loop: t.loop,
                        cycle: t.cycle,
                        playTime: t.playTime || 0
                    }
                      , i = t.replace
                      , a = e.createAudioBufferSource(n);
                    return a.sound = e.audioMixing.sounds[t.soundId],
                    a ? (a.addEventListener("ended", e._audioMixingFinishedListener, {
                        once: !0
                    }),
                    e._reloadInEarMonitoringMode(),
                    i && e.audioMixing.mediaStreamSource.disconnect(e.audioMixing.mediaStreamDest),
                    a) : null
                }
                ,
                e._stopAudioMixingBufferSource = function(t) {
                    var n = e.audioMixing.sounds[t.soundId].source;
                    return n ? (n.removeEventListener("ended", e._audioMixingFinishedListener),
                    e.audioMixing.mediaStreamSource.connect(e.audioMixing.mediaStreamDest),
                    n.stop(),
                    n.gainNode && n.gainNode.disconnect && n.gainNode.disconnect(),
                    n.buffer = null,
                    n) : null
                }
                ,
                e._flushAudioMixingMuteStatus = function(t) {
                    for (var n in e.audioMixing.sounds) {
                        var i = e.audioMixing.sounds[n];
                        i && (void 0 !== t && (i.muted = !!t),
                        i.source && (i.muted ? i.source.gainNode.gain.value = 0 : i.source.gainNode.gain.value = i.volume / 100))
                    }
                }
                ,
                e._handleAudioMixingInvalidStateError = function(t, n, i) {
                    var a = e.audioMixing.sounds[n.soundId]
                      , r = -1 === n.soundId ? "INVALID_AUDIO_MIXING_STATE" : "INVALID_PLAY_EFFECT_STATE";
                    o.default.error("[".concat(e.streamId, "] Cannot ").concat(t, ": ").concat(r, ", state is ").concat(a.state)),
                    i && i(r)
                }
                ,
                e._handleAudioMixingNoSourceError = function(t, n, i) {
                    e.audioMixing.sounds[n.soundId].state = e.audioMixing.states.IDLE;
                    var a = -1 === n.soundId ? "NO_AUDIO_MIXING_SOURCE" : "NO_EFFECT_SOURCE";
                    o.default.error("[".concat(e.streamId, "] Cannot ").concat(t, ": ").concat(a)),
                    i && i(a)
                }
                ,
                e._getOneEffectStates = function(t) {
                    var n = e.audioMixing.sounds[t.soundId];
                    return function() {
                        return n ? {
                            state: n.state,
                            startAt: n.startAt,
                            resumeAt: n.resumeAt,
                            pauseOffset: n.pauseOffset,
                            pauseAt: n.pauseAt,
                            resumeOffset: n.resumeOffset,
                            stopAt: n.stopAt,
                            duration: e._getOneEffectDuration(t),
                            position: e._getOneEffectCurrentPosition(t)
                        } : {}
                    }
                }
                ,
                e._audioMixingFinishedListener = function() {
                    var t = this.sound;
                    t.state === e.audioMixing.states.IDLE && e.audioMixing.buffer[t.options.filePath] && !t.options.cacheResource && (o.default.debug("Recycled buffer ".concat(t.options.filePath)),
                    delete e.audioMixing.buffer[t.options.filePath]),
                    -1 === t.soundId && e.dispatchEvent({
                        type: "audioMixingFinished"
                    })
                }
                ,
                e._playOneEffect = function(t, n) {
                    Object(H.checkValidObject)(t, "options");
                    var i = t.soundId
                      , a = (t.filePath,
                    t.cacheResource);
                    if (t.cycle,
                    t.loop,
                    t.playTime,
                    t.replace,
                    Object(g.isSafari)() && Object(g.getBrowserVersion)() < 12) {
                        var r = "BROWSER_NOT_SUPPORT";
                        return o.default.error("[".concat(e.streamId, "] Cannot _playOneEffect: "), r),
                        n(r)
                    }
                    e.audioMixing.audioContextInited || e._initAudioContext(),
                    e._initSoundIfNotExists(i);
                    var s = e.audioMixing.sounds[i];
                    if (s.state === e.audioMixing.states.IDLE) {
                        if (void 0 !== t.cycle && !t.cycle > 0)
                            return r = "Invalid Parmeter cycle: " + t.cycle,
                            o.default.error("[".concat(e.streamId, "] ").concat(i), r),
                            n(r);
                        if (Object(H.isEmpty)(a) && (t.cacheResource = !0),
                        s.state = e.audioMixing.states.STARTING,
                        s.options = t,
                        e.audioMixing.buffer[t.filePath]) {
                            var c = e._startAudioMixingBufferSource(t);
                            if (c)
                                return s.source = c,
                                s.startAt = Date.now(),
                                s.resumeAt = null,
                                s.pauseOffset = null,
                                s.pauseAt = null,
                                s.resumeOffset = null,
                                s.stopAt = null,
                                s.startOffset = t.playTime || 0,
                                s.state = e.audioMixing.states.BUSY,
                                e._flushAudioMixingMuteStatus(),
                                n(null);
                            s.state = e.audioMixing.states.IDLE;
                            var d = "CREATE_BUFFERSOURCE_FAILED";
                            if (n)
                                return n(d);
                            o.default.error("[".concat(e.streamId, "] "), d)
                        } else
                            e.loadAudioBuffer(t.filePath, t.filePath, function(i) {
                                if (i)
                                    s.state = e.audioMixing.states.IDLE,
                                    n ? n(i) : o.default.error("[".concat(e.streamId, "] "), i);
                                else {
                                    var a = e._startAudioMixingBufferSource(t);
                                    if (a)
                                        return s.source = a,
                                        s.startAt = Date.now(),
                                        s.resumeAt = null,
                                        s.pauseOffset = null,
                                        s.pauseAt = null,
                                        s.resumeOffset = null,
                                        s.stopAt = null,
                                        s.startOffset = t.playTime || 0,
                                        s.state = e.audioMixing.states.BUSY,
                                        e._flushAudioMixingMuteStatus(),
                                        n(null);
                                    if (s.state = e.audioMixing.states.IDLE,
                                    i = "CREATE_BUFFERSOURCE_FAILED",
                                    n)
                                        return n(i);
                                    o.default.error("[".concat(e.streamId, "] "), i)
                                }
                            })
                    } else
                        e._handleAudioMixingInvalidStateError("_playEffect", t, n)
                }
                ,
                e._stopOneEffect = function(t, n) {
                    var i = e.audioMixing.sounds[t.soundId];
                    return e._isSoundExists(t) ? i.state === e.audioMixing.states.BUSY || i.state === e.audioMixing.states.PAUSED ? (e._stopAudioMixingBufferSource(t),
                    i.stopAt = Date.now(),
                    i.state = e.audioMixing.states.IDLE,
                    e.audioMixing.buffer[i.options.filePath] && !i.options.cacheResource && (o.default.debug("Recycled buffer ".concat(i.options.filePath)),
                    delete e.audioMixing.buffer[i.options.filePath]),
                    void (n && n(null))) : void e._handleAudioMixingInvalidStateError("_stopOneEffect", t, n) : n("SOUND_NOT_EXISTS")
                }
                ,
                e._pauseOneEffect = function(t, n) {
                    var i = e.audioMixing.sounds[t.soundId];
                    if (i.state === e.audioMixing.states.BUSY)
                        return e._stopAudioMixingBufferSource(t) ? (i.pauseAt = Date.now(),
                        i.state = e.audioMixing.states.PAUSED,
                        i.resumeAt ? i.pauseOffset = i.pauseAt - i.resumeAt + i.resumeOffset : i.pauseOffset = i.pauseAt - i.startAt + i.startOffset,
                        n && n(null)) : void e._handleAudioMixingNoSourceError("_pauseOneEffect", t, n);
                    e._handleAudioMixingInvalidStateError("_pauseOneEffect", t, n)
                }
                ,
                e._resumeOneEffect = function(t, n) {
                    var i = e.audioMixing.sounds[t.soundId];
                    if (i.state === e.audioMixing.states.PAUSED) {
                        var a = {
                            soundId: t.soundId,
                            filePath: i.options.filePath,
                            cycle: i.options.cycle,
                            loop: i.options.loop,
                            playTime: i.pauseOffset,
                            replace: i.options.replace
                        }
                          , r = e._startAudioMixingBufferSource(a);
                        if (!r) {
                            var s = "CREATE_BUFFERSOURCE_FAILED";
                            return n(s),
                            void o.default.error("[".concat(e.streamId, "] "), s)
                        }
                        i.source = r,
                        i.resumeAt = Date.now(),
                        i.resumeOffset = i.pauseOffset,
                        i.state = e.audioMixing.states.BUSY,
                        i.pauseAt = null,
                        i.pauseOffset = null,
                        n(null)
                    } else
                        e._handleAudioMixingInvalidStateError("_resumeOneEffect", t, n)
                }
                ,
                e._getOneEffectDuration = function(t) {
                    var n = e.audioMixing.sounds[t.soundId];
                    return n.options && n.options.filePath && e.audioMixing.buffer[n.options.filePath] ? 1e3 * e.audioMixing.buffer[n.options.filePath].duration : null
                }
                ,
                e._getOneEffectCurrentPosition = function(t, n) {
                    var i = e.audioMixing.sounds[t.soundId];
                    return i.state === e.audioMixing.states.PAUSED ? i.pauseOffset % e._getOneEffectDuration(t) : i.state === e.audioMixing.states.BUSY ? i.resumeAt ? (Date.now() - i.resumeAt + i.resumeOffset) % e._getOneEffectDuration(t) : (Date.now() - i.startAt + i.startOffset) % e._getOneEffectDuration(t) : void (n && e._handleAudioMixingInvalidStateError("_getOneEffectCurrentPosition", t))
                }
                ,
                e._setOneEffectPosition = function(t, n, i) {
                    var a = e.audioMixing.sounds[t.soundId];
                    if (a.state === e.audioMixing.states.BUSY) {
                        if (!e._stopAudioMixingBufferSource(t))
                            return void e._handleAudioMixingNoSourceError("_setOneEffectPosition", t, i);
                        var r = {
                            soundId: t.soundId,
                            filePath: a.options.filePath,
                            loop: a.options.loop,
                            cycle: a.options.cycle,
                            playTime: n
                        }
                          , s = e._startAudioMixingBufferSource(r);
                        if (!s) {
                            var c = "CREATE_BUFFERSOURCE_FAILED";
                            return i && i(c),
                            void o.default.error("[".concat(e.streamId, "] "), c)
                        }
                        a.source = s,
                        a.startAt = Date.now(),
                        a.startOffset = n,
                        a.resumeAt = null,
                        a.resumeOffset = null,
                        a.pauseOffset = null,
                        a.pauseAt = null
                    } else {
                        if (a.state !== e.audioMixing.states.PAUSED)
                            return void e._handleAudioMixingInvalidStateError("_setOneEffectPosition", t, i);
                        a.pauseOffset = n
                    }
                    i && i(null)
                }
                ,
                e.startAudioMixing = function(t, n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        callback: function(t) {
                            if (t)
                                return n && n(t);
                            e.dispatchEvent({
                                type: "audioMixingPlayed"
                            }),
                            n && n(null)
                        },
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.startAudioMixing",
                        options: t
                    });
                    Object(H.checkValidObject)(t, "options");
                    var a = t.filePath
                      , o = t.cacheResource
                      , c = t.cycle
                      , d = t.loop
                      , u = t.playTime
                      , l = t.replace;
                    Object(H.checkValidString)(a, "filePath", 1, Object(r.getParameter)("FILEPATH_LENMAX"), !1),
                    Object(H.checkValidNumber)(u, "playTime", 0, 1e8),
                    !Object(H.isEmpty)(c) && Object(H.checkValidNumber)(c, "cycle"),
                    !Object(H.isEmpty)(d) && Object(H.checkValidBoolean)(d, "loop"),
                    !Object(H.isEmpty)(l) && Object(H.checkValidBoolean)(l, "replace"),
                    !Object(H.isEmpty)(o) && Object(H.checkValidBoolean)(o, "cacheResource");
                    var f = h()({
                        soundId: -1
                    }, t);
                    e._playOneEffect(f, i)
                }
                ,
                e.stopAudioMixing = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        callback: t,
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.stopAudioMixing"
                    });
                    e._stopOneEffect({
                        soundId: -1
                    }, n)
                }
                ,
                e.pauseAudioMixing = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        callback: t,
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.pauseAudioMixing"
                    });
                    return e._pauseOneEffect({
                        soundId: -1
                    }, n)
                }
                ,
                e.resumeAudioMixing = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        callback: function(n, i) {
                            if (n)
                                return t && t(n);
                            e.dispatchEvent({
                                type: "audioMixingPlayed"
                            }),
                            t && t(null)
                        },
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.resumeAudioMixing"
                    });
                    e._resumeOneEffect({
                        soundId: -1
                    }, n)
                }
                ,
                e.adjustAudioMixingVolume = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.adjustAudioMixingVolume",
                        options: arguments,
                        tag: "tracer"
                    });
                    Object(H.checkValidNumber)(t, "volume", 0, 100),
                    e.audioMixing.sounds[-1].volume = t,
                    e._flushAudioMixingMuteStatus(),
                    n()
                }
                ,
                e.getAudioMixingDuration = function() {
                    var t = s.b.reportApiInvoke(e.sid, {
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.getAudioMixingDuration"
                    })
                      , n = e._getOneEffectDuration({
                        soundId: -1
                    });
                    return t(null, n),
                    n
                }
                ,
                e.getAudioMixingCurrentPosition = function() {
                    var t = s.b.reportApiInvoke(e.sid, {
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.getAudioMixingCurrentPosition"
                    })
                      , n = e._getOneEffectCurrentPosition({
                        soundId: -1
                    }, !0);
                    return t(null, n),
                    n
                }
                ,
                e.setAudioMixingPosition = function(t, n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        callback: n,
                        options: arguments,
                        tag: "tracer",
                        getStates: e._getOneEffectStates({
                            soundId: -1
                        }),
                        name: "Stream.setAudioMixingPosition"
                    });
                    Object(H.checkValidNumber)(t, "position", 0, 1e8),
                    e._setOneEffectPosition({
                        soundId: -1
                    }, t, i)
                }
                ,
                e.playEffect = function(t, n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        callback: function(t) {
                            if (t)
                                return n && n(t);
                            e.dispatchEvent({
                                type: "effectPlayed"
                            }),
                            n && n(null)
                        },
                        name: "Stream.playEffect",
                        options: t
                    });
                    Object(H.checkValidObject)(t, "options");
                    var a = t.soundId
                      , o = t.filePath
                      , c = t.cycle;
                    Object(H.checkValidNumber)(a, "soundId", 1, 1e4),
                    Object(H.checkValidString)(o, "filePath", 0, Object(r.getParameter)("FILEPATH_LENMAX"), !1),
                    !Object(H.isEmpty)(c) && Object(H.checkValidNumber)(c, "cycle"),
                    e._playOneEffect(t, i)
                }
                ,
                e.stopEffect = function(t, n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        callback: n,
                        getStates: e._getOneEffectStates({
                            soundId: t
                        }),
                        name: "Stream.stopEffect"
                    });
                    Object(H.checkValidNumber)(t, "soundId", 1, 1e4),
                    e._stopOneEffect({
                        soundId: t
                    }, i)
                }
                ,
                e.stopAllEffects = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        callback: t,
                        name: "Stream.stopAllEffect"
                    })
                      , i = !1
                      , a = 0
                      , r = 0
                      , o = function(e) {
                        i || (e ? (n(e),
                        i = !0) : a += 1,
                        a === r && (n(null),
                        i = !0))
                    };
                    for (var c in e.audioMixing.sounds) {
                        var d = e.audioMixing.sounds[c];
                        -1 !== d.soundId && (d.state !== e.audioMixing.states.BUSY && d.state !== e.audioMixing.states.PAUSED || (r++,
                        e._stopOneEffect({
                            soundId: c
                        }, o)))
                    }
                    r || n(null)
                }
                ,
                e.preloadEffect = function(t, n, i) {
                    var a = s.b.reportApiInvoke(e.sid, {
                        callback: i,
                        options: arguments,
                        tag: "tracer",
                        name: "Stream.preloadEffect"
                    });
                    Object(H.checkValidNumber)(t, "soundId", 1, 1e4),
                    Object(H.checkValidString)(n, "filePath", 1, Object(r.getParameter)("FILEPATH_LENMAX"), !1),
                    e._initSoundIfNotExists(t, n),
                    e.audioMixing.buffer[n] ? a(null) : e.loadAudioBuffer(n, n, a)
                }
                ,
                e.unloadEffect = function(t, n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        callback: n,
                        options: arguments,
                        tag: "tracer",
                        name: "Stream.unloadEffect"
                    });
                    Object(H.checkValidNumber)(t, "soundId", 1, 1e4);
                    var a = e.audioMixing.sounds[t];
                    if (!a) {
                        var r = "SOUND_NOT_EXISTS";
                        return o.default.error(r, t),
                        void i(r)
                    }
                    var c = a.options ? a.options.filePath : a.filePath;
                    if (c)
                        delete e.audioMixing.buffer[c],
                        delete e.audioMixing.sounds[t],
                        i(null);
                    else {
                        var d = "SOUND_BUFFER_NOT_FOUND";
                        o.default.error(d, t),
                        i(d)
                    }
                }
                ,
                e.pauseEffect = function(t, n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        callback: n,
                        options: arguments,
                        tag: "tracer",
                        name: "Stream.pauseEffect"
                    });
                    return e._pauseOneEffect({
                        soundId: t
                    }, i)
                }
                ,
                e.pauseAllEffects = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        callback: t,
                        name: "Stream.pauseAllEffects"
                    })
                      , i = !1
                      , a = 0
                      , r = 0
                      , o = function(e) {
                        i || (e ? (n(e),
                        i = !0) : a += 1,
                        a === r && (n(null),
                        i = !0))
                    };
                    for (var c in e.audioMixing.sounds)
                        "-1" !== c && e.audioMixing.sounds[c].state === e.audioMixing.states.BUSY && (r++,
                        e._pauseOneEffect({
                            soundId: c
                        }, o));
                    r || n(null)
                }
                ,
                e.resumeEffect = function(t, n) {
                    Object(H.checkValidNumber)(t, "soundId", 1, 1e4);
                    var i = s.b.reportApiInvoke(e.sid, {
                        callback: n,
                        options: arguments,
                        tag: "tracer",
                        name: "Stream.resumeEffect"
                    });
                    return e._resumeOneEffect({
                        soundId: t
                    }, i)
                }
                ,
                e.resumeAllEffects = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        callback: t,
                        name: "Stream.resumeAllEffects"
                    })
                      , i = !1
                      , a = 0
                      , r = 0
                      , o = function(e) {
                        i || (e ? (n(e),
                        i = !0) : a += 1,
                        a === r && (n(null),
                        i = !0))
                    };
                    for (var c in e.audioMixing.sounds)
                        "-1" !== c && e.audioMixing.sounds[c].state === e.audioMixing.states.PAUSED && (r++,
                        e._resumeOneEffect({
                            soundId: c
                        }, o));
                    r || n(null)
                }
                ,
                e.getEffectsVolume = function() {
                    var t = [];
                    for (var n in e.audioMixing.sounds) {
                        var i = e.audioMixing.sounds[n];
                        i && "-1" !== n && t.push({
                            soundId: parseInt(n),
                            volume: i.volume
                        })
                    }
                    return t
                }
                ,
                e.setEffectsVolume = function(t, n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setEffectsVolume",
                        options: arguments,
                        tag: "tracer",
                        callback: n
                    });
                    for (var a in Object(H.checkValidNumber)(t, "volume", 0, 100),
                    e.audioMixing.defaultVolume = t,
                    e.audioMixing.sounds) {
                        var r = e.audioMixing.sounds[a];
                        "-1" !== a && (r.volume = t)
                    }
                    e._flushAudioMixingMuteStatus(),
                    i(null)
                }
                ,
                e.setVolumeOfEffect = function(t, n, i) {
                    var a = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVolumeOfEffect",
                        options: arguments,
                        tag: "tracer",
                        callback: i
                    });
                    Object(H.checkValidNumber)(t, "soundId", 0, 1e4),
                    Object(H.checkValidNumber)(n, "volume", 0, 100),
                    e._initSoundIfNotExists(t),
                    e.audioMixing.sounds[t].volume = n,
                    e._flushAudioMixingMuteStatus(),
                    a(null)
                }
            }(t),
            me.addVideoEffectCapability(t),
            function(e, t) {
                e.videoConstraint = {},
                t.cameraId && (e.videoConstraint.deviceId = {
                    exact: t.cameraId
                }),
                t.facingMode && (e.videoConstraint.facingMode = t.facingMode),
                e.videoSize && (e.videoConstraint.width = e.videoSize[0],
                e.videoConstraint.height = e.videoSize[1]),
                Object(g.isLegacyChrome)() || (e.videoConstraint.frameRate = {
                    ideal: 30,
                    max: 30
                }),
                e.audioConstraint = {},
                t.microphoneId && (e.audioConstraint.deviceId = {
                    exact: t.microphoneId
                }),
                Object(g.isLegacyChrome)() || e.audioProcessing && (void 0 !== e.audioProcessing.AGC && (Object(g.isFireFox)() ? e.audioConstraint.autoGainControl = e.audioProcessing.AGC : Object(g.isChrome)() && (e.audioConstraint.googAutoGainControl = e.audioProcessing.AGC,
                e.audioConstraint.googAutoGainControl2 = e.audioProcessing.AGC)),
                void 0 !== e.audioProcessing.AEC && (e.audioConstraint.echoCancellation = e.audioProcessing.AEC),
                void 0 !== e.audioProcessing.ANS && (Object(g.isFireFox)() ? e.audioConstraint.noiseSuppression = e.audioProcessing.ANS : Object(g.isChrome)() && (e.audioConstraint.googNoiseSuppression = e.audioProcessing.ANS))),
                e.screenConstraint = {},
                t.sourceId && (e.screenConstraint.sourceId = t.sourceId),
                t.extensionId && Object(g.isChrome)() ? (e.screenConstraint.extensionId = t.extensionId,
                e.screenConstraint.mandatory = {
                    chromeMediaSource: "desktop",
                    maxWidth: e.screenAttributes.width,
                    maxHeight: e.screenAttributes.height,
                    maxFrameRate: e.screenAttributes.maxFr,
                    minFrameRate: e.screenAttributes.minFr
                }) : (e.screenConstraint.mediaSource = "screen",
                e.screenConstraint.width = e.screenAttributes.width,
                e.screenConstraint.height = e.screenAttributes.height,
                e.screenConstraint.frameRate = {
                    ideal: e.screenAttributes.maxFr,
                    max: e.screenAttributes.maxFr
                }),
                t.mediaSource && (e.screenConstraint.mediaSource = t.mediaSource),
                e.setVideoResolution = function(n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVideoResolution",
                        options: arguments,
                        tag: "tracer"
                    });
                    if (!(n instanceof Array)) {
                        var a = he(n += "");
                        return a && a.video ? (e.videoConstraint = h()(e.videoConstraint, {
                            width: {
                                ideal: a.video.width
                            },
                            height: {
                                ideal: a.video.height
                            }
                        }),
                        t.attributes.resolution = a.attributes.resolution,
                        (r = e.stream && e.stream.getVideoTracks && e.stream.getVideoTracks()[0]) && r.applyConstraints ? (o.default.debug("setVideoResolution applyConstraints", e.videoConstraint),
                        r.applyConstraints(e.videoConstraint).then(i).catch(i)) : i(),
                        !0) : (i("NO_PROFILE_".concat(n)),
                        !1)
                    }
                    var r, c = n[0], d = n[1];
                    e.videoConstraint = h()(e.videoConstraint, {
                        width: {
                            ideal: c
                        },
                        height: {
                            ideal: d
                        }
                    }),
                    t.attributes.resolution = "".concat(c, "x").concat(d),
                    (r = e.stream && e.stream.getVideoTracks && e.stream.getVideoTracks()[0]) && r.applyConstraints ? (o.default.debug("setVideoResolution applyConstraints", e.videoConstraint),
                    me.disableVideoEffect(e).then(function() {
                        return r.applyConstraints(e.videoConstraint).then(i).catch(i)
                    }).then(function() {
                        return me.restoreVideoEffect(e)
                    })) : i()
                }
                ,
                e.setVideoFrameRate = function(n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVideoFrameRate",
                        options: arguments,
                        tag: "tracer"
                    });
                    if (Object(g.isFireFox)())
                        return i("FIREFOX_NOT_SUPPORTED"),
                        !1;
                    if ("object" === Se()(n) && n instanceof Array && n.length > 1) {
                        e.videoConstraint = h()(e.videoConstraint, {
                            frameRate: {
                                ideal: n[0],
                                max: n[1]
                            }
                        }),
                        t.attributes.minFrameRate = n[0],
                        t.attributes.maxFrameRate = n[1];
                        var a = e.stream && e.stream.getVideoTracks && e.stream.getVideoTracks()[0];
                        return a && a.applyConstraints ? (o.default.debug("setVideoFrameRate applyConstraints", e.videoConstraint),
                        a.applyConstraints(e.videoConstraint).then(i).catch(i)) : i(),
                        !0
                    }
                    return i("INVALID_PARAM_".concat(JSON.stringify(n))),
                    !1
                }
                ,
                e.setVideoBitRate = function(n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVideoBitRate",
                        options: arguments,
                        tag: "tracer"
                    });
                    return "object" === Se()(n) && n instanceof Array && n.length > 1 ? (t.attributes.minVideoBW = n[0],
                    t.attributes.maxVideoBW = n[1],
                    e.connectionSpec && (e.connectionSpec.minVideoBW = n[0],
                    e.connectionSpec.maxVideoBW = n[1]),
                    e.pc && e.pc.renegotiate && e.pc.renegotiate(),
                    i(),
                    !0) : (i("INVALID_PARAM_".concat(JSON.stringify(n))),
                    !1)
                }
                ,
                e.setScreenBitRate = function(n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setScreenBitRate",
                        options: arguments,
                        tag: "tracer"
                    });
                    return "object" === Se()(n) && n instanceof Array && n.length > 1 ? (t.screenAttributes.minVideoBW = n[0],
                    t.screenAttributes.maxVideoBW = n[1],
                    i(),
                    !0) : (i("INVALID_PARAM_".concat(JSON.stringify(n))),
                    !1)
                }
                ,
                e.setScreenProfile = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setScreenProfile",
                        options: arguments,
                        tag: "tracer"
                    });
                    Object(H.checkValidEnum)(t, "profile", ["480p_1", "480p_2", "720p_1", "720p_2", "1080p_1", "1080p_2"]);
                    var i = he(t);
                    return i && i.screen ? (e.screenConstraint.mandatory ? (e.screenConstraint.mandatory.maxWidth = i.screen.width,
                    e.screenConstraint.mandatory.maxHeight = i.screen.height,
                    i.screen.frameRate && i.screen.frameRate.min && i.screen.frameRate.max && (e.screenConstraint.mandatory.minFrameRate = i.screen.frameRate.min,
                    e.screenConstraint.mandatory.maxFrameRate = i.screen.frameRate.max)) : e.screenConstraint = h()(e.screenConstraint, i.screen),
                    e.screenAttributes.width = i.screen.width,
                    e.screenAttributes.height = i.screen.height,
                    e.screenAttributes.minFr = i.screen.frameRate.min,
                    e.screenAttributes.maxFr = i.screen.frameRate.max,
                    n(),
                    !0) : (n("NO_SCREEN_PROFILE_".concat(JSON.stringify(t))),
                    !1)
                }
                ,
                e.setVideoProfileCustom = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVideoProfileCustom",
                        options: arguments,
                        tag: "tracer"
                    });
                    e.setVideoResolution(t[0]),
                    e.setVideoFrameRate([t[1], t[1]]),
                    e.setVideoBitRate([t[2], t[2]]),
                    n()
                }
                ,
                e.setVideoProfileCustomPlus = function(n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVideoProfileCustom",
                        options: arguments,
                        tag: "tracer"
                    });
                    e.setVideoResolution([n.width, n.height]),
                    t.attributes.resolution = "".concat(n.width, "x").concat(n.height),
                    e.setVideoFrameRate([n.framerate, n.framerate]),
                    e.setVideoBitRate([n.bitrate, n.bitrate]),
                    i()
                }
                ,
                e.setVideoProfile = function(n) {
                    var i = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVideoProfile",
                        options: arguments,
                        tag: "tracer"
                    })
                      , a = he(n);
                    if (!a) {
                        var r = "Invalid Profile ".concat(n);
                        throw new Error(r)
                    }
                    if (e.profile = n,
                    a && a.video) {
                        e.profile = a.profileName,
                        e.videoConstraint = h()(e.videoConstraint, a.video),
                        e.connectionSpec && a.attributes.maxVideoBW && (e.connectionSpec.minVideoBW = a.attributes.minVideoBW,
                        e.connectionSpec.maxVideoBW = a.attributes.maxVideoBW),
                        Object(g.isEdge)() && (e.videoConstraint.frameRate.max = 60),
                        Object(g.isFireFox)() && (e.videoConstraint.frameRate = {
                            ideal: 30,
                            max: 30
                        }),
                        t.attributes = h()(t.attributes, a.attributes),
                        e.pc && e.pc.renegotiate && e.pc.renegotiate();
                        var c = e.stream && e.stream.getVideoTracks && e.stream.getVideoTracks()[0];
                        return c && c.applyConstraints ? (o.default.debug("setVideoProfile applyConstraints", e.videoConstraint),
                        me.disableVideoEffect(e).then(function() {
                            return c.applyConstraints(e.videoConstraint)
                        }).then(function() {
                            return me.restoreVideoEffect(e)
                        }).then(function(t) {
                            return new Promise(function(n, a) {
                                i(t),
                                Object(F.vsResHack)(e.stream, function(t, i) {
                                    e.videoWidth = t,
                                    e.videoHeight = i,
                                    n()
                                }, function(t) {
                                    o.default.warning("[".concat(e.streamId, "] vsResHack failed: "), t),
                                    a()
                                })
                            }
                            )
                        }).catch(i)) : i(),
                        !0
                    }
                    return i("INVALID_VIDEO_PROFILE_".concat(n)),
                    !1
                }
                ,
                e.setAudioProfile = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setAudioProfile",
                        options: arguments,
                        tag: "tracer"
                    });
                    Object(H.checkValidEnum)(t, "profile", ["speech_low_quality", "speech_standard", "music_standard", "standard_stereo", "high_quality", "high_quality_stereo"]),
                    e.audioProfile = t;
                    var i = Ee(t);
                    return e.highQuality = i.highQuality,
                    e.stereo = i.stereo,
                    e.speech = i.speech,
                    e.lowQuality = i.lowQuality,
                    e.stereo && Object(g.isChrome)() && (e.audioConstraint.googAutoGainControl = !1,
                    e.audioConstraint.googAutoGainControl2 = !1,
                    e.audioConstraint.echoCancellation = !1,
                    e.audioConstraint.googNoiseSuppression = !1),
                    n(),
                    !0
                }
                ,
                e.setVideoEncoderConfiguration = function(t) {
                    Object(H.checkValidObject)(t, "config");
                    var n = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.setVideoEncoderConfiguration",
                        options: t,
                        tag: "tracer"
                    });
                    t.resolution && (Object(H.checkValidNumber)(t.resolution.width, "config.resolution.width"),
                    Object(H.checkValidNumber)(t.resolution.height, "config.resolution.height"),
                    e.setVideoResolution([t.resolution.width, t.resolution.height])),
                    t.frameRate && (Object(H.checkValidNumber)(t.frameRate.min, "config.frameRate.min"),
                    Object(H.checkValidNumber)(t.frameRate.max, "config.frameRate.max"),
                    e.setVideoFrameRate([t.frameRate.min, t.frameRate.max])),
                    t.bitrate && (Object(H.checkValidNumber)(t.bitrate.min, "config.bitrate.min", 1, 1e7),
                    Object(H.checkValidNumber)(t.bitrate.max, "config.bitrate.max", 1, 1e7),
                    e.setVideoBitRate([t.bitrate.min, t.bitrate.max])),
                    n()
                }
                ,
                e.getSupportedProfile = function(t) {
                    var n = s.b.reportApiInvoke(e.sid, {
                        name: "Stream.getSupportedProfile",
                        options: arguments,
                        tag: "tracer",
                        callback: t
                    });
                    if (!e.local) {
                        var i = "ONLY_LOCAL_STREAM_SUPPORTED";
                        return o.default.error(i),
                        n(i)
                    }
                    if (!e.stream)
                        return i = "STREAM_NOT_INIT",
                        o.default.error(i),
                        n(i);
                    if (!e.stream.getVideoTracks)
                        return i = "TRACK_NOT_SUPPORT",
                        o.default.error(i),
                        n(i);
                    var a = e.stream.getVideoTracks()[0];
                    if (!a)
                        return i = "NO_VIDEO_TRACK_FOUND",
                        o.default.error(i),
                        n(i);
                    if (!a.getCapabilities)
                        return i = "GETCAPABILITY_NOT_SUPPORT",
                        o.default.error(i),
                        n(i);
                    var r = a.getCapabilities();
                    return n(null, _e(r))
                }
            }(t, e),
            t.getId = function() {
                return t.streamId
            }
            ,
            t.getUserId = function() {
                return t.userId
            }
            ,
            t.checkDualStreamEnabled = function() {
                if (Object(r.getParameter)("DUALSTREAM_OPERATION_CHECK") && t.isDualStream) {
                    return o.default.error("Operation not permitted: ".concat("DUAL_STREAM_ENABLED")),
                    "DUAL_STREAM_ENABLED"
                }
                return !1
            }
            ,
            t.setUserId = function(e) {
                var n = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.setUserId",
                    options: arguments,
                    tag: "tracer"
                });
                t.userId && o.default.warning("[".concat(t.streamId, "] Stream.userId ").concat(t.userId, " => ").concat(e)),
                t.userId = e,
                n()
            }
            ,
            t.getAttributes = function() {
                return e.screen ? t.screenAttributes : e.attributes
            }
            ,
            t.hasAudio = function() {
                return t.audio
            }
            ,
            t.hasVideo = function() {
                return t.video
            }
            ,
            t.hasScreen = function() {
                return t.screen
            }
            ,
            t.hasScreenAudio = function() {
                return t.screenAudio
            }
            ,
            t.isVideoOn = function() {
                return (t.hasVideo() || t.hasScreen()) && !t.userMuteVideo
            }
            ,
            t.isAudioOn = function() {
                return t.hasAudio() && !t.userMuteAudio
            }
            ,
            t.init = function(i, a) {
                var r = s.b.reportApiInvoke(t.sid, {
                    callback: function(e, t) {
                        if (e)
                            return a && a(e);
                        i && i(t)
                    },
                    name: "Stream.init",
                    options: arguments,
                    tag: "tracer"
                })
                  , c = ((new Date).getTime(),
                arguments[2]);
                if (void 0 === c && (c = 2),
                !0 === t.initialized)
                    return r({
                        type: "warning",
                        msg: "STREAM_ALREADY_INITIALIZED"
                    });
                if (!0 !== t.local)
                    return r({
                        type: "warning",
                        msg: "STREAM_NOT_LOCAL"
                    });
                var d = Math.random().toString().slice(3);
                t._streamInitID = d,
                t.videoSource ? t.videoName = "videoSource" : t.video && (t.videoName = W.searchDeviceNameById(e.cameraId) || "default"),
                t.audioSource ? t.audioName = "audioSource" : t.audio && (t.audioName = W.searchDeviceNameById(e.microphoneId) || "default"),
                t.screen && (t.screenName = e.extensionId || "default");
                try {
                    if (e.audio || e.video || e.screen || e.screenAudio || e.videoSource || e.audioSource) {
                        o.default.debug("[".concat(t.streamId, "] Requested access to local media"));
                        var u = {
                            streamId: t.streamId
                        };
                        e.videoSource ? u.videoSource = e.videoSource : e.screen ? u.screen = t.screenConstraint : e.video && (u.video = t.videoConstraint),
                        e.audioSource ? u.audioSource = e.audioSource : e.screenAudio ? u.screenAudio = e.screenAudio : e.audio && (u.audio = t.audioConstraint),
                        j(u, function(i) {
                            if (u.screenAudio && !i.getAudioTracks()[0] && o.default.warning("[".concat(t.streamId, "] Audio sharing is not selected")),
                            u.screen && o.default.debug("[".concat(t.streamId, "] User has granted access to screen sharing")),
                            (u.video || u.audio) && o.default.debug("[".concat(t.streamId, "] User has granted access to local media")),
                            null === t._streamInitID) {
                                i.getTracks().forEach(function(e) {
                                    e.stop()
                                });
                                var a = {
                                    type: "error",
                                    msg: "STREAM_IS_CLOSED",
                                    info: "stream is closed and cannot be initialized"
                                };
                                return o.default.error(t.streamId, a.info),
                                void r(a)
                            }
                            if (t._streamInitID !== d) {
                                i.getTracks().forEach(function(e) {
                                    e.stop()
                                });
                                a = {
                                    type: "error",
                                    msg: "ABORT_OTHER_INIT",
                                    info: "stream initialization is aborted because of another stream.init"
                                };
                                return o.default.error(t.streamId, a.info),
                                void r(a)
                            }
                            t.dispatchEvent({
                                type: "accessAllowed"
                            }),
                            t.stream = i,
                            t.initialized = !0,
                            t.reloadDeviceName(),
                            t.hasVideo() && Object(F.vsResHack)(i, function(e, n) {
                                t.videoWidth = e,
                                t.videoHeight = n
                            }, function(e) {
                                o.default.warning("[".concat(t.streamId, "] vsResHack failed: "), e)
                            }),
                            e.screen && t.stream && t.stream.getVideoTracks()[0] && (t.stream.getVideoTracks()[0].onended = function() {
                                t.dispatchEvent({
                                    type: "stopScreenSharing"
                                })
                            }
                            ),
                            t.stream && t.stream.getTracks && t.stream.getTracks().forEach(function(e) {
                                e && !e.onended && (e.onended = n)
                            }),
                            r()
                        }, function(e) {
                            var n = {
                                type: "error",
                                info: null
                            };
                            switch (e && (n.msg = e.name || e.code || e,
                            e.message && (n.info = e.message),
                            e.code && (n.info ? n.info += ". " + e.code : n.info = " " + e.code),
                            e.constraint && (n.info ? n.info += ". Constraint: " + e.constraint : n.info = "constraint: " + e.constraint)),
                            n.msg) {
                            case "Starting video failed":
                            case "TrackStartError":
                                if (t.videoConstraint && (delete t.videoConstraint.width,
                                delete t.videoConstraint.height),
                                c > 0)
                                    return void setTimeout(function() {
                                        t.init(function(e) {
                                            return r(e)
                                        }, r, c - 1)
                                    }, 1);
                                n.msg = "MEDIA_OPTION_INVALID";
                                break;
                            case "DevicesNotFoundError":
                                n.msg = "DEVICES_NOT_FOUND";
                                break;
                            case "NotSupportedError":
                                n.msg = "NOT_SUPPORTED";
                                break;
                            case "PermissionDeniedError":
                            case "InvalidStateError":
                                n.msg = "PERMISSION_DENIED",
                                t.dispatchEvent({
                                    type: "accessDenied"
                                });
                                break;
                            case "PERMISSION_DENIED":
                            case "NotAllowedError":
                                t.dispatchEvent({
                                    type: "accessDenied"
                                });
                                break;
                            case "ConstraintNotSatisfiedError":
                                n.msg = "CONSTRAINT_NOT_SATISFIED";
                                break;
                            default:
                                n.msg || (n.msg = "UNDEFINED")
                            }
                            var i = "Media access ".concat(n.msg).concat(n.info ? ": " + n.info : "");
                            o.default.error("[".concat(t.streamId, "] "), i),
                            r(n)
                        })
                    } else
                        r({
                            type: "warning",
                            msg: "STREAM_HAS_NO_MEDIA_ATTRIBUTES"
                        })
                } catch (e) {
                    o.default.error("[".concat(t.streamId, "] Stream init: "), e),
                    r({
                        type: "error",
                        msg: e.message || e
                    })
                }
            }
            ,
            t.reloadDeviceName = function() {
                if (t.stream) {
                    if (t.stream.getVideoTracks) {
                        var e = t.stream.getVideoTracks()[0];
                        e && e.label && (t.videoName = e.label)
                    }
                    if (t.stream.getAudioTracks) {
                        var n = t.stream.getAudioTracks()[0];
                        n && n.label && (t.audioName = n.label)
                    }
                }
            }
            ,
            t.close = function() {
                var e = s.b.reportApiInvoke(null, {
                    name: "Stream.close",
                    options: arguments,
                    tag: "tracer"
                });
                if (o.default.debug("[".concat(t.streamId, "] Close stream with id"), t.streamId),
                void 0 !== t.stream) {
                    var n = t.stream.getTracks();
                    for (var i in n)
                        n.hasOwnProperty(i) && n[i].stop();
                    !t.isLowStream && t.local ? me.disableVideoEffect(t).then(function() {
                        t.stream = void 0
                    }) : (t.stream && t.stream.clean && t.stream.clean(),
                    t.stream = void 0)
                }
                Object(g.isSafari)() && t.pc && t.pc.peerConnection && t.pc.peerConnection.removeTrack && t.pc.peerConnection.getSenders && t.pc.peerConnection.getSenders().forEach(function(e) {
                    e && (o.default.debug("[".concat(t.streamId, "] Remove Track"), e),
                    t.pc.peerConnection.removeTrack(e))
                });
                t.local && (t.initialized = !1),
                t._streamInitID = null,
                t._onAudioMute = void 0,
                t._onAudioUnmute = void 0,
                t._onVideoMute = void 0,
                t._onVideoUnmute = void 0,
                t.lowStream && t.lowStream.close(),
                e()
            }
            ,
            t.enableAudio = function() {
                var e, n = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.enableAudio",
                    options: arguments,
                    tag: "tracer"
                });
                return o.default.deprecate("[".concat(t.streamId, "] Stream.enableAudio is deprecated and will be removed in the future. Use Stream.unmuteAudio instead")),
                t.userMuteAudio || o.default.warning("[".concat(t.streamId, "] User already enableAudio")),
                t.userMuteAudio = !1,
                n(null, e = !t.peerMuteAudio && t._unmuteAudio()),
                e
            }
            ,
            t.disableAudio = function() {
                var e = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.disableAudio",
                    options: arguments,
                    tag: "tracer"
                });
                o.default.deprecate("[".concat(t.streamId, "] Stream.disableAudio is deprecated and will be removed in the future. Use Stream.muteAudio instead")),
                t.userMuteAudio && o.default.warning("[".concat(t.streamId, "] User already disableAudio")),
                t.userMuteAudio = !0;
                var n = t._muteAudio();
                return e(null, n),
                n
            }
            ,
            t.enableVideo = function() {
                var e, n = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.enableVideo",
                    options: arguments,
                    tag: "tracer"
                });
                return o.default.deprecate("[".concat(t.streamId, "] Stream.enableVideo is deprecated and will be removed in the future. Use Stream.unmuteVideo instead")),
                t.userMuteVideo || o.default.warning("[".concat(t.streamId, "] User already enableVideo")),
                t.userMuteVideo = !1,
                t.lowStream && (t.lowStream.userMuteVideo = !1),
                n(null, e = !t.peerMuteVideo && t._unmuteVideo()),
                e
            }
            ,
            t.disableVideo = function() {
                var e = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.disableVideo",
                    options: arguments,
                    tag: "tracer"
                });
                o.default.deprecate("[".concat(t.streamId, "] Stream.disableVideo is deprecated and will be removed in the future. Use Stream.muteVideo instead")),
                t.userMuteVideo && o.default.warning("[".concat(t.streamId, "] User already disableVideo")),
                t.userMuteVideo = !0,
                t.lowStream && (t.lowStream.userMuteVideo = !0);
                var n = t._muteVideo();
                return e(null, n),
                n
            }
            ,
            t.unmuteAudio = function() {
                var e, n = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.unmuteAudio",
                    options: arguments,
                    tag: "tracer"
                });
                return t.userMuteAudio || o.default.warning("[".concat(t.streamId, "] User already unmuteAudio")),
                t.userMuteAudio = !1,
                n(null, e = !t.peerMuteAudio && t._unmuteAudio()),
                e
            }
            ,
            t.muteAudio = function() {
                var e = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.muteAudio",
                    options: arguments,
                    tag: "tracer"
                });
                t.userMuteAudio && o.default.warning("[".concat(t.streamId, "] User already muteAudio")),
                t.userMuteAudio = !0;
                var n = t._muteAudio();
                return e(null, n),
                n
            }
            ,
            t.unmuteVideo = function() {
                var e, n = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.unmuteVideo",
                    options: arguments,
                    tag: "tracer"
                });
                return t.userMuteVideo || o.default.warning("[".concat(t.streamId, "] User already unmuteVideo")),
                t.userMuteVideo = !1,
                t.lowStream && (t.lowStream.userMuteVideo = !1),
                n(null, e = !t.peerMuteVideo && t._unmuteVideo()),
                e
            }
            ,
            t.muteVideo = function() {
                var e = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.muteVideo",
                    options: arguments,
                    tag: "tracer"
                });
                t.userMuteVideo && o.default.warning("[".concat(t.streamId, "] User already muteVideo")),
                t.userMuteVideo = !0,
                t.lowStream && (t.lowStream.userMuteVideo = !0);
                var n = t._muteVideo();
                return e(null, n),
                n
            }
            ,
            t._unmuteAudio = function() {
                return o.default.debug("[".concat(t.streamId, "] Unmuted audio stream with id "), t.streamId),
                t._flushAudioMixingMuteStatus(!1),
                !(!t.hasAudio() || !t.initialized || void 0 === t.stream || !0 === t.stream.getAudioTracks()[0].enabled) && (t._onAudioUnmute && t._onAudioUnmute(),
                t.pc && (t.pc.isAudioMute = !1),
                t.stream.getAudioTracks()[0].enabled = !0,
                !0)
            }
            ,
            t._isAudioMuted = function() {
                if (t.stream && t.hasAudio()) {
                    var e = t.stream.getAudioTracks();
                    return e.length > 0 && !e[0].enabled
                }
                return !1
            }
            ,
            t._isVideoMuted = function() {
                if (t.stream && t.hasVideo()) {
                    var e = t.stream.getVideoTracks();
                    return e.length > 0 && !e[0].enabled
                }
                return !1
            }
            ,
            t._muteAudio = function() {
                return o.default.debug("[".concat(t.streamId, "] Muted audio stream with id "), t.streamId),
                t._flushAudioMixingMuteStatus(!0),
                !!(t.hasAudio() && t.initialized && void 0 !== t.stream && t.stream.getAudioTracks()[0].enabled) && (t._onAudioMute && t._onAudioMute(),
                t.pc && (t.pc.isAudioMute = !0),
                t.stream.getAudioTracks()[0].enabled = !1,
                t.sid && s.b.audioSendingStopped(t.sid, {
                    succ: !0,
                    reason: "muteAudio"
                }),
                !0)
            }
            ,
            t._unmuteVideo = function() {
                return o.default.debug("[".concat(t.streamId, "] Unmuted video stream with id"), t.streamId),
                !(!t.initialized || void 0 === t.stream || !t.stream.getVideoTracks().length || !0 === t.stream.getVideoTracks()[0].enabled) && (t._onVideoUnmute && t._onVideoUnmute(),
                t.pc && (t.pc.isVideoMute = !1),
                t.stream.getVideoTracks()[0].enabled = !0,
                t.lowStream && t.lowStream._unmuteVideo(),
                !0)
            }
            ,
            t._muteVideo = function() {
                return o.default.debug("[".concat(t.streamId, "] Muted video stream with id"), t.streamId),
                !!(t.initialized && void 0 !== t.stream && t.stream.getVideoTracks().length && t.stream.getVideoTracks()[0].enabled) && (t._onVideoMute && t._onVideoMute(),
                t.pc && (t.pc.isVideoMute = !0),
                t.stream.getVideoTracks()[0].enabled = !1,
                t.lowStream && t.lowStream._muteVideo(),
                t.sid && s.b.videoSendingStopped(t.sid, {
                    succ: !0,
                    reason: "muteVideo"
                }),
                !0)
            }
            ,
            t.addTrack = function(i) {
                var a = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.addTrack",
                    options: arguments,
                    tag: "tracer"
                });
                if (t.pc && t.pc.addTrack(i, t.stream),
                "audio" == i.kind) {
                    t._cleanupAudioMixing();
                    var r = new MediaStream;
                    t.userMuteAudio && (i.enabled = !1),
                    r.addTrack(i);
                    var o = t.stream.getVideoTracks()[0];
                    o && r.addTrack(o),
                    t.audio = !0,
                    e.audio = !0,
                    t.stream = r,
                    t.audioLevelHelper = null,
                    t.player && t.player.video && (t.player.video.srcObject = t.stream)
                } else
                    t.userMuteVideo && (i.enabled = !1),
                    t.stream.addTrack(i),
                    t.video = !0,
                    e.video = !0;
                i.onended || (i.onended = n),
                a()
            }
            ,
            t.removeTrack = function(n) {
                var i = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.removeTrack",
                    options: arguments,
                    tag: "tracer"
                });
                t.pc && t.pc.removeTrack(n, t.stream),
                t.stream.removeTrack(n),
                t._cleanupAudioMixing(),
                "audio" === n.kind ? (t.audio = !1,
                e.audio = !1) : (t.video = !1,
                e.video = !1),
                t.audioLevelHelper = null,
                "live" == n.readyState && (n.stop(),
                o.default.debug("[".concat(t.streamId, "] Track ").concat(n.kind, " Stopped"))),
                i()
            }
            ,
            t.setAudioOutput = function(e, n, i) {
                var a = s.b.reportApiInvoke(t.sid, {
                    callback: function(e, t) {
                        if (e)
                            return i && i(e);
                        n && n(t)
                    },
                    name: "Stream.setAudioOutput",
                    options: arguments,
                    tag: "tracer"
                });
                return Object(H.isValidString)(e, 1, 255) ? (t.audioOutput = e,
                t.player ? void t.player.setAudioOutput(e, function() {
                    return a()
                }, a) : a()) : (o.default.error("[".concat(t.streamId, "] setAudioOutput Invalid Parameter"), e),
                a(I.default.INVALID_PARAMETER))
            }
            ,
            t.play = function(e, n, i) {
                "function" == typeof n && (i = n,
                n = null),
                o.default.debug("[".concat(t.streamId, "] play()."), e, n);
                var a = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.play",
                    options: arguments,
                    tag: "tracer",
                    callback: i
                });
                if (Object(H.checkValidString)(e, "elementID"),
                Object(H.isEmpty)(n) || (Object(H.isEmpty)(n.fit) || Object(H.checkValidEnum)(n.fit, "fit", ["cover", "contain"]),
                Object(H.isEmpty)(n.muted) || Object(H.checkValidBoolean)(n.muted, "muted")),
                t.player)
                    o.default.warning("[".concat(t.streamId, "] Stream.play(): Stream is already playing. Fallback to resume stream")),
                    t.resume().then(function() {
                        a(null)
                    }).catch(a);
                else {
                    t.elementID = e,
                    t.playOptions = n,
                    !t.local || t.video || t.screen ? (t.player = new y({
                        id: t.getId(),
                        stream: t,
                        elementID: e,
                        options: n
                    }),
                    t.local && me.applyEffectInPlayer(t)) : t.hasAudio() && (t.player = new y({
                        id: t.getId(),
                        stream: t,
                        elementID: e,
                        options: n
                    }));
                    var r = {
                        video: null,
                        audio: null
                    };
                    t.on("player-status-change", function e(n) {
                        if (r[n.mediaType] = n,
                        r.video && r.audio)
                            if (t.removeEventListener("player-status-change", e),
                            r.video.isErrorState || r.audio.isErrorState) {
                                var i = r.video.isErrorState ? r.video : r.audio;
                                a({
                                    isErrorState: !0,
                                    status: i.status,
                                    reason: i.reason,
                                    video: r.video,
                                    audio: r.audio
                                })
                            } else
                                "aborted" === r.video.status && "aborted" === r.audio.status ? a({
                                    status: "aborted",
                                    reason: "stop",
                                    video: r.video,
                                    audio: r.audio
                                }) : a(null)
                    }),
                    t.audioOutput && t.player.setAudioOutput(t.audioOutput),
                    void 0 !== t.audioLevel && t.player.setAudioVolume(t.audioLevel),
                    t._flushAudioMixingMuteStatus(!1)
                }
            }
            ,
            t.stop = function() {
                var e = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.stop",
                    options: arguments,
                    tag: "tracer"
                });
                o.default.debug("[".concat(t.streamId, "] Stop stream player with id "), t.streamId),
                t.player ? (me.removeEffectFromLocalPlayer(t),
                t.player.destroy(),
                delete t.player) : o.default.error("[".concat(t.streamId, "] Stream.stop(): Stream is not playing")),
                t._flushAudioMixingMuteStatus(!0),
                e()
            }
            ,
            t.isPlaying = function() {
                return !!t.player
            }
            ,
            t.isPaused = function() {
                return !!t.player && (!!(t.player.video && t.player.video.paused && t.player.mediaElemExists(t.player.video)) || !!(t.player.audio && t.player.audio.paused && t.player.mediaElemExists(t.player.audio)))
            }
            ,
            t.resume = function() {
                var e, n;
                return t.player ? (t.player.video && t.player.video.play && (e = t.player.video.play()),
                e = e || Promise.resolve(),
                t.player.audio && t.player.audio.play && (n = t.player.audio.play()),
                n = n || Promise.resolve(),
                Promise.all([e, n])) : Promise.reject("NO_PLAYER_FOUND")
            }
            ,
            t.getVideoTrack = function() {
                var e = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.getVideoTrack",
                    options: arguments,
                    tag: "tracer"
                });
                if (t.stream && t.stream.getVideoTracks) {
                    var n = t.stream.getVideoTracks()[0];
                    if (n)
                        return o.default.info("[".concat(t.streamId, "] getVideoTrack"), n),
                        e(),
                        n
                }
                o.default.info("[".concat(t.streamId, "] getVideoTrack None")),
                e(null, "getVideoTrack None")
            }
            ,
            t.getAudioTrack = function() {
                var e = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.getAudioTrack",
                    options: arguments,
                    tag: "tracer"
                });
                if (t.stream && t.stream.getAudioTracks) {
                    var n = t.stream.getAudioTracks()[0];
                    if (n)
                        return o.default.info("[".concat(t.streamId, "] getAudioTracks"), n),
                        e(),
                        n
                }
                o.default.info("[".concat(t.streamId, "] getAudioTracks None")),
                e(null, "getAudioTracks None")
            }
            ,
            t._hasVideoTracks = function() {
                return !!(t.stream && t.stream.getVideoTracks && t.stream.getVideoTracks()[0])
            }
            ,
            t._hasAudioTracks = function() {
                return !!(t.stream && t.stream.getAudioTracks && t.stream.getAudioTracks()[0])
            }
            ,
            t._replaceMediaStreamTrack = function(e, n, i) {
                if (t.stream) {
                    if ("video" == e.kind) {
                        if (r = t.stream.getVideoTracks()[0])
                            return t.userMuteVideo && (e.enabled = !1),
                            t.stream.removeTrack(r),
                            t.stream.addTrack(e),
                            o.default.debug("[".concat(t.streamId, "] _replaceMediaStreamTrack ").concat(e.kind, " SUCCESS")),
                            "live" == r.readyState && (r.stop(),
                            o.default.debug("[".concat(t.streamId, "] Track ").concat(r.kind, " Stopped"))),
                            n && n();
                        var a = "MEDIASTREAM_TRACK_NOT_FOUND";
                        return o.default.error("[".concat(t.streamId, "] MEDIASTREAM_TRACK_NOT_FOUND ").concat(e.kind)),
                        i(a)
                    }
                    if ("audio" == e.kind) {
                        var r;
                        if (r = t.stream.getAudioTracks()[0]) {
                            t.userMuteAudio && (e.enabled = !1);
                            var s = new MediaStream;
                            s.addTrack(e);
                            var c = t.stream && t.stream.getVideoTracks()[0];
                            return c && s.addTrack(c),
                            t.stream = s,
                            t.audioLevelHelper = null,
                            t.player && t.player.video && (t.player.video.srcObject = t.stream),
                            o.default.debug("[".concat(t.streamId, "] _replaceMediaStreamTrack SUCCESS")),
                            "live" == r.readyState && (r.stop(),
                            o.default.debug("[".concat(t.streamId, "] Track ").concat(r.kind, " Stopped"))),
                            n && n()
                        }
                        a = "MEDIASTREAM_TRACK_NOT_FOUND";
                        return o.default.error("[".concat(t.streamId, "] MEDIASTREAM_TRACK_NOT_FOUND ").concat(e.kind)),
                        i(a)
                    }
                    a = "INVALID_TRACK_TYPE";
                    return o.default.error("[".concat(t.streamId, "] _replaceMediaStreamTrack ").concat(a, " ").concat(e.kind)),
                    i && i(a)
                }
                a = "NO_STREAM_FOUND";
                return o.default.error("[".concat(t.streamId, "] _replaceMediaStreamTrack ").concat(a)),
                i && i(a)
            }
            ,
            t.replaceTrack = function(e, i, a) {
                var r = s.b.reportApiInvoke(t.sid, {
                    callback: function(e, t) {
                        if (e)
                            return a && a(e);
                        i && i(t)
                    },
                    name: "Stream.replaceTrack",
                    options: arguments,
                    tag: "tracer"
                });
                return e && e.kind ? (t._cleanupAudioMixing(),
                e.onended || (e.onended = n),
                t.pc && t.pc.hasSender && t.pc.hasSender(e.kind) ? void t.pc.replaceTrack(e, function() {
                    return o.default.debug("[".concat(t.streamId, "] PeerConnection.replaceTrack ").concat(e.kind, " SUCCESS")),
                    t._replaceMediaStreamTrack(e, function(e) {
                        return r(null, e)
                    }, r)
                }, function(n) {
                    return o.default.error("[".concat(t.streamId, "] PeerConnection.replaceTrack ").concat(e.kind, " Failed ").concat(n)),
                    r(n)
                }) : t._replaceMediaStreamTrack(e, function(e) {
                    return r(null, e)
                }, r)) : r("INVALID_TRACK")
            }
            ,
            t.setAudioVolume = function(e) {
                var n = s.b.reportApiInvoke(t.sid, {
                    name: "Stream.setAudioVolume",
                    options: arguments,
                    tag: "tracer"
                });
                Object(H.checkValidNumber)(e, "level", 0, 100),
                t.audioLevel = e,
                t.player && t.player.setAudioVolume(e),
                n()
            }
            ,
            t.getStats = function(e, n, i) {
                var a = [];
                a.push(t._getPCStats(i)),
                a.push(new Promise(function(e) {
                    var n = {};
                    t.pc && t.pc.isSubscriber ? null !== window.navigator.userAgent.match("Firefox") && (B(n, "videoReceiveResolutionHeight", t.videoHeight),
                    B(n, "videoReceiveResolutionWidth", t.videoWidth)) : t.pc && !t.pc.isSubscriber && ((Object(g.isSafari)() || Object(g.isFireFox)()) && (B(n, "videoSendResolutionHeight", t.videoHeight),
                    B(n, "videoSendResolutionWidth", t.videoWidth)),
                    (Object(g.isSafari)() || Object(g.isFireFox)()) && t.uplinkStats && B(n, "videoSendPacketsLost", t.uplinkStats.uplink_cumulative_lost)),
                    e(n)
                }
                )),
                a.push(new Promise(function(e) {
                    var n = {};
                    return t.traffic_stats && t.pc && t.pc.isSubscriber ? (B(n, "accessDelay", t.traffic_stats.access_delay),
                    B(n, "endToEndDelay", t.traffic_stats.e2e_delay),
                    B(n, "videoReceiveDelay", t.traffic_stats.video_delay),
                    B(n, "audioReceiveDelay", t.traffic_stats.audio_delay)) : t.traffic_stats && t.pc && !t.pc.isSubscriber && B(n, "accessDelay", t.traffic_stats.access_delay),
                    e(n)
                }
                )),
                Promise.all(a).then(function(n) {
                    for (var i = {}, a = n.length - 1; a >= 0; a--) {
                        var r = n[a];
                        h()(i, r)
                    }
                    e && setTimeout(e.bind(t, i), 0)
                }).catch(function(e) {
                    n && setTimeout(n.bind(t, e), 0)
                })
            }
            ,
            t._getPCStats = function(e) {
                return new Promise(function(n, i) {
                    if (!t.pc || "established" !== t.pc.state || !t.pc.getStats) {
                        return i("PEER_CONNECTION_NOT_ESTABLISHED")
                    }
                    t.pc.getStats(function(e) {
                        if (!t.pc || "established" !== t.pc.state || !t.pc.getStats) {
                            return i("PEER_CONNECTION_STATE_CHANGE")
                        }
                        var a = t.pc.isSubscriber ? function(e) {
                            var t = {};
                            return e.forEach(function(e) {
                                e.id && e.type && (-1 === e.id.indexOf("recv") && -1 === e.type.toLowerCase().indexOf("inbound") && -1 === e.id.indexOf("inbound_rtp") && -1 === e.id.indexOf("inbound-rtp") && -1 === e.id.indexOf("InboundRTP") || ("audio" === e.mediaType ? (B(t, "audioReceiveBytes", e.bytesReceived),
                                B(t, "audioReceivePackets", e.packetsReceived),
                                B(t, "audioReceivePacketsLost", e.packetsLost)) : (B(t, "videoReceiveBytes", e.bytesReceived),
                                B(t, "videoReceivePacketsLost", e.packetsLost),
                                B(t, "videoReceivePackets", e.packetsReceived),
                                B(t, "videoReceiveFrameRate", e.googFrameRateReceived),
                                B(t, "videoReceiveDecodeFrameRate", e.googFrameRateDecoded),
                                B(t, "videoReceiveResolutionWidth", e.googFrameWidthReceived),
                                B(t, "videoReceiveResolutionHeight", e.googFrameHeightReceived))))
                            }),
                            t
                        }(e) : function(e) {
                            var t = {};
                            return e.forEach(function(e) {
                                e.id && e.type && (-1 === e.id.indexOf("send") && -1 === e.type.toLowerCase().indexOf("outbound") && -1 === e.id.indexOf("outbound_rtp") && -1 === e.id.indexOf("OutboundRTP") || ("audio" === e.mediaType ? (B(t, "audioSendBytes", e.bytesSent),
                                B(t, "audioSendPackets", e.packetsSent),
                                B(t, "audioSendPacketsLost", e.packetsLost)) : (B(t, "videoSendBytes", e.bytesSent),
                                B(t, "videoSendPackets", e.packetsSent),
                                B(t, "videoSendPacketsLost", e.packetsLost),
                                B(t, "videoSendFrameRate", e.googFrameRateSent),
                                B(t, "videoSendResolutionWidth", e.googFrameWidthSent),
                                B(t, "videoSendResolutionHeight", e.googFrameHeightSent))))
                            }),
                            t
                        }(e);
                        return n(a)
                    }, e)
                }
                ).then(function(e) {
                    return t.pc.isSubscriber ? (Object(g.isFireFox)() || Object(g.isSafari)()) && (e.videoReceiveResolutionHeight && "0" !== e.videoReceiveResolutionHeight || e.videoReceiveResolutionWidth && "0" !== e.videoReceiveResolutionWidth || (B(e, "videoReceiveResolutionHeight", t.videoHeight),
                    B(e, "videoReceiveResolutionWidth", t.videoWidth))) : ((Object(g.isSafari)() || Object(g.isFireFox)()) && (e.videoSendResolutionHeight && "0" !== e.videoSendResolutionHeight || e.videoSendResolutionWidth && "0" !== e.videoSendResolutionWidth || (B(e, "videoSendResolutionHeight", t.videoHeight),
                    B(e, "videoSendResolutionWidth", t.videoWidth))),
                    (Object(g.isSafari)() || Object(g.isFireFox)()) && t.uplinkStats && B(e, "videoSendPacketsLost", t.uplinkStats.uplink_cumulative_lost)),
                    Promise.resolve(e)
                })
            }
            ,
            t.getAudioLevel = function() {
                if (t.audioLevelHelper)
                    return t.audioLevelHelper.getAudioLevel();
                if (t.stream) {
                    if (0 !== t.stream.getAudioTracks().length)
                        return t.audioLevelHelper = new F.audioLevelHelper(t.stream),
                        t.audioLevelHelper.getAudioLevel();
                    o.default.warning("[".concat(t.streamId, "] can't get audioLevel beacuse no audio trace in stream"))
                } else
                    o.default.warning("[".concat(t.streamId, "] can't get audioLevel beacuse no stream exist"))
            }
            ,
            t.setVideoProfile("480p_1"),
            t._switchVideoDevice = function(e, n, i) {
                if (e === t.cameraId)
                    return n && n();
                var a = {
                    video: h()({}, t.videoConstraint, {
                        deviceId: {
                            exact: e
                        }
                    }),
                    audio: !1
                };
                o.default.debug("[".concat(t.streamId, "] ").concat(a)),
                j(a, function(a) {
                    try {
                        var r = function() {
                            t.isPlaying() && (t.stop(),
                            t.elementID && t.play(t.elementID, t.playOptions)),
                            t.cameraId = e,
                            t.videoConstraint.deviceId = {
                                exact: e
                            },
                            t.userMuteVideo && (t.stream.getVideoTracks()[0].enabled = !1),
                            me.restoreVideoEffect(t),
                            n && n()
                        };
                        me.disableVideoEffect(t).then(function() {
                            Object(g.isSafari)() ? t.replaceTrack(a.getVideoTracks()[0], r, i) : (t.removeTrack(t.stream.getVideoTracks()[0]),
                            t.addTrack(a.getVideoTracks()[0]),
                            r())
                        })
                    } catch (e) {
                        return i && i(e)
                    }
                }, function(e) {
                    return i && i(e)
                })
            }
            ,
            t._switchAudioDevice = function(e, n, i) {
                if (e === t.microphoneId)
                    return n && n();
                var a = {
                    video: !1,
                    audio: h()({}, t.audioConstraint, {
                        deviceId: {
                            exact: e
                        }
                    })
                };
                o.default.debug("[".concat(t.streamId, "] "), a),
                j(a, function(a) {
                    var r = function() {
                        t._cleanupAudioMixing(),
                        t.userMuteAudio && (t.stream.getAudioTracks()[0].enabled = !1),
                        t.isPlaying() && (t.stop(),
                        t.elementID && t.play(t.elementID)),
                        t.microphoneId = e,
                        t.audioConstraint.deviceId = {
                            exact: e
                        },
                        n && n()
                    };
                    try {
                        Object(g.isSafari)() ? t.replaceTrack(a.getAudioTracks()[0], r, i) : (t.removeTrack(t.stream.getAudioTracks()[0]),
                        t.addTrack(a.getAudioTracks()[0]),
                        r())
                    } catch (e) {
                        return i && i(e)
                    }
                }, function(e) {
                    return i && i(e)
                })
            }
            ,
            t.switchDevice = function(e, n, i, a) {
                var r = s.b.reportApiInvoke(t.sid, {
                    callback: function(e, t) {
                        if (e)
                            return a && a(e);
                        i && i(t)
                    },
                    name: "Stream.switchDevice",
                    options: arguments,
                    tag: "tracer"
                });
                Object(H.checkValidString)(n, "deviceId");
                var c = function() {
                    return t.inSwitchDevice = !1,
                    r()
                }
                  , d = function(e) {
                    t.inSwitchDevice = !1,
                    o.default.error("[".concat(t.streamId, "] "), e),
                    r(e)
                };
                if (t.inSwitchDevice)
                    return r("Device switch is in process.");
                if (t.inSwitchDevice = !0,
                !t.local)
                    return d("Only the local stream can switch the device.");
                if (t.screen && "video" === e)
                    return d("The device cannot be switched during screen-sharing.");
                if (!t.video && "video" === e)
                    return d("Video track not exist.");
                if (!t.audio && "audio" === e)
                    return d("Audio track not exist.");
                if (t.videoSource || t.audioSource)
                    return d("The device cannot be switched when using videoSource or audioSource.");
                var u = !1;
                for (var l in t.audioMixing.sounds) {
                    if (t.audioMixing.sounds[l].state !== t.audioMixing.states.IDLE) {
                        u = !0;
                        break
                    }
                }
                if (t.audioMixing.audioContextInited && u)
                    return d("The device cannot be switched when using audio Mixing.");
                W.getDeviceById(n, function() {
                    if ("video" === e)
                        t._switchVideoDevice(n, c, d);
                    else {
                        if ("audio" !== e)
                            return d("Invalid type.");
                        t._switchAudioDevice(n, c, d)
                    }
                }, function() {
                    return d("The device does not exist.")
                })
            }
            ,
            t
        }
          , Te = a(21)
          , ye = a(8)
          , be = a.n(ye)
          , Re = ["live", "rtc", "web", "interop", "h264_interop", "web-only"]
          , Ae = ["vp8", "h264"]
          , Ce = ["aes-128-xts", "aes-256-xts", "aes-128-ecb"]
          , Oe = a(17)
          , Ne = a.n(Oe)
          , we = function(e) {
            e && e.apply(this, [].slice.call(arguments, 1))
        }
          , ke = a(12)
          , De = function(e) {
            var t = c(e);
            t.needReconnect = !0,
            t.isTimeout = !1,
            t.isInit = !0,
            t.sendbytes = 0,
            t.recvbytes = 0,
            t.startTime = Date.now(),
            t.lastMsgTime = null,
            t.clientId = e.clientId,
            t.hostIndex = 0,
            t.requestID = 0,
            e.host instanceof Array ? t.host = e.host : t.host = [e.host],
            t.getSendBytes = function() {
                return t.sendbytes
            }
            ,
            t.getRecvBytes = function() {
                return t.recvbytes
            }
            ,
            t.getDuration = function() {
                return Math.ceil((Date.now() - t.startTime) / 1e3)
            }
            ,
            t.getURL = function() {
                return t.connection.url
            }
            ,
            t.reconnect = function() {
                t.isInit = !0,
                t.creatConnection()
            }
            ,
            t.connectNext = function() {
                t.isInit = !0,
                ++t.hostIndex,
                o.default.debug("[" + t.clientId + "] Gateway length:" + t.host.length + " current index:" + t.hostIndex),
                t.hostIndex >= t.host.length ? t.dispatchEvent(f({
                    type: "recover"
                })) : t.creatConnection()
            }
            ,
            t.replaceHost = function(e) {
                t.host = e || t.host,
                t.hostIndex = 0,
                t.creatConnection()
            }
            ,
            t.creatConnection = function() {
                if (t.needReconnect = !0,
                o.default.debug("[" + t.clientId + "] start connect:" + t.host[t.hostIndex]),
                t.lts = (new Date).getTime(),
                t.connection = new WebSocket("wss://" + t.host[t.hostIndex]),
                t.connection.binaryType = "arraybuffer",
                t.turnConfig = {},
                t.connection.url) {
                    var n = t.connection.url.match(/wss\:\/\/([^:]+):(\d+)/)
                      , i = t.host[t.hostIndex].split(":")
                      , a = t.connection.url.match(/h=([^:]+)&p=(\d+)/);
                    n ? (t.turnConfig.url = n[1],
                    Object(r.getParameter)("TURN_ENABLE_TCP") && (t.turnConfig.tcpport = parseInt(n[2]) + 30),
                    Object(r.getParameter)("TURN_ENABLE_UDP") && (t.turnConfig.udpport = parseInt(n[2]) + 30)) : a ? (t.turnConfig.url = a[1],
                    Object(r.getParameter)("TURN_ENABLE_TCP") && (t.turnConfig.tcpport = parseInt(a[2]) + 30),
                    Object(r.getParameter)("TURN_ENABLE_UDP") && (t.turnConfig.udpport = parseInt(a[2]) + 30)) : i && (t.turnConfig.url = i[0],
                    Object(r.getParameter)("TURN_ENABLE_TCP") && (t.turnConfig.tcpport = parseInt(i[1]) + 30),
                    Object(r.getParameter)("TURN_ENABLE_UDP") && (t.turnConfig.udpport = parseInt(i[1]) + 30))
                }
                t.connection.onopen = function(e) {
                    o.default.debug("[" + t.clientId + "] websockect opened: " + t.host[t.hostIndex]),
                    t.needReconnect = !0,
                    t.isTimeout = !1,
                    t.isInit = !1,
                    t.sendbytes = 0,
                    t.recvbytes = 0,
                    t.startTime = Date.now(),
                    Object(ke.resetHTTPByetsCount)(),
                    clearTimeout(t.timeoutCheck),
                    t.dispatchEvent(f({
                        type: "onopen",
                        event: e,
                        socket: t
                    }))
                }
                ,
                t.connection.onmessage = function(e) {
                    if (e.data instanceof ArrayBuffer)
                        t.dispatchEvent({
                            type: "onBinaryData",
                            data: e.data
                        });
                    else {
                        t.recvbytes += Object(F.lengthInUtf8Bytes)(e.data);
                        var n = JSON.parse(e.data);
                        t.lastMsgTime = Date.now(),
                        n.hasOwnProperty("_id") ? t.dispatchEvent(f({
                            type: n._id,
                            msg: n
                        })) : n.hasOwnProperty("_type") && t.dispatchSocketEvent(f({
                            type: n._type,
                            msg: n._message
                        }))
                    }
                }
                ,
                t.connection.onclose = function(n) {
                    t.needReconnect ? t.isTimeout || t.isInit ? (o.default.debug("[" + t.clientId + "] websockect connect timeout"),
                    s.b.joinGateway(e.sid, {
                        lts: t.lts,
                        succ: !1,
                        ec: "timeout",
                        addr: t.connection.url
                    }),
                    t.connectNext()) : (t.dispatchEvent(f({
                        type: "disconnect",
                        event: n
                    })),
                    t.requests && t.requests instanceof Array && (t.requests.map(function(e) {
                        e.callback("REQUEST_ABORT")
                    }),
                    t.requests = [])) : (o.default.debug("[" + t.clientId + "] websockect closeed"),
                    we(e.onFailure, n),
                    clearTimeout(t.timeoutCheck),
                    t.dispatchEvent(f({
                        type: "close",
                        event: n
                    })),
                    t.connection.onopen = void 0,
                    t.connection.onclose = void 0,
                    t.connection.onerror = void 0,
                    t.connection.onmessage = void 0,
                    t.connection = void 0)
                }
                ,
                t.connection.onerror = function(e) {}
                ,
                setTimeout(function() {
                    t.connection && t.connection.readyState != WebSocket.OPEN && (t.isTimeout = !0,
                    t.connection.close())
                }, 5e3)
            }
            ,
            t.creatConnection(),
            t.sendMessage = function(e, n) {
                if (t.connection && t.connection.readyState == WebSocket.OPEN) {
                    var i = JSON.stringify(e);
                    t.sendbytes += Object(F.lengthInUtf8Bytes)(i),
                    t.connection.send(i)
                } else
                    n({
                        error: "Gateway not connected"
                    })
            }
            ,
            t.disconnect = function() {
                t.needReconnect = !0,
                t.connection.close()
            }
            ,
            t.close = function() {
                t.needReconnect = !1,
                t.connection.onclose = void 0,
                t.connection.close(),
                t.requests && t.requests instanceof Array && (t.requests.map(function(e) {
                    e.callback("REQUEST_ABORT")
                }),
                t.requests = [])
            }
            ,
            t.sendSignalCommand = function(e, n) {
                e._id = "_request_" + t.requestID,
                t.requestID += 1,
                "publish_stats" !== e._type && "subscribe_stats" !== e._type && "publish_stats_low" !== e._type && t.on(e._id, function(i) {
                    i.msg && n && n(i.msg._result, i.msg.message),
                    delete t.dispatcher.eventListeners[e._id]
                }),
                t.sendMessage(e, function(e) {
                    e.reason = "NOT_CONNECTED",
                    n && n(e.reason, e)
                })
            }
            ,
            t.requests = [];
            var n = function(e) {
                var n = t.requests.findIndex(function(t) {
                    return t.id === e.type
                });
                if (n >= 0)
                    var i = t.requests.splice(n, 1)[0];
                i && t.dispatcher.eventListeners[e.type] ? (delete t.dispatcher.eventListeners[e.type],
                e.msg && i.callback && i.callback(e.msg._result, e.msg._message)) : o.default.warning("Detached Response", e.type, e.msg)
            };
            return t.sendRequest = function(e, i) {
                e = h()({
                    _id: "_request_" + t.requestID
                }, e),
                t.requestID += 1;
                var a = {
                    id: e._id,
                    timeoutCounter: 0,
                    stalledAt: Date.now(),
                    message: e,
                    callback: i
                };
                t.requests.push(a),
                t.addEventListener(e._id, n),
                t.sendMessage(e, function(e) {
                    var n = this
                      , i = t.requests.findIndex(function(e) {
                        return e.id === n.id
                    });
                    i >= 0 && (n = t.requests.splice(i, 1)[0]),
                    n && t.dispatcher.eventListeners[e.type] ? (delete t.dispatcher.eventListeners[e.type],
                    e.reason = "NOT_CONNECTED",
                    n.callback && n.callback(e.reason, e)) : o.default.warning("handleSendError", n)
                }
                .bind(a))
            }
            ,
            t.checkRequestTimeout = function() {
                for (var e = Math.ceil(Object(r.getParameter)("SIGNAL_REQUEST_TIMEOUT") / Object(r.getParameter)("SIGNAL_REQUEST_WATCH_INTERVAL")), n = t.requests.length - 1; n >= 0; n--) {
                    var i = t.requests[n];
                    i.timeoutCounter >= e ? (t.requests.splice(n, 1),
                    o.default.error("Request Timeout", i.timeoutCounter, i.message),
                    i.callback && i.callback("TIMEOUT")) : i.timeoutCounter++
                }
            }
            ,
            clearInterval(t.requestTimer),
            t.requestTimer = setInterval(t.checkRequestTimeout, Object(r.getParameter)("SIGNAL_REQUEST_WATCH_INTERVAL")),
            t.sendReport = function(e) {
                t.sendMessage(e, function() {})
            }
            ,
            t
        }
          , Le = function(e, t) {
            var n = {
                connect: function() {
                    t.host = e,
                    n.signal = De(t),
                    n.on = n.signal.on,
                    n.dispatchEvent = n.signal.dispatchEvent,
                    n.signal.on("onopen", function(e) {
                        n.signal.onEvent = function(e) {
                            n.dispatchEvent(f({
                                type: e.event,
                                msg: e
                            }))
                        }
                        ,
                        n.dispatchEvent(f({
                            type: "connect",
                            msg: e
                        }))
                    }),
                    n.signal.on("onError", function(e) {
                        var t = e.msg;
                        onError(t.code, "error")
                    })
                },
                getLastMsgTime: function() {
                    return n.signal && n.signal.lastMsgTime
                },
                getSendBytes: function() {
                    return n.signal.getSendBytes()
                },
                getRecvBytes: function() {
                    return n.signal.getRecvBytes()
                },
                getDuration: function() {
                    return n.signal.getDuration()
                },
                disconnect: function() {
                    n.signal.disconnect()
                },
                close: function() {
                    n.signal.close()
                },
                getURL: function() {
                    return n.signal.getURL()
                },
                reconnect: function() {
                    n.signal.reconnect()
                },
                connectNext: function() {
                    n.signal.connectNext()
                },
                replaceHost: function(e) {
                    n.signal.replaceHost(e)
                },
                emitSimpleMessage: function(e, t) {
                    n.signal.sendSignalCommand(e, t)
                },
                emitRequest: function(e, t) {
                    n.signal.sendRequest(e, t)
                },
                emitReport: function(e) {
                    n.signal.sendReport(e)
                }
            };
            return n.connect(),
            n
        }
          , Me = function(e, t) {
            var n = !1
              , i = 0
              , a = {
                command: "convergeAllocateEdge",
                sid: e.sid,
                appId: e.appId,
                token: e.token,
                uid: e.uid,
                cname: e.cname,
                ts: Math.floor(Date.now() / 1e3),
                version: r.VERSION,
                seq: 0,
                requestId: 1
            };
            Object(r.getParameter)("PROXY_CS").map(function(c) {
                var d = (new Date).getTime();
                Pe("https://" + c + "/api/v1", a, function(a, u) {
                    if (a)
                        return o.default.debug("[" + e.clientId + "] Request proxy server failed: ", a),
                        i++,
                        s.b.requestProxyAppCenter(e.sid, {
                            lts: d,
                            succ: !1,
                            APAddr: c,
                            workerManagerList: null,
                            ec: JSON.stringify(a),
                            response: JSON.stringify({
                                err: a,
                                res: u
                            })
                        }),
                        void (i >= Object(r.getParameter)("PROXY_CS").length && t && t("Get proxy server failed: request all failed"));
                    if (!n)
                        if ((u = JSON.parse(u)).json_body) {
                            var l = JSON.parse(u.json_body);
                            if (o.default.debug("[" + e.clientId + "] App return:", l.servers),
                            200 !== l.code) {
                                a = "Get proxy server failed: response code [" + l.code + "], reason [ " + l.reason + "]";
                                o.default.debug("[" + e.clientId + "] " + a),
                                s.b.requestProxyAppCenter(e.sid, {
                                    lts: d,
                                    succ: !1,
                                    APAddr: c,
                                    workerManagerList: null,
                                    ec: a,
                                    response: JSON.stringify({
                                        err: a,
                                        res: u
                                    })
                                })
                            } else {
                                n = !0;
                                var f = Ue(l.servers);
                                s.b.requestProxyAppCenter(e.sid, {
                                    lts: d,
                                    succ: !0,
                                    APAddr: c,
                                    workerManagerList: JSON.stringify(f),
                                    ec: null,
                                    response: JSON.stringify({
                                        res: u
                                    })
                                }),
                                t && t(null, f)
                            }
                        } else
                            o.default.debug("[" + e.clientId + "] Get proxy server failed: no json_body"),
                            s.b.requestProxyAppCenter(e.sid, {
                                lts: d,
                                succ: !1,
                                APAddr: c,
                                workerManagerList: null,
                                ec: "Get proxy server failed: no json_body",
                                response: JSON.stringify({
                                    res: u
                                })
                            })
                })
            })
        }
          , Pe = function(e, t, n) {
            var i = {
                service_name: "webrtc_proxy",
                json_body: JSON.stringify(t)
            };
            Object(ke.post)(e, i, function(e) {
                n && n(null, e)
            }, function(e) {
                n && n(e)
            }, {
                "X-Packet-Service-Type": 0,
                "X-Packet-URI": 61
            })
        }
          , xe = function(e, t, n) {
            var i = !1
              , a = 0
              , r = {
                command: "request",
                gatewayType: "http",
                appId: e.appId,
                cname: e.cname,
                uid: e.uid + "",
                sdkVersion: "2.3.1",
                sid: e.sid,
                seq: 1,
                ts: +new Date,
                requestId: 3,
                clientRequest: {
                    appId: e.appId,
                    cname: e.cname,
                    uid: e.uid + "",
                    sid: e.sid
                }
            };
            t.map(function(c) {
                var d = (new Date).getTime();
                !function(e, t, n) {
                    Object(ke.post)(e, t, function(e) {
                        n && n(null, e)
                    }, function(e) {
                        n && n(e)
                    })
                }("https://" + c + ":4000/v2/machine", r, function(r, u) {
                    if (r)
                        return o.default.debug("[" + e.clientId + "] Request worker manager failed: ", r),
                        a++,
                        s.b.requestProxyWorkerManager(e.sid, {
                            lts: d,
                            succ: !1,
                            workerManagerAddr: c,
                            ec: JSON.stringify(r),
                            response: JSON.stringify({
                                res: u
                            })
                        }),
                        void (a >= t.length && n && n("requeet worker manager server failed: request failed"));
                    if (!i) {
                        if (!(u = JSON.parse(u)).serverResponse)
                            return n && n("requeet worker manager server failed: serverResponse is undefined");
                        i = !0,
                        s.b.requestProxyWorkerManager(e.sid, {
                            lts: d,
                            succ: !0,
                            workerManagerAddr: c,
                            ec: JSON.stringify(r),
                            response: JSON.stringify({
                                res: u
                            })
                        }),
                        n && n(null, {
                            address: c,
                            serverResponse: u.serverResponse
                        })
                    }
                })
            })
        }
          , Ue = function(e) {
            if (!e || []instanceof Array == !1)
                return [];
            var t = [];
            return e.forEach(function(e) {
                var n;
                e.address && e.tcp ? (e.address.match(/^[\.\:\d]+$/) ? n = "".concat(e.address.replace(/[^\d]/g, "-"), ".edge.agora.io") : (o.default.info("[" + joinInfo.clientId + "] " + "Cannot recognized as IP address ".concat(e.address, ". Used As Host instead")),
                n = "".concat(e.address, ":").concat(e.tcp)),
                t.push(n)) : o.default.error("[" + joinInfo.clientId + "] Invalid address format ", e)
            }),
            t
        }
          , Ve = function(e, t) {
            var n = h()({}, e)
              , i = Object(r.getParameter)("CDS_AP")
              , a = []
              , o = !1;
            (i = i.map(function(e) {
                return n.proxyServer ? "https://".concat(n.proxyServer, "/ap/?url=").concat(e + "/api/v1") : "https://".concat(e, "/api/v1?action=config")
            })).map(function(e) {
                !function(e, t, n) {
                    var i = {
                        flag: 64,
                        cipher_method: 0,
                        timeout: 1e3,
                        features: t
                    };
                    Object(ke.post)(e, i, function(e) {
                        try {
                            var t = JSON.parse(e);
                            n && n(null, t)
                        } catch (e) {
                            n && n(e)
                        }
                        n && n(null, e)
                    }, function(e) {
                        n && n(e)
                    }, {
                        "X-Packet-Service-Type": 0,
                        "X-Packet-URI": 54
                    })
                }(e, n, function(e, n) {
                    o || (e ? (a.push(e),
                    a.length >= i.length && t && t("ALL_REQUEST_FAILED")) : (o = !0,
                    t && t(null, n)))
                })
            })
        }
          , je = {}
          , Fe = {}
          , Be = function(e, t, n, i) {
            var a = (new Date).getTime()
              , c = t
              , d = "";
            t.multiIP && t.multiIP.gateway_ip && (d = {
                vocs_ip: [t.multiIP.uni_lbs_ip],
                vos_ip: [t.multiIP.gateway_ip]
            });
            var u = {
                opid: 133,
                flag: 4096,
                ts: +new Date,
                key: t.token,
                cname: t.cname,
                sid: t.sid,
                detail: {
                    6: t.stringUid
                },
                uid: t.uid || 0
            };
            d && (u.detail[5] = JSON.stringify(d)),
            Object(ke.post)(e + "".concat(-1 === e.indexOf("?") ? "?" : "&", "action=wrtc_gateway"), u, function(d) {
                try {
                    var u = JSON.parse(d);
                    u.res && (u = u.res);
                    var l = u.code
                } catch (e) {
                    var f = "requestChooseServer failed with unexpected body " + d;
                    return o.default.error("[" + c.clientId + "]", f),
                    i(f)
                }
                if (l) {
                    var p = I.APErrorCode[u.code] || l;
                    return s.b.joinChooseServer(t.sid, {
                        lts: a,
                        succ: !1,
                        csAddr: e,
                        serverList: null,
                        ec: p
                    }),
                    i("Get server node failed [" + p + "]", e, p)
                }
                var g = []
                  , m = Object(r.getParameter)("GATEWAY_DOMAINS")
                  , v = 0;
                if (e.indexOf(m[1]) > -1 && (v = 1),
                u.addresses.forEach(function(e) {
                    var t;
                    e.ip && e.port ? (e.ip.match(/^[\.\:\d]+$/) ? t = "".concat(e.ip.replace(/[^\d]/g, "-"), ".").concat(m[v++ % m.length], ":").concat(e.port) : (o.default.info("[" + c.clientId + "] " + "Cannot recognized as IP address ".concat(e.ip, ". Used As Host instead")),
                    t = "".concat(e.ip, ":").concat(e.port)),
                    g.push(t)) : o.default.error("[" + c.clientId + "] Invalid address format ", e)
                }),
                !g.length) {
                    o.default.error("[" + c.clientId + "] Empty Address response", u);
                    p = "EMPTY_ADDRESS_RESPONSE";
                    return s.b.joinChooseServer(t.sid, {
                        lts: a,
                        succ: !1,
                        csAddr: e,
                        serverList: null,
                        ec: p
                    }),
                    i("Get server node failed [" + p + "]", e, p)
                }
                var S = {
                    gateway_addr: g,
                    uid: u.uid,
                    cid: u.cid,
                    vid: u.detail && u.detail[8],
                    res: u,
                    uni_lbs_ip: u.detail
                };
                return n(S, e)
            }, function(e, n) {
                "timeout" === e.type ? (s.b.joinChooseServer(t.sid, {
                    lts: a,
                    succ: !1,
                    csAddr: n,
                    serverList: null,
                    ec: "timeout"
                }),
                i("Connect choose server timeout", n)) : (s.b.joinChooseServer(t.sid, {
                    lts: a,
                    succ: !1,
                    csAddr: n,
                    serverList: null,
                    ec: "server_wrong"
                }),
                i("Connect choose server error", n))
            }, {
                "X-Packet-Service-Type": 0,
                "X-Packet-URI": 69
            })
        }
          , We = function(e, t, n) {
            var i = !1
              , a = null
              , c = 1
              , d = 1
              , u = null
              , l = e.clientId
              , f = function t(d, f) {
                if (!i) {
                    var p = !1
                      , m = !1
                      , v = []
                      , S = g.getBrowserInfo() || {};
                    Ve({
                        device: S.name,
                        system: S.os,
                        vendor: e.appId,
                        version: r.VERSION,
                        cname: e.cname,
                        sid: e.sid,
                        session_id: Object(s.a)(),
                        detail: "",
                        proxyServer: d
                    }, function(t, n) {
                        m = !0;
                        try {
                            var i = Object.keys(n.test_tags)[0]
                              , a = JSON.parse(n.test_tags[i]);
                            u = a[1]
                        } catch (e) {
                            u = null
                        }
                        s.b.reportApiInvoke(e.sid, {
                            name: "_config-distribute-request",
                            options: {
                                err: t,
                                res: n
                            }
                        })(),
                        Fe[l] !== et.DISCONNECTED && Fe[l] !== et.DISCONNECTING ? p && f && f(v, u) : o.default.debug("[".concat(e.clientId, "] Request config success when connection state is ").concat(Fe[l]))
                    }),
                    function(e, t, n) {
                        for (var i = (new Date).getTime(), a = !1, c = !0, d = function(n, r) {
                            if (a)
                                s.b.joinChooseServer(e.sid, {
                                    lts: i,
                                    succ: !0,
                                    csAddr: r,
                                    serverList: n.gateway_addr,
                                    cid: n.cid + "",
                                    uid: n.uid + "",
                                    ec: null
                                }, !1);
                            else {
                                if (clearTimeout(m),
                                a = !0,
                                o.default.debug("[" + e.clientId + "] Get gateway address:", n.gateway_addr),
                                e.proxyServer) {
                                    for (var c = n.gateway_addr, d = 0; d < c.length; d++) {
                                        var u = c[d].split(":");
                                        n.gateway_addr[d] = e.proxyServer + "/ws/?h=" + u[0] + "&p=" + u[1]
                                    }
                                    o.default.debug("[" + e.clientId + "] Get gateway address:", n.gateway_addr)
                                }
                                t(n),
                                s.b.joinChooseServer(e.sid, {
                                    lts: i,
                                    succ: !0,
                                    csAddr: r,
                                    serverList: n.gateway_addr,
                                    cid: n.cid + "",
                                    uid: n.uid + "",
                                    ec: null
                                }, !0)
                            }
                        }, u = function(t, i, a) {
                            c && (o.default.error("[" + e.clientId + "]", t, i, a),
                            a && -1 === I.JOIN_CS_RETRY_LIST.indexOf(a) && (c = !1,
                            n(a)))
                        }, l = Object(r.getParameter)("WEBCS_DOMAIN"), f = 0; f < l.length; ++f) {
                            var p;
                            if ("string" == typeof l[f]) {
                                var g = l[f];
                                p = e.proxyServer ? "https://".concat(e.proxyServer, "/ap/?url=").concat(g + "/api/v1") : "https://".concat(g, "/api/v1"),
                                o.default.debug("[" + e.clientId + "] " + "Connect to choose_server: ".concat(p)),
                                Be(p, e, d, u)
                            } else
                                o.default.error("[" + e.clientId + "] Invalid Host", l[f])
                        }
                        var m = setTimeout(function() {
                            if (!a)
                                for (var t = Object(r.getParameter)("WEBCS_DOMAIN_BACKUP_LIST"), n = 0; n < t.length; ++n)
                                    if ("string" == typeof t[n]) {
                                        var i = t[n];
                                        p = e.proxyServer ? "https://".concat(e.proxyServer, "/ap/?url=").concat(i + "/api/v1") : "https://".concat(i, "/api/v1"),
                                        o.default.debug("[" + e.clientId + "] " + "Connect to backup_choose_server: ".concat(p)),
                                        Be(p, e, d, u)
                                    } else
                                        o.default.error("[" + e.clientId + "] Invalid Host", t[n])
                        }, 1e3);
                        setTimeout(function() {
                            !a && c && n()
                        }, Object(r.getParameter)("WEBCS_BACKUP_CONNECT_TIMEOUT"))
                    }(e, function(t) {
                        i = !0,
                        p = !0,
                        v = t,
                        clearTimeout(a),
                        Fe[l] !== et.DISCONNECTED && Fe[l] !== et.DISCONNECTING ? m && f && f(v, u) : o.default.debug("[".concat(e.clientId, "] Request gateway list success when connection state is ").concat(Fe[l]))
                    }, function(i) {
                        if (i)
                            return o.default.info("[" + e.clientId + "] Join failed: " + i),
                            void (n && n(i));
                        if (Fe[l] === et.DISCONNECTED || Fe[l] === et.DISCONNECTING)
                            return o.default.debug("[".concat(e.clientId, "] Request gateway list falied when connection state is ").concat(Fe[l])),
                            void (n && n("OPERATION_ABORT"));
                        o.default.debug("[" + e.clientId + "] Request gateway list will be restart in " + c + "s"),
                        a = setTimeout(function() {
                            t(d, f)
                        }, 1e3 * c),
                        je[l] = a;
                        var s = Object(r.getParameter)("AP_BACKOFF_MAX_TIME");
                        c = c >= s ? s : 2 * c
                    })
                }
            };
            e.useProxyServer ? function n() {
                !function(e, t) {
                    Me(e, function(n, i) {
                        if (n)
                            return t && t(n);
                        o.default.debug("[" + e.clientId + "] getProxyServerList: ", i),
                        xe(e, i, t)
                    })
                }(e, function(i, c) {
                    if (i) {
                        o.default.debug("[" + e.clientId + "]", i),
                        o.default.debug("[" + e.clientId + "] Request proxy will be restart in " + d + "s"),
                        a = setTimeout(function() {
                            n()
                        }, 1e3 * d),
                        je[l] = a;
                        var u = Object(r.getParameter)("AP_BACKOFF_MAX_TIME");
                        d = d >= u ? u : 2 * d
                    } else {
                        clearTimeout(a);
                        var p = c.address;
                        e.proxyServer = p;
                        var g = {
                            mode: "manual",
                            url: c.address,
                            tcpport: c.serverResponse.tcpport || "3433",
                            udpport: c.serverResponse.udpport || "3478",
                            username: c.serverResponse.username || "test",
                            credential: c.serverResponse.password || Object(r.getParameter)("TURN_SERVER_PASSWORD"),
                            forceturn: !0
                        };
                        g.tcpport += "",
                        g.udpport += "",
                        e.turnServers = [],
                        e.turnServers.push(g),
                        s.b.setProxyServer(p),
                        o.default.setProxyServer(p),
                        f(p, t)
                    }
                })
            }() : f(null, t)
        }
          , He = function(e, t, n, i) {
            var a = Date.now();
            i = i || t.stringUid;
            var r = {
                sid: t.sid,
                opid: 10,
                appid: t.appId,
                string_uid: i
            };
            return new Promise(function(c, d) {
                Object(ke.post)(e + "".concat(-1 === e.indexOf("?") ? "?" : "&", "action=stringuid"), r, function(u) {
                    try {
                        var l = JSON.parse(u)
                          , f = l.code
                    } catch (c) {
                        var p = "requestUserAccount failed with unexpected body " + u;
                        return o.default.error("[" + t.clientId + "]", p),
                        d({
                            retryable: !0,
                            info: p,
                            url: e
                        }),
                        n && n.dispatchEvent({
                            type: "error",
                            reason: "USER_ACCOUNT_BODY_NOT_JSON"
                        }),
                        void s.b.reqUserAccount(r.sid, {
                            lts: a,
                            success: !1,
                            serverAddress: e,
                            stringUid: i,
                            uid: null,
                            extend: u,
                            errorCode: "USER_ACCOUNT_BODY_NOT_JSON"
                        })
                    }
                    if (f) {
                        var g = I.StringUidErrorCode[l.code % 1e4] || "REQ_ACCOUNT_ERR_".concat(f);
                        return n && n.dispatchEvent({
                            type: "error",
                            reason: g
                        }),
                        s.b.reqUserAccount(r.sid, {
                            lts: a,
                            success: !1,
                            serverAddress: e,
                            stringUid: i,
                            uid: null,
                            errorCode: g,
                            extend: r
                        }),
                        d({
                            retryable: !1,
                            info: p = "Get String Uid Failed [" + g + "]",
                            url: e,
                            error: g
                        })
                    }
                    var m = l.uid;
                    if (!(m > 0 && m < Math.pow(2, 32))) {
                        o.default.error("[" + t.clientId + "] " + "Invalid Uint Uid ".concat(i, " => ").concat(m), l);
                        g = "INVALID_UINT_UID_".concat(m);
                        return n && n.dispatchEvent({
                            type: "error",
                            reason: g
                        }),
                        s.b.reqUserAccount(r.sid, {
                            lts: a,
                            success: !1,
                            serverAddress: e,
                            stringUid: i,
                            uid: null,
                            errorCode: g,
                            extend: r
                        }),
                        d({
                            retryable: !0,
                            error: g,
                            info: "Get String Uid failed [" + g + "]",
                            url: e
                        })
                    }
                    c({
                        uid: m,
                        url: e
                    }),
                    s.b.reqUserAccount(r.sid, {
                        lts: a,
                        success: !0,
                        serverAddress: e,
                        stringUid: i,
                        uid: m,
                        errorCode: null,
                        extend: r
                    })
                }, function(e, t) {
                    if ("timeout" === e.type) {
                        var o = "USER_ACCOUNT_TIMEOUT";
                        n && n.dispatchEvent({
                            type: "error",
                            reason: o
                        }),
                        s.b.reqUserAccount(r.sid, {
                            lts: a,
                            success: !1,
                            serverAddress: t,
                            stringUid: i,
                            uid: null,
                            errorCode: o,
                            extend: r
                        }),
                        d({
                            retryable: !0,
                            info: o,
                            url: t
                        })
                    } else {
                        var c = "USER_ACCOUNT_SERVER_WRONG_".concat(e.type);
                        n && n.dispatchEvent({
                            type: "error",
                            reason: c
                        }),
                        s.b.reqUserAccount(r.sid, {
                            lts: a,
                            success: !1,
                            serverAddress: t,
                            stringUid: i,
                            uid: null,
                            errorCode: c,
                            extend: r
                        }),
                        d({
                            retryable: !0,
                            info: c,
                            url: t
                        })
                    }
                }, {
                    "X-Packet-Service-Type": 0,
                    "X-Packet-URI": 72
                })
            }
            )
        }
          , Ge = function(e, t, n) {
            Date.now();
            var a, s = Object(r.getParameter)("ACCOUNT_REGISTER"), c = !1, d = Object(r.getParameter)("ACCOUNT_REGISTER_RETRY_TIMEOUT"), u = null, l = null, f = new Promise(function() {
                var f = K()(Y.a.mark(function f(p, g) {
                    var m, v, S;
                    return Y.a.wrap(function(f) {
                        for (; ; )
                            switch (f.prev = f.next) {
                            case 0:
                                u = p,
                                l = g,
                                a = 0;
                            case 3:
                                if (!(a < Object(r.getParameter)("ACCOUNT_REGISTER_RETRY_COUNT_MAX"))) {
                                    f.next = 33;
                                    break
                                }
                                if (!c) {
                                    f.next = 6;
                                    break
                                }
                                return f.abrupt("return");
                            case 6:
                                return m = s[a % s.length],
                                v = e.proxyServer ? "https://".concat(e.proxyServer, "/ap/?url=").concat(s[i] + "/api/v1") : "https://".concat(m, "/api/v1"),
                                f.prev = 8,
                                f.delegateYield(Y.a.mark(function i() {
                                    var a;
                                    return Y.a.wrap(function(i) {
                                        for (; ; )
                                            switch (i.prev = i.next) {
                                            case 0:
                                                return i.next = 2,
                                                He(v, e, t, n);
                                            case 2:
                                                if (a = i.sent,
                                                !c) {
                                                    i.next = 5;
                                                    break
                                                }
                                                return i.abrupt("return", {
                                                    v: void 0
                                                });
                                            case 5:
                                                c = !0,
                                                setTimeout(function() {
                                                    o.default.debug("Get UserAccount Successfully", a),
                                                    u(a)
                                                }, 0);
                                            case 7:
                                            case "end":
                                                return i.stop()
                                            }
                                    }, i, this)
                                })(), "t0", 10);
                            case 10:
                                if (S = f.t0,
                                "object" !== Se()(S)) {
                                    f.next = 13;
                                    break
                                }
                                return f.abrupt("return", S.v);
                            case 13:
                                f.next = 30;
                                break;
                            case 15:
                                if (f.prev = 15,
                                f.t1 = f.catch(8),
                                !c) {
                                    f.next = 19;
                                    break
                                }
                                return f.abrupt("return");
                            case 19:
                                if (!f.t1.retryable) {
                                    f.next = 27;
                                    break
                                }
                                return (d = Math.ceil(d * Object(r.getParameter)("ACCOUNT_REGISTER_RETRY_RATIO"))) > Object(r.getParameter)("ACCOUNT_REGISTER_RETRY_TIMEOUT_MAX") && (d = Object(r.getParameter)("ACCOUNT_REGISTER_RETRY_TIMEOUT_MAX")),
                                o.default.error("".concat(f.t1.info, " ").concat(f.t1.url, " Will Fetch User Account in ").concat(d / 1e3, " seconds")),
                                f.next = 25,
                                new Promise(function(e) {
                                    setTimeout(e, d)
                                }
                                );
                            case 25:
                                f.next = 30;
                                break;
                            case 27:
                                o.default.error("Get UserAccount Error: ".concat(f.t1.info, " ").concat(f.t1.url), f.t1.error),
                                c = !0,
                                l(f.t1);
                            case 30:
                                a++,
                                f.next = 3;
                                break;
                            case 33:
                            case "end":
                                return f.stop()
                            }
                    }, f, this, [[8, 15]])
                }));
                return function(e, t) {
                    return f.apply(this, arguments)
                }
            }());
            return f.cancel = function() {
                c || (c = !0,
                l({
                    info: "Request Cancelled",
                    retryable: !1
                }))
            }
            ,
            f.isFinished = function() {
                return c
            }
            ,
            f
        }
          , qe = {
            ERR_NO_VOCS_AVAILABLE: "tryNext",
            ERR_NO_VOS_AVAILABLE: "tryNext",
            ERR_JOIN_CHANNEL_TIMEOUT: "tryNext",
            WARN_REPEAT_JOIN: "quit",
            ERR_JOIN_BY_MULTI_IP: "recover",
            WARN_LOOKUP_CHANNEL_TIMEOUT: "tryNext",
            WARN_OPEN_CHANNEL_TIMEOUT: "tryNext",
            ERR_VOM_SERVICE_UNAVAILABLE: "tryNext",
            ERR_TOO_MANY_USERS: "tryNext",
            ERR_MASTER_VOCS_UNAVAILABLE: "tryNext",
            ERR_INTERNAL_ERROR: "tryNext",
            K_SERVICE_NOT_READY: "recover",
            K_SERVICE_TOO_HEAVY: "tryNext",
            notification_test_recover: "recover",
            notification_test_tryNext: "tryNext",
            notification_test_retry: "retry"
        }
          , Ye = {
            googActualEncBitrate: "A_aeb",
            googAvailableSendBandwidth: "A_asb",
            googRetransmitBitrate: "A_rb",
            googAvailableReceiveBandwidth: "A_arb",
            googTargetEncBitrate: "A_teb",
            googBucketDelay: "A_bd",
            googTransmitBitrate: "A_tb",
            googCodecName: "A_cn",
            bytesSent: "bytesSent",
            packetsLost: "packetsLost",
            packetsSent: "packetsSent",
            googAdaptationChanges: "A_ac",
            googAvgEncodeMs: "A_aem",
            googEncodeUsagePercent: "A_eup",
            googFirsReceived: "A_fr",
            googFrameHeightInput: "A_fhi",
            googFrameHeightSent: "A_fhs",
            googFrameRateInput: "A_fri",
            googFrameRateSent: "A_frs",
            googFrameWidthInput: "A_fwi",
            googFrameWidthSent: "A_fws",
            googNacksReceived: "A_nr",
            googPlisReceived: "A_pr",
            googRtt: "A_rtt",
            aecDivergentFilterFraction: "A_adff",
            audioInputLevel: "A_ail",
            googEchoCancellationReturnLoss: "A_ecrl",
            googEchoCancellationReturnLossEnhancement: "A_ecrle",
            googResidualEchoLikelihood: "A_rel",
            googResidualEchoLikelihoodRecentMax: "A_relrm",
            googTargetDelayMs: "A_tdm",
            bytesReceived: "bytesReceived",
            packetsReceived: "packetsReceived",
            googDecodeMs: "A_dm",
            googMaxDecodeMs: "A_mdm",
            googRenderDelayMs: "A_rdm",
            googFrameWidthReceived: "A_fwr",
            googFrameHeightReceived: "A_fhr",
            googFrameRateReceived: "A_frr",
            googFrameRateDecoded: "A_frd",
            googFrameRateOutput: "A_fro",
            googJitterBufferMs: "A_jbm",
            googCurrentDelayMs: "A_cdm",
            googMinPlayoutDelayMs: "A_mpdm",
            googNacksSent: "A_ns",
            googPlisSent: "A_ps",
            googFirsSent: "A_fs",
            audioOutputLevel: "A_aol",
            googAccelerateRate: "A_ar",
            googDecodingCNG: "A_dcng",
            googDecodingCTN: "A_dctn",
            googDecodingCTSG: "A_dctsg",
            googDecodingNormal: "A_dn",
            googDecodingPLC: "A_dplc",
            googDecodingPLCCNG: "A_dplccng",
            googExpandRate: "A_er",
            googJitterReceived: "A_jr",
            googPreemptiveExpandRate: "A_per",
            googPreferredJitterBufferMs: "A_pjbm",
            googSecondaryDecodedRate: "A_sdr",
            googSpeechExpandRate: "A_ser",
            uplink_fraction_lost: "B_ufl",
            uplink_cumulative_lost: "B_ucl",
            uplink_available_bandwidth: "B_uab",
            period_fir: "B_fir",
            access_delay: "B_acd",
            uplink_network_quality: "B_unq",
            downlink_network_quality: "B_dnq",
            pub_audio_lost_ratio_400ms: "B_palr4",
            pub_video_lost_ratio_400ms: "B_pvlr4",
            e2e_delay: "B_ed",
            audio_delay: "B_ad",
            video_delay: "B_vd",
            stream_type: "B_st",
            e2e_audio_lost_ratio_400ms: "B_ealr4",
            e2e_video_lost_ratio_400ms: "B_evlr4",
            downlink_estimate_bandwidth: "B_deb"
        }
          , Je = {};
        for (var Ke in Ye) {
            var ze = Ye[Ke];
            Je[ze] && o.default.error("Key Conflict: ".concat(ze, ": ").concat(Ye[ze], "| ").concat(Ke)),
            Je[ze] = Ke
        }
        var Xe = function(e) {
            return Ye[e] || e
        }
          , Qe = function(e) {
            return Je[e] || e
        };
        var $e = function t(n) {
            var i = !1
              , a = function(e) {
                return {
                    _type: "control",
                    _message: e
                }
            }
              , d = function(e, t) {
                var n = {};
                return Object.keys(t).forEach(function(e) {
                    Object(r.getParameter)("STATS_FILTER")[e] || (n[Xe(e)] = t[e])
                }),
                {
                    _type: "subscribe_related_stats",
                    _message: {
                        stream_type: "high",
                        stream_id: e,
                        stats: n
                    }
                }
            }
              , m = function(e) {
                return {
                    _type: "publish",
                    _message: e
                }
            }
              , v = function(e, t) {
                var n = {};
                return Object.keys(t).forEach(function(e) {
                    Object(r.getParameter)("STATS_FILTER")[e] || (n[Xe(e)] = t[e])
                }),
                {
                    _type: "subscribe_stats",
                    _message: {
                        stream_id: e,
                        stats: n
                    }
                }
            }
              , S = t.DISCONNECTED
              , _ = t.CONNECTING
              , E = t.CONNECTED
              , T = t.DISCONNECTING
              , y = S
              , b = c(n);
            Object.defineProperty(b, "state", {
                set: function(e) {
                    var n = y;
                    y = e,
                    function(e, t) {
                        Fe[e] = t
                    }(b.clientId, e),
                    e !== t.CONNECTED && (b.hasJoined = !1),
                    n !== e && b.dispatchEvent({
                        type: "connection-state-change",
                        prevState: t.connetionStateMap[n],
                        curState: t.connetionStateMap[e]
                    })
                },
                get: function() {
                    return y
                }
            }),
            b.socket = void 0,
            b.state = S,
            b.mode = n.mode,
            b.role = n.role,
            b.codec = n.codec,
            b.config = {},
            b.timers = {},
            b.timer_counter = {},
            b.localStreams = {},
            b.remoteStreams = {},
            b.remoteMuteState = {},
            b.attemps = 1,
            b.p2p_attemps = 1,
            b.audioLevel = {},
            b.activeSpeaker = void 0,
            b.reconnectMode = "tryNext",
            b.rejoinAttempt = 0,
            b.hasChangeBGPAddress = !1,
            b.traffic_stats = {},
            b.clientId = n.clientId,
            b.pingpongCounter = 0,
            b.hasInvokeLeave = !1,
            b.p2ps = new Map,
            b.liveStreams = new Map,
            b.injectLiveStreams = new Map,
            b.remoteStreamsInChannel = new Set,
            b.hasJoined = !1,
            function(e) {
                var t = we;
                e.makeRequest = function(n, i, a) {
                    if (void 0 === e.socket)
                        return o.default.debug("[".concat(e.clientId, "] No socket available")),
                        void t(a, I.default.INVALID_OPERATION);
                    try {
                        e.socket.emitRequest(n, function(e, t) {
                            var n;
                            "success" === e ? "function" == typeof i && i(t) : "function" == typeof a && (n = t && t.error_code && I.GatewayErrorCode[t.error_code] ? I.GatewayErrorCode[t.error_code] : t && t.error_str ? t.error_str : t && t.error_code ? "UNKNOW_ERROR_".concat(t.error_code) : e,
                            a(n, t))
                        })
                    } catch (i) {
                        o.default.debug("[".concat(e.clientId, "] Socket emit message failed ").concat(JSON.stringify(n))),
                        o.default.debug("[".concat(e.clientId, "] "), i),
                        t(a, I.default.SOCKET_ERROR)
                    }
                }
                ,
                e.makeReport = function(t) {
                    void 0 === e.socket && o.default.debug("[".concat(e.clientId, "] No socket available"));
                    try {
                        e.socket.emitReport(t)
                    } catch (n) {
                        o.default.debug("[".concat(e.clientId, "] Socket emit report failed ").concat(JSON.stringify(t)))
                    }
                }
            }(b),
            b.inChannelInfo = {
                joinAt: null,
                duration: 0
            },
            b._sendMessage = function(e, t) {
                switch (e) {
                case "SubscribeStats":
                    b.makeReport(v.apply(void 0, Ne()(t)));
                    break;
                case "SubscribeRelatedStats":
                    b.makeReport(d.apply(void 0, Ne()(t)))
                }
            }
            ;
            var R = we;
            b.p2pCounter = Object(F.random)(1e5),
            b.generateP2PId = function() {
                return ++b.p2pCounter
            }
            ,
            b.audioVolumeIndication = {
                enabled: !1,
                sortedAudioVolumes: [],
                smooth: 3,
                interval: 2e3
            },
            b.remoteVideoStreamTypes = {
                REMOTE_VIDEO_STREAM_HIGH: 0,
                REMOTE_VIDEO_STREAM_LOW: 1,
                REMOTE_VIDEO_STREAM_MEDIUM: 2
            },
            b.streamFallbackTypes = {
                STREAM_FALLBACK_OPTION_DISABLED: 0,
                STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW: 1,
                STREAM_FALLBACK_OPTION_AUDIO_ONLY: 2
            },
            b.configPublisher = function(e) {
                b.config = e
            }
            ,
            b.getGatewayInfo = function(e, t) {
                b.makeRequest({
                    _type: "gateway_info"
                }, e, t)
            }
            ,
            b.setClientRole = function(e, t) {
                o.default.debug("[".concat(b.clientId, "] setClientRole to ").concat(e));
                var n = s.b.reportApiInvoke(b.joinInfo.sid, {
                    name: "_setClientRole",
                    callback: t
                });
                b.makeRequest({
                    _type: "set_client_role",
                    _message: {
                        role: e
                    }
                }, function() {
                    b.role = e,
                    b.dispatchEvent({
                        type: "client-role-changed",
                        role: e
                    }),
                    n && n(null, {
                        role: e
                    })
                }, function(t, i) {
                    if (i && i.code && (t = I.GatewayErrorCode[i.code] || "UNKNOW_ERROR_" + i.code),
                    "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE" === t)
                        return n && n(null);
                    o.default.error("set Client role error to " + e + ": " + t),
                    n && n(t)
                })
            }
            ,
            b.join = function(e, t, i, a) {
                e.useProxyServer && (b.hasChangeBGPAddress = !0);
                var c = (new Date).getTime()
                  , d = e.uid;
                if (b.inChannelInfo.joinAt && (b.inChannelInfo.duration += c - b.inChannelInfo.joinAt),
                b.inChannelInfo.joinAt = c,
                b.state !== _)
                    return o.default.error("[".concat(b.clientId, "] GatewayClient.join Failed: state "), b.state),
                    a && a(I.default.INVALID_OPERATION),
                    void s.b.joinGateway(e.sid, {
                        lts: c,
                        succ: !1,
                        ec: I.default.INVALID_OPERATION,
                        addr: null
                    });
                if (null != d && parseInt(d) !== d)
                    return o.default.error("[".concat(b.clientId, "] Input uid is invalid")),
                    b.state = S,
                    a && a(I.default.INVALID_PARAMETER),
                    void s.b.joinGateway(e.sid, {
                        lts: c,
                        succ: !1,
                        ec: I.default.INVALID_PARAMETER,
                        addr: null
                    });
                var u = Ze.register(b, {
                    uid: d,
                    cname: e && e.cname
                });
                if (u)
                    return b.state = S,
                    a && a(u),
                    void s.b.joinGateway(e.sid, {
                        lts: c,
                        succ: !1,
                        ec: u,
                        addr: null
                    });
                b.joinInfo = h()({}, e),
                b.uid = d,
                b.key = t,
                b.pingpongCounter = 0,
                N(e, function(t) {
                    if (b.state === T || b.state === S)
                        return a && a("LEAVE_BEFORE_JOIN_SUCCESS");
                    b.state = E,
                    o.default.debug("[".concat(b.clientId, "] Connected to gateway server")),
                    clearInterval(b.pingTimer),
                    b.pingTimer = setInterval(function() {
                        var e = Object(r.getParameter)("PING_PONG_TIME_OUT");
                        if (++b.pingpongCounter >= e) {
                            var t = Date.now();
                            b.socket && o.default.warning("PINGPONG Timeout. Last Socket Message: ".concat(t - b.socket.getLastMsgTime(), "ms")),
                            b.socket && b.socket.getLastMsgTime() && t - b.socket.getLastMsgTime() > Object(r.getParameter)("WEBSOCKET_TIMEOUT_MIN") && (b.pingpongCounter = 0,
                            b.socket.close(),
                            b.socket.dispatchEvent(f({
                                type: "disconnect",
                                event: {
                                    msg: "PING_PONG_TIME_OUT"
                                }
                            })))
                        }
                        var n = Date.now();
                        b.makeRequest({
                            _type: "ping"
                        }, function() {
                            b.pingpongCounter = 0;
                            var e = Date.now() - n;
                            setTimeout(function() {
                                Object(r.getParameter)("REPORT_STATS") && b.makeRequest({
                                    _type: "ping_back",
                                    _message: {
                                        pingpongElapse: e
                                    }
                                })
                            }, 1e3)
                        }, function(e, t) {
                            "TIMEOUT" !== e && (o.default.error("Ping Error ".concat(e, " ").concat(JSON.stringify(t))),
                            t && t.error_code && b.socket && b.socket.signal && b.socket.signal.connection && b.socket.signal.connection.readyState === WebSocket.OPEN && (o.default.info("Disconnecting websocket connection"),
                            b.socket.signal.connection.close()))
                        })
                    }, 3e3),
                    b.makeRequest(function(e) {
                        var t = e.role
                          , i = h()({}, b.joinInfo.apResponse)
                          , a = {
                            session_id: b.joinInfo.sid,
                            app_id: n.appId,
                            channel_key: b.key,
                            channel_name: b.joinInfo.cname,
                            sdk_version: r.VERSION,
                            browser: navigator.userAgent,
                            process_id: Object(s.a)(),
                            mode: b.mode,
                            codec: b.codec,
                            role: t,
                            has_changed_gateway: Object(r.getParameter)("FORCE_CHANGED_GATEWAY_FLAG") || b.hasChangeBGPAddress,
                            ap_response: i,
                            extend: Object(r.getParameter)("JOIN_EXTEND"),
                            details: {}
                        };
                        if (b.joinInfo.hasOwnProperty("stringUid") && (a.string_uid = b.joinInfo.stringUid),
                        b.joinInfo.aesmode && b.joinInfo.aespassword && (a.aes_mode = b.joinInfo.aesmode,
                        a.aes_secret = b.joinInfo.aespassword),
                        b.socket && b.socket.signal && b.socket.signal) {
                            if (i.addresses[b.socket.signal.hostIndex] && (a.ap_response.ticket = i.addresses[b.socket.signal.hostIndex].ticket,
                            delete i.addresses),
                            Object(r.getParameter)("SET_DEFAULT_TURNSERVER") && b.socket.signal.turnConfig) {
                                var c = {
                                    username: "test",
                                    credential: Object(r.getParameter)("TURN_SERVER_PASSWORD"),
                                    forceturn: Object(r.getParameter)("FORCE_TURN")
                                };
                                c.url = b.socket.signal.turnConfig.url,
                                b.socket.signal.turnConfig.tcpport && (c.tcpport = "" + b.socket.signal.turnConfig.tcpport),
                                b.socket.signal.turnConfig.udpport && (c.udpport = "" + b.socket.signal.turnConfig.udpport),
                                b.joinInfo.turnServers.push(c)
                            }
                            o.default.debug("TurnServers config", b.joinInfo.turnServers)
                        }
                        return b.dispatchEvent({
                            type: "join-message-hook",
                            joinMessage: a
                        }),
                        {
                            _type: "join",
                            _message: a
                        }
                    }({
                        role: b.role
                    }), function(t) {
                        if (s.b.joinGateway(e.sid, {
                            lts: c,
                            succ: !0,
                            ec: null,
                            vid: e.vid,
                            addr: b.socket.getURL()
                        }),
                        b.rejoinAttempt = 0,
                        b.hasJoined = !0,
                        i && i(t.uid),
                        !0 === t.return_vosip || !0 === Object(r.getParameter)("ENABLE_LIVE_SERVER_LIST")) {
                            var n = null;
                            try {
                                n = b.socket.signal.connection.url
                            } catch (e) {
                                o.default.debug("[".concat(b.clientId, "] Can not get gateway ip: ").concat(e))
                            }
                            n ? Object(r.setParameter)("LIVE_SERVER_LIST", [n]) : Object(r.setParameter)("LIVE_SERVER_LIST", [])
                        }
                        b.dispatchEvent({
                            type: "join"
                        }),
                        clearInterval(b.timers.trafficStats),
                        b.timers.trafficStats = setInterval(function() {
                            b.makeRequest({
                                _type: "traffic_stats"
                            }, function(e) {
                                var t = {};
                                for (var n in e)
                                    t[Qe(n)] = e[n];
                                if (t.peer_delay && t.peer_delay.length) {
                                    var i = [];
                                    t.peer_delay.forEach(function(e) {
                                        var t = {};
                                        for (var n in e)
                                            t[Qe(n)] = e[n];
                                        i.push(t)
                                    }),
                                    t.peer_delay = i
                                }
                                b.traffic_stats = t;
                                var a = b.joinInfo.stringUid
                                  , r = b.localStreams[d] || b.localStreams[a];
                                r && (r.traffic_stats = {
                                    access_delay: t.access_delay
                                }),
                                t.peer_delay && t.peer_delay.forEach(function(e) {
                                    var n = b.remoteStreams[e.peer_uid];
                                    n && (n.traffic_stats = {
                                        access_delay: t.access_delay,
                                        e2e_delay: e.e2e_delay,
                                        audio_delay: e.audio_delay,
                                        video_delay: e.video_delay
                                    })
                                }),
                                b.dispatchEvent({
                                    type: "after-getTrafficStats",
                                    trafficStats: t
                                })
                            })
                        }, 3e3)
                    }, function(t, n) {
                        if (o.default.error("[".concat(b.clientId, "] User join failed [").concat(t, "]")),
                        "ERR_JOIN_BY_MULTI_IP" === t) {
                            try {
                                s.b.joinGateway(e.sid, {
                                    lts: c,
                                    succ: !1,
                                    ec: "ERR_JOIN_BY_MULTI_IP",
                                    addr: b.socket.getURL()
                                })
                            } catch (e) {}
                            return b.dispatchEvent({
                                type: "onMultiIP",
                                option: n.option
                            })
                        }
                        qe[t] && b.rejoinAttempt < 4 ? b._doWithAction(qe[t], i, a) : a && a(t),
                        s.b.joinGateway(e.sid, {
                            lts: c,
                            succ: !1,
                            ec: t,
                            addr: b.socket && b.socket.getURL()
                        })
                    })
                }, function(t) {
                    o.default.error("[".concat(b.clientId, "] User join failed [").concat(t, "]")),
                    a && a(t),
                    s.b.joinGateway(e.sid, {
                        lts: c,
                        succ: !1,
                        ec: t,
                        addr: b.socket.getURL()
                    })
                }),
                this.remoteMuteState = {},
                b.resetAudioVolumeIndication()
            }
            ,
            b.leave = function(e, t) {
                var n = Ze.unregister(b);
                switch (n && o.default.debug("[".concat(b.clientId, "] "), n),
                b.state) {
                case S:
                    return o.default.debug("[".concat(b.clientId, "] Client Already in DISCONNECTED status")),
                    void R(e);
                case T:
                    return o.default.debug("[".concat(b.clientId, "] Client Already in DISCONNECTING status")),
                    void R(t, I.default.INVALID_OPERATION);
                case _:
                    return b.socket.close(),
                    b.socket = void 0,
                    o.default.info("[".concat(b.clientId, "] Client connecting, Leave channel success")),
                    b.state = S,
                    e && e()
                }
                for (var i in b.state = T,
                b.channelMediaConfig && (b.channelMediaRelayController && b.channelMediaRelayController.dispose(),
                b.channelMediaConfig,
                b.channelMediaRelayController = null),
                clearInterval(b.pingTimer),
                b.timers)
                    b.timers.hasOwnProperty(i) && clearInterval(b.timers[i]);
                for (var i in b.inChannelInfo.joinAt && (b.inChannelInfo.duration += Date.now() - b.inChannelInfo.joinAt,
                b.inChannelInfo.joinAt = null),
                b.hasJoined ? b.makeRequest({
                    _type: "leave"
                }, function(t) {
                    b.socket.close(),
                    b.socket = void 0,
                    o.default.info("[".concat(b.clientId, "] Leave channel success")),
                    b.state = S,
                    e && e(t)
                }, function(e) {
                    "TIMEOUT" !== e && (o.default.error("[".concat(b.clientId, "] Leave Channel Failed"), e),
                    b.state = E,
                    t && t(e))
                }) : (b.socket && (b.socket.close(),
                b.socket = void 0),
                o.default.info("[".concat(b.clientId, "] Leave channel before joined")),
                b.state = S,
                e && e()),
                b.localStreams)
                    if (b.localStreams.hasOwnProperty(i)) {
                        var a = b.localStreams[i];
                        delete b.localStreams[i],
                        void 0 !== a.pc && (a.pc.close(),
                        a.pc = void 0)
                    }
                D()
            }
            ,
            b.publish = function(e, t, n, i) {
                var c = (new Date).getTime()
                  , d = !1;
                if (e.publishLTS = c,
                "object" !== Se()(e) || null === e)
                    return o.default.error("[".concat(b.clientId, "] Invalid local stream")),
                    i && i(I.default.INVALID_LOCAL_STREAM),
                    void s.b.publish(b.joinInfo.sid, {
                        lts: c,
                        succ: !1,
                        audioName: e.hasAudio() && e.audioName,
                        videoName: e.hasVideo() && e.videoName,
                        screenName: e.hasScreen() && e.screenName,
                        ec: I.default.INVALID_LOCAL_STREAM
                    });
                if (!e.stream && void 0 === e.url)
                    return o.default.error("[".concat(b.clientId, "] Invalid local media stream")),
                    i && i(I.default.INVALID_LOCAL_STREAM),
                    void s.b.publish(b.joinInfo.sid, {
                        lts: c,
                        succ: !1,
                        audioName: e.hasAudio() && e.audioName,
                        videoName: e.hasVideo() && e.videoName,
                        screenName: e.hasScreen() && e.screenName,
                        ec: I.default.INVALID_LOCAL_STREAM
                    });
                if (b.state !== E)
                    return o.default.error("[".concat(b.clientId, "] User is not in the session")),
                    i && i(I.default.INVALID_OPERATION),
                    void s.b.publish(b.joinInfo.sid, {
                        lts: c,
                        succ: !1,
                        audioName: e.hasAudio() && e.audioName,
                        videoName: e.hasVideo() && e.videoName,
                        screenName: e.hasScreen() && e.screenName,
                        ec: I.default.INVALID_OPERATION
                    });
                var u = e.getAttributes() || {};
                if (e.local && void 0 === b.localStreams[e.getId()] && (e.hasAudio() || e.hasVideo() || e.hasScreen())) {
                    var f = b.generateP2PId();
                    if (b.p2ps.set(f, e),
                    e.p2pId = f,
                    void 0 !== e.url)
                        w(m({
                            state: "url",
                            audio: e.hasAudio(),
                            video: e.hasVideo(),
                            attributes: e.getAttributes()
                        }, e.url), function(t, n) {
                            "success" === t ? (e.getUserId() !== n && e.setUserId(n),
                            b.localStreams[n] = e,
                            e.onClose = function() {
                                b.unpublish(e)
                            }
                            ) : o.default.error("[".concat(b.clientId, "] Publish local stream failed"), t)
                        });
                    else {
                        b.localStreams[e.getId()] = e,
                        e.connectionSpec = {
                            callback: function(u) {
                                o.default.debug("[".concat(b.clientId, "] SDP exchange in publish : send offer --  "), JSON.parse(u)),
                                b.makeRequest(m({
                                    state: "offer",
                                    stream_type: 1 == t.streamType ? "low" : "high",
                                    p2p_id: f,
                                    sdp: u,
                                    audio: e.audio || e.screenAudio,
                                    video: e.screen || e.video,
                                    screen: e.screen,
                                    attributes: e.getAttributes(),
                                    dtx: e.DTX,
                                    hq: e.highQuality,
                                    lq: e.lowQuality,
                                    stereo: e.stereo,
                                    speech: e.speech,
                                    codec: b.codec,
                                    extend: Object(r.getParameter)("PUB_EXTEND")
                                }), function(t) {
                                    e.getUserId() !== t.uid && e.setUserId(t.uid),
                                    o.default.info("[".concat(b.clientId, "] Local stream published with uid"), t.uid),
                                    e.onClose = function() {
                                        b.unpublish(e)
                                    }
                                    ,
                                    e._onAudioUnmute = function() {
                                        b.makeReport(a({
                                            action: "unmute_local_audio",
                                            stream_id: e.getId()
                                        }))
                                    }
                                    ,
                                    e._onVideoUnmute = function() {
                                        b.makeReport(a({
                                            action: "unmute_local_video",
                                            stream_id: e.getId()
                                        }))
                                    }
                                    ,
                                    e._onAudioMute = function() {
                                        b.makeReport(a({
                                            action: "mute_local_audio",
                                            stream_id: e.getId()
                                        }))
                                    }
                                    ,
                                    e._onVideoMute = function() {
                                        b.makeReport(a({
                                            action: "mute_local_video",
                                            stream_id: e.getId()
                                        }))
                                    }
                                    ,
                                    e.getId() === e.getUserId() && (e.isAudioOn() || e.hasAudio() && (o.default.debug("[".concat(b.clientId, "] local stream audio mute")),
                                    e._onAudioMute()),
                                    e.isVideoOn() || (e.hasVideo() || e.hasScreen()) && (o.default.debug("[".concat(b.clientId, "] local stream video mute")),
                                    e._onVideoMute())),
                                    e.pc.oniceconnectionstatechange = function(t) {
                                        if ("failed" === t) {
                                            if (null != b.timers[e.getId()] && (clearInterval(b.timers[e.getId()]),
                                            clearInterval(b.timers[e.getId()] + "_RelatedStats")),
                                            o.default.error("[".concat(b.clientId, "] Publisher connection is lost -- streamId: ").concat(e.getId(), ", p2pId: ").concat(f)),
                                            b.p2ps.delete(f),
                                            o.default.debug("[".concat(b.clientId, "] publish p2p failed: "), b.p2ps),
                                            !d)
                                                return d = !0,
                                                s.b.publish(b.joinInfo.sid, {
                                                    lts: c,
                                                    succ: !1,
                                                    audioName: e.hasAudio() && e.audioName,
                                                    videoName: e.hasVideo() && e.videoName,
                                                    screenName: e.hasScreen() && e.screenName,
                                                    ec: I.default.PEERCONNECTION_FAILED
                                                }),
                                                b.dispatchEvent(l({
                                                    type: "pubP2PLost",
                                                    stream: e
                                                })),
                                                i && i(I.default.PEERCONNECTION_FAILED);
                                            b.dispatchEvent(l({
                                                type: "pubP2PLost",
                                                stream: e
                                            }))
                                        } else if ("connected" === t && (o.default.debug("[".concat(b.clientId, "] publish p2p connected: "), b.p2ps),
                                        e._isAudioMuted() ? b.makeReport(a({
                                            action: "mute_local_audio",
                                            stream_id: e.getId()
                                        })) : b.makeReport(a({
                                            action: "unmute_local_audio",
                                            stream_id: e.getId()
                                        })),
                                        e._isVideoMuted() ? b.makeReport(a({
                                            action: "mute_local_video",
                                            stream_id: e.getId()
                                        })) : b.makeReport(a({
                                            action: "unmute_local_video",
                                            stream_id: e.getId()
                                        })),
                                        !d))
                                            return d = !0,
                                            s.b.publish(b.joinInfo.sid, {
                                                lts: c,
                                                succ: !0,
                                                audioName: e.hasAudio() && e.audioName,
                                                videoName: e.hasVideo() && e.videoName,
                                                screenName: e.hasScreen() && e.screenName,
                                                ec: null
                                            }),
                                            n && n()
                                    }
                                    ,
                                    o.default.debug("[".concat(b.clientId, "] SDP exchange in publish : receive answer --  "), JSON.parse(t.sdp)),
                                    e.pc.processSignalingMessage(t.sdp)
                                }, function(t, n) {
                                    o.default.error("Publish Failed: ".concat(t)),
                                    s.b.publish(b.joinInfo.sid, {
                                        lts: c,
                                        succ: !1,
                                        audioName: e.hasAudio() && e.audioName,
                                        videoName: e.hasVideo() && e.videoName,
                                        screenName: e.hasScreen() && e.screenName,
                                        ec: t
                                    }),
                                    "TIMEOUT" != t && (b.processPublishFailure(e),
                                    i && i(t))
                                })
                            },
                            audio: e.hasAudio(),
                            video: e.hasVideo(),
                            screen: e.hasScreen(),
                            isSubscriber: !1,
                            stunServerUrl: b.stunServerUrl,
                            turnServers: b.joinInfo.turnServers,
                            maxAudioBW: u.maxAudioBW,
                            minVideoBW: u.minVideoBW,
                            maxVideoBW: u.maxVideoBW,
                            mode: b.mode,
                            codec: b.codec,
                            isVideoMute: e.userMuteVideo || e.peerMuteVideo,
                            isAudioMute: e.userMuteAudio || e.peerMuteAudio,
                            maxFrameRate: e.attributes.maxFrameRate,
                            clientId: b.clientId
                        },
                        e.pc = V(e.connectionSpec),
                        e.pc.addStream(e.stream),
                        o.default.debug("[".concat(b.clientId, "] PeerConnection add stream :"), e.stream),
                        e.pc.onnegotiationneeded = function(n) {
                            var i = {
                                state: "negotiation",
                                stream_type: 1 === t.streamType ? "low" : "high",
                                p2p_id: f,
                                sdp: n
                            };
                            b.makeRequest(m(i), function(t) {
                                o.default.debug("Negotating Stream ".concat(e.getId())),
                                e.pc.processSignalingMessage(t.sdp)
                            }, function(e, t) {
                                o.default.error("Negotiation failed ".concat(e), t, i)
                            })
                        }
                        ,
                        clearInterval(b.timers[e.getId()]),
                        b.timers[e.getId()] = setInterval(function() {
                            if (Object(r.getParameter)("REPORT_STATS")) {
                                var t = 0;
                                e && e.pc && e.pc.getStats && e.pc.getStatsRate(function(n) {
                                    n.forEach(function(n) {
                                        if (n && n.id && !/_recv$/.test(n.id) && !/^time$/.test(n.id) && e.getUserId()) {
                                            if (-1 === n.id.indexOf("outbound_rtp") && -1 === n.id.indexOf("OutboundRTP") && -1 === n.type.toLowerCase().indexOf("outbound") || "video" !== n.mediaType || (n.googFrameWidthSent = e.videoWidth + "",
                                            n.googFrameHeightSent = e.videoHeight + ""),
                                            "video" === n.mediaType)
                                                try {
                                                    var i = e.stream.getVideoTracks()[0];
                                                    n.A_vstd = i.enabled ? "0" : "1"
                                                } catch (e) {}
                                            if ("audio" === n.mediaType)
                                                try {
                                                    var a = e.stream.getAudioTracks()[0];
                                                    n.A_astd = a.enabled ? "0" : "1"
                                                } catch (e) {}
                                            if (e.getId() == e.getUserId()) {
                                                var s = 200 * t;
                                                t++,
                                                setTimeout(function() {
                                                    var e = b.socket && b.socket.getLastMsgTime() && Date.now() - b.socket.getLastMsgTime();
                                                    e > Object(r.getParameter)("REPORT_STATS_TIMEOUT") ? o.default.debug("PublishStats report blocked by REPORT_STATS_TIMEOUT ".concat(e)) : b.makeReport(function(e) {
                                                        var t = {};
                                                        return Object.keys(e).forEach(function(n) {
                                                            Object(r.getParameter)("STATS_FILTER")[n] || (t[Xe(n)] = e[n])
                                                        }),
                                                        {
                                                            _type: "publish_stats",
                                                            _message: {
                                                                stream_type: "high",
                                                                stats: t
                                                            }
                                                        }
                                                    }(n))
                                                }, s)
                                            } else {
                                                s = 200 * t;
                                                t++,
                                                setTimeout(function() {
                                                    var e = b.socket && b.socket.getLastMsgTime() && Date.now() - b.socket.getLastMsgTime();
                                                    e > Object(r.getParameter)("REPORT_STATS_TIMEOUT") ? o.default.debug("PublishStatsLow report blocked by REPORT_STATS_TIMEOUT ".concat(e)) : b.makeReport(function(e) {
                                                        var t = {};
                                                        return Object.keys(e).forEach(function(n) {
                                                            Object(r.getParameter)("STATS_FILTER")[n] || (t[Xe(n)] = e[n])
                                                        }),
                                                        {
                                                            _type: "publish_stats",
                                                            _message: {
                                                                stream_type: "low",
                                                                stats: t
                                                            }
                                                        }
                                                    }(n))
                                                }, s)
                                            }
                                        }
                                    })
                                })
                            }
                        }, 3e3);
                        var p = function() {
                            Object(r.getParameter)("REPORT_STATS") && e && e.pc && e.pc.getVideoRelatedStats && e.pc.getVideoRelatedStats(function(t) {
                                var n, i, a = b.socket && b.socket.getLastMsgTime() && Date.now() - b.socket.getLastMsgTime();
                                a > Object(r.getParameter)("REPORT_STATS_TIMEOUT") ? o.default.debug("PublishRelatedStats report blocked by REPORT_STATS_TIMEOUT ".concat(a)) : e.getId() === e.getUserId() ? b.makeReport((n = t,
                                i = {},
                                Object.keys(n).forEach(function(e) {
                                    Object(r.getParameter)("STATS_FILTER")[e] || (i[Xe(e)] = n[e])
                                }),
                                {
                                    _type: "publish_related_stats",
                                    _message: {
                                        stream_type: "high",
                                        stats: i
                                    }
                                })) : b.makeReport(function(e) {
                                    var t = {};
                                    return Object.keys(e).forEach(function(n) {
                                        Object(r.getParameter)("STATS_FILTER")[n] || (t[Xe(n)] = e[n])
                                    }),
                                    {
                                        _type: "publish_related_stats",
                                        _message: {
                                            stream_type: "low",
                                            stats: t
                                        }
                                    }
                                }(t))
                            })
                        };
                        p(),
                        clearInterval(b.timers[e.getId() + "_RelatedStats"]),
                        b.timers[e.getId() + "_RelatedStats"] = setInterval(p, 1e3)
                    }
                }
            }
            ,
            b.unpublish = function(e, t, n, i) {
                if ("object" !== Se()(e) || null === e)
                    return o.default.error("[".concat(b.clientId, "] Invalid local stream")),
                    void R(i, I.default.INVALID_LOCAL_STREAM);
                if (b.state !== E)
                    return o.default.error("[".concat(b.clientId, "] User not in the session")),
                    void R(i, I.default.INVALID_OPERATION);
                if (null != b.timers[e.getId()] && (clearInterval(b.timers[e.getId()]),
                clearInterval(b.timers[e.getId() + "_RelatedStats"])),
                void 0 !== b.socket)
                    if (e.local && void 0 !== b.localStreams[e.getId()]) {
                        delete b.localStreams[e.getId()];
                        var a = {
                            stream_id: e.getUserId(),
                            stream_type: 1 === t.streamType ? "low" : "high"
                        };
                        b.makeRequest({
                            _type: "unpublish",
                            _message: a
                        }),
                        (e.hasAudio() || e.hasVideo() || e.hasScreen()) && void 0 === e.url && void 0 !== e.pc && (e.pc.close(),
                        e.pc = void 0),
                        e.onClose = void 0,
                        e._onAudioMute = void 0,
                        e._onAudioUnute = void 0,
                        e._onVideoMute = void 0,
                        e._onVideoUnmute = void 0,
                        b.p2ps.delete(e.p2pId),
                        b.dispatchEvent({
                            type: "stream-unpublished",
                            stream: e,
                            options: t
                        }),
                        n && n()
                    } else
                        o.default.error("[".concat(b.clientId, "] Invalid local stream")),
                        R(i, I.default.INVALID_LOCAL_STREAM);
                else
                    o.default.error("[".concat(b.clientId, "] User not in the session")),
                    R(i, I.default.INVALID_OPERATION)
            }
            ,
            b.subscribe = function(e, t, n) {
                var i = (new Date).getTime();
                e.subscribeLTS = i;
                var c = !1;
                if (o.default.info("[".concat(b.clientId, "] Gatewayclient ").concat(b.uid, " Subscribe ").concat(e.getId(), ": ").concat(JSON.stringify(e.subscribeOptions))),
                "object" !== Se()(e) || null === e)
                    return o.default.error("[".concat(b.clientId, "] Invalid remote stream")),
                    n && n(I.default.INVALID_REMOTE_STREAM),
                    void s.b.subscribe(b.joinInfo.sid, {
                        lts: i,
                        succ: !1,
                        video: e.subscribeOptions && e.subscribeOptions.video,
                        audio: e.subscribeOptions && e.subscribeOptions.audio,
                        peerid: e.getId(),
                        ec: I.default.INVALID_REMOTE_STREAM
                    });
                if (b.state !== E && (o.default.error("[".concat(b.clientId, "] User is not in the session")),
                !c))
                    return c = !0,
                    s.b.subscribe(b.joinInfo.sid, {
                        lts: i,
                        succ: !1,
                        video: e.subscribeOptions && e.subscribeOptions.video,
                        audio: e.subscribeOptions && e.subscribeOptions.audio,
                        peerid: e.getId(),
                        ec: I.default.INVALID_OPERATION
                    }),
                    n && n(I.default.INVALID_OPERATION);
                if (!e.local && b.remoteStreams.hasOwnProperty(e.getId()))
                    if (e.hasAudio() || e.hasVideo() || e.hasScreen()) {
                        var f = b.generateP2PId();
                        b.p2ps.set(f, e),
                        e.p2pId = f,
                        e.pc = V({
                            callback: function(t) {
                                o.default.debug("[".concat(b.clientId, "] SDP exchange in subscribe : send offer --  "), JSON.parse(t));
                                var a = {
                                    stream_id: e.getId(),
                                    audio: !e.subscribeOptions || e.subscribeOptions.audio,
                                    video: !e.subscribeOptions || e.subscribeOptions.video,
                                    codec: b.codec,
                                    p2p_id: f,
                                    sdp: t,
                                    tcc: Object(r.getParameter)("SUBSCRIBE_TCC"),
                                    extend: Object(r.getParameter)("SUB_EXTEND")
                                };
                                b.makeRequest({
                                    _type: "subscribe",
                                    _message: a
                                }, function(t) {
                                    o.default.debug("[".concat(b.clientId, "] SDP exchange in subscribe : receive answer --  "), JSON.parse(t.sdp)),
                                    e.pc.processSignalingMessage(t.sdp)
                                }, function(t, a) {
                                    o.default.error("[".concat(b.clientId, "] Subscribe remote stream Failed: ").concat(t, ", closing stream "), e.getId(), a),
                                    s.b.subscribe(b.joinInfo.sid, {
                                        lts: i,
                                        succ: !1,
                                        video: e.subscribeOptions && e.subscribeOptions.video,
                                        audio: e.subscribeOptions && e.subscribeOptions.audio,
                                        peerid: e.getId(),
                                        ec: t
                                    }),
                                    "TIMEOUT" != t && (b.processSubscribeFailure(e),
                                    n && n(t))
                                })
                            },
                            nop2p: !0,
                            audio: !0,
                            video: !0,
                            screen: e.hasScreen(),
                            isSubscriber: !0,
                            stunServerUrl: b.stunServerUrl,
                            turnServers: b.joinInfo.turnServers,
                            isVideoMute: e.userMuteVideo,
                            isAudioMute: e.userMuteAudio,
                            uid: e.getId(),
                            clientId: b.clientId
                        }),
                        e.pc.onaddstream = function(t, n) {
                            if (e._onAudioUnmute = function() {
                                b.makeReport(a({
                                    action: "unmute_remote_audio",
                                    stream_id: e.getId()
                                }), function() {}, function() {})
                            }
                            ,
                            e._onAudioMute = function() {
                                b.makeReport(a({
                                    action: "mute_remote_audio",
                                    stream_id: e.getId()
                                }), function() {}, function() {})
                            }
                            ,
                            e._onVideoUnmute = function() {
                                b.makeReport(a({
                                    action: "unmute_remote_video",
                                    stream_id: e.getId()
                                }), function() {}, function() {})
                            }
                            ,
                            e._onVideoMute = function() {
                                b.makeReport(a({
                                    action: "mute_remote_video",
                                    stream_id: e.getId()
                                }), function() {}, function() {})
                            }
                            ,
                            "ontrack" === n && "video" === t.track.kind || "onaddstream" === n) {
                                o.default.info("[".concat(b.clientId, "] Remote stream subscribed with uid "), e.getId());
                                var i = b.remoteStreams[e.getId()];
                                if (b.remoteStreams[e.getId()].stream = "onaddstream" === n ? t.stream : t.streams[0],
                                b.remoteStreams[e.getId()].hasVideo()) {
                                    if (Object(g.isFireFox)() || Object(g.isSafari)()) {
                                        var r = b.remoteStreams[e.getId()].stream;
                                        Object(F.vsResHack)(r, function(t, n) {
                                            e.videoWidth = t,
                                            e.videoHeight = n
                                        }, function(e) {
                                            return o.default.warning("[".concat(b.clientId, "] vsResHack failed: ") + e)
                                        })
                                    }
                                } else {
                                    var s = b.remoteStreams[e.getId()];
                                    s.peerMuteVideo = !0,
                                    b._adjustPCMuteStatus(s)
                                }
                                i && i.isPlaying() && i.elementID && (o.default.debug("[".concat(b.clientId, "] Reload Player ").concat(i.elementID, " StreamId ").concat(i.getId())),
                                e.audioOutput = i.audioOutput,
                                i.stop(),
                                e.play(i.elementID, i.playOptions)),
                                delete e.audioLevelHelper;
                                var c = u({
                                    type: "stream-subscribed",
                                    stream: b.remoteStreams[e.getId()]
                                });
                                b.dispatchEvent(c)
                            }
                        }
                        ,
                        clearInterval(b.timers[e.getId()]),
                        b.timers[e.getId()] = setInterval(function() {
                            if (Object(r.getParameter)("REPORT_STATS")) {
                                var t = 0;
                                e && e.pc && e.pc.getStats && e.pc.getStatsRate(function(n) {
                                    n.forEach(function(n) {
                                        if (n && n.id) {
                                            if (/_send$/.test(n.id) || /^time$/.test(n.id) || /^bweforvideo$/.test(n.id))
                                                return;
                                            -1 === n.id.indexOf("inbound_rtp") && -1 === n.id.indexOf("inbound-rtp") && -1 === n.type.toLowerCase().indexOf("inbound") || "video" !== n.mediaType || (n.googFrameWidthReceived = e.videoWidth + "",
                                            n.googFrameHeightReceived = e.videoHeight + "");
                                            var i = 200 * t;
                                            t++;
                                            var a = e.getId();
                                            setTimeout(function() {
                                                var t = b.socket && b.socket.getLastMsgTime() && Date.now() - b.socket.getLastMsgTime();
                                                if (t > Object(r.getParameter)("REPORT_STATS_TIMEOUT"))
                                                    o.default.debug("SubscribeStats report blocked by REPORT_STATS_TIMEOUT ".concat(t));
                                                else {
                                                    if ("video" === n.mediaType)
                                                        try {
                                                            var i = e.stream.getVideoTracks()[0];
                                                            n.A_vrtd = i.enabled ? "0" : "1"
                                                        } catch (e) {}
                                                    if ("audio" === n.mediaType)
                                                        try {
                                                            var s = e.stream.getAudioTracks()[0];
                                                            n.A_artd = s.enabled ? "0" : "1"
                                                        } catch (e) {}
                                                    b.makeReport(v(a, n))
                                                }
                                            }, i)
                                        } else
                                            ;
                                    })
                                })
                            }
                        }, 3e3),
                        clearInterval(b.timers[e.getId() + "_RelatedStats"]),
                        b.timers[e.getId() + "_RelatedStats"] = setInterval(function() {
                            if (Object(r.getParameter)("REPORT_STATS") && e && e.pc) {
                                var t = b.socket && b.socket.getLastMsgTime() && Date.now() - b.socket.getLastMsgTime();
                                if (t > Object(r.getParameter)("REPORT_STATS_TIMEOUT"))
                                    return void o.default.debug("SubscribeRelatedStats report blocked by REPORT_STATS_TIMEOUT ".concat(t));
                                e.pc.getVideoRelatedStats && e.pc.getVideoRelatedStats(function(t) {
                                    e.player && (t.isFreeze = e.player.freezeCount > e.player.lastFreezeCount,
                                    e.player.lastFreezeCount = e.player.freezeCount),
                                    b.makeReport(d(e.getId(), t))
                                }),
                                e.pc.getAudioRelatedStats && e.pc.getAudioRelatedStats(function(t) {
                                    b.makeReport(d(e.getId(), t))
                                })
                            }
                        }, 1e3),
                        b.audioLevel[e.getId()] = 0,
                        clearInterval(b.timers[e.getId() + "audio"]),
                        b.timers[e.getId() + "audio"] = setInterval(function() {
                            b.hasListeners("active-speaker") && e && e.pc && "established" === e.pc.state && e.pc.getStats && e.pc.getStats(function(t) {
                                t.forEach(function(t) {
                                    if ("audio" === t.mediaType) {
                                        if (t.audioOutputLevel > 5e3)
                                            for (var n in b.audioLevel[e.getId()] < 20 && (b.audioLevel[e.getId()] += 1),
                                            b.audioLevel)
                                                n !== "" + e.getId() && b.audioLevel[n] > 0 && (b.audioLevel[n] -= 1);
                                        var i = Object.keys(b.audioLevel).sort(function(e, t) {
                                            return b.audioLevel[t] - b.audioLevel[e]
                                        });
                                        if (b.activeSpeaker !== i[0]) {
                                            var a = l({
                                                type: "active-speaker",
                                                uid: i[0]
                                            });
                                            b.dispatchEvent(a),
                                            b.activeSpeaker = i[0],
                                            o.default.debug("[".concat(b.clientId, "] Update active speaker: ").concat(b.activeSpeaker))
                                        }
                                    }
                                })
                            }, 50)
                        }, 50),
                        e.pc.oniceconnectionstatechange = function(a) {
                            if ("failed" === a)
                                null != b.timers[e.getId()] && (clearInterval(b.timers[e.getId()]),
                                clearInterval(b.timers[e.getId()] + "audio")),
                                o.default.error("[".concat(b.clientId, "] Subscriber connection is lost -- streamId: ").concat(e.getId(), ", p2pId: ").concat(f)),
                                o.default.debug("[".concat(b.clientId, "] subscribe p2p failed: "), b.p2ps),
                                c || (c = !0,
                                n && n(I.default.PEERCONNECTION_FAILED),
                                s.b.subscribe(b.joinInfo.sid, {
                                    lts: i,
                                    succ: !1,
                                    video: e.subscribeOptions && e.subscribeOptions.video,
                                    audio: e.subscribeOptions && e.subscribeOptions.audio,
                                    peerid: e.getId(),
                                    ec: I.default.PEERCONNECTION_FAILED
                                })),
                                b.remoteStreams[e.getId()] && b.p2ps.has(f) && (b.p2ps.delete(f),
                                b.dispatchEvent(l({
                                    type: "subP2PLost",
                                    stream: e
                                })));
                            else if ("connected" === a && (o.default.debug("[".concat(b.clientId, "] subscribe p2p connected: "), b.p2ps),
                            !c)) {
                                c = !0,
                                s.b.subscribe(b.joinInfo.sid, {
                                    lts: i,
                                    succ: !0,
                                    video: e.subscribeOptions && e.subscribeOptions.video,
                                    audio: e.subscribeOptions && e.subscribeOptions.audio,
                                    peerid: e.getId(),
                                    ec: null
                                }),
                                b._adjustPCMuteStatus(e);
                                var r = !1
                                  , d = !1
                                  , u = setInterval(function() {
                                    r && d || (e.pc ? e.pc.getStats(function(t) {
                                        t.forEach(function(t) {
                                            (-1 !== t.id.indexOf("recv") || t.type && -1 !== t.type.toLowerCase().indexOf("inbound") || -1 !== t.id.indexOf("inbound_rtp") || -1 !== t.id.indexOf("inbound-rtp") || -1 !== t.id.indexOf("InboundRTP")) && "audio" === t.mediaType && ((t.googDecodingNormal > 0 || t.audioOutputLevel > 0) && (r || (r = !0,
                                            b.dispatchEvent({
                                                type: "first-audio-frame-decode",
                                                stream: e
                                            }),
                                            r && d && clearInterval(u),
                                            s.b.firstAudioDecode(b.joinInfo.sid, {
                                                peerid: e.uintId,
                                                elapse: Date.now() - e.subscribeLTS,
                                                uid: b.uid
                                            }))),
                                            parseInt(t.packetsReceived) > 0 && (d || (d = !0,
                                            b.dispatchEvent({
                                                type: "first-audio-packet-received",
                                                stream: e
                                            }),
                                            r && d && clearInterval(u),
                                            s.b.firstAudioReceived(b.joinInfo.sid, {
                                                peerid: e.uintId,
                                                elapse: Date.now() - e.subscribeLTS,
                                                uid: b.uid
                                            }))))
                                        })
                                    }, 100) : clearInterval(u))
                                }, 100)
                                  , p = !1
                                  , g = !1
                                  , m = setInterval(function() {
                                    p && g || (e.pc ? e.pc.getStats(function(t) {
                                        t.forEach(function(t) {
                                            (-1 !== t.id.indexOf("recv") || t.type && -1 !== t.type.toLowerCase().indexOf("inbound") || -1 !== t.id.indexOf("inbound_rtp") || -1 !== t.id.indexOf("inbound-rtp") || -1 !== t.id.indexOf("InboundRTP")) && "video" === t.mediaType && ((t.framesDecoded > 0 || t.googFramesDecoded > 0) && (p || (p = !0,
                                            b.dispatchEvent({
                                                type: "first-video-frame-decode",
                                                stream: e
                                            }),
                                            p && g && clearInterval(m),
                                            e.firstFrameTime = (new Date).getTime() - e.subscribeLTS,
                                            s.b.firstVideoDecode(b.joinInfo.sid, {
                                                peerid: e.uintId,
                                                elapse: Date.now() - e.subscribeLTS,
                                                width: parseInt(t.googFrameWidthReceived) || 0,
                                                height: parseInt(t.googFrameHeightReceived) || 0,
                                                uid: b.uid
                                            }))),
                                            t.packetsReceived > 0 && (g || (g = !0,
                                            b.dispatchEvent({
                                                type: "first-video-packet-received",
                                                stream: e
                                            }),
                                            p && g && clearInterval(m),
                                            s.b.firstVideoReceived(b.joinInfo.sid, {
                                                peerid: e.uintId,
                                                elapse: Date.now() - e.subscribeLTS,
                                                uid: b.uid
                                            }))))
                                        })
                                    }, 100) : clearInterval(m))
                                }, 100);
                                return e.sid = b.joinInfo.sid,
                                t && t()
                            }
                        }
                    } else
                        o.default.error("[".concat(b.clientId, "] Invalid remote stream")),
                        c || (c = !0,
                        n && n(I.default.INVALID_REMOTE_STREAM),
                        s.b.subscribe(b.joinInfo.sid, {
                            lts: i,
                            succ: !1,
                            video: e.subscribeOptions && e.subscribeOptions.video,
                            audio: e.subscribeOptions && e.subscribeOptions.audio,
                            peerid: e.getId(),
                            ec: I.default.INVALID_REMOTE_STREAM
                        }));
                else
                    o.default.error("[".concat(b.clientId, "] No such remote stream")),
                    c || (c = !0,
                    n && n(I.default.NO_SUCH_REMOTE_STREAM),
                    s.b.subscribe(b.joinInfo.sid, {
                        lts: i,
                        succ: !1,
                        video: e.subscribeOptions && e.subscribeOptions.video,
                        audio: e.subscribeOptions && e.subscribeOptions.audio,
                        peerid: e.getId(),
                        ec: I.default.NO_SUCH_REMOTE_STREAM
                    }))
            }
            ,
            b.subscribeChange = function(e, t, n) {
                var i = Date.now();
                o.default.info("[".concat(b.clientId, "] Gatewayclient ").concat(b.uid, " SubscribeChange ").concat(e.getId(), ": ").concat(JSON.stringify(e.subscribeOptions))),
                b._adjustPCMuteStatus(e);
                var a = {
                    stream_id: e.getId(),
                    audio: e.subscribeOptions.audio,
                    video: e.subscribeOptions.video
                };
                b.makeRequest({
                    _type: "subscribe_change",
                    _message: a
                }, function(n) {
                    var a = u({
                        type: "stream-subscribe-changed",
                        stream: b.remoteStreams[e.getId()]
                    });
                    s.b.subscribe(b.joinInfo.sid, {
                        lts: i,
                        succ: !0,
                        video: e.subscribeOptions && e.subscribeOptions.video,
                        audio: e.subscribeOptions && e.subscribeOptions.audio,
                        peerid: e.getId(),
                        ec: null
                    }),
                    b.dispatchEvent(a),
                    t && t()
                }, function(t, i) {
                    o.default.error("[".concat(b.clientId, "] Subscribe Change Failed ").concat(e.getId()), t, i),
                    n && n(t, i)
                })
            }
            ,
            b.processPublishFailure = function(e) {
                e.publishLTS = null,
                e.p2pId && b.p2ps.get(e.p2pId) === e && b.p2ps.delete(e.p2pId),
                b.localStreams[e.getUserId()] === e && delete b.localStreams[e.getUserId()],
                b.localStreams[e.getId()] === e && delete b.localStreams[e.getId()],
                e.pc && (e.pc.processSignalingMessage = function() {}
                ,
                e.pc.oniceconnectionstatechange = function() {}
                ,
                e.pc.close(),
                delete e.pc),
                delete e.onClose,
                delete e._onAudioUnmute,
                delete e._onVideoUnmute,
                delete e._onAudioMute,
                delete e._onVideoMute,
                delete e._onAudioUnmute
            }
            ,
            b.processSubscribeFailure = function(e) {
                e.p2pId && b.p2ps.get(e.p2pId) === e && b.p2ps.delete(e.p2pId),
                e.pc && (e.pc.onaddstream = function() {}
                ,
                e.pc.processSignalingMessage = function() {}
                ,
                e.pc.oniceconnectionstatechange = function() {}
                ,
                e.pc.close(),
                delete e.pc),
                delete e.onClose,
                delete e._onAudioUnmute,
                delete e._onVideoUnmute,
                delete e._onAudioMute,
                delete e._onVideoMute,
                delete e._onAudioUnmute
            }
            ,
            b._adjustPCMuteStatus = function(e) {
                !e.local && e.pc && e.pc.peerConnection.getReceivers && e.pc.peerConnection.getReceivers().forEach(function(t) {
                    if (t && t.track && "audio" === t.track.kind) {
                        var n = !e.userMuteAudio && !e.peerMuteAudio;
                        e.subscribeOptions && !e.subscribeOptions.audio && (n = !1),
                        t.track.enabled = !!n
                    } else if (t && t.track && "video" === t.track.kind) {
                        var i = !e.userMuteVideo && !e.peerMuteVideo;
                        e.subscribeOptions && !e.subscribeOptions.video && (i = !1),
                        t.track.enabled = !!i
                    }
                })
            }
            ,
            b.unsubscribe = function(e, t, n) {
                if ("object" !== Se()(e) || null === e)
                    return o.default.error("[".concat(b.clientId, "] Invalid remote stream")),
                    void R(n, I.default.INVALID_REMOTE_STREAM);
                if (b.state !== E)
                    return o.default.error("[".concat(b.clientId, "] User is not in the session")),
                    void R(n, I.default.INVALID_OPERATION);
                if (null != b.timers[e.getId()] && (clearInterval(b.timers[e.getId()]),
                clearInterval(b.timers[e.getId()] + "audio")),
                null != b.audioLevel[e.getId()] && delete b.audioLevel[e.getId()],
                null != b.timer_counter[e.getId()] && delete b.timer_counter[e.getId()],
                b.remoteStreams.hasOwnProperty(e.getId())) {
                    if (!b.socket)
                        return o.default.error("[".concat(b.clientId, "] User is not in the session")),
                        void R(n, I.default.INVALID_OPERATION);
                    if (e.local)
                        return o.default.error("[".concat(b.clientId, "] Invalid remote stream")),
                        void R(n, I.default.INVALID_REMOTE_STREAM);
                    e.close();
                    var i = {
                        stream_id: e.getId()
                    };
                    b.makeRequest({
                        _type: "unsubscribe",
                        _message: i
                    }),
                    void 0 !== e.pc && (e.pc.close(),
                    e.pc = void 0),
                    e.onClose = void 0,
                    e._onAudioMute = void 0,
                    e._onAudioUnute = void 0,
                    e._onVideoMute = void 0,
                    e._onVideoUnmute = void 0,
                    delete e.subscribeOptions,
                    b.p2ps.delete(e.p2pId),
                    o.default.info("[".concat(b.clientId, "] Unsubscribe stream success")),
                    t && t()
                } else
                    R(n, I.default.NO_SUCH_REMOTE_STREAM)
            }
            ,
            b.setRemoteVideoStreamType = function(e, t) {
                if (o.default.debug("[".concat(b.clientId, "] Switching remote video stream ").concat(e.getId(), " to ").concat(t)),
                "object" === Se()(e) && null !== e)
                    if (b.state === E) {
                        if (!e.local) {
                            switch (t) {
                            case b.remoteVideoStreamTypes.REMOTE_VIDEO_STREAM_HIGH:
                            case b.remoteVideoStreamTypes.REMOTE_VIDEO_STREAM_LOW:
                            case b.remoteVideoStreamTypes.REMOTE_VIDEO_STREAM_MEDIUM:
                                break;
                            default:
                                return
                            }
                            var n = {
                                stream_id: e.getId(),
                                stream_type: t
                            };
                            b.makeRequest({
                                _type: "switch_video_stream",
                                _message: n
                            }, function() {
                                o.default.debug("SwitchVideoStream Success ".concat(n.stream_id, " ").concat(n.stream_type))
                            }, function(e, t) {
                                o.default.error("SwitchVideoStream Error ".concat(e, " ").concat(n.stream_id, " ").concat(n.stream_type), t)
                            })
                        }
                    } else
                        o.default.error("[".concat(b.clientId, "] User is not in the session"));
                else
                    o.default.error("[".concat(b.clientId, "] Invalid remote stream"))
            }
            ,
            b.renewToken = function(e, t, n) {
                e ? b.key ? b.state !== E ? (o.default.debug("[".concat(b.clientId, "] Client is not connected. Trying to rejoin")),
                b.key = e,
                b.rejoin(),
                t && t()) : (o.default.debug("[".concat(b.clientId, "] renewToken from ").concat(b.key, " to ").concat(e)),
                b.makeRequest({
                    _type: "renew_token",
                    _message: {
                        token: e
                    }
                }, t, n)) : (o.default.error("[".concat(b.clientId, "] Client is previously joined without token")),
                n && n(I.default.INVALID_PARAMETER)) : (o.default.error("[".concat(b.clientId, "] Invalid Token ").concat(e)),
                n && n(I.default.INVALID_PARAMETER))
            }
            ,
            b.setStreamFallbackOption = function(e, t) {
                if (o.default.debug("[".concat(b.clientId, "] Set stream fallback option ").concat(e.getId(), " to ").concat(t)),
                "object" === Se()(e) && null !== e)
                    if (b.state === E) {
                        if (!e.local) {
                            switch (t) {
                            case b.streamFallbackTypes.STREAM_FALLBACK_OPTION_DISABLED:
                            case b.streamFallbackTypes.STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW:
                            case b.streamFallbackTypes.STREAM_FALLBACK_OPTION_AUDIO_ONLY:
                                break;
                            default:
                                return
                            }
                            var n = {
                                stream_id: e.getId(),
                                fallback_type: t
                            };
                            b.makeRequest({
                                _type: "set_fallback_option",
                                _message: n
                            }, function() {
                                o.default.debug("SetStreamFallbackOption success ".concat(n.stream_id, " ").concat(t))
                            }, function(e, i) {
                                o.default.error("Failed to SetStreamFallbackOption ".concat(n.stream_id, " ").concat(t, " ").concat(e), i)
                            })
                        }
                    } else
                        o.default.error("[".concat(b.clientId, "] User is not in the session"));
                else
                    o.default.error("[".concat(b.clientId, "] Invalid remote stream"))
            }
            ,
            b.enableAudioVolumeIndicator = function(e, t) {
                b.audioVolumeIndication.enabled = !0,
                b.audioVolumeIndication.interval = e,
                b.audioVolumeIndication.smooth = t,
                b.resetAudioVolumeIndication()
            }
            ,
            b.resetAudioVolumeIndication = function() {
                if (clearInterval(b.timers.audioVolumeIndication),
                clearInterval(b.timers.audioVolumeSampling),
                b.audioVolumeIndication.enabled && b.audioVolumeIndication.interval) {
                    var e = Math.floor(1e3 * b.audioVolumeIndication.smooth / 100);
                    clearInterval(b.timers.audioVolumeSampling),
                    b.timers.audioVolumeSampling = setInterval(function() {
                        b.audioVolumeSampling || (b.audioVolumeSampling = {});
                        var t = {};
                        for (var n in b.remoteStreams) {
                            var i = b.remoteStreams[n];
                            if (i.stream && i.hasAudio()) {
                                var a = i.getAudioLevel();
                                a > 0 && a < 1 && (a *= 100);
                                var r = b.audioVolumeSampling[n] || [];
                                for (r.push(a); r.length > e; )
                                    r.shift();
                                t[n] = r
                            }
                        }
                        b.audioVolumeSampling = t
                    }, 100),
                    clearInterval(b.timers.audioVolumeIndication),
                    b.timers.audioVolumeIndication = setInterval(function() {
                        if (b.socket && b.socket.signal && b.socket.signal.connection && b.socket.signal.connection.readyState === WebSocket.OPEN) {
                            var e = [];
                            for (var t in b.remoteStreams)
                                if (b.audioVolumeSampling && b.audioVolumeSampling[t]) {
                                    var n = b.audioVolumeSampling[t]
                                      , i = 0;
                                    n.forEach(function(e) {
                                        i += e
                                    });
                                    var a = {
                                        uid: t,
                                        level: Math.floor(i / n.length)
                                    };
                                    a.level && e.push(a)
                                }
                            var r = e.sort(function(e, t) {
                                return e.level - t.level
                            });
                            o.default.debug("[".concat(b.clientId, "] volume-indicator "), JSON.stringify(r)),
                            b.audioVolumeIndication.sortedAudioVolumes = r;
                            var s = l({
                                type: "volume-indicator",
                                attr: r
                            });
                            b.dispatchEvent(s)
                        }
                    }, b.audioVolumeIndication.interval)
                }
            }
            ,
            b.closeGateway = function() {
                o.default.debug("[".concat(b.clientId, "] close gateway")),
                b.state = S,
                b.socket.close(),
                C()
            }
            ,
            b.startChannelMediaRelay = function() {
                var e = K()(Y.a.mark(function e(t) {
                    var n, i, a, r;
                    return Y.a.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (!b.channelMediaRelayController) {
                                    e.next = 2;
                                    break
                                }
                                throw new ye.ChannelMediaError("RELAY_ALREADY_START","",ye.CHANNEL_MEDIA_RELAY_ERROR.RELAY_ALREADY_START);
                            case 2:
                                return n = function(e) {
                                    b.dispatchEvent({
                                        type: "channel-media-relay-event",
                                        code: e
                                    })
                                }
                                ,
                                i = function(e, t, n) {
                                    e === ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_FAILURE && t === ye.CHANNEL_MEDIA_RELAY_ERROR.SERVER_CONNECTION_LOST && (b.channelMediaRelayController.dispose(),
                                    b.channelMediaRelayController = null),
                                    b.dispatchEvent({
                                        type: "channel-media-relay-state",
                                        state: e,
                                        code: t,
                                        data: n
                                    })
                                }
                                ,
                                b.channelMediaRelayController = new be.a(b.joinInfo,b.clientId),
                                b.channelMediaRelayController.on("event", n),
                                b.channelMediaRelayController.on("state", i),
                                e.prev = 7,
                                e.next = 10,
                                b.channelMediaRelayController.startChannelMediaRelay(t);
                            case 10:
                                e.next = 22;
                                break;
                            case 12:
                                throw e.prev = 12,
                                e.t0 = e.catch(7),
                                o.default.debug("[".concat(b.clientId, "] startChannelMediaRelay exception: ").concat(JSON.stringify(e.t0))),
                                a = ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_FAILURE,
                                r = "",
                                r = e.t0 instanceof ye.ChannelMediaError ? "SetSourceChannelStatus" === e.t0.data || e.t0.data && e.t0.data.serverResponse && "SetSourceChannel" === e.t0.data.serverResponse.command ? "FAILED_JOIN_SRC" : "SetDestChannelStatus" === e.t0.data || e.t0.data && e.t0.data.serverResponse && "SetDestChannel" === e.t0.data.serverResponse.command ? "FAILED_JOIN_DEST" : e.t0.data && e.t0.data.serverResponse && "StartPacketTransfer" === e.t0.data.serverResponse.command ? "FAILED_PACKET_SENT_TO_DEST" : e.t0.message === ye.CHANNEL_MEDIA_ERROR.REQUEST_TIMEOUT || e.t0.message === ye.CHANNEL_MEDIA_ERROR.WAIT_STATUS_TIMEOUT ? "SERVER_NO_RESPONSE" : e.t0.message === ye.CHANNEL_MEDIA_ERROR.REQUEST_FAILED || e.t0.message === ye.CHANNEL_MEDIA_ERROR.WAIT_STATUS_ERROR ? "SERVER_ERROR_RESPONSE" : e.t0.message === ye.CHANNEL_MEDIA_ERROR.AP_REQUEST_TIMEOUT ? "NO_RESOURCE_AVAILABLE" : e.t0.message === ye.CHANNEL_MEDIA_ERROR.WS_ABORT || e.t0.message === ye.CHANNEL_MEDIA_ERROR.AP_REQUEST_ABORT ? "OPERATION_ABORT" : "INTERNAL_ERROR" : "INTERNAL_ERROR",
                                b.dispatchEvent({
                                    type: "channel-media-relay-state",
                                    state: a,
                                    code: ye.CHANNEL_MEDIA_RELAY_ERROR[r]
                                }),
                                b.channelMediaRelayController && (b.channelMediaRelayController.dispose(),
                                b.channelMediaConfig = null,
                                b.channelMediaRelayController = null),
                                b.dispatchEvent({
                                    type: "channel-media-relay-state",
                                    state: ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_IDLE
                                }),
                                new ye.ChannelMediaError(r,null,ye.CHANNEL_MEDIA_RELAY_ERROR[r]);
                            case 22:
                                b.dispatchEvent({
                                    type: "channel-media-relay-state",
                                    state: ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_RUNNING,
                                    code: ye.CHANNEL_MEDIA_RELAY_ERROR.RELAY_OK
                                }),
                                b.channelMediaConfig = t;
                            case 24:
                            case "end":
                                return e.stop()
                            }
                    }, e, this, [[7, 12]])
                }));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }(),
            b.updateChannelMediaRelay = function() {
                var t = K()(Y.a.mark(function t(n) {
                    var i, a;
                    return Y.a.wrap(function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (b.channelMediaRelayController) {
                                    t.next = 2;
                                    break
                                }
                                throw new ye.ChannelMediaError("RELAY_NOT_START",null,ye.CHANNEL_MEDIA_RELAY_ERROR.RELAY_NOT_START);
                            case 2:
                                return t.prev = 2,
                                t.next = 5,
                                b.channelMediaRelayController.updateChannelMediaRelay(n);
                            case 5:
                                t.next = 18;
                                break;
                            case 7:
                                throw t.prev = 7,
                                t.t0 = t.catch(2),
                                o.default.debug("[".concat(b.clientId, "] updateChannelMediaRelay exception: ").concat(JSON.stringify(e))),
                                i = ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_FAILURE,
                                a = "",
                                a = e instanceof ye.ChannelMediaError ? e.message === ye.CHANNEL_MEDIA_ERROR.REQUEST_TIMEOUT || e.message === ye.CHANNEL_MEDIA_ERROR.WAIT_STATUS_TIMEOUT ? "SERVER_NO_RESPONSE" : e.message === ye.CHANNEL_MEDIA_ERROR.REQUEST_FAILED || e.message === ye.CHANNEL_MEDIA_ERROR.WAIT_STATUS_ERROR ? "SERVER_ERROR_RESPONSE" : e.message === ye.CHANNEL_MEDIA_ERROR.WS_ABORT || e.message === ye.CHANNEL_MEDIA_ERROR.AP_REQUEST_ABORT ? "OPERATION_ABORT" : "INTERNAL_ERROR" : "INTERNAL_ERROR",
                                b.dispatchEvent({
                                    type: "channel-media-relay-event",
                                    code: ye.CHANNEL_MEDIA_RELAY_EVENT.PACKET_UPDATE_DEST_CHANNEL_REFUSED
                                }),
                                b.dispatchEvent({
                                    type: "channel-media-relay-state",
                                    state: i,
                                    code: ye.CHANNEL_MEDIA_RELAY_ERROR[a]
                                }),
                                b.channelMediaRelayController && (b.channelMediaRelayController.dispose(),
                                b.channelMediaConfig = null,
                                b.channelMediaRelayController = null),
                                b.dispatchEvent({
                                    type: "channel-media-relay-state",
                                    state: ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_IDLE
                                }),
                                new ye.ChannelMediaError(a,null,ye.CHANNEL_MEDIA_RELAY_ERROR[a]);
                            case 18:
                                b.channelMediaConfig = n;
                            case 19:
                            case "end":
                                return t.stop()
                            }
                    }, t, this, [[2, 7]])
                }));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }(),
            b.stopChannelMediaRelay = K()(Y.a.mark(function t() {
                var n, i;
                return Y.a.wrap(function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            if (b.channelMediaRelayController) {
                                t.next = 2;
                                break
                            }
                            throw new ye.ChannelMediaError("RELAY_NOT_START",null,ye.CHANNEL_MEDIA_RELAY_ERROR.RELAY_NOT_START);
                        case 2:
                            return t.prev = 2,
                            t.next = 5,
                            b.channelMediaRelayController.stopChannelMediaRelay();
                        case 5:
                            t.next = 17;
                            break;
                        case 7:
                            throw t.prev = 7,
                            t.t0 = t.catch(2),
                            o.default.debug("[".concat(b.clientId, "] stopChannelMediaRelay exception: ").concat(JSON.stringify(e))),
                            n = ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_FAILURE,
                            i = "",
                            i = e instanceof ye.ChannelMediaError ? e.message === ye.CHANNEL_MEDIA_ERROR.REQUEST_TIMEOUT || e.message === ye.CHANNEL_MEDIA_ERROR.WAIT_STATUS_TIMEOUT ? "SERVER_NO_RESPONSE" : e.message === ye.CHANNEL_MEDIA_ERROR.REQUEST_FAILED || e.message === ye.CHANNEL_MEDIA_ERROR.WAIT_STATUS_ERROR ? "SERVER_ERROR_RESPONSE" : "INTERNAL_ERROR" : "INTERNAL_ERROR",
                            b.dispatchEvent({
                                type: "channel-media-relay-state",
                                state: n,
                                code: ye.CHANNEL_MEDIA_RELAY_ERROR[i]
                            }),
                            b.channelMediaRelayController && (b.channelMediaRelayController.dispose(),
                            b.channelMediaConfig = null,
                            b.channelMediaRelayController = null),
                            b.dispatchEvent({
                                type: "channel-media-relay-state",
                                state: ye.CHANNEL_MEDIA_RELAY_STATE.RELAY_STATE_IDLE
                            }),
                            new ye.ChannelMediaError(i,null,ye.CHANNEL_MEDIA_RELAY_ERROR[i]);
                        case 17:
                            b.channelMediaConfig = null,
                            b.channelMediaRelayController = null;
                        case 19:
                        case "end":
                            return t.stop()
                        }
                }, t, this, [[2, 7]])
            })),
            b.sendMetadata = function(e, t) {
                b.makeRequest(function(e) {
                    return {
                        _type: "send_metadata",
                        _message: {
                            session_id: b.joinInfo.sid,
                            metadata: window.btoa(unescape(encodeURIComponent(e)))
                        }
                    }
                }(e), function() {
                    o.default.debug("[".concat(b.clientId, '] send metadata "').concat(e, '" success')),
                    t && t(null)
                }, function(n) {
                    o.default.error("[".concat(b.clientId, '] send metadata "').concat(e, '" failed'), n),
                    t && t(n)
                })
            }
            ;
            var A = function() {
                o.default.debug("[".concat(b.clientId, "] Reconnect gateway")),
                b.state = S,
                b.socket.close(),
                C(),
                b.reconnectMode = "recover",
                b.state = _,
                O()
            };
            b.recover = A;
            var C = function() {
                for (var e in b.dispatchEvent({
                    type: "before-clear-connection"
                }),
                b.timers)
                    b.timers.hasOwnProperty(e) && clearInterval(b.timers[e]);
                for (var e in b.remoteStreams)
                    if (b.remoteStreams.hasOwnProperty(e)) {
                        var t = b.remoteStreams[e]
                          , n = l({
                            type: "stream-removed",
                            uid: t.getId(),
                            stream: t
                        });
                        b.dispatchEvent(n)
                    }
                b.p2ps.clear(),
                D(),
                k(),
                clearInterval(b.pingTimer)
            };
            b.rejoin = function() {
                b.socket && (clearInterval(b.pingTimer),
                b.socket.close(),
                b.socket = void 0),
                b.state = _,
                O()
            }
            ;
            var O = function(e, t) {
                b.dispatchEvent(l({
                    type: "rejoin-start"
                })),
                e = e || function(e) {
                    o.default.info("[".concat(b.clientId, "] User ").concat(e, " is re-joined to ").concat(b.joinInfo.cname)),
                    b.dispatchEvent(l({
                        type: "rejoin"
                    })),
                    b.channelMediaConfig && b.startChannelMediaRelay(b.channelMediaConfig).then(function() {
                        o.default.debug("[".concat(b.clientId, "] restartChannelMediaRelay success"))
                    }).catch(function(e) {
                        o.default.debug("[".concat(b.clientId, "] restartChannelMediaRelay failed: ").concat(JSON.stringify(e)))
                    }),
                    b.liveStreams && b.liveStreams.size && b.liveStreams.forEach(function(e, t) {
                        e && b.setLiveTranscoding(b.transcoding),
                        b.startLiveStreaming(t, e)
                    }),
                    b.injectLiveStreams && b.injectLiveStreams.size && b.injectLiveStreams.forEach(function(e, t) {
                        b.addInjectStreamUrl(t, e)
                    })
                }
                ,
                t = t || function(e) {
                    o.default.error("[".concat(b.clientId, "] Re-join to channel failed "), e),
                    b.dispatchEvent(u({
                        type: "error",
                        reason: e
                    }))
                }
                ,
                b.key ? (++b.rejoinAttempt,
                b.join(b.joinInfo, b.key, e, t)) : o.default.error("[".concat(b.clientId, "] Connection recover failed [Invalid channel key]"))
            }
              , N = function(e, t, n) {
                if (b.onConnect = t,
                b.socket) {
                    if (b.dispatchEvent({
                        type: "reconnect"
                    }),
                    "retry" === b.reconnectMode)
                        o.default.debug("[".concat(b.clientId, "] Retry current gateway")),
                        b.socket.reconnect();
                    else if ("tryNext" === b.reconnectMode)
                        o.default.debug("[".concat(b.clientId, "] Try next gateway")),
                        b.socket.connectNext();
                    else if ("recover" === b.reconnectMode) {
                        o.default.debug("[".concat(b.clientId, "] Recover gateway")),
                        o.default.debug("[".concat(b.clientId, "] Try to reconnect choose server and get gateway list again ")),
                        b.reconnectingCS = !0;
                        var a = b.joinInfo && b.joinInfo.sid;
                        0,
                        We(b.joinInfo, function(e) {
                            o.default.debug("[".concat(b.clientId, "] session:  ").concat(a, " get gateway list success")),
                            b.joinInfo.apResponse = e.res,
                            b.reconnectingCS ? b.socket.replaceHost(e.gateway_addr) : o.default.debug("[".concat(b.clientId, "] session:  ").concat(a, " already leave"))
                        })
                    }
                } else
                    c = e.gatewayAddr,
                    b.socket = Le(c, {
                        sid: b.joinInfo.sid,
                        clientId: b.clientId
                    }),
                    b.socket.on("start-connection", function(e) {
                        b.ticket = e && e.msg && e.msg.ticket
                    }),
                    b.socket.on("on_uplink_stats", function(e) {
                        var t = {};
                        for (var n in e)
                            t[Qe(n)] = e[n];
                        if (b.OutgoingAvailableBandwidth = t.uplink_available_bandwidth,
                        b.localStreams[b.uid]) {
                            var i = b.localStreams[b.uid].uplinkStats;
                            i && i.period_fir === t.period_fir || o.default.debug("[".concat(b.clientId, "]: Period fir change to: ").concat(t.period_fir)),
                            b.localStreams[b.uid].uplinkStats = t
                        }
                    }),
                    b.socket.on("connect", function() {
                        b.dispatchEvent({
                            type: "connected"
                        }),
                        b.attemps = 1,
                        b.onConnect()
                    }),
                    b.socket.on("recover", function() {
                        b.state = _,
                        o.default.debug("[".concat(b.clientId, "] Try to reconnect choose server and get gateway list again ")),
                        b.reconnectingCS = !0;
                        var e = b.joinInfo && b.joinInfo.sid;
                        We(b.joinInfo, function(t) {
                            o.default.debug("[".concat(b.clientId, "] session:  ").concat(e, " get gateway list success")),
                            b.reconnectingCS ? b.socket.replaceHost(t.gateway_addr) : o.default.debug("[".concat(b.clientId, "] session:  ").concat(e, " already leave"))
                        })
                    }),
                    b.socket.on("disconnect", function(e) {
                        if (o.default.debug("[".concat(b.clientId, "] Receive disconnect message")),
                        b.state !== S) {
                            b.state = S;
                            var t = u({
                                type: "error",
                                reason: I.default.SOCKET_DISCONNECTED
                            });
                            if (b.dispatchEvent(t),
                            0 === b.p2ps.size ? b.reconnectMode = "tryNext" : b.reconnectMode = "retry",
                            C(),
                            b.channelMediaRelayController && b.channelMediaRelayController.dispose(),
                            b.channelMediaRelayController = null,
                            1 != i) {
                                var n, a = (n = b.attemps,
                                1e3 * Math.min(30, Math.pow(2, n) - 1));
                                if (o.default.error("[".concat(b.clientId, "] Disconnect from server [").concat(JSON.stringify(e), "], attempt to recover [#").concat(b.attemps, "] after ").concat(a / 1e3, " seconds")),
                                b.hasInvokeLeave)
                                    return o.default.debug("[".concat(b.clientId, "] No reconnection because Client.leave has been invoked")),
                                    void (b.hasInvokeLeave = !1);
                                setTimeout(function() {
                                    b.attemps++,
                                    b.state = _,
                                    b.inChannelInfo && Date.now() - b.inChannelInfo.joinAt > Object(r.getParameter)("TICKET_RENEW_TIMEOUT") ? (o.default.debug("Recovering to renew ticket"),
                                    A()) : O()
                                }, a)
                            }
                        }
                    }),
                    b.socket.on("on_add_audio_stream", function(e) {
                        if (o.default.info("[".concat(b.clientId, "] Newly added audio stream with uid ").concat(e.uid)),
                        b.joinInfo.stringUid && "string" != typeof e.uid && o.default.error("StringUID is Mixed with UintUID"),
                        b.remoteStreamsInChannel.has(e.uid) || b.remoteStreamsInChannel.add(e.uid),
                        void 0 === b.remoteStreams[e.uid]) {
                            var t = Ie({
                                streamID: e.uid,
                                local: !1,
                                audio: e.audio,
                                video: e.video,
                                uintUID: e.uint_id || e.uid
                            });
                            t.peerMuteVideo = !0,
                            b.remoteStreams[e.uid] = t;
                            var n = u({
                                type: "stream-added",
                                stream: t
                            });
                            b.dispatchEvent(n);
                            var i = b.remoteMuteState[e.uid];
                            if (i && i.audio) {
                                n = l({
                                    type: "mute-audio",
                                    uid: e.uid
                                });
                                b.dispatchEvent(n)
                            }
                            if (i && i.video) {
                                n = l({
                                    type: "mute-video",
                                    uid: e.uid
                                });
                                b.dispatchEvent(n)
                            }
                        }
                        s.b.onAddAudioStream(b.joinInfo.sid, {
                            peerid: e.uint_id || e.uid,
                            uid: b.uid
                        })
                    }),
                    b.socket.on("on_update_stream", function(e) {
                        var t = b.remoteStreams[e.uid];
                        if (b.joinInfo.stringUid && "string" != typeof e.uid && o.default.error("StringUID is Mixed with UintUID"),
                        t) {
                            t.audio = e.audio,
                            t.video = e.video,
                            t.screen = e.screen,
                            t.pc && b._adjustPCMuteStatus(t);
                            var n = u({
                                type: "stream-updated",
                                stream: t
                            });
                            b.dispatchEvent(n)
                        } else
                            o.default.debug("[".concat(b.clientId, "] Ignoring onUpdateStream event before onAddStream for uid ").concat(e.uid));
                        s.b.onUpdateStream(b.joinInfo.sid, {
                            peerid: e.uint_id || e.uid,
                            audio: e.audio,
                            video: e.video,
                            uid: b.uid
                        })
                    }),
                    b.socket.on("on_add_video_stream", function(e) {
                        if (o.default.info("[".concat(b.clientId, "] Newly added remote stream with uid ").concat(e.uid, ".")),
                        b.joinInfo.stringUid && "string" != typeof e.uid && o.default.error("StringUID is Mixed with UintUID"),
                        b.remoteStreamsInChannel.has(e.uid) || b.remoteStreamsInChannel.add(e.uid),
                        void 0 === b.remoteStreams[e.uid]) {
                            var t = Ie({
                                streamID: e.uid,
                                local: !1,
                                audio: e.audio,
                                video: e.video,
                                uintUID: e.uint_id || e.uid
                            });
                            b.remoteStreams[e.uid] = t;
                            var n = u({
                                type: "stream-added",
                                stream: t
                            });
                            b.dispatchEvent(n);
                            var i = b.remoteMuteState[e.uid];
                            if (i && i.audio) {
                                n = l({
                                    type: "mute-audio",
                                    uid: e.uid
                                });
                                b.dispatchEvent(n)
                            }
                            if (i && i.video) {
                                n = l({
                                    type: "mute-video",
                                    uid: e.uid
                                });
                                b.dispatchEvent(n)
                            }
                        } else {
                            var a = b.remoteStreams[e.uid];
                            if (void 0 !== a.stream) {
                                if ((t = b.remoteStreams[e.uid]).video = !0,
                                t.peerMuteVideo = !1,
                                t.pc && b._adjustPCMuteStatus(t),
                                o.default.info("[".concat(b.clientId, "] Stream changed: enable video ").concat(e.uid)),
                                t.isPlaying()) {
                                    var r = t.player.elementID;
                                    t.stop(),
                                    t.play(r, t.playOptions)
                                }
                            } else if (a.p2pId)
                                b.remoteStreams[e.uid].video = !0;
                            else {
                                t = Ie({
                                    streamID: e.uid,
                                    local: !1,
                                    audio: !0,
                                    video: !0,
                                    uintUID: e.uint_id || e.uid
                                });
                                b.remoteStreams[e.uid] = t,
                                o.default.info("[".concat(b.clientId, "] Stream changed: modify video ").concat(e.uid))
                            }
                        }
                        s.b.onAddVideoStream(b.joinInfo.sid, {
                            peerid: e.uint_id || e.uid,
                            uid: b.uid
                        })
                    }),
                    b.socket.on("on_remove_stream", function(e) {
                        b.remoteStreamsInChannel.has(e.uid) && b.remoteStreamsInChannel.delete(e.uid);
                        var t = b.remoteStreams[e.uid];
                        if (t) {
                            delete b.remoteStreams[e.uid],
                            delete b.remoteMuteState[e.uid];
                            var n = u({
                                type: "stream-removed",
                                stream: t
                            });
                            b.dispatchEvent(n),
                            t.close(),
                            void 0 !== t.pc && (t.pc.close(),
                            t.pc = void 0,
                            b.p2ps.delete(t.p2pId)),
                            s.b.onRemoveStream(b.joinInfo.sid, {
                                peerid: e.uint_id || e.uid,
                                uid: b.uid
                            })
                        } else
                            o.default.error("ERROR stream ", e.uid, " not found onRemoveStream ", e)
                    }),
                    b.socket.on("on_publish_stream", function(e) {
                        var t = b.localStreams[e.uid]
                          , n = u({
                            type: "streamPublished",
                            stream: t
                        });
                        b.dispatchEvent(n)
                    }),
                    b.socket.on("mute_audio", function(e) {
                        o.default.info("[".concat(b.clientId, "] rcv peer mute audio: ").concat(e.uid)),
                        b.remoteMuteState[e.uid] = b.remoteMuteState[e.uid] || {
                            audio: !1,
                            video: !1
                        },
                        b.remoteMuteState[e.uid].audio = !0;
                        var t = l({
                            type: "mute-audio",
                            uid: e.uid
                        })
                          , n = b.remoteStreams[e.uid];
                        n ? (n.peerMuteAudio = !0,
                        n.pc && b._adjustPCMuteStatus(n),
                        b.dispatchEvent(t)) : o.default.debug("Ignoring event ".concat(e.type), e)
                    }),
                    b.socket.on("unmute_audio", function(e) {
                        o.default.info("[".concat(b.clientId, "] rcv peer unmute audio: ").concat(e.uid)),
                        b.remoteMuteState[e.uid] = b.remoteMuteState[e.uid] || {
                            audio: !1,
                            video: !1
                        },
                        b.remoteMuteState[e.uid].audio = !1;
                        var t = l({
                            type: "unmute-audio",
                            uid: e.uid
                        })
                          , n = b.remoteStreams[e.uid];
                        n ? (n.peerMuteAudio = !1,
                        n.pc && b._adjustPCMuteStatus(n),
                        b.dispatchEvent(t)) : o.default.debug("Ignoring event ".concat(e.type), e)
                    }),
                    b.socket.on("mute_video", function(e) {
                        o.default.info("[".concat(b.clientId, "] rcv peer mute video: ").concat(e.uid)),
                        b.remoteMuteState[e.uid] = b.remoteMuteState[e.uid] || {
                            audio: !1,
                            video: !1
                        },
                        b.remoteMuteState[e.uid].video = !0;
                        var t = l({
                            type: "mute-video",
                            uid: e.uid
                        })
                          , n = b.remoteStreams[e.uid];
                        n ? (n.peerMuteVideo = !0,
                        n.pc && b._adjustPCMuteStatus(n),
                        b.dispatchEvent(t)) : o.default.debug("Ignoring event ".concat(e.type), e)
                    }),
                    b.socket.on("unmute_video", function(e) {
                        o.default.info("[".concat(b.clientId, "] rcv peer unmute video: ").concat(e.uid)),
                        b.remoteMuteState[e.uid] = b.remoteMuteState[e.uid] || {
                            audio: !1,
                            video: !1
                        },
                        b.remoteMuteState[e.uid].video = !1;
                        var t = l({
                            type: "unmute-video",
                            uid: e.uid
                        })
                          , n = b.remoteStreams[e.uid];
                        n ? (n.peerMuteVideo = !1,
                        n.pc && b._adjustPCMuteStatus(n),
                        b.dispatchEvent(t)) : o.default.debug("Ignoring event ".concat(e.type), e)
                    }),
                    b.socket.on("on_crypt_error", function(e) {
                        o.default.warning("[".concat(b.clientId, "] stream crypt error"));
                        var t = l({
                            type: "crypt-error",
                            cryptType: e.crypt_type
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("on_user_banned", function(e) {
                        o.default.info("[".concat(b.clientId, "] user banned uid: ").concat(e.uid, " error: ").concat(e.error_code));
                        var t = l({
                            type: "client-banned",
                            uid: e.uid,
                            attr: e.error_code
                        });
                        b.dispatchEvent(t),
                        i = !0
                    }),
                    b.socket.on("on_stream_fallback_update", function(e) {
                        o.default.info("[".concat(b.clientId, "] stream fallback peerId: ").concat(e.stream_id, " type: ").concat(e.stream_type));
                        var t = l({
                            type: "stream-fallback",
                            uid: e.stream_id,
                            stream: e.stream_id,
                            attr: e.stream_type
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("stream_recover", function(e) {
                        o.default.info("[".concat(b.clientId, "] stream recover uid: ").concat(e.id, " peerId: ").concat(e.peerid, " type: ").concat(e.type));
                        var t = l({
                            type: "stream-recover",
                            uid: e.id,
                            stream: e.peerid,
                            attr: e.type
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("on_p2p_lost", function(e) {
                        o.default.debug("[".concat(b.clientId, "] p2plost: "), e, "p2ps:", b.p2ps);
                        var t, n = "DTLS failed";
                        (t = b.localStreams[e.uid] || b.remoteStreams[e.uid]) ? (t.pc && t.pc.offerCandidates && 0 === t.pc.offerCandidates.length && (n = "NO_CANDIDATES_IN_OFFER"),
                        "publish" === e.event && s.b.publish(b.joinInfo.sid, {
                            lts: t.publishLTS,
                            succ: !1,
                            audioName: t.hasAudio() && t.audioName,
                            videoName: t.hasVideo() && t.videoName,
                            screenName: t.hasScreen() && t.screenName,
                            ec: n
                        }),
                        "subscribe" === e.event && s.b.subscribe(b.joinInfo.sid, {
                            lts: t.subscribeLTS,
                            succ: !1,
                            video: t.subscribeOptions && t.subscribeOptions.video,
                            audio: t.subscribeOptions && t.subscribeOptions.audio,
                            peerid: e.uid + "",
                            ec: n
                        })) : o.default.warning("P2PLost Stream Not found", e),
                        o.default.debug("[".concat(b.clientId, "] p2plost:"), e.p2pid),
                        (t = b.p2ps.get(e.p2pid)) && (b.p2ps.delete(e.p2pid),
                        t.local ? b.dispatchEvent(l({
                            type: "pubP2PLost",
                            stream: t,
                            attr: n
                        })) : b.remoteStreams[t.getId()] && b.dispatchEvent(l({
                            type: "subP2PLost",
                            stream: t,
                            attr: n
                        })))
                    }),
                    b.socket.on("on_token_privilege_will_expire", function(e) {
                        o.default.debug("[".concat(b.clientId, "] Received Message onTokenPrivilegeWillExpire")),
                        b.dispatchEvent(l({
                            type: "onTokenPrivilegeWillExpire"
                        }))
                    }),
                    b.socket.on("on_token_privilege_did_expire", function() {
                        o.default.warning("[".concat(b.clientId, "] Received Message onTokenPrivilegeDidExpire, please get new token and join again")),
                        b.closeGateway(),
                        b.dispatchEvent(l({
                            type: "onTokenPrivilegeDidExpire"
                        }))
                    }),
                    b.socket.on("enable_local_video", function(e) {
                        b.dispatchEvent(l({
                            type: "enable-local-video",
                            uid: e.uid
                        }))
                    }),
                    b.socket.on("disable_local_video", function(e) {
                        b.dispatchEvent(l({
                            type: "disable-local-video",
                            uid: e.uid
                        }))
                    }),
                    b._doWithAction = function(e, t, n) {
                        "tryNext" === e ? function(e, t) {
                            o.default.debug("[".concat(b.clientId, "] Connect next gateway")),
                            b.state = S,
                            b.socket.close(),
                            C(),
                            b.reconnectMode = "tryNext",
                            b.state = _,
                            O(e, t)
                        }(t, n) : "retry" === e ? function(e, t) {
                            o.default.debug("[".concat(b.clientId, "] Reconnect gateway")),
                            b.state = S,
                            b.socket.close(),
                            C(),
                            b.reconnectMode = "retry",
                            b.state = _,
                            O(e, t)
                        }(t, n) : "quit" === e ? (o.default.debug("[".concat(b.clientId, "] quit gateway")),
                        b.state = S,
                        b.socket.close(),
                        C()) : "recover" === e && A()
                    }
                    ,
                    b.socket.on("on_notification", function(e) {
                        if (o.default.debug("[".concat(b.clientId, "] Receive notification: "), e),
                        "ERR_JOIN_BY_MULTI_IP" === I.GatewayErrorCode[e.code])
                            return b.dispatchEvent({
                                type: "onMultiIP",
                                option: e.option
                            });
                        e.detail ? b._doWithAction(qe[I.GatewayErrorCode[e.code]]) : e.action && b._doWithAction(e.action)
                    }),
                    b.socket.on("on_user_offline", function(e) {
                        var t = l({
                            type: "peer-leave",
                            uid: e.uid
                        });
                        if (b.remoteStreamsInChannel.has(e.uid) && b.remoteStreamsInChannel.delete(e.uid),
                        b.remoteStreams.hasOwnProperty(e.uid) && (t.stream = b.remoteStreams[e.uid]),
                        t.reason = e.reason,
                        b.dispatchEvent(t),
                        b.remoteStreams.hasOwnProperty(e.uid)) {
                            o.default.info("[".concat(b.clientId, "] closing stream on peer leave"), e.uid);
                            var n = b.remoteStreams[e.uid];
                            n.close(),
                            delete b.remoteStreams[e.uid],
                            delete b.remoteMuteState[e.uid],
                            s.b.onRemoveStream(b.joinInfo.sid, {
                                peerid: e.uint_id || e.uid,
                                uid: b.uid
                            }),
                            void 0 !== n.pc && (n.pc.close(),
                            n.pc = void 0,
                            b.p2ps.delete(n.p2pId))
                        }
                        b.timers.hasOwnProperty(e.uid) && (clearInterval(b.timers[e.uid]),
                        clearInterval(b.timers[e.uid] + "_RelatedStats"),
                        delete b.timers[e.uid]),
                        null != b.audioLevel[e.uid] && delete b.audioLevel[e.uid],
                        null != b.timer_counter[e.uid] && delete b.timer_counter[e.uid]
                    }),
                    b.socket.on("onUplinkStats", function(e) {}),
                    b.socket.on("liveStreamingStarted", function(e) {
                        var t = p({
                            type: "liveStreamingStarted",
                            url: e.url
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("liveStreamingFailed", function(e) {
                        var t = p({
                            type: "liveStreamingFailed",
                            url: e.url
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("liveStreamingStopped", function(e) {
                        var t = p({
                            type: "liveStreamingStopped",
                            url: e.url
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("liveTranscodingUpdated", function(e) {
                        var t = p({
                            type: "liveTranscodingUpdated",
                            reason: e.reason
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("streamInjectedStatus", function(e) {
                        var t = p({
                            type: "streamInjectedStatus",
                            url: e.url,
                            uid: e.uid,
                            status: e.status
                        });
                        b.dispatchEvent(t)
                    }),
                    b.socket.on("on_user_online", function(e) {
                        b.joinInfo.stringUid && "string" != typeof e.uid && o.default.error("StringUID is Mixed with UintUID"),
                        b.dispatchEvent({
                            type: "peer-online",
                            uid: e.uid
                        })
                    }),
                    b.socket.on("receive_metadata", function(e) {
                        b.joinInfo.stringUid && "string" != typeof e.uid && o.default.error("StringUID is Mixed with UintUID");
                        var t = decodeURIComponent(escape(window.atob(e.metadata)));
                        o.default.debug("[".concat(b.clientId, "] received ").concat(e.uid, " metadata: ").concat(t)),
                        b.dispatchEvent({
                            type: "receive-metadata",
                            uid: e.uid,
                            metadata: t
                        })
                    });
                var c
            }
              , w = function(e, t) {
                if (void 0 !== b.socket)
                    try {
                        b.socket.emitSimpleMessage(e, function(e, n) {
                            t && t(e, n)
                        })
                    } catch (e) {
                        o.default.error("[".concat(b.clientId, "] Error in sendSimpleSdp [").concat(e, "]"))
                    }
                else
                    o.default.error("[".concat(b.clientId, "] Error in sendSimpleSdp [socket not ready]"))
            }
              , k = function() {
                for (var e in b.localStreams)
                    if (void 0 !== b.localStreams[e]) {
                        var t = b.localStreams[e];
                        delete b.localStreams[e],
                        void 0 !== t.pc && (t.pc.close(),
                        t.pc = void 0)
                    }
            }
              , D = function() {
                for (var e in b.remoteStreamsInChannel.clear(),
                b.remoteStreams)
                    if (b.remoteStreams.hasOwnProperty(e)) {
                        var t = b.remoteStreams[e];
                        t.isPlaying() && t.stop(),
                        t.close(),
                        delete b.remoteStreams[e],
                        void 0 !== t.pc && (t.pc.close(),
                        t.pc = void 0)
                    }
            };
            return b
        }
          , Ze = {
            _gatewayClients: {},
            register: function(e, t) {
                if (!t.uid) {
                    var n = "NO_UID_PROVIDED";
                    return o.default.error("[".concat(e.clientId, "] "), n, t),
                    n
                }
                if (t.cname) {
                    if (this._gatewayClients[t.cname] && this._gatewayClients[t.cname][t.uid] && this._gatewayClients[t.cname][t.uid] !== e) {
                        n = "UID_CONFLICT";
                        return o.default.error("[".concat(e.clientId, "] "), n, t),
                        n
                    }
                    return o.default.debug("[".concat(e.clientId, "] register client Channel"), t.cname, "Uid", t.uid),
                    this._gatewayClients[t.cname] || (this._gatewayClients[t.cname] = {}),
                    this._gatewayClients[t.cname][t.uid] = e,
                    null
                }
                var n = "NO_CHANNEL_PROVIDED";
                return o.default.error("[".concat(e.clientId, "] "), n, t),
                n
            },
            unregister: function(e) {
                var t = e && e.uid
                  , n = e.joinInfo && e.joinInfo.cname;
                if (!t || !n) {
                    var i = "INVALID_GATEWAYCLIENT";
                    return o.default.error("[".concat(e.clientId, "] "), i),
                    i
                }
                if (this._gatewayClients[n] && this._gatewayClients[n][t]) {
                    if (this._gatewayClients[n][t] !== e) {
                        i = "GATEWAYCLIENT_UID_CONFLICT";
                        return o.default.error("[".concat(e.clientId, "] "), i),
                        i
                    }
                    return o.default.debug("[".concat(e.clientId, "] unregister client "), e.uid),
                    delete this._gatewayClients[n][t],
                    null
                }
                var i = "GATEWEAY_CLIENT_UNREGISTERED";
                o.default.error("[".concat(e.clientId, "] "), i)
            }
        };
        $e.DISCONNECTED = 0,
        $e.CONNECTING = 1,
        $e.CONNECTED = 2,
        $e.DISCONNECTING = 3,
        $e.connetionStateMap = {
            0: "DISCONNECTED",
            1: "CONNECTING",
            2: "CONNECTED",
            3: "DISCONNECTING"
        };
        var et = $e
          , tt = {
            1001: "FRAMERATE_INPUT_TOO_LOW",
            1002: "FRAMERATE_SENT_TOO_LOW",
            1003: "SEND_VIDEO_BITRATE_TOO_LOW",
            1005: "RECV_VIDEO_DECODE_FAILED",
            2001: "AUDIO_INPUT_LEVEL_TOO_LOW",
            2002: "AUDIO_OUTPUT_LEVEL_TOO_LOW",
            2003: "SEND_AUDIO_BITRATE_TOO_LOW",
            2005: "RECV_AUDIO_DECODE_FAILED",
            3001: "FRAMERATE_INPUT_TOO_LOW_RECOVER",
            3002: "FRAMERATE_SENT_TOO_LOW_RECOVER",
            3003: "SEND_VIDEO_BITRATE_TOO_LOW_RECOVER",
            3005: "RECV_VIDEO_DECODE_FAILED_RECOVER",
            4001: "AUDIO_INPUT_LEVEL_TOO_LOW_RECOVER",
            4002: "AUDIO_OUTPUT_LEVEL_TOO_LOW_RECOVER",
            4003: "SEND_AUDIO_BITRATE_TOO_LOW_RECOVER",
            4005: "RECV_AUDIO_DECODE_FAILED_RECOVER"
        }
          , nt = {
            FramerateInput: 1001,
            FramerateSent: 1002,
            SendVideoBitrate: 1003,
            VideoDecode: 1005,
            AudioIntputLevel: 2001,
            AudioOutputLevel: 2002,
            SendAudioBitrate: 2003,
            AudioDecode: 2005
        }
          , it = function(e) {
            var t = {
                remoteStreamStorage: {},
                localStreamStorage: {}
            };
            return t.gatewayClient = e,
            t.checkAudioOutputLevel = function(e) {
                return !(e && parseInt(e.audioRecvBytesDelta) > 0 && parseInt(e.audioDecodingNormalDelta) > 0 && 0 === parseInt(e.audioOutputLevel))
            }
            ,
            t.checkAudioIntputLevel = function(e) {
                return !e || 0 !== parseInt(e.audioInputLevel)
            }
            ,
            t.checkFramerateInput = function(e, t) {
                if (!e || !t.attributes)
                    return !0;
                var n = parseInt(t.attributes.maxFrameRate)
                  , i = parseInt(e.googFrameRateInput);
                return !n || !i || !(n > 10 && i < 5 || n < 10 && n >= 5 && i <= 1)
            }
            ,
            t.checkFramerateSent = function(e) {
                return !(e && parseInt(e.googFrameRateInput) > 5 && parseInt(e.googFrameRateSent) <= 1)
            }
            ,
            t.checkSendVideoBitrate = function(e) {
                return !e || 0 !== parseInt(e.videoSendBytesDelta)
            }
            ,
            t.checkSendAudioBitrate = function(e) {
                return !e || 0 !== parseInt(e.audioSendBytesDelta)
            }
            ,
            t.checkVideoDecode = function(e) {
                return !e || 0 === parseInt(e.videoRecvBytesDelta) || 0 !== parseInt(e.googFrameRateDecoded)
            }
            ,
            t.checkAudioDecode = function(e) {
                return !e || 0 === parseInt(e.audioRecvBytesDelta) || 0 !== parseInt(e.audioDecodingNormalDelta)
            }
            ,
            t.record = function(e, n, i, a, r) {
                i[e] || (i[e] = {
                    isPrevNormal: !0,
                    record: []
                });
                var o = i[e]
                  , s = t["check" + e](n, r);
                if (o.record.push(s),
                o.record.length >= 5) {
                    o.isCurNormal = -1 !== o.record.indexOf(!0);
                    var c = nt[e];
                    o.isPrevNormal && !o.isCurNormal && t.gatewayClient.dispatchEvent({
                        type: "exception",
                        code: c,
                        msg: tt[c],
                        uid: a
                    }),
                    !o.isPrevNormal && o.isCurNormal && t.gatewayClient.dispatchEvent({
                        type: "exception",
                        code: c + 2e3,
                        msg: tt[c + 2e3],
                        uid: a
                    }),
                    o.isPrevNormal = o.isCurNormal,
                    o.record = []
                }
            }
            ,
            t.setLocalStats = function(e) {
                var n = {};
                Object.keys(e).map(function(i) {
                    var a = e[i]
                      , r = t.gatewayClient.localStreams[parseInt(i)]
                      , o = t.localStreamStorage[i] || {};
                    r && r.hasVideo() && (t.record("SendVideoBitrate", a.videoStats, o, i),
                    t.record("FramerateInput", a.videoStats, o, i, r),
                    t.record("FramerateSent", a.videoStats, o, i)),
                    r && r.hasAudio() && (t.record("AudioIntputLevel", a.audioStats, o, i),
                    t.record("SendAudioBitrate", a.audioStats, o, i)),
                    n[i] = o
                }),
                t.localStreamStorage = n
            }
            ,
            t.setRemoteStats = function(n) {
                var i = {};
                Object.keys(n).map(function(a) {
                    var r = n[a]
                      , o = e.remoteStreams[a]
                      , s = t.remoteStreamStorage[a] || {};
                    o && o.hasVideo() && o.isPlaying() && t.record("VideoDecode", r.videoStats, s, a),
                    o && o.hasAudio() && o.isPlaying() && (t.record("AudioOutputLevel", r.audioStats, s, a),
                    t.record("AudioDecode", r.audioStats, s, a)),
                    i[a] = s
                }),
                t.remoteStreamStorage = i
            }
            ,
            t
        }
          , at = new function() {
            var e = c();
            return e.states = {
                UNINIT: "UNINIT",
                INITING: "INITING",
                INITED: "INITED"
            },
            e.state = e.states.UNINIT,
            e.type = null,
            e.lastConnectedAt = null,
            e.lastDisconnectedAt = null,
            e.lastTypeChangedAt = null,
            e.networkChangeTimer = null,
            e._init = function(t, n) {
                if (e.state = e.states.INITING,
                navigator.connection && navigator.connection.addEventListener) {
                    var i = e._getNetworkInfo();
                    e.type = i && i.type,
                    e.state = e.states.INITED,
                    t && t()
                } else
                    e.state = e.states.UNINIT,
                    n && n("DO_NOT_SUPPORT")
            }
            ,
            e._getNetworkInfo = function() {
                return navigator.connection
            }
            ,
            e._reloadNetworkInfo = function() {
                var t = e._getNetworkInfo()
                  , n = t && t.type || "UNSUPPORTED"
                  , i = Date.now();
                if (n !== e.type) {
                    e.lastTypeChangedAt = i,
                    "none" == n ? e.lastDisconnectedAt = i : "none" == e.type && (e.lastConnectedAt = i),
                    e.type = n;
                    var a = {
                        type: "networkTypeChanged",
                        networkType: n
                    };
                    e.dispatchEvent(a)
                }
            }
            ,
            e.getStats = function(t, n) {
                var i = {}
                  , a = e._getNetworkInfo();
                a && (i.NetworkType = a.type || "UNSUPPORTED"),
                setTimeout(function() {
                    t(i)
                }, 0)
            }
            ,
            e._init(function() {
                navigator.connection.addEventListener("change", function() {
                    e._reloadNetworkInfo()
                }),
                e.networkChangeTimer = setInterval(function() {
                    e._reloadNetworkInfo()
                }, 5e3)
            }, function(e) {}),
            e
        }
          , rt = "DISCONNECTING"
          , ot = "DISCONNECTED"
          , st = "CONNECTED"
          , ct = "INIT"
          , dt = []
          , ut = (setInterval(function() {
            Date.now();
            dt.forEach(function(e) {
                for (var t = e.requests.length - 1; t >= 0; t--) {
                    var n = e.requests[t];
                    n.timeoutCnt++,
                    n.timeoutCnt >= 15 && (e.requests.splice(t, 1),
                    n.promises.reject({
                        reason: "TIMEOUT",
                        code: 499
                    }))
                }
            })
        }, 1e3),
        1)
          , lt = 1
          , ft = 1
          , pt = function() {
            var e = K()(Y.a.mark(function e(t) {
                var n, i, a, s, c, d, u;
                return Y.a.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = t.uid,
                            i = t.url,
                            a = t.serviceName,
                            s = t.sid,
                            c = t.appId,
                            d = t.cname,
                            u = t.timeout,
                            e.abrupt("return", new Promise(function(e, t) {
                                var l = !1
                                  , f = new XMLHttpRequest;
                                f.open("POST", i, !0),
                                f.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
                                f.setRequestHeader("X-Packet-Service-Type", "0"),
                                f.setRequestHeader("X-Packet-URI", "61"),
                                f.onload = function() {
                                    if (!l) {
                                        var n = null
                                          , i = null;
                                        try {
                                            n = JSON.parse(f.responseText)
                                        } catch (e) {
                                            var a = "Invalid text ".concat(f.responseText);
                                            return o.default.error(a),
                                            l = !0,
                                            t(a)
                                        }
                                        if (n.code) {
                                            var r = "AP_ERR_".concat(n.code);
                                            return o.default.error(r, n),
                                            l = !0,
                                            t(r)
                                        }
                                        try {
                                            i = JSON.parse(n.json_body || n.json)
                                        } catch (e) {
                                            var s = "Invalid json_body ".concat(f.responseText);
                                            return o.default.error(s),
                                            l = !0,
                                            t(s)
                                        }
                                        if (200 !== i.code) {
                                            var c = "APPCENTER_CODE_".concat(i.code);
                                            return o.default.error(c, i),
                                            l = !0,
                                            t(c)
                                        }
                                        if (!(i.servers && i.servers.length > 0)) {
                                            return o.default.error("APPCENTER_EMPTY_SERVER", i),
                                            l = !0,
                                            t("APPCENTER_EMPTY_SERVER")
                                        }
                                        return l = !0,
                                        e(i)
                                    }
                                }
                                ,
                                f.onerror = function(e) {
                                    var n = "AP_REUEST_".concat(e.type);
                                    o.default.error(n, i, e),
                                    l || (l = !0,
                                    t(n))
                                }
                                ,
                                f.ontimeout = function(e) {
                                    o.default.error("AP_REUEST_TIMEOUT", i, e),
                                    l || (l = !0,
                                    t("AP_REUEST_TIMEOUT"))
                                }
                                ,
                                u && (f.timeout = u),
                                f.send(JSON.stringify({
                                    service_name: a,
                                    json_body: JSON.stringify({
                                        command: "convergeAllocateEdge",
                                        sid: s,
                                        uid: n + "",
                                        appId: c,
                                        ts: Math.floor(Date.now() / 1e3),
                                        seq: ut++,
                                        cname: d,
                                        version: r.VERSION,
                                        requestId: lt++
                                    })
                                }))
                            }
                            ));
                        case 2:
                        case "end":
                            return e.stop()
                        }
                }, e, this)
            }));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , gt = function() {
            var e = K()(Y.a.mark(function e(t) {
                var n, i, a, s, c, d, u, l, f, p, g, m;
                return Y.a.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            n = t.serviceName,
                            i = t.sid,
                            a = t.appId,
                            s = t.cname,
                            c = t.uid,
                            d = null,
                            e.t0 = Y.a.keys(Object(r.getParameter)("UAP_AP"));
                        case 3:
                            if ((e.t1 = e.t0()).done) {
                                e.next = 34;
                                break
                            }
                            return u = e.t1.value,
                            l = "https://".concat(Object(r.getParameter)("UAP_AP")[u], "/api/v1?action=uap"),
                            f = void 0,
                            e.prev = 7,
                            e.next = 10,
                            pt({
                                uid: c,
                                url: l,
                                appId: a,
                                sid: i,
                                serviceName: n,
                                cname: s,
                                timeout: Object(r.getParameter)("HTTP_CONNECT_TIMEOUT")
                            });
                        case 10:
                            f = e.sent,
                            e.next = 18;
                            break;
                        case 13:
                            return e.prev = 13,
                            e.t2 = e.catch(7),
                            o.default.error(e.t2),
                            d = e.t2,
                            e.abrupt("continue", 3);
                        case 18:
                            p = Y.a.mark(function e(t) {
                                var i, a, r;
                                return Y.a.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            if (i = f.servers[t],
                                            a = "wss://".concat(i.address.replace(/\./g, "-"), ".edge.").concat(t % 2 == 0 ? "agora.io" : "agoraio.cn", ":").concat(i.wss, "?serviceName=").concat(encodeURIComponent(n)),
                                            i.wss) {
                                                e.next = 5;
                                                break
                                            }
                                            return o.default.error("Invalid server response", i),
                                            e.abrupt("return", "continue");
                                        case 5:
                                            return e.prev = 5,
                                            e.next = 8,
                                            new Promise(function(e, t) {
                                                var n = new WebSocket(a)
                                                  , i = !1;
                                                n.addEventListener("open", function() {
                                                    i || (i = !0,
                                                    e(n))
                                                }),
                                                n.addEventListener("error", function(e) {
                                                    i || (i = !0,
                                                    t(e))
                                                })
                                            }
                                            );
                                        case 8:
                                            return (r = e.sent).workerToken = f.workerToken,
                                            e.abrupt("return", {
                                                v: r
                                            });
                                        case 13:
                                            e.prev = 13,
                                            e.t0 = e.catch(5),
                                            o.default.error(e.t0),
                                            d = e.t0;
                                        case 17:
                                        case "end":
                                            return e.stop()
                                        }
                                }, e, this, [[5, 13]])
                            }),
                            g = 0;
                        case 20:
                            if (!(g < f.servers.length)) {
                                e.next = 32;
                                break
                            }
                            return e.delegateYield(p(g), "t3", 22);
                        case 22:
                            m = e.t3,
                            e.t4 = m,
                            e.next = "continue" === e.t4 ? 26 : 27;
                            break;
                        case 26:
                            return e.abrupt("continue", 29);
                        case 27:
                            if ("object" !== Se()(m)) {
                                e.next = 29;
                                break
                            }
                            return e.abrupt("return", m.v);
                        case 29:
                            g++,
                            e.next = 20;
                            break;
                        case 32:
                            e.next = 3;
                            break;
                        case 34:
                            throw d;
                        case 35:
                        case "end":
                            return e.stop()
                        }
                }, e, this, [[7, 13]])
            }));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()
          , mt = {}
          , vt = function(e) {
            return mt[e] ? (mt[e] += 1,
            mt[e]) : (mt[e] = 1,
            mt[e])
        }
          , St = {}
          , ht = function(e) {
            return St[e] ? (St[e] += 1,
            St[e]) : (St[e] = 1,
            St[e])
        }
          , _t = function(e) {
            var t = e.appId
              , n = e.cname
              , i = e.uid
              , a = e.sid
              , s = c();
            return s.status = ct,
            s.pingpongTimer = null,
            s.connection = null,
            s.requests = [],
            s.appId = t,
            s.cname = n,
            s.uid = i,
            s.sid = a,
            s.connection = null,
            s.connectionId = ft++,
            s.connect = function() {
                var e = K()(Y.a.mark(function e(t) {
                    var n;
                    return Y.a.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (n = t.wsClient,
                                s.status === ct) {
                                    e.next = 4;
                                    break
                                }
                                return o.default.debug("Ignored UapConnection.connect: ".concat(s.status)),
                                e.abrupt("return");
                            case 4:
                                s.connection = n,
                                s.status = st,
                                s._flush(),
                                s.startPingpong(),
                                n.addEventListener("close", function(e) {
                                    if (console.log("Weboskcet closed", e),
                                    n === s.connection) {
                                        var t = {
                                            type: "close",
                                            evt: e
                                        };
                                        s.dispatchEvent(t)
                                    }
                                }),
                                n.addEventListener("message", function(e) {
                                    if (e.data) {
                                        var t = null;
                                        try {
                                            t = JSON.parse(e.data)
                                        } catch (e) {
                                            return void o.default.error("Invalid data from worker manager", t)
                                        }
                                        if (t.requestId)
                                            for (var n = s.requests.length - 1; n >= 0; n--) {
                                                var i = s.requests[n];
                                                if (i.reqData.requestId === t.requestId) {
                                                    s.requests.splice(n, 1),
                                                    t.code < 400 && t.code >= 200 ? i.promises.resolve(t) : i.promises.reject(t);
                                                    break
                                                }
                                            }
                                        else
                                            t.type = "notification",
                                            s.dispatchEvent(t)
                                    }
                                });
                            case 10:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }(),
            s.disconnect = K()(Y.a.mark(function e() {
                var t;
                return Y.a.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            for (t in s.status = rt,
                            clearInterval(s.pingpongTimer),
                            s.pingpongTimer = null,
                            s.requests)
                                s.requests[t].promises.reject("DISCONNECTED");
                            return s.requests = [],
                            null,
                            s.connection && (s.connection.close(),
                            s.connection = null),
                            s.status = ot,
                            e.abrupt("return", null);
                        case 9:
                        case "end":
                            return e.stop()
                        }
                }, e, this)
            })),
            s.request = function() {
                var e = K()(Y.a.mark(function e(t) {
                    var n, i, a, c;
                    return Y.a.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (n = h()({
                                    command: "request",
                                    sdkVersion: r.VERSION,
                                    seq: ht(s.sid),
                                    appId: s.appId,
                                    cname: s.cname,
                                    uid: "" + s.uid,
                                    sid: s.sid,
                                    requestId: vt(s.sid),
                                    ts: Math.floor(Date.now() / 1e3)
                                }, t),
                                "INIT" !== s.status) {
                                    e.next = 5;
                                    break
                                }
                                return e.abrupt("return", new Promise(function(e, t) {
                                    var i = {
                                        reqData: n,
                                        stalledTs: Date.now(),
                                        timeoutCnt: 0,
                                        promises: {
                                            resolve: e,
                                            reject: t
                                        }
                                    };
                                    s.requests.push(i)
                                }
                                ));
                            case 5:
                                if (s.connection) {
                                    e.next = 11;
                                    break
                                }
                                throw i = "NO_WEBSOCKET_CONNECTION",
                                o.default.error(i),
                                new Error(i);
                            case 11:
                                if (s.status !== rt || t.clientRequest && "DestroyWorker" === t.clientRequest.command) {
                                    e.next = 17;
                                    break
                                }
                                throw a = "WEBSOCKET_DISCONNECTING",
                                o.default.error(a),
                                new Error(a);
                            case 17:
                                if ("DISCONNECTED" !== s.status) {
                                    e.next = 23;
                                    break
                                }
                                throw c = "WEBSOCKET_DISCONNECTED",
                                o.default.error(c),
                                new Error(c);
                            case 23:
                                return e.abrupt("return", new Promise(function(e, t) {
                                    var i = {
                                        reqData: n,
                                        stalledTs: Date.now(),
                                        timeoutCnt: 0,
                                        promises: {
                                            resolve: e,
                                            reject: t
                                        }
                                    };
                                    s.requests.push(i),
                                    s._flush()
                                }
                                ));
                            case 24:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }(),
            s._flush = function() {
                s.connection && s.status === st && s.requests.forEach(function(e) {
                    e.sentTs || (e.sentTs = Date.now(),
                    e.reqData.clientRequest && (e.reqData.clientRequest.workerToken = s.connection.workerToken),
                    s.connection.send(JSON.stringify(e.reqData)))
                })
            }
            ,
            s.startPingpong = function() {
                clearInterval(s.pingpongTimer),
                s.pingpongTimer = setInterval(K()(Y.a.mark(function e() {
                    return Y.a.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (s.status !== st || !s.connection || 1 !== s.connection.readyState) {
                                    e.next = 9;
                                    break
                                }
                                return e.prev = 1,
                                e.next = 4,
                                s.request({
                                    command: "ping"
                                });
                            case 4:
                                e.next = 9;
                                break;
                            case 6:
                                e.prev = 6,
                                e.t0 = e.catch(1),
                                o.default.error("pingpong", e.t0);
                            case 9:
                            case "end":
                                return e.stop()
                            }
                    }, e, this, [[1, 6]])
                })), 6e3)
            }
            ,
            s._flush(),
            s.startPingpong(),
            dt.push(s),
            s
        }
          , Et = function(e) {
            e.disconnect();
            var t = dt.find(function(t) {
                return e.connectionId === t.connectionId
            });
            dt.splice(t, 1)
        }
          , It = function(e) {
            return "number" == typeof e && 0 <= e && e <= 4294967295
        };
        var Tt = function(e) {
            var t = e;
            if (Object(r.getParameter)("LIVESTREAMING_ALIGN"))
                switch (e) {
                case 200:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_START_SUCCESS;
                    break;
                case 451:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_START_ALREADY_EXISTS;
                    break;
                case 453:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_START_UNAUTHORIZED;
                    break;
                case 470:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_BROKEN;
                    break;
                case 499:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_START_TIMEDOUT;
                    break;
                default:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_START_FAILED
                }
            return t
        }
          , yt = function(e) {
            var t = e;
            if (Object(r.getParameter)("LIVESTREAMING_ALIGN"))
                switch (e) {
                case 200:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_STOP_SUCCESS;
                    break;
                case 404:
                case 452:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_STOP_NOT_FOUND;
                    break;
                case 453:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_STOP_UNAUTHORIZED;
                    break;
                case 499:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_STOP_TIMEDOUT;
                    break;
                default:
                    t = I.INJECT_STREAM_STATUS.INJECT_STREAM_STATUS_STOP_FAILED
                }
            return t
        }
          , bt = a(22)
          , Rt = a.n(bt)
          , At = function(e) {
            var t = {
                key: void 0,
                highStream: null,
                lowStream: null,
                lowStreamParameter: null,
                isDualStream: !1,
                highStreamState: 2,
                lowStreamState: 2,
                proxyServer: null,
                turnServers: [],
                useProxyServer: !1
            };
            t.mode = e.mode,
            t.codec = e.codec,
            t.clientId = Object(F.generateSessionId)().slice(0, 5),
            t.uintUid = null;
            e = h()({}, e);
            return t.aespassword = null,
            t.aesmode = "none",
            t.hasPublished = !1,
            t.getSessionId = function() {
                return e.sessionId
            }
            ,
            t.startChannelMediaRelay = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e) {
                        if (e)
                            return i && i(e);
                        i && i()
                    },
                    name: "Client.startChannelMediaRelay",
                    options: arguments,
                    tag: "tracer"
                });
                if (!(n instanceof ye.ChannelMediaRelayConfiguration))
                    throw "Configration should be instance of [ChannelMediaRelayConfiguration]";
                var r = n.getSrcChannelMediaInfo()
                  , o = n.getDestChannelMediaInfos();
                if (Object(H.isEmpty)(r))
                    throw "srcChannelMediaInfo should not be empty";
                if (Object(H.isEmpty)(o) || 0 === o.length)
                    throw "destChannelMediaInfos should not be empty";
                if (!Object(F.is32Uint)(r.uid))
                    throw "Invalid uid in srcChannelMediaInfo";
                if (!Object(H.isValidChannelName)(r.channelName))
                    throw "Invalid channelName in srcChannelMediaInfo";
                if (r.token && !Object(H.isValidToken)(r.token))
                    throw "Invalid token in srcChannelMediaInfo";
                if (o.forEach(function(e) {
                    if (!Object(F.is32Uint)(e.uid))
                        throw "Invalid uid in destChannelMediaInfo";
                    if (!Object(H.isValidChannelName)(e.channelName))
                        throw "Invalid channelName in destChannelMediaInfo";
                    if (e.token && !Object(H.isValidToken)(e.token))
                        throw "Invalid token in destChannelMediaInfo"
                }),
                t.gatewayClient.state !== et.CONNECTED)
                    throw "startChannelMediaRelay should be used after join";
                t.gatewayClient.startChannelMediaRelay(n).then(function() {
                    a && a()
                }).catch(function(e) {
                    a && a(e)
                })
            }
            ,
            t.updateChannelMediaRelay = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e) {
                        if (e)
                            return i && i(e);
                        i && i()
                    },
                    name: "Client.updateChannelMediaRelay",
                    options: arguments,
                    tag: "tracer"
                });
                if (!(n instanceof ye.ChannelMediaRelayConfiguration))
                    throw "Configration should be instance of [ChannelMediaRelayConfiguration]";
                var r = n.getSrcChannelMediaInfo()
                  , o = n.getDestChannelMediaInfos();
                if (Object(H.isEmpty)(r))
                    throw "srcChannelMediaInfo should not be empty";
                if (Object(H.isEmpty)(o) || 0 === o.length)
                    throw "destChannelMediaInfos should not be empty";
                if (!Object(F.is32Uint)(r.uid))
                    throw "Invalid uid in srcChannelMediaInfo";
                if (!Object(H.isValidChannelName)(r.channelName))
                    throw "Invalid channelName in srcChannelMediaInfo";
                if (r.token && !Object(H.isValidToken)(r.token))
                    throw "Invalid token in srcChannelMediaInfo";
                if (o.forEach(function(e) {
                    if (!Object(F.is32Uint)(e.uid))
                        throw "Invalid uid in destChannelMediaInfo";
                    if (!Object(H.isValidChannelName)(e.channelName))
                        throw "Invalid channelName in destChannelMediaInfo";
                    if (e.token && !Object(H.isValidToken)(e.token))
                        throw "Invalid token in destChannelMediaInfo"
                }),
                t.gatewayClient.state !== et.CONNECTED)
                    throw "updateChannelMediaRelay should be used after join";
                t.gatewayClient.updateChannelMediaRelay(n).then(function() {
                    a && a()
                }).catch(function(e) {
                    a && a(e)
                })
            }
            ,
            t.stopChannelMediaRelay = function(n) {
                var i = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e) {
                        if (e)
                            return n && n(e);
                        n && n()
                    },
                    name: "Client.stopChannelMediaRelay",
                    options: arguments,
                    tag: "tracer"
                });
                t.gatewayClient.stopChannelMediaRelay().then(function() {
                    i && i()
                }).catch(function(e) {
                    i && i(e)
                })
            }
            ,
            t.getConnectionState = function() {
                var n = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.getConnectionState",
                    options: arguments,
                    tag: "tracer"
                })
                  , i = et.connetionStateMap[t.gatewayClient.state];
                return n(),
                i
            }
            ,
            t.setClientRole = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    callback: i,
                    name: "Client.setClientRole",
                    options: arguments,
                    tag: "tracer"
                });
                if (Object(H.checkValidEnum)(n, "setClientRole", ["host", "audience"]),
                "rtc" === t.mode) {
                    var r = "RTC mode can not use setClientRole";
                    return o.default.warning("[".concat(t.clientId, "] ").concat(r)),
                    a && a(r)
                }
                t.gatewayClient && t.gatewayClient.state === et.CONNECTED ? ("audience" === n && (0 === this.highStreamState ? this._unpublish(this.highStream, function() {
                    a && a(null, {
                        role: n
                    })
                }, function(e) {
                    a && a(e)
                }) : t.gatewayClient.setClientRole("audience", a)),
                "host" === n && t.gatewayClient.setClientRole("host", a)) : (t.gatewayClient.role = n,
                a && a(null, {
                    role: n
                }))
            }
            ,
            t.getGatewayInfo = function(e) {
                if (t.gatewayClient.state !== et.CONNECTED) {
                    var n = "Client is not in connected state";
                    return o.default.error("[".concat(t.clientId, "] ").concat(n)),
                    void e(n)
                }
                t.gatewayClient.getGatewayInfo(function(t) {
                    e(null, t)
                }, e)
            }
            ,
            t.renewToken = function(n, i, a) {
                var r = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return o.default.error("Failed to renew token ".concat(e), t),
                            a && a(e);
                        i && i(t)
                    },
                    name: "Client.renewToken",
                    options: arguments,
                    tag: "tracer"
                });
                if (!Object(H.isValidToken)(n))
                    throw new Error("Invalid token: Token is of the string type .Length of the string: [1,255]. ASCII characters only.");
                return t.gatewayClient ? t.key ? (t.key = n,
                void t.gatewayClient.renewToken(n, function(e) {
                    return r(null, e)
                }, r)) : (o.default.error("[".concat(t.clientId, "] renewToken should not be called before user join")),
                r(I.default.INVALID_OPERATION)) : (o.default.error("[".concat(t.clientId, "] renewToken Failed. GatewayClient not Exist")),
                r(I.default.INVALID_OPERATION))
            }
            ,
            t.setLowStreamParameter = function(n) {
                var i = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.setLowStreamParameter",
                    options: arguments,
                    tag: "tracer"
                });
                Object(H.checkValidObject)(n, "param");
                var a = n.width
                  , r = n.height
                  , c = n.framerate
                  , d = n.bitrate;
                Object(H.isEmpty)(a) || Object(H.checkValidNumber)(a, "width"),
                Object(H.isEmpty)(r) || Object(H.checkValidNumber)(r, "height"),
                Object(H.isEmpty)(c) || Object(H.checkValidNumber)(c, "framerate"),
                Object(H.isEmpty)(d) || Object(H.checkValidNumber)(d, "bitrate", 1, 1e7),
                (!a && r || a && !r) && o.default.warning("[".concat(t.clientId, "] The width and height parameters take effect only when both are set")),
                t.lowStreamParameter = n,
                i()
            }
            ,
            t.init = function(n, i, a) {
                var r = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return a && a(e);
                        i && i(t)
                    },
                    name: "Client.init",
                    options: arguments,
                    tag: "tracer"
                });
                Object(H.checkValidString)(n),
                Object(g.isChromeKernel)() && Object(g.getChromeKernelVersion)() <= 48 ? a ? r(I.default.BAD_ENVIRONMENT) : Object(F.popBanTip)() : (o.default.info("[".concat(t.clientId, "] Initializing AgoraRTC client, appId: ").concat(n, ".")),
                e.appId = n,
                e.sessionId = Object(F.generateSessionId)(),
                r())
            }
            ,
            t.setTurnServer = function(n) {
                var i = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.setTurnServer",
                    options: arguments,
                    tag: "tracer"
                });
                if (t.gatewayClient && t.gatewayClient.state !== et.DISCONNECTED)
                    throw new Error("Set turn server before join channel");
                if (t.useProxyServer)
                    throw new Error("You have already set the proxy");
                n instanceof Array || (n = [n]);
                var a = [];
                n.map(function(e, n) {
                    Object(H.checkValidObject)(e, "turnServer");
                    var i = e.turnServerURL
                      , r = e.username
                      , s = e.password
                      , c = e.udpport
                      , d = e.forceturn
                      , u = e.tcpport;
                    if (Object(H.checkValidString)(i, "turnServerURL"),
                    Object(H.checkValidString)(r, "username"),
                    Object(H.checkValidString)(s, "password"),
                    Object(H.checkValidString)(c, "udpport"),
                    0 === parseInt(c))
                        throw new Error("udpport should not be ".concat(c));
                    Object(H.isEmpty)(d) || Object(H.checkValidBoolean)(d, "forceturn");
                    var l = {
                        mode: "manual"
                    };
                    if (l.url = i,
                    l.udpport = c,
                    l.username = r,
                    l.credential = s,
                    l.forceturn = d || !1,
                    !Object(H.isEmpty)(u)) {
                        if (Object(H.checkValidString)(u, "tcpport"),
                        0 === parseInt(u))
                            throw new Error("tcpport should not be ".concat(u));
                        l.tcpport = u,
                        o.default.info("[".concat(t.clientId, "] Set turnserver[").concat(n, "] tcpurl. ").concat(l.url, ":").concat(l.tcpport))
                    }
                    o.default.info("[".concat(t.clientId, "] Set turnserver[").concat(n, "] udpurl. ").concat(l.url, ":").concat(l.udpport, ",username: ").concat(l.uername, ",password: ").concat(l.credential)),
                    a.push(l)
                }),
                t.turnServers = a,
                i()
            }
            ,
            t.setProxyServer = function(n) {
                var i = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.setProxyServer",
                    options: arguments,
                    tag: "tracer"
                });
                if (t.gatewayClient && t.gatewayClient.state !== et.DISCONNECTED)
                    throw new Error("Set proxy server before join channel");
                if (!n)
                    throw new Error("Do not set the proxyServer parameter as empty");
                if (t.useProxyServer)
                    throw new Error("You have already set the proxy");
                Object(H.checkValidString)(n, "proxyServer"),
                t.proxyServer = n,
                s.b.setProxyServer(n),
                o.default.setProxyServer(n),
                i()
            }
            ,
            t.startProxyServer = function() {
                var n = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.startProxyServer",
                    options: arguments,
                    tag: "tracer"
                });
                if (t.gatewayClient && t.gatewayClient.state !== et.DISCONNECTED)
                    throw new Error("Start proxy server before join channel");
                if (t.proxyServer)
                    throw new Error("You have already set the proxy");
                t.useProxyServer = !0,
                n()
            }
            ,
            t.stopProxyServer = function() {
                var n = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.stopProxyServer",
                    options: arguments,
                    tag: "tracer"
                });
                if (t.gatewayClient && t.gatewayClient.state !== et.DISCONNECTED)
                    throw new Error("Stop proxy server after leave channel");
                s.b.setProxyServer(),
                o.default.setProxyServer(),
                t.turnServers = [],
                t.proxyServer = null,
                t.useProxyServer = !1,
                n()
            }
            ,
            t.setEncryptionSecret = function(n) {
                var i = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.setEncryptionSecret",
                    options: arguments,
                    tag: "tracer"
                });
                Object(H.checkValidString)(n, "password"),
                t.aespassword = n,
                i()
            }
            ,
            t.setEncryptionMode = function(n) {
                var i = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.setEncryptionMode",
                    options: arguments,
                    tag: "tracer"
                });
                if (Object(H.checkValidString)(n, "encryptionMode"),
                -1 === Ce.indexOf(n))
                    throw new Error('Invalid encryptionMode: encryptionMode should be "aes-128-xts" | "aes-256-xts" | "aes-128-ecb"');
                t.aesmode = n,
                i()
            }
            ,
            t.configPublisher = function(n) {
                var i = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.configPublisher",
                    options: arguments,
                    tag: "tracer"
                });
                Object(H.checkValidObject)(n, "config");
                var a = n.width
                  , r = n.height
                  , o = n.framerate
                  , c = n.bitrate
                  , d = n.publisherUrl;
                Object(H.checkValidNumber)(a, "width"),
                Object(H.checkValidNumber)(r, "height"),
                Object(H.checkValidNumber)(o, "framerate"),
                Object(H.checkValidNumber)(c, "bitrate", 1, 1e7),
                d && Object(H.checkValidString)(d, "publisherUrl"),
                t.gatewayClient.configPublisher(n),
                i()
            }
            ,
            t.enableDualStream = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return i && i(e);
                        n && n(t)
                    },
                    name: "Client.enableDualStream",
                    options: arguments,
                    tag: "tracer"
                });
                return "iOS" === Object(g.getBrowserOS)() ? (s.b.streamSwitch(e.sessionId, {
                    lts: (new Date).getTime(),
                    isdual: !0,
                    succ: !1
                }),
                a(I.default.IOS_NOT_SUPPORT)) : Object(g.isWeChatBrowser)() ? (s.b.streamSwitch(e.sessionId, {
                    lts: (new Date).getTime(),
                    isdual: !0,
                    succ: !1
                }),
                a(I.default.WECHAT_NOT_SUPPORT)) : (s.b.streamSwitch(e.sessionId, {
                    lts: (new Date).getTime(),
                    isdual: !0,
                    succ: !0
                }),
                t.isDualStream = !0,
                t.highStream && (t.highStream.isDualStream = !0),
                void (0 === t.highStreamState ? t._publishLowStream(function(e) {
                    return a(null, e)
                }, function(e) {
                    o.default.warning("[".concat(t.clientId, "]"), e),
                    a(I.default.ENABLE_DUALSTREAM_FAILED)
                }) : 1 === t.highStreamState ? a(I.default.STILL_ON_PUBLISHING) : a(null)))
            }
            ,
            t.disableDualStream = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return i && i(e);
                        n && n(t)
                    },
                    name: "Client.disableDualStream",
                    options: arguments,
                    tag: "tracer"
                });
                s.b.streamSwitch(e.sessionId, {
                    lts: (new Date).getTime(),
                    isdual: !1,
                    succ: !0
                }),
                t.isDualStream = !1,
                t.highStream && (t.highStream.isDualStream = !1),
                0 === t.highStreamState ? t._unpublishLowStream(function() {
                    t.highStream.lowStream = null,
                    a()
                }, function(e) {
                    o.default.warning("[".concat(t.clientId, "]"), e),
                    a(I.default.DISABLE_DUALSTREAM_FAILED)
                }) : 1 === t.highStreamState ? a(I.default.STILL_ON_PUBLISHING) : a()
            }
            ,
            t._getLowStream = function(e, n) {
                t.lowStream ? e(t.lowStream) : t._createLowStream(function(n) {
                    t.lowStream = n,
                    e(t.lowStream)
                }, n)
            }
            ,
            t._createLowStream = function(e, n) {
                if (t.highStream && t.highStream.stream) {
                    var i = h()({}, t.highStream.params);
                    if (i.streamID += 1,
                    i.audio = !1,
                    i.video)
                        if (t.highStream.stream.getVideoTracks()[0]) {
                            var a = new Ie(i);
                            if (a.isLowStream = !0,
                            a.streamId = t.highStream.getId() + 1,
                            t.lowStreamParameter) {
                                var r = h()({}, t.lowStreamParameter);
                                r.width && r.height || (r.width = 160,
                                r.height = 120),
                                r.framerate = r.framerate || 15,
                                r.bitrate = r.bitrate || 50,
                                a.setVideoProfileCustomPlus(r)
                            } else
                                a.setVideoProfileCustom(function(e) {
                                    var t;
                                    switch (e) {
                                    case "120p":
                                    case "120p_1":
                                        t = ["120p_1", "120p_1", "120p_1"];
                                        break;
                                    case "120p_3":
                                        t = ["120p_3", "120p_3", "120p_3"];
                                        break;
                                    case "180p":
                                    case "180p_1":
                                        t = ["90p_1", "90p_1", "180p_1"];
                                        break;
                                    case "180p_3":
                                        t = ["120p_3", "120p_3", "180p_3"];
                                        break;
                                    case "180p_4":
                                        t = ["120p_1", "120p_1", "180p_4"];
                                        break;
                                    case "240p":
                                    case "240p_1":
                                        t = ["120p_1", "120p_1", "240p_1"];
                                        break;
                                    case "240p_3":
                                        t = ["120p_3", "120p_3", "240p_3"];
                                        break;
                                    case "240p_4":
                                        t = ["120p_4", "120p_4", "240p_4"];
                                        break;
                                    case "360p":
                                    case "360p_1":
                                    case "360p_4":
                                    case "360p_9":
                                    case "360p_10":
                                    case "360p_11":
                                        t = ["90p_1", "90p_1", "360p_1"];
                                        break;
                                    case "360p_3":
                                    case "360p_6":
                                        t = ["120p_3", "120p_3", "360p_3"];
                                        break;
                                    case "360p_7":
                                    case "360p_8":
                                        t = ["120p_1", "120p_1", "360p_7"];
                                        break;
                                    case "480p":
                                    case "480p_1":
                                    case "480p_2":
                                    case "480p_4":
                                    case "480p_10":
                                        t = ["120p_1", "120p_1", "480p_1"];
                                        break;
                                    case "480p_3":
                                    case "480p_6":
                                        t = ["120p_3", "120p_3", "480p_3"];
                                        break;
                                    case "480p_8":
                                    case "480p_9":
                                        t = ["120p_4", "120p_4", "480p_8"];
                                        break;
                                    case "720p":
                                    case "720p_1":
                                    case "720p_2":
                                    case "720p_3":
                                        t = ["90p_1", "90p_1", "720p_1"];
                                        break;
                                    case "720p_5":
                                    case "720p_6":
                                        t = ["120p_1", "120p_1", "720p_5"];
                                        break;
                                    case "1080p":
                                    case "1080p_1":
                                    case "1080p_2":
                                    case "1080p_3":
                                    case "1080p_5":
                                        t = ["90p_1", "90p_1", "1080p_1"];
                                        break;
                                    case "1440p":
                                    case "1440p_1":
                                    case "1440p_2":
                                        t = ["90p_1", "90p_1", "1440p_1"];
                                        break;
                                    case "4k":
                                    case "4k_1":
                                    case "4k_3":
                                        t = ["90p_1", "90p_1", "4k_1"];
                                        break;
                                    default:
                                        t = ["120p_1", "120p_1", "360p_7"]
                                    }
                                    return Object(g.isOpera)() ? [e, 15, 50] : Object(g.isFireFox)() ? [t[1], 15, 100] : Object(g.isSafari)() ? [t[2], 15, 50] : [t[0], 15, 50]
                                }(t.highStream.profile));
                            try {
                                console.log(a.videoConstraint);
                                var o = Rt()(t.highStream, {
                                    width: a.videoConstraint.width.ideal,
                                    height: a.videoConstraint.height.ideal,
                                    framerate: a.videoConstraint.frameRate.max
                                });
                                return a.stream = o,
                                t.highStream.lowStream = a,
                                t.highStream.userMuteVideo && a.muteVideo(),
                                e && e(a)
                            } catch (e) {
                                return n && n(e)
                            }
                        } else
                            n && n(I.default.HIGH_STREAM_NOT_VIDEO_TRACE);
                    else
                        n && n(I.default.HIGH_STREAM_NOT_VIDEO_TRACE)
                } else
                    n && n(I.default.HIGH_STREAM_NOT_VIDEO_TRACE)
            }
            ,
            t._publishLowStream = function(e, n) {
                return 2 !== t.lowStreamState ? n && n(I.default.LOW_STREAM_ALREADY_PUBLISHED) : t.highStream && t.highStream.hasScreen() ? n && n(I.default.SHARING_SCREEN_NOT_SUPPORT) : void t._getLowStream(function(i) {
                    t.lowStreamState = 1,
                    t.gatewayClient.publish(i, {
                        streamType: 1
                    }, function() {
                        t.lowStreamState = 0,
                        e && e()
                    }, function(e) {
                        1 === t.lowStreamState && (t.lowStreamState = 2),
                        o.default.debug("[".concat(t.clientId, "] publish low stream failed")),
                        n && n(e)
                    })
                }, n)
            }
            ,
            t._unpublishLowStream = function(e, n) {
                if (0 !== t.lowStreamState)
                    return n && n(I.default.LOW_STREAM_NOT_YET_PUBLISHED);
                t.lowStream && (t.gatewayClient.unpublish(t.lowStream, {
                    streamType: 1
                }, function() {}, function(e) {
                    o.default.debug("[".concat(t.clientId, "] unpublish low stream failed")),
                    n && n(e)
                }),
                t.lowStream.close(),
                t.lowStream = null,
                t.lowStreamState = 2,
                e && e())
            }
            ,
            t.join = function(n, i, a, r, c) {
                var d = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return c && c(e);
                        r && r(t)
                    },
                    name: "Client.join",
                    options: arguments,
                    tag: "tracer"
                });
                if (n && !Object(H.isValidToken)(n))
                    return o.default.warning("[".concat(t.clientId, "] Param channelKey should be string")),
                    d(I.default.INVALID_PARAMETER);
                if (!Object(H.isValidChannelName)(i))
                    return o.default.error("Invalid Channel Name ".concat(i)),
                    o.default.warning("[".concat(t.clientId, "] The length must be within 64 bytes. The supported characters: a-z,A-Z,0-9,space,!, #, $, %, &, (, ), +, -, :, ;, <, =, ., >, ?, @, [, ], ^, _,  {, }, |, ~, ,")),
                    d(I.default.INVALID_PARAMETER);
                if ("string" == typeof i && "" === i)
                    return o.default.warning("[".concat(t.clientId, "] Param channel should not be empty")),
                    d(I.default.INVALID_PARAMETER);
                if (a && !Object(F.is32Uint)(a) && !Object(H.isValidString)(a, 1, 255))
                    return o.default.error("Invalid UID ".concat(a, " ").concat(Se()(a))),
                    o.default.warning("[".concat(t.clientId, "] [String uid] Length of the string: [1,255]. ASCII characters only. [Number uid] The value range is [0,10000]")),
                    d(I.default.INVALID_PARAMETER);
                if ("string" == typeof a && 0 == a.length)
                    return o.default.warning("[".concat(t.clientId, "] String uid should not be empty")),
                    d(I.default.INVALID_PARAMETER);
                if ("string" == typeof a && a.length > 256)
                    return o.default.warning("[".concat(t.clientId, "] Length of string uid should be less than 255")),
                    d(I.default.INVALID_PARAMETER);
                t.highStream = null,
                t.lowStream = null,
                t.lowStreamParameter = null,
                t.isDualStream = !1,
                t.highStreamState = 2,
                t.lowStreamState = 2;
                var u = {
                    clientId: t.clientId,
                    appId: e.appId,
                    sid: e.sessionId,
                    cname: i,
                    uid: a,
                    turnServers: t.turnServers,
                    proxyServer: t.proxyServer,
                    token: n || e.appId,
                    useProxyServer: t.useProxyServer
                };
                if ("string" == typeof a && (u.stringUid = a,
                t.uintUid ? (u.uid = t.uintUid,
                delete t.uintUid) : u.uid = 0),
                t.aespassword && "none" !== t.aesmode && h()(u, {
                    aespassword: t.aespassword,
                    aesmode: t.aesmode
                }),
                s.b.sessionInit(e.sessionId, {
                    lts: (new Date).getTime(),
                    cname: i,
                    appid: e.appId,
                    mode: e.mode,
                    succ: !0
                }),
                t.onSuccess = function(e) {
                    t.rtcStatsCollector.startNetworkQualityTimer(),
                    t.onSuccess = null,
                    d(null, e)
                }
                ,
                t.onFailure = function(e) {
                    return d(e)
                }
                ,
                t.channel = i,
                t.gatewayClient.state !== et.DISCONNECTED)
                    return o.default.error("[".concat(t.clientId, "] Client already in connecting/connected state")),
                    d(I.default.INVALID_OPERATION),
                    void s.b.joinGateway(e.sessionId, {
                        lts: Date.now(),
                        succ: !1,
                        ec: I.default.INVALID_OPERATION,
                        addr: null
                    });
                t.gatewayClient.state = et.CONNECTING;
                var l = function(a, r) {
                    o.default.info("[".concat(t.clientId, "] Joining channel: ").concat(i)),
                    t.gatewayClient.dispatchEvent({
                        type: "config-distribute",
                        config: r,
                        joinInfo: u
                    }),
                    t.key = n || e.appId,
                    u.cid = a.cid,
                    u.uid || (u.uid = a.uid),
                    u.vid = a.vid,
                    u.clientId = t.clientId,
                    u.apResponse = a.res,
                    a.uni_lbs_ip && a.uni_lbs_ip[1] && (u.uni_lbs_ip = a.uni_lbs_ip[1]),
                    u.gatewayAddr = a.gateway_addr,
                    t.joinInfo = u,
                    t.gatewayClient.join(u, t.key, function(e) {
                        o.default.info("[".concat(t.clientId, "] Join channel ").concat(i, " success, join with uid: ").concat(e, ".")),
                        t.onSuccess = null,
                        t.rtcStatsCollector.startNetworkQualityTimer(),
                        d(null, e)
                    }, function(e) {
                        return d(e)
                    })
                };
                u.stringUid && !u.uid ? (t.userAccountReq && !t.userAccountReq.isFinished() && t.userAccountReq.cancel(),
                t.userAccountReq = Ge(u, t.gatewayClient),
                t.userAccountReq.then(function(e) {
                    o.default.debug("getUserAccount Success ".concat(e.url, " ").concat(u.stringUid, " => ").concat(e.uid)),
                    u.uid = e.uid,
                    We(u, l, function(e) {
                        return d(e)
                    })
                }).catch(function(e) {
                    o.default.error("getUserAccount rejected", e),
                    d(e)
                })) : We(u, l, function(e) {
                    return d(e)
                })
            }
            ,
            t.renewChannelKey = function(n, i, a) {
                var r = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return a && a(e);
                        i && i(t)
                    },
                    name: "Client.renewChannelKey",
                    options: arguments,
                    tag: "tracer"
                });
                Object(H.checkValidString)(n, "key", 1, 2047),
                void 0 === t.key ? (o.default.error("[".concat(t.clientId, "] renewChannelKey should not be called before user join")),
                r(I.default.INVALID_OPERATION)) : (t.key = n,
                t.gatewayClient.joinInfo.token = n,
                t.gatewayClient.key = n,
                t.gatewayClient.recover(),
                r())
            }
            ,
            t.leave = function(n, i) {
                t.gatewayClient.hasInvokeLeave = !0;
                var a = !1
                  , c = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, a) {
                        if (e)
                            return i && i(e);
                        var r;
                        t.gatewayClient.reconnectingCS = !1,
                        t.gatewayClient.state = et.DISCONNECTED,
                        clearTimeout((r = t.clientId,
                        je[r])),
                        t._renewSession(),
                        t.rtcStatsCollector.clearNetworkQualityTimer(),
                        n && n(a)
                    },
                    name: "Client.leave",
                    options: arguments,
                    tag: "tracer"
                });
                o.default.info("[".concat(t.clientId, "] Leaving channel")),
                t.userAccountReq && !t.userAccountReq.isFinished() && (t.userAccountReq.cancel(),
                t.gatewayClient.state === et.CONNECTING && (t.gatewayClient.state = et.DISCONNECTED)),
                t.gatewayClient.leave(function(e) {
                    a = !0,
                    c(null, e)
                }, c),
                setTimeout(function() {
                    a || (t.gatewayClient.socket && (t.gatewayClient.socket.close(),
                    t.gatewayClient.socket = null),
                    t.gatewayClient.state = et.DISCONNECTED,
                    c(null, "LEAVE_MSG_TIMEOUT"))
                }, Object(r.getParameter)("LEAVE_MSG_TIMEOUT"))
            }
            ,
            t._renewSession = function() {
                var n = Object(F.generateSessionId)();
                if (o.default.debug("renewSession ".concat(e.sessionId, " => ").concat(n)),
                e.sessionId = n,
                t.joinInfo && (t.joinInfo.sid = n),
                t.gatewayClient && (t.gatewayClient.joinInfo && (t.gatewayClient.joinInfo.sid = n),
                t.gatewayClient.localStreams))
                    for (var i in t.gatewayClient.localStreams) {
                        var a = t.gatewayClient.localStreams[i];
                        a && (a.sid = n)
                    }
            }
            ,
            t._publish = function(n, i, a, s) {
                if (2 !== t.highStreamState)
                    return o.default.warning("[".concat(t.clientId, "] Can't publish stream when stream already publish ").concat(n.getId())),
                    a && a(I.default.STREAM_ALREADY_PUBLISHED);
                if (0 === t.turnServers.length && Object(r.getParameter)("FORCE_TURN") && !Object(r.getParameter)("TURN_ENABLE_TCP") && !Object(r.getParameter)("TURN_ENABLE_UDP"))
                    throw new Error("force TURN With No TURN Configuration");
                o.default.info("[".concat(t.clientId, "] Publishing stream, uid ").concat(n.getId())),
                t.highStream = n,
                t.highStreamState = 1,
                t.highStream.streamId = t.joinInfo.stringUid || t.joinInfo.uid,
                t.hasPublished = !1;
                var c = function(n, i, a) {
                    t.gatewayClient.publish(n, {
                        streamType: 0
                    }, function() {
                        n.sid = e.sessionId,
                        t.highStreamState = 0,
                        o.default.info("[".concat(t.clientId, "] Publish success, uid: ").concat(n.getId())),
                        t.highStream && (t.highStream.isDualStream = t.isDualStream),
                        t.isDualStream ? t._publishLowStream(function() {
                            i && i()
                        }, function(e) {
                            o.default.warning("[".concat(t.clientId, "] "), e),
                            me.replaceWithCanvasTrack(n),
                            i && i()
                        }) : (me.replaceWithCanvasTrack(n),
                        i && i())
                    }, a)
                };
                "audience" !== t.gatewayClient.role || "live" !== t.mode || s ? c(n, i, a) : t.gatewayClient.setClientRole("host", function(e) {
                    if (e)
                        return a && a(e);
                    c(n, i, a)
                })
            }
            ,
            t._unpublish = function(e, n, i, a) {
                if (0 !== t.highStreamState)
                    return o.default.warning("[".concat(t.clientId, "] Can't unpublish stream when stream not publish")),
                    i && i(I.default.STREAM_NOT_YET_PUBLISHED);
                o.default.info("[".concat(t.clientId, "] Unpublish stream, uid ").concat(e.getId()));
                var r = function(e, n, i) {
                    t.isDualStream && t.lowStream && t._unpublishLowStream(null, i),
                    t.gatewayClient.unpublish(e, {
                        streamType: 0
                    }, function() {
                        t.highStreamState = 2,
                        o.default.info("[".concat(t.clientId, "] Unpublish stream success, uid: ").concat(e.getId())),
                        n && n()
                    }, function(n) {
                        o.default.info("[".concat(t.clientId, "] Unpublish stream fail, uid: ").concat(e.getId())),
                        i && i(n)
                    })
                };
                "host" !== t.gatewayClient.role || "live" !== t.mode || a ? r(e, n, i) : t.gatewayClient.setClientRole("audience", function(t) {
                    if (t)
                        return i && i(t);
                    r(e, n, i)
                })
            }
            ,
            t.publish = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, n) {
                        if (e)
                            return 1 === t.highStreamState && (t.highStreamState = 2),
                            i && i(e)
                    },
                    name: "Client.publish",
                    tag: "tracer",
                    options: {
                        stream: "too long to show",
                        onFailure: !!i
                    }
                });
                2 === t.highStreamState ? n._hasVideoTracks() || n._hasAudioTracks() ? t._publish(n, function(e) {
                    return a(null, e)
                }, function(e) {
                    return a(e)
                }) : a(I.default.NO_TRACK_IN_STREAM) : a(I.default.STREAM_ALREADY_PUBLISHED)
            }
            ,
            t.unpublish = function(n, i, a) {
                var r = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return i && i(e);
                        a && a(t)
                    },
                    name: "Client.unpublish",
                    tag: "tracer",
                    options: {
                        stream: "too long to show",
                        onFailure: !!i
                    }
                });
                0 === t.highStreamState ? t._unpublish(n, function(e) {
                    return r(null, e)
                }, function(e) {
                    return r(e)
                }) : r(I.default.STREAM_NOT_YET_PUBLISHED)
            }
            ,
            t.subscribe = function(n, i, a) {
                var r = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return a && a(e)
                    },
                    name: "Client.subscribe",
                    tag: "tracer",
                    options: {
                        stream: "too long to show",
                        options: i,
                        onFailure: !!a
                    }
                });
                "function" == typeof i && (a = i,
                i = null),
                Object(H.checkValidObject)(n, "stream"),
                Object(H.isEmpty)(i) || (Object(H.checkValidObject)(i, "options"),
                Object(H.isEmpty)(i.video) || Object(H.checkValidBoolean)(i.video, "options.video"),
                Object(H.isEmpty)(i.audio) || Object(H.checkValidBoolean)(i.audio, "options.audio"));
                var c = {
                    video: !0,
                    audio: !0
                };
                if (!Object(H.isEmpty)(i)) {
                    if (Object(g.isSafari)() && (!i.video || !i.audio)) {
                        var d = "SAFARI_NOT_SUPPORTED_FOR_TRACK_SUBSCRIPTION";
                        return o.default.error("[".concat(t.clientId, "] "), d),
                        void r(d)
                    }
                    if (!Object(H.isEmpty)(i.video) && !Object(H.isValidBoolean)(i.video) || !Object(H.isEmpty)(i.audio) && !Object(H.isValidBoolean)(i.audio) || !1 === i.audio && !1 === i.video) {
                        d = "INVALID_PARAMETER ".concat(JSON.stringify(i));
                        return o.default.error("[".concat(t.clientId, "] "), d),
                        void r(d)
                    }
                }
                n.subscribeOptions ? (h()(n.subscribeOptions, c, i),
                t.gatewayClient.subscribeChange(n, function(e) {
                    return r(null, e)
                }, r)) : (n.subscribeOptions = h()({}, c, i),
                t.gatewayClient.subscribe(n, function(e) {
                    return r(null, e)
                }, r))
            }
            ,
            t.unsubscribe = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    callback: function(e, t) {
                        if (e)
                            return i && i(e)
                    },
                    name: "Client.unsubscribe",
                    tag: "tracer",
                    options: {
                        stream: "too long to show",
                        onFailure: !!i
                    }
                });
                o.default.info("[".concat(t.clientId, "] Unsubscribe stream, uid: ").concat(n.getId())),
                t.gatewayClient.unsubscribe(n, function(e) {
                    return a(null, e)
                }, a)
            }
            ,
            t.setRemoteVideoStreamType = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.setRemoteVideoStreamType",
                    tag: "tracer",
                    options: {
                        stream: "too long to show",
                        streamType: i
                    }
                });
                Object(H.checkValidEnum)(i, "streamType", [0, 1]),
                t.gatewayClient.setRemoteVideoStreamType(n, i),
                a()
            }
            ,
            t.setStreamFallbackOption = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.setStreamFallbackOption",
                    tag: "tracer",
                    options: {
                        stream: "too long to show",
                        fallbackType: i
                    }
                });
                Object(H.checkValidEnum)(i, "fallbackType", [0, 1, 2]),
                t.gatewayClient.setStreamFallbackOption(n, i),
                a()
            }
            ,
            t.enableAudioVolumeIndicator = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.enableAudioVolumeIndicator",
                    options: arguments,
                    tag: "tracer"
                });
                n = n || 2e3,
                i = i || 3,
                Object(H.checkValidNumber)(i, "smooth", 1, 100),
                Object(H.checkValidNumber)(n, "interval", 50, 1e5),
                t.audioVolumeIndication = t.audioVolumeIndication || {
                    enabled: !0
                },
                t.audioVolumeIndication.interval = n,
                t.audioVolumeIndication.smooth = i,
                t.audioVolumeIndication = {
                    interval: n,
                    smooth: i
                },
                o.default.info("[".concat(t.clientId, "] enableAudioVolumeIndicator interval ").concat(n, " smooth ").concat(i)),
                t.gatewayClient.enableAudioVolumeIndicator(n, i),
                a()
            }
            ,
            t.getNetworkStats = function(e, n) {
                return o.default.deprecate("[".concat(t.clientId, "] client.getNetworkStats is deprecated. Use client.getTransportStats instead.")),
                at.getStats(e, n)
            }
            ,
            t.getSystemStats = function(e, t) {
                return v.getStats(e, t)
            }
            ,
            t.getRecordingDevices = function(e, t) {
                return W.getRecordingDevices(e, t)
            }
            ,
            t.getPlayoutDevices = function(e, t) {
                return W.getPlayoutDevices(e, t)
            }
            ,
            t.getCameras = function(e, t) {
                return W.getCameras(e, t)
            }
            ,
            t.getRemoteAudioStats = function(e, n) {
                return t.rtcStatsCollector.getRemoteAudioStats(e, n)
            }
            ,
            t.getLocalAudioStats = function(e, n) {
                return t.rtcStatsCollector.getLocalAudioStats(e, n)
            }
            ,
            t.getRemoteVideoStats = function(e, n) {
                return t.rtcStatsCollector.getRemoteVideoStats(e, n)
            }
            ,
            t.getLocalVideoStats = function(e, n) {
                return t.rtcStatsCollector.getLocalVideoStats(e, n)
            }
            ,
            t._getRemoteVideoQualityStats = function(e, n) {
                return t.rtcStatsCollector.getRemoteVideoQualityStats(e, n)
            }
            ,
            t._getRemoteAudioQualityStats = function(e, n) {
                return t.rtcStatsCollector.getRemoteAudioQualityStats(e, n)
            }
            ,
            t.getTransportStats = function(e, n) {
                return t.rtcStatsCollector.getTransportStats(function(t) {
                    return at.getStats(function(n) {
                        var i = h()({}, t, n);
                        e && e(i)
                    }, n)
                }, n)
            }
            ,
            t.getSessionStats = function(e, n) {
                return t.rtcStatsCollector.getSessionStats(e, n)
            }
            ,
            t.onNetworkQuality = function() {
                return t.rtcStatsCollector.onNetworkQuality(onSuccess, onFailure)
            }
            ,
            t.sendMetadata = function(n, i) {
                var a = s.b.reportApiInvoke(e.sessionId, {
                    name: "Client.sendMetadata",
                    tag: "tracer",
                    callback: function(e) {
                        if (e)
                            return i && i(e);
                        i && i()
                    }
                });
                t.gatewayClient.sendMetadata(n, a)
            }
            ,
            e.clientId = t.clientId,
            t.gatewayClient = et(e),
            t.listenerLoggerTimer = null,
            t.listenerLoggerCache = [],
            t.on = function(e, n) {
                t.gatewayClient.on(e, n),
                t.listenerLoggerCache.push("".concat(e).concat(n.name ? ":" + n.name : "")),
                t.listenerLoggerTimer ? clearTimeout(t.listenerLoggerTimer) : o.default.info("[".concat(t.clientId, "] Adding event handler on ").concat(e)),
                t.listenerLoggerTimer = setTimeout(function() {
                    t.listenerLoggerCache.length && (t.listenerLoggerTimer = null,
                    o.default.info("[".concat(t.clientId, "] Added event handler on ").concat(t.listenerLoggerCache.join(", "))),
                    t.listenerLoggerCache = [])
                }, 0)
            }
            ,
            t.off = function(e, n) {
                o.default.info("remove event handler from [".concat(e, "]")),
                t.gatewayClient.removeEventListener(e, n)
            }
            ,
            t.rtcStatsCollector = function(e) {
                var t = c();
                return t.gatewayClient = e,
                t.exceptionMonitor = new it(e),
                t.localStats = {},
                t.remoteStats = {},
                t.session = {
                    sendBytes: 0,
                    recvBytes: 0,
                    WSSendBytes: 0,
                    WSSendBytesDelta: 0,
                    WSRecvBytes: 0,
                    WSRecvBytesDelta: 0,
                    HTTPSendBytes: 0,
                    HTTPSendBytesDelta: 0,
                    HTTPRecvBytes: 0,
                    HTTPRecvBytesDelta: 0
                },
                t.getRemoteAudioStats = function(e) {
                    var n = {};
                    for (var i in t.remoteStats) {
                        var a = {}
                          , r = t.remoteStats[i];
                        B(a, "End2EndDelay", r.peer_delay && r.peer_delay.audio_delay),
                        B(a, "TransportDelay", r.peer_delay && r.peer_delay.e2e_delay),
                        B(a, "PacketLossRate", r.peer_delay && r.peer_delay.e2e_audio_lost_ratio_400ms),
                        B(a, "RecvLevel", r.audioStats && r.audioStats.audioOutputLevel),
                        B(a, "RecvBitrate", r.audioRecvBitrate),
                        B(a, "CodecType", r.audioStats && r.audioStats.googCodecName),
                        B(a, "MuteState", r.audioDisabled),
                        B(a, "TotalFreezeTime", r.audioStats && r.audioStats.audioTotalFreezeTime),
                        B(a, "TotalPlayDuration", r.audioStats && r.audioStats.audioTotalPlayDuration),
                        n[i] = a
                    }
                    e && e(n)
                }
                ,
                t.getLocalAudioStats = function(e) {
                    var n = {};
                    for (var i in t.localStats) {
                        var a = {}
                          , r = t.localStats[i];
                        B(a, "RecordingLevel", r.audioStats && r.audioStats.audioInputLevel),
                        B(a, "SendLevel", r.audioStats && r.audioStats.totalAudioEnergy),
                        B(a, "SamplingRate", r.audioStats && r.audioStats.totalSamplesDuration),
                        B(a, "SendBitrate", r.audioSendBitrate),
                        B(a, "CodecType", r.audioStats && r.audioStats.googCodecName),
                        B(a, "MuteState", r.audioDisabled),
                        B(a, "audioSendPacketsLost", r.audioStats && r.audioStats.packetsLost);
                        var o = t.gatewayClient.localStreams[i];
                        o && o.isPlaying() && B(a, "MuteState", o.userMuteAudio ? "1" : "0"),
                        n[i] = a
                    }
                    e && e(n)
                }
                ,
                t.getRemoteVideoStats = function(e) {
                    var n = {};
                    for (var i in t.remoteStats) {
                        var a = {}
                          , r = t.remoteStats[i];
                        B(a, "End2EndDelay", r.peer_delay && r.peer_delay.video_delay),
                        B(a, "TransportDelay", r.peer_delay && r.peer_delay.e2e_delay),
                        B(a, "PacketLossRate", r.peer_delay && r.peer_delay.e2e_video_lost_ratio_400ms),
                        B(a, "RecvBitrate", r.videoRecvBitrate),
                        B(a, "RecvResolutionWidth", r.videoStats && r.videoStats.googFrameWidthReceived),
                        B(a, "RecvResolutionHeight", r.videoStats && r.videoStats.googFrameHeightReceived),
                        B(a, "RenderResolutionWidth", r.videoStats && r.videoStats.renderRemoteWidth),
                        B(a, "RenderResolutionHeight", r.videoStats && r.videoStats.renderRemoteHeight),
                        B(a, "RenderFrameRate", r.videoStats && r.videoStats.googFrameRateOutput),
                        B(a, "MuteState", r.videoDisabled),
                        B(a, "TotalFreezeTime", r.videoStats && r.videoStats.videoTotalFreezeTime),
                        B(a, "TotalPlayDuration", r.videoStats && r.videoStats.videoTotalPlayDuration),
                        n[i] = a
                    }
                    e && e(n)
                }
                ,
                t.getLocalVideoStats = function(e) {
                    var n = {};
                    for (var i in t.localStats) {
                        var a = {}
                          , r = t.localStats[i];
                        B(a, "TargetSendBitrate", r.videoTargetSendBitrate),
                        B(a, "SendFrameRate", r.videoStats && r.videoStats.googFrameRateSent),
                        B(a, "SendBitrate", r.videoSendBitrate),
                        B(a, "SendResolutionWidth", r.videoStats && r.videoStats.googFrameWidthSent),
                        B(a, "SendResolutionHeight", r.videoStats && r.videoStats.googFrameHeightSent),
                        B(a, "CaptureResolutionWidth", r.videoStats && r.videoStats.googFrameWidthInput),
                        B(a, "CaptureResolutionHeight", r.videoStats && r.videoStats.googFrameHeightInput),
                        B(a, "EncodeDelay", r.videoStats && r.videoStats.googAvgEncodeMs),
                        B(a, "MuteState", r.videoDisabled),
                        B(a, "TotalFreezeTime", r.videoStats && r.videoStats.videoTotalFreezeTime),
                        B(a, "TotalDuration", r.videoStats && r.videoStats.videoTotalPlayDuration),
                        B(a, "CaptureFrameRate", r.videoStats && r.videoStats.googFrameRateSent),
                        B(a, "videoSendPacketsLost", r.videoStats && r.videoStats.packetsLost),
                        r.videoStats && !r.videoStats.googFrameWidthInput && B(a, "CaptureResolutionWidth", r.videoStats && r.videoStats.renderLocalWidth),
                        r.videoStats && !r.videoStats.googFrameHeightInput && B(a, "CaptureResolutionHeight", r.videoStats && r.videoStats.renderLocalHeight),
                        n[i] = a,
                        e && e(n)
                    }
                }
                ,
                t.getRemoteVideoQualityStats = function(e) {
                    var n = {};
                    for (var i in t.remoteStats) {
                        var a = {}
                          , r = t.remoteStats[i];
                        B(a, "videoReceiveDelay", r.videoStats && r.videoStats.googCurrentDelayMs),
                        B(a, "VideoFreezeRate", r.videoStats && r.videoStats.videoFreezeRate),
                        B(a, "FirstFrameTime", r.firstFrameTime),
                        n[i] = a
                    }
                    e && e(n)
                }
                ,
                t.getRemoteAudioQualityStats = function(e) {
                    var n = {};
                    for (var i in t.remoteStats) {
                        var a = {}
                          , r = t.remoteStats[i];
                        B(a, "audioReceiveDelay", r.audioStats && r.audioStats.googCurrentDelayMs),
                        B(a, "AudioFreezeRate", r.videoStats && r.videoStats.videoFreezeRate),
                        n[i] = a
                    }
                    e && e(n)
                }
                ,
                t.getTransportStats = function(e) {
                    var n = {}
                      , i = {}
                      , a = t.gatewayClient.traffic_stats
                      , r = a.peer_delay;
                    if (B(n, "OutgoingAvailableBandwidth", t.gatewayClient.OutgoingAvailableBandwidth / 1e3),
                    B(n, "RTT", a && 2 * a.access_delay),
                    r) {
                        var o = !0
                          , s = !1
                          , c = void 0;
                        try {
                            for (var d, u = r[Symbol.iterator](); !(o = (d = u.next()).done); o = !0) {
                                var l = d.value;
                                l.downlink_estimate_bandwidth && (i[l.peer_uid] = l.downlink_estimate_bandwidth / 1e3 + "")
                            }
                        } catch (e) {
                            s = !0,
                            c = e
                        } finally {
                            try {
                                o || null == u.return || u.return()
                            } finally {
                                if (s)
                                    throw c
                            }
                        }
                    }
                    n.IncomingAvailableBandwidth = i,
                    e && e(n)
                }
                ,
                t.getSessionStats = function(e) {
                    var n = {}
                      , i = t.gatewayClient.traffic_stats
                      , a = t.gatewayClient.socket
                      , r = 0
                      , o = 0;
                    for (var s in t.remoteStats)
                        (c = t.remoteStats[s]) && c.videoStats && c.videoStats.videoRecvBytesDelta && (o += parseInt(c.videoStats.videoRecvBytesDelta)),
                        c && c.audioStats && c.audioStats.audioRecvBytesDelta && (o += parseInt(c.audioStats.audioRecvBytesDelta));
                    for (var s in t.localStats) {
                        var c;
                        (c = t.localStats[s]) && c.videoStats && c.videoStats.videoSendBytesDelta && (r += parseInt(c.videoStats.videoSendBytesDelta)),
                        c && c.audioStats && c.audioStats.audioSendBytesDelta && (r += parseInt(c.audioStats.audioSendBytesDelta))
                    }
                    var d = r + t.session.WSSendBytesDelta + t.session.HTTPSendBytesDelta
                      , u = o + t.session.WSRecvBytesDelta + t.session.HTTPRecvBytesDelta
                      , l = t.session.sendBytes + Object(ke.getHTTPSendBytes)()
                      , f = t.session.recvBytes + Object(ke.getHTTPRecvBytes)();
                    t.gatewayClient.socket && t.gatewayClient.socket.state === t.gatewayClient.CONNECTED && (l += a.getSendBytes(),
                    f += a.getRecvBytes());
                    var p = 1;
                    i.peer_delay && (p = i.peer_delay.length,
                    p += 1),
                    B(n, "Duration", a.getDuration()),
                    B(n, "UserCount", p),
                    B(n, "SendBytes", l),
                    B(n, "RecvBytes", f),
                    B(n, "SendBitrate", 8 * d / 1e3),
                    B(n, "RecvBitrate", 8 * u / 1e3),
                    e && e(n)
                }
                ,
                t.isLocalVideoFreeze = function(e, t) {
                    var n = 0
                      , i = 0;
                    if (!e || !t)
                        return !1;
                    if (Object(g.isChrome)() || Object(g.isOpera)())
                        n = e.googFrameRateInput,
                        i = e.googFrameRateSent;
                    else if (Object(g.isSafari)())
                        n = parseInt(e.framerateMean),
                        i = parseInt(e.framesEncoded) - parseInt(t.framesEncoded);
                    else {
                        if (!Object(g.isFireFox)())
                            return !1;
                        n = parseInt(e.framerateMean),
                        i = parseInt(e.framesEncoded) - parseInt(t.framesEncoded)
                    }
                    return n > 5 && i < 3
                }
                ,
                t.isRemoteVideoFreeze = function(e, t) {
                    var n = 0
                      , i = 0;
                    if (!e || !t)
                        return !1;
                    if (Object(g.isChrome)() || Object(g.isOpera)())
                        n = e.googFrameRateReceived,
                        i = e.googFrameRateDecoded;
                    else if (Object(g.isSafari)())
                        n = e.framerateMean,
                        i = parseInt(e.framesDecoded) - parseInt(t.framesDecoded);
                    else {
                        if (!Object(g.isFireFox)())
                            return !1;
                        n = parseInt(e.framesReceived) - parseInt(t.framesReceived),
                        i = parseInt(e.framesDecoded) - parseInt(t.framesDecoded)
                    }
                    return n > 5 && n < 10 && i < 3 || n > 10 && n < 20 && i < 4 || n > 20 && i < 5
                }
                ,
                t.isAudioFreeze = function(e) {
                    if (Object(g.isChrome)() && e) {
                        if (e.googDecodingPLC && e.googDecodingPLCCNG && e.googDecodingCTN)
                            return (parseInt(e.googDecodingPLC) + parseInt(e.googDecodingPLCCNG)) / parseInt(e.googDecodingCTN) > .2
                    } else if ((Object(g.isSafari)() || Object(g.isFireFox)()) && e.packetsLost && e.packetsReceived)
                        return parseInt(e.packetsLost) / (parseInt(e.packetsLost) + parseInt(e.packetsReceived)) > .2;
                    return !1
                }
                ,
                t.isAudioDecodeFailed = function(e) {
                    return !!((Object(g.isChrome)() || Object(g.isOpera)()) && e && parseInt(e.bytesReceived) > 0 && 0 === parseInt(e.googDecodingNormal))
                }
                ,
                t.startNetworkQualityTimer = function() {
                    t.clearNetworkQualityTimer(),
                    t.networkQualityTimer = setInterval(function() {
                        if (t.gatewayClient.state !== et.CONNECTED)
                            t.gatewayClient.dispatchEvent({
                                type: "network-quality",
                                uplinkNetworkQuality: 0,
                                downlinkNetworkQuality: 0
                            });
                        else {
                            var e = t.gatewayClient.traffic_stats;
                            t.gatewayClient.dispatchEvent({
                                type: "network-quality",
                                uplinkNetworkQuality: t.networkQualityTrans(e.uplink_network_quality),
                                downlinkNetworkQuality: t.networkQualityTrans(e.downlink_network_quality)
                            })
                        }
                    }, 2e3)
                }
                ,
                t.clearNetworkQualityTimer = function() {
                    t.networkQualityTimer && clearInterval(t.networkQualityTimer)
                }
                ,
                t.networkQualityTrans = function(e) {
                    return e >= 0 && e < .17 ? 1 : e >= .17 && e < .36 ? 2 : e >= .36 && e < .59 ? 3 : e >= .59 && e <= 1 ? 4 : e > 1 ? 5 : 0
                }
                ,
                t.getStatsTimer = setInterval(function() {
                    var e = t.gatewayClient.traffic_stats
                      , n = Date.now();
                    t.gatewayClient.dispatchEvent({
                        type: "_testException"
                    }),
                    Object.keys(t.localStats).length && t.exceptionMonitor.setLocalStats(t.localStats),
                    Object.keys(t.remoteStats).length && t.exceptionMonitor.setRemoteStats(t.remoteStats);
                    var i = {};
                    Object.keys(t.gatewayClient.remoteStreams).forEach(function(a) {
                        var r = t.gatewayClient.remoteStreams[a]
                          , o = t.remoteStats[a]
                          , s = {
                            id: a,
                            updatedAt: n
                        };
                        i[a] = s,
                        s.firstFrameTime = r.firstFrameTime,
                        o ? (s.audioTotalPlayDuration = o.audioTotalPlayDuration + 1,
                        s.audioTotalFreezeTime = o.audioTotalFreezeTime,
                        s.isAudioFreeze = !1,
                        s.isAudioDecodeFailed = !1,
                        s.videoTotalPlayDuration = o.videoTotalPlayDuration + 1,
                        s.videoTotalFreezeTime = o.videoTotalFreezeTime,
                        s.isVideoFreeze = !1) : (s.audioTotalPlayDuration = 1,
                        s.audioTotalFreezeTime = 0,
                        s.videoTotalPlayDuration = 1,
                        s.videoTotalFreezeTime = 0);
                        var c = e && e.peer_delay && e.peer_delay.find(function(e) {
                            return e.peer_uid == a
                        });
                        c && (s.peer_delay = c),
                        r && (r.isPlaying() && (s.audioDisabled = r.userMuteAudio || r.peerMuteAudio ? "1" : "0",
                        s.videoDisabled = r.userMuteVideo || r.peerMuteVideo ? "1" : "0"),
                        o && o.peer_delay && c && o.peer_delay.stream_type !== c.stream_type && t.gatewayClient.dispatchEvent({
                            type: "streamTypeChange",
                            uid: a,
                            streamType: c.stream_type
                        }),
                        r.pc && "established" == r.pc.state && r.pc.getStats(function(e) {
                            if (s.pcStats = e,
                            s.audioStats = e.find(function(e) {
                                return "audio" == e.mediaType && (e.id.indexOf("_recv") > -1 || e.id.toLowerCase().indexOf("inbound") > -1)
                            }),
                            s.videoStats = e.find(function(e) {
                                return "video" == e.mediaType && (e.id.indexOf("_recv") > -1 || e.id.toLowerCase().indexOf("inbound") > -1)
                            }),
                            o && o.audioStats && s.audioStats) {
                                var n = parseInt(s.audioStats.bytesReceived) - parseInt(o.audioStats.bytesReceived)
                                  , i = parseInt(s.audioStats.googDecodingNormal) - parseInt(o.audioStats.googDecodingNormal);
                                if (s.audioStats.audioRecvBytesDelta = n,
                                s.audioStats.audioDecodingNormalDelta = i,
                                t.session.recvBytes += n,
                                isFinite(n) && s.audioStats.timestamp) {
                                    var a = s.audioStats.timestamp.getTime() - o.audioStats.timestamp.getTime();
                                    s.audioRecvBitrate = Math.floor(8 * n / a)
                                }
                                t.isAudioFreeze(s.audioStats) && s.audioTotalPlayDuration > 10 && (s.audioTotalFreezeTime++,
                                s.isAudioFreeze = !0),
                                t.isAudioDecodeFailed(s.audioStats) && s.audioTotalPlayDuration > 10 && (s.isAudioDecodeFailed = !0),
                                s.audioStats.audioTotalFreezeTime = s.audioTotalFreezeTime,
                                s.audioStats.audioTotalPlayDuration = s.audioTotalPlayDuration,
                                s.audioStats.audioFreezeRate = Math.ceil(100 * s.audioTotalFreezeTime / s.audioTotalPlayDuration)
                            }
                            if (o && o.videoStats && s.videoStats) {
                                var c = parseInt(s.videoStats.bytesReceived) - parseInt(o.videoStats.bytesReceived);
                                s.videoStats.videoRecvBytesDelta = c,
                                t.session.recvBytes += c,
                                isFinite(c) && s.videoStats.timestamp && (a = s.videoStats.timestamp.getTime() - o.videoStats.timestamp.getTime(),
                                s.videoRecvBitrate = Math.floor(8 * c / a)),
                                t.isRemoteVideoFreeze(s.videoStats, o.videoStats) && (s.videoTotalFreezeTime++,
                                s.isVideoFreeze = !0),
                                s.videoStats.videoTotalFreezeTime = s.videoTotalFreezeTime,
                                s.videoStats.videoTotalPlayDuration = s.videoTotalPlayDuration,
                                s.videoStats.videoFreezeRate = Math.ceil(100 * s.videoTotalFreezeTime / s.videoTotalPlayDuration),
                                r.player && r.player.video && r.player.video.videoWidth && r.player.video.videoHeight ? (s.videoStats.renderRemoteWidth = r.player.video.videoWidth,
                                s.videoStats.renderRemoteHeight = r.player.video.videoHeight) : (s.videoStats.renderRemoteWidth = r.videoWidth || s.videoStats.googFrameWidthReceived,
                                s.videoStats.renderRemoteHeight = r.videoHeight || s.videoStats.googFrameHeightReceived)
                            }
                        }))
                    }),
                    t.remoteStats = i;
                    var a = {};
                    if (Object.keys(t.gatewayClient.localStreams).forEach(function(e) {
                        var i = t.gatewayClient.localStreams[e]
                          , r = t.localStats[e]
                          , o = {
                            id: e,
                            updatedAt: n
                        };
                        a[e] = o,
                        r ? (o.videoTotalPlayDuration = r.videoTotalPlayDuration + 1,
                        o.videoTotalFreezeTime = r.videoTotalFreezeTime,
                        o.isVideoFreeze = !1) : (o.videoTotalPlayDuration = 1,
                        o.videoTotalFreezeTime = 0),
                        i && (i.isPlaying() && (o.audioDisabled = i.userMuteAudio ? "1" : "0",
                        o.videoDisabled = i.userMuteVideo ? "1" : "0"),
                        i.video && i.attributes.maxVideoBW ? o.videoTargetSendBitrate = i.attributes.maxVideoBW : i.video && i.screenAttributes && (o.videoTargetSendBitrate = i.screenAttributes.maxVideoBW),
                        i.pc && "established" == i.pc.state && i.pc.getStats(function(e) {
                            if (o.pcStats = e.reverse(),
                            o.audioStats = e.find(function(e) {
                                return "audio" == e.mediaType && (e.id.indexOf("_send") > -1 || e.id.toLowerCase().indexOf("outbound") > -1)
                            }),
                            o.videoStats = e.find(function(e) {
                                return "video" == e.mediaType && (e.id.indexOf("_send") > -1 || e.id.toLowerCase().indexOf("outbound") > -1)
                            }),
                            o.audioStats && r && r.audioStats) {
                                var n = parseInt(o.audioStats.bytesSent) - parseInt(r.audioStats.bytesSent);
                                if (o.audioStats.audioSendBytesDelta = n,
                                t.session.sendBytes += n,
                                isFinite(n) && o.audioStats.timestamp) {
                                    var a = o.audioStats.timestamp.getTime() - r.audioStats.timestamp.getTime();
                                    o.audioSendBitrate = Math.floor(8 * n / a)
                                }
                            }
                            if (o.videoStats && r && r.videoStats) {
                                var s = parseInt(o.videoStats.bytesSent) - parseInt(r.videoStats.bytesSent);
                                o.videoStats.videoSendBytesDelta = s,
                                t.session.sendBytes += s,
                                isFinite(s) && o.videoStats.timestamp && (a = o.videoStats.timestamp.getTime() - r.videoStats.timestamp.getTime(),
                                o.videoSendBitrate = Math.floor(8 * s / a)),
                                t.isLocalVideoFreeze(o.videoStats, r.videoStats) && (o.videoTotalFreezeTime++,
                                o.isVideoFreeze = !0),
                                o.videoStats.videoTotalFreezeTime = o.videoTotalFreezeTime,
                                o.videoStats.videoTotalPlayDuration = o.videoTotalPlayDuration,
                                o.videoStats.videoFreezeRate = Math.ceil(100 * o.videoTotalFreezeTime / o.videoTotalPlayDuration),
                                o.videoStats.renderLocalWidth = i.videoWidth || o.videoStats.googFrameWidthSent,
                                o.videoStats.renderLocalHeight = i.videoHeight || o.videoStats.googFrameHeightSent
                            }
                        }))
                    }),
                    t.localStats = a,
                    t.session.HTTPSendBytesDelta = Object(ke.getHTTPSendBytes)() - t.session.HTTPSendBytes,
                    t.session.HTTPSendBytes = Object(ke.getHTTPSendBytes)(),
                    t.session.HTTPRecvBytesDelta = Object(ke.getHTTPRecvBytes)() - t.session.HTTPRecvBytes,
                    t.session.HTTPRecvBytes = Object(ke.getHTTPRecvBytes)(),
                    t.gatewayClient.socket && t.gatewayClient.socket.state === t.gatewayClient.CONNECTED) {
                        var r = t.gatewayClient.socket;
                        t.session.WSSendBytesDelta = r.getSendBytes() - t.session.WSSendBytes,
                        t.session.WSSendBytes = r.getSendBytes(),
                        t.session.WSRecvBytesDelta = r.getRecvBytes() - t.session.WSRecvBytes,
                        t.session.WSRecvBytes = r.getRecvBytes()
                    }
                }, 1e3),
                t.gatewayClient.on("join", function() {
                    t.session = {
                        sendBytes: 0,
                        recvBytes: 0,
                        WSSendBytes: 0,
                        WSSendBytesDelta: 0,
                        WSRecvBytes: 0,
                        WSRecvBytesDelta: 0,
                        HTTPSendBytes: 0,
                        HTTPSendBytesDelta: 0,
                        HTTPRecvBytes: 0,
                        HTTPRecvBytesDelta: 0
                    }
                }),
                t
            }(t.gatewayClient),
            t.configDistributManager = function(e) {
                var t = {};
                return t.client = e,
                t.client.gatewayClient && t.client.gatewayClient.on("config-distribute", function(n) {
                    var i = n.joinInfo
                      , a = n.config;
                    if (a) {
                        Object(H.isEmpty)(a.uploadLog) || (Object(r.setParameter)("UPLOAD_LOG", a.uploadLog),
                        s.b.reportApiInvoke(i.sid, {
                            name: "_configDistribute",
                            options: {
                                feature: "uploadLog",
                                value: a.uploadLog
                            }
                        })()),
                        Object(H.isEmpty)(a.dualStream) || (e.isDualStream = a.dualStream,
                        s.b.reportApiInvoke(i.sid, {
                            name: "_configDistribute",
                            options: {
                                feature: "dualStream",
                                value: a.dualStream
                            }
                        })()),
                        Object(H.isEmpty)(a.streamFallbackOption) || t.client.gatewayClient && t.client.gatewayClient.on("stream-subscribed", function(e) {
                            var n = e.stream;
                            n ? (t.client.gatewayClient.setStreamFallbackOption(n, a.streamFallbackOption),
                            s.b.reportApiInvoke(i.sid, {
                                name: "_configDistribute",
                                options: {
                                    feature: "streamFallbackOption",
                                    value: a.streamFallbackOption,
                                    streamId: n.getId()
                                }
                            })()) : s.b.reportApiInvoke(i.sid, {
                                name: "_configDistribute",
                                options: {
                                    feature: "streamFallbackOption",
                                    value: a.streamFallbackOption,
                                    streamId: n.getId(),
                                    err: "invalid stream"
                                }
                            })()
                        });
                        try {
                            o.default.debug("[".concat(e.clientId, "] setParameter in distribution: ").concat(JSON.stringify(a))),
                            Object.keys(a).map(function(e) {
                                return Object(r.setParameter)(e, a[e])
                            })
                        } catch (t) {
                            o.default.debug("[".concat(e.clientId, "] setParameter in distribution failed: ").concat(JSON.stringify(a)))
                        }
                    }
                }),
                t
            }(t),
            function(e, t) {
                var n = arguments;
                e.liveStreaming = c(),
                e.liveStreaming.connections = {
                    inject_streaming: null,
                    mix_streaming: null,
                    raw_streaming: null
                },
                e.liveStreaming.connectionTypes = {
                    inject_streaming: "pull",
                    mix_streaming: "push",
                    raw_streaming: "push"
                },
                e.liveStreaming.pushStates = {},
                e.liveStreaming.pullStates = {},
                e.gatewayClient.addEventListener("join", function(t) {
                    e.liveStreaming.resumeStates("pull")
                }),
                e.gatewayClient.addEventListener("stream-unpublished", function(t) {
                    if (t.options && 0 === t.options.streamType)
                        for (var n in e.liveStreaming.pushStates) {
                            var i = e.liveStreaming.pushStates[n];
                            i.url && e._stopLiveStreaming(i.url, i.transcodingEnabled, !0)
                        }
                }),
                e.gatewayClient.addEventListener("stream-published", function(t) {
                    e.liveStreaming.resumeStates("push")
                }),
                e.liveStreaming.connect = (g = K()(Y.a.mark(function n(i) {
                    var a, r;
                    return Y.a.wrap(function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                if (e.joinInfo && e.joinInfo.uid && parseInt(e.joinInfo.vid, 10)) {
                                    n.next = 3;
                                    break
                                }
                                throw new Error("CLIENT_NOT_JOINED");
                            case 3:
                                return a = new _t({
                                    appId: t.appId,
                                    cname: e.channel,
                                    sid: t.sessionId,
                                    uid: e.joinInfo.uid
                                }),
                                e.liveStreaming.connections[i] = a,
                                n.next = 7,
                                gt({
                                    appId: t.appId,
                                    cname: e.channel,
                                    serviceName: i,
                                    sid: t.sessionId,
                                    uid: e.joinInfo.uid
                                });
                            case 7:
                                return r = n.sent,
                                n.next = 10,
                                a.connect({
                                    wsClient: r
                                });
                            case 10:
                                return a.on("notification", function(t) {
                                    if (t.serviceName = i,
                                    e.liveStreaming.dispatchEvent(t),
                                    503 === t.code)
                                        ;
                                    else
                                        switch (t.serviceName) {
                                        case "inject_streaming":
                                            var n = {
                                                reason: t && t.reason,
                                                status: Tt(t && t.code),
                                                type: "streamInjectedStatus",
                                                uid: t && t.serverStatus && t.serverStatus.inject_uid,
                                                url: t && t.serverStatus && t.serverStatus.url
                                            };
                                            e.gatewayClient.dispatchEvent(n);
                                            break;
                                        case "raw_streaming":
                                        case "mix_streaming":
                                            var a = {
                                                reason: t && t.reason,
                                                status: t && t.code,
                                                type: t && 200 === t.code ? "liveStreamingStarted" : "liveStreamingFailed",
                                                uid: t && t.serverStatus && t.uid,
                                                url: t && t.serverStatus && t.serverStatus.url
                                            };
                                            e.gatewayClient.dispatchEvent(a)
                                        }
                                }),
                                a.on("close", function(t) {
                                    Et(a),
                                    o.default.debug("Reconnect ".concat(i)),
                                    e.liveStreaming.connect(i).catch(function(t) {
                                        e.liveStreaming.connections[i] = null,
                                        e.gatewayClient.dispatchEvent({
                                            type: "".concat(i.replace("_", "-"), "-disconnected")
                                        })
                                    })
                                }),
                                o.default.debug("".concat(i, " connected")),
                                n.abrupt("return", a);
                            case 14:
                            case "end":
                                return n.stop()
                            }
                    }, n, this)
                })),
                function(e) {
                    return g.apply(this, arguments)
                }
                ),
                e.liveStreaming.disconnect = (p = K()(Y.a.mark(function t(n) {
                    var i, a;
                    return Y.a.wrap(function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                t.t0 = Y.a.keys(e.liveStreaming.connections);
                            case 1:
                                if ((t.t1 = t.t0()).done) {
                                    t.next = 13;
                                    break
                                }
                                if (i = t.t1.value,
                                !e.liveStreaming.connections.hasOwnProperty(i)) {
                                    t.next = 11;
                                    break
                                }
                                if (!(a = e.liveStreaming.connections[i]) || n && n !== i) {
                                    t.next = 11;
                                    break
                                }
                                return o.default.info("Disconnecting liveStreaming ".concat(i)),
                                t.next = 9,
                                a.disconnect();
                            case 9:
                                t.sent,
                                e.liveStreaming.connections[i] = null;
                            case 11:
                                t.next = 1;
                                break;
                            case 13:
                            case "end":
                                return t.stop()
                            }
                    }, t, this)
                })),
                function(e) {
                    return p.apply(this, arguments)
                }
                ),
                e.liveStreaming.resumeStates = (f = K()(Y.a.mark(function t(n) {
                    var i, a, r, s, c, d, u, l;
                    return Y.a.wrap(function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                t.t0 = Y.a.keys(e.liveStreaming.connections);
                            case 1:
                                if ((t.t1 = t.t0()).done) {
                                    t.next = 8;
                                    break
                                }
                                if (i = t.t1.value,
                                !n || e.liveStreaming.connectionTypes[i] === n) {
                                    t.next = 5;
                                    break
                                }
                                return t.abrupt("continue", 1);
                            case 5:
                                e.liveStreaming.connections.hasOwnProperty(i) && (a = e.liveStreaming.connections[i]) && (o.default.info("LiveStreaming closing connection ".concat(i)),
                                a.disconnect(),
                                e.liveStreaming.connections[i] = null),
                                t.next = 1;
                                break;
                            case 8:
                                t.t2 = Y.a.keys(e.liveStreaming.pushStates);
                            case 9:
                                if ((t.t3 = t.t2()).done) {
                                    t.next = 37;
                                    break
                                }
                                if (r = t.t3.value,
                                !n || "push" === n) {
                                    t.next = 13;
                                    break
                                }
                                return t.abrupt("continue", 9);
                            case 13:
                                if (!e.liveStreaming.pushStates.hasOwnProperty(r)) {
                                    t.next = 35;
                                    break
                                }
                                if (s = e.liveStreaming.pushStates[r],
                                "audience" !== e.gatewayClient.role) {
                                    t.next = 19;
                                    break
                                }
                                o.default.warning("Cannot resume LiveStreaming in audience mode. ".concat(s.url), s),
                                t.next = 35;
                                break;
                            case 19:
                                if (!s) {
                                    t.next = 35;
                                    break
                                }
                                return o.default.debug("Resuming LiveStreaming ".concat(s.url), s),
                                t.prev = 21,
                                t.next = 24,
                                e._startLiveStreaming(s.url, s.transcodingEnabled);
                            case 24:
                                c = t.sent,
                                o.default.debug("Resumed LiveStreaming ".concat(s.url, ": ").concat(c.reason)),
                                t.next = 35;
                                break;
                            case 28:
                                if (t.prev = 28,
                                t.t4 = t.catch(21),
                                454 !== t.t4.code) {
                                    t.next = 34;
                                    break
                                }
                                o.default.debug("Resumed LiveStreaming ".concat(s.url, ": ").concat(t.t4.reason)),
                                t.next = 35;
                                break;
                            case 34:
                                throw t.t4;
                            case 35:
                                t.next = 9;
                                break;
                            case 37:
                                t.t5 = Y.a.keys(e.liveStreaming.pullStates);
                            case 38:
                                if ((t.t6 = t.t5()).done) {
                                    t.next = 62;
                                    break
                                }
                                if (d = t.t6.value,
                                !n || "pull" === n) {
                                    t.next = 42;
                                    break
                                }
                                return t.abrupt("continue", 38);
                            case 42:
                                if (!e.liveStreaming.pullStates.hasOwnProperty(d)) {
                                    t.next = 60;
                                    break
                                }
                                if (u = e.liveStreaming.pullStates[d],
                                "audience" !== e.gatewayClient.role) {
                                    t.next = 48;
                                    break
                                }
                                o.default.warning("Cannot resume addInjectStreamUrl in audience mode. ".concat(u.url), u),
                                t.next = 60;
                                break;
                            case 48:
                                if (!u) {
                                    t.next = 60;
                                    break
                                }
                                return o.default.debug("Resuming LiveStreaming pullStream ".concat(u.url), u),
                                t.prev = 50,
                                t.next = 53,
                                e._addInjectStreamUrl(u.url, u.transcodingConfig);
                            case 53:
                                l = t.sent,
                                o.default.debug("Resumed LiveStreaming pullStream ".concat(u.url, ": ").concat(l.reason)),
                                t.next = 60;
                                break;
                            case 57:
                                t.prev = 57,
                                t.t7 = t.catch(50),
                                451 === t.t7.code && o.default.debug("Resumed LiveStreaming pullStream ".concat(u.url, ": ").concat(t.t7.reason));
                            case 60:
                                t.next = 38;
                                break;
                            case 62:
                            case "end":
                                return t.stop()
                            }
                    }, t, this, [[21, 28], [50, 57]])
                })),
                function(e) {
                    return f.apply(this, arguments)
                }
                ),
                e.liveStreaming.startOptions = {
                    autoDestroyTime: 30
                },
                e.liveStreaming.transcodingConfig = {
                    audioBitrate: 48,
                    audioChannels: 1,
                    audioSampleRate: 48e3,
                    backgroundColor: 0,
                    height: 360,
                    images: [],
                    lowLatency: !1,
                    metadata: "",
                    userConfigExtraInfo: "",
                    userConfigs: [],
                    videoBitrate: 400,
                    videoCodecProfile: 100,
                    videoCodecType: 1,
                    videoFramerate: 15,
                    videoGop: 30,
                    width: 640
                },
                e.startLiveStreaming = function(n, i) {
                    Object(H.isEmpty)(i) || Object(H.checkValidBoolean)(i, "transcodingEnabled"),
                    Object(H.checkValidString)(n, "url", 1, 1024);
                    var a = s.b.reportApiInvoke(t.sessionId, {
                        name: "Client.startLiveStreaming",
                        options: arguments,
                        tag: "tracer"
                    });
                    if (e.gatewayClient && "audience" === e.gatewayClient.role) {
                        var r = {
                            code: 403,
                            reason: "AUDIENCE_STREAMING_FORBIDDEN"
                        };
                        throw a(r),
                        r
                    }
                    var o = e._startLiveStreaming(n, i);
                    return o.then(function(e) {
                        a(null, e)
                    }).catch(function(e) {
                        a(e)
                    }),
                    o
                }
                ,
                e._startLiveStreaming = (l = K()(Y.a.mark(function n(i, a) {
                    var r, s, c, d;
                    return Y.a.wrap(function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                return r = h()({
                                    allocate: !0,
                                    clientRequest: {
                                        command: "PublishStream"
                                    },
                                    command: "request"
                                }),
                                o.default.debug("startLiveStreaming ".concat(i, ", ").concat(a)),
                                h()(r.clientRequest, e.liveStreaming.startOptions, {
                                    ts: Date.now(),
                                    url: i,
                                    vid: parseInt(e.joinInfo.vid, 10)
                                }),
                                s = null,
                                a ? (e.liveStreaming.connections.mix_streaming || e.liveStreaming.connect("mix_streaming"),
                                r.clientRequest.transcodingConfig = JSON.parse(JSON.stringify(e.liveStreaming.transcodingConfig)),
                                s = e.liveStreaming.connections.mix_streaming) : ("vp8" === t.codec && o.default.warning("VP8 is not supported by raw_streaming. Subscriber side will suffer"),
                                "rtc" === t.mode && o.default.warning("RTC mode is not supported by raw_streaming. Subscriber side will suffer"),
                                e.liveStreaming.connections.raw_streaming || e.liveStreaming.connect("raw_streaming"),
                                s = e.liveStreaming.connections.raw_streaming),
                                c = null,
                                d = {},
                                n.prev = 7,
                                n.next = 10,
                                s.request(r);
                            case 10:
                                c = n.sent,
                                d.type = "liveStreamingStarted",
                                d.reason = c && c.reason,
                                d.status = c && c.code,
                                d.url = c && c.serverResponse && c.serverResponse.url,
                                e.gatewayClient.dispatchEvent(d),
                                n.next = 26;
                                break;
                            case 18:
                                throw n.prev = 18,
                                n.t0 = n.catch(7),
                                d.type = "liveStreamingFailed",
                                d.reason = n.t0 && n.t0.reason,
                                d.status = n.t0 && n.t0.code,
                                d.url = n.t0 && n.t0.serverResponse && n.t0.serverResponse.url,
                                e.gatewayClient.dispatchEvent(d),
                                n.t0;
                            case 26:
                                return e.liveStreaming.pushStates[i] = {
                                    transcodingEnabled: a,
                                    url: i
                                },
                                n.abrupt("return", c);
                            case 28:
                            case "end":
                                return n.stop()
                            }
                    }, n, this, [[7, 18]])
                })),
                function(e, t) {
                    return l.apply(this, arguments)
                }
                ),
                e.setLiveTranscoding = function(n, i) {
                    o.default.debug("setLiveTranscoding: ".concat(JSON.stringify(n))),
                    Object(H.checkValidObject)(n, "transcoding");
                    var a = n
                      , r = a.width
                      , c = a.height
                      , d = a.videoBitrate
                      , u = a.videoFramerate
                      , l = a.lowLatency
                      , f = a.audioSampleRate
                      , p = a.audioBitrate
                      , g = a.audioChannels
                      , m = a.videoGop
                      , v = a.images
                      , S = a.videoCodecProfile
                      , h = a.userCount
                      , _ = a.backgroundColor
                      , E = a.transcodingUsers;
                    if (E || (E = n.userConfigs),
                    Object(H.isEmpty)(r) || Object(H.checkValidNumber)(r, "width"),
                    Object(H.isEmpty)(c) || Object(H.checkValidNumber)(c, "height"),
                    Object(H.isEmpty)(d) || Object(H.checkValidNumber)(d, "videoBitrate", 1, 1e6),
                    Object(H.isEmpty)(u) || Object(H.checkValidNumber)(u, "videoFramerate"),
                    Object(H.isEmpty)(l) || Object(H.checkValidBoolean)(l, "lowLatency"),
                    Object(H.isEmpty)(f) || Object(H.checkValidEnum)(f, "audioSampleRate", [32e3, 44100, 48e3]),
                    Object(H.isEmpty)(p) || Object(H.checkValidNumber)(p, "audioBitrate", 1, 128),
                    Object(H.isEmpty)(g) || Object(H.checkValidEnum)(g, "audioChannels", [1, 2, 3, 4, 5]),
                    Object(H.isEmpty)(m) || Object(H.checkValidNumber)(m, "videoGop"),
                    Object(H.isEmpty)(S) || Object(H.checkValidEnum)(S, "videoCodecProfile", [66, 77, 100]),
                    Object(H.isEmpty)(h) || Object(H.checkValidNumber)(h, "userCount", 0, 17),
                    Object(H.isEmpty)(_) || Object(H.checkValidNumber)(_, "backgroundColor", 0, 16777215),
                    !Object(H.isEmpty)(E)) {
                        if (!Object(H.isArray)(E))
                            throw new Error("[transcodingUsers]: transcodingUsers should be Array");
                        if (E.length > 17)
                            throw new Error("The length of transcodingUsers cannot greater than 17");
                        E.map(function(e, t) {
                            if (!Object(H.isEmpty)(e.uid) && !It(e.uid) && !Object(H.isValidString)(e.uid, 1, 255))
                                throw new Error("[String uid] Length of the string: [1,255]. ASCII characters only. [Number uid] The value range is [0,10000]");
                            if (Object(H.isEmpty)(e.x) ? e.x = 0 : Object(H.checkValidNumber)(e.x, "transcodingUser[".concat(t, "].x"), 0, 1e4),
                            Object(H.isEmpty)(e.y) ? e.y = 0 : Object(H.checkValidNumber)(e.y, "transcodingUser[".concat(t, "].y"), 0, 1e4),
                            Object(H.isEmpty)(e.width) ? e.width = 640 : Object(H.checkValidNumber)(e.width, "transcodingUser[".concat(t, "].width"), 0, 1e4),
                            Object(H.isEmpty)(e.height) ? e.height = 360 : Object(H.checkValidNumber)(e.height, "transcodingUser[".concat(t, "].height"), 0, 1e4),
                            Object(H.isEmpty)(e.zOrder) ? e.zOrder = 0 : Object(H.checkValidNumber)(e.zOrder, "transcodingUser[".concat(t, "].zOrder"), 0, 100),
                            Object(H.isEmpty)(e.alpha))
                                e.alpha = 1;
                            else if (!(Object(H.isNumber)(e.alpha) && e.alpha <= 1 && e.alpha >= 0))
                                throw new Error("transcodingUser[${index}].alpha: The value range is [0, 1]")
                        })
                    }
                    if (!Object(H.isEmpty)(v)) {
                        if (!Object(H.isArray)(v))
                            throw new Error("[images]: images should be Array");
                        v.map(function(e, t) {
                            if (Object(H.checkValidString)(e.url, "images[".concat(t, "].url"), 1, 1024),
                            Object(H.isEmpty)(e.x) ? e.x = 0 : Object(H.checkValidNumber)(e.x, "images[".concat(t, "].x"), 0, 1e4),
                            Object(H.isEmpty)(e.y) ? e.y = 0 : Object(H.checkValidNumber)(e.y, "images[".concat(t, "].y"), 0, 1e4),
                            Object(H.isEmpty)(e.width) ? e.width = 160 : Object(H.checkValidNumber)(e.width, "images[".concat(t, "].width"), 0, 1e4),
                            Object(H.isEmpty)(e.height) ? e.height = 160 : Object(H.checkValidNumber)(e.height, "images[".concat(t, "].height"), 0, 1e4),
                            Object(H.isEmpty)(e.zOrder) ? e.zOrder = 0 : Object(H.checkValidNumber)(e.zOrder, "images[".concat(t, "].zOrder"), 0, 100),
                            Object(H.isEmpty)(e.alpha))
                                e.alpha = 1;
                            else if (!(Object(H.isNumber)(e.alpha) && e.alpha <= 1 && e.alpha >= 0))
                                throw new Error("image[${index}].alpha: The value range is [0, 1]")
                        })
                    }
                    var I = s.b.reportApiInvoke(t.sessionId, {
                        name: "Client.setLiveTranscoding",
                        options: arguments,
                        tag: "tracer"
                    });
                    if ((n = JSON.parse(JSON.stringify(n))).transcodingUsers && (n.userConfigs = n.transcodingUsers,
                    delete n.transcodingUsers),
                    e.joinInfo.stringUid && n.userConfigs && n.userConfigs.length) {
                        var T = [];
                        n.userConfigs.forEach(function(t) {
                            T.push(Ge(e.joinInfo, e.gatewayClient, t.uid).then(function(e) {
                                t.uid = e.uid
                            }))
                        });
                        var y = Promise.all(T).then(function() {
                            return e._setLiveTranscoding(n, i)
                        });
                        return y.then(function(e) {
                            I(null, e)
                        }).catch(function(e) {
                            I(e)
                        }),
                        y
                    }
                    var b = e._setLiveTranscoding(n, i);
                    return b.then(function(e) {
                        I(null, e)
                    }).catch(function(e) {
                        I(e)
                    }),
                    b
                }
                ,
                e._setLiveTranscoding = (u = K()(Y.a.mark(function t(n, i) {
                    var a, r, o;
                    return Y.a.wrap(function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (e.liveStreaming.transcodingConfig = h()(e.liveStreaming.transcodingConfig, n),
                                "boolean" != typeof i && (i = !!e.liveStreaming.connections.mix_streaming),
                                a = JSON.parse(JSON.stringify({
                                    allocate: !1,
                                    clientRequest: {
                                        command: "UpdateTranscoding",
                                        transcodingConfig: e.liveStreaming.transcodingConfig
                                    },
                                    command: "request"
                                })),
                                r = {},
                                !i) {
                                    t.next = 16;
                                    break
                                }
                                return e.liveStreaming.connections.mix_streaming || e.liveStreaming.connect("mix_streaming"),
                                t.next = 8,
                                e.liveStreaming.connections.mix_streaming.request(a);
                            case 8:
                                return o = t.sent,
                                r.type = "liveTranscodingUpdated",
                                r.reason = o.reason,
                                r.status = o.code,
                                e.gatewayClient.dispatchEvent(r),
                                t.abrupt("return", o);
                            case 16:
                                return t.abrupt("return", {
                                    code: 200,
                                    reason: "success"
                                });
                            case 17:
                            case "end":
                                return t.stop()
                            }
                    }, t, this)
                })),
                function(e, t) {
                    return u.apply(this, arguments)
                }
                ),
                e.stopLiveStreaming = function(n, i) {
                    Object(H.checkValidString)(n, "url", 1, 1024);
                    var a = s.b.reportApiInvoke(t.sessionId, {
                        name: "Client.stopLiveStreaming",
                        options: arguments,
                        tag: "tracer"
                    })
                      , r = e._stopLiveStreaming(n, i);
                    return r.then(function(e) {
                        a(null, e)
                    }).catch(function(e) {
                        a(e)
                    }),
                    r
                }
                ,
                e._stopLiveStreaming = (d = K()(Y.a.mark(function t(n, i, a) {
                    var r, o, s, c, d, u;
                    return Y.a.wrap(function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return r = null,
                                o = e.liveStreaming.pushStates[n],
                                r = o ? o.transcodingEnabled ? "mix_streaming" : "raw_streaming" : i ? "mix_streaming" : "raw_streaming",
                                s = {
                                    allocate: !1,
                                    clientRequest: {
                                        command: "UnpublishStream",
                                        url: n
                                    },
                                    command: "request"
                                },
                                e.liveStreaming.connections[r] || e.liveStreaming.connect(r),
                                c = null,
                                t.prev = 6,
                                t.next = 9,
                                e.liveStreaming.connections[r].request(s);
                            case 9:
                                c = t.sent,
                                (d = {}).type = "liveStreamingStopped",
                                d.reason = c && c.reason,
                                d.status = c && c.code,
                                d.url = c && c.serverResponse && c.serverResponse.url,
                                e.gatewayClient.dispatchEvent(d),
                                t.next = 27;
                                break;
                            case 18:
                                throw t.prev = 18,
                                t.t0 = t.catch(6),
                                (u = {}).type = "liveStreamingStopped",
                                u.reason = t.t0 && t.t0.reason,
                                u.status = t.t0 && t.t0.code,
                                u.url = t.t0 && t.t0.serverResponse && t.t0.serverResponse.url,
                                e.gatewayClient.dispatchEvent(u),
                                t.t0;
                            case 27:
                                return a || delete e.liveStreaming.pushStates[n],
                                t.abrupt("return", c);
                            case 29:
                            case "end":
                                return t.stop()
                            }
                    }, t, this, [[6, 18]])
                })),
                function(e, t, n) {
                    return d.apply(this, arguments)
                }
                ),
                e.liveStreaming.injectStreamTranscodingConfig = {
                    autoDestroyTime: 30,
                    audioBitrate: 48,
                    audioChannels: 1,
                    audioSampleRate: 44100,
                    height: 0,
                    videoBitrate: 400,
                    videoFramerate: 15,
                    videoGop: 30,
                    width: 0
                },
                e.addInjectStreamUrl = function(i, a) {
                    Object(H.checkValidString)(i, "url", 1, 1024),
                    Object(H.checkValidObject)(a, "config"),
                    !Object(H.isEmpty)(a && a.width) && Object(H.checkValidNumber)(a.width, "config.width", 0, 1e4),
                    !Object(H.isEmpty)(a && a.height) && Object(H.checkValidNumber)(a.height, "config.height", 0, 1e4),
                    !Object(H.isEmpty)(a && a.videoGop) && Object(H.checkValidNumber)(a.videoGop, "config.videoGop", 1, 1e4),
                    !Object(H.isEmpty)(a && a.videoFramerate) && Object(H.checkValidNumber)(a.videoFramerate, "config.videoFramerate", 1, 1e4),
                    !Object(H.isEmpty)(a && a.videoBitrate) && Object(H.checkValidNumber)(a.videoBitrate, "config.videoBitrate", 1, 1e4),
                    !Object(H.isEmpty)(a && a.audioSampleRate) && Object(H.checkValidEnum)(a.audioSampleRate, "config.audioSampleRate", [32e3, 44100, 48e3]),
                    !Object(H.isEmpty)(a && a.audioBitrate) && Object(H.checkValidNumber)(a.audioBitrate, "config.audioBitrate", 1, 1e4),
                    !Object(H.isEmpty)(a && a.audioChannels) && Object(H.checkValidNumber)(a.audioChannels, "config.audioChannels", 1, 2);
                    var r = s.b.reportApiInvoke(t.sessionId, {
                        name: "Client.addInjectStreamUrl",
                        options: n,
                        tag: "tracer"
                    });
                    if ("audience" === e.gatewayClient.role) {
                        var o = {
                            code: 403,
                            reason: "AUDIENCE_INJECTING_FORBIDDEN"
                        };
                        throw r(o),
                        o
                    }
                    var c = e._addInjectStreamUrl(i, a);
                    return c.then(function(e) {
                        r(null, e)
                    }).catch(function(e) {
                        r(e)
                    }),
                    c
                }
                ,
                e._addInjectStreamUrl = (r = K()(Y.a.mark(function n(i, a) {
                    var r, o, s, c, d;
                    return Y.a.wrap(function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                return r = h()({}, e.liveStreaming.injectStreamTranscodingConfig, a),
                                o = {
                                    allocate: !0,
                                    clientRequest: {
                                        cname: e.channel,
                                        command: "InjectStream",
                                        sid: t.sessionId,
                                        transcodingConfig: r,
                                        ts: Date.now(),
                                        url: i,
                                        vid: parseInt(e.joinInfo.vid, 10)
                                    },
                                    command: "request"
                                },
                                e.liveStreaming.connections.inject_streaming || e.liveStreaming.connect("inject_streaming"),
                                s = null,
                                n.prev = 4,
                                n.next = 7,
                                e.liveStreaming.connections.inject_streaming.request(o);
                            case 7:
                                s = n.sent,
                                c = {
                                    reason: s && s.reason,
                                    status: Tt(s && s.code),
                                    type: "streamInjectedStatus",
                                    uid: s && s.serverResponse && s.serverResponse.inject_uid,
                                    url: s && s.serverResponse && s.serverResponse.url
                                },
                                e.gatewayClient.dispatchEvent(c),
                                n.next = 17;
                                break;
                            case 12:
                                throw n.prev = 12,
                                n.t0 = n.catch(4),
                                d = {
                                    reason: n.t0 && n.t0.reason,
                                    status: Tt(n.t0 && n.t0.code),
                                    type: "streamInjectedStatus",
                                    uid: n.t0 && n.t0.serverResponse && n.t0.serverResponse.inject_uid,
                                    url: n.t0 && n.t0.serverResponse && n.t0.serverResponse.url
                                },
                                e.gatewayClient.dispatchEvent(d),
                                n.t0;
                            case 17:
                                return e.liveStreaming.pullStates[i] = {
                                    transcodingConfig: r,
                                    url: i
                                },
                                n.abrupt("return", s);
                            case 19:
                            case "end":
                                return n.stop()
                            }
                    }, n, this, [[4, 12]])
                })),
                function(e, t) {
                    return r.apply(this, arguments)
                }
                ),
                e.removeInjectStreamUrl = (a = K()(Y.a.mark(function n(i) {
                    var a, r, o = arguments;
                    return Y.a.wrap(function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                return Object(H.checkValidString)(i, "url", 1, 255),
                                a = s.b.reportApiInvoke(t.sessionId, {
                                    name: "Client.removeInjectStreamUrl",
                                    options: o,
                                    tag: "tracer"
                                }),
                                (r = e._removeInjectStreamUrl(i)).then(function(e) {
                                    a(null, e)
                                }).catch(function(e) {
                                    a(e)
                                }),
                                n.abrupt("return", r);
                            case 5:
                            case "end":
                                return n.stop()
                            }
                    }, n, this)
                })),
                function(e) {
                    return a.apply(this, arguments)
                }
                ),
                e._removeInjectStreamUrl = (i = K()(Y.a.mark(function t(n) {
                    var i, a, r, o;
                    return Y.a.wrap(function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return i = {
                                    allocate: !1,
                                    clientRequest: {
                                        command: "UninjectStream",
                                        url: n
                                    },
                                    command: "request"
                                },
                                e.liveStreaming.connections.inject_streaming || e.liveStreaming.connect("inject_streaming"),
                                a = null,
                                t.prev = 3,
                                t.next = 6,
                                e.liveStreaming.connections.inject_streaming.request(i);
                            case 6:
                                a = t.sent,
                                r = {
                                    reason: a && a.reason,
                                    status: yt(a && a.code),
                                    type: "streamInjectedStatus",
                                    uid: a && a.serverResponse && a.serverResponse.inject_uid,
                                    url: a && a.serverResponse && a.serverResponse.url
                                },
                                e.gatewayClient.dispatchEvent(r),
                                t.next = 16;
                                break;
                            case 11:
                                throw t.prev = 11,
                                t.t0 = t.catch(3),
                                o = {
                                    reason: t.t0 && t.t0.reason,
                                    status: yt(t.t0 && t.t0.code),
                                    type: "streamInjectedStatus",
                                    uid: t.t0 && t.t0.serverResponse && t.t0.serverResponse.inject_uid,
                                    url: t.t0 && t.t0.serverResponse && t.t0.serverResponse.url
                                },
                                e.gatewayClient.dispatchEvent(o),
                                t.t0;
                            case 16:
                                return delete e.liveStreaming.pullStates[n],
                                t.abrupt("return", a);
                            case 18:
                            case "end":
                                return t.stop()
                            }
                    }, t, this, [[3, 11]])
                })),
                function(e) {
                    return i.apply(this, arguments)
                }
                );
                var i;
                var a;
                var r;
                var d;
                var u;
                var l;
                var f;
                var p;
                var g
            }(t, e),
            Object(H.isEmpty)(e.turnServer) || t.setTurnServer(e.turnServer),
            Object(H.isEmpty)(e.proxyServer) || t.setProxyServer(e.proxyServer),
            "live" === t.mode && (t.gatewayClient.role = "audience"),
            "rtc" === t.mode && (t.gatewayClient.role = "host"),
            t.gatewayClient.on("onMultiIP", function(e) {
                t.gatewayClient.closeGateway(),
                t.gatewayClient.socket = void 0,
                t.gatewayClient.hasChangeBGPAddress = !0,
                t.joinInfo.multiIP = e.option,
                t.gatewayClient.state = et.CONNECTING;
                var n = function(e) {
                    o.default.info("[".concat(t.clientId, "] Joining channel: ").concat(t.channel)),
                    t.joinInfo.cid = e.cid,
                    t.joinInfo.uid || (t.joinInfo.uid = e.uid),
                    t.joinInfo.uni_lbs_ip = e.uni_lbs_ip,
                    t.joinInfo.gatewayAddr = e.gateway_addr,
                    t.onSuccess ? t.gatewayClient.join(t.joinInfo, t.key, function(e) {
                        o.default.info("[".concat(t.clientId, "] Join channel ").concat(t.channel, " success"));
                        var n = t.onSuccess;
                        t.onSuccess = null,
                        t.onFailure = null,
                        n(e)
                    }, t.onFailure) : (t.gatewayClient.joinInfo = h()({}, t.joinInfo),
                    t.gatewayClient.rejoin())
                };
                t.joinInfo.stringUid && !t.joinInfo.uid ? (t.userAccountReq && !t.userAccountReq.isFinished() && t.userAccountReq.cancel(),
                t.userAccountReq = Ge(joinInfo, t.gatewayClient),
                t.userAccountReq.then(function(e) {
                    o.default.error("getUserAccount Success ".concat(e.url, " ").concat(joinInfo.stringUid, " => ").concat(e.uid)),
                    t.joinInfo.uid = e.uid,
                    We(t.joinInfo, n, t.onFailure)
                }).catch(function(e) {
                    o.default.error("getUserAccount rejected", e),
                    t.onFailure(e)
                })) : We(t.joinInfo, n, t.onFailure)
            }),
            t.gatewayClient.on("rejoin-start", function() {
                t._renewSession(),
                s.b.sessionInit(e.sessionId, {
                    lts: (new Date).getTime(),
                    extend: {
                        rejoin: !0
                    },
                    cname: t.channel,
                    appid: e.appId,
                    mode: e.mode,
                    succ: !0
                })
            }),
            t.gatewayClient.on("recover", function() {
                t._renewSession(),
                console.log("recover", e.sessionId),
                s.b.sessionInit(e.sessionId, {
                    lts: (new Date).getTime(),
                    extend: {
                        recover: !0
                    },
                    cname: t.channel,
                    appid: e.appId,
                    mode: e.mode,
                    succ: !0
                })
            }),
            t.gatewayClient.on("rejoin", function() {
                var e = t.highStreamState;
                if (o.default.debug("[".concat(t.clientId, "] Client local stream preState: ").concat(e)),
                t.onSuccess) {
                    var n = t.onSuccess;
                    t.onSuccess = null,
                    t.onFailure = null,
                    n(t.joinInfo.uid)
                }
                !t.highStream || 0 !== e && 1 !== e || (o.default.info("[".concat(t.clientId, "] publish after rejoin")),
                t.highStreamState = 2,
                t.lowStreamState = 2,
                t.publish(t.highStream, function(e) {
                    e && o.default.info("[".concat(t.clientId, "] "), e)
                }))
            }),
            t.gatewayClient.on("streamPublished", function(e) {
                t.hasPublished || (t.hasPublished = !0,
                t.gatewayClient.dispatchEvent(u({
                    type: "stream-published",
                    stream: e.stream
                })))
            }),
            t.gatewayClient.on("pubP2PLost", function(e) {
                o.default.debug("[".concat(t.clientId, "] Start reconnect local peerConnection: ").concat(t.highStream.getId())),
                t.gatewayClient.dispatchEvent({
                    type: "stream-reconnect-start",
                    uid: t.highStream.getId()
                }),
                1 === t.highStreamState && (t.highStreamState = 0,
                t.lowStreamState = 0),
                t._unpublish(t.highStream, function() {
                    t._publish(t.highStream, function() {
                        o.default.debug("[".concat(t.clientId, "] Reconnect local peerConnection success: ").concat(t.highStream.getId())),
                        t.gatewayClient.dispatchEvent({
                            type: "stream-reconnect-end",
                            uid: t.highStream.getId(),
                            success: !0,
                            reason: ""
                        })
                    }, function(e) {
                        o.default.debug("[".concat(t.clientId, "] Reconnect local peerConnection failed: ").concat(e)),
                        t.gatewayClient.dispatchEvent({
                            type: "stream-reconnect-end",
                            uid: t.highStream.getId(),
                            success: !1,
                            reason: e
                        })
                    }, !0)
                }, function(e) {
                    o.default.debug("[".concat(t.clientId, "] Reconnect local peerConnection failed: ").concat(e)),
                    t.gatewayClient.dispatchEvent({
                        type: "stream-reconnect-end",
                        uid: t.highStream.getId(),
                        success: !1,
                        reason: e
                    })
                }, !0)
            }),
            t.gatewayClient.on("subP2PLost", function(e) {
                o.default.debug("[".concat(t.clientId, "] Start reconnect remote peerConnection: ").concat(e.stream.getId(), " ").concat(e.stream.subscribeOptions)),
                t.gatewayClient.dispatchEvent({
                    type: "stream-reconnect-start",
                    uid: e.stream.getId()
                });
                var n = e.stream.subscribeOptions;
                console.log("Re-subscribe stream", n, e.stream),
                t.gatewayClient.unsubscribe(e.stream, function() {
                    e.stream.subscribeOptions = n,
                    t.gatewayClient.subscribe(e.stream, function() {
                        o.default.debug("[".concat(t.clientId, "] Reconnect remote peerConnection success: ").concat(e.stream.getId())),
                        t.gatewayClient.dispatchEvent({
                            type: "stream-reconnect-end",
                            uid: e.stream.getId(),
                            success: !1,
                            reason: ""
                        })
                    }, function(n) {
                        o.default.debug("[".concat(t.clientId, "] Reconnect remote peerConnection failed: "), n),
                        t.gatewayClient.dispatchEvent({
                            type: "stream-reconnect-end",
                            uid: e.stream.getId(),
                            success: !1,
                            reason: n
                        })
                    })
                }, function(n) {
                    o.default.debug("[".concat(t.clientId, "] Reconnect remote peerConnection failed: "), n),
                    t.gatewayClient.dispatchEvent({
                        type: "stream-reconnect-end",
                        uid: e.stream.getId(),
                        success: !1,
                        reason: n
                    })
                })
            }),
            at.on("networkTypeChanged", function(e) {
                t.gatewayClient && t.gatewayClient.dispatchEvent(e);
                var n = h()({}, e, {
                    type: "network-type-changed"
                });
                t.gatewayClient.dispatchEvent(n)
            }),
            W.on("recordingDeviceChanged", function(e) {
                t.gatewayClient && t.gatewayClient.dispatchEvent(e);
                var n = h()({}, e, {
                    type: "recording-device-changed"
                });
                t.gatewayClient.dispatchEvent(n)
            }),
            W.on("playoutDeviceChanged", function(e) {
                t.gatewayClient && t.gatewayClient.dispatchEvent(e);
                var n = h()({}, e, {
                    type: "playout-device-changed"
                });
                t.gatewayClient.dispatchEvent(n)
            }),
            W.on("cameraChanged", function(e) {
                t.gatewayClient && t.gatewayClient.dispatchEvent(e);
                var n = h()({}, e, {
                    type: "camera-changed"
                });
                t.gatewayClient.dispatchEvent(n)
            }),
            t.gatewayClient.on("streamTypeChange", function(n) {
                var i = h()({}, n, {
                    type: "stream-type-changed"
                });
                t.gatewayClient.dispatchEvent(i),
                s.b.reportApiInvoke(e.sessionId, {
                    name: "streamTypeChange"
                })(null, JSON.stringify(n))
            }),
            t
        }
          , Ct = {
            width: 640,
            height: 360,
            videoBitrate: 400,
            videoFramerate: 15,
            lowLatency: !1,
            audioSampleRate: 48e3,
            audioBitrate: 48,
            audioChannels: 1,
            videoGop: 30,
            videoCodecProfile: 100,
            userCount: 0,
            userConfigExtraInfo: {},
            backgroundColor: 0,
            transcodingUsers: []
        }
          , Ot = W.getDevices
          , Nt = M
          , wt = JSON.parse(JSON.stringify(r.SUPPORT_RESOLUTION_LIST));
        n.default = {
            TranscodingUser: {
                uid: 0,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                zOrder: 0,
                alpha: 1
            },
            LiveTranscoding: Ct,
            createClient: function(e) {
                var t = s.b.reportApiInvoke(null, {
                    name: "createClient",
                    options: arguments,
                    tag: "tracer"
                });
                (e = h()({}, e || {})).codec || (e.codec = function(e) {
                    switch (e) {
                    case "h264_interop":
                        return "h264";
                    default:
                        return "vp8"
                    }
                }(e.mode));
                var n = function(e) {
                    return -1 === Re.indexOf(e.mode) ? I.default.INVALID_CLIENT_MODE : -1 === Ae.indexOf(e.codec) ? I.default.INVALID_CLIENT_CODEC : "h264_interop" == e.mode && "h264" !== e.codec && I.default.CLIENT_MODE_CODEC_MISMATCH
                }(e);
                if (n)
                    throw o.default.error("Invalid parameter setting MODE: ".concat(e.mode, " CODEC: ").concat(e.codec, " ERROR ").concat(n)),
                    t(n),
                    new Error(n);
                return o.default.info("Creating client, MODE: ".concat(e.mode, " CODEC: ").concat(e.codec)),
                function(e) {
                    switch (e.mode) {
                    case "interop":
                    case "h264_interop":
                        e.mode = "live";
                        break;
                    case "web-only":
                        e.mode = "rtc"
                    }
                }(e),
                t(null, e),
                At(e)
            },
            createStream: function(e) {
                var t = s.b.reportApiInvoke(null, {
                    name: "createStream",
                    options: arguments,
                    tag: "tracer",
                    getStates: function() {
                        return {
                            audioTrackEnable: e && e.audioSource ? e.audioSource.enabled : null,
                            videoTrackEnable: e && e.videoSource ? e.videoSource.enabled : null
                        }
                    }
                });
                Object(H.checkValidObject)(e, "StreamSpec");
                var n = e.streamID
                  , i = e.audio
                  , a = e.video
                  , r = e.screen
                  , c = e.screenAudio
                  , d = (e.audioSource,
                e.videoSource,
                e.cameraId)
                  , u = e.facingMode
                  , l = e.microphoneId
                  , f = e.mirror
                  , p = e.extensionId
                  , g = e.mediaSource
                  , m = e.audioProcessing;
                if (!Object(H.isEmpty)(n) && !Object(F.is32Uint)(n) && !Object(H.isValidString)(n, 1, 255))
                    throw new Error("[String streamID] Length of the string: [1,255]. ASCII characters only. [Number streamID] The value range is Uint32");
                if (Object(H.checkValidBoolean)(i, "audio"),
                Object(H.checkValidBoolean)(a, "video"),
                Object(H.isEmpty)(r) || Object(H.checkValidBoolean)(r, "screen"),
                Object(H.isEmpty)(c) || Object(H.checkValidBoolean)(c, "screenAudio"),
                Object(H.isEmpty)(d) || Object(H.checkValidString)(d, "cameraId", 0, 255, !1),
                Object(H.isEmpty)(u) || Object(H.checkValidEnum)(u, "facingMode", ["user", "environment", "left", "right"]),
                Object(H.isEmpty)(l) || Object(H.checkValidString)(l, "microphoneId", 0, 255, !1),
                Object(H.isEmpty)(p) || Object(H.checkValidString)(p, "extensionId"),
                Object(H.isEmpty)(g) || Object(H.checkValidEnum)(g, "mediaSource", ["screen", "application", "window"]),
                Object(H.isEmpty)(f) || Object(H.checkValidBoolean)(f, "mirror"),
                !Object(H.isEmpty)(m)) {
                    var v = m.AGC
                      , S = m.AEC
                      , h = m.ANS;
                    Object(H.isEmpty)(v) || Object(H.checkValidBoolean)(v, "AGC"),
                    Object(H.isEmpty)(S) || Object(H.checkValidBoolean)(S, "AEC"),
                    Object(H.isEmpty)(h) || Object(H.checkValidBoolean)(h, "ANS")
                }
                o.default.debug("Create stream"),
                !0 === c && !0 === i && o.default.warning("Do not set both 'screenAudio' and 'audio' to true at the same time");
                var _ = Ie(e);
                return t(),
                _
            },
            Logger: o.default,
            report: s.b,
            getDevices: Ot,
            getScreenSources: Nt,
            getParameter: r.getParameter,
            setParameter: r.setParameter,
            checkSystemRequirements: function() {
                var e = s.b.reportApiInvoke(null, {
                    name: "checkSystemRequirements",
                    options: arguments,
                    tag: "tracer"
                })
                  , t = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
                  , n = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia
                  , i = window.WebSocket
                  , a = !!t && !!n && !!i
                  , r = !1;
                g.isChrome() && g.getBrowserVersion() >= 58 && "iOS" !== g.getBrowserOS() && (r = !0),
                g.isFireFox() && g.getBrowserVersion() >= 56 && (r = !0),
                g.isOpera() && g.getBrowserVersion() >= 45 && (r = !0),
                g.isSafari() && g.getBrowserVersion() >= 11 && (r = !0),
                g.isEdge() && (r = !0),
                (g.isWeChatBrowser() || g.isQQBrowser()) && "iOS" !== g.getBrowserOS() && (r = !0),
                g.isSupportedPC() || g.isSupportedMobile() || (r = !1),
                o.default.debug(g.getBrowserInfo(), "isAPISupport: " + a + ", isVendorAndVersionSupport: " + r);
                var c = a && r;
                return e(null, c),
                c
            },
            getSupportedCodec: Te.getSupportedCodec,
            ChannelMediaRelayConfiguration: ye.ChannelMediaRelayConfiguration,
            VERSION: r.VERSION,
            BUILD: r.BUILD,
            PROFILE_TABLE: wt,
            AUDIO_SAMPLE_RATE_32000: 32e3,
            AUDIO_SAMPLE_RATE_44100: 44100,
            AUDIO_SAMPLE_RATE_48000: 48e3,
            VIDEO_CODEC_PROFILE_BASELINE: 66,
            VIDEO_CODEC_PROFILE_MAIN: 77,
            VIDEO_CODEC_PROFILE_HIGH: 100,
            REMOTE_VIDEO_STREAM_HIGH: 0,
            REMOTE_VIDEO_STREAM_LOW: 1,
            REMOTE_VIDEO_STREAM_MEDIUM: 2
        }
    }
    ]).default
});
