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
        <a-form :form="loginForm">

        </a-form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
      }
    }
  }
}
</script>
