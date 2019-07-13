<template>
  <div :class="StDateSlider()">
    <div :class="StDateSlider('way')" ref="slider" @click="onSliderClick">
      <div :class="StDateSlider('bar')" :style="sliderBarStyle"></div>
      <div :class="StDateSlider('range')" :style="rangeBarStyle" v-if="range"></div>
      <st-slider-button ref="firstButton" v-model="firstValue"></st-slider-button>
      <st-slider-button ref="secondButton" v-model="secondValue"></st-slider-button>
    </div>
  </div>
</template>

<script>
import StSliderButton from './button'
export default {
  name: 'StDateSlider',
  bem: {
    StDateSlider: 'st-date-slider'
  },
  components: { StSliderButton },
  props: {
    value: {
      type: [Number, Array],
      default: 0
    },
    tipFormatter: Function,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 24
    },
    step: {
      type: Number,
      default: 60
    },
    disable: {
      type: Boolean,
      default: false
    },
    rangeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dragging: false,
      firstValue: null,
      secondValue: null,
      oldValue: null
    }
  },
  computed: {
    precision() {
      let precisions = [this.min, this.max, this.step].map(item => {
        let decimal = ('' + item).split('.')[1]
        return decimal ? decimal.length : 0
      })
      return Math.max.apply(null, precisions)
    },
    minValue() {
      return Math.min(this.firstValue, this.secondValue)
    },
    maxValue() {
      return Math.max(this.firstValue, this.secondValue)
    },
    range() {
      return Array.isArray(this.rangeData) && this.rangeData.length
    },
    rangeFirst() {
      return this.rangeData[0]
    },
    rangeSecond() {
      return this.rangeData[1]
    },
    sliderBarSize() {
      return `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
    },
    sliderBarStart() {
      return `${100 * (this.minValue - this.min) / (this.max - this.min)}%`
    },
    sliderBarStyle() {
      return {
        left: this.sliderBarStart,
        width: this.sliderBarSize
      }
    },
    rangeBarSize() {
      return `${100 * (this.rangeSecond - this.rangeFirst) / (this.max - this.min)}%`
    },
    rangeBarStart() {
      return `${100 * (this.rangeFirst) / (this.max - this.min)}%`
    },
    rangeBarStyle() {
      return {
        left: this.rangeBarStart,
        width: this.rangeBarSize
      }
    }
  },
  watch: {
    value(val, oldVal) {
      console.log('value is updating', this.dragging, val, oldVal)
      if (this.dragging ||
        (Array.isArray(val) &&
        Array.isArray(oldVal) &&
        val.every((item, index) => item === oldVal[index]))) {
        return
      }
      this.setValues()
    },
    dragging(val) {
      if (!val) {
        console.log('dragging')
        this.setValues()
      }
    },
    firstValue(val) {
      this.$emit('input', [this.minValue, this.maxValue])
    },
    secondValue() {
      this.$emit('input', [this.minValue, this.maxValue])
    },
    min() {
      consol.log('min change')
      this.setValues()
    },
    max() {
      consol.log('max change')
      this.setValues()
    },
    rangeFirst() {
      consol.log('rangeFirst change')
      if (this.range) this.setValues()
    },
    rangeSecond() {
      consol.log('rangeSecond change')
      if (this.range) this.setValues()
    }
  },
  mounted() {
    // 确定首尾值
    if (Array.isArray(this.value) && !this.range) {
      this.firstValue = Math.max(this.min, this.value[0])
      this.secondValue = Math.min(this.max, this.value[1])
    } else {
      this.firstValue = Math.max(this.rangeFirst, this.value[0])
      this.secondValue = Math.min(this.rangeSecond, this.value[1])
    }
    this.oldValue = [this.firstValue, this.secondValue]
    window.addEventListener('resize', this.resetSize)
  },
  methods: {
    valueChanged() {
      return ![this.minValue, this.maxValue]
        .every((item, index) => item === this.oldValue[index])
    },
    setValues() {
      if (this.min > this.max) {
        return
      }
      const val = this.value
      if (!Array.isArray(val)) return false
      let min = this.range ? this.rangeFirst : this.min
      let max = this.range ? this.rangeSecond : this.max

      if (val[1] < min) {
        this.$emit('input', [min, min])
      } else if (val[0] > max) {
        this.$emit('input', [max, max])
      } else if (val[0] < min) {
        this.$emit('input', [min, val[1]])
      } else if (val[1] > max) {
        this.$emit('input', [val[0], max])
      } else {
        this.firstValue = val[0]
        this.secondValue = val[1]
        if (this.valueChanged()) {
          this.oldValue = val.slice()
        }
      }
    },
    setPosition(percent) {
      let min = this.range ? this.rangeFirst : this.min
      const targetValue = min + percent * (this.max - this.min) / 100
      let button
      if (Math.abs(this.minValue - targetValue) < Math.abs(this.maxValue - targetValue)) {
        button = this.firstValue < this.secondValue ? 'firstButton' : 'secondButton'
      } else {
        button = this.firstValue > this.secondValue ? 'firstButton' : 'secondButton'
      }
      this.$refs[button].setPosition(percent)
    },
    onSliderClick(event) {
      console.log(this.dragging)
      if (this.disable || this.dragging) return
      this.resetSize()
      console.log(this.$refs.slider)
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left
      this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize * 100)
      this.emitChange()
    },
    resetSize() {
      if (this.$refs.slider) {
        this.sliderSize = this.$refs.slider['clientWidth']
      }
    },
    emitChange() {
      this.$nextTick(() => {
        this.$emit('input', [this.minValue, this.maxValue])
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resetSize)
  }
}
</script>
