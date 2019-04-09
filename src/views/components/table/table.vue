<script>
import { merge } from 'lodash-es'
export default {
  name: 'StTable',
  methods: {
    clickHandler() {
      console.log('clickHandler')
      this.$emit('resetSelection')
    }
  },
  props: {
    withSelectionAlert: {
      type: Boolean,
      default: false
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
          emptyText: (
            <div class="mg-y24">
              <img
                width="150"
                src="https://static-s.styd.cn/201811161629/no-data.png"
              />
              <p class="mg-t16">暂无数据</p>
            </div>
          )
        }
      },
      this.$attrs
    )
    const ce = this.withSelectionAlert ? h('div', { class: 'st-table-wapper' }, [
      h('a-alert', {
        class: 'st-table-alert mg-b8',
        props: { type: 'info', showIcon: true },
        scopedSlots: {
          message: props => h('div', { class: 'st-table-alert__content' }, ['已选 ', h('span', { class: 'st-table-alert__count' }, this.$attrs.rowSelection.selectedRowKeys.length || 0), ' 条数据', h('a', { class: 'mg-l24 st-table-alert__reload',
            on: {
              click: this.clickHandler
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
