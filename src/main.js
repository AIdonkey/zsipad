import Vue from 'vue';
import echarts from 'echarts';
import * as Three from 'three/build/three';
import FastClick from 'fastclick';
import Tesseract from 'tesseract.js';
import App from './App.vue';
import './styles/home.scss';
import router from '../router/router';
import store from '../store/store';
import './service/swipe.js';
import './plugins/iview.js';
import './registerServiceWorker';
import 'whatwg-fetch';

// FastClick.attach(document.body);

const moment = require('moment');
require('moment/locale/zh-cn');

window.THREE = Three;
// window.onclick = function (event) {
//   alert(event);
// };
window.Tesseract = Tesseract;
Vue.prototype.$echarts = echarts;
Vue.use(require('vue-moment'), {
  moment,
});

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
