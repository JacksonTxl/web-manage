<template>
  <st-panel app initial :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        v-if="$searchQuery.product_type !== 4"
        placeholder="请输入商品名查找"
        v-model="$searchQuery.product_name"
        @search="onKeywordsSearch('product_name', $event)"
      />
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { TransactionService } from './transaction.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'SoldTransaction',
  mixins: [tableMixin],
  serviceInject() {
    return {
      transactionService: TransactionService
    }
  },
  rxState() {
    return {
      authTabs: this.transactionService.authTabs$
    }
  },
  computed: {
    isShowSearch() {
      return !this.authTabs.includes('shop-sold-transaction-store')
    }
  }
}
</script>
