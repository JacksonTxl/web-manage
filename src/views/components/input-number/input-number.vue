<template>
  <a-input
    :placeholder="placeholder"
    type="text"
    :value="number"
    @change="numberChange"
    @blur="numberBlur"
    :disabled="disabled"
    maxlength="12"
  >
    <template slot="addonAfter">
      <slot name="addonAfter"></slot>
    </template>
  </a-input>
</template>
<script>
import { RuleConfig } from '@/constants/rule'
import { isNumber } from 'lodash-es'
export default {
  name: 'StInputNumber',
  serviceInject() {
    return {
      rules: RuleConfig
    }
  },
  bem: {
    input: 'st-input-number'
  },
  props: {
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    min: {
      type: Number,
      default() {
        return 0
      }
    },
    max: {
      type: Number,
      default() {
        return 999999999999
      }
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    /**
     * input-number是否允许有小数。允许一位小数
     */
    float: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        this.init(newVal)
      }
    }
  },
  created() {
    this.init(this.value)
  },
  data() {
    return {
      number: ''
    }
  },
  methods: {
    init(data) {
      this.number = data
    },
    numberBlur(e) {
      switch (e.target.value) {
        case null:
        case undefined:
        case '':
        case '.':
          this.number = ''
          this.triggerChange()
          this.$emit('blur', `${this.number}`)
          break
        default:
          if (!this.float) {
            this.number = parseInt(+e.target.value, 10)
            this.number = this.min > this.number ? this.min : this.number
            this.number = this.max < this.number ? this.max : this.number
          } else {
            this.number = parseInt(+e.target.value * 10, 10) / 10
            this.number = this.min > this.number ? this.min : this.number
            this.number = this.max < this.number ? this.max : this.number
          }
          if (!this.doubleFloat) {
            this.number = parseInt(+e.target.value, 10)
            this.number = this.min > this.number ? this.min : this.number
            this.number = this.max < this.number ? this.max : this.number
          } else {
            this.number = (parseInt(+e.target.value * 100, 10) / 100).toFixed(2)
            this.number = this.min > this.number ? this.min : this.number
            this.number = this.max < this.number ? this.max : this.number
          }
          this.number += ''
          this.triggerChange()
          this.$emit('blur', `${this.number}`)
      }
    },
    numberChange(e) {
      // 控制不能输入非数字
      if (
        !this.rules.number.test(e.target.value) &&
        e.target.value !== '' &&
        e.target.value !== '.'
      ) {
        return
      }
      this.number = `${e.target.value}`
      this.triggerChange()
    },
    triggerChange() {
      this.$emit('change', `${this.number}`)
      this.$emit('input', `${this.number}`)
    }
  }
}
</script>
