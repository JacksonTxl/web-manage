<template>
  <st-modal title="解绑手机号" v-model="show" size="small">
    <div v-if="!account.account_phone_encrypt">
      账户没有绑定手机号
    </div>
    <div v-else>
      <st-form :form="form" labelWidth="88px" labelGutter="16px">
        <st-form-item
          label="当前手机号"
          label-auto
          v-if="account.account_phone_encrypt"
        >
          <label>{{ account.account_phone_encrypt }}</label>
        </st-form-item>
        <!-- 无痕验证 -->
        <st-form-item class="mg-b0" label-fix label="滑块验证">
          <no-captcha id="change-phone"></no-captcha>
        </st-form-item>
        <st-form-item label="短信验证码" class="mg-b0">
          <input-phone-code
            class="test"
            size="default"
            v-decorator="decorators.captcha"
            @click="onClickCaptcha"
            placeholder=" "
            :isCountTime="isCountTime"
            @endCount="endCount"
          ></input-phone-code>
        </st-form-item>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="default" @click="show = false">
        取消
      </st-button>
      <st-button
        type="primary"
        v-if="!account.account_phone_encrypt"
        @click="show = false"
      >
        确认
      </st-button>
      <st-button type="primary" v-else :loading="loading.add" @click="onUnbind">
        确认解绑
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { UnbindService } from './unbind.service'
import { ruleOptions } from './unbind.config'
import NoCaptcha from '@/views/biz-components/no-captcha'
import { PatternService } from '@/services/pattern.service'
import { NoCaptchaService } from '@/services/no-captcha.service'
import InputPhoneCode from '@/views/biz-components/input-phone-code/input-phone-code'
import { MessageService } from '@/services/message.service'
import { cloneDeep } from 'lodash-es'

export default {
  serviceInject() {
    return {
      unbindService: UnbindService,
      messageService: MessageService,
      noCaptchaService: NoCaptchaService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      info: this.unbindService.info$,
      loading: this.unbindService.loading$,
      account: this.unbindService.account$
    }
  },
  components: {
    NoCaptcha,
    InputPhoneCode
  },
  mounted() {
    this.unbindService.fetchUserInfo().subscribe()
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      isCountTime: false
    }
  },
  methods: {
    onClickCaptcha() {
      const params = {
        phone: this.account.account_phone,
        country_code_id: this.account.country_code_id
      }
      this.getCaptcha(params)
    },
    getCaptcha(params) {
      const nvc_val = this.noCaptchaService.generateNVCVal()
      if (!nvc_val) {
        return
      }
      params.nvc_val = nvc_val
      this.unbindService.getCaptcha(params).subscribe(res => {
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
    onUnbind() {
      this.form.validate().then(values => {
        let para = {
          captcha: values.captcha,
          country_code_id: this.account.country_code_id,
          phone: this.account.account_phone
        }
        this.unbindService.unbindAccountPhone(para).subscribe(res => {
          this.show = false
          this.messageService.success({ content: '解绑手机号成功' })
        })
      })
    }
  }
}
</script>
