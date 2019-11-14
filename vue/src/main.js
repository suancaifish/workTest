import Vue from 'vue';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import onlyNumber from '@/directive/el-input/index.js'; 

import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
  
Vue.use(VueQuillEditor);

Vue.use(onlyNumber); 

import './styles/index.scss'; //global css
import * as util from "./utils/util"; // 工具库

import App from './App.vue';
import router from './router';
import store from './store';
const config = require('@/config/');
// 实际打包时应该不引入mock
// if (process.env.NODE_ENV !== 'production') require('@/mock');

import './router/role';
import './errorLog'; // error log
import * as filters from './filters' // global filters
import  api from './api'; //api


import fullscreen from 'vue-fullscreen';
Vue.use(fullscreen);

import { uidPlugin } from '_c/symbol';
import message from '_c/message';

Vue.use(uidPlugin);
Vue.use(Element);


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

window.bus = new Vue(); //非父子传值中间件

Vue.prototype.$util = util; // 工具注入
Vue.prototype.$api = api; // 公共请求
Vue.prototype.$config = config; //全局配置
Vue.prototype.$md5 = util.getmd5; //MD5
Vue.prototype.$msg = message; //全局message

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
