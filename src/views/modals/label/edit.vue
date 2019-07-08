<template>
  <st-modal title="编辑标签" v-model="show" @ok="handleSubmit">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="标签名称" required>
            <a-input
              placeholder="请输标签名称"
              v-decorator="['tag_name',{initialValue: this.item.tag_name,rules: [{ required: true, message: '请输入标签名称' }]}]"
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
export default {
  serviceInject() {
    return {
      service: EditLabelService,
      message: MessageService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false
    }
  },
  props: {
    item: Object
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交的数据', values)

          this.service.editLabel(this.item.id, values).subscribe(() => {
            console.log('ok')
            this.$emit('change')
            this.message.success({ content: '编辑成功' })
            this.show = false
          })
        }
      })
    }
  }
}
</script>
