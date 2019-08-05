<script>
export default {
  name: 'StPopconfirm',
  render(h) {
    const props = {
      title: '是否确认删除',
      okText: '确定',
      cancelText: '取消',
      ...this.$attrs
    }
    return h(
      'a-popconfirm',
      {
        props,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
        slot: this.$slots
      },
      this.$slots.default
    )
  }
}
</script>
