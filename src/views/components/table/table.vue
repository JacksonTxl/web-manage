<script>
import { merge, omit, map } from 'lodash-es'
export default {
  name: 'StTable',
  props: {
    page: {
      type: null,
      default: () => ({})
    },
    alertSelection: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pagination: {
      type: null,
      default: false
    },
    dataSource: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * client | server 分页模式
     */
    pageMode: {
      type: String,
      default: 'server'
    }
  },
  watch: {
    dataSource() {
      if (this.pageMode === 'client') {
        this.current = 1
      }
    }
  },
  data() {
    return {
      pageSize: 20,
      total: 0,
      current: 1
    }
  },
  computed: {
    locale() {
      return {
        emptyText: <st-no-data />
      }
    },
    tablePagination: {
      get() {
        let _p = merge(
          {
            current: this.current,
            pageSize: this.pageSize,
            total: this.total,
            showTotal: function(total, range) {
              return `共${total}条`
            },
            showSizeChanger: true
          },
          // 去除无用的pagination属性
          omit(this.pagination, [
            'total_counts',
            'total_pages',
            'current_page',
            'size'
          ])
        )
        if (!this.page) {
          _p = false
        }
        if (this.page.size) {
          _p.pageSize = +this.page.size || 20
        }
        if (this.page.current_page) {
          _p.current = +this.page.current_page || 1
        }
        if (this.page.total_counts) {
          _p.total = +this.page.total_counts || 0
        }
        return _p
      }
    }
  },
  methods: {
    onCLick() {
      this.alertSelection.onReset()
    },
    onChange(pagination, ...rest) {
      if (this.pageMode === 'client') {
        this.current = pagination.current
        this.total = pagination.total
        this.pageSize = pagination.pageSize
      }
      this.$emit('change', pagination, ...rest)
    },
    renderChildren() {
      return map(this.$slots, (vnode, slot) => (
        <template slot={slot}>{vnode}</template>
      ))
    }
  },
  render(h) {
    const props = {
      pagination: this.tablePagination,
      locale: this.locale,
      dataSource: this.dataSource,
      ...this.$attrs
    }
    const ce = this.alertSelection.onReset
      ? h('div', { class: 'st-table-wapper' }, [
          h('a-alert', {
            class: 'st-table-alert mg-b8',
            props: { type: 'info', showIcon: true },
            scopedSlots: {
              message: props =>
                h('div', { class: 'st-table-alert__content' }, [
                  '已选 ',
                  h(
                    'span',
                    { class: 'st-table-alert__count' },
                    this.$attrs.rowSelection.selectedRowKeys.length || 0
                  ),
                  ' 条数据',
                  h(
                    'a',
                    {
                      class: 'mg-l24 st-table-alert__reload',
                      on: {
                        click: this.onCLick
                      }
                    },
                    '清空'
                  )
                ])
            }
          }),
          h(
            'a-table',
            {
              class: 'st-table',
              props,
              on: {
                change: this.onChange
              },
              scopedSlots: this.$scopedSlots,
              slot: this.$slots
            },
            this.renderChildren()
          )
        ])
      : h(
          'a-table',
          {
            class: 'st-table',
            props,
            on: {
              change: this.onChange
            },
            scopedSlots: this.$scopedSlots,
            slot: this.$slots
          },
          this.renderChildren()
        )
    return ce
  }
}
</script>
