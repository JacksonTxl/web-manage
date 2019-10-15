<template>
  <div :class="b()">
    <p :class="b('tip')">请输入你需要找回登录密码的账户名</p>
    <st-form :form="form" @submit.prevent="next" :class="b('form')">
      <st-form-item>
        <a-input
          size="large"
          placeholder="请输入您要找回密码的账户名"
          v-decorator="decorators.name"
        />
      </st-form-item>
      <st-form-item class="mg-b0">
        <no-captcha></no-captcha>
      </st-form-item>
      <st-form-item class="mg-b32">
        <st-button
          :class="b('button')"
          :loading="loading.loginAccount"
          pill
          block
          size="large"
          type="primary"
          html-type="submit"
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
import AccountAgreement from '@/views/biz-modals/account/agreement'
import { ruleOptions } from './account.config'
import { PatternService } from '@/services/pattern.service'

export default {
  bem: {
    b: 'page-find-account'
  },
  name: 'FindAccount',
  components: {
    NoCaptcha
  },
  serviceInject() {
    return {
      findService: FindService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.findService.loading$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators
    }
  },
  modals: {},
  computed: {},
  methods: {
    next() {
      this.form.validate().then(values => {
        this.$emit('login', values)
      })
    },
    clickAgreement() {
      this.$modalRouter.push({
        name: 'account-agreement',
        props: {},
        on: {}
      })
    },
    onClickFindPassword() {
      this.$emit('findps')
    },
    onClickThirdChange(key) {
      this.$emit('third', key)
    }
  }
}
</script>
