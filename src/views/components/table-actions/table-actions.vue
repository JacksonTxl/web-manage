<script>
const intercept = (arr, insert) => {
  const _res = []
  if (arr.length) {
    arr.forEach((item, idx) => {
      _res.push(item)
      if (idx < arr.length - 1) {
        _res.push(insert)
      }
    })
  }
  return _res
}

export default {
  name: 'StTableActions',
  render(h) {
    const usefulSlotNodes = this.$slots.default
      ? this.$slots.default.filter(item => item.tag)
      : []
    const outerSlotNodes = usefulSlotNodes.splice(0, 2)

    const outerActions = intercept(
      outerSlotNodes,
      h('a-divider', {
        class: 'st-table-actions__divider',
        props: { type: 'vertical' }
      })
    )

    const innerActions = usefulSlotNodes

    const popover = h(
      'a-popover',
      {
        props: {
          overlayClassName: 'st-table-actions__popover',
          placement: 'bottomRight'
        },
        scopedSlots: {
          content: props => innerActions
        }
      },
      [
        h('a', { class: 'st-table-actions__trigger' }, [
          h('st-icon', {
            props: { type: 'more', color: 'rgba(0,0,0,.2)' }
          })
        ])
      ]
    )

    const childnodes = outerActions
    if (innerActions.length > 0) {
      childnodes.push(popover)
    }
    const result = h('div', { class: 'st-table-actions' }, childnodes)

    return result
  }
}
</script>
