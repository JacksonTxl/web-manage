<template>
  <st-modal title="新增规格" v-model="show" @ok="handleSubmit" size="small">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <st-form-item label="规格名称" required>
        <a-input
          placeholder="请输规格名称"
          maxlength="20"
          v-decorator="decorators.sku_name"
        />
      </st-form-item>
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
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
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
      this.form.validate().then(values => {
        const isSame = this.list.some(item => item === values.sku_name)
        if (isSame) {
          this.message.warn({ content: '相同的规格项不可重复添加' })
          return
        }
        this.$emit('success', values.sku_name)
        this.message.success({ content: '添加成功' })
        this.show = false
      })
    }
  }
}
</script>
