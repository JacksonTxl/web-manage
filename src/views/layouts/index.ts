import LayoutBlank from './blank.vue'
import LayoutDefault from './default.vue'
import LayoutLogin from './login.vue'
// import LayoutSkeleton from './skeleton.vue'
import LayoutLoading from './loading.vue'

// this is will used in router/routes
export const layoutMap = {
  blank: LayoutBlank,
  default: LayoutDefault,
  login: LayoutLogin,
  // skeleton: LayoutSkeleton,
  loading: LayoutLoading
}

console.log('layoutMap ->', layoutMap)
