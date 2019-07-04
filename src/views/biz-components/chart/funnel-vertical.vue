<template>
  <div :class="b()" :style="chartStyle">
    <div v-for="(item,idx) in data" :key="item.name" :class="b('item')">
      <div :class="b('item-before')" :style="triStyle"></div>
      <div :class="b('text')">
        <span :class="b('name')">{{item.name}}</span>
        <span :class="b('value')">{{item.value}}</span>
      </div>
      <div v-if="idx>0" :class="b('percent')">{{getPercent(item.value)}}%</div>
      <div :class="b('item-after')" :style="triStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunnelVertical',
  props: {
    height: {
      type: Number,
      default: 400
    },
    /**
     * @example
     * [{name: 'dd', value: 66}]
     */
    data: {
      type: Array,
      default: () => []
    }
  },
  bem: {
    b: 'st-funnel-vertical'
  },
  computed: {
    maxValue() {
      return Math.max(...this.data.map(item => item.value))
    },
    dataCount() {
      return this.data.length
    },
    chartStyle() {
      return {
        height: `${this.height}px`
      }
    },
    triStyle() {
      return {
        borderBottom: `${this.height / this.dataCount + 1}px solid white`
      }
    }
  },
  methods: {
    getPercent(v) {
      return ((v / this.maxValue) * 100).toFixed(1)
    }
  }
}
</script>
