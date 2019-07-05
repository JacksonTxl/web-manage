<template>
  <section class="sg-section">
    <h3>生成正则表达式</h3>
    4-16位中文、英文、数字正则（不含标点符号）：{{CN_EN_NUM_REGEXP}}
    <st-form :form="form" labelWidth="100px" labelGutter="16px" class="mg-t16">
      <st-form-item label="whatever" required>
        <a-input placeholder="4-10个字，中英文及数字" v-decorator="formRules.whatever"/>
      </st-form-item>
      <st-form-item label="MOBILE" required>
        <a-input placeholder="手机号" v-decorator="formRules.mobile"/>
      </st-form-item>
      <st-form-item label="ID" required>
        <a-input placeholder="身份证" v-decorator="formRules.id"/>
      </st-form-item>
      <st-form-item label="EMAIL" required>
        <a-input placeholder="邮箱" v-decorator="formRules.email"/>
      </st-form-item>
      <st-form-item label="IMG" required>
        <a-input placeholder="图片类型，例如image/jpg" v-decorator="formRules.img"/>
      </st-form-item>
    </st-form>
    <div class="ta-c">
      <st-button type="primary" @click="onSubmit">保存</st-button>
    </div>
  </section>
</template>
<script>
import { PatternService } from '@/services/pattern.service'
import { MessageService } from '@/services/message.service'

export default {
  serviceInject() {
    return {
      pattern: PatternService,
      message: MessageService
    }
  },
  data() {
    return {
      CN_EN_NUM_REGEXP: this.pattern.CN_EN_NUM('4-16'),
      form: this.$form.createForm(this),
      formRules: {
        whatever: [
          'whatever', {
            rules: [{
              required: true,
              pattern: this.pattern.CN_EN_NUM('4-10'),
              message: '4-10个字，中英文及数字'
            }]
          }
        ],
        mobile: [
          'mobile', {
            rules: [{
              required: true,
              pattern: this.pattern.MOBILE,
              message: '手机号格式不正确'
            }]
          }
        ],
        id: [
          'id', {
            rules: [{
              required: true,
              pattern: this.pattern.ID,
              message: '身份证格式不正确'
            }]
          }
        ],
        email: [
          'email', {
            rules: [{
              required: true,
              pattern: this.pattern.EMAIL,
              message: '邮箱格式不正确'
            }]
          }
        ],
        img: [
          'img', {
            rules: [{
              required: true,
              pattern: this.pattern.IMG,
              message: '图片类型不正确'
            }]
          }
        ]
      }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        this.message.success({
          content: 'success'
        })
      })
    }
  }
}
</script>
