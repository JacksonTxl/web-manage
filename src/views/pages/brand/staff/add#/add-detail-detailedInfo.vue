<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="12">col-12</a-col>
      <a-col :span="12">col-12</a-col>
    </a-row>
    <a-row>
      <a-col :span="8">col-8</a-col>
      <a-col :span="8">col-8</a-col>
      <a-col :span="8">col-8</a-col>
    </a-row>
    <a-row>
      <a-col :span="6">col-6</a-col>
      <a-col :span="6">col-6</a-col>
      <a-col :span="6">col-6</a-col>
      <a-col :span="6">col-6</a-col>
    </a-row>
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
    save() {}
  }
}
</script>
