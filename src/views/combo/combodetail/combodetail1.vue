<template>
    <div class="bgstyle">
        <header>
            <div class="headerbutton" style="left: 296px">
                <div style="display: inline-block;">
                    <h2>已选项目<span style="float: right">管理</span></h2>
                </div>
            </div>
        </header>
        <section>
            <div v-for="i in 5" :key="i">
                <div class="comboitem1 blockitem">
                    <div style="height: 7vw;width: 7vw;display: inline-block;padding: 1vw;">
                        <img src="../../../assets/logo.png" alt="" class="itemicon1">
                    </div>
                    <div class="itemcontent1">
                        <p style="font-weight: bold;">A3套餐（男）: 基础检查
                            +肿瘤筛查</p>
                        <p>
                            适 用：男性
                            <Icon type="ios-checkmark-circle-outline" size="24" v-show="showicon"
                                  @click.native="showicon = !showicon" class="righticon"/>
                            <Icon type="ios-checkmark-circle" size="24" v-show="!showicon"
                                  @click.native="showicon = !showicon" class="righticon"/>
                        </p>
                        <div class="triangle">

                        </div>
                    </div>
                    <div class="projectdetail">
                        <div class="" style="padding:24px">
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-left: 8vw">
                <Icon type="md-add-circle" size="50" color="rgb(126,138,255)" @click.native="modal6=true" />
            </div>
        </section>
        <section>
            <Modal
                    v-model="modal6"
                    :closable="false"
            >
                <Button v-for="i in 20" :key="i" style="margin: 1rem 0 0 1rem;width: 14vw" @click.native="choosedep" v-show="!addcontent">
                    放射检查区
                </Button>
                <addproject class="addstyle" v-show="addcontent"></addproject>
            </Modal>
        </section>
        <footer>
            <div class='bottombutton'>
                <Button size="large" type="danger" class="buttonstyle" @click.native="confirmorder">确认订单</Button>
                <div class="pricestyle">当前估价: <span style="color: red;">￥4599</span></div>
            </div>
        </footer>
    </div>
</template>

<script>
import Addproject from '../../../components/common/addproject.vue';

export default {
  name: 'combodetail1',
  data() {
    return {
      showicon: true,
      modal6: true,
      addcontent: false,
    };
  },
  components: {
    Addproject,
  },
  methods: {
    choosedep() {
      this.addcontent = true;
    },
    confirmorder() {
      this.$Modal.confirm({ title: '确认订单' });
    },
  },
};
</script>

<style scoped>
    .blockitem {
        display: block;
        box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem rgba(63, 81, 181, 0.3);
    }

    .itemicon1 {
        width: 5vw;
    }

    .itemcontent1 {
        width: 13vw;
        display: inline-block;
        position: relative;
    }

    .bottombutton {
        position: absolute;
        bottom: 0;
        width: calc(100% - 296px);
        height: 5vw;
        background-color: white;
    }

    .buttonstyle {
        height: 100%;
        color: white;
        background-color: red;
        font-size: 20px;
        float: right;
    }

    .pricestyle {
        padding: 1.5vw;
        height: 100%;
        display: inline-block;
        float: right;
    }

    .triangle {
        position: absolute;
        right: -4vw;
        top: 3vw;
        border-top: 10px transparent solid;
        border-right: 20px white solid;
        border-left: 10px transparent solid;
        border-bottom: 10px transparent solid;
    }

    .projectdetail {
        position: absolute;
        right: 1vw;
        top: 2vw;
        left: 53vw;
        background-color: white;
        width: 45vw;
        height: 66vw;
        z-index: 100;
        border-radius: 1vw;
        box-shadow: 0px 2px 10px 0px rgba(63, 81, 181, 0.1);
    }
    .righticon{
        position: absolute;
        right: 0;
    }
</style>
