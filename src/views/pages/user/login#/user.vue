<template>
  <div :class="[loginUser(), trunPage?'trun-page':'']">
    <st-form :form="form" @submit.prevent="login" :class="loginUser('form')" class="mg-b32" >
      <st-form-item >
        <a-input placeholder="用户名、邮箱登录"  v-decorator="['name']"/>
      </st-form-item>
      <st-form-item   class="mg-b16">
        <a-input type="password" placeholder="密码" v-decorator="['password']"/>
      </st-form-item>
      <st-form-item  :class="loginUser('pass')" class="mg-b16">
        <a-checkbox>我已阅读并同意<a href="">《用户注册协议》</a></a-checkbox><a href="javascript:;" @click="onClickFindPassword">忘记密码</a>
      </st-form-item>
      <st-form-item  class="mg-b0">
        <st-button type="primary"  html-type="submit" block>登录</st-button>
      </st-form-item>
    </st-form>
    <div :class="loginUser('third')">
      <div @click="onClickThirdChange(item)" class="st-icon-wapper mg-r16" v-for="item in thirdLogins" :key="item.type"><st-icon :class="item" :type="item" size="24px" /></div>
    </div>
  </div>
</template>

<script>
export default {
  bem: {
    loginUser: 'page-login-user'
  },
  name: 'LoginUser',
  props: {
    loading: {
      type: Object,
      default: () => {}
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
      this.$form.validateFields((err, values) => {
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

<style lang="scss" scoped>

</style>
