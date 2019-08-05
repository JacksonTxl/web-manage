import { isPlainObject } from 'lodash-es'

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
  'shop-product-course-schedule-personal-personal-reserve-table',
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
    },
    prevPage() {
      return this.query[this.currentPageField]
    }
  },
  methods: {
    /**
     * 筛选搜索 使用当前的query参数，只是页数到第一页  只做路由跳转 获取数据的行为在 beforeRouteUpdate 或 beforeEach中定义
     * @example
     *  ```html
     *      <st-button @click='onSearch'></st-button>
     * ```
     */
    onSearch() {
      this.onSelectionReset()
      this.$router.push({
        query: {
          ...this.query,
          [this.currentPageField]: 1
        },
        force: true
      })
    },
    /**
     * 多个字段下的搜索 this.onMultiSearch({a:1,b:2})
     */
    onMultiSearch(searchFieldsValue = {}) {
      if (!isPlainObject(searchFieldsValue)) {
        throw new Error(
          `[tableMixin] should provide searchFieldsValue is object but got ${typeof searchFieldsValue}`
        )
      }
      this.$router.push({
        query: {
          ...this.query,
          ...searchFieldsValue,
          [this.currentPageField]: 1
        },
        force: true
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
          size: this.query.size
        },
        force: true
      })
    },
    /**
     * 单个筛选项的即时搜索 @change="onSingleSearch('card_type',$event)"
     */
    onSingleSearch(key, data) {
      this.onSelectionReset()
      this.$router.push({
        query: {
          ...this.query,
          ...{ [key]: data },
          [this.currentPageField]: 1
        },
        force: true
      })
    },
    /**
     * 关键词的即时搜索 @change="onKeywordsSearch('keyword',$event)"
     */
    onKeywordsSearch(key, data) {
      this.onSelectionReset()
      this.$router.push({
        query: {
          [key]: data,
          size: this.query.size
        },
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
      // 排序字段 排序顺序
      let sort_by, sort_order
      if (sorter && sorter.field) {
        sort_by = sorter.field
        sort_order = { ascend: 'asc', descend: 'desc' }[sorter.order]
      }
      if (!pagination) {
        throw new Error(
          `[tableMixin] pagination is not provide ${typeof pagination}`
        )
      }

      const nextPage =
        pagination.current !== this.prevPage ? pagination.current : 1
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
