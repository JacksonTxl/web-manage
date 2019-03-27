<script>
export default {
  name: 'StStep',
  // round
  render(h) {
    return h(
      'a-step',
      {
        props: {
          ...this.$attrs
        },
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>
