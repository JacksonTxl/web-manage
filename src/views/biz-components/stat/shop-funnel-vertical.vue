<template>
  <div :class="b()" :style="chartStyle">
    <div v-for="(item,idx) in dv" :key="item.name" :class="b('item')">
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
    b: 'st-shop-funnel-vertical'
  },
  computed: {
    dv() {
      return this.data.map(item => {
        item.value = +item.value
        return item
      })
    },
    maxValue() {
      return Math.max(...this.dv.map(item => item.value))
    },
    dataCount() {
      return this.dv.length
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
      if (!this.maxValue) {
        return 0
      }
      return ((v / this.maxValue) * 100).toFixed(0)
    }
  }
}
</script>
