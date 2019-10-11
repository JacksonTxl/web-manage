<template>
  <div :class="b()">
    <div :class="b('head')">
      <label :class="b('head-title')">绑定登录手机号</label>
      <p :class="b('head-desc')">
        用于登录、密码找回和验证身份，保护您的账号安全
      </p>
    </div>
    <st-form :form="form" @submit.prevent="login" :class="b('form')">
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
          v-decorator="decorators.phone"
          placeholder="请输入手机号码"
        ></input-phone>
      </st-form-item>
      <st-form-item class="mg-b12">
        <input-phone-code
          v-decorator="decorators.captcha"
          @click="onClickCaptcha"
          placeholder="请输入验证码"
          :isCountTime="isCountTime"
        ></input-phone-code>
      </st-form-item>
      <!-- 无痕验证 -->
      <st-form-item class="mg-b12">
        <no-captcha></no-captcha>
      </st-form-item>
      <st-form-item class="mg-b32">
        <st-button
          :class="b('login-button')"
          :loading="loading.loginAccount"
          :disabled="changeSubmitDisabled"
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
import InputPhone from '@/views/biz-components/input-phone/input-phone'
import InputPhoneCode from '@/views/biz-components/input-phone-code/input-phone-code'

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
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.loginService.loading$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      isCountTime: false,
      isClick: false
    }
  },
  methods: {
    onClickCaptcha() {
      if (this.isClick) {
        return
      }
      this.form.validateFields(['phone'], (err, values) => {
        if (!err) {
          const { phone } = values
          const params = {
            phone,
            country_code_id: 86
          }
          this.getCaptcha(params)
        }
      })
    },
    getCaptcha(params) {
      this.loginService.getCaptcha(params).subscribe(res => {
        this.isCountTime = true
      })
    }
  }
}
</script>
