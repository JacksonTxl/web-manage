<template>
  <div>
    <portal to="SHOP_STORE_ORDER_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.search_where"
        @search="getListData(1)"
        placeholder="请输入订单编号、会员姓名或手机号查找"
        maxlength="50"
      />
    </portal>
    <row-table :columns="columns" :type="3"></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './signin.config'
import { RowTableService } from '../components#/row-table.service'
export default {
  name: 'signin',
  components: {
    RowTable
  },
  serviceInject() {
    return { rowTableService: RowTableService }
  },
  methods: {
    // 获取签收订单列表
    getListData(page) {
      if (page === 1) {
        this.$searchQuery.current_page = page
      }
      this.rowTableService.getLogisticsList(this.$searchQuery).subscribe()
    }
  },
  mounted() {
    this.getListData()
  },
  computed: {
    columns
  }
}
</script>
