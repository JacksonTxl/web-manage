<template>
  <st-modal
    title="微信支付配置信息"
    size="small"
    class="modal-wechat-pament-setting"
    v-model="show"
    @ok="save"
    @cancel="cancel"
  >
    <div>
      <p>
        <span style="color:rgba(37,42,46,1)">微信商户名称：</span>
        {{ info.mch_name }}
      </p>
      <p>
        <span style="color:rgba(37,42,46,1)">微信商户号：</span>
        {{ info.mch_id }}
      </p>
      <p>
        <span style="color:rgba(37,42,46,1)">appid：</span>
        {{ info.appid }}
      </p>
    </div>
    <div class="mch-tip">
      <p class="tip-title">说明:</p>
      <p class="tip-p">
        1.
        要使用小程序的微信支付功能，您需要登录微信公众平台的小程序账号，并进行独立的微信支付申请，详情查阅微信官方指引；
      </p>
      <p class="tip-p">2. 申请通过后，将对应支付配置信息填写完整即可；</p>
    </div>
    <template slot="footer">
      <st-button type="primary" @click="toSetMch">
        {{ params.mina_info.is_mch === 1 ? '重新配置' : '立即配置' }}
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { SettingMinaMchService } from './mch.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      settingService: SettingMinaMchService
    }
  },
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      info: {}
    }
  },
  created() {
    this.settingService.getInfo().subscribe(res => {
      this.info = res
    })
  },
  methods: {
    cancel() {
      this.show = false
    },
    save() {
      this.settingService.update({ ...this.info }).subscribe(() => {
        this.messageService.success({
          content: '提交成功'
        })
        this.show = false
        this.$emit('change')
      })
    },
    toSetMch() {
      this.show = false
      this.$router.push({
        path: '/brand/setting/mina/pay-config'
      })
    }
  }
}
</script>
