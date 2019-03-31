<template>
  <a-form v-bind="$attrs"
    v-on="$listeners"
    class="st-form">
    <slot></slot>
  </a-form>
</template>

<script>
export default {
  name: 'StForm',
  provide() {
    return {
      stFormConfig: {
        labelWidth: this.labelWidth,
        controlOffset: this.controlOffset
      }
    }
  },
  props: {
    labelWidth: {
      type: String,
      default: ''
    },
    controlOffset: {
      type: String,
      default: ''
    }
  }
}
</script>
