import { ServiceRouteConfig } from 'vue-service-app'

interface RouteConfig extends ServiceRouteConfig {
  meta: {
    layout: string
    title: string
    auth: object,
    name: string
  },
}
interface StaffEdit extends ServiceRouteConfig {
  staff_id?: number
  currentIndex?: number
}
export const routeMapConfig = {
  '404'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'blank'
  },
  'account-login'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'login'
  },
  styleguide(routeConfig: RouteConfig) {
    routeConfig.redirect = { name: 'styleguide-component' }
  },
  'brand-product-course-personal-list-shop'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      category_id: { type: Number, default: -1 },
      is_available: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'brand-product-course-personal-list-brand'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'brand-product-course-team-list-shop'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      shop_id: { type: Number, default: -1 },
      category_id: { type: Number, default: -1 },
      course_name: { type: String, default: '' }
    }
  },
  'shop-product-course-manage-personal-list'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      category_id: { type: Number, default: -1 },
      is_available: { type: Number, default: 1 },
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
    routeConfig.queryOptions = {
      package_type: { type: Number, default: -1 },
      shelf_status: { type: Number, default: -1 },
      course_name: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-list-member'(routeConfig: RouteConfig) {
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
  'shop-sold-card-list-deposite'(routeConfig: RouteConfig) {
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
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      course_status: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-package-info-consumption-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-package-info-operation-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-personal-info-consumption-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-course-info-personal-info-operation-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-deposite-info-consumption-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-deposite-info-operation-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-member-info-consumption-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-info-member-info-operation-record'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-transaction-list'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      product_name: { type: String, default: '' },
      product_type: { type: Number, default: 1 }
    }
  },
  'brand-setting-app'(routeConfig: RouteConfig) {
  },
  'brand-setting-app-course'(routeConfig: RouteConfig) {
    routeConfig.meta.auth = {
      list: [
        'brand_shop:member:course_type|list'
      ]
    }
  },
  'brand-setting-app-course-category'(routeConfig: RouteConfig) {
    routeConfig.meta.auth = {
      list: [
        'brand_shop:member:course_type|edit',
        'brand_shop:member:course_type|delete'
      ]
    }
  },
  'brand-setting-app-course-training-aim'(routeConfig: RouteConfig) {
    routeConfig.meta.auth = {
      list: [
        'brand_shop:member:training_aim|edit',
        'brand_shop:member:training_aim|delete'
      ]
    }
  },
  'brand-setting-app-staff-skillful'(routeConfig: RouteConfig) {
    routeConfig.meta.auth = {
      list: [
        'brand_shop:member:good_at|edit',
        'brand_shop:member:good_at|delete'
      ]
    }
  },
  'shop-product-card-member-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'shop-product-card-member-list-all'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      sell_status: { type: Number, default: -1 },
      shelf_status: { type: Number, default: -1 }
    }
  },
  'shop-product-card-deposite-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'shop-product-card-deposite-list-all'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      sell_status: { type: Number, default: -1 },
      shelf_status: { type: Number, default: -1 }
    }
  },
  'brand-product-card-member-list-shelves'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' }
    }
  },
  'brand-product-card-member-list-all'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      current_page: { type: Number, default: 1 },
      size: { type: Number, default: 20 },
      card_type: { type: Number, default: -1 },
      publish_channel: { type: Number, default: -1 },
      card_name: { type: String, default: '' },
      sell_status: { type: Number, default: -1 }
    }
  }
}
