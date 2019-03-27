<script>
export default {
  name: 'StInputSearch',
  props: {
    round: { type: String, default: '' }
  },
  // round
  render(h) {
    return h(
      'a-input-search',
      {
        props: {
          ...this.$attrs
        },
        class: `st-input-search__${this.round}`,
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>
