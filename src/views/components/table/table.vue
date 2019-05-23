<script>
import { merge } from 'lodash-es'
export default {
  name: 'StTable',
  methods: {
    onCLick() {
      this.alertSelection.onReset()
    }
  },
  props: {
    alertSelection: {
      type: Object,
      default: () => { return {} }
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
        this.$slots
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
      this.$slots
    )
    return ce
  }
}
</script>
