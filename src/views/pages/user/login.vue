<template>

  <div class="page-login-wapper">
    <div class="page-login">
      <section class="lf">
        <div class="lf-introduce">
          <div class="lf-bg"></div>
          <header class="lf-logo">
            <st-icon type="fenzu" size="60px"></st-icon>
          </header>
          <main>
            <div class="lf-title">SaaS+物联网+大数据</div>
            <div class="lf-sub-title">三位一体的生态闭环</div>
          </main>
          <footer>
            <ul class="lf-help">
              <li class="item"><a href="">帮助</a></li>
              <li class="item"><a href="">隐私</a></li>
              <li class="item"><a href="">条款</a></li>
            </ul>
            <p class="lf-copyright">版权所有&nbsp;©&nbsp;三体云动&nbsp;三体云智能科技有限公司</p>
          </footer>
        </div>
      </section>
      <section class="rt">
        <ul>
          <li>账户密码登录</li>
          <li>手机动态密码登录</li>
        </ul>
        <st-form :form="form" @submit.prevent="login" class="page-login__form">
          <st-form-item >
            <a-input placeholder="请输入实体卡号"  v-decorator="['name']"/>
          </st-form-item>
          <st-form-item   class="mg-b0">
            <a-input type="password" placeholder="请将实体卡置于读卡器上" v-decorator="['password']"/>
          </st-form-item>
          <st-form-item  class="mg-b0">
            <a-checkbox>我已阅读并同意<a href="">《用户注册协议》</a></a-checkbox><a href="">忘记密码</a>
          </st-form-item>
          <st-form-item  class="mg-b0">
            <st-button type="primary"  html-type="submit"  block>登录</st-button>
          </st-form-item>
        </st-form>
      </section>
    </div>
  </div>
</template>

<script>
import { LoginService } from '@/views/pages/user/login.service'
export default {
  name: 'Login',
  serviceInject() {
    return {
      loginService: LoginService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    login() {
      this.form.validateFields((err, values) => {
        if (err) return
        this.loginService.loginAccount(values).subscribe(res => {
          console.log(res)
        })
      })
    }
  }
}
</script>
