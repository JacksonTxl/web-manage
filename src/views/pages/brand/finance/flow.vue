<template>
  <st-panel :class="b()" app initial :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        placeholder="请输入流水号或订单号查找"
        v-model="$searchQuery.search_number"
        @search="onKeywordsSearch('search_number', $event)"
      />
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { FlowService } from './flow.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'FinanceFlow',
  mixins: [tableMixin],
  bem: {
    b: 'page-brand-finance-flow'
  },
  serviceInject() {
    return {
      flowService: FlowService
    }
  },
  rxState() {
    return {
      authTabs: this.flowService.authTabs$
    }
  },
  data() {
    return {}
  }
}
</script>
