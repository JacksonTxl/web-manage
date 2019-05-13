<template>
  <st-panel v-if="info">
    <st-t2>配置支付方式</st-t2>
    <div class="mg-t24" v-for="(item, index) in payTypeDes" :key="index">
      <a-row class="align-items-center">
        <a-col :span="20">
          <st-t4 class="mg-t4">{{item.name}}</st-t4>
          <div class="st-des mg-t4">{{item.content}}</div>
        </a-col>
        <a-col :span="4" class="ta-r">
          <a-switch :checked="!!info[item.id].is_enable" @change="onSwitchChange(item.id)"/>
        </a-col>
      </a-row>
      <st-hr></st-hr>
    </div>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { PayTypeService } from './pay-type.service'
const payTypeDes = [{
  id: 1,
  name: '微信 [在线]',
  content: '品牌绑定“认证小程序”，开通小程序的“微信支付权限”，并完成支付参数配置，配置后支持用户在用户端完成商品的购买。'
}, {
  id: 2,
  name: '微信 [线下]',
  content: '门店可以通过下线微信收款二维码进行收款，收款记录标记为微信[线下]（仅针对线下收银）。'
}, {
  id: 3,
  name: '支付宝[线下]',
  content: '门店可以通过下线支付宝收款二维码进行收款，收款记录标记为支付宝[线下]（仅针对线下收银）。'
}, {
  id: 4,
  name: 'POS机刷卡[线下]',
  content: '门店可以通过线下POS机进行收款，收款记录标记为POS机刷卡[线下]（仅针对线下收银）。'
}, {
  id: 5,
  name: '银行转账',
  content: '支持用户以转账的形式转入品牌或门店账户，收款记录标记为银行转账[线下]（仅针对线下收银）。'
}, {
  id: 6,
  name: '现金',
  content: '门店可以收取现金进行收款，收款记录标记为现金（仅针对线下收银）。'
}, {
  id: 7,
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
    this.payTypeService.getInfo().subscribe()
  },
  methods: {
    onSwitchChange(id) {
      console.log(id, this.info[id])
      const isEnable = this.info[id].is_enable
      this.payTypeService.update({
        id,
        is_enable: isEnable
      }).subscribe()
      this.info[id].is_enable = +!isEnable
    }
  }
}
</script>
