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
        <p>微信商户名称：{{info.mch_name}}</p>
        <p>微信商户号：{{info.mch_id}}</p>
        <p>appid：{{info.key}}</p>
    </div>
    <template slot="footer">
        <st-button type="primary" @click="toSetMch">重新配置</st-button>
    </template>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { SettingMinaMchService } from './setting-mina-mch.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      settingService: SettingMinaMchService
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
    toSetMch() {
      this.show = false
      this.$router.push({
        path: '/brand/setting/mina/pay-config'
      })
    }
  }
}
</script>
