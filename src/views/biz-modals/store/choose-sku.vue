<template>
  <st-modal title="规格选择" @ok="onSubmit" v-model="show">
    <div>王</div>
  </st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onSubmit() {
      this.$emit('success', {
        type: 'pay'
      })
      this.show = false
      console.log('点击了确定')
    }
  }
}
</script>
