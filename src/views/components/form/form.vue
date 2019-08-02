<template>
  <a-form v-bind="$attrs" v-on="$listeners" class="st-form">
    <slot></slot>
  </a-form>
</template>

<script>
export default {
  name: 'StForm',
  provide() {
    return {
      stFormConfig: {
        labelWidth: this.labelWidth,
        labelGutter: this.labelGutter
      }
    }
  },
  props: {
    /**
     * 表单label宽度 如88px,该属性会传递给st-form-item组件
     */
    labelWidth: {
      type: String,
      default: ''
    },
    /**
     * 表单label右侧和表单空间的间隔，该属性会传递给st-form-item组件
     */
    labelGutter: {
      type: String,
      default: ''
    }
  }
}
</script>
