<template>
    <div style="padding: 24px">
        <header>
            <div class="headerbutton">
                <div style="display: inline-block" >
                    <h2>体检项目选择</h2><h5>SELECTION OF PHYSICAL EXAMINATION ITEMS</h5>
                </div>
            </div>
            <div class="headerbutton1">
                <Button @click="modal6 = true" style="border-radius: 3rem" size="large" v-if="chargeflag === false">
                    新增检查项目
                </Button>
            </div>
        </header>
        <section>
          <div class="promptinfo" style="color:red;margin-bottom:1rem;">*提示：必选项目不可删除，实际金额请以提交后金额为准。</div>
            <Table :columns="columns1" :data="data1" class="tablestyle clearstyle" border="true" height="450">
            </Table>
            <div style="color: red;padding:0.5rem">预估金额：￥{{allprice}}</div>
        </section>
        <footer style="margin-top: 5rem;text-align: center">
            <Button type="primary" size="large" @click.native="confirmorder" v-if="chargeflag === false">提交订单</Button>
            <Button type="primary" size="large" @click.native="reserveorder" v-if="chargeflag === true">预约体检</Button>
        </footer>
        <Modal
                v-model="modal6"
                :closable="false"
                @on-ok="addtodata1"
                @on-cancel=""
                :mask-closable="false"
                >
            <addproject class="addstyle" :ids='ids' :modal6= 'modal6' @toaddprj="addnewprj"></addproject>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Addproject from '../../../components/common/addproject.vue';
import { mixin } from '../../../components/common/mixin';
import { getUpdateBylist, getPEItem } from '../../../service/service';

export default {
  components: { Addproject },
  name: 'combodetail',
  mixins: [mixin],
  data() {
    return {
      data1: [],
      modal6: false,
      data1change: 0,
      ids: '',
      newprj: [],
      chargeflag: false,
      tjh000: '',
    };
  },
  computed: {
    ...mapState(['yourcombo', 'personinfo']),
    allprice: {
      get() {
        let tempprice = 0;
        for (let i = 0; i < this.data1.length; i++) {
          tempprice += this.data1[i].DJ0000;
        }
        return tempprice;
      },
    },
  },
  mounted() {
    if (this.$route.query.tjh000 !== undefined) {
      this.tjh000 = this.$route.query.tjh000;
      getPEItem(`tjh000=${this.$route.query.tjh000}`).then(response => response.json()).then((res) => {
        this.data1 = res.responseEntity.entity.rows;
        for (let i = 0; i < this.data1.length; i++) {
          this.data1[i].DJ0000 = this.data1[i].ZFJE00;
          this.data1[i].BMMC00 = this.data1[i].ZYKSMC;
        }
        if (res.responseEntity.entity.dsje00 === 0) {
          this.chargeflag = true;
        }
        const temparr = [];
        for (let i = 0; i < this.data1.length; i++) {
          temparr.push(this.data1[i].SQXMID);
        }
        this.ids = temparr.join();
      });
    } else {
      this.data1 = this.yourcombo;
      const temparr = [];
      for (let i = 0; i < this.data1.length; i++) {
        temparr.push(this.data1[i].SQXMID);
      }
      this.ids = temparr.join();
    }
  },
  methods: {
    remove(index) { // 删除项目
      this.data1.splice(index, 1);
    },
    confirmorder() {
      const that = this;
      this.$Modal.confirm({
        title: '确认订单',
        onOk() {
          let choose = '';
          if (that.tjh000 !== '') {
            choose = '6';
          }
          getUpdateBylist(`ids=${that.ids}&zjbh00=${that.personinfo.zjbh00}&xm0000=${encodeURI(encodeURI(that.personinfo.xm0000))}&yyid00=222667&xb0000=${that.personinfo.xb0000}&tjh000=${that.tjh000}&choose=${choose}`).then(response => response.json()).then((res) => {
            if (res.responseEntity.errorcode === '00') {
              setTimeout(() => {
                that.$Modal.success({
                  title: '提交订单成功',
                  content: '是否立即进行支付',
                  onOk() {
                    that.$router.push('pay');
                  },
                });
              }, 500);
              console.log(res);
            }
          });
        },
      });
    },
    reserveorder() {
      this.$router.push(`/home/reservation?tjh000=${this.$route.query.tjh000}`);
    },
    addnewprj(res) {
      this.newprj = res;
    },
    addtodata1() {
      for (let i = 0; i < this.newprj.length; i += 1) {
        this.data1.push(this.newprj[i]);
      }
      this.newprj = [];
      this.data1change++; // 数据是否改变
    },
  },
  watch: {
    yourcombo() {
      this.data1 = this.yourcombo;
    },
    data1change() {
      const temparr = [];
      for (let i = 0; i < this.data1.length; i++) {
        temparr.push(this.data1[i].SQXMID);
      }
      this.ids = temparr.join();
    },
  },
};
</script>

<style scoped>
</style>
