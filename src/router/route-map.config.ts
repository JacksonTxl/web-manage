import { ServiceRouteConfig } from 'vue-service-app'

interface RouteConfig extends ServiceRouteConfig {
  meta: {
    layout: string
    title: string
  }
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
  'shop-sold-card-member'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      card_type: { type: Number, default: -1 },
      card_status: { type: Number, default: 1 },
      is_open: { type: Number, default: -1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  },
  'shop-sold-card-deposite'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      search: { type: String, default: '' },
      is_valid: { type: Number, default: 1 },
      start_time: { type: String, default: '' },
      end_time: { type: String, default: '' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  }
}
