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
  props: {
    // 用于修正label的margin-left值
    labelOffset: {
      type: Boolean,
      default: false
    }
  }
}
</script>
