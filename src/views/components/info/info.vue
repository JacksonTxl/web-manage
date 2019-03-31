<template>
  <div class="st-info">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'StInfo',
  provide() {
    return {
      stInfoConfig: {
        labelWidth: this.labelWidth
      }
    }
  },
  props: {
    labelWidth: {
      type: String,
      default: ''
    }
  }
}
</script>
