<template>
  <st-modal :bModal="bModal()" title="短信模版" v-model="show" width="486px">
    <st-form :form="form">
      <st-form-item labelWidth="70px" label="模版名称">
        <a-input v-decorator="decorators.title" placeholder="请输入模版名称" />
      </st-form-item>
      <st-form-item labelWidth="70px" label="短信内容">
        <st-textarea
          v-decorator="decorators.content"
          :maxlength="280 - sign.length"
          :suffix="sign"
          :autosize="{ minRows: 4, maxRows: 6 }"
          placeholder="请输入模版内容"
        />
      </st-form-item>
    </st-form>
    <footer slot="footer">
      <st-button @click="show = false">取消</st-button>
      <st-button @click="save" type="primary">确认</st-button>
    </footer>
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
  rxState() {
    return {
      sign: this.templateService.sign$
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
  created() {
    this.getSmsSign()
  },
  mounted() {
    if (this.info) {
      this.form.setFieldsValue({
        title: this.info.title,
        content: this.info.content
      })
    }
  },
  methods: {
    getSmsSign() {
      return this.templateService.getSmsSign().subscribe()
    },
    save() {
      this.form.validate().then(values => {
        if (this.info) {
          values.tmpl_id = this.info.tmpl_id
          this.templateService.editTemplate({ ...values }).subscribe(res => {
            this.messageService.success({
              content: '编辑成功'
            })
            this.$emit('success')
            this.show = false
          })
        } else {
          this.templateService.addTemplate({ ...values }).subscribe(res => {
            this.messageService.success({
              content: '添加成功'
            })
            this.$emit('success')
            this.show = false
          })
        }
      })
    },
    cancel() {}
  }
}
</script>
