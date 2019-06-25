<template>
  <a-input :placeholder="placeholder" type="text" :value="number" @blur="numberBlur" @change="numberChange" :disabled="disabled" maxlength="12">
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
  created() {
    this.init(this.value)
  },
  data() {
    return {
      number: ''
    }
  },
  watch: {
    value(newVal) {
      this.init(newVal)
    }
  },
  methods: {
    init(data) {
      if (data === null) {
        this.number = data
        return
      }
      if (!this.float) {
        // 整数
        if (data === '') {
          this.number = data
          return
        }
        if (!/^\d\d*$/.test(data)) {
          return
        }
        this.number = parseInt(data, 10)
        this.number = this.min > this.number ? this.min : this.number
        this.number = this.max < this.number ? this.max : this.number
      } else {
        // 允许小数
        if (data === '.' || data === '') {
          this.number = data
          return
        }
        if (!this.rules.number.test(data)) {
          return
        }
        this.number = parseInt(data * 10, 10) / 10
        this.number = this.min > this.number ? this.min : this.number
        this.number = this.max < this.number ? this.max : this.number
        if (/\.$/.test(data)) {
          this.number += '.'
        }
      }
      this.number += ''
    },
    numberChange(e) {
      if (!this.float) {
        // 整数
        if (e.target.value === '') {
          this.number = e.target.value
          this.triggerChange()
          return
        }
        if (!/^\d\d*$/.test(e.target.value)) {
          return
        }
        this.number = parseInt(e.target.value, 10)
        this.number = this.min > this.number ? this.min : this.number
        this.number = this.max < this.number ? this.max : this.number
      } else {
        // 允许小数
        if (e.target.value === '.' || e.target.value === '') {
          this.number = e.target.value
          this.triggerChange()
          return
        }
        if (!this.rules.number.test(e.target.value)) {
          return
        }
        this.number = parseInt(e.target.value * 10, 10) / 10
        this.number = this.min > this.number ? this.min : this.number
        this.number = this.max < this.number ? this.max : this.number
        if (/\.$/.test(e.target.value)) {
          this.number += '.'
        }
      }
      this.number += ''
      this.triggerChange()
    },
    triggerChange() {
      this.$emit('change', `${this.number}`)
      this.$emit('input', `${this.number}`)
    },
    numberBlur(event) {
      this.$emit('blur', event)
    }
  }
}
</script>
