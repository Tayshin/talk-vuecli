// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import API from './components/API.js'
import code from './components/function.js'
import Vuex from 'vuex';
import store from './store/index';
//vuetify 
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import $ from 'jquery'

//hammer.js vue-touch
import VueTouch from 'vue-touch'

//文本编辑器
import markdown from 'markdown'

//vue-toast
import VueToast from 'vue2-toast'
import 'vue2-toast/lib/toast.css'

//socketjs+stompjs
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueTouch, {name: 'v-touch'})

Vue.use(VueToast, {
  defaultType: 'center'
});

Vue.prototype.$axios = axios;
Vue.prototype.$API = API;
Vue.prototype.$code = code;
Vue.prototype.$markdown = markdown;
Vue.prototype.$SockJS = SockJS;
Vue.prototype.$Stomp = Stomp;

Vue.config.productionTip = false

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
