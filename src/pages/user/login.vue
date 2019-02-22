<template>
  <div>
    <a-form :form='form'
      @submit.prevent='onSubmit'>
      <a-form-item label='账号'
        :label-col="{span:5}"
        :wrapper-col="{ span: 12 }">
        <a-input v-decorator="[
          'mobile',
          {rules: [{ required: true, message: '请输入手机号!' }]}
        ]">
        </a-input>
      </a-form-item>
      <a-form-item label='密码'
        :label-col="{span:5}"
        :wrapper-col="{ span: 12 }">
        <a-input type='password'
          v-decorator="[
          'password',
          {rules: [{ required: true, message: '请输入密码' }]}
        ]">
        </a-input>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary"
          html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { userService } from '@/services/user.service'

export default {
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          userService
            .signIn({
              mobile: values.mobile,
              password: values.password
            })
            .subscribe()
        }
      })
    }
  }
}
</script>
