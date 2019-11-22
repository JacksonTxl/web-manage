<script>
export default {
  name: 'StSkeletonContext',
  functional: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  render(h, { children, scopedSlots, props }) {
    if (props.loading) {
      return scopedSlots['skeleton']()
    }
    return scopedSlots['default']()
  }
}
</script>
