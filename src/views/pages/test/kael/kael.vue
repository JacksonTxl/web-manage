<template>
  <st-panel app>
    {{reason}}
   <st-textarea :maxlength="300" @change="onReasonChange" v-model="reason" placeholder="请输入内容"/>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      reason: ''
    }
  },
  methods: {
    onReasonChange(e) {
      console.log(3)
    }
  }
}
</script>
