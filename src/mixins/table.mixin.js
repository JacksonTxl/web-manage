export default {
  data() {
    return {
      // 选中项目的keys
      selectedRowKeys: [],
      // 选中项的行数组
      selectedRows: []
    }
  },
  created() {
    if (!this.query) {
      console.error(
        '[tableMixin] 需要订阅routeService.query 到this.query以生效'
      )
    }
    if (!this.page) {
      console.error(
        '[tableMixin] 需要订阅page对象 到this.page以生效'
      )
    }
  },
  computed: {
    // 多选是否至少勾选一项
    isSelectedEnabled() {
      return this.selectedRowKeys.length > 0
    },
    // 没有一项选中
    isSelectedDisabled() {
      return this.selectedRowKeys.length === 0
    }
  },
  methods: {
    // 筛选搜索
    onSearch() {
      this.onSelectionReset()
      this.$router.push({
        query: {
          ...this.query,
          current_page: 1,
          force: true
        }
      })
    },
    // 单个筛选项的即时搜索
    // 所有的查询都将页码到第一页
    // keyword 为true时只单独查询该字段
    onSingleSearch(key, data, { keyword = false } = {}) {
      this.onSelectionReset()
      let query
      if (!keyword) {
        query = {
          ...this.query,
          current_page: 1,
          ...{ [key]: data }
        }
      } else {
        query = {
          [key]: data
        }
      }
      this.$router.push({
        query,
        force: true
      })
    },
    // 重置 多选框
    onSelectionReset() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    // 多选区更新
    onSelectionChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 表格更新
    onTableChange(pagination, filter, sorter) {
      this.onSelectionReset()
      let sort_by, sort_order
      if (sorter.field) {
        sort_by = sorter.field
        sort_order = { ascend: 'asc', descend: 'desc' }[sorter.order]
      }
      this.$router.push({
        query: {
          ...this.query,
          current_page: pagination.current,
          size: pagination.pageSize,
          sort_by,
          sort_order
        }
      })
    }
  }
}