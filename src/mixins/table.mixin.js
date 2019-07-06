// 使用page作为当前页查询参数的路由放这里
const ROUTE_NAMES_USE_PAGE = [
  'brand-setting-shop-list',
  'brand-product-course-team-list-shop',
  'brand-product-course-team-list-brand',
  'brand-product-course-personal-list-brand',
  'brand-product-course-personal-list-shop',
  'shop-product-course-manage-personal-list',
  'shop-product-course-manage-team-list',
  'shop-product-course-manage-package-list',
  'shop-finance-order-list'
]

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

    console.log(
      `use [tableMixin] $route.name -> ${
        this.$route.name
      } currentPageField -> ${this.currentPageField}`
    )
  },
  computed: {
    // 多选是否至少勾选一项
    isSelectedEnabled() {
      return this.selectedRowKeys.length > 0
    },
    // 没有一项选中
    isSelectedDisabled() {
      return this.selectedRowKeys.length === 0
    },
    currentPageField() {
      const _field = ROUTE_NAMES_USE_PAGE.includes(this.$route.name)
        ? 'page'
        : 'current_page'
      return _field
    }
  },
  methods: {
    // 筛选搜索
    onSearch() {
      this.onSelectionReset()
      this.$router.push({
        query: {
          ...this.query,
          [this.currentPageField]: 1,
          force: true
        }
      })
    },
    /**
     * 筛选重置
     */
    onSearhReset() {
      this.onSelectionReset()
      this.$router.push({
        query: {
          [this.currentPageField]: 1,
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
          [this.currentPageField]: 1,
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
          [this.currentPageField]: pagination.current,
          size: pagination.pageSize,
          sort_by,
          sort_order
        }
      })
    }
  }
}
