<template>
    <div style="padding: 24px">
        <header>
            <div class="headerbutton" style="left: 296px;">
                <div style="display: inline-block" >
                    <h2>缴费方式</h2>
                    <h5>PAYMENT METHODS</h5>
                </div>
            </div>
            <div style="text-align: center">
                <h3 style="color: #3f51b5">本次需缴金额</h3>
                <h3 style="color: #ff0000;">￥340</h3>
            </div>
        </header>
        <section>
            <div>
                <img src="../../assets/weixinzhifubao.svg" style="width:45%;" alt="" @click="$router.push('/home/pay1')">
                <img src="../../assets/医保卡.svg" style="width:45%;margin-left:10%;" alt="">
            </div>
            <div>
                <div style="display:inline-block;width:50%;text-align:center;">
                    线上支付
                </div>
                <div style="display:inline-block;width:50%;text-align:center;">
                    医保支付
                </div>
            </div>
        </section>
        <footer class="recommand">
            <p>温馨提示：医保缴费暂只支持本市公务员体检。</p>
            <div style="padding-left: 5rem">
                <p>若不通过以上方式缴费，可到收费窗口缴费。</p>
                <p>缴费成功后，可通过登记窗口、电话、官方APP或者官方微信进行体检预约。</p>
            </div>
            <div class="backbutton">
                <Button>返回</Button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'pay',
  data() {
  },
};
</script>

<style scoped>
.recommand{
    color: red;
    margin-top: 2rem;
}
.backbutton{
    margin-top: 5rem;
    text-align: center;
}
</style>
