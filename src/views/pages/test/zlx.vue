<template>
  <div style="padding: 30px">

    <st-button size="small" type="primary" round="round-small" ghost>你好</st-button>&nbsp;&nbsp;
    <st-button size="large" type="primary" round="round">round-default</st-button>&nbsp;&nbsp;
    <st-button type="primary" round="round-middle" ghost>round-middle</st-button>&nbsp;&nbsp;
    <st-button type="primary" round="round-large">预定 large</st-button>
    <mg></mg>
    <st-button type="primary" round="round-full">round-full</st-button>
    <mg></mg>
    <st-steps :nowStep="1" :step-list="stepList">
    </st-steps>
  </div>
</template>

<script>
import mg from './mg20.vue'
export default {
  name: 'ZlxTest',
  data() {
    return {
      stepList: [{
        title: '充值账号'
      }, {
        title: '绑定手机号'
      }, {
        title: '绑定其他手机号'
      }]
    }
  },
  components: {
    mg
  }
}
</script>

<style scoped>

</style>
