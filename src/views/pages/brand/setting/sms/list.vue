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
import { ListService } from './list.service'
import { columns } from './list.config.ts'
import tableMixin from '@/mixins/table.mixin'

const pageName = 'page-setting-sms-list'
export default {
  mixins: [tableMixin],
  name: 'SmsList',
  bem: {
    bPage: pageName,
    bCount: `${pageName}-count`
  },
  serviceInject() {
    return {
      routeService: RouteService,
      ListService: ListService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.ListService.loading$,
      page: this.ListService.page$
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
