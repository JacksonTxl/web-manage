<template>
  <div :class="bPage()">
    <div :class="bCount()">
      <div :class="bCount('preview')">
        <div :class="bCount('specify')">
          <span :class="bCount('text')">剩余短信(条)</span>
          <span :class="bCount('num')">1212</span>
          <st-button type="primary">去充值</st-button>
        </div>
        <div :class="bCount('specify')">
          <span :class="bCount('text')">已发送(条)</span>
          <span :class="bCount('num')">1212</span>
        </div>
      </div>
      <div :class="bCount('setting')">
        <span>短信签名</span>
        <span class="color-primary mg-l8">去设置</span>
      </div>
    </div>
    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getInfo"
      :columns="columns"
      :dataSource="resData.list"
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
      loading: this.PayService.loading$,
      page: this.PayService.page$
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
    getInfo() {}
  }
}
</script>
