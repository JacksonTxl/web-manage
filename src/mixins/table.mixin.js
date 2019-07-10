// 使用page作为当前页查询参数的路由放这里
const ROUTE_NAMES_USE_PAGE = [
  /**
   * brand
   */
  'brand-product-course-team-list-shop',
  'brand-product-course-team-list-brand',
  'brand-product-course-personal-list-brand',
  'brand-product-course-personal-list-shop',
  'brand-product-card-deposit-list-all',
  'brand-product-card-deposit-list-shelves',

  'brand-finance-salary-template-basic',
  'brand-finance-salary-template-performance',

  'brand-setting-shop-list',

  'brand-staff-info-course',
  'brand-staff-info-follow',
  'brand-staff-info-sold',
  'brand-staff-info-member',

  'brand-marketing-plugin-coupon-list',
  /**
   * shop
   */
  'shop-product-course-manage-personal-list',
  'shop-product-course-manage-team-list',
  'shop-product-course-manage-package-list',
  'shop-product-card-member-list-all',
  'shop-product-card-deposit-list-all',
  'shop-product-card-deposit-list-shelves',

  'shop-sold-card-list-member',
  'shop-sold-card-list-deposit',
  'shop-sold-course-list-personal',
  'shop-sold-course-list-package',
  'shop-sold-cabinet-list',
  'shop-sold-transaction-list',

  'shop-member-list',
  'shop-member-label-list',

  'shop-finance-order-list',
  'shop-reception-entrance',

  'shop-staff-info-member',
  'shop-staff-info-course',
  'shop-staff-info-sold',
  'shop-staff-list'
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
        '[tableMixin] 需要订阅routeService.query$ 到this.query以生效'
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
      if (sorter) {
        if (sorter.field) {
          sort_by = sorter.field
          sort_order = { ascend: 'asc', descend: 'desc' }[sorter.order]
        }
      }
      if (!pagination) {
        throw new Error(
          `[tableMixin] pagination is not provide ${typeof pagination}`
        )
      }
      if (pagination) {
        let nextPage = pagination.current
        if (sorter && sorter.field) {
          nextPage = 1
        }
        this.$router.push({
          query: {
            ...this.query,
            [this.currentPageField]: nextPage,
            size: pagination.pageSize,
            sort_by,
            sort_order
          }
        })
      }
    }
  }
}
