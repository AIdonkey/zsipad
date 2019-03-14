<template>
  <div class="ordercontent">
    <header style="background: white;">
      <div class="backhome" @click="backhome">
        <Icon type="md-home" size="26" color="white"/>
      </div>
      <div class="orderright">
        <span style="color:;">报告汇总</span>
        <div style="display: inline-block;">
          <span>日期筛选&nbsp;</span>
          <DatePicker type="date" style="width: 8rem;" placeholder="Select date" v-model="date1"></DatePicker>
          <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <DatePicker type="date" style="width: 8rem;" placeholder="Select date" v-model="date2"></DatePicker>
        </div>
        <div style="display: inline-block;">
          <Input type="text" search v-model="searchname"/>
        </div>
      </div>
    </header>
    <section class="ordersection">
      <div
        class="orderitem"
        v-for="(item, index) in yourorder"
        :key="index"
        @click="getorder(item)"
        v-show="Date.parse(date1) <= Date.parse(item.DJRQSJ) && Date.parse(date2) >= Date.parse(item.DJRQSJ) && item.XM0000.indexOf(searchname) !== -1"
      >
        <div class="itemtop">
          <div class="topbage">
            <div v-if="item.TTID00 === '0'">个人
              <br>订单
            </div>
            <div v-if="item.TTID00 === '1'">团体
              <br>订单
            </div>
          </div>
          <div class="triangle"></div>
          <span style="padding-left: 2rem">{{item.TJLXMC}}</span>
          <span style="padding-left: 3rem">{{item.DJRQSJ.slice(0,10)}}</span>
        </div>
        <div class="itemmiddle">
          <div style="display: inline-block;margin-left:1rem;">
            <img src="../../assets/logo.png" alt style="width: 5rem;height: 5rem">
          </div>
          <div class="orderitemleft">
            <p>姓名: {{item.XM0000}}</p>
            <p>体检号: {{item.TJH000}}</p>
          </div>
          <div class style="text-align: center;height:10px;">
            <div style="display:inline-block;height:0.5px;background: #e5e5e5;width:22vw;"></div>
          </div>
        </div>
        <div class="itembottom">
          <span style="padding-left: 1rem;color:red;">
            <span style="color:green;" v-show="item.SFSF00 === '1'">已缴费</span>
            <span style="color:red;" v-show="item.SFSF00 === '0'">未缴费：￥{{item.TJZFJE}}</span>
          </span>
          <span style="padding-right: 1rem">
            <span style="color:green;" v-show="item.TJYYRQ !== undefined">{{item.TJYYRQ}}</span>
            <span style="color:red;" v-show="item.TJYYRQ === undefined">未预约</span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mixin2 } from '../../components/common/mixin';
import { gettjzxx } from '../../service/service';

export default {
  name: 'orderdetail',
  mixins: [mixin2],
  data() {
    return {
      yourorder: [], // 该用户订单
      date1: new Date(new Date().setHours(0, 0, 0, 0)),
      date2: new Date(),
      searchname: '',
    };
  },
  computed: {
    ...mapState(['personinfo', 'hospital']),
  },
  created() {
    gettjzxx(
      `yyid00=${this.hospital}&zjbh00=${
        this.personinfo.zjbh00
      }&xm0000=${encodeURI(encodeURI(this.personinfo.xm0000))}&choose=20`,
    )
      .then(response => response.json())
      .then((res) => {
        this.yourorder = res.responseEntity.entity;
      });
  },
  methods: {
    getorder(item) {
      this.$router.push(
        `/home/combodetail?tjh000=${item.TJH000}&tjyyrq=${item.TJYYRQ}`,
      );
    },
  },
};
</script>

<style scoped lang="scss">
.ordercontent {
  background: $color;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}
.ordersection {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
}
.ordersection::after {
  content: "";
  width: 19rem;
}
.topbage {
  width: 3rem;
  height: 3rem;
  background-color: $color4;
  box-shadow: 0px 2px 5px 0px rgba(63, 81, 181, 0.35);
  border-radius: 0vw 0vw 1vw 1vw;
  margin-left: 1rem;
  margin-top: -0.5rem;
  text-align: center;
  color: white;
  position: relative;
  display: inline-block;
}
.backhome {
  width: 4rem;
  height: 4rem;
  display: inline-block;
  float: left;
  background: rgb(63, 81, 181);
  padding: 1rem;
  text-align: center;
}
.orderright {
  display: inline-flex;
  padding: 1rem;
  align-items: center;
  flex-direction: row;
  width: calc(100vw - 5rem);
  justify-content: space-between;
}
.orderitem {
  width: 19rem;
  height: 12rem;
  margin-top: 1rem;
  background: white;
  border-radius: 1vw;
  position: relative;
  display: inline-grid;
}
.orderitemleft {
  display: inline-flex;
  height: 5rem;
  margin-left: 1vw;
  justify-content: space-evenly;
  flex-direction: column;
  vertical-align: top;
}
.itemtop {
}
.triangle {
  border-left: 0.25rem solid $color4;
  border-top: 0.25rem solid transparent;
  border-bottom: 0.25rem solid $color4;
  border-right: 0.25rem solid transparent;
  display: inline-block;
  position: absolute;
  top: -0.5rem;
  left: 4rem;
}
.itembottom {
  display: flex;
  justify-content: space-between;
}
</style>
