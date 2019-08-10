<template>
  <st-modal title="新增底薪模板" v-model="show" @ok="handleSubmit" size="small">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="模板名称" required>
            <a-input
              placeholder="请输模板名称"
              v-decorator="decorators.template_name"
            />
          </st-form-item>
        </a-col>
        <a-col :lg="24">
          <st-form-item label="月底薪" required>
            <st-input-number
              :float="true"
              placeholder="请输入月底薪"
              v-decorator="decorators.salary"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { AddTemplateService } from './add-template.service'
import { MessageService } from '@/services/message.service'
import { ruleOptions } from './add-template.config'
export default {
  serviceInject() {
    return {
      service: AddTemplateService,
      message: MessageService
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        this.service.addTemplate(values).subscribe(() => {
          this.$emit('change')
          this.message.success({ content: '添加成功' })
          this.show = false
        })
      })
    }
  }
}
</script>
