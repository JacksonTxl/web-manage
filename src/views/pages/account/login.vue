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

        <div v-if="loginType === 'user' || loginType === 'mobile'" class="login-user-and-mobile">
          <ul class="page-login-tabs mg-l24 mg-b24">
            <li v-for="item in loginTypes" :key="item.key" class="page-login-tab-item pd-y8" :class="{'page-login-tab-item--active': item.key === loginType}"><span @click.stop="onClickChangeType(item.key)">{{item.name}}</span></li>
          </ul>
          <login-user @findps="onFindPassword" @third="onThird" @login="onLogin" v-show="loginType==='user'"></login-user>
          <login-mobile v-show="loginType==='mobile'"></login-mobile>
        </div>

        <div v-if="loginType === 'mobilefind' || loginType === 'emailfind'" class="login-user-and-mobile">
          <ul class="page-login-tabs mg-l24 mg-b24">
            <li v-for="item in findPasswordTypes" :key="item.key" class="page-login-tab-item pd-y8" :class="{'page-login-tab-item--active': item.key === loginType}"><span @click.stop="onClickChangeType(item.key)">{{item.name}}</span></li>
          </ul>
          <login-mobile v-show="loginType==='mobilefind'"></login-mobile>
          <div v-show="loginType==='emailfind'">邮件找回表单</div>
          <a-button @click="onClickBack">返回</a-button>
        </div>
        <!-- <div v-else-if="loginType==='weibo' || loginType==='qq' || loginType==='alipay' || loginType==='wechat'" class="page-login-wechat">
          <ul class="page-login-tabs mg-b24">
            <li  class="page-login-tab-item page-login-tab-item-wechat pd-y8"><span>{{typeNames[loginType]}}</span></li>
          </ul>
          <login-third @back="loginType = 'user'"></login-third>
        </div> -->
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
      typeNames: { weibo: '微博登录', qq: 'qq登录', alipay: '支付宝登录', wechat: '微信登录' },
      findPasswordTypes: [{ key: 'mobilefind', name: '手机找回' }, { key: 'emailfind', name: '邮件找回' }],
      loginTypes: [{ key: 'user', name: '用户密码登录' }, { key: 'mobile', name: '手机动态密码登录' }]
    }
  },
  components: {
    LoginMobile: mobile,
    LoginUser: user
  },
  rxState() {
    return {
      loading: this.loginService.loading$
    }
  },
  methods: {
    onClickChangeType(key) {
      this.loginType = key
    },
    onFindPassword() {
      this.loginType = 'mobilefind'
    },
    onThird(type) {
      console.log(type)
      this.loginType = type
    },
    onClickBack() {
      console.log('sss')
      this.loginType = 'user'
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
