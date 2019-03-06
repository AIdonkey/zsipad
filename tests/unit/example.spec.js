import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
// import HelloWorld from '@/components/HelloWorld.vue';
import Home from '@/views/Home.vue';
// import Vue from 'vue';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });
describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const localVue = createLocalVue();
    localVue.use(Router);
    localVue.use(Vuex);
    const router = new Router();
    const store = new Vuex.Store({
      modules: {
        // state,
        // mutations,
        // getters,
      },
    });
    const msg = 'helloworld';
    const wrapper = shallowMount(Home, {
      propsData: { msg },
      localVue,
      router,
      store,
    });
    expect(wrapper.text()).contain('基本信息完善\n');
  });
});
