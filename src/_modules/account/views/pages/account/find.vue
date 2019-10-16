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
      <find-account @next="onNext" v-if="!showStep"></find-account>
      <find-account-step v-else :bindInfo="info"></find-account-step>
    </section>
    <footer :class="b('footer')">
      <p :class="b('footer-copyright')">
        Copyright&nbsp;©&nbsp;2015-2019&nbsp;三体云智能科技有限公司
      </p>
    </footer>
  </div>
</template>

<script>
import { FindService } from './find.service'
import FindAccount from './find#/account'
import FindAccountStep from './find#/step'
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
      noCaptchaService: NoCaptchaService
    }
  },
  data() {
    return {
      showStep: false,
      info: {}
    }
  },
  components: {
    FindAccount,
    FindAccountStep
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
      this.findService.checkAccount(params).subscribe(res => {
        this.noCaptchaService.resetNVC()
        this.info = res
        this.info.account = params.account
        this.showStep = true
      }, this.errorHandler)
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
