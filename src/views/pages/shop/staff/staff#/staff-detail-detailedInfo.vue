<template>
    <div>
        详细信息
        <a-button @click="save">保存</a-button>
        <a-button type="primary" @click="goNext">继续，填写</a-button>
    </div>
</template>
<script>
export default {
  name: 'StaffDetailDetailedInfo',
  methods: {
    goNext() {
      let data = {
        isGoNext: true
      }
      this.$emit('goNext', data)
    },
    save() {

    }
  }
}
</script>
