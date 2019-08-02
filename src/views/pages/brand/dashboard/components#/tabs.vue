<template>
  <div class="page-dashboard-analysis">
    <a-tabs :defaultActiveKey="key">
      <a-tab-pane key="user">
        <template slot="tab">
          用户分析
          <slot name="userTitle"></slot>
        </template>
        <slot name="user"></slot>
      </a-tab-pane>
      <a-tab-pane key="marketing" forceRender>
        <template slot="tab">
          营销分析
          <slot name="marketingTitle"></slot>
        </template>
        <slot name="marketing"></slot>
      </a-tab-pane>
    </a-tabs>
    <div class="action">
      <div class="mg-r16">
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashboardTabs',
  data() {
    return {
      key: 'user'
    }
  },
  methods: {
    recentChange(query) {
      this.$emit('change', query)
    }
  }
}
</script>
