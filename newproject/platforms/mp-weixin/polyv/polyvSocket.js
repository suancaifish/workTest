let loginUser,
  loginRoomId,
  loginUserId,
  start = 0,
  //消息回调，从onMessage方法传入参数
  messageCallback=function(){},
  //消息回调，从onMessage方法传入参数
  socketMsgCallback=function(){},
  //消息回调，从onMessage方法传入参数
  socketMessageFailCallback=function(){},
  //登录成功后回调
  loginCallBack = function(){},
  isSocketOpen = false,
  packets = {
    open: 0    // non-ws
    , close: 1    // non-ws
    , ping: 2
    , pong: 3
    , message: 4
    , upgrade: 5
    , noop: 6
  },
  events = {
    CONNECT: 0,
    DISCONNECT: 1,
    EVENT: 2,
    ACK: 3,
    ERROR: 4,
    BINARY_EVENT: 5,
    BINARY_ACK: 6
  },
  socketid='',
  forceDisConnect=false,
  heartBeatInterval = null;

/*socket start*/
function connectSocket(roomId, user, callback) {
  loginUser = user;
  loginRoomId = roomId;
  loginUserId = user[2];
  loginCallBack = callback;
  forceDisConnect = false;

  wx.connectSocket({
    url: 'wss://chat.polyv.net/socket.io/?EIO=3&transport=websocket&token=weixin',//真机不能使用端口号，因为默认监听443端口
    // url: 'wss://chat-test.polyv.net/socket.io/?EIO=3&transport=websocket&token=weixin', //连接beta机
    method: 'GET',
    success: function (res) {
      console.log('connect success: ', res);
    },
    fail: function (err) {
      console.log('connect error: ', err);
    }
  })

  messageCallback('LOGIN');

  if (typeof callback == 'function') {
    callback();
  }
}

//监听socket连接成功
wx.onSocketOpen(function (res) {
  isSocketOpen = true;
  console.log('WebSocket 已经连接！')
  var msg = {
    'EVENT': 'LOGIN',
    'values': loginUser,
    'roomId': loginRoomId
  }

  var sendData = ["message", JSON.stringify(msg)];
  wx.sendSocketMessage({
    data: [packets.message, events.EVENT, JSON.stringify(sendData)].join("")
  });

  if(heartBeatInterval){
    clearInterval(heartBeatInterval);
  }
console.log(">>>>>>>>> heartbeat ");
  //心跳防止socket断开
  heartBeatInterval = setInterval(function(){
    heartBeat();
  }, 25*1000);

});

wx.onSocketMessage(function (res) {
  var mData = res.data
  var patt = /^(\d)(\d?)(.*)$/g

  var match = patt.exec(mData);
//console.log(match);
  var isTrivia = false;

    if(match[0].indexOf("trivia")>-1){
      isTrivia = true;
    }

  if (match) {
    var mpp = /^\["message","(.*)"\]$/g;

    if(isTrivia){
      mpp = /^\["trivia","(.*)"\]$/g;
    }

    var mMatch = mpp.exec(match[3]);

    if (mMatch) {
      var content = mMatch[1].replace(/\\/g, '');
      try {
        var message = JSON.parse(content);
      } catch (e) {
        console.log(e);
        return;
      }
      // var message = JSON.parse(content);

      //严禁词过滤
      if(message.EVENT=="SPEAK" && (message.status==="error")){
        return;
      }

      //审核过滤
      if(message.EVENT=="SPEAK" && (message.user.userId === loginUserId)){
        return;
      }

      socketMsgCallback(message);
      switch (message.EVENT) {
        case 'LOGIN':
          socketid = message.user.uid;
        break;
        case 'CLOSEROOM':
          break;
        case 'GONGGAO': //系统公告
          break;
        case 'SPEAK': // 用户发言
          if (message.user.pic.indexOf("http") == -1) {
            message.user.pic = "https:" + message.user.pic;
          }
          message.showTime = prettyTime(message.time);
          messageCallback(message.EVENT, message);
          break;
        case 'FLOWERS': // 用户送花
          break;
        case 'REWARD':
          break;
      }

    }

  }



});

//监听socket关闭
wx.onSocketClose(function (res) {
  isSocketOpen = false;
  console.log('WebSocket 已关闭！');

  if(heartBeatInterval){
    clearInterval(heartBeatInterval);
  }

  if(!forceDisConnect){
    reConnectRoom();
  }

  socketMessageFailCallback();
});

//监听socket错误
wx.onSocketError(function (res) {
  isSocketOpen = false;
  //console.log(res);
  //console.log('webSocket Error!');
  if(!forceDisConnect){
    reConnectRoom();
  }

  socketMessageFailCallback();

});

/*socket end*/

//登录房间
function loginRoom(roomId, user, callback) {
  connectSocket(roomId, user, callback);
}

//获取历史消息
function getHistoryContent() {

  var url = "https://apichat.polyv.net/front/history?roomId=" + loginRoomId + "&start=" + start + "&end=" + (start + 10);

  start = start + 10;

  wx.request({
    url: url,
    method: 'GET',
    success: function (res) {

      if (res) {
        var arr = res.data.slice(0, 10);
        for (var i = 0; i < arr.length - 1; i++) {
          if (arr[i].user.pic.indexOf("http") == -1) {
            arr[i].user.pic = "https:" + arr[i].user.pic;
          }
          arr[i].showTime = prettyTime(arr[i].time);
          if (arr[i].user.userId == loginUserId) {
            arr[i].class = "clearfix right";
          }
        }

        messageCallback("GETHISTORY", arr);

      } else {
        messageCallback("GETHISTORY", []);
      }

    }
  })
}

//发送消息
function sendMsg(msg) {
  if (isSocketOpen) {
    //去除换行
    msg = msg.replace(/\n/g, '');
    //空白内容不发送
    var t = msg.match(/\s/g);
    if (msg == "" || t && t.length == msg.length) {
      return;
    }

    var data = {
      'EVENT': 'SPEAK',
      'values': [msg],
      'roomId': loginRoomId
    };

    var sendData = ["message", JSON.stringify(data)];

    if(isSocketOpen){
      wx.sendSocketMessage({
        data: [packets.message, events.EVENT, JSON.stringify(sendData)].join("")
      })
    }

  }
}
var index = 0;
//心跳
function heartBeat(){
  var data = {
    'EVENT': 'HEARTBEAT',
    'uid': loginUserId,
    'roomId': loginRoomId,
    'version':'1.0'
  };

  console.log("socketid: " + socketid);

  var sendData = ["message", JSON.stringify(data)];

  if(isSocketOpen){
    wx.sendSocketMessage({
      data: [packets.message, events.EVENT, JSON.stringify(sendData)].join("")
    })
  }

}

//时间格式化
function prettyTime(time) {
  var now = (new Date()).getTime();
  var date = new Date(time || "");
  var diff = (now - date.getTime()) / 1000;
  var day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0)
    return;

  return day_diff == 0 && (
    diff < 5 && "刚刚" ||
    diff < 60 && Math.floor(diff) + "秒前" ||
    diff < 120 && "1分钟前" ||
    diff < 3600 && Math.floor(diff / 60) +
    "分钟前" ||
    diff < 7200 && "1小时前" ||
    diff < 86400 && Math.floor(diff / 3600) +
    "小时前") ||
    day_diff == 1 && "昨天" ||
    day_diff < 7 && day_diff + "天前" ||
    day_diff < 31 && Math.ceil(day_diff / 7) + "周前" || day_diff + "天前";
}

//离开房间
function leavePage() {
  forceDisConnect = true;

  wx.closeSocket();
}

//重新连接聊天室
function reConnectRoom(){

  setTimeout(function() {
    if(isSocketOpen){
      wx.closeSocket();
    }

    connectSocket(loginRoomId,loginUser,loginCallBack);
  }, 1000);

}

//消息监听
function onMessage(callback) {
  messageCallback = callback;
}

//全部message消息监听
function onSocketMsg(callback){
  socketMsgCallback = callback;
}

//全部消息监听
function onSocketData(callback){
  socketDataCallback = callback;
}

function onSocketFailMsg(callback){
  socketMessageFailCallback = callback;
}

module.exports = {
  loginRoom: loginRoom,
  leavePage: leavePage,
  getHistoryContent: getHistoryContent,
  sendMsg: sendMsg,
  onSocketMsg: onSocketMsg,
  onMessage: onMessage,
  onSocketFailMsg: onSocketFailMsg,
  prettyTime: prettyTime,
  reConnectRoom: reConnectRoom
}
