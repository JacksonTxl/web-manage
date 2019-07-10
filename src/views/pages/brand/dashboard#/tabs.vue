
<template>
<div class="page-dashboard-analysis">
    <a-tabs :defaultActiveKey="key">
    <a-tab-pane key="user"><template slot="tab">用户分析<st-help-tooltip id="TBCDA005"></st-help-tooltip></template> <slot name="user"></slot>  </a-tab-pane>
    <a-tab-pane key="marketing" forceRender><template slot="tab">营销分析<st-help-tooltip id="TBCDA005"></st-help-tooltip></template><slot name="marketing"></slot></a-tab-pane>
  </a-tabs>
  <div class="action">
    <div class="mg-r16">
      <recent-radio-group @change="recentChange"></recent-radio-group>
    </div>
  </div>
</div>
</template>
<script>
import RecentRadioGroup from '@/views/pages/shop/dashboard#/recent-radio-group'
export default {
  name: 'DashboardTabs',
  data() {
    return {
      key: 'user'
    }
  },
  components: {
    RecentRadioGroup
  },
  methods: {
    recentChange(query) {
      this.$emit('change', query)
    }
  }
}
</script>
