<template>
  <st-modal title="新增规格" v-model="show" @ok="handleSubmit" size="small">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="规格名称" required>
            <a-input
              placeholder="请输规格名称"
              v-decorator="decorators.sku_name"
            />
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './add-sku.config'
export default {
  serviceInject() {
    return {
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
        this.$emit('success', values.sku_name)
        this.message.success({ content: '添加成功' })
        this.show = false
      })
    }
  }
}
</script>
