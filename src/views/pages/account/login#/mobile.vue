<template>
  <div :class="mobile()">
    <st-form :form="form" @submit.prevent="login" :class="mobile('form')">
      <st-form-item :class="mobile('phone')">
        <a-input size="large" :class="mobile('phone-input')" placeholder="请输入手机号码"  v-decorator="rules.phone"/>
        <a-dropdown :class="mobile('phone-dropdown')">
          <span class="cursor-pointer">
            +86 <a-icon type="down" />
          </span>
          <!-- <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">+86</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">+86</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">+86</a>
            </a-menu-item>
          </a-menu> -->
        </a-dropdown>
      </st-form-item>
      <st-form-item class="mg-b0">
        <!-- 验证浮层 -->
        <div id="no-captcha"></div>
      </st-form-item>
      <!-- <st-form-item class="mg-b0">
        <no-captcha id="no-captcha-2"/>
      </st-form-item> -->
      <st-form-item :class="mobile('captcha')" class="mg-b16">
        <a-input size="large" :class="mobile('captcha-input')" placeholder="请输入验证码" v-decorator="rules.captcha" />
        <span :class="mobile('captcha-button')" @click="onClickCaptcha">{{buttonText}}</span>
      </st-form-item>
      <!-- <st-form-item :class="mobile('pass')" class="mg-b16">
        <div :class="mobile('pass-content')">
          <a-checkbox>我已阅读并同意<a href="./agreement" target="_blank">《用户注册协议》</a></a-checkbox>
        </div>
      </st-form-item> -->
      <st-form-item  class="mg-b0">
        <st-button :class="mobile('login-button')" pill size="large" type="primary"  html-type="submit" block>登录</st-button>
      </st-form-item>
    </st-form>
    <!-- <div :class="mobile('third')" class="mg-l24">
      <div class="st-icon-wapper" v-for="item in thirdLogins" :key="item.type"><st-icon :class="item" :type="item" size="24px" /></div>
    </div> -->
  </div>
</template>

<script>
import { LoginService } from '../login.service'
import { rules } from './mobile.config'
import { PatternService } from '@/services/pattern.service'
export default {
  name: 'LoginMobile',
  serviceInject() {
    return {
      loginService: LoginService,
      pattern: PatternService
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
      thirdLogins: ['alipay', 'wechat', 'weibo', 'qq'],
      timer: ''
    }
  },
  computed: {
    rules,
    buttonText() {
      return this.isClick ? `${this.time}s后获取验证码` : `获取验证码`
    }
  },
  methods: {
    onClickCaptcha() {
      if (this.isClick) {
        return
      }
      this.form.validateFields(['phone'], (err, values) => {
        if (!err) {
          this.isClick = true
          const { phone } = values
          const params = {
            phone,
            country_code_id: 86
          }
          this.getCaptcha(params)
          this.setTimer()
        }
      })
    },
    getCaptcha(params) {
      this.loginService.getCaptcha(params).subscribe()
    },
    setTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.time <= 1) {
          this.isClick = false
          this.time = 60
          clearInterval(this.timer)
        }
        this.time = --this.time
      }, 1000)
    },
    login() {
      getNC()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.country_code_id = 86
          this.loginService.loginPhone(form).subscribe(res => {
            this.userService.SET_FIRST_INITED(false)
            if (res.have_phone) {
              this.$router.push('/')
            } else {
              // 去绑定手机
              // 这是什么操作？？？
              this.$router.push('/')
            }
          })
        }
      })
    }
  },
  mounted() {
    this.loginService.getCaptcha({})
  }
}
</script>
