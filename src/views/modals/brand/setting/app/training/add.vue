<template>
  <a-modal
    title="添加训练目的"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.addTrainingAim"
  >
    <div>
      <st-form :form="form">
        <a-row>
          <a-col :xs="22">
            <st-form-item label="训练目的" required>
              <a-input placeholder="请输入训练目的" v-decorator="formRules.setting_name" maxlength="20">
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
        message: '请输入训练目的'
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
  subscriptions() {
    return {
      loading: this.addService.loading$
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
        this.addService.addTrainingAim(data).subscribe(() => {
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
