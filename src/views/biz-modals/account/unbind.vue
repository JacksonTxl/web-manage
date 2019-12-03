<template>
  <st-modal :title="modalTitle" v-model="show" size="small">
    <st-form :form="form" labelWidth="88px" labelGutter="16px">
      <st-form-item label="当前手机号" label-auto v-if="info.bind_mobile">
        <label>{{ info.bind_mobile }}</label>
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
    <template slot="footer">
      <st-button type="default" @click="show = false">
        取消
      </st-button>
      <st-button type="primary" :loading="loading.add" @click="onBind">
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
      loading: this.unbindService.loading$
    }
  },
  components: {
    NoCaptcha,
    InputPhoneCode
  },
  computed: {
    modalTitle() {
      return '解绑手机号'
    }
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
      this.form.validate(['country_phone']).then(values => {
        const { country_phone } = values
        const params = {
          phone: country_phone.phone,
          country_code_id: country_phone.code_id,
          is_bind: 2
        }
        this.getCaptcha(params)
      })
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
    onBind() {
      this.form.validate().then(values => {
        const params = cloneDeep(values)
        const country_phone = values.country_phone
        params.phone = country_phone.phone
        params.country_code_id = country_phone.code_id
        delete params.country_phone
        delete params.name
        delete params.password
        this.unbindService.bindAccountPhone(params).subscribe(res => {
          this.show = false
          this.messageService.success({ content: '绑定手机号成功' })
        })
      })
    }
  }
}
</script>
