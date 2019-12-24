<template>
  <div>
    <portal to="SHOP_STORE_ORDER_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.search_where"
        @search="getListData"
        placeholder="请输入订单编号、会员姓名或手机号查找"
        maxlength="50"
      />
    </portal>
    <row-table :columns="columns"></row-table>
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
    return { RowTableService: RowTableService }
  },
  methods: {
    // 获取签收订单列表
    getListData() {
      this.RowTableService.getOrderList(this.$searchQuery).subscribe()
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
