<script>
export default {
  name: 'StTabPane',
  functional: true,
  render(h, ctx) {
    return h('a-tab-pane', ctx.data, ctx.children)
  }
}
</script>
