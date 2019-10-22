<template>
  <div :class="b()">
    <p :class="b('tip')">请输入您的账户名</p>
    <st-form :form="form" @submit.prevent="next" :class="b('form')">
      <st-form-item>
        <a-input
          size="large"
          placeholder="请输入您要找回密码的账户名"
          v-decorator="decorators.account"
        />
      </st-form-item>
      <st-form-item class="mg-b0">
        <no-captcha></no-captcha>
      </st-form-item>
      <st-form-item :class="b('button-wrap')">
        <st-button
          :class="b('button')"
          :loading="loading.checkAccount"
          pill
          block
          size="large"
          type="primary"
          html-type="submit"
          :disabled="!btnFlag"
        >
          下一步
        </st-button>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
import { FindService } from '../find.service'
import NoCaptcha from '../login#/no-captcha'
import { ruleOptions } from './find.config'
import { PatternService } from '@/services/pattern.service'

export default {
  name: 'FindAccount',
  bem: {
    b: 'page-find-account'
  },
  serviceInject() {
    return {
      findService: FindService,
      pattern: PatternService
    }
  },
  components: {
    NoCaptcha
  },
  rxState() {
    return {
      loading: this.findService.loading$
    }
  },
  mounted() {
    const account = localStorage.getItem('UserAccountForFind') || ''
    this.form.setFieldsValue({
      account
    })
    if (account) {
      this.next()
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      btnFlag: false
    }
  },
  methods: {
    next() {
      this.form.validate().then(values => {
        this.$emit('next', values)
      })
    }
  }
}
</script>
