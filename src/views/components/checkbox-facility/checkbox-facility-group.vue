
<template>
  <div class="st-checkbox-facility-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'StCheckboxFacilityGroup',
  provide() {
    return {
      groupProvide: {
        groupValue: this.stValueData
      },
      emitGroup: data => {
        let arr = [...new Set([...this.stValueData.value])]
        let newArr = []
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
          if (this.initArr.includes(i)) {
            newArr.push(i)
          }
        })
        newArr = [...new Set(newArr)]
        this.$set(this.stValueData, 'value', newArr)
        this.$emit('modelChange', newArr)
        this.$emit('change', newArr)
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
