<template>
  <st-modal
    :bModal="bModal()"
    title="短信模版"
    v-model="show"
    @ok="save"
    @cancel="cancel"
  >
    <st-form :form="form">
      <st-form-item labelWidth="70px" label="模版名称">
        <a-input v-decorator="decorators.title" placeholder="请输入模版名称" />
      </st-form-item>
      <st-form-item labelWidth="70px" label="短信内容">
        <a-textarea
          v-decorator="decorators.content"
          maxlength="280"
          :autosize="{ minRows: 4, maxRows: 6 }"
          placeholder="请输入模版内容"
        />
      </st-form-item>
      <st-form-item labelWidth="70px" label="短信签名">
        三体云动
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { ruleOptions } from './template.config'
import { TemplateService } from './template.service'
import { MessageService } from '@/services/message.service'

export default {
  name: 'SettingSmsTemplate',
  bem: {
    bModal: 'setting-sms-template'
  },
  serviceInject() {
    return {
      templateService: TemplateService,
      messageService: MessageService
    }
  },
  props: {
    info: {
      type: Object
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
  mounted() {
    console.log(this.info)
    if (this.info.tmpl_id) {
      this.form.setFieldsValue({
        title: this.info.title,
        content: this.info.content
      })
    }
  },
  methods: {
    save() {
      this.form.validate((error, values) => {
        return this.templateService
          .addTemplate({ ...values })
          .subscribe(res => {
            this.messageService.success({
              content: '添加成功'
            })
            this.$emit('success')
            this.show = false
          })
      })
    },
    cancel() {}
  }
}
</script>
