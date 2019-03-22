<template>
  <div class="layout">
    <Layout>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" width="272">
          <div class="hosicon">
            <img
              src="../assets/image/ic_neirong_touxianglogo.png"
              alt
              style="width:7rem;height:7rem;"
            >
          </div>
          <Menu :active-name="activename" theme="light" width="auto">
            <MenuItem name="personinfo" @click.native="$router.push('/home/personinfo')">
              <img
                src="../assets/image/ic_tijianxiangmuxuanze_dangqian.png"
                class="lefticon"
              >
              <span style="font-size:1rem;">基本信息完善</span>
            </MenuItem>
            <MenuItem name="combo" @click.native="$router.push('/home/combo')">
            <img
                src="../assets/image/ic_wenjuanzicha_dangqian.png"
                class="lefticon"
              >
              <span style="font-size:1rem;">体检套餐选择</span>
            </MenuItem>
            <MenuItem name="questionnaire" @click.native="$router.push('/home/questionnaire')">
            <img
                src="../assets/image/ic_tijianxiangmuxuanze_dangqian.png"
                class="lefticon"
              >
              <span style="font-size:1rem;">问卷调查</span>
            </MenuItem>
            <!--<MenuItem name="1-4" @click.native="$router.push('/home/home1')">-->
            <!--体检项目选择-->
            <!--</MenuItem>-->
            <!-- <MenuItem name="1-5" @click.native="$router.push('/home/pay')">
              <Icon type="md-compass" />体检缴费
            </MenuItem>-->
            <MenuItem name="1-6" @click.native="$router.push('/reportdetail')">
              <img
                src="../assets/image/ic_wanshannindexinxi_dangqian.png"
                class="lefticon"
              >
              <span style="font-size:1rem;">个人报告</span>
            </MenuItem>
            <MenuItem name="orderdetail" @click.native="$router.push('/orderdetail')">
              <img
                src="../assets/image/ic_xianchengqiandaotijian_dangqian.png"
                class="lefticon"
              >
              <span style="font-size:1rem;">个人订单</span>
            </MenuItem>
            <!-- <MenuItem name="reservationchart" @click.native="$router.push('/reservationchart')">
              <Icon type="ios-navigate" />预约信息汇总
            </MenuItem>-->
            <!--<Submenu name="2">-->
            <!--<template slot="title">-->
            <!--<Icon type="ios-keypad" @click.native="$router.push('/home/home2')"></Icon>-->
            <!--体检缴费-->
            <!--</template>-->
            <!--<MenuItem name="2-1">Option 1</MenuItem>-->
            <!--<MenuItem name="2-2">Option 2</MenuItem>-->
            <!--</Submenu>-->
            <!--<Submenu name="3">-->
            <!--<template slot="title">-->
            <!--<Icon type="ios-analytics"></Icon>-->
            <!--体检报告-->
            <!--</template>-->
            <!--<MenuItem name="3-1">Option 1</MenuItem>-->
            <!--<MenuItem name="3-2">Option 2</MenuItem>-->
            <!--</Submenu>-->
          </Menu>
          <div class="backhome" @click="backhome()">
            <Icon type="md-return-left"/>
            <span style="padding-left:12px;">返回 首页</span>
          </div>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0', width: '300px'}">
            <BreadcrumbItem>
              <h1 style="opacity: 0">体检项目选择</h1>
              <h5 style="opacity: 0">SELECTION OF PHYSICAL EXAMINATION ITEMS</h5>
            </BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '0', background: '#fff', overflow: 'scroll', }">
            <keep-alive exclude="combodetail">
              <router-view></router-view>
            </keep-alive>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      headertitle: [{ chinese: '', english: '' }],
    };
  },
  components: {},
  methods: {
    ...mapMutations(['HOSPITAL']),
    backhome() {
      this.$router.push('/index');
    },
  },
  created() {
    this.HOSPITAL('222667');
    // fetch('/api/getHosByTjlx', { method: 'POST' }).then(data => data.json()).then((data) => {
    //   console.log(data);
    // });
  },
  computed: {
    ...mapState(['hospital']),
    activename() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.hosicon {
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 7rem;
  text-align: center;
}
.home {
  max-width: $screen;
  animation: wave steps(3, start) 5s forwards infinite;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout {
  height: 100vh;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
menuitem {
  color: $color1;
}
.backhome {
  text-align: left;
  padding: 24px;
  position: absolute;
  bottom: 0;
}
.icon-tj {
  font-family: "tjyyrq" !important;
  font-size: 16px !important;
}
.lefticon {
  width: 1.2rem;
  margin-right: 6px;
  vertical-align: text-bottom;
}
</style>
