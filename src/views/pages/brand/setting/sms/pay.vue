<template>
  <div :class="bPage()">
    <div :class="bCount()">
      <div :class="bCount('preview')">
        <div :class="bCount('specify')">
          <span :class="bCount('text')">剩余短信(条)</span>
          <span :class="bCount('num')">{{info.sms_total}}</span>
          <st-button
            type="primary"
            v-modal-link="{
                name: 'brand-setting-sms-pay',
                on: {
                  change: postSmsPay
                }
              }"
          >去充值</st-button>
        </div>
        <div :class="bCount('specify')">
          <span :class="bCount('text')">已发送(条)</span>
          <span :class="bCount('num')">{{info.sms_sended}}</span>
        </div>
      </div>
      <SmsSign :signVal="info.sms_sign" @SmsSign="getSmsSign"></SmsSign>
    </div>
    <st-table
      :page="page"
      @change="onTableChange"
      :columns="columns"
      :dataSource="info.list"
      rowKey="id"
    ></st-table>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { PayService } from './pay.service'
import { columns } from './pay.config.ts'
import tableMixin from '@/mixins/table.mixin'
import SmsSign from './pay#/sign'
const pageName = 'page-setting-sms-pay'
export default {
  mixins: [tableMixin],
  name: 'SmsPay',
  bem: {
    bPage: pageName,
    bCount: `${pageName}-count`
  },
  serviceInject() {
    return {
      routeService: RouteService,
      payService: PayService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      page: this.payService.page$,
      info: this.payService.info$
    }
  },
  data() {
    return {
      isShowSmsSetting: true
    }
  },
  computed: {
    columns
  },
  components: {
    SmsSign
  },
  created() {

  },
  methods: {
    // 获取首页信息
    getSmsPayInfo() {
      return this.payService.getSmsPayInfo().subscribe()
    },
    onSelectShopComplete() {},
    // 短信签名
    postSmsSign(para) {
      return this.payService.postSmsSign({ sign: para }).subscribe(res => {
        this.getSmsPayInfo()
      })
    },
    getSmsSign(para) {
      this.postSmsSign(para)
    },
    // 短信购买
    postSmsPay(para) {
      return this.payService.postSmsPay({ ...para }).subscribe(res => {
        this.getSmsPayInfo()
      })
    }
  }
}
</script>
