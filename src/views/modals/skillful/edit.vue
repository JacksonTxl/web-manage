<template>
  <st-modal
    title="编辑擅长项目"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.updateSkillful"
  >
    <div>
      <st-form :form="form">
        <a-row>
          <a-col :xs="22">
            <st-form-item v-show="false">
              <input type="hidden" v-decorator="formRules.id">
            </st-form-item>
            <st-form-item label="擅长项目" required>
              <a-input placeholder="请输入擅长项目" v-decorator="formRules.setting_name" maxlength="20">
              </a-input>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { EditService } from './edit.service'
import { MessageService } from '@/services/message.service'
const formRules = {
  id: ['id'],
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
      editService: EditService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    setting_name: {
      type: String,
      default: ''
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
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        id: this.id,
        setting_name: this.setting_name
      })
    })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        console.log('data', data)
        this.editService.updateSkillful(data).subscribe(() => {
          this.messageService.success({
            content: '编辑成功'
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
