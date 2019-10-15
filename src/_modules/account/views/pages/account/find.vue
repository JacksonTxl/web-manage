<template>
  <div :class="b()">
    <header :class="b('header')">
      <img
        src="~@/assets/img/logo.png"
        alt="三体云动"
        :class="b('header-logo')"
      />
      <div :class="b('header-text')">找回密码</div>
      <div>
        <!-- <span class="mg-r24 active">中文</span>
      <span class="mg-r24">English</span> -->
      </div>
    </header>
    <section>
      <find-account></find-account>
    </section>
    <footer :class="b('footer')">
      <p :class="b('footer-copyright')">
        Copyright&nbsp;©&nbsp;2015-2019&nbsp;三体云智能科技有限公司
      </p>
    </footer>
  </div>
</template>

<script>
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
import { FindService } from './find.service'
import FindAccount from './find#/account'
import user from './login#/user'
import bind from './login#/bind'
import { NoCaptchaService } from '@/services/no-captcha.service'
import { throwError } from 'rxjs'

export default {
  name: 'Login',
  bem: {
    b: 'page-account-find'
  },
  serviceInject() {
    return {
      findService: FindService,
      userService: UserService,
      authService: AuthService,
      noCaptchaService: NoCaptchaService
    }
  },
  data() {
    return {}
  },
  components: {
    FindAccount
  },
  rxState() {
    return {
      loading: this.findService.loading$
    }
  },
  computed: {},
  methods: {
    onNext(params) {
      params.nvc_val = window.getNVCVal()
      this.findService.loginAccount(params).subscribe(res => {
        this.noCaptchaService.resetNVC()
        location.href = '/'
      }, this.loginErrorHandler)
    },
    errorHandler(err) {
      const code = err.response.code
      if (this.noCaptchaService.testIsNeedCallCaptcha(code)) {
        this.noCaptchaService.callCaptcha(code)
        return
      }
      this.noCaptchaService.resetNVC()
    }
  }
}
</script>
