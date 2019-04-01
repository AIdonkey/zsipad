<template>
  <div style="height: 100vh;width: 100vw;" class="loginbackimg">
    <div class="depcontainer">
      <div class="deptitle">
        预约医院标题体检预约系统
      </div>
      <div class="dep">
        <img src="../assets/image/ic_taocanchaxun.png" alt class="depimg" @click="choosetype('1')">
      </div>
      <div class="dep">
        <img src="../assets/image/ic_tijianshenqing.png" alt class="depimg" @click="choosetype('2')">
      </div>
      <div class="dep">
        <img src="../assets/image/ic_tijianjiaofei.png" alt class="depimg" @click="choosetype('3')">
      </div>
    </div>
    <footer>
      <div class="bottomcontainer">
        <div style="display:inline-block;">
          <img
            src="../assets/image/ic_neirong_touxianglogo.png"
            alt
            style="width: 8rem;height: 8rem;"
          >
        </div>
        <div
          style="font-size: 2rem;
    display: inline-block;
    color: white;
    height: 10rem;
    vertical-align: middle;"
        >预约医院标题体检预约系统</div>
        <div style="display:inline-block;"></div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getyhxx1 } from '../service/service';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      showflag: true,
      idname: '',
      idnum: '',
    };
  },
  computed: {
    ...mapState(['personinfo']),
  },
  methods: {
    ...mapMutations(['PERSONINFO']),
    choosetype(chooseflag) { // 选择类型
      const that = this;
      this.$Modal.confirm({
        render: h => h('div', {
        }, [
          h('Input', {
            props: {
              value: this.idname,
              autofocus: true,
              placeholder: '姓名',
            },
            on: {
              input: (val) => {
                this.idname = val;
              },
            },
          }),
          h('Input', {
            props: {
              value: this.idnum,
              autofocus: true,
              placeholder: '身份证号码',
              // class: {
              // },
            },
            style: {
              marginTop: '10px',
            },
            on: {
              input: (val) => {
                this.idnum = val;
              },
            },
          }),
        ]),
        onOk() {
          getyhxx1(`zjbh00=${that.idnum}`).then(res => res.json()).then((response) => {
            // personalFile: "[{"DH0000":"3333333","XB0000":"2","XM0000":"黄健君"}]"
            // userInfo: "[{"NL0000":"23","MZ0000":"1","SG0000":170,"TZ0000":70,"ZYLB00":"0","WHCD00":"0","DHHM00":"18016662312","HYZK00":"1"}]"
            if (response.responseEntity.entity.personalFile === undefined) {
              that.$router.push('Home/personinfo');
            } else {
              const userinfo1 = JSON.parse(response.responseEntity.entity.personalFile)[0];
              const userinfo2 = JSON.parse(response.responseEntity.entity.userInfo)[0];
              const userinfo = {
                zjbh00: that.idnum,
                xm0000: userinfo1.XM0000,
                xb0000: userinfo1.XB0000 === '1' ? '男' : '女' || '',
                dhhm00: userinfo2.DHHM00 || '',
                nl0000: userinfo2.NL0000 || '',
                hyzk00: userinfo2.HYZK00 === '0' ? '未婚' : '已婚' || '',
                mz0000: userinfo2.MZ0000 || '',
                whcd00: '',
                zylb00: '',
                csrq00: '',
                dz0000: '',
                yxrqks: '',
                yxrqjs: '',
                fzjg00: '',
                tz0000: userinfo2.TZ0000 || '',
                sg0000: userinfo2.SG0000 || '',
                bmi000: '',
                zp0000: '',
                dept00: '',
                career: '',
              };
              that.PERSONINFO(userinfo);
              if (chooseflag === '1') {
                that.$router.push('Home/personinfo');
              } else if (chooseflag === '2') {
                that.$router.push('Home/questionnaire');
              } else if (chooseflag === '3') {
                that.$router.push('orderdetail');
              }
            }
          });
        },
      });
    },
    questionnaire() {

    },
    order() {

    },
  },
};
</script>

<style lang="scss" scoped>
.depcontainer {
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
}
.deptitle {
  position: absolute;
  top: 8rem;
  width: 36rem;
  height: 3rem;
  font-family: PingFang-SC-Bold;
  font-size: 3rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 2rem;
  letter-spacing: 0rem;
  color: #ffffff;
}
.dep {
  display: inline-block;
}
.depimg {
  width: 16rem;
}
.loginbackimg {
  background-image: url("../assets/image/ic_denglu_beijing.png");
}
.bottomcontainer {
  width: 100%;
  height: 8rem;
  background-color: #3f51b5;
  opacity: 0.3;
  position: absolute;
  bottom: 0;
}
</style>
