<template>
  <div class="time-picker-item" @mousedown="onMounseDown" @mouseenter="onMouseEnter" :class="{'active': isActive}">
    <span v-if="start" class="start">{{time}}st</span>
    <span v-if="end"  class="end">{{time}}end</span>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      isActive: false,
      a: false
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
    onMouseEnter() {
      if (!this.isDrag) return
      this.isActive = this.isEnter
    }
  }
}
</script>

<style lang="less" scoped>
  .time-picker-item{
    width: 100px;
    height: 6px;
    background-color: #f5f5f5;
    transition: background-color 0.3s;
    position: relative;
  }
  .start,
  .end{
    position: absolute;
    top: 0;
    right: 0;
    &:before{
      content: '';
      position: absolute;
      margin-left: 14px;
      margin-top: -5px;
      width: 14px;
      height: 14px;
      cursor: pointer;
      border-radius: 50%;
      border: solid 2px #6b90ff;
      background-color: #fff;
      box-shadow: 0;
      transition: border-color 0.3s, box-shadow 0.6s, transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)
    }
  }
  .a{
    color: #fff
  }
  .active{
    background: #6b90ff;
  }
</style>
