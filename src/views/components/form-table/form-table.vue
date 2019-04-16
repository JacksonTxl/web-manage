<template>
  <table :class="b({striped,hoverable})">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'StFormTable',
  bem: {
    b: 'st-form-table'
  },
  props: {
    hoverable: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    }
  }
}
</script>
