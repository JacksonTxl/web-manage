<template>
  <st-modal
    title="微信支付配置"
    size="small"
    class="modal-wechat-pament-setting"
    v-model="show"
    @ok="save"
    @cancel="cancel"
    :confirmLoading="loading.update"
  >
    <st-form labelWidth="100px">
      <st-form-item label="微信商户名称" required>
        <a-input placeholder="请输入微信商户名称" v-model="info.wechat_account_name"></a-input>
      </st-form-item>
      <st-form-item label="微信商户号" required>
        <a-input placeholder="请输入微信商户号" v-model="info.wechat_account_num"></a-input>
      </st-form-item>
      <st-form-item label="API密钥" required>
        <a-input placeholder="请输入API密钥" v-model="info.wechat_api_key"></a-input>
        <div><a href="#" class="st-des mg-t16">如何配置微信支付?</a></div>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { WechatPaymentSettingService } from './setting-wechat-payment.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      settingService: WechatPaymentSettingService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.settingService.loading$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
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
      if (!this.inputCheck()) {
        return
      }
      this.settingService.update({ ...this.info }).subscribe(
        () => {
          this.messageService.success({
            content: '提交成功'
          })
          this.show = false
          this.$emit('change')
        }
      )
    },
    inputCheck() {
      const { info } = this
      const name = info.wechat_account_name
      const num = info.wechat_account_num
      const api = info.wechat_api_key
      if (!name.length) {
        this.tip('请输入微信商户名称')
        return false
      }
      if (!num.length) {
        this.tip('请输入微信商户号')
        return false
      }
      if (!api.length) {
        this.tip('请输入API密钥')
        return false
      }
      return true
    },
    tip(msg) {
      this.messageService.error({
        content: msg
      })
    }
  }
}
</script>
