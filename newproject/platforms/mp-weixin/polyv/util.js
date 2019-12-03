import emotion from './emotion.js';

const emotionUrl = {};
for (let i of emotion) {
  emotionUrl[i.title] = i.url;
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const parseEmotion = txt => {
  const ary = [];
  if (!txt.indexOf) return;
  while (txt.indexOf('[') !== -1 && txt.indexOf(']') !== -1) {
    const start = txt.indexOf('[')
    ary.push({
      type: 'text',
      content: txt.substring(0, start)
    });
    const end = txt.indexOf(']', start + 1);
    const emTitle = txt.substring(start+1, end);
    const emObj = {
      type: 'em',
      content: emTitle,
    }
    if(emotionUrl[emTitle]) {
      emObj.url = emotionUrl[emTitle];
    } else {
      emObj.type = 'text',
      emObj.content = '[' + emTitle + ']'
    }
    ary.push(emObj);
    txt = txt.substring(end + 1);
  }
  ary.push({
    type: 'text',
    content: txt
  });
  return ary;
}

const parseTime = time => {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

const getHistoryChat = function(roomId, start, num, callback=function(){}) {
  const url = "https://apichat.polyv.net/front/history";
  const _this = this;
  wx.request({
    url: url,
    data: {
      roomId: roomId,
      start: start,
      end: start + num
    },
    success(res) {
      const ary = res.data.slice(0).reverse();
      console.log(_this.userId.openId, _this.userId);
      for (let item of ary) {
        item.user.pic = item.user.pic.slice(0,4) === 'http' ? item.user.pic : `http:${item.user.pic}`;
        if(item.user.userId === _this.userId.openId) {
          item.own = true;
        }
        item.contentAry = parseEmotion(item.content);
        item.parseTime = parseTime(item.time);
      }
      if(typeof callback === 'function') callback(ary);
    }
  });
};

module.exports = {
  formatTime: formatTime,
  parseEmotion,
  parseTime,
  getHistoryChat
}
