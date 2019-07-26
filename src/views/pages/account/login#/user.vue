<template>
  <div :class="[loginUser(), trunPage?'trun-page':'']">
    <st-form :form="form" @submit.prevent="login" :class="loginUser('form')" >
      <st-form-item >
        <a-input size="large" placeholder="用户名、邮箱登录"  v-decorator="rules.name"/>
      </st-form-item>
      <st-form-item>
        <a-input size="large" type="password" placeholder="密码" v-decorator="rules.password"/>
      </st-form-item>
      <st-form-item class="mg-b0">
        <no-captcha/>
      </st-form-item>
      <!-- <st-form-item  :class="loginUser('pass')" class="mg-b16">
        <div :class="loginUser('pass-content')">
          <a href="javascript:;" @click="onClickFindPassword">忘记密码</a>
        </div>
      </st-form-item> -->
      <st-form-item  class="mg-b32">
        <st-button
          :class="loginUser('login-button')"
          :loading='loading.loginAccount'
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
    <!-- 第三方登录 -->
    <!-- <div :class="loginUser('third')" class="mg-l24">
      <div @click="onClickThirdChange(item)" class="st-icon-wapper" v-for="item in thirdLogins" :key="item.type"><st-icon :class="item" :type="item" size="24px" /></div>
    </div> -->
  </div>
</template>

<script>
import { LoginService } from '../login.service'
import { rules } from './user.config'
import NoCaptcha from './no-captcha'
import { NoCaptchaService } from '@/services/no-captcha.service'

export default {
  bem: {
    loginUser: 'page-login-user'
  },
  name: 'LoginUser',
  serviceInject() {
    return {
      loginService: LoginService,
      noCaptchaService: NoCaptchaService
    }
  },
  rxState() {
    return {
      loading: this.loginService.loading$
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      thirdLogins: ['alipay', 'wechat', 'weibo', 'qq'],
      trunPage: false
    }
  },
  computed: {
    rules
  },
  methods: {
    login() {
      const params = {
        nvc_val: getNVCVal()
      }
      console.log('nvc_val', params.nvc_val)
      // getNC()
      this.loginService.traceCode(params).subscribe(
        res => {
          this.form.validateFields((err, values) => {
            if (!err) {
              this.$emit('login', values)
            }
          })
        },
        (res) => {
          this.noCaptchaService.callCaptcha(res.code)
        }
      )
    },
    onClickFindPassword() {
      this.$emit('findps')
    },
    onClickThirdChange(key) {
      this.$emit('third', key)
    }
  },
  components: {
    NoCaptcha
  }
}
</script>
