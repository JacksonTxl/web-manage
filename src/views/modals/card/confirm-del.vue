<template>
  <div></div>
</template>
<script>
export default {
  name: 'confirmDel',
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
      // entityCardIdRule: ['entityCardId', { rules: [ { message: '请输入实体卡号' }] }],
      // physicalIdRule: ['physicalID', { rules: [{ message: '请录入物理ID' }] }]
    }
  },
  created() {
    this.showDeleteConfirm()
  },
  methods: {
    showDeleteConfirm() {
      this.$confirm({
        title: '确认要删除?',
        content: '确认删除此xxxxxxxxxx会员卡吗',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>
