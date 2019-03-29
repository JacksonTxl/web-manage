<template>
  <div class="st-app-content">
    <div class="st-app-content__header">
      <slot name='header'></slot>
    </div>
    <div class="st-app-content__body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StAppContent',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>
