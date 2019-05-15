<template>
  <div class="st-info">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'StInfo',
  provide() {
    return {
      stInfoConfig: {
        labelWidth: this.labelWidth,
        labelGutter: this.labelGutter,
        isWeakenLabel: this.isWeakenLabel
      }
    }
  },
  props: {
    /**
     * label 宽度
     */
    labelWidth: {
      type: String,
      default: ''
    },
    /**
     *label 与内容区的间距
     */
    labelGutter: {
      type: String,
      default: ''
    },
    /**
     * isWeakenLabel 是否弱化label
     */
    isWeakenLabel: {
      type: Boolean,
      default: false
    }
  }
}
</script>
