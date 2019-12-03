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
import log from "./common/log.js";

App.mpType = 'app'



Vue.config.errorHandler = (err, vm, info) => {
    console.log(`baba: ${err}\nInfo: ${info}`);
    log.info(`baba ${vm}`)
    log.error(`ERROR: ${err.toString()} `)
    log.error(`ERROR-INFO: ${info}`)
}
Vue.config.warnHandler = (msg, vm, trace) => {
    log.warn('WARN ', msg)
    log.info('WARN trace', trace);
}

const app = new Vue({
    ...App
})
app.$mount()