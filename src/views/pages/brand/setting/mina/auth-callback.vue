<template>
  <div :class="callback()">
    <st-panel>
      <div v-if="msgType === 'success'" :class="callback('shadowbox')">
        <img src="~@/assets/img/icon_setting_success.png" />
        <st-t3>小程序授权成功！</st-t3>
        <p class="ta-c">点击确认继续完成小程序配置</p>
        <st-button pill type="primary" size="large" @click="setPay">
          确 认
        </st-button>
      </div>
      <div v-if="msgType === 'failure'" :class="callback('shadowbox')">
        <img src="~@/assets/img/icon_setting_failure.png" />
        <st-t3>小程序授权失败！</st-t3>
        <p class="ta-c">失败原因：{{ reason }}</p>
        <a :href="info.auth_url">
          <st-button pill type="primary" size="large">重新授权</st-button>
        </a>
      </div>
      <p v-if="msgType === 'failure'" class="ta-c">
        如有疑问请拨打
        <br />
        三体云动技术中心：021-7362517
      </p>
      <div v-if="msgType === 'payConfig'" :class="callback('shadowbox')">
        <img src="~@/assets/img/icon_setting_success.png" />
        <st-t3>提交成功</st-t3>
        <p>
          恭喜您完成小程序授权及支付配置，现在您可以去设置专属您的小程序了！
        </p>
        <st-button pill type="primary" size="large" @click="back">
          完 成
        </st-button>
      </div>
    </st-panel>
  </div>
</template>
<script>
import { AuthCallbackService } from './auth-callback.service'
import { IndexService } from './index.service'
export default {
  serviceInject() {
    return {
      authCallbackService: AuthCallbackService,
      indexService: IndexService
    }
  },
  rxState() {
    return {
      info: this.indexService.info$
    }
  },
  bem: {
    callback: 'brand-setting-mina-auth-callback'
  },
  data() {
    return {
      msgType: ''
    }
  },
  created() {
    let query = this.$route.query
    if (query.type) {
      this.msgType = query.type
    } else {
      this.getResult(query)
    }
  },
  methods: {
    setPay() {
      this.$router.push({
        path: '/brand/setting/mina/pay-config'
      })
    },
    back() {
      this.$router.push({
        path: '/brand/setting/mina/index'
      })
    },
    getResult(query) {
      this.authCallbackService.callback(query).subscribe(res => {
        if (res.is_success === 1) {
          this.msgType = 'success'
        } else {
          this.msgType = 'failure'
          this.reason = res.message
        }
      })
    }
  }
}
</script>
