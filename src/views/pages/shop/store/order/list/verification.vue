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
    return { RowTableService: RowTableService }
  },
  methods: {
    // 核销订单
    confirm(val) {
      this.RowTableService.verificationGood({ id: val.id }).subscribe(res => {
        this.$router.reload()
      })
    },
    // 获取核销订单列表
    getListData() {
      this.RowTableService.getList(this.$searchQuery).subscribe()
    }
  },
  mounted() {
    this.getListData()
  }
}
</script>
