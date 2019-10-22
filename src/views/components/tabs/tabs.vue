<script>
export default {
  name: 'StTabs',
  functional: true,
  render(h, ctx) {
    return h('a-tabs', { staticClass: 'st-tabs', ...ctx.data }, ctx.children)
  }
}
</script>
