<template>
  <div :class="mobile()">
    <st-form :form="form" @submit.prevent="login" :class="mobile('form')">
      <st-form-item >
        <a-input placeholder="请输入实体卡号"  v-decorator="['name']"/>
      </st-form-item>
      <st-form-item   class="mg-b0">
        <a-input type="password" placeholder="请将实体卡置于读卡器上" v-decorator="['password']"/>
        <a-input-search placeholder="input search text" @search="onSearch" size="large">
          <span slot="enterButton">获取验证码</span>
        </a-input-search>
      </st-form-item>
      <st-form-item  class="mg-b0">
        <a-checkbox>我已阅读并同意<a href="">《用户注册协议》</a></a-checkbox><a href="">忘记密码</a>
      </st-form-item>
      <st-form-item  class="mg-b0">
        <st-button type="primary"  html-type="submit" block>登录</st-button>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
export default {
  name: 'LoginMobile',
  bem: {
    mobile: 'page-login-mobile'
  },
  props: {
    loading: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    login() {
      // this.form.validateFields((err, values) => {
      //   this.$emit('login', values)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
