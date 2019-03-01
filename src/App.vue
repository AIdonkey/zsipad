<template>
  <div id="app">
    <!--<router-link to="/about">home</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  created() {
    // this.$router.push('/')
  },
};
</script>

<style lang="scss">

</style>  
