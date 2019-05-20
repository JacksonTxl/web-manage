<template>
  <a-modal title="新增标签" v-model="show" @ok="handleSubmit">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="标签名称" required>
            <a-input
              placeholder="请输标签名称"
              v-decorator="['tag_name',{rules: [{ required: true, message: '请输入标签名称' }]}]"
            />
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      show: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交的数据', values)
        }
      })
    }
  }
}
</script>
