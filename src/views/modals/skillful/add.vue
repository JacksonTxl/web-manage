<template>
  <st-modal
    title="添加擅长项目"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.addSkillful"
    size="small"
  >
    <div>
      <st-form :form="form">
        <a-row>
          <a-col :xs="22">
            <st-form-item label="擅长项目" required>
              <a-input
                placeholder="请输入擅长项目"
                v-decorator="rules.settingName"
                maxlength="20"
              ></a-input>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { AddService } from './add.service'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
import { rules } from './skillful.config'

export default {
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$
    }
  },
  data() {
    return {
      show: true
    }
  },
  created() {
    this.form = this.$form.createForm(this)
  },
  computed: {
    rules
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
