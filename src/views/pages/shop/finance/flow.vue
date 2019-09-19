<template>
  <st-panel app :tabs="authTabs">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="query.keyword"
        @search="onKeywordsSearch('keyword', $event)"
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
