<script>
import { merge } from 'lodash-es'
export default {
  name: 'StTable',
  props: {
    page: {
      type: [Object, Boolean],
      default: () => ({})
    },
    alertSelection: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    onCLick() {
      this.alertSelection.onReset()
    }
  },
  render(h) {
    const props = merge(
      {
        pagination: {
          pageSize: 20,
          showTotal: function(total, range) {
            return `共${total}条`
          },
          showSizeChanger: true
        },
        locale: {
          emptyText: <st-no-data/>
        }
      },
      this.$attrs
    )
    const page = this.page
    if (!page) {
      props.pagination = false
    }
    if (page.size) {
      props.pagination.pageSize = +page.size
    }
    if (page.current_page) {
      props.pagination.current = +page.current_page
    }
    if (page.total_counts) {
      props.pagination.total = +page.total_counts
    }
    const renderChildren = []
    for (let k in this.$slots) {
      renderChildren.push(h('template', { slot: k }, this.$slots[k]))
    }
    const ce = this.alertSelection.onReset ? h('div', { class: 'st-table-wapper' }, [
      h('a-alert', {
        class: 'st-table-alert mg-b8',
        props: { type: 'info', showIcon: true },
        scopedSlots: {
          message: props => h('div', { class: 'st-table-alert__content' }, ['已选 ', h('span', { class: 'st-table-alert__count' }, this.$attrs.rowSelection.selectedRowKeys.length || 0), ' 条数据', h('a', { class: 'mg-l24 st-table-alert__reload',
            on: {
              click: this.onCLick
            } }, '清空')])
        }
      }),
      h(
        'a-table',
        {
          class: 'st-table',
          props,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
          slot: this.$slots
        },
        renderChildren
      )]
    ) : h(
      'a-table',
      {
        class: 'st-table',
        props,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
        slot: this.$slots
      },
      renderChildren
    )
    return ce
  }
}
</script>
