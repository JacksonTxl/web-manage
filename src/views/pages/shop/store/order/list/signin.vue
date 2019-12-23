<template>
  <div>
    <portal to="SHOP_STORE_ORDER_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.search_where"
        @search="onKeywordsSearch('search_where', $event)"
        placeholder="请输入订单编号、会员姓名或手机号查找"
        maxlength="50"
      />
    </portal>
    <row-table :columns="columns" :listData="tableData"></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './signin.config'
import { SigninService } from './signin.service'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'signin',
  components: {
    RowTable
  },
  mixins: [tableMixin],
  serviceInject() {
    return { SigninService: SigninService }
  },
  rxState() {
    return {
      tableData: this.SigninService.list$,
      page: this.SigninService.page$,
      loading: this.SigninService.loading$
    }
  },
  computed: {
    columns
  },
  data() {
    return {
      name: ''
    }
  }
}
</script>
