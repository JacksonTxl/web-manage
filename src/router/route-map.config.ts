import { stringify } from 'qs'
import { findLast } from 'lodash-es'
import moment from 'moment'
import { RouteConfig } from '@/types/app'

import tplConfigs from './route-config/tpl'

export const routeMapConfig = {
  styleguide(routeConfig: RouteConfig) {
    routeConfig.redirect = { name: 'styleguide-component' }
  },
  'common-export'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '导出记录'
  },
  'common-notify'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '消息中心'
    routeConfig.meta.tabs = ['common-notify-inform', 'common-notify-notice']
  },
  'common-notify-inform'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '通知列表'
    routeConfig.queryOptions = {
      notify_type: { type: Number, default: -1 },
      sub_notify_type: { type: Number, default: -1 },
      shop_id: { type: Number, default: -1 }
    }
  },
  'common-notify-notice'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '通知列表'
    routeConfig.queryOptions = {
      notify_type: { type: Number, default: -1 },
      sub_notify_type: { type: Number, default: -1 },
      shop_id: { type: Number, default: -1 }
    }
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
    routeConfig.meta.auth = 'brand:product:personal_course|shop_list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      category_id: { type: Number, default: -1 },
      is_available: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'brand-product-course-personal-list-brand'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '品牌私教课程库'
    routeConfig.meta.auth = 'brand_shop:product:personal_course|all_list'
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
    routeConfig.meta.auth = 'brand:product:team_course|shop_list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'shop-product-course-manage-personal-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课'
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'shop-product-course-schedule-team-team'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课排期'
    routeConfig.queryOptions = {
      course_id: { type: Number, default: -1 },
      court_id: { type: Number, default: -1 },
      coach_id: { type: Number, default: -1 },
      time_unit: { type: Number, default: 2 }
    }
  },
  'shop-product-course-schedule-team-team-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课排期'
    routeConfig.queryOptions = {
      course_id: { type: Number, default: -1 },
      court_id: { type: Number, default: -1 },
      coach_id: { type: Number, default: -1 }
    }
  },
  'shop-product-course-personal-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '管理私教排期'
    routeConfig.meta.parentRouteName = 'shop-product-course-schedule'
  },
  'shop-product-course-schedule-personal-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教1v1预约'
    routeConfig.queryOptions = {
      coach_id: { type: Number, default: -1 },
      time_unit: { type: Number, default: 2 }
    }
  },
  'shop-product-course-schedule-personal-personal-reserve-table'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '私教1v1预约'
    routeConfig.queryOptions = {
      coach_id: { type: Number, default: -1 }
    }
  },
  'brand-product-course-team-list-brand'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '品牌团体课程库'
    routeConfig.meta.auth = 'brand_shop:product:team_course|all_list'
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
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
      'shop-sold-course-list-package',
      'shop-sold-course-list-small-course'
    ]
  },
  'shop-sold-card-list-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}'
    routeConfig.meta.auth = 'shop:sold:sold_member_card|list'
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
    routeConfig.meta.auth = 'shop:sold:sold_deposit_card|list'
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
    routeConfig.meta.auth = 'shop:sold:sold_personal_course|list'
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
    routeConfig.meta.auth = 'shop:sold:sold_package_course|list'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      course_status: { type: Number, default: -1 },
      package_type: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-list-small-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}'
    routeConfig.meta.auth = 'shop:product:small_class_course|list'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      course_status: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-small-course-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}详情'
    routeConfig.meta.tabs = [
      'shop-sold-course-info-small-course-info-operation-record',
      'shop-sold-course-info-small-course-info-usage-log'
    ]
  },
  'shop-sold-course-info-small-course-info-usage-log'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '使用记录'
    routeConfig.meta.parentRouteName = 'shop-sold-course-info-small-course-info'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-small-course-info-operation-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '操作日志'
    routeConfig.meta.parentRouteName = 'shop-sold-course-info-small-course-info'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-package-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程包详情'
    routeConfig.meta.tabs = [
      'shop-sold-course-info-package-info-operation-record',
      'shop-sold-course-info-package-info-usage-log'
    ]
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
    routeConfig.meta.title = '操作日志'
    routeConfig.meta.parentRouteName = 'shop-sold-course-info-package-info'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-personal-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课详情'
    routeConfig.meta.tabs = [
      'shop-sold-course-info-personal-info-operation-record',
      'shop-sold-course-info-personal-info-usage-log'
    ]
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
    routeConfig.meta.title = '操作日志'
    routeConfig.meta.parentRouteName = 'shop-sold-course-info-personal-info'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-personal-info-usage-log'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '使用记录'
    routeConfig.meta.parentRouteName = 'shop-sold-course-info-personal-info'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-package-info-usage-log'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '使用记录'
    routeConfig.meta.parentRouteName = 'shop-sold-course-info-package-info'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-deposit-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡详情'
    routeConfig.meta.tabs = [
      'shop-sold-card-info-deposit-info-operation-record',
      'shop-sold-card-info-deposit-info-usage-log'
    ]
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
    routeConfig.meta.title = '操作日志'
    routeConfig.meta.parentRouteName = 'shop-sold-card-info-deposit-info'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-member-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}详情'
    routeConfig.meta.tabs = [
      'shop-sold-card-info-member-info-operation-record',
      'shop-sold-card-info-member-info-usage-log'
    ]
  },
  'shop-sold-card-info-member-info-consumption-record'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '{{$c("member_card")}}详情'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-member-info-operation-record'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '操作日志'
    routeConfig.meta.parentRouteName = 'shop-sold-card-info-member-info'
    routeConfig.queryOptions = {
      id: { type: Number },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-member-info-usage-log'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '使用记录'
    routeConfig.meta.parentRouteName = 'shop-sold-card-info-member-info'
    routeConfig.queryOptions = {
      id: { type: Number },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-deposit-info-usage-log'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '使用记录'
    routeConfig.meta.parentRouteName = 'shop-sold-card-info-deposit-info'
    routeConfig.queryOptions = {
      id: { type: Number },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-transaction'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '交易签单'
    routeConfig.meta.tabs = [
      'shop-sold-transaction-member',
      'shop-sold-transaction-deposit',
      'shop-sold-transaction-personal',
      'shop-sold-transaction-package',
      'shop-sold-transaction-lease',
      'shop-sold-transaction-store',
      'shop-sold-transaction-small-course'
    ]
  },
  'shop-sold-transaction-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}'
    routeConfig.meta.auth = 'shop:sold:transaction|member_card_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 1 }
    }
  },
  'shop-sold-transaction-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教课'
    routeConfig.meta.auth = 'shop:sold:transaction|personal_course_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 3 }
    }
  },
  'shop-sold-transaction-package'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程包'
    routeConfig.meta.auth = 'shop:sold:transaction|package_course_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 5 }
    }
  },
  'shop-sold-transaction-store'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '云店'
    routeConfig.meta.auth = 'shop:sold:transaction|cloud_product_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 4 }
    }
  },
  'shop-sold-transaction-deposit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡'
    routeConfig.meta.auth = 'shop:sold:transaction|deposit_card_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 2 }
    }
  },
  'shop-sold-transaction-lease'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '租赁柜'
    routeConfig.meta.auth = 'shop:sold:transaction|cabinet_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 6 }
    }
  },
  'shop-sold-transaction-small-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '小班课'
    // routeConfig.meta.auth = 'shop:sold:transaction|cabinet_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 6 }
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
      size: { type: Number, default: 10 }
    }
  },
  'shop-finance-order-info-collection-details'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收款明细'
  },
  'shop-finance-order-info-commodity-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '商品信息'
  },
  // 门店设置通行设置
  'shop-setting-hardware'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '硬件设置'
    routeConfig.queryOptions = {}
    routeConfig.meta.tabs = ['shop-setting-hardware-entry-list']
  },
  'shop-setting-hardware-entry-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '通行设置'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-product-course-personal-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增私教课'
    routeConfig.meta.parentRouteName =
      'brand-product-course-personal-list-brand'
  },
  'brand-setting-general'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '系统设置'
    routeConfig.meta.tabs = [
      'brand-setting-general-brand',
      'brand-setting-general-coach-level',
      // 'brand-setting-general-user-level', //暂时隐藏用户等级设置
      'brand-setting-general-course',
      'brand-setting-general-pay-type',
      'brand-setting-general-crm'
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
    routeConfig.meta.auth = 'brand:course:course_setting|tab'
    routeConfig.meta.tabs = [
      'brand-setting-app-course-category',
      'brand-setting-app-course-training-aim',
      'brand-setting-app-course-small-course-range'
    ]
  },
  'brand-setting-app-staff'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工'
    routeConfig.meta.tabs = ['brand-setting-app-staff-skillful']
    routeConfig.meta.auth = 'brand_shop:staff:staff_setting|tab'
  },
  'brand-setting-app-course-category'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程类型'
    routeConfig.meta.auth = 'brand:course:course_type|tab'
  },
  'brand-setting-app-course-training-aim'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '训练目的'
    routeConfig.meta.auth = 'brand:course:training_aim|tab'
  },
  'brand-setting-app-course-small-course-range'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}适用范围'
    routeConfig.meta.auth = 'brand:course:course_scope_setting|tab'
  },
  'brand-setting-app-staff-skillful'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '擅长项目'
    routeConfig.meta.auth = 'brand_shop:coach:good_at|list'
  },
  'shop-product-card-member-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}'
    routeConfig.meta.tabs = [
      'shop-product-card-member-list-shelves',
      'shop-product-card-member-list-all'
    ]
  },
  'shop-product-card-member-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店上架卡项'
    routeConfig.meta.auth = 'shop:product:member_card|shop_list'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'shop-product-card-member-list-all'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '全部{{$c("member_card")}}项'
    routeConfig.meta.auth = 'shop:product:member_card|all_list'
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
    routeConfig.meta.auth = 'shop:product:deposit_card|shop_list'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'shop-product-card-deposit-list-all'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '全部储值卡'
    routeConfig.meta.auth = 'shop:product:deposit_card|all_list'
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
    routeConfig.meta.auth = 'brand:product:deposit_card|shop_list'
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
    routeConfig.meta.auth = 'brand:product:deposit_card|all_list'
    routeConfig.queryOptions = {
      sell_status: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      size: { type: Number, default: 20 },
      page: { type: Number, default: 1 }
    }
  },
  'brand-product-card-member-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}'
    routeConfig.meta.tabs = [
      'brand-product-card-member-list-all',
      'brand-product-card-member-list-shelves'
    ]
  },
  'brand-product-card-member-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店上架卡项'
    routeConfig.meta.auth = 'brand:product:member_card|shop_list'
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
    routeConfig.meta.title = '全部{{$c("member_card")}}项'
    routeConfig.meta.auth = 'brand:product:member_card|all_list'
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
    routeConfig.meta.parentRouteName = 'shop-reception-index'
    routeConfig.meta.tabs = [
      'shop-reception-entrance-entrance',
      'shop-reception-entrance-log'
    ]
  },
  'shop-reception-entrance-entrance'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '入场管理'
    routeConfig.meta.parentRouteName = 'shop-reception-entrance'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      entry_type: { type: Number, default: -1 },
      keyword: { type: String, default: '' }
    }
  },
  'shop-reception-entrance-log'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '入场管理明细'
    routeConfig.meta.parentRouteName = 'shop-reception-entrance'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      entry_type: { type: Number, default: -1 },
      keyword: { type: String, default: '' }
    }
  },
  'brand-product-card-member-number-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}详情'
    routeConfig.meta.auth = 'brand:product:member_card|get'
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
    routeConfig.meta.title = '编辑{{$c("member_card")}}'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
  },
  'brand-product-card-member-add-select'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}'
  },
  'brand-product-card-member-period-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增{{$c("member_card")}}'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
  },
  'brand-product-card-member-period-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑{{$c("member_card")}}'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
  },
  'brand-product-card-member-number-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增次卡'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
  },
  'brand-product-card-member-period-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("member_card")}}详情'
    routeConfig.meta.auth = 'brand:product:member_card|get'
  },
  'brand-product-card-deposit-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储值卡详情'
    routeConfig.meta.auth = 'brand:product:deposit_card|get'
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
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      shop_id: { type: Number, default: -1 },
      work_status: { type: Number, default: -1 }
    }
  },
  'brand-staff-info-basic'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'brand-staff-info-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'brand-staff-info-follow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'brand-staff-info-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'brand-staff-info-sold'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      order_status: { type: Number, default: -1 },
      shop_id: { type: Number, default: -1 }
    }
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
    routeConfig.meta.auth = 'brand:salary:reports|list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      shop_id: { type: Number, default: -1 },
      department_id: { type: Number, default: -1 },
      search: { type: String, default: '' },
      start_month: { type: String, default: '' },
      end_month: { type: String, default: '' }
    }
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
    routeConfig.meta.auth = 'brand_shop:salary:basic_template|list'
  },
  'brand-finance-salary-template-performance'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '业绩模板'
    routeConfig.meta.auth = 'brand_shop:salary:commission_template|list'
  },
  'brand-setting-general-brand'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '品牌设置'
    routeConfig.meta.auth = 'brand_shop:brand:brand_info|get'
  },
  'brand-setting-general-crm'(routeConfig: RouteConfig) {
    routeConfig.meta.title = 'CRM规则设置'
    routeConfig.meta.auth = 'brand:setting:customer_protection_rule|get'
  },
  'brand-setting-general-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程定价及预约设置'
    routeConfig.meta.auth = 'brand:setting:course_price_reserve_setting|tab'
    routeConfig.meta.tabs = [
      'brand-setting-general-course-personal',
      'brand-setting-general-course-team',
      'brand-setting-general-course-small-course'
    ]
  },
  'brand-setting-general-course-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教设置'
    routeConfig.meta.auth = 'brand:setting:course_price_reserve_setting|get'
  },
  'brand-setting-general-course-team'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课设置'
    routeConfig.meta.auth = 'brand:setting:course_price_reserve_setting|get'
  },
  'brand-setting-general-course-small-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}设置'
    routeConfig.meta.auth = 'brand:setting:small_course_reserve_setting|tab'
  },
  'brand-setting-general-pay-type'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '支付方式'
    routeConfig.meta.auth = 'brand:setting:payment_method|get'
  },
  'brand-setting-general-coach-level'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("coach")}}等级设置'
    routeConfig.meta.auth = 'brand:setting:coach_level|list'
  },
  'brand-setting-general-user-level'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户等级设置'
    routeConfig.meta.auth = 'brand:setting:member_level|get'
  },
  'brand-setting-shop-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '门店设置'
    routeConfig.meta.auth = 'brand_shop:shop:shop|list'
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
  'brand-finance-flow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收支流水'
    routeConfig.meta.tabs = [
      'brand-finance-flow-income',
      'brand-finance-flow-income-detail',
      'brand-finance-flow-expenditure',
      'brand-finance-flow-expenditure-detail'
    ]
  },
  'brand-finance-flow-expenditure'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '支出流水-汇总'
    routeConfig.meta.auth = 'brand:flow:expenditure|summary_list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  },
  'brand-finance-flow-expenditure-detail'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '支出流水-明细'
    routeConfig.meta.auth = 'brand:flow:expenditure|detail_list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      search_number: { type: String, default: '' },
      start_amount: { type: String, default: '' },
      end_amount: { type: String, default: '' },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  },
  'brand-finance-flow-income'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收入流水-汇总'
    routeConfig.meta.auth = 'brand:flow:income|summary_list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      current_page: { type: Number, default: 1 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' },
      size: { type: Number, default: 20 }
    }
  },
  'brand-finance-flow-income-detail'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收入流水-明细'
    routeConfig.meta.auth = 'brand:flow:income|detail_list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      pay_channel: { type: Number, default: -1 },
      search_number: { type: String, default: '' },
      current_page: { type: Number, default: 1 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' },
      start_amount: { type: String, default: '' },
      end_amount: { type: String, default: '' },
      size: { type: Number, default: 20 }
    }
  },
  'brand-app-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '应用中心'
  },
  'brand-app-venue'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '场地预约'
    routeConfig.meta.tabs = [
      'brand-app-venue-data',
      'brand-app-venue-basic-setting',
      'brand-app-venue-notice-tpl'
    ]
  },
  'brand-app-venue-data'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '数据'
    routeConfig.meta.auth = 'brand:application:venues_reserve|list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      day: { type: String, default: '' },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-app-venue-basic-setting'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '基础设置'
    routeConfig.meta.auth = 'brand:application:venues_reserve|basic_setting'
  },
  'brand-app-venue-notice-tpl'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '通知模板'
    routeConfig.meta.auth = 'brand:application:venues_reserve|basic_template'
  },
  'shop-app-venue'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '场地预约'
    routeConfig.meta.tabs = [
      'shop-app-venue-manage',
      'shop-app-venue-record',
      'shop-app-venue-booking'
    ]
  },
  'shop-app-venue-manage'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '场地管理'
    routeConfig.meta.auth = 'shop:product:venues|list'
  },
  'shop-app-venue-manage-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '场地管理'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-app-venue-manage-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新建场馆'
  },
  'shop-app-venue-setting-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '高级设置'
  },
  'shop-app-venue-record'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '预约记录'
    routeConfig.meta.auth = 'shop:reserve:venues_reserve|log'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-app-venue-booking'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '代预约'
    routeConfig.meta.auth = 'shop:reserve:venues_reserve|list'
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
  'shop-reception-cabinet'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '储物柜使用'
  },
  'shop-member-list-club'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户列表'
    routeConfig.queryOptions = {
      keyword: { type: String, default: '' },
      member_level: { type: Number, default: -1 },
      register_way: { type: Number, default: -1 },
      saleman_protect_remain: { type: Number },
      coach_protect_remain: { type: Number },
      follow_min: { type: Number },
      follow_max: { type: Number },
      follow_salesman_id: { type: Number, default: -1 },
      follow_coach_id: { type: Number, default: -1 },
      follow_status: { type: Number, default: -1 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-member-list-studio'(routeConfig: RouteConfig) {
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
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-member-follow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户跟进列表'
    routeConfig.queryOptions = {
      keyword: { type: String, default: '' },
      member_level: { type: Number, default: -1 },
      follow_way: { type: Number, default: -1 },
      follow_status: { type: Number, default: -1 },
      follow_start_date: { type: String, default: '' },
      follow_end_date: { type: String, default: '' },
      follow_salesman_id: { type: Number, default: -1 },
      follow_coach_id: { type: Number, default: -1 },
      follow_start_num: { type: String, default: '' },
      follow_end_num: { type: String, default: '' },
      operator_id: { type: Number, default: -1 },
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
    routeConfig.queryOptions = {
      reserve_type: { type: Number, default: -1 },
      reserve_status: { type: Number, default: -1 },
      is_checkin: { type: Number, default: -1 }
    }
  },
  'shop-member-info-reserve'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-info-sales-interests'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户详情'
  },
  'shop-member-info-follow-record'(routeConfig: RouteConfig) {
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
      'shop-product-course-schedule-personal-team',
      'shop-product-course-schedule-small-course'
    ]
  },
  'shop-product-course-schedule-team'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课排期'
    routeConfig.meta.auth = 'shop:schedule:team_course_schedule|list'
  },
  'shop-product-course-schedule-team-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '团课排期'
  },
  'shop-product-course-schedule-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教1v1预约'
    routeConfig.meta.auth = 'shop:reserve:personal_course_reserve|list'
  },
  'shop-product-course-schedule-personal-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教1v1预约'
  },
  'shop-product-course-schedule-personal-team'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '私教小团课排期'
    routeConfig.meta.auth = 'shop:schedule:personal_team_course_schedule|list'
  },
  'shop-product-course-schedule-personal-team-personal-team-table'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '私教小团课排期'
    routeConfig.queryOptions = {
      coach_id: { type: Number, default: -1 }
    }
  },
  'shop-product-course-schedule-personal-team-personal-team'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '私教小团课排期'
    routeConfig.queryOptions = {
      coach_id: { type: Number, default: -1 },
      time_unit: { type: Number, default: 2 }
    }
  },
  'shop-product-course-schedule-small-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}'
    routeConfig.meta.auth = 'shop:schedule:small_class_course_schedule|list'
  },
  'shop-product-course-schedule-small-course-table'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}'
  },
  'shop-product-course-schedule-small-course-small-course'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '{{$c("small_course")}}'
    routeConfig.queryOptions = {
      coach_id: { type: Number, default: -1 },
      course_id: { type: Number, default: -1 }
    }
  },
  'shop-product-course-schedule-small-course-small-course-table'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '{{$c("small_course")}}'
    routeConfig.queryOptions = {
      coach_id: { type: Number, default: -1 },
      course_id: { type: Number, default: -1 }
    }
  },
  'shop-product-course-mini-schedule-inbatch-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}排期'
    routeConfig.meta.parentRouteName =
      'shop-product-course-schedule-small-course'
  },
  'shop-product-course-mini-schedule-inbatch-info'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}排期'
    routeConfig.meta.parentRouteName =
      'shop-product-course-schedule-small-course'
  },
  'shop-product-course-manage-small-course-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '{{$c("small_course")}}'
    routeConfig.meta.auth = 'shop:product:small_class_course|list'
    routeConfig.queryOptions = {
      class_status: { type: Number, default: -1 },
      course_name: { type: String, default: '' },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-product-course-manage-small-course-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '添加{{$c("small_course")}}'
    routeConfig.meta.auth = 'shop:product:small_class_course|add'
  },
  'shop-product-course-manage-small-course-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑{{$c("small_course")}}'
    routeConfig.meta.auth = 'shop:product:small_class_course|edit'
  },
  'shop-product-course-manage-small-course-info-basic'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '{{$c("small_course")}}详情'
    routeConfig.meta.auth = 'shop:product:small_class_course|get'
  },
  'shop-product-course-manage-small-course-info-class'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '{{$c("small_course")}}详情'
    routeConfig.meta.auth = 'shop:product:small_class_course|get'
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
    routeConfig.meta.title = '{{$c("member_card")}}详情'
  },
  'shop-product-card-member-add-select'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增{{$c("member_card")}}'
  },
  'shop-product-card-member-period-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增期限卡'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
  },
  'shop-product-card-member-period-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑{{$c("member_card")}}'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
  },
  'shop-product-card-member-number-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增次卡'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
  },
  'shop-product-card-member-number-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑次卡'
    routeConfig.queryOptions = {
      type: {
        type: String
      }
    }
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
    routeConfig.meta.parentRouteName = 'shop-staff-list'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'shop-staff-info-follow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'shop-staff-info-sold'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      order_status: { type: Number, default: -1 }
    }
  },
  'shop-staff-info-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'shop-staff-info-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '员工详情'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 }
    }
  },
  'shop-staff-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑员工'
    routeConfig.meta.parentRouteName = 'shop-staff-list'
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
  'common-contract-preview'(routeConfig: RouteConfig) {
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
    routeConfig.meta.parentRouteName = 'brand-setting-mina-index'
  },
  'brand-marketing-plugin'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '营销插件'
  },
  'brand-marketing-plugin-coupon-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增优惠券'
    routeConfig.meta.parentRouteName = 'brand-marketing-plugin-coupon-list'
  },
  'brand-marketing-plugin-coupon-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑优惠券'
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
    routeConfig.meta.parentRouteName = 'brand-marketing-plugin-crowd-index'
  },
  // TODO: 短信设置权限接入
  'brand-setting-sms'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '消息通知设置'
    routeConfig.meta.tabs = [
      'brand-setting-sms-group',
      'brand-setting-sms-list',
      'brand-setting-sms-notice',
      'brand-setting-sms-pay'
    ]
  },
  'brand-setting-sms-group'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '群发短信'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-setting-sms-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '短信列表'
    routeConfig.meta.auth = 'brand_shop:message:sms|list'
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      send_status: { type: Number, default: -1 },
      notify_type: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' }
    }
  },
  'brand-setting-sms-pay'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '短信充值'
    routeConfig.meta.auth = 'brand_shop:message:sms|charge_list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-setting-sms-notice'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '通知模版'
    routeConfig.meta.auth = 'brand_shop:message:notify|list'
  },
  'shop-stat'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '数据统计'
  },
  'shop-finance-flow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收支流水'
    routeConfig.meta.tabs = [
      'shop-finance-flow-income',
      'shop-finance-flow-expenditure'
    ]
  },
  'shop-finance-flow-expenditure'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '支出流水'
    routeConfig.meta.auth = 'shop:flow:expenditure|detail_list'
    routeConfig.queryOptions = {
      search_number: { type: String },
      start_amount: { type: String },
      end_amount: { type: String },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  },
  'shop-finance-flow-income'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收入流水'
    routeConfig.meta.auth = 'shop:flow:income|detail_list'
    routeConfig.queryOptions = {
      search_number: { type: String },
      current_page: { type: Number, default: 1 },
      start_amount: { type: String },
      end_amount: { type: String },
      size: { type: Number, default: 20 }
    }
  },
  'shop-stat-revenue'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '营收报表'
    routeConfig.queryOptions = {
      recently_day: { type: Number, default: 7 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-stat-follow'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '跟进报表'
    routeConfig.queryOptions = {
      showTable: { type: String, default: 'all' },
      recently_day: { type: Number, default: 7 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-stat-order'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '订单报表'
    routeConfig.queryOptions = {
      recently_day: { type: Number, default: 7 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-stat-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '上课报表'
    routeConfig.meta.tabs = [
      'shop-stat-course-summary',
      'shop-stat-course-coach'
    ]
  },
  'shop-stat-course-summary'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '汇总'
    routeConfig.queryOptions = {
      recently_day: { type: Number, default: 7 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-stat-course-coach'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '教练'
    routeConfig.queryOptions = {
      recently_day: { type: Number, default: 7 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      department_id: { type: Number, default: -1 },
      coach_id: { type: Number, default: -1 }
    }
  },
  'shop-stat-sell'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '销售报表'
    routeConfig.queryOptions = {
      showTable: { type: String, default: 'all' },
      recently_day: { type: Number, default: 7 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      department_id: { type: Number, default: -1 },
      staff_id: { type: Number, default: -1 }
    }
  },
  'shop-stat-finance'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '收银报表'
    routeConfig.queryOptions = {
      recently_day: { type: Number, default: 7 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-stat'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '数据统计'
    routeConfig.meta.tabs = [
      'brand-stat-revenue',
      'brand-stat-order',
      'brand-stat-course'
    ]
  },
  'brand-stat-revenue'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '营收'
    routeConfig.meta.auth = 'brand_shop:stat:revenue_reports|page'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      day: { type: Number, default: 7 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  },
  'brand-stat-order'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '订单'
    routeConfig.meta.auth = 'brand_shop:stat:order_reports|page'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      day: { type: Number, default: 7 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  },
  'brand-stat-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '课程'
    routeConfig.meta.auth = 'brand:stat:course|page'
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      day: { type: Number, default: 7 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' }
    }
  },
  'brand-setting-import'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '数据导入'
    routeConfig.meta.tabs = [
      'brand-setting-import-explain',
      'brand-setting-import-staff',
      'brand-setting-import-commodity',
      'brand-setting-import-member',
      'brand-setting-import-sold',
      'brand-setting-import-record'
    ]
  },
  'brand-setting-import-explain'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '导入说明'
    routeConfig.meta.auth = 'brand:setting:import|import_intro'
  },
  'brand-setting-import-staff'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '导入员工'
    routeConfig.meta.auth = 'brand:setting:import|import_staff'
  },
  'brand-setting-import-commodity'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '导入商品'
    routeConfig.meta.auth = 'brand:setting:import|import_product'
  },
  'brand-setting-import-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '导入用户'
    routeConfig.meta.auth = 'brand:setting:import|import_member'
  },
  'brand-setting-import-sold'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '导入售出'
    routeConfig.meta.auth = 'brand:setting:import|import_sold'
  },
  'brand-setting-import-record'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '导入记录'
    routeConfig.meta.auth = 'brand:setting:import|import_get'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-marketing-plugin-lottery-index'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '幸运大转盘'
    routeConfig.queryOptions = {
      activity_status: { type: Number },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      keyword: { type: String }
    }
  },
  'brand-marketing-plugin-lottery-info-prize'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '奖品列表'
    routeConfig.queryOptions = {
      activity_id: { type: String },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-marketing-plugin-lottery-info-users'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '用户数据列表'
    routeConfig.queryOptions = {
      id: { type: String },
      present_status: { type: Number },
      prize_type: { type: Number },
      prize_status: { type: Number },
      start_time: { type: String },
      end_time: { type: String },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-marketing-plugin-lottery-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增活动'
  },
  'brand-marketing-plugin-lottery-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑'
  },
  'brand-marketing-plugin-lottery-checkin'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '核销'
  },
  'brand-marketing-plugin-lottery-success'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '成功'
  },
  'shop-finance-gathering'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '暂收款管理'
    routeConfig.meta.tabs = ['shop-finance-gathering-earnest']
  },
  'shop-reception-reserve'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '预约管理'
    routeConfig.queryOptions = {
      keyword: { type: String, default: '' },
      reserve_type: { type: Number, default: -1 },
      start_time: {
        type: String,
        default: `${moment().format('YYYY-MM-DD')} 00:00`
      },
      end_time: {
        type: String,
        default: `${moment().format('YYYY-MM-DD')} 23:59`
      },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-finance-gathering-earnest'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '定金管理'
    // routeConfig.meta.auth = 'shop:temporary_payment:bargin|list'
    routeConfig.queryOptions = {
      keyword: { type: String, default: '' },
      use_status: { type: Number, default: -1 },
      start_date: { type: String, default: '' },
      end_date: { type: String, default: '' },
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'brand-marketing-plugin-activity-registration-roster'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '名单列表'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      ticket_status: { type: Number, default: -1 },
      ticket_id: { type: Number, default: -1 }
    }
  },
  'brand-marketing-plugin-activity-registration-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增活动报名'
  },
  'brand-marketing-plugin-activity-registration-edit'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '编辑活动报名'
  },
  'brand-marketing-plugin-activity-registration-list'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '活动报名'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      activity_name: { type: String, default: '' },
      activity_status: { type: Number, default: -1 }
    }
  },
  'brand-marketing-plugin-activity-registration-checkin'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '签到验票'
  },
  'brand-marketing-plugin-activity-registration-success'(
    routeConfig: RouteConfig
  ) {
    routeConfig.meta.title = '保存成功'
  },
  'brand-marketing-plugin-group-add-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增拼团'
  },
  'brand-marketing-plugin-group-add-package-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增拼团'
  },
  'brand-marketing-plugin-group-choose'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '选择拼团类型'
  },
  'brand-marketing-plugin-group-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '拼团列表'
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      activity_name: { type: String, default: '' },
      activity_status: { type: Number, default: -1 }
    }
  },
  'brand-marketing-plugin-group-data'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '数据列表'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      search_where: { type: String, default: '' },
      group_status: { type: Number, default: -1 }
    }
  },
  'brand-marketing-plugin-group-add-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增拼团'
  },
  'brand-marketing-plugin-group-edit-package-course'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑拼团'
  },
  'brand-marketing-plugin-group-edit-member'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑拼团'
  },
  'brand-marketing-plugin-group-edit-personal'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑拼团'
  },
  'brand-marketing-plugin-group-add-deposit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新增拼团'
  },
  'brand-marketing-plugin-group-edit-deposit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑拼团'
  },
  'brand-setting-task-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '任务中心'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-setting-task-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '任务中心'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-store-stock-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '库存管理'
    routeConfig.meta.tabs = [
      'shop-store-stock-list-search',
      'shop-store-stock-list-detail'
    ]
  },
  'shop-store-stock-list-search'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '库存查询'
    routeConfig.meta.auth = 'shop:cloud_store:stock|list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' }
    }
  },
  'shop-store-stock-list-detail'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '出入库明细'
    routeConfig.meta.auth = 'shop:cloud_store:stock|access_storage_obvious'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_id: { type: Number, default: -1 },
      stock_flow: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' }
    }
  },
  'shop-store-order-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '发货管理'
    routeConfig.meta.tabs = [
      'shop-store-order-list-verification',
      'shop-store-order-list-shipments',
      'shop-store-order-list-signin'
    ]
  },
  'shop-store-order-list-shipments'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '待发货订单'
    routeConfig.meta.auth = 'shop:cloud_store:order|stay_deliver_goods'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      search_where: { type: String, default: '' }
    }
  },
  'shop-store-order-list-signin'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '待签收订单'
    routeConfig.meta.auth = 'shop:cloud_store:order|stay_delivers'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      search_where: { type: String, default: '' }
    }
  },
  'shop-store-order-list-verification'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '待核销订单'
    routeConfig.meta.auth = 'shop:cloud_store:order|stay_verification'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      search_where: { type: String, default: '' }
    }
  },
  'shop-store-list'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '云店列表'
    routeConfig.meta.auth = 'shop:cloud_store:goods|list'
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      shelves_status: { type: Number, default: -1 },
      category_id: { type: Number, default: -1 }
    }
  },
  'shop-store-add'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '新建商品'
  },
  'shop-store-edit'(routeConfig: RouteConfig) {
    routeConfig.meta.title = '编辑商品'
  },
  ...tplConfigs
}
