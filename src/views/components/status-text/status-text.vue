<template>
  <span :class="b(finalStatus)">
    <i class="st-status-text__dot"></i>
    <span class="st-status-text__content">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'StStatusText',
  bem: {
    b: 'st-status-text'
  },
  props: {
    status: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    finalStatus() {
      if (!Object.keys(this.status).length) {
        return {
          none: 1
        }
      }
      return this.status
    }
  }
}
</script>
