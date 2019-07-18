<template>
  <div class="stat-brand-simple-bar">
    <div class="stat-brand-simple-bar__inner" :style="barStyle">
      <div class="stat-brand-simple-bar__tooltip" :style="tooltipStyle">
        <span class="stat-brand-simple-bar__tooltip-value">{{data.name}}{{showPercent}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @example
     * {
     *  name:'会员占比’,
     * percent:0.6
     * }
     */
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    percent() {
      if (!this.data.percent) {
        return 0
      }
      let _p = +this.data.percent
      if (_p < 0) {
        _p = 0
      }
      if (_p > 1) {
        _p = 1
      }
      return _p
    },
    showPercent() {
      return `${this.percent * 100}%`
    },
    barStyle() {
      return {
        width: this.showPercent
      }
    },
    tooltipStyle() {
      let _x = '50%'
      if (this.percent < 0.2) {
        _x = '100%'
      }
      if (this.percent > 0.8) {
        _x = '0%'
      }
      return {
        transform: `translateX(${_x})`
      }
    }
  }
}
</script>
