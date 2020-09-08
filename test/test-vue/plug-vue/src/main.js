import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import './style/base.scss';
import Vant from 'vant';
import 'vant/lib/index.css';

import toast from './components/toast/index'
Vue.use(toast);

Vue.use(Vant);

Vue.config.productionTip = false
Vue.use(VueParticles)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
