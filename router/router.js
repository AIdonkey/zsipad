import Vue from 'vue';
import Router from 'vue-router';
import Home from '../src/views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      // component: Home,
      component: () => import(/* webpackChunkName: "about" */ '../src/views/login/Login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home,
      children: [
        {
          path: 'personinfo',
          component: () => import('../src/views/personinfo/personinfo.vue'),
        },
        {
          path: 'questionnaire',
          component: () => import('../src/views/questionnaire/questionnaire.vue'),
        },
        {
          path: 'combo',
          component: () => import('../src/views/combo/combo.vue'),
        },
        {
          path: 'reservation',
          component: () => import('../src/views/reservation/reservation.vue'),
        },
        {
          path: 'combodetail',
          component: () => import('../src/views/combo/combodetail/combodetail.vue'),
        },
        {
          path: 'combodetail1',
          component: () => import('../src/views/combo/combodetail/combodetail1.vue'),
        },
        {
          path: 'pay',
          component: () => import('../src/views/pay/pay.vue'),
        },
        {
          path: 'pay1',
          component: () => import('../src/views/pay/pay1.vue'),
        },
      ],
      // component: () => import(/* webpackChunkName: "about" */ '../src/views/login/Login.vue'),
    },
    {
      path: '/orderdetail',
      component: () => import('../src/views/order/orderdetail/orderdetail.vue'),
    },
    {
      path: '/test',
      component: () => import('../src/views/zxtc/test.vue'),
    },
  ],
});
