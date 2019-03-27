<template>
  <div id="app">
    <!--<router-link to="/about">home</router-link>-->
    <transition>
      <div>

      </div>
    </transition>
    <div class="loading-component">

    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  created() {
    this.$Loading.start();
    // this.$router.push('/')
  },
  mounted() {
    this.$Loading.finish();
  },
};
</script>

<style lang="scss">

</style>
