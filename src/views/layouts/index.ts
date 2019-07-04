import LayoutBlank from './blank.vue'
import LayoutDefault from './default.vue'
import LayoutLogin from './login.vue'
import LayoutSkeletonBrand from './skeleton-brand.vue'
import LayoutSkeletonShop from './skeleton-shop.vue'

// this is will used in router/routes
export const layoutMap = {
  blank: LayoutBlank,
  default: LayoutDefault,
  login: LayoutLogin,
  'skeleton-brand': LayoutSkeletonBrand,
  'skeleton-shop': LayoutSkeletonShop
}
