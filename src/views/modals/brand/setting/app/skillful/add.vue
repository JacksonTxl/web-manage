<template>
  <a-modal
    title="添加擅长项目"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <div>
      <st-form :form="form">
        <a-row>
          <a-col :xs="22">
            <st-form-item label="擅长项目" required>
              <a-input placeholder="请输入擅长项目" v-decorator="formRules.setting_name" maxlength="20">
              </a-input>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </a-modal>
</template>
<script>
import { AddService } from './add.service'
import { MessageService } from '@/services/message.service'
const formRules = {
  setting_name: [
    'setting_name', {
      rules: [{
        required: true,
        message: '请输入擅长项目'
      }]
    }
  ]
}
export default {
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService
    }
  },
  data() {
    return {
      show: true,
      formRules
    }
  },
  created() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        this.addService.addSkillful(data).subscribe(() => {
          this.messageService.success({
            content: '添加成功'
          })
          this.$emit('change')
          this.show = false
        })
      })
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
