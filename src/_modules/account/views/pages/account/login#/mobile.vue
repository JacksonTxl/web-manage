<template>
  <div :class="mobile()">
    <st-form :form="form" @submit.prevent="login" :class="mobile('form')">
      <st-form-item :class="mobile('phone')">
        <input-phone
          v-decorator="decorators.country_phone"
          placeholder="请输入手机号码"
          @change="onChangePhone"
        ></input-phone>
        <p v-if="!isBind" :class="mobile('phone-tip')">
          当前手机号未绑定账户，
          <a @click="goBind">去绑定</a>
        </p>
      </st-form-item>
      <st-form-item class="mg-b0">
        <no-captcha id="phone-login"></no-captcha>
      </st-form-item>
      <st-form-item :class="mobile('captcha')" class="mg-b12">
        <input-phone-code
          v-decorator="decorators.captcha"
          @click="onClickCaptcha"
          placeholder="请输入验证码"
          :isCountTime="isCountTime"
          @endCount="endCount"
        ></input-phone-code>
      </st-form-item>
      <st-form-item :class="mobile('pass')" class="mg-b16">
        <div :class="mobile('pass-content')">
          <a-checkbox v-decorator="decorators.isAgree">
            我已阅读并同意
            <a @click="clickAgreement">《用户服务协议》</a>
          </a-checkbox>
        </div>
      </st-form-item>
      <st-form-item class="mg-b0">
        <st-button
          :class="mobile('login-button')"
          pill
          size="large"
          type="primary"
          html-type="submit"
          block
        >
          登录
        </st-button>
      </st-form-item>
    </st-form>
    <!-- <div :class="mobile('third')" class="mg-l24">
      <div class="st-icon-wapper" v-for="item in thirdLogins" :key="item.type"><st-icon :class="item" :type="item" size="24px" /></div>
    </div> -->
  </div>
</template>

<script>
import { LoginService } from '../login.service'
import { PatternService } from '@/services/pattern.service'
import { NoCaptchaService } from '@/services/no-captcha.service'
import NoCaptcha from './no-captcha'
import AccountAgreement from '@/views/biz-modals/account/agreement'
import { ruleOptions } from './login.config'
import InputPhone from '@/views/biz-components/input-phone/input-phone'
import InputPhoneCode from '@/views/biz-components/input-phone-code/input-phone-code'

export default {
  name: 'LoginMobile',
  serviceInject() {
    return {
      loginService: LoginService,
      pattern: PatternService,
      noCaptchaService: NoCaptchaService
    }
  },
  bem: {
    mobile: 'page-login-mobile'
  },
  components: {
    NoCaptcha,
    InputPhone,
    InputPhoneCode
  },
  modals: {
    AccountAgreement
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      isCountTime: false,
      countryInfo: {},
      thirdLogins: ['alipay', 'wechat', 'weibo', 'qq'],
      isBind: true
    }
  },
  computed: {},
  methods: {
    onClickCaptcha() {
      if (!this.isBind) return
      this.form.validateFields(['country_phone'], (err, values) => {
        if (!err) {
          const { country_phone } = values
          const params = {
            phone: country_phone.phone,
            country_code_id: country_phone.code_id
          }
          this.getCaptcha(params)
        }
      })
    },
    clickAgreement() {
      this.$modalRouter.push({
        name: 'account-agreement',
        props: {},
        on: {}
      })
    },
    onChangePhone(event) {
      const phone = event.phone
      if (this.pattern.MOBILE.test(phone)) {
        this.validPhoneIsBind({ phone })
      } else {
        this.isBind = true
      }
    },
    goBind() {
      this.countryInfo.country_phone = this.form.getFieldValue('country_phone')
      this.$emit('bind', this.countryInfo)
    },
    validPhoneIsBind(params) {
      this.loginService.checkPhoneIsBind(params).subscribe(res => {
        this.isBind = false
        if (res.status) {
          this.isBind = true
        }
      })
    },
    getCaptcha(params) {
      params.nvc_val = getNVCVal()
      this.loginService.getCaptcha(params).subscribe(res => {
        this.noCaptchaService.resetNVC()
        this.isCountTime = true
      }, this.loginErrorHandler)
    },
    loginErrorHandler(err) {
      const code = err.response.code
      if (this.noCaptchaService.testIsNeedCallCaptcha(code)) {
        this.noCaptchaService.callCaptcha(code)
        return
      }
      this.noCaptchaService.resetNVC()
    },
    login() {
      this.form.validate().then(params => {
        const { country_phone } = params
        params.country_code_id = country_phone.code_id
        params.phone = country_phone.phone
        delete params.country_phone
        this.loginService.loginPhone(params).subscribe(res => {
          location.href = '/'
        })
      })
    },
    endCount() {
      this.isCountTime = false
    },
    onSelectCountry(event) {
      this.countryInfo = event
    }
  }
}
</script>
