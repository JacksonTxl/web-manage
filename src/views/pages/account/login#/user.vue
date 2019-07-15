<template>
  <div :class="[loginUser(), trunPage?'trun-page':'']">
    <st-form :form="form" @submit.prevent="login" :class="loginUser('form')" >
      <st-form-item >
        <a-input size="large" placeholder="用户名、邮箱登录"  v-decorator="['name']"/>
      </st-form-item>
      <st-form-item class="mg-b6">
        <a-input size="large" type="password" placeholder="密码" v-decorator="['password']"/>
      </st-form-item>
      <st-form-item  :class="loginUser('pass')">
        <div :class="loginUser('pass-content')">
          <a href=""></a><a href="javascript:;" @click="onClickFindPassword">忘记密码</a>
        </div>
      </st-form-item>
      <st-form-item  class="mg-b32">
        <st-button :class="loginUser('login-button')" :loading='loading.loginAccount' pill size="large" type="primary"  html-type="submit" block>登录</st-button>
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

export default {
  bem: {
    loginUser: 'page-login-user'
  },
  name: 'LoginUser',
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
      trunPage: false
    }
  },
  methods: {
    login() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('login', values)
        }
      })
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
