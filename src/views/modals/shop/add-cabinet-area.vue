<template>
  <st-modal
    title="区域设置"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <st-form :form="form" labelWidth="40px">
      <st-form-item label="区域" required>
        <a-input placeholder="请输入区域名称"/>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
      })
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
