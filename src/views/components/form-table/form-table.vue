<template>
  <a-spin :spinning="loading">
    <table :class="b({striped,hoverable})">
      <slot></slot>
    </table>
  </a-spin>
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
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
