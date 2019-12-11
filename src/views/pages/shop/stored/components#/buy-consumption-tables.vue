<template>
  <div :class="basic()">
    <a-tabs :defaultActiveKey="key">
      <a-tab-pane key="user">
        <template slot="tab">
          购买次数
          <slot name="userTitle"></slot>
        </template>
        <slot name="user"></slot>
      </a-tab-pane>
      <a-tab-pane key="marketing" forceRender>
        <template slot="tab">
          消费金额
          <slot name="marketingTitle"></slot>
        </template>
        <slot name="marketing"></slot>
      </a-tab-pane>
    </a-tabs>
    <div class="action">
      <div class="mg-r16">
        <DatePicker></DatePicker>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from './date-picker'

export default {
  bem: {
    basic: 'shop-stored-data-buy-consumption-tables'
  },
  components: {
    DatePicker
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
