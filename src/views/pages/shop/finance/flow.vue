<template>
  <st-panel app :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        placeholder="请输入流水号或订单号查找"
        v-model="query.search_number"
        @search="onKeywordsSearch('search_number', $event)"
        style="width: 290px;"
      />
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { FlowService } from './flow.service'
import tableMixin from '@/mixins/table.mixin'
import { RouteService } from '../../../../services/route.service'

export default {
  name: 'FinanceFlow',
  mixins: [tableMixin],
  serviceInject() {
    return {
      flowService: FlowService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      authTabs: this.flowService.authTabs$,
      query: this.routeService.query$
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  components: {}
}
</script>
