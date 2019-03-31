<template>
  <div class="st-info-item">
    <div class="st-info-item__label"
      :style="{width:computedLabelWidth}">{{label}}</div>
    <div class="st-info-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StInfoItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    }
  },
  inject: {
    stInfoConfig: 'stInfoConfig'
  },
  computed: {
    computedLabelWidth() {
      return this.labelWidth || this.stInfoConfig.labelWidth || '88px'
    }
  }
}
</script>
