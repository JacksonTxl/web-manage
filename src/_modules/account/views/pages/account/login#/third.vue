<template>
  <div>
    <a @click="onClick">返回</a>
    weixin
  </div>
</template>

<script>
export default {
  name: 'WechatLogin',
  methods: {
    onClick() {
      this.$emit('back')
    }
  }
}
</script>
