<template>
  <st-modal title="新增标签" v-model="show" @ok="handleSubmit">
    <st-form :form="form" labelWidth="67px" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col :lg="24">
          <st-form-item label="标签名称" required>
            <a-input
              placeholder="请输标签名称"
              :max="10"
              v-decorator="['tag_name',{rules: [{ required: true, message: '请输入标签名称，长度1~10中英文', pattern: pattern.CN_EN('1-10') }]}]"
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
export default {
  serviceInject() {
    return {
      service: AddLabelService,
      message: MessageService,
      pattern: PatternService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交的数据', values)
          this.service.addLabel(values).subscribe(() => {
            console.log('ok')
            this.$emit('change')
            this.message.success({ content: '添加成功' })
            this.show = false
          })
        }
      })
    }
  }
}
</script>
