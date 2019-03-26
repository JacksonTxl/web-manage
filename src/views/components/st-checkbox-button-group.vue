
<template>
  <a-button-group class="st-checkbox-button-group">
    <slot></slot>
    {{JSON.stringify(initArr)}}
  </a-button-group>
</template>
<script>
export default {
  provide() {
    return {
      groupProvide: {
        groupValue: this.stValueData
      },
      emitGroup: data => {
        let arr = [...this.stValueData.value]
        if (data.value) {
          // 选中
          arr.push(data.key)
        } else {
          // 移除
          if (arr.includes(data.key)) {
            arr.splice(arr.indexOf(data.key), 1)
          }
        }
        // 去除value里无用的key
        arr.forEach((i, index) => {
          if (!this.initArr.includes(i)) {
            arr.splice(index, 1, data.key)
          }
        })
        this.$set(this.stValueData, 'value', arr)
        this.$emit('modelChange', arr)
        this.$emit('change', arr)
      },
      initGroup: data => {
        this.initArr.push(data)
      }
    }
  },
  data() {
    return {
      initArr: [],
      stValueData: {
        value: [],
        disabled: false
      }
    }
  },
  model: {
    prop: 'modelValue',
    event: 'modelChange'
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    modelValue: {
      deep: true,
      handler(newVal, oldVal) {
        this.stValueData.value = [...newVal]
      }
    },
    disabled(newVal, oldVal) {
      this.stValueData.disabled = newVal
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.stValueData.value = [...this.modelValue]
      this.stValueData.disabled = this.disabled
    }
  }
}
</script>
