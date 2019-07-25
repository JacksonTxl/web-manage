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
                  change: onSelectShopComplete
                }
              }"
          >去充值</st-button>
        </div>
        <div :class="bCount('specify')">
          <span :class="bCount('text')">已发送(条)</span>
          <span :class="bCount('num')">{{info.sms_sended}}</span>
        </div>
      </div>
      <div :class="bCount('setting')">
        <div>[短信签名]</div>
        <a-input class="mg-t8 mg-b8" :value="info.sms_sign" placeholder="请设置短信签名" />
        <div class="ta-r">
          <span class="mg-r8 color-primary">取消</span>
          <span class="color-primary">保存</span>
        </div>
      </div>
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
      PayService: PayService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      page: this.PayService.page$,
      info: this.PayService.info$
    }
  },
  data() {
    return {
      resData: {
        list: [
          {
            id: '11'
          }
        ]
      }
    }
  },
  computed: {
    columns
  },
  methods: {
    getInfo() {},
    onSelectShopComplete() {}
  }
}
</script>
