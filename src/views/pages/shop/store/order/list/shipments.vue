<template>
  <div :class="basic()">
    <portal to="SHOP_STORE_ORDER_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.search_where"
        @search="getListData"
        placeholder="请输入订单编号、会员姓名或手机号查找"
        maxlength="50"
      />
    </portal>
    <row-table
      :columns="columns"
      actionText="发货"
      @clicks="sendGoods"
    ></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './shipments.config'
import { RowTableService } from '../components#/row-table.service'
import StoreDeliverGood from '@/views/biz-modals/store/deliver-good'
export default {
  name: 'shipments',
  components: {
    RowTable
  },
  bem: {
    basic: 'page-order-shipments'
  },
  modals: {
    StoreDeliverGood
  },
  serviceInject() {
    return { RowTableService: RowTableService }
  },
  methods: {
    // 获取发货订单列表
    getListData() {
      this.RowTableService.getOrderList(this.$searchQuery).subscribe()
    },
    sendGoods(val) {
      console.log(val)
      this.$modalRouter.push({
        name: 'store-deliver-good',
        props: {
          id: val.is
        },
        on: {
          success: res => {
            this.$router.reload()
          }
        }
      })
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
