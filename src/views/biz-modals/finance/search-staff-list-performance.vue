<template>
  <st-modal title="查看应用员工" v-model="show" :footer="null">
    <st-table
      :rowKey="record => record.mobile"
      :columns="columns"
      :dataSource="list"
      :page="page"
      @change="handleTableChange"
    />
  </st-modal>
</template>
<script>
import { SearchStaffListService } from './search-staff-list.service'
import { columns } from './columns.config'
export default {
  serviceInject() {
    return {
      service: SearchStaffListService
    }
  },
  rxState() {
    return {
      list: this.service.list$,
      page: this.service.page$
    }
  },
  props: {
    id: Number
  },
  data() {
    return {
      show: false,
      pagination: {
        hideOnSinglePage: true
      },
      list: []
    }
  },
  computed: {
    columns
  },
  methods: {
    handleTableChange(e) {
      let { current, pageSize } = e
      this.getList(current, pageSize)
    },
    getList(page = 1, size = 20) {
      this.service.getPerformanceUsedList(this.id, { page, size }).subscribe()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
