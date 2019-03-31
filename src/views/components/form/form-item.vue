<template>
  <a-form-item v-bind='$attrs'
    :label="labelOffset?' ':$attrs.label"
    v-on="$listeners">
    <slot></slot>
  </a-form-item>
</template>

<script>
export default {
  name: 'StFormItem',
  inject: {
    stFormConfig: 'stFormConfig'
  },
  props: {
    // 用于修正label的margin-left值
    labelOffset: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: ''
    },
    controlOffset: {
      type: String,
      default: ''
    }
  },
  computed: {
    computedLabelWidth() {
      return this.labelWidth || this.stFormConfig.labelWidth || '88px'
    },
    computedControlOffset() {
      return this.controlOffset || this.stFormConfig.controlOffset || '24px'
    }
  },
  mounted() {
    const labelEl = this.$el.querySelector('.ant-form-item-label')
    const controlEl = this.$el.querySelector('.ant-form-item-control')
    labelEl.style.width = this.computedLabelWidth
    controlEl.style.marginLeft = this.computedControlOffset
  }
}
</script>
