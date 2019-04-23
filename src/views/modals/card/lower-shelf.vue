<template>
  <div></div>
</template>
<script>
export default {
  name: 'lowerShelf',
  props: {
    title: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
      // entityCardIdRule: ['entityCardId', { rules: [ { message: '请输入实体卡号' }] }],
      // physicalIdRule: ['physicalID', { rules: [{ message: '请录入物理ID' }] }]
    }
  },
  created() {
    console.log(this.aService)
    this.showDeleteConfirm()
  },
  methods: {
    showDeleteConfirm() {
      let self = this
      this.$confirm({
        title: '单个下架',
        content: `确定下架会员卡吗？`,
        onOk() {},
        onCancel() {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>
