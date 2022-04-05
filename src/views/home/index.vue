<template>
  <div class="home-container" v-if="user">
    <div class="home-text">欢迎 : {{ user.name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters('user',['user'])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin";
.home {
  &-container {
    margin: 30px;
    height: 400px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    @include juzhong();
    text-align: center;
  }
}
</style>
