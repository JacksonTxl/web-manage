<template>
  <div class="bind">
    <div>
      <label>绑定登录手机号</label>
      <p>用于登录、密码找回和验证身份，保护您的账号安全</p>
    </div>
    <st-form :form="form" @submit.prevent="login" :class="loginUser('form')">
      <st-form-item>
        <a-input
          size="large"
          placeholder="用户名、邮箱"
          v-decorator="rules.name"
        />
      </st-form-item>
      <st-form-item class="mg-b12">
        <a-input
          size="large"
          type="password"
          placeholder="密码"
          v-decorator="rules.password"
        />
      </st-form-item>
      <st-form-item :class="mobile('phone')">
        <a-input
          size="large"
          :class="mobile('phone-input')"
          placeholder="请输入手机号码"
          v-decorator="rules.phone"
        />
        <a-dropdown :class="mobile('phone-dropdown')">
          <span class="cursor-pointer">
            +86
            <a-icon type="down" />
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
      <st-form-item :class="mobile('captcha')" class="mg-b12">
        <a-input
          size="large"
          :class="mobile('captcha-input')"
          placeholder="请输入验证码"
          v-decorator="rules.captcha"
        />
        <span :class="mobile('captcha-button')" @click="onClickCaptcha">
          {{ buttonText }}
        </span>
      </st-form-item>
      <!-- 无痕验证 -->
      <st-form-item class="mg-b0">
        <no-captcha></no-captcha>
      </st-form-item>
      <st-form-item class="mg-b32">
        <st-button
          :class="loginUser('login-button')"
          :loading="loading.loginAccount"
          :disabled="changeSubmitDisabled"
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
  </div>
</template>

<script>
import { LoginService } from '../login.service'
import { rules } from './user.config'
import NoCaptcha from './no-captcha'
import AccountAgreement from '@/views/biz-modals/account/agreement'

export default {
  bem: {
    b: 'page-login-bind'
  },
  name: 'LoginUser',
  components: {
    NoCaptcha
  },
  serviceInject() {
    return {
      loginService: LoginService
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
      trunPage: false,
      defaultAgreeFlag: true
    }
  },
  modals: {
    AccountAgreement
  },
  computed: {
    rules,
    changeSubmitDisabled() {
      return !this.defaultAgreeFlag
    }
  },
  methods: {
    clickAgreement() {
      this.$modalRouter.push({
        name: 'account-agreement',
        props: {},
        on: {}
      })
    },
    login() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('login', values)
        }
      })
    },
    onChange() {
      this.$router.push({
        force: true
      })
    },
    onCheckboxChange() {
      this.defaultAgreeFlag = !this.defaultAgreeFlag
    },
    onClickFindPassword() {
      this.$emit('findps')
    },
    onClickThirdChange(key) {
      this.$emit('third', key)
    }
  }
}
</script>
