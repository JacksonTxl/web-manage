<script>
export default {
  name: 'StButton',
  props: {
    pill: {
      type: Boolean,
      default: false
    },
    // 添加了 size medium 对应按钮高度为 28px
    size: {
      type: String,
      default: 'default'
    },
    // 支持st-icon的图标直接使用
    icon: {
      type: String,
      default: ''
    }
  },
  // round
  render(h) {
    let props = {}
    if (this.size === 'medium') {
      props = { ...this.$attrs }
    } else {
      props = {
        ...this.$attrs,
        size: this.size
      }
    }
    return h(
      'a-button',
      {
        props,
        class: [
          'st-button',
          'st-button--' + this.size,
          {
            'st-button--pill': this.pill
          }
        ],
        on: this.$listeners
      },
      [
        this.icon && h('st-icon', { props: { type: this.icon } }),
        ...this.$slots.default
      ]
    )
  }
}
</script>
