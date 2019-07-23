<template>
  <div :class="basic()">
    <a-radio-group @change="onChange" v-model="value">
      <a-radio-button value="brand">品牌</a-radio-button>
      <a-radio-button value="shop">门店</a-radio-button>
    </a-radio-group>
    <a-select defaultValue="lucy" style="width: 106px" @change="handleChange">
      <a-select-option value="jack">全部</a-select-option>
      <a-select-option value="lucy1">Lucy1</a-select-option>
      <a-select-option value="lucy2">Lucy32</a-select-option>
      <a-select-option value="lucy3">Lucy3</a-select-option>
      <a-select-option value="lucy4">Lucy4</a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: 'StatisticsBrandShop',
  bem: {
    basic: 'brand-statistics-brand-shop'
  },
  data() {
    return {
      value: 'brand'
    }
  },
  methods: {
    recentChange(query) {
      this.$emit('change', query)
    },
    onChange(event) {
      this.$emit('change', event)
    },
    handleChange(event) {
      this.$emit('change', event)
    }
  },
  components: {
  }
}
</script>
