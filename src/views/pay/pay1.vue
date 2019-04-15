
<template>
  <div style="background: rgb(248,248,248);">
    <header style="background: white;border-radius: 1vw;">
      <div style="display: inline-block;">
        <Icon type="md-contact" size="100" color="#7a8eff"/>
      </div>
      <div class="avatarleft">
        <p>姓名: {{this.personinfo.xm0000}}</p>
        <p>手机: {{this.personinfo.dhhm00}}</p>
        <p>身份证: {{this.personinfo.zjbh00}}</p>
      </div>
    </header>
    <section class="paysection">
      <p style="text-align:center;">
        您将支付医院名字体检中心368.00元请在
        <span style="color: red;">{{paytime}}</span>S内完成支付...
      </p>
      <div style="margin-top:1rem;">
        <qrcode value="Hello, World!" :options="{ width: 200 }"></qrcode>
      </div>
      <p style="color:red;">请扫码支付（支持支付宝、微信），或您也可线下进行支付</p>
      <Button style="margin-top:2vw;" shape="circle" class="bigbutton">线下支付</Button>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      paytime: 90,
    };
  },

  components: {},

  computed: {
    ...mapState(['personinfo']),
  },

  mounted() {
    setInterval(() => {
      this.paytime -= 1;
      if (this.paytime === 0) {
        this.paytime = 90;
        // this.$router.push('/home/personinfo');
      }
    }, 1000);
  },
  methods: {
    charge() {},
  },
};
</script>
<style lang='scss' scoped>
.avatarleft {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100px;
  vertical-align: top;
}
.bigbutton {
  width: 21vw;
  height: 4vw;
  background-color: #3f51b5;
  border-radius: 2vw;
  color: white;
}
.paysection {
  background: white;
  margin-top: 2vw;
  padding: 24px;
  text-align: center;
}
</style>
