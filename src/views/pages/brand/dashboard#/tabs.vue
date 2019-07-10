
<template>
<div class="page-dashboard-analysis">
    <a-tabs :defaultActiveKey="key">
    <a-tab-pane tab="用户分析" key="user"> <slot name="user"></slot>  </a-tab-pane>
    <a-tab-pane tab="营销分析" key="marketing" forceRender><slot name="marketing"></slot></a-tab-pane>
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
