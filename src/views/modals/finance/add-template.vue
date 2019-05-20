<template>
  <a-modal title="新增底薪模板" v-model="show" @ok="handleSubmit">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="模板名称" required>
            <a-input
              placeholder="请输模板名称"
              v-decorator="['template_name',{rules: [{ required: true, message: '请输入模板名称' }]}]"
            />
          </st-form-item>
        </a-col>
        <a-col :lg="24">
          <st-form-item label="月底薪" required>
            <st-input-number
              :float="true"
              placeholder="请输入月底薪"
              v-decorator="['salary',{rules: [{ required: true, message: '请输入月底薪' }]}]"
            >
              <template slot="addonAfter">元</template>
            </st-input-number>
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
