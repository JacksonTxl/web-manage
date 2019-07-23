<template>
  <div :class="bPage()">
    <div :class="bHead()">
      <div :class="bHead('item')">
        <div :class="bHead('item-block')">
          <div :class="bHead('item-block-column')">
            <span :class="bHead('item-block-column-text')">剩余短信(条)</span>
            <span :class="bHead('item-block-column-num')">1212</span>
            <st-button type="primary">去充值</st-button>
          </div>
          <div :class="bHead('item-block-column')">
            <span :class="bHead('item-block-column-text')">已发送(条)</span>
            <span :class="bHead('item-block-column-num')">1212</span>
          </div>
        </div>
        <div :class="bHead('item-block')">
          <span>短信签名</span>
          <span class="color-primary mg-l8">去设置</span>
        </div>
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
import { IndexService } from './index.service'
import { columns } from './index.config.ts'
import tableMixin from '@/mixins/table.mixin'

const pageName = 'index'
export default {
  mixins: [tableMixin],
  name: 'Index',
  bem: {
    bPage: pageName,
    bHead: `${pageName}-head`
  },
  serviceInject() {
    return {
      routeService: RouteService,
      IndexService: IndexService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.IndexService.loading$,
      page: this.IndexService.page$
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
