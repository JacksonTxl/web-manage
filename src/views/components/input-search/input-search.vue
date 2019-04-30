<script>
export default {
  name: 'StInputSearch',
  model: {
    prop: 'value',
    event: 'change.value'
  },
  render(h) {
    return h(
      'a-input-search',
      {
        props: {
          ...this.$attrs
        },
        class: `st-input-search`,
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>
