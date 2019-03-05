<template>
    <div class="combolayout deleteflex">
        <header>
            <div class="headerbutton">
                <div style="display: inline-block" >
                    <h2>体检套餐选择<span style="font-size: 16px">(关联套餐)</span></h2>
                    <h5>MEDICAL EXAMINATION PACKAGE SELECTION</h5>
                </div>
            </div>
            <div class="headerbutton1">
                <Button class="buttonstyle" size="large" shape="circle" @click.native="showtype = !showtype">所有套餐</Button>
            </div>
        </header>
        <section>
            <div class="" style="margin-left: 1rem;">
                <!-- <div style="display:inline-block;width: 33%">
                    <div class="fontstyle1">地 址</div>
                    <Select v-model="model1" style="width: 150px;" size="large" >
                        <Option v-for="item in sex" :value="item" :key="item">
                            {{ item }}
                        </Option>
                    </Select>
                </div>
                <div style="display: inline-block;width: 43%">
                    <span class="fontstyle1">院 区</span>
                    <Select v-model="model2" style="width: 200px" size="large">
                        <Option v-for="item in marriage" :value="item" :key="item">
                            {{ item }}
                        </Option>
                    </Select>
                </div> -->
                <div style="display:inline-block;width: 23%">
                    <span class="fontstyle1">性 别</span>
                    <Select v-model="model2" style="width: 100px;" size="large">
                        <Option v-for="item in sex" :value="item" :key="item">
                            {{ item }}
                        </Option>
                    </Select>
                </div>
            </div>
            <div class="comboitem" v-for="item in comboList" @click="combodetails(item.TCID00)" :key="item" v-show="item.SYNV00 === '0' && model2 === '男' || item.SYNV00 === '1' && model2 === '女'">
                <img src="../../assets/logo.png" alt="" class="itemicon">
                <div class="itemcontent">
                    <p style="font-weight: bold;">{{item.TCMC00}}</p>
                    <p>
                        适   用：{{item.SYNV00 === '0' ? '男': (item.SYNA00 === '0'? '女': '所有')}}
                    </p>
                    <p>
                        预估价：<span style="color: red">￥{{item.TCJG00}}</span>
                    </p>
                </div>
            </div>
        </section>
        <section>
            <Modal
            v-model="showtype"
            title="体检明细列表"
            footer-hide= "true"
            closable= "true"
            class="pemodal">
            <div class="petype">
                <div class="petype1" style="display:inline-block;">
                    <Icon type="ios-bulb" size="48"/>
                    <div style="width:72px;">
                       入职入学体检
                    </div>
                </div>
                <div style="display: inline-block;">
                  <div class="petype2" style="height:150px;">
                    <Icon type="md-bus" size="48"/>
                    <div>
                     公务员入职体检
                    </div>
                </div>
                <div class="petype3" style="height:150px;">
                    <Icon type="ios-medkit" size="48"/>
                    <div style="width:90px;">
                     公务员招聘体检
                    </div>
                </div>
                </div>
                <div style="display: inline-block;">
                   <div class="petype4" style="height:150px;">
                    <Icon type="ios-ribbon" size="48"/>
                    <div>
                     征兵体检
                    </div>
                </div>
                <div class="petype5" style="height:150px;">
                     <Icon type="ios-school" size="48"/>
                    <div>
                        学生体检
                    </div>
                </div>
                </div>

            </div>
        </Modal>
        </section>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { getGdtcList, getTcDetail, getGdtcItemList } from '../../service/service';

export default {
  name: 'combo',
  data() {
    return {
      comboList: [],
      showtype: true,
      sex: ['男', '女'],
      model2: '',
    };
  },
  mounted() {
    getGdtcList('yyid00=222667&xb0000=0').then(response => response.json()).then((res) => {
      console.log(res.entity);
      this.COMBO(res.rows);
    });
  },
  computed: {
    ...mapState(['combo']),
  },
  methods: {
    ...mapMutations(['COMBO', 'YOURCOMBO']),
    async combodetails(id) {
      getGdtcItemList(`TCID00=${id}`).then(response => response.json().then((res) => {
        console.log(res);
        this.YOURCOMBO(res.responseEntity.entity);
      }));
      this.$router.push('combodetail');
    },
  },
  watch: {
    combo() {
      this.comboList = this.combo;
    },
  },
};
</script>

<style scoped lang="scss">
    @media screen and (max-width: 768px) {
        .comboitem{
            width: 60%;
            height: 17vw;
        }
    }
.itemcontent{
    display: inline-grid;
    width: 55%;
    height: 11vw;
    vertical-align: bottom;
    margin-left: 1rem;
}
.itemicon {
    width: 11vw;
    height: 11vw;
    margin-top: 1rem;
    margin-left: 1rem;
}
.fontstyle1{
    width: 3rem;
    display: inline-block;
}
.ivu-layout-content{
    flex: none;
}
.petype{
    display: flex;
    justify-content: space-around;
}
.petype1{
    margin-bottom: 1rem;
    padding: 7rem 2rem 7rem 2rem;
}
@for $i from 1 through 5 {
    .petype#{$i} {border-radius: 1vw;background-color:#97d0f4;text-align: center;color: white}
}
@for $i from 2 through 5 {
    .petype#{$i} {padding: 2rem 3rem;margin: 0 0 1rem 1rem}
}
</style>
