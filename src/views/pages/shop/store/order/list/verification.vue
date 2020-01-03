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
    <row-table
      :columns="columns"
      actionText="核销"
      :type="1"
      @clicks="confirm"
    ></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './verification.config'
import { RowTableService } from '../components#/row-table.service'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'verification',
  components: {
    RowTable
  },
  mixins: [tableMixin],
  computed: {
    columns
  },
  serviceInject() {
    return { rowTableService: RowTableService }
  },
  methods: {
    // 核销订单
    confirm(val) {
      this.rowTableService.verificationGood({ id: val.id }).subscribe(res => {
        this.getListData()
      })
    },
    // 获取核销订单列表
    getListData(page) {
      if (page === 1) {
        this.$searchQuery.current_page = page
      }
      this.rowTableService.getList(this.$searchQuery).subscribe()
    }
  },
  mounted() {
    this.getListData()
  }
}
</script>
