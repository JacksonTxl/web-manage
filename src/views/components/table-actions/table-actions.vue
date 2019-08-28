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

const MAX = 3

export default {
  name: 'StTableActions',
  render(h) {
    const usefulSlotNodes = this.$slots.default
      ? this.$slots.default.filter(item => item.tag)
      : []
    let outerSlotNodes = []
    /**
     * 等于3个的时候使用最小宽度
     */
    const useMax = usefulSlotNodes.length === MAX
    console.log(useMax)
    if (usefulSlotNodes.length <= MAX) {
      outerSlotNodes = usefulSlotNodes.splice(0, MAX)
    } else {
      outerSlotNodes = usefulSlotNodes.splice(0, 2)
    }
    console.log(usefulSlotNodes)
    const outerActions = intercept(
      outerSlotNodes,
      h('a-divider', {
        class: 'st-table-actions__divider',
        props: { type: 'vertical' }
      })
    )

    const innerActions = usefulSlotNodes

    const popoverVnode = h(
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
      childnodes.push(popoverVnode)
    }
    const result = h(
      'div',
      {
        class: `st-table-actions ${useMax ? 'st-table-actions--use-max' : ''}`
      },
      childnodes
    )

    return result
  }
}
</script>
