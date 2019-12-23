<template>
  <div :loading="loading.getList">
    <portal to="SHOP_STORE_ORDER_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.search_where"
        @search="onKeywordsSearch('search_where', $event)"
        placeholder="请输入订单编号、会员姓名或手机号查找"
        maxlength="50"
      />
    </portal>
    <row-table
      :columns="columns"
      :listData="tableData"
      actionText="核销"
      @clicks="confirm"
    ></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './verification.config'
import { VerificationService } from './verification.service'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'verification',
  components: {
    RowTable
  },
  mixins: [tableMixin],
  serviceInject() {
    return { VerificationService: VerificationService }
  },
  rxState() {
    return {
      tableData: this.VerificationService.list$,
      page: this.VerificationService.page$,
      loading: this.VerificationService.loading$
    }
  },
  computed: {
    columns
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    confirm(val) {
      this.VerificationService.verificationGood({ id: 1 }).subscribe(res => {
        this.$router.reload()
      })
    }
  },
  mounted() {
    this.VerificationService.getList().subscribe()
  }
}
</script>
