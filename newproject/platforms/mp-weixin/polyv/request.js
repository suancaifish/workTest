const md5 = require('./md5.js');

const getChannelMessage = channelId => {
  const timestamp = Date.parse(new Date());
  const str = `polyv_applet_api_innorchannelId${channelId}timestamp${timestamp}polyv_applet_api_innor`;
  const sign = md5.hexMD5(str).toUpperCase();
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.polyv.net/live/v2/channels/wx-applet-info',
      data: {
        channelId,
        timestamp,
        sign
      },
      success: (res) => {
        if (res.data.code === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      }
    })
  })
}

const getLiveStream = stream => {
  return new Promise ((resolve, reject) => {
    wx.request({
      url: 'https://api.polyv.net/live_status/query',
      data: {
        stream
      },
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    })
  })
}

module.exports = {
  getChannelMessage,
  getLiveStream
}