<template>
  <div class="stat-marketing-dashboard">
    <div class="stat-marketing-dashboard__placeholder">
      <div class="stat-marketing-dashboard__name">{{ data.name }}</div>
      <div class="stat-marketing-dashboard__percent">
        {{ (percent * 100).toFixed(2) }}%
      </div>
    </div>
    <svg
      :width="width"
      :height="width"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient id="cursor-color" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0" stop-color="#3F66F6"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
      <g class="g-circle">
        <circle
          class="back-circle"
          cx="50"
          cy="50"
          :r="radius"
          :stroke-dasharray="arcPerimeter"
          :stroke-dashoffset="arcDashOffset"
          :stroke-width="radiusStrokeWidth"
          fill="none"
          stroke="#E6E9EF"
        ></circle>
        <circle
          class="fore-circle"
          cx="50"
          cy="50"
          :r="radius"
          :style="foreCircleStyle"
          :stroke-dashoffset="arcDashOffset"
          :stroke-width="radiusStrokeWidth"
          fill="none"
          stroke="#3F66F6"
        ></circle>
      </g>
      <path
        class="cursor"
        :style="cursorStyle"
        d="M50,52 L90,50.5 v-1 L50,48 Z"
        fill="url(#cursor-color)"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @example
     * {name:'转化率',percent:0.5}
     */
    data: {
      type: Object,
      default: () => ({
        name: '转化率',
        percent: 0.5
      })
    },
    width: {
      type: Number,
      default: 180
    },
    // 半径比例
    ratio: {
      type: Number,
      default: 0.92
    },
    startAngel: {
      type: Number,
      default: (-9 / 8) * Math.PI
    },
    endAngel: {
      type: Number,
      default: (1 / 8) * Math.PI
    }
  },
  computed: {
    percent() {
      if (typeof this.data.percent !== 'number') {
        return 0
      }
      let _p = +this.data.percent
      if (_p > 1) {
        _p = 1
      }
      if (_p < 0) {
        _p = 0
      }
      return _p
    },
    radius() {
      return (this.ratio * 100) / 2
    },
    radiusStrokeWidth() {
      return (50 - this.radius) * 2
    },
    // 圆的周长
    perimeter() {
      return Math.round(Math.PI * this.radius * 2)
    },
    // 弧线的长度 单位px
    arcPerimeter() {
      return (
        ((this.endAngel - this.startAngel) / (2 * Math.PI)) * this.perimeter
      )
    },
    arcDashOffset() {
      return -(this.perimeter - this.arcPerimeter) / 2
    },
    cursorBaseRotateDeg() {
      return (
        (this.startAngel + (this.endAngel - this.startAngel) * this.percent) *
        (180 / Math.PI)
      )
    },
    cursorStyle() {
      return {
        transform: `rotate(${this.cursorBaseRotateDeg}deg)`
      }
    },
    foreCircleStyle() {
      return {
        strokeDasharray: `${this.arcPerimeter * this.percent} 1000`
      }
    }
  }
}
</script>

<style lang="less">
.stat-marketing-dashboard {
  display: inline-block;
  position: relative;
  &__placeholder {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    text-align: center;
  }
  &__name {
    color: #3e4d5c;
    font-size: 14px;
    line-height: 22px;
  }
  &__percent {
    font-size: 24px;
    color: #252a2e;
    line-height: 32px;
  }
  .g-circle {
    transform-origin: center;
    transform: rotate(90deg);
  }
  .fore-circle {
    transition: all 0.5s;
  }
  .cursor {
    transform-origin: center;
    transition: all 0.5s;
  }
}
</style>
