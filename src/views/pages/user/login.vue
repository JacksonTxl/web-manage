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
        <!-- 书的最后一页 -->
        <!-- <div class="book-page-box book-page-4 preserve-3d">
          <div class="book-page page-front">
            <div v-show="loginType === 'user' || loginType === 'mobile'" class="login-user-and-mobile">
              <ul class="page-login-tabs mg-l24 mg-b24">
                <li v-for="item in loginTypes" :key="item.key" class="page-login-tab-item pd-y8" :class="{'page-login-tab-item--active': item.key === loginType}"><span @click.stop="onClickChangeType(item.key)">{{item.name}}</span></li>
              </ul>
              <login-user @login="onLogin" v-show="loginType==='user'"></login-user>
              <login-mobile v-show="loginType==='mobile'"></login-mobile>
            </div>
          </div>
        </div> -->
        <!-- 书的第三页 -->
        <!-- <div class="book-page-box book-page-3 preserve-3d flip-animation-3">
          <div class="book-page page-front">

          </div>
        </div> -->
        <!-- 书的第二页 -->
        <!-- <div class="book-page-box book-page-2 preserve-3d flip-animation-2">

        </div> -->

        <div v-show="loginType === 'user' || loginType === 'mobile'" class="login-user-and-mobile">
          <ul class="page-login-tabs mg-l24 mg-b24">
            <li v-for="item in loginTypes" :key="item.key" class="page-login-tab-item pd-y8" :class="{'page-login-tab-item--active': item.key === loginType}"><span @click.stop="onClickChangeType(item.key)">{{item.name}}</span></li>
          </ul>
          <login-user @login="onLogin" v-show="loginType==='user'"></login-user>
          <login-mobile v-show="loginType==='mobile'"></login-mobile>
        </div>
        <div v-show="loginType === 'wechat'" class="page-login-wechat">
              <ul class="page-login-tabs mg-b24">
                <li  class="page-login-tab-item page-login-tab-item-wechat pd-y8"><span>微信登录</span></li>
              </ul>
            </div>
      </section>
    </div>
  </div>
</template>

<script>
import { UserService } from '../../../services/user.service'
import { LoginService } from './login.service'
import mobile from './login#/mobile'
import user from './login#/user'
export default {
  name: 'Login',
  serviceInject() {
    return {
      loginService: LoginService
    }
  },
  data() {
    return {
      loginType: 'user',
      loginTypes: [{ key: 'user', name: '用户密码登录' }, { key: 'mobile', name: '手机动态密码登录' }]
    }
  },
  components: {
    LoginMobile: mobile,
    LoginUser: user
  },
  subscriptions() {
    return {
      loading: this.loginService.loading$
    }
  },
  methods: {
    onClickChangeType(key) {
      this.loginType = key
    },
    onLogin(values) {
      this.loginService.loginAccount(values).subscribe(res => {
        console.log(res)
        this.$router.push('/')
      })
    }
  }
}
</script>
