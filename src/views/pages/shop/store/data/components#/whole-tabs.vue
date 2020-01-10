<template>
  <div :class="basic()">
    <a-tabs :defaultActiveKey="key">
      <a-tab-pane key="user">
        <template slot="tab">
          订单来源
          <slot name="userTitle"></slot>
        </template>
        <slot name="user"></slot>
      </a-tab-pane>
      <a-tab-pane key="marketing" forceRender>
        <template slot="tab">
          会员身份
          <slot name="marketingTitle"></slot>
        </template>
        <slot name="marketing"></slot>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  bem: {
    basic: 'shop-store-data-whole-tabls'
  },
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
