<template>
  <div class="page-login-wapper">
    <img src="~@/assets/img/logo.png" alt="三体云动" class="page-login-logo" />
    <div class="page-login-ch-en">
      <!-- <span class="mg-r24 active">中文</span>
      <span class="mg-r24">English</span> -->
    </div>
    <div class="page-login">
      <img src="~@/assets/img/login-bg-title.png" class="page-login-bg-title" />
      <!-- 密码/二维码 -->
      <!-- <i
        class="page-switch-login-type cursor-pointer"
        :class="{ 'qrcode-login': this.loginType === 'qrcode' }"
        @click="switchLoginType"
        v-if="switchLoginTypeIsShow"
      ></i> -->
      <i
        class="cursor-pointer"
        :class="{
          'qrcode-login': this.loginType === 'qrcode',
          'page-switch-bind': this.loginType === 'bind'
        }"
        v-if="switchLoginTypeIsShow"
        @click="bindBackLogin"
      ></i>
      <!-- NOTE: 功能暂未实现，不开放 -->
      <!-- 'page-switch-login-typQe': this.loginType !== 'bind', -->
      <section class="lf">
        <div class="lf-bg"></div>
      </section>
      <section class="rt">
        <div
          v-if="loginType === 'user' || loginType === 'mobile'"
          class="login-user-and-mobile"
        >
          <ul class="page-login-tabs mg-b24">
            <li
              v-for="item in loginTypes"
              :key="item.key"
              class="page-login-tab-item"
              :class="{ 'page-login-tab-item--active': item.key === loginType }"
            >
              <span @click.stop="onClickChangeType(item.key)">
                {{ item.name }}
              </span>
            </li>
          </ul>
          <login-user
            @findps="onFindPassword"
            @third="onThird"
            @login="onLogin"
            v-if="loginType === 'user'"
          ></login-user>
          <login-mobile
            v-if="loginType === 'mobile'"
            @bind="onBind"
            :value="countryInfo"
          ></login-mobile>
        </div>

        <div v-if="loginType === 'bind'">
          <login-bind :value="countryInfo" @click="onClickBind"></login-bind>
        </div>

        <div
          v-if="loginType === 'mobilefind' || loginType === 'emailfind'"
          class="login-user-and-mobile"
        >
          <ul class="page-login-tabs mg-b24">
            <li
              v-for="item in findPasswordTypes"
              :key="item.key"
              class="page-login-tab-item"
              :class="{ 'page-login-tab-item--active': item.key === loginType }"
            >
              <span @click.stop="onClickChangeType(item.key)">
                {{ item.name }}
              </span>
            </li>
          </ul>
          <login-mobile v-show="loginType === 'mobilefind'"></login-mobile>
          <div v-show="loginType === 'emailfind'">邮件找回表单</div>
          <st-button @click="onClickBack">返回</st-button>
        </div>
        <!-- <div v-else-if="loginType==='weibo' || loginType==='qq' || loginType==='alipay' || loginType==='wechat'" class="page-login-wechat">
          <ul class="page-login-tabs mg-b24">
            <li  class="page-login-tab-item page-login-tab-item-wechat pd-y8"><span>{{typeNames[loginType]}}</span></li>
          </ul>
          <login-third @back="loginType = 'user'"></login-third>
        </div> -->
      </section>
    </div>
    <div class="page-login-footer">
      <p class="page-login-footer__text">
        三体云动Pro&nbsp;·&nbsp;用智能让世界更健康
      </p>
      <p class="page-login-footer__text page-login-footer__copyright">
        <copyright />
      </p>
    </div>
  </div>
</template>

<script>
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
import { LoginService } from './login.service'
import mobile from './login#/mobile'
import user from './login#/user'
import bind from './login#/bind'
import { NoCaptchaService } from '@/services/no-captcha.service'
import { throwError } from 'rxjs'
import Copyright from '@/views/biz-components/copyright/copyright'

export default {
  name: 'Login',
  serviceInject() {
    return {
      loginService: LoginService,
      userService: UserService,
      authService: AuthService,
      noCaptchaService: NoCaptchaService
    }
  },
  data() {
    return {
      loginType: 'user',
      typeNames: {
        weibo: '微博登录',
        qq: 'qq登录',
        alipay: '支付宝登录',
        wechat: '微信登录'
      },
      findPasswordTypes: [
        { key: 'mobilefind', name: '手机找回' },
        { key: 'emailfind', name: '邮件找回' }
      ],
      loginTypes: [
        { key: 'user', name: '用户密码登录' },
        { key: 'mobile', name: '手机验证码登录' }
      ],
      countryInfo: {}
    }
  },
  components: {
    LoginMobile: mobile,
    LoginBind: bind,
    LoginUser: user,
    Copyright
  },
  rxState() {
    return {
      isBind: this.loginService.isBind$,
      loading: this.loginService.loading$
    }
  },
  mounted() {
    if (this.isBind) {
      this.loginType = 'bind'
    }
  },
  computed: {
    switchLoginTypeIsShow() {
      let types = ['user', 'mobile', 'qrcode', 'bind']
      return types.includes(this.loginType)
    }
  },
  methods: {
    onClickChangeType(key) {
      this.loginType = key
    },
    onFindPassword() {
      this.loginType = 'mobilefind'
    },
    onThird(type) {
      this.loginType = type
    },
    onClickBack() {
      this.loginType = 'user'
    },
    bindBackLogin() {
      if (this.loginType === 'bind') {
        this.loginType = 'mobile'
      }
    },
    onLogin(params) {
      // params.nvc_val = window.getNVCVal()
      const nvc_val = this.noCaptchaService.generateNVCVal()
      if (!nvc_val) {
        return
      }
      params.nvc_val = nvc_val
      this.loginService.loginAccount(params).subscribe(res => {
        this.noCaptchaService.resetNVC()
        localStorage.clear()
        location.href = '/'
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
    // 切换登录方式
    switchLoginType() {
      this.loginType = this.loginType === 'qrcode' ? 'user' : 'qrcode'
    },
    onBind(event) {
      this.loginType = 'bind'
      this.countryInfo = event
    },
    onClickBind(params) {
      this.loginService.bindPhoneForAccount(params).subscribe(res => {
        this.countryInfo = {}
        location.href = '/'
      })
    }
  }
}
</script>
