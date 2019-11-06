<template>
  <span :class="b(finalStatus)">
    <i class="st-text__dot"></i>
    <span class="st-text__content">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'StText',
  bem: {
    b: 'st-text'
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
