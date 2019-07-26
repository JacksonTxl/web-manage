import { ServiceRouteConfig } from 'vue-service-app'
import { ClubComponentService } from '@/views/pages/shop/dashboard#/club.component.service'

interface RouteConfig extends ServiceRouteConfig {
  meta: {
    /**
     * 布局视图名称 @/views/layouts/index.ts
     */
    layout: string
    /**
     * 面包屑的标题
     */
    title: string
    name: string
    /**
     * 生命平级路由的父级路由nameπ
     */
    parentId: string
    /**
     * 路由对应的权限key名
     */
    auth: string
    /**
     * 父级路由带有的tabs路由名数组
     */
    tabs: string[]
  }
  guards: object[]
}
interface StaffEdit extends ServiceRouteConfig {
  staff_id?: number
  currentIndex?: number
}
export const routeMapConfig = {
  '404'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'blank'
    routeConfig.meta.title = '页面未找到'
  },
  'account-login'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'login'
    routeConfig.meta.title = '登录'
  },
  styleguide(routeConfig: RouteConfig) {
    routeConfig.redirect = { name: 'styleguide-component' }
  },
  'brand-product-course-personal-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课'
    routeConfig.meta.tabs = [
      'brand-product-course-personal-list-brand',
      'brand-product-course-personal-list-shop'
    ]
  },
  'brand-product-course-personal-list-shop'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店私教课程库'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      category_id: { type: Number, default: -1 },
      is_available: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'brand-product-course-personal-list-brand'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '品牌私教课程库'
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'brand-product-course-team-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团体课'
    routeConfig.meta.tabs = [
      'brand-product-course-team-list-brand',
      'brand-product-course-team-list-shop'
    ]
  },
  'brand-product-course-team-list-shop'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店团体课程库'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'shop-dashboard-club'(routeConfig: RouteConfig) {
    routeConfig.guards.push(ClubComponentService)
  },
  'shop-product-course-manage-personal-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课'
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  // 'shop-product-course-schedule-team'(routeConfig: RouteConfig) {
  //   routeConfig.queryOptions = {
  //     course_id: { type: Number, default: -1 },
  //     curt_id: { type: Number, default: -1 },
  //     course_name: { type: String, default: '' }
  //   }
  // },
  'brand-product-course-team-list-brand'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '品牌团体课程库'
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'test-llf-mine'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      courseName: { type: String, default: '-1' },
      b: { type: Number, default: 2 },
      c: { type: String, default: '3' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-product-course-manage-package-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程包'
    routeConfig.queryOptions = {
      package_type: { type: Number, default: -1 },
      shelf_status: { type: Number, default: -1 },
      course_name: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '售卡管理'
    routeConfig.meta.tabs = [
      'shop-sold-card-list-member',
      'shop-sold-card-list-deposit'
    ]
  },
  'shop-sold-course-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '售课管理'
    routeConfig.meta.tabs = [
      'shop-sold-course-list-personal',
      'shop-sold-course-list-package'
    ]
  },
  'shop-sold-card-list-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会员卡'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      card_type: { type: Number, default: -1 },
      card_status: { type: Number, default: -1 },
      is_open: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-list-deposit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      is_valid: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-cabinet-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '租赁管理'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      lease_status: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-list-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      course_status: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-list-package'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程包'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      course_status: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-package-info-consumption-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '课程包详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-package-info-operation-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '课程包详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-personal-info-consumption-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '私教课详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-personal-info-operation-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '私教课详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-deposit-info-consumption-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '储值卡详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-deposit-info-operation-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '储值卡详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-member-info-consumption-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '会籍卡详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-member-info-operation-record'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会籍卡详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-transaction-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '交易签单'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 1 }
    }
  },
  // 订单列表
  'shop-finance-order-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '订单管理'
    routeConfig.queryOptions = {
      keyword: { type: String, default: '' },
      status: { type: Number, default: -1 },
      type: { type: Number, default: -1 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-finance-order-info-collection-details'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收款明细'
  },
  'shop-finance-order-info-commodity-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '商品信息'
  },
  'brand-product-course-personal-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增私教课'
    routeConfig.meta.parentId = 'brand-product-course-personal-list-brand'
  },
  'brand-setting-general'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '系统设置'
    routeConfig.meta.tabs = [
      'brand-setting-general-brand',
      'brand-setting-general-coach-level',
      'brand-setting-general-user-level',
      'brand-setting-general-course',
      'brand-setting-general-pay-type'
    ]
  },
  'brand-setting-app'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '应用设置'
    routeConfig.meta.tabs = [
      'brand-setting-app-course',
      'brand-setting-app-staff'
    ]
  },
  'brand-setting-app-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程'
    routeConfig.meta.tabs = [
      'brand-setting-app-course-category',
      'brand-setting-app-course-training-aim'
    ]
  },
  'brand-setting-app-staff'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工'
    routeConfig.meta.tabs = ['brand-setting-app-staff-skillful']
  },
  'brand-setting-app-course-category'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程类型'
    routeConfig.meta.auth = 'brand_shop:course:course_setting|tab'
  },
  'brand-setting-app-course-training-aim'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '训练目的'
    routeConfig.meta.auth = 'brand_shop:course:course_setting|tab'
  },
  'brand-setting-app-staff-skillful'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '擅长项目'
    routeConfig.meta.auth = 'brand_shop:staff:staff_setting|tab'
  },
  'shop-product-card-member-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会员卡'
    routeConfig.meta.tabs = [
      'shop-product-card-member-list-shelves',
      'shop-product-card-member-list-all'
    ]
  },
  'shop-product-card-member-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店上架卡项'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'shop-product-card-member-list-all'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '全部会员卡项'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      sell_status: { type: Number, default: -1 },
      shelf_status: { type: Number, default: -1 }
    }
  },
  'shop-product-card-deposit-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡'
    routeConfig.meta.tabs = [
      'shop-product-card-deposit-list-shelves',
      'shop-product-card-deposit-list-all'
    ]
  },
  'shop-product-card-deposit-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店上架储值卡'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'shop-product-card-deposit-list-all'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '全部储值卡'
    routeConfig.queryOptions = {
      sell_status: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      size: { type: Number, default: 20 },
      page: { type: Number, default: 1 }
    }
  },
  'brand-product-card-deposit-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡'
    routeConfig.meta.tabs = [
      'brand-product-card-deposit-list-all',
      'brand-product-card-deposit-list-shelves'
    ]
  },
  'brand-product-card-deposit-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店上架储值卡'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      publish_channel: { type: Number, default: -1 },
      shop_id: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'brand-product-card-deposit-list-all'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '全部储值卡项'
    routeConfig.queryOptions = {
      sell_status: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      size: { type: Number, default: 20 },
      page: { type: Number, default: 1 }
    }
  },
  'brand-product-card-member-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会籍卡'
    routeConfig.meta.tabs = [
      'brand-product-card-member-list-all',
      'brand-product-card-member-list-shelves'
    ]
  },
  'brand-product-card-member-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店上架卡项'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      shop_id: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'brand-product-card-member-list-all'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '全部会员卡项'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      sell_status: { type: Number, default: -1 }
    }
  },
  'shop-reception-entrance'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '入场管理'
    routeConfig.meta.parentId = 'shop-reception-index'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      entry_type: { type: Number, default: -1 },
      keyword: { type: String, default: '' }
    }
  },
  'brand-product-card-member-number-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会籍卡详情'
  },
  'brand-dashboard-club'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '首页'
  },
  'brand-dashboard-studio'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '首页'
  },
  'brand-markting-plugin'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '营销插件'
  },
  'brand-product-card-member-number-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑会籍卡'
  },
  'brand-product-card-member-add-select'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会籍卡'
  },
  'brand-product-card-member-period-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增会籍卡'
  },
  'brand-product-card-member-number-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增次卡'
  },
  'brand-product-card-member-period-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会籍卡详情'
  },
  'brand-product-card-deposit-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡详情'
  },
  'brand-product-card-deposit-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑储值卡'
  },
  'brand-product-card-deposit-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增储值卡'
  },
  'brand-product-course-personal-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课详情'
  },
  'brand-product-course-personal-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑私教课'
  },
  'brand-product-course-team-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团体课详情'
  },
  'brand-product-course-team-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增团体课'
  },
  'brand-product-course-team-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑团体课'
  },
  'brand-staff-department'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工管理'
  },
  'brand-staff-info-basic'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'brand-staff-info-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'brand-staff-info-follow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'brand-staff-info-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'brand-staff-info-sold'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'brand-staff-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工编辑'
  },
  'brand-staff-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增员工'
  },
  'brand-staff-role-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '角色权限'
  },
  'brand-staff-role-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '添加角色'
  },
  'brand-staff-role-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑角色'
  },
  'brand-finance-salary-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '薪资报表'
  },
  'brand-finance-salary-template'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '薪资模板'
    routeConfig.meta.tabs = [
      'brand-finance-salary-template-basic',
      'brand-finance-salary-template-performance'
    ]
  },
  'brand-finance-salary-template-basic'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '底薪模板'
  },
  'brand-finance-salary-template-performance'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '业绩模板'
  },
  'brand-setting-general-brand'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '品牌设置'
    routeConfig.meta.auth = ''
  },
  'brand-setting-general-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程定价及预约设置'
    routeConfig.meta.auth = ''
    routeConfig.meta.tabs = [
      'brand-setting-general-course-personal'
      // ,'brand-setting-general-course-team'
    ]
  },
  'brand-setting-general-course-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教设置'
    routeConfig.meta.auth = 'brand_shop:flow:expenditure|tab'
  },
  'brand-setting-general-course-team'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课设置'
  },
  'brand-setting-general-pay-type'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '支付方式'
  },
  'brand-setting-general-coach-level'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '教练等级设置'
  },
  'brand-setting-general-user-level'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户等级设置'
  },
  'brand-setting-shop-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店设置'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      shop_status: { type: Number, default: -1 },
      is_valid: { type: Number, default: -1 }
    }
  },
  'brand-setting-shop-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增门店'
  },
  'brand-setting-shop-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店详情'
  },
  'brand-setting-shop-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店编辑'
  },
  'brand-setting-contract-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '合同设置'
  },
  'brand-setting-contract-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '合同编辑'
  },
  'shop-dashboard-shop'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '概览'
  },
  'shop-dashboard-studio'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '概览'
  },
  'shop-reception-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '前台'
  },
  'shop-member-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户列表'
    routeConfig.queryOptions = {
      keyword: { type: String, default: '' },
      member_level: { type: Number, default: -1 },
      register_way: { type: Number, default: -1 },
      register_start_time: { type: String, default: '' },
      register_stop_time: { type: String, default: '' },
      be_member_start_time: { type: String, default: '' },
      be_member_stop_time: { type: String, default: '' },
      is_follow: { type: Number, default: -1 },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-member-info-basic'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-info-follow-history'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-info-sold'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-info-reserve'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-info-sales-interests'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-info-user-experience'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户编辑'
  },
  'shop-member-label-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '标签管理'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      tag_name: { type: String, default: '' }
    }
  },
  'shop-member-crowd-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户人群'
  },
  'shop-member-crowd-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新建人群'
  },
  'shop-member-crowd-analysis'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '人群分析'
  },
  'shop-product-course-schedule'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程排期'
    routeConfig.meta.tabs = [
      'shop-product-course-schedule-team',
      'shop-product-course-schedule-personal',
      'shop-product-course-schedule-personal-team'
    ]
  },
  'shop-product-course-schedule-team'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课排期'
  },
  'shop-product-course-schedule-team-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课排期'
  },
  'shop-product-course-schedule-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教1v1排期'
    // routeConfig.redirect = {
    //   name: 'shop-product-course-schedule-personal-personal'
    // }
  },
  'shop-product-course-schedule-personal-calendar'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教1v1排期'
  },
  'shop-product-course-schedule-personal-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教1v1排期'
  },
  'shop-product-course-schedule-personal-team'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教小团课排期'
    // routeConfig.redirect = {
    //   name: 'shop-product-course-schedule-personal-team-personal-team'
    // }
  },
  'shop-product-course-schedule-personal-team-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教小团课排期'
  },
  'shop-product-course-manage-team-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团体课'
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'shop-product-course-manage-team-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增团体课'
  },
  'shop-product-course-manage-team-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团体课详情'
  },
  'shop-product-course-manage-team-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑团体课'
  },
  'shop-product-course-manage-personal-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增私教课'
  },
  'shop-product-course-manage-personal-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课详情'
  },
  'shop-product-course-manage-personal-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑私教课'
  },
  'shop-product-course-manage-package-edit-unlimit-package'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '编辑课程包'
  },
  'shop-product-course-manage-package-info-unlimit-package'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '课程包详情'
  },
  'shop-product-card-member-number-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '会员卡详情'
  },
  'shop-product-card-member-add-select'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增会员卡'
  },
  'shop-product-card-member-period-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增期限卡'
  },
  'shop-product-card-member-number-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增次卡'
  },
  'shop-product-card-member-period-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑会员卡'
  },
  'shop-product-card-deposit-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增储值卡'
  },
  'shop-product-card-deposit-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡详情'
  },
  'shop-product-card-deposit-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑储值卡'
  },
  'shop-staff-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工列表'
  },
  'shop-staff-info-basic'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.meta.parentId = 'shop-staff-list'
  },
  'shop-staff-info-follow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'shop-staff-info-sold'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'shop-staff-info-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'shop-staff-info-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
  },
  'shop-staff-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑员工'
    routeConfig.meta.parentId = 'shop-staff-list'
  },
  'shop-staff-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增员工'
  },
  'shop-setting-shop'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店设置'
  },
  'shop-setting-court-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '场地设置'
  },
  'shop-setting-court-site'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '座位设置'
  },
  'shop-setting-cabinet'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储物柜设置'
  },
  'shop-member-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增用户'
  },
  'brand-marketing-plugin-coupon-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '优惠券'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      coupon_name: { type: String, default: '' },
      coupon_status: { type: Number, default: '' }
    }
  },
  'brand-marketing-plugin-coupon-receive'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '优惠券领取列表'
    routeConfig.queryOptions = {
      id: { type: Number, default: 0 },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      keyword: { type: String, default: '' },
      coupon_status: { type: String, default: '' },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' }
    }
  },
  'extra-contract-preview'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '合同预览'
    routeConfig.meta.layout = 'blank'
  },
  'brand-marketing-activity'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '活动广告'
  },
  'brand-setting-mina-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户端设置'
  },
  'brand-setting-mina-pay-config'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '微信支付配置'
    routeConfig.meta.parentId = 'brand-setting-mina-index'
  },
  'brand-marketing-plugin'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '营销插件'
  },
  'brand-marketing-plugin-coupon-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增优惠券'
    routeConfig.meta.parentId = 'brand-marketing-plugin-coupon-list'
  },
  'brand-marketing-plugin-invitation-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '邀请有礼'
    routeConfig.meta.tabs = [
      'brand-marketing-plugin-invitation-index-data',
      'brand-marketing-plugin-invitation-index-setting'
    ]
  },
  'brand-marketing-plugin-invitation-index-data'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '邀请有礼'
  },
  'brand-marketing-plugin-invitation-index-setting'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '邀请有礼'
  },
  'brand-marketing-plugin-crowd-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '精细化人群'
  },
  'brand-marketing-plugin-crowd-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新建人群'
    routeConfig.meta.parentId = 'brand-marketing-plugin-crowd-index'
  },
  'brand-setting-sms'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '消息通知设置'
  },
  'brand-setting-sms-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '短信列表'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      send_status: { type: Number },
      notify_type: { type: Number },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' }
    }
  },
  'brand-setting-sms-pay'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '短信列表'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-stat'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '报表'
  },
  'shop-stat-revenue'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '营收报表'
    routeConfig.queryOptions = {
      day: { type: Number },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  },
  'shop-stat-order'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '订单报表'
    routeConfig.queryOptions = {
      day: { type: Number },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-stat-revenue'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '营收统计'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      page: { type: Number, default: -1 },
      size: { type: Number, default: -1 },
      day: { type: Number, default: 0 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  }
}
