<template>
  <st-modal title="修改密码" v-model="show" width="476px" :class="b()">
    <div v-if="!isShowFooter && !isShowSuccess">
      正在为账号名{{
        info.account_name
      }}修改密码，为确认是您本人操作，请完成身份验证
      <span v-if="isBind">
        您当前暂未绑定手机号码，无法使用手机验证修改密码，
        <a href="">去绑定</a>
      </span>
      <div :class="b('item')" class="mg-t16">
        密码验证方式
        <st-button type="primary" pill @click="checkPass">去验证</st-button>
      </div>
      <div v-if="!isBind" :class="b('item')">
        手机号码验证方式
        <st-button type="primary" pill @click="checkTel">去验证</st-button>
      </div>
      <div :class="b('item')">联系管理员修改密码</div>
    </div>
    <st-form :form="form" labelWidth="88px" labelGutter="16px">
      <div v-if="isShowPass">
        <st-form-item label="当前账户" label-auto>
          <label>{{ info.account_name }}</label>
        </st-form-item>
        <st-form-item label="当前密码" required>
          <a-input
            type="password"
            v-decorator="decorators.password"
            placeholder="请输入当前密码"
            size="default"
          ></a-input>
        </st-form-item>
      </div>
      <div v-if="isShowTel">
        <st-form-item label="当前手机号" label-auto>
          <label>{{ info.account_phone }}</label>
        </st-form-item>
        <st-form-item label="短信验证码" class="mg-b0">
          <input-phone-code
            class="test"
            size="default"
            v-decorator="decorators.captcha"
            @click="onClickCaptcha"
            placeholder="请输入验证码"
            :isCountTime="isCountTime"
            @endCount="endCount"
          ></input-phone-code>
        </st-form-item>
      </div>

      <div v-if="!isShowTel && !isShowPass && isShowFooter">
        <st-form-item label="新密码" required>
          <a-input
            type="password"
            v-decorator="decorators.pwd"
            placeholder="请输入新密码"
            size="default"
          ></a-input>
        </st-form-item>
        <st-form-item label="确认新密码" required>
          <a-input
            type="password"
            v-decorator="decorators.repwd"
            placeholder="请输入确认新密码"
            size="default"
          ></a-input>
        </st-form-item>
      </div>
    </st-form>
    <template slot="footer">
      <div v-show="isShowFooter">
        <st-button type="default" @click="show = false">
          取消
        </st-button>
        <st-button type="primary" v-if="isShowPass" @click="goPassNext">
          确认
        </st-button>
        <st-button type="primary" v-if="isShowTel" @click="goTelNext">
          确认
        </st-button>
        <st-button
          type="primary"
          v-if="!isShowTel && !isShowPass"
          :loading="loading.add"
          @click="resetPass"
        >
          确认
        </st-button>
      </div>
    </template>
    <div :class="b('success')" v-if="isShowSuccess">
      <img
        src="/img/success.c90c2656.png"
        alt="success"
        :class="b('success-img')"
      />
      <div :class="b('success-text')" class="mg-t16 mg-b16">密码更新成功</div>
      <st-button pill type="primary" @click="goLogin">立即登陆</st-button>
    </div>
  </st-modal>
</template>

<script>
import { ModifyService } from './modify.service'
import { ruleOptions } from './modify.config'
import { PatternService } from '@/services/pattern.service'
import { NoCaptchaService } from '@/services/no-captcha.service'
import InputPhoneCode from '@/views/biz-components/input-phone-code/input-phone-code'
import { MessageService } from '@/services/message.service'
import { cloneDeep } from 'lodash-es'

export default {
  bem: {
    b: 'account-modify'
  },
  serviceInject() {
    return {
      modifyService: ModifyService,
      messageService: MessageService,
      noCaptchaService: NoCaptchaService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      info: this.modifyService.info$,
      loading: this.modifyService.loading$
    }
  },
  components: {
    InputPhoneCode
  },
  computed: {
    isBind() {
      return (
        this.info.account_phone_encrypt &&
        this.info.account_phone_encrypt.length === 4
      )
    }
  },
  mounted() {
    this.modifyService.getUserInfo().subscribe()
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      isCountTime: false,
      isShowFooter: false,
      isShowTel: false,
      isShowPass: false,
      isShowSuccess: false
    }
  },
  methods: {
    checkPass() {
      this.isShowFooter = true
      this.isShowPass = true
    },
    checkTel() {
      this.isShowFooter = true
      this.isShowTel = true
    },
    goTelNext() {
      this.form.validate(['captcha']).then(values => {
        this.modifyService
          .checkCaptcha({ captcha: values.captcha })
          .subscribe(res => {
            this.isShowTel = false
          })
      })
    },
    goPassNext() {
      this.form.validate(['password']).then(values => {
        this.modifyService
          .checkAccount({ pwd: values.password })
          .subscribe(res => {
            this.isShowPass = false
          })
      })
    },
    onClickCaptcha() {
      const params = {
        phone: this.info.account_phone,
        country_code_id: this.info.country_code_id
      }
      this.getCaptcha(params)
    },
    getCaptcha(params) {
      const nvc_val = this.noCaptchaService.generateNVCVal()
      if (!nvc_val) {
        return
      }
      params.nvc_val = nvc_val
      this.modifyService.getCaptcha(params).subscribe(res => {
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
    resetPass() {
      this.form.validate(['pwd', 'repwd']).then(values => {
        let para = {
          pwd: values.pwd,
          repwd: values.repwd
        }
        this.modifyService.resetPass(para).subscribe(res => {
          this.messageService.success({ content: '修改成功' })
          this.isShowFooter = false
          this.isShowSuccess = true
        })
      })
    },
    endCount() {
      this.isCountTime = false
    },
    goLogin() {}
  }
}
</script>
