<template>
  <section class="pd-24">
    <st-table
      :pagination="{
        current: query.page,
        total: page.total_counts,
        pageSize: query.size
      }"
      :columns="columns"
      @change="onPageChange"
      rowKey="key"
      :dataSource="stList"
    >
      <template slot="operation_time" slot-scope="text">
        {{ moment(text * 1000).format('YYYY-MM-DD HH:mm') }}
      </template>
    </st-table>
  </section>
</template>
<script>
import moment from 'moment'
import { OperationRecordService } from './operation-record.service'
import { RouteService } from '@/services/route.service'
const columns = [
  {
    title: '操作时间',
    dataIndex: 'operation_time',
    scopedSlots: { customRender: 'operation_time' }
  },
  {
    title: '操作内容',
    dataIndex: 'operation_content',
    scopedSlots: { customRender: 'operation_content' }
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    scopedSlots: { customRender: 'operator' }
  },
  {
    title: '备注',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' }
  }
]
export default {
  name: 'PageShopSoldCoursePackageInfoOperation',
  bem: {
    basic: 'page-shop-sold'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      operationRecordService: OperationRecordService
    }
  },
  rxState() {
    return {
      page: this.operationRecordService.page$,
      list: this.operationRecordService.list$,
      query: this.routeService.query$
    }
  },
  computed: {
    stList() {
      let array = []
      this.list.forEach(i => {
        let key = parseInt(Math.random() * 999999).toString()
        array.push({ ...i, key: key })
      })
      return array
    }
  },
  data() {
    return {
      columns
    }
  },
  methods: {
    moment,
    onPageChange(data) {
      this.$router.push({
        query: { ...this.query, page: data.current, size: data.pageSize }
      })
    }
  }
}
</script>
