<template>
  <st-modal title="查看应用员工" v-model="show" :footer="null">
    <st-table
      :rowKey="record => record.mobile"
      :columns="columns"
      :dataSource="salaryUsedList"
      :page="salaryUsedPage"
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
      salaryUsedList: this.service.salaryUsedList$,
      salaryUsedPage: this.service.salaryUsedPage$
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
      }
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
      this.service.getSalaryUsedList(this.id, { page, size }).subscribe()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
