<template>
  <div :class="b()">
    <div :class="b('head')">
      <label :class="b('head-title')">绑定登录手机号</label>
      <p :class="b('head-desc')">
        用于登录、密码找回和验证身份，保护您的账号安全
      </p>
    </div>
    <st-form :form="form" @submit.prevent="onBind" :class="b('form')">
      <st-form-item>
        <a-input
          size="large"
          placeholder="用户名、邮箱"
          v-decorator="decorators.name"
        />
      </st-form-item>
      <st-form-item>
        <a-input
          size="large"
          type="password"
          placeholder="密码"
          v-decorator="decorators.password"
        />
      </st-form-item>
      <st-form-item>
        <input-phone
          v-decorator="decorators.country_phone"
          placeholder="请输入手机号码"
        ></input-phone>
      </st-form-item>
      <!-- 无痕验证 -->
      <st-form-item class="mg-b0">
        <no-captcha id="bind-phone-code"></no-captcha>
      </st-form-item>
      <st-form-item>
        <input-phone-code
          v-decorator="decorators.captcha"
          @click="onClickCaptcha"
          placeholder="请输入验证码"
          :isCountTime="isCountTime"
          @endCount="endCount"
        ></input-phone-code>
      </st-form-item>
      <st-form-item class="mg-b32">
        <st-button
          :class="b('login-button')"
          :loading="loading.loginAccount"
          pill
          block
          size="large"
          type="primary"
          html-type="submit"
        >
          登录
        </st-button>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
import { LoginService } from '../login.service'
import { ruleOptions } from './login.config'
import NoCaptcha from './no-captcha'
import { PatternService } from '@/services/pattern.service'
import { NoCaptchaService } from '@/services/no-captcha.service'
import InputPhone from '@/views/biz-components/input-phone/input-phone'
import InputPhoneCode from '@/views/biz-components/input-phone-code/input-phone-code'
import { cloneDeep } from 'lodash-es'

export default {
  name: 'LoginUserBind',
  bem: {
    b: 'page-login-bind'
  },
  components: {
    NoCaptcha,
    InputPhone,
    InputPhoneCode
  },
  serviceInject() {
    return {
      loginService: LoginService,
      pattern: PatternService,
      noCaptchaService: NoCaptchaService
    }
  },
  rxState() {
    return {
      loading: this.loginService.loading$
    }
  },
  props: {
    value: Object
  },
  mounted() {
    this.form.setFieldsValue({
      country_phone: this.value.country_phone
    })
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      isCountTime: false,
      countryInfo: {}
    }
  },
  methods: {
    onClickCaptcha() {
      this.form.validateFields(['country_phone'], (err, values) => {
        if (!err) {
          const { country_phone } = values
          const params = {
            phone: country_phone.phone,
            country_code_id: country_phone.code_id,
            is_bind: 2
          }
          this.getCaptcha(params)
        }
      })
    },
    getCaptcha(params) {
      params.nvc_val = window.getNVCVal()
      this.loginService.getCaptcha(params).subscribe(res => {
        this.noCaptchaService.resetNVC()
        this.isCountTime = true
      }, this.errorHandler)
    },
    errorHandler(err) {
      const code = err.response.code
      if (this.noCaptchaService.testIsNeedCallCaptcha(code)) {
        this.noCaptchaService.callCaptcha(code)
        return
      }
      this.noCaptchaService.resetNVC()
    },
    endCount() {
      this.isCountTime = false
    },
    onSelectCountry(event) {
      this.countryInfo = event
    },
    onBind() {
      this.form.validate().then(values => {
        const params = cloneDeep(values)
        const country_phone = values.country_phone
        params.account = values.name
        params.phone = country_phone.phone
        params.pwd = values.password
        params.country_code_id = country_phone.code_id
        delete params.country_phone
        delete params.name
        delete params.password
        this.$emit('click', params)
      })
    }
  }
}
</script>
