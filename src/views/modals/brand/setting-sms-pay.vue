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
      :class="curIndex === index?'modal-sms-pay-setting__count--active':''"
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
    <div :class="bPage('payway')" >
      <div
        :class="bPage('payway-item')"
        class="mg-r8"
        v-for="(item,index) in info.publish_channel"
        :key="index"
        @click="getCurPayWay(item)"
      >
        <span>{{item.name}}</span>
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
      curIndex: 0,
      info: {},
      query: {
        sms_num: 0,
        pay_price: '',
        pay_channel: 0
      }
    }
  },
  created() {
    this.SmsPayService.getSmsPayDetail().subscribe(res => {
      this.info = res
    })
  },
  methods: {
    cancel() {
      this.show = false
    },
    save() {
      this.SmsPayService.postSmsPay({ ...this.query }).subscribe(res => {})
    },
    getCurPayInfo(para, index) {
      this.curIndex = index
      this.query.sms_num = para.num.value
      this.query.pay_price = para.pay_price.value
    },
    getCurPayWay(para) {
      this.query.pay_channel = para.value
    }
  }
}
</script>
