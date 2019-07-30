<template>
  <st-modal
    title="购买短信"
    :class="bPage()"
    v-model="show"
    @ok="save"
    width="548px"
    @cancel="cancel"
    :confirmLoading="loading.update"
  >
    <div
      class="modal-sms-pay-setting__count"
      :class="curCount === index?'modal-sms-pay-setting__count--active':''"
      v-for="(item,index) in info.price_setting"
      :key="index"
      @click="getCurPayInfo(item,index)"
    >
      <div :class="bPage('specify')">
        <span :class="bPage('total-money')">{{item.pay_price.value}}{{item.pay_price.name}}</span>
        <span :class="bPage('single-price')">{{info.single_price.value}}{{info.single_price.name}}</span>
      </div>
      <span class="total-num">{{item.num.value}}{{item.num.name}}</span>
    </div>
    <div :class="bPage('payway')">
      <div
        class="mg-r8 modal-sms-pay-setting__payway-item"
        :class="curChannel === index?'modal-sms-pay-setting__payway-item--active':''"
        v-for="(item,index) in info.publish_channel"
        :key="index"
        @click="getCurPayWay(item,index)"
      >
        <st-icon type="alipay" size="22px" v-if="item.value === 1" color="#009FE8"></st-icon>
        <st-icon type="wechat" size="22px" v-if="item.value === 2" color="#46BB36"></st-icon>
        <span class="mg-l16">{{item.name}}</span>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { SmsPayService } from './setting-sms-pay.service'

export default {
  bem: {
    bPage: 'modal-sms-pay-setting'
  },
  serviceInject() {
    return {
      SmsPayService: SmsPayService
    }
  },
  rxState() {
    return {
      loading: this.SmsPayService.loading$
    }
  },
  data() {
    return {
      show: false,
      curCount: 0,
      curChannel: 0,
      info: {},
      query: {
        sms_num: 0,
        pay_price: '',
        pay_channel: 1
      }
    }
  },
  created() {
    this.SmsPayService.getSmsPayDetail().subscribe(res => {
      this.info = res
      this.query.sms_num = this.info.price_setting[0].num.value
      this.query.pay_price = this.info.price_setting[0].pay_price.value
      this.query.pay_channel = this.info.publish_channel[0].value
    })
  },
  methods: {
    cancel() {
      this.show = false
    },
    save() {
      this.$emit('change', this.query)
      this.show = false
    },
    getCurPayInfo(para, index) {
      this.curCount = index
      this.query.sms_num = para.num.value
      this.query.pay_price = para.pay_price.value
    },
    getCurPayWay(para, index) {
      this.curChannel = index
      this.query.pay_channel = para.value
    }
  }
}
</script>
