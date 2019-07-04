import LayoutBlank from './blank.vue'
import LayoutDefault from './default.vue'
import LayoutLogin from './login.vue'
import LayoutSkeleton from './skeleton.vue'

// this is will used in router/routes
export const layoutMap = {
  blank: LayoutBlank,
  default: LayoutDefault,
  login: LayoutLogin,
  skeleton: LayoutSkeleton
}
