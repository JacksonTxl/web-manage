<template>
  <st-modal title="编辑标签" v-model="show" @ok="handleSubmit" size="small">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="标签名称" required>
            <a-input
              placeholder="请输标签名称"
              v-decorator="decorators.tag_name"
            />
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { EditLabelService } from './edit.service'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './label.config'
export default {
  serviceInject() {
    return {
      service: EditLabelService,
      message: MessageService,
      pattern: PatternService
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
  props: {
    item: Object
  },
  mounted() {
    this.form.setFieldsValue({
      tag_name: this.item.tag_name
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        this.service.editLabel(this.item.id, values).subscribe(() => {
          this.$emit('change')
          this.message.success({ content: '编辑成功' })
          this.show = false
        })
      })
    }
  }
}
</script>
