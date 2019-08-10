<template>
  <st-modal title="新增标签" v-model="show" @ok="handleSubmit" size="small">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="标签名称" required>
            <a-input
              placeholder="请输标签名称"
              :max="10"
              v-decorator="decorators.tag_name"
            />
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { AddLabelService } from './add.service'
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './label.config'
export default {
  serviceInject() {
    return {
      service: AddLabelService,
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
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        this.service.addLabel(values).subscribe(() => {
          this.$emit('change')
          this.message.success({ content: '添加成功' })
          this.show = false
        })
      })
    }
  }
}
</script>
