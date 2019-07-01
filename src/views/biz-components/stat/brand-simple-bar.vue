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
      return `${Math.ceil(this.percent * 100)}%`
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

<style lang="less">
.stat-brand-simple-bar {
  position: relative;
  height: 8px;
  background-color: #e2effe;
  &__inner {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #58cc99;
    transition: all 1s;
    cursor: pointer;
    &:hover .st-chart-bar-single__tooltip {
      opacity: 1;
    }
    &:before,
    &:after {
      content: '';
      background-color: #58cc99;
      width: 2px;
      height: 4px;
      position: absolute;
      right: 0;
      margin-left: 1px;
    }
    &:before {
      top: -5px;
    }
    &:after {
      bottom: -5px;
    }
  }
  &__tooltip {
    position: absolute;
    background-color: #58cc99;
    padding: 0 8px;
    line-height: 20px;
    white-space: nowrap;
    right: 0;
    bottom: 8px;
    margin-bottom: 8px;
    transition: all 0.3s;
    opacity: 1;
  }
  &__tooltip-value {
    color: #fff;
    font-size: 12px;
  }
}
</style>
