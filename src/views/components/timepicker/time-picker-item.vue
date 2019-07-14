<template>
  <div class="st-time-picker-item" @mousedown="onMounseDown" @mousemove="mouseMove" @mouseUp="onMouseUp" :class="{'active': isActive}">
    <span v-if="start" class="start">{{time | filterTime}}</span>
    <span v-if="end"  class="end">{{time | filterTime}}</span>
  </div>
</template>

<script>
export default {
  name: 'item',
  data(vm) {
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
    checkArr: {
      type: Array,
      default: () => []
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
    checkArr(n, o) {
      this.isActive = n[this.time]
    },
    isActive(n, o) {
      this.$emit('change', { time: this.time, isActive: n })
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

</style>
