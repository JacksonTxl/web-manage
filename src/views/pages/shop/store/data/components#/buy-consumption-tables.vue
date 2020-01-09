<template>
  <div :class="basic()">
    <a-tabs :defaultActiveKey="key" @change="recentChange">
      <a-tab-pane key="1">
        <template slot="tab">
          <div>购买次数</div>
          <slot name="userTitle"></slot>
        </template>
        <slot name="user"></slot>
      </a-tab-pane>
      <a-tab-pane key="2" forceRender>
        <template slot="tab">
          <div>消费金额</div>
          <slot name="marketingTitle"></slot>
        </template>
        <slot name="marketing"></slot>
      </a-tab-pane>
    </a-tabs>
    <div class="action">
      <div class="mg-r16">
        <date-picker @onChange="userAnalysis"></date-picker>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from './date-picker'

export default {
  bem: {
    basic: 'shop-store-data-buy-consumption-tables'
  },
  components: {
    DatePicker
  },
  data() {
    return {
      key: '1'
    }
  },
  methods: {
    recentChange(query) {
      this.$emit('change', Number(query))
    },
    userAnalysis(query) {
      this.$emit('onChange', query)
    }
  }
}
</script>
