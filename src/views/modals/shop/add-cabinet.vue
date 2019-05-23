<template>
  <st-modal
    title="新增储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <st-form :form="form">
      <a-row>
        <a-col :xs="22">
          <st-form-item label="区域">
            <a-input value="xxx区域" disabled/>
          </st-form-item>
          <st-form-item label="储物柜类型" required>
            <a-select placeholder="请选择储物柜类型">
              <a-select-option value="a">A</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="首字母">
            <a-input placeholder="请输入首字母"/>
          </st-form-item>
          <st-form-item label="起始编号" required>
            <a-input placeholder="请输入起始编号"/>
          </st-form-item>
          <st-form-item label="数量" required>
            <st-input-number placeholder="请输入数量"/>
          </st-form-item>
          <st-form-item label="排列方式" required>
            <a-radio-group>
              <a-radio :value="1">Option A</a-radio>
              <a-radio :value="2">Option B</a-radio>
            </a-radio-group>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
const formRules = {
  setting_name: [
    'setting_name', {
      rules: [{
        required: true,
        message: '请输入教练等级'
      }]
    }
  ]
}
export default {
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      formRules
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
