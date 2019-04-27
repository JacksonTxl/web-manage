<script>
export default {
  name: 'StInputSearch',
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
