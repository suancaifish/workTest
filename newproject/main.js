import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
Vue.config.devtools = false;

import api from './common/js/api'
Vue.prototype.$api = api;
import http from './common/js/http'
Vue.prototype.$http = http;
import path from './common/js/path'
Vue.prototype.$path = path;
import mpweixinUtil from './platforms/mp-weixin/util'
Vue.prototype.$mpweixinUtil = mpweixinUtil;

// import log from './common/log.js'
// var fundebug = require('./common/fundebug.1.3.1.min.js');
// fundebug.init({
// 	apikey: '1215155',
// 	callback: function(event) {
//         log.error('event.error',event.error)
//     }
// })
// //系统错误捕获
// const errorHandler = (error, vm, info) => {
	
// 	// log.error('error11==>', error);
// 	// log.info('info11==>', info);
// }
// Vue.config.errorHandler = errorHandler;
// Vue.prototype.$throw = (error) => errorHandler(error, this);

App.mpType = 'app'


const app = new Vue({
	...App
})
app.$mount()
