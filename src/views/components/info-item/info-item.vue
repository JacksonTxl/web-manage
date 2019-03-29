<template>
  <div class="st-info-item">
    <div class="st-info-item__label">{{label}}</div>
    <div class="st-info-item__content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'StInfoItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
