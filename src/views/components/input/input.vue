<template>
  <a-input type="text" :value="number" @change="numberChange" maxlength="12">
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
    value: {
      type: [String, Number]
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
    },
    number(newVal) {
      this.triggerChange()
    }
  },
  methods: {
    init(data) {
      if (!this.float) {
        // 整数
        if (data === '') {
          this.number = data
          return
        }
        const number = parseInt(data || 0, 10)
        if (isNaN(number)) {
          return
        }
        this.number = number
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
        if (/\.$/.test(data)) {
          this.number += '.'
        }
      }
    },
    numberChange(e) {
      if (!this.float) {
        // 整数
        if (e.target.value === '') {
          this.number = e.target.value
          return
        }
        const number = parseInt(e.target.value || 0, 10)
        if (isNaN(number)) {
          return
        }
        this.number = number
      } else {
        // 允许小数
        if (e.target.value === '.' || e.target.value === '') {
          this.number = e.target.value
          return
        }
        if (!this.rules.number.test(e.target.value)) {
          return
        }
        this.number = parseInt(e.target.value * 10, 10) / 10
        if (/\.$/.test(e.target.value)) {
          this.number += '.'
        }
      }
    },
    triggerChange() {
      this.$emit('change', `${this.number}`)
      this.$emit('input', `${this.number}`)
    }
  }
}
</script>
