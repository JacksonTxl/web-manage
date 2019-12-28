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
      <find-account-step
        v-else
        :bindInfo="info"
        @step="onStep"
      ></find-account-step>
    </section>
    <footer :class="[bFooter(), isBindAccount ? bFooter('active') : '']">
      <dl :class="bFooter('msg')" v-if="isBindAccount">
        <dt :class="bFooter('title')">没收到短信验证码？</dt>
        <dd :class="bFooter('item')">
          <img
            :class="bFooter('item-img')"
            src="~@/assets/img/find-pwd/msg-tip-1.png"
          />
          网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。
        </dd>
        <dd :class="bFooter('item')">
          <img
            :class="bFooter('item-img')"
            src="~@/assets/img/find-pwd/msg-tip-2.png"
          />
          请核实手机是否已欠费停机，或者屏蔽了系统短信。
        </dd>
        <dd :class="bFooter('item')">
          <img
            :class="bFooter('item-img')"
            src="~@/assets/img/find-pwd/msg-tip-3.png"
          />
          如果手机已丢失或停用， 请选择其他验证方式。
        </dd>
        <dd :class="bFooter('item')">
          <img
            :class="bFooter('item-img')"
            src="~@/assets/img/find-pwd/msg-tip-4.png"
          />
          您也可以尝试将SIM卡移动到另一部手机，然后重试。
        </dd>
      </dl>
      <p
        :class="
          isBindAccount ? bFooter('copyright--active') : bFooter('copyright')
        "
      >
        <copyright />
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
import { IS_BIND } from '@/constants/account'
import Copyright from '@/views/biz-components/copyright/copyright'

export default {
  name: 'Login',
  bem: {
    b: 'page-account-find',
    bFooter: 'footer'
  },
  serviceInject() {
    return {
      findService: FindService,
      noCaptchaService: NoCaptchaService
    }
  },
  data() {
    return {
      IS_BIND,
      showStep: false,
      currentIndex: 0,
      info: {}
    }
  },
  components: {
    FindAccount,
    FindAccountStep,
    Copyright
  },
  rxState() {
    return {
      loading: this.findService.loading$
    }
  },
  computed: {
    isBindAccount() {
      return this.info.is_bind === this.IS_BIND.BIND && this.currentIndex === 0
    }
  },
  methods: {
    onNext(params) {
      const nvc_val = this.noCaptchaService.generateNVCVal()
      if (!nvc_val) {
        return
      }
      params.nvc_val = nvc_val
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
    },
    onStep(event) {
      this.currentIndex = event
    }
  }
}
</script>
