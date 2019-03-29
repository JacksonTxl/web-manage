<script>
import { merge } from 'lodash-es'
export default {
  name: 'StTable',
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
    return h(
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
  }
}
</script>
