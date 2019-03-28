<script>
import { merge } from 'lodash-es'
export default {
  name: 'StTable',
  render(h) {
    const props = merge(
      {
        scroll: { x: 1200 },
        pagination: {
          pageSize: 20,
          hideOnSinglePage: true,
          showTotal: function(total, range) {
            return `总共${total}条记录`
          },
          showQuickJumper: true
        },
        locale: {
          emptyText: <div class='mg-y24'>
            <img width='150' src='https://static-s.styd.cn/201811161629/no-data.png'></img>
            <p class='mg-t16'>暂无数据</p>
          </div>
        }
      },
      this.$attrs
    )
    if ('noScroll' in this.$attrs) {
      delete props.scroll
    }
    return h(
      'a-table',
      {
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
