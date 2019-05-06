<script>
export default {
  name: 'StModal',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    size: {
      type: String,
      default: 'default'
    },
    width: {
      type: String,
      default: ''
    }
  },
  // round
  render(h) {
    let props = {}
    if (this.size === 'small') {
      props = { ...this.$attrs, width: 484 }
    } else if (this.size === 'default') {
      props = {
        ...this.$attrs,
        width: 676
      }
    } else {
      props = this.$attrs
    }
    if (this.width) {
      props = {
        ...this.$attrs,
        width: this.width
      }
    }
    return h(
      'a-modal',
      {
        props,
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>
