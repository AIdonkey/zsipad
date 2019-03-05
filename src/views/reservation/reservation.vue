<template>
    <div class="combolayout">
        <header>
            <div class="headerbutton">
                <div style="display: inline-block" >
                    <h2>体检日期预约</h2><h5>APPOINTMENT FOR PHYSICAL EXAMINATION</h5>
                </div>
            </div>
        </header>
        <section style="overflow: scroll">
            <div class="comboitem" v-for="(item, index) in reserdate" :key="index">
                <i-circle :percent="item.SYYYL0/2000 *100" :size="circlesize" style="margin-left:0.5rem;">
                    <span class="demo-Circle-inner" style="font-size:24px">{{item.SYYYL0 * 100/2000}}%</span>
                </i-circle>
                <div class="redetail">
                    <p class="redate">{{ $moment(item.KDRQ00).format('YYYY-MM-DD dddd') }}</p>
                    <div>
                        <span>余量: <span style="color:red;">{{item.SYYYL0}}</span></span>
                        <Button style="margin-left: 3vw" size="large" shape="circle" @click.native="reservation(item.KDRQ00)">预约</Button>
                    </div>
                </div>
            </div>
            <div style="text-align:center;width:100%;margin-top:1rem;">
              <Button size="large" type="danger" @click.native="cancelreservation">取消预约</Button>
            </div>
        </section>
    </div>
</template>

<script>
import ICircle from 'iview/src/components/circle/circle.vue';
import { mapState } from 'vuex';
import { getYysj, yyTj } from '../../service/service';

export default {
  components: { ICircle },
  name: 'reservation',
  data() {
    return {
      resernum: '',
      circlesize: window.innerWidth / 10,
      showchart: false,
      reserdate: [],
    };
  },
  beforeCreate() {
  },
  computed: {
    ...mapState(['personinfo', 'hospital']),
  },
  created() {
    this.$Spin.show({
      render: h => h('div', [
        h('Icon', {
          class: 'demo-spin-icon-load',
          props: {
            type: 'ios-loading',
            size: 18,
          },
        }),
        h('div', 'Loading'),
      ]),
    });
    getYysj(`tjh000=${this.$route.query.tjh000}&yyid00=${this.hospital}`).then(response => response.json()).then((resp) => { this.reserdate = resp.responseEntity.entity; });
    this.$Spin.hide();
  },
  updated() {
    this.drawchart();
  },
  methods: {
    reservation(data) {
      const that = this;
      this.$Modal.confirm({
        title: '确认预约',
        content: `预约时间为：${this.$moment(data).format('YYYY年MM月DD日 dddd')}`,
        zIndex: '999',
        onOk() {
          yyTj(`tjh000=${that.$route.query.tjh000}&zjbh00=${that.personinfo.zjbh00}&xm0000=${encodeURI(encodeURI(that.personinfo.xm0000))}&dhhm00=${that.personinfo.dhhm00}&yyflag=0&ReqDate=${data}&Money=0&yyid00=${this.hospital}`).then(response => response.json()).then((res) => {
            setTimeout(() => {
              if (res.responseEntity.errorcode === '98') {
                this.$Modal.error({ title: '预约失败', content: res.responseEntity.message });
              } else {
                this.$Modal.success({ title: '成功', content: res.responseEntity.message });
              }
            }, 300);
          });

        //   this.$Message.warning({ content: '预约失败' });
        },
      });
    },
    cancelreservation() {
      const that = this;
      this.$Modal.confirm({
        title: '确认取消预约',
        content: '取消预约',
        zIndex: '999',
        onOk() {
          yyTj(`tjh000=${that.$route.query.tjh000}&zjbh00=${that.personinfo.zjbh00}&xm0000=${encodeURI(encodeURI(that.personinfo.xm0000))}&dhhm00=${that.personinfo.dhhm00}&yyflag=2&ReqDate=20170101&Money=0&yyid00=${this.hospital}`).then(response => response.json()).then((res) => {
            setTimeout(() => {
              if (res.responseEntity.errorcode === '98') {
                this.$Modal.error({ title: '预约失败', content: res.responseEntity.message });
              } else {
                this.$Modal.success({ title: '成功', content: res.responseEntity.message });
              }
            }, 300);
          });

        //   this.$Message.warning({ content: '预约失败' });
        },
      });
    },
  },
};
</script>

<style scoped>
.redetail{
    display: inline-block;
    width: 17vw;
    height: 12vw;
    vertical-align: bottom;
    margin-left: 2rem;
}
@media screen and (max-width: 768px) {
        .comboitem{
                width: 80%;
                height: 15vw;
        }
    }
@media screen and (max-width: 768px) {
        .redetail{
            width: 22vw;
            height: 14vw;
        }
    }
.redate{
    height: 8vw;
    line-height: 8vw;
    font-size: 1.2rem;
    font-weight: bold;
}
</style>
