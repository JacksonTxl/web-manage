<template>
  <a-form-item
    v-bind="$attrs"
    class="st-form-item"
    :label="labelFix ? ' ' : $attrs.label"
    v-on="$listeners"
  >
    <slot></slot>
  </a-form-item>
</template>

<script>
export default {
  name: 'StFormItem',
  inject: {
    stFormConfig: 'stFormConfig'
  },
  props: {
    // 用于修正label的margin-left值
    labelFix: {
      type: Boolean,
      default: false
    },
    /**
     * 表单label宽度 如88px
     */
    labelWidth: {
      type: String,
      default: ''
    },
    /**
     * 表单label右侧和表单空间的间隔 默认为24px，该属性会传递给st-form-item组件
     */
    labelGutter: {
      type: String,
      default: ''
    }
  },
  computed: {
    computedLabelWidth() {
      return this.labelWidth || this.stFormConfig.labelWidth || '88px'
    },
    computedLabelGutter() {
      return this.labelGutter || this.stFormConfig.labelGutter || '24px'
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      const labelEl = this.$el.querySelector('.ant-form-item-label')
      const wrapperEl = this.$el.querySelector('.ant-form-item-control-wrapper')
      labelEl && (labelEl.style.width = this.computedLabelWidth)
      wrapperEl && (wrapperEl.style.paddingLeft = this.labelGutter)
    })
  }
}
</script>
