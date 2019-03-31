<template>
  <h3 class="st-title"
    :class="['st-title--'+type]">
    <slot></slot>
  </h3>
</template>

<script>
export default {
  name: 'StTitle',
  props: {
    type: {
      type: String,
      default: 't3'
    }
  }
}
</script>
