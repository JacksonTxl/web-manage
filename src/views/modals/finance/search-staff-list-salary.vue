<template>
  <st-modal title="查看应用员工" v-model="show" :footer="null">
    <st-table
      :rowKey="record => record.mobile"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      @change="handleTableChange"
    />
  </st-modal>
</template>
<script>
import { SearchStaffListService } from './search-staff-list.service'
export default {
  serviceInject() {
    return {
      service: SearchStaffListService
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
      data: [],
      columns: [
        {
          title: '员工姓名',
          dataIndex: 'staff_name',
          key: 'staff_name'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex'
        },
        {
          title: '工号',
          dataIndex: 'staff_num',
          key: 'staff_num'
        },
        {
          title: '所属部门',
          dataIndex: 'department_name',
          key: 'department_name'
        }
      ]
    }
  },
  methods: {
    handleTableChange(e) {
      console.log(e)
      let { current, pageSize } = e
      this.getList(current, pageSize)
    },
    getList(page = 1, size = 20) {
      this.service.getSalaryUsedList(this.id, { page, size }).subscribe(res => {
        //   console.log('====',res)
        this.data = res.list.list
        this.pagination.current = res.list.page.current_page
        this.pagination.pageSize = res.list.page.size
        this.pagination.total = res.list.page.total_counts
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
