import Vue from 'vue'
import Vuex from 'vuex'

import common from './module/common';
import user from './module/user';
import app from './module/app';
import routerList from './module/routerList';
import tagsView from './module/tagsView';
import errorLog from './module/errorLog';
import commodity from './module/commodity';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    app,
    routerList,
    tagsView,
    errorLog,
    commodity
  }
})
