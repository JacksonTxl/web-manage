<script>
import { merge, omit, map } from 'lodash-es'
export default {
  name: 'StTable',
  props: {
    page: {
      type: null
    },
    alertSelection: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pagination: {
      type: null
    },
    dataSource: {
      type: Array,
      required: true,
      default: () => []
    },
    scroll: {
      type: Object,
      default: () => ({})
    },
    /**
     * client | server 分页模式
     */
    pageMode: {
      type: String,
      default: 'server'
    },
    isExpand: {
      type: Boolean,
      default: false
    },
    simplePage: {
      type: Boolean,
      default: false
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
    defaultPageSize() {
      return this.simplePage ? 10 : 20
    },
    tablePagination: {
      get() {
        if (this.pagination === false || this.page === false) {
          return false
        }
        let _p = merge(
          {
            current: this.current,
            pageSize: this.defaultPageSize,
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
        if (this.page) {
          if (this.page.size) {
            _p.pageSize = +this.page.size || this.defaultPageSize
          }
          if (this.page.current_page) {
            _p.current = +this.page.current_page || 1
          }
          if (this.page.total_counts) {
            _p.total = +this.page.total_counts || 0
          }
          if (this.simplePage) {
            _p.simple = true
          }
        }
        console.log(_p)
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
    },
    CustomExpandIcon(props) {
      let text = ''
      let className = 'st-expand-row-icon'
      if (props.record.children && props.record.children.length) {
        const type = props.expanded ? 'table-up' : 'table-down'
        text = <st-icon type={type} />
        className = 'st-expand-row-icon mg-r8'
      }
      return (
        <span
          class={className}
          onClick={e => props.onExpand(props.record, e)}
          style={{ cursor: 'pointer' }}
        >
          {text}
        </span>
      )
    }
  },
  render(h) {
    let props = {
      pagination: this.tablePagination,
      locale: this.locale,
      dataSource: this.dataSource,
      scroll: this.dataSource.length >= 1 ? this.scroll : {},
      ...this.$attrs
    }
    // 判断是否是父子表格
    if (this.isExpand) {
      props.expandIcon = this.CustomExpandIcon
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
