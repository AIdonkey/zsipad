import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import echarts from 'echarts';
import mutations from './mutation/mutations';
import actions from './action/action';

Vue.use(Vuex);
Vue.prototype.$echarts = echarts;
const state = {
  hospital: '', // 医院id
  personinfo: { // 个人信息
    zjbh00: '350583199601248933', xm0000: '黄健君', xb0000: '2', dhhm00: '18016662312', nl0000: '23', hyzk00: '1', mz0000: '1', whcd00: '', zylb00: '', csrq00: '', dz0000: '', yxrqks: '', yxrqjs: '', fzjg00: '', tz0000: 0, sg0000: 0, bmi000: 0, zp0000: '', dept00: '', career: '',
  },
  combo: [], // 套餐
  yourcombo: [], // 所选套餐
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState()],
});
