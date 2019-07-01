<template>
  <div :class="mobile()">
    <st-form :form="form" @submit.prevent="login" :class="mobile('form')">
      <st-form-item >
        <a-input placeholder="请输入手机号码"  v-decorator="['phone']"/>
      </st-form-item>
      <st-form-item   class="mg-b0">
        <a-input-search placeholder="请输入验证码" v-model="captcha" @search="onClickCaptcha">
          <a-button  :class="mobile('button')" :disabled="isClick" slot="enterButton" >{{buttonText}}</a-button>
        </a-input-search>
      </st-form-item>
      <st-form-item  class="mg-t24">
        <st-button type="primary"  html-type="submit" block>登录</st-button>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
import { LoginService } from '../login.service'
export default {
  name: 'LoginMobile',
  serviceInject() {
    return {
      loginService: LoginService
    }
  },
  bem: {
    mobile: 'page-login-mobile'
  },
  props: {
    loading: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      time: 60,
      captcha: '',
      isClick: false,
      timer: ''
    }
  },
  computed: {
    buttonText() {
      return this.isClick ? `${this.time}s后获取验证码` : `获取验证码`
    }
  },
  methods: {
    onClickCaptcha() {
      const that = this
      this.isClick = true
      const phone = this.form.getFieldValue('phone')
      this.loginService.getCaptcha({ phone, country_code_id: 86 }).subscribe()
      this.timer = setInterval(() => {
        if (!that.time) {
          this.isClick = false
          this.time = 60
          clearInterval(that.timer)
        }
        that.time = that.time - 1
      }, 1000)
    },
    login() {
      const phone = this.form.getFieldValue('phone')
      const form = {
        captcha: this.captcha,
        country_code_id: 86,
        phone
      }
      this.loginService.loginPhone(form).subscribe()
    }
  },
  mounted() {
    this.loginService.getCaptcha({})
  }
}
</script>

<style lang="scss" scoped>

</style>
