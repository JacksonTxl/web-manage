<template>
  <div class="st-info-item">
    <div class="st-info-item__label" :style="{ width: computedLabelWidth }">
      {{ label }}：
    </div>
    <div
      class="st-info-item__content"
      :style="{ paddingLeft: computedLabelGutter }"
    >
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
    /**
     * label 宽度 css单位
     */
    labelWidth: {
      type: String,
      default: ''
    },
    /**
     *label 与内容区的间距 css单位
     */
    labelGutter: {
      type: String,
      default: ''
    }
  },
  inject: {
    stInfoConfig: 'stInfoConfig'
  },
  computed: {
    computedLabelWidth() {
      return this.labelWidth || this.stInfoConfig.labelWidth || 'auto'
    },
    computedLabelGutter() {
      return this.labelGutter || this.stInfoConfig.labelGutter || 0
    }
  }
}
</script>
