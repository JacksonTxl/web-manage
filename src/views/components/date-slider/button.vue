<template>
  <div
    :class="sliderButton()"
    :style="wrapperStyle"
    ref="button"
    @mousedown="onMouseDown">
    <div :class="sliderButton('toolTip')">
      {{formatValue}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StSliderButton',
  bem: {
    sliderButton: 'st-slider-button'
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.value
    }
  },
  computed: {
    wrapperStyle() {
      return { left: this.currentPosition }
    },
    max() {
      return this.$parent.max
    },
    min() {
      return this.$parent.min
    },
    step() {
      return this.$parent.step
    },
    precision() {
      return this.$parent.precision
    },
    disable() {
      return this.$parent.disable
    },
    currentPosition() {
      return `${(this.value - this.min) / (this.max - this.min) * 100}%`
    },
    enableFormat() {
      // tipFormatter
      return this.$parent.tipFormatter instanceof Function
    },
    formatValue() {
      // 格式化后的tips数据
      return (this.enableFormat && this.$parent.tipFormatter(this.value)) || this.value
    }
  },
  watch: {
    dragging(val) {
      this.$parent.dragging = val
    }
  },
  mounted() {},
  methods: {
    onMouseDown(event) {
      if (this.disable) { event.preventDefault() }
      this.onDragStart(event)
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.onDragEnd)
      window.addEventListener('contextmenu', this.onDragEnd) // 右键点击时 进行
    },
    onDragging() {
      if (!this.disable && this.dragging) {
        this.isClick = false
        this.$parent.resetSize()
        let diff = 0
        this.currentX = event.clientX
        diff = (this.currentX - this.startX) / this.$parent.sliderSize * 100
        this.newPosition = this.startPosition + diff
        this.setPosition(this.newPosition)
      }
    },
    onDragStart(event) {
      if (this.disable) return
      this.dragging = true
      this.isClick = true
      this.startX = event.clientX
      this.startPosition = parseFloat(this.currentPosition)
      this.newPosition = this.startPosition
    },
    onDragEnd() {
      if (!this.disable && this.dragging) {
        setTimeout(() => {
          this.dragging = false
          if (!this.isClick) {
            this.setPosition(this.newPosition)
            this.$parent.emitChange()
          }
        }, 0)
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
        window.removeEventListener('contextmenu', this.onDragEnd)
      }
    },
    setPosition(newPosition) {
      if (newPosition === null || isNaN(newPosition)) return
      if (newPosition < 0) {
        newPosition = 0
      } else if (newPosition > 100) {
        newPosition = 100
      }
      const lengthPerStep = 100 / ((this.max - this.min) / this.step)
      const steps = Math.round(newPosition / lengthPerStep)
      let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min
      value = parseFloat(value.toFixed(this.precision))
      this.$emit('input', value)
      if (!this.dragging && this.value !== this.oldValue) {
        this.oldValue = this.value
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.onDragging)
    window.removeEventListener('mouseup', this.onDragEnd)
    window.removeEventListener('contextmenu', this.onDragEnd)
  }
}

</script>

<style scoped lang="scss">

</style>
