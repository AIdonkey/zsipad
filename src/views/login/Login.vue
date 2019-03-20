<template>
  <div style="height: 100vh;width: 100vw;" class="loginbackimg">
    <Spin fix v-show="!showflag">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>自动登录中...</div>
    </Spin>
    <div class="logincontainer">
      <div class="logincell">
        <Input
          prefix="ios-contact"
          size="large"
          class="inputcell"
          v-model="username"
          placeholder="用户名"
        />
      </div>
      <div class="logincell">
        <Input
          prefix="md-key"
          size="large"
          type="password"
          class="inputcell"
          v-model="password"
          placeholder="密码"
        />
      </div>
      <div class="logincell1">
        <Button type="primary" class="inputcell1" size="large" shape="circle">取消</Button>
        <Button
          type="primary"
          class="inputcell1"
          size="large"
          @click.native="submit"
          shape="circle"
          style="margin-left: 1vw"
        >登录</Button>
      </div>
      <!--<div class="loginkey">-->
      <!--<div class="imgbox">-->
      <!--<div class="verify"></div>-->
      <!--<div class="verified"></div>-->
      <!--</div>-->
      <!--<div class="imghandle" style="width: 200px;position: absolute;">-->
      <!--<div class="swiper"><Icon type="logo-chrome" size="50"/></div>-->
      <!--&lt;!&ndash;<div class="text">拖动滑块</div>&ndash;&gt;-->
      <!--</div>-->
      <!--<div class="refreshbox">-->
      <!--<span class="refresh"></span>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import { login, checkLogin } from '../../service/service';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      showflag: true,
    };
  },
  created() {
    const loginindex = document.cookie.indexOf('dlyzxx=');
    // if (loginindex !== -1) {
    //   const loginflag = document.cookie.slice(loginindex + 7, loginindex + 37);
    //   const a = new Date();
    //   checkLogin(JSON.stringify({ dlyzxx: loginflag })).then(data => data.json()).then((res) => {
    //     console.log(new Date() - a);
    //     this.$router.push('/home/personinfo');
    //   });
    // } else {
    //   this.showflag = true;
    // }
  },
  mounted() {
    // const imgdown = document.getElementsByClassName('ivu-icon-logo-chrome')[0];
    // const logincontainter = document.getElementsByClassName('imghandle')[0];
    // console.log(imgdown.style);
    // imgdown.addEventListener('mousedown', () => {
    //   logincontainter.addEventListener('mousemove', (event) => {
    //     imgdown.style.marginLeft = `${event.offsetX + 5}px`;
    //   });
    // });
    // logincontainter.addEventListener('mouseup', (event) => {
    //   logincontainter.removeEventListener('mousemove', () => {
    //     console.log('success');
    //   }, false);
    // });
    // // imgdown.addEventListener('mouseup', function () {
    // //   imgdown.removeEventListener('mousemove')
    // // })
  },
  methods: {
    submit() {
      login(JSON.stringify({ userName: 'admin', passWord: 'admin' }))
        .then(data => data.json())
        .then((res) => {
          this.$router.push('/home/personinfo');
          const expiretime = new Date();
          expiretime.setDate(expiretime.getDate() + 7);
          document.cookie = `dlyzxx=${
            res.responseEntity.entity.dlyzxx
          };expires=${expiretime}`;
        });
    },
    start() {
      // if (imgdown) {
      //   let imgH = this.clientHeight
      //   let verx = 150*(1 + Math.random()) - 38,
      //     very = imgH / 4 + Math.randow * imgH / 2
      //   fnDown(verx, very)
      // }
      // function fnDown (verX, verY) {
      //     let l = e.clientHeight
      // }
      // function fnMove (verX, verY) {
      //
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.logincontainer {
  display: flex;
  position: absolute;
  left: 58vw;
  top: 10vw;
  height: 45vw;
  width: 34vw;
  padding: 7vw 4vw;
  border-radius: 1vw;
  background-color: white;
  flex-direction: column;
  align-items: center;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
input {
  line-height: 1.5;
}
.logincell {
  padding: 5px;
}
.logincell1 {
  margin-top: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: inherit;
  padding-left: 36px;
  padding-right: 36px;
}
.inputcell {
  width: $inputlen;
}
.inputcell1 {
  width: 7.5rem;
}
.swiper {
  position: relative;
}
.loginbackimg{
  background-image: url("../../assets/image/ic_denglu_beijing.png");
}
</style>
