<template>
  <div class="time-picker-item" @mousedown="onMounseDown" @mouseenter="mouseMove" @mouseUp="onMouseUp" :class="{'active': isActive}">
    <span v-if="start" class="start">{{time | filterTime}}</span>
    <span v-if="end"  class="end">{{time | filterTime}}</span>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      isActive: false,
      tempValue: false
    }
  },
  props: {
    time: {
      type: Number,
      default: 0
    },
    isDrag: {
      type: Boolean,
      default: false
    },
    isEnter: {
      type: Boolean,
      default: false
    },
    views: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    filterTime(val) {
      return val < 10 ? `0${val}:00` : `${val}:00`
    }
  },
  watch: {
    isActive(n, o) {
      this.$emit('change', { time: this.time, isActive: this.isActive })
    }
  },
  computed: {
    start() {
      let val = false
      this.views.forEach(ele => {
        ele.includes('#' + this.time + '#start') && (val = ele.includes('#' + this.time + '#start'))
      })
      return val
    },
    end() {
      let val = false
      this.views.forEach(ele => {
        ele.includes('--#' + this.time + '#end') && (val = ele.includes('--#' + this.time + '#end'))
      })
      return val
    }
  },
  methods: {
    onMounseDown() {
      this.isActive = !this.isActive
      this.$emit('down', this.isActive)
    },
    mouseMove() {
      if (!this.isDrag) return
      this.isActive = this.isEnter
    },
    onMouseUp() {
      this.isActive = this.isEnter
    }
  }
}
</script>

<style lang="less" scoped>
  .time-picker-item{
    width: 100px;
    height: 24px;
    background-color: #f5f5f5;
    transition: background-color 0.3s;
    position: relative;
    &:first-child{
      background-color: #fff;
    }
  }
  .start,
  .end{
    position: absolute;
    top: 0;
    color: #f5f5f5;
    background: #666;
    border-radius: 4px;
    font-size: 12px;
    padding: 2px;
  }
  .start{
    top: 26px;
    right: -20px;
  }
  .end{
    top: -26px;
    right: -20px
  }
  .active{
    background: #6b90ff;
  }
</style>
