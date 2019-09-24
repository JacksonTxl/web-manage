<template>
  <div :class="['st-alert', `st-alert--${type}`]">
    <span class="st-alert__icon">
      <st-icon v-if="type === 'warning'" type="attention" color="#FF5E41" />
    </span>
    <div class="st-alert__message">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StAlert',
  props: {
    type: {
      type: String,
      default: 'warning'
    }
  }
}
</script>
