<template>
  <a-form
    v-bind="$attrs"
    v-on="$listeners"
    class="st-form"
    :class="[`${this.labelAuto ? 'st-form--label-auto' : ''}`]"
  >
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
        labelGutter: this.labelGutter,
        labelAuto: this.labelAuto
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
    },
    /**
     *
     * 现在的实现是label会wrap
     *  TODO: 后期需要实现 自动宽度label 根据表单的所有label中的最大宽度动态计算出
     */
    labelAuto: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    const labelEls = [
      ...this.$el.querySelectorAll('.ant-form-item-label label')
    ]
    const maxLabelWidth = parseInt(
      Math.max(...labelEls.map(el => el.getBoundingClientRect().width))
    )
    if (!maxLabelWidth) return
  }
}
</script>
