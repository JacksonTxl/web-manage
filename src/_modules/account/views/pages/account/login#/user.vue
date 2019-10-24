<template>
  <div :class="[loginUser(), trunPage ? 'trun-page' : '']">
    <st-form :form="form" @submit.prevent="login" :class="loginUser('form')">
      <st-form-item>
        <a-input
          size="large"
          placeholder="用户名"
          v-decorator="decorators.name"
        />
      </st-form-item>
      <st-form-item class="mg-b12">
        <a-input
          size="large"
          type="password"
          placeholder="密码"
          v-decorator="decorators.password"
        />
      </st-form-item>
      <st-form-item class="mg-b0">
        <no-captcha></no-captcha>
      </st-form-item>
      <st-form-item :class="loginUser('pass')" class="mg-b12">
        <div :class="loginUser('wrapper')">
          <div :class="loginUser('wrapper-left')">
            <a-checkbox v-decorator="decorators.isAgree">
              我已阅读并同意
              <a
                :class="loginUser('wrapper-user-agreement')"
                @click="clickAgreement"
              >
                《 用户服务协议 》
              </a>
            </a-checkbox>
          </div>
          <!-- <span :class="loginUser('pass-content')">
            <a @click="onClickFindPassword">忘记密码</a>
          </span> -->
        </div>
      </st-form-item>
      <st-form-item class="mg-b32">
        <st-button
          :class="loginUser('login-button')"
          :loading="loading.loginAccount"
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
import NoCaptcha from './no-captcha'
import AccountAgreement from '@/views/biz-modals/account/agreement'
import { ruleOptions } from './login.config'
import { PatternService } from '@/services/pattern.service'

export default {
  bem: {
    loginUser: 'page-login-user'
  },
  name: 'LoginUser',
  components: {
    NoCaptcha
  },
  serviceInject() {
    return {
      loginService: LoginService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.loginService.loading$
    }
  },
  mounted() {
    const name = localStorage.getItem('UserAccountForFind') || ''
    this.form.setFieldsValue({
      name
    })
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      thirdLogins: ['alipay', 'wechat', 'weibo', 'qq'],
      trunPage: false
    }
  },
  modals: {
    AccountAgreement
  },
  computed: {},
  methods: {
    clickAgreement() {
      this.$modalRouter.push({
        name: 'account-agreement',
        props: {},
        on: {}
      })
    },
    login() {
      this.form.validate().then(values => {
        this.$emit('login', values)
      })
    },
    onClickFindPassword() {
      const data = this.form.getFieldsValue()
      localStorage.setItem('UserAccountForFind', data.name)
      window.open('/account/find', 'blank')
    },
    onClickThirdChange(key) {
      this.$emit('third', key)
    }
  }
}
</script>
