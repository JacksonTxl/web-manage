<template>
  <div :class="StDateSlider()">
    <div :class="StDateSlider('way')" ref="slider" @click="onSliderClick">
      <div :class="StDateSlider('bar')" :style="sliderBarStyle"></div>
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
      default: 1440
    },
    step: {
      type: Number,
      default: 60
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
      this.setValues()
    },
    max() {
      this.setValues()
    }
  },
  mounted() {
    if (Array.isArray(this.value)) {
      this.firstValue = Math.max(this.min, this.value[0])
      this.secondValue = Math.min(this.max, this.value[1])
    } else {
      this.firstValue = this.min
      this.secondValue = this.max
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
      if (val[1] < this.min) {
        this.$emit('input', [this.min, this.min])
      } else if (val[0] > this.max) {
        this.$emit('input', [this.max, this.max])
      } else if (val[0] < this.min) {
        this.$emit('input', [this.min, val[1]])
      } else if (val[1] > this.max) {
        this.$emit('input', [val[0], this.max])
      } else {
        this.firstValue = val[0]
        this.secondValue = val[1]
        if (this.valueChanged()) {
          this.oldValue = val.slice()
        }
      }
    },
    setPosition(percent) {
      const targetValue = this.min + percent * (this.max - this.min) / 100
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
      if (this.sliderDisabled || this.dragging) return
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
    },
    getStopStyle(position) {
      return { 'left': position + '%' }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resetSize)
  }
}
</script>
