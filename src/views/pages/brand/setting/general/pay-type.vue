<template>
  <st-panel v-if="info">
    <st-t2>配置支付方式</st-t2>
    <div class="mg-t24" v-for="(item, index) in payTypeDes" :key="index">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">{{item.name}}</st-t4>
          <div class="st-des mg-t4">{{item.content}}</div>
        </a-col>
        <a-col :span="4" class="ta-r" v-if="index!==0">
          <a-switch :checked="!!info[item.key].is_enable" @change="onSwitchChange(item.key)"/>
        </a-col>
      </a-row>
      <st-container v-if="index===0" type="2" class="bg-gray mg-t16">
        <a-row>
          <a-col :span="20">
            <a-row :gutter="24">
              <a-col :span="8">
                微信商户名称：xxx
              </a-col>
              <a-col :span="8">
                微信商户号：xxx
              </a-col>
              <a-col :span="8">
                API密钥：xxxx
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="4" class="ta-r">
            <modal-link tag="a" :to="{ name:'brand-setting-wechat-payment' }">
              <st-icon type="edit"></st-icon>
              <span class="mg-l4 color-text-light">编辑</span>
            </modal-link>
          </a-col>
        </a-row>
      </st-container>
      <st-hr></st-hr>
    </div>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { PayTypeService } from './pay-type.service'
const payTypeDes = [{
  key: 1,
  name: '微信 [在线]',
  content: '品牌绑定“认证小程序”，开通小程序的“微信支付权限”，并完成支付参数配置，配置后支持用户在用户端完成商品的购买。'
}, {
  key: 2,
  name: '微信 [线下]',
  content: '门店可以通过下线微信收款二维码进行收款，收款记录标记为微信[线下]（仅针对线下收银）。'
}, {
  key: 3,
  name: '支付宝[线下]',
  content: '门店可以通过下线支付宝收款二维码进行收款，收款记录标记为支付宝[线下]（仅针对线下收银）。'
}, {
  key: 4,
  name: 'POS机刷卡[线下]',
  content: '门店可以通过线下POS机进行收款，收款记录标记为POS机刷卡[线下]（仅针对线下收银）。'
}, {
  key: 5,
  name: '银行转账',
  content: '支持用户以转账的形式转入品牌或门店账户，收款记录标记为银行转账[线下]（仅针对线下收银）。'
}, {
  key: 6,
  name: '现金',
  content: '门店可以收取现金进行收款，收款记录标记为现金（仅针对线下收银）。'
}, {
  key: 7,
  name: '其它',
  content: '当品牌有和其它支付形式有合作时，统一标记为其它（仅针对线下收银）。'
}]
export default {
  serviceInject() {
    return {
      userService: UserService,
      payTypeService: PayTypeService
    }
  },
  rxState() {
    const payTypeService = this.payTypeService
    return {
      loading: payTypeService.loading$,
      info: payTypeService.resData$
    }
  },
  data() {
    return {
      payTypeDes
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.payTypeService.getInfo().subscribe()
    },
    onSwitchChange(key) {
      const info = this.info
      const { id, is_enable, payment_type } = this.info[key]
      this.payTypeService.update({
        id,
        is_enable: +!is_enable,
        payment_type
      }).subscribe(this.getInfo)
    }
  }
}
</script>
