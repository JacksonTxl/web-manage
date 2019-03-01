<template>
  <div>
    Ant Design

    <a-form :form='form'>
      <a-tabs>
        <a-tab-pane v-model='activeLoginMode'
          :tab="t('login.pwdSignIn')"
          key='tab1'>
          <a-form-item>
            <a-input size="large"
              type="text"
              placeholder="帐户名或邮箱地址 / admin"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: usernameValidator }], validateTrigger: 'change'}
              ]">
              <a-icon slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input size="large"
              type="password"
              autocomplete="false"
              placeholder="密码 / admin"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]">
              <a-icon slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane :tab="t('login.mobileSignIn')"
          key='tab2'>
          <a-form-item>
            <a-input size="large"
              type="text"
              placeholder="手机号"
              v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix"
                type="mobile"
                :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <a-row :gutter="16">
            <a-col class="gutter-row"
              :span="16">
              <a-form-item>
                <a-input size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix"
                    type="mail"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row"
              :span="8">
              <a-button class="captcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">{{t('login.agree')}}</a-checkbox>
        <router-link :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;">忘记密码</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn">确定</a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>其他登陆方式</span>
        <a>
          <a-icon class="item-icon"
            type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon"
            type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon"
            type="weibo-circle"></a-icon>
        </a>
        <router-link class="register"
          :to="{ name: 'register' }">注册账户</router-link>
      </div>

    </a-form>
    <a-select :defaultValue="locale"
      @change="onToggle">
      <a-select-option value="zh_CN">zh_CN</a-select-option>
      <a-select-option value="en_US">en_US</a-select-option>
    </a-select>
    <a-time-picker></a-time-picker>
  </div>
</template>

<script>
import Vue from 'vue'
import { userService } from '@/services/user.service'
import { localeService } from '@/services/locale.service'

const t = localeService.translate.bind(localeService)

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      activeLoginMode: 'tab1',
      state: {
        loginType: 0
      }
    }
  },
  subscriptions() {
    return {
      locale: localeService.locale$
    }
  },
  methods: {
    t,
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    usernameValidator(rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    onToggle(value) {
      localeService.SET_LOCALE(value)
    }
  }
}
</script>

<style lang="less" scoped>
.captcha {
  .w(100%);
  .h(40px);
}

.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}
.register {
  float: right;
}
</style>
