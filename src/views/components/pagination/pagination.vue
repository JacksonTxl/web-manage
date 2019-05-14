<script>
export default {
  name: 'StPagination',
  render(h) {
    const props = Object.assign({
      pageSize: 20,
      defaultCurrent: 1,
      showSizeChanger: true,
      showTotal(total) {
        return `共${total}条`
      }
    }, this.$attrs)
    const that = this
    return h(
      'a-pagination',
      {
        class: `st-pagination`,
        props,
        on: {
          ...this.$listeners
        }
      }
    )
  }
}
</script>
