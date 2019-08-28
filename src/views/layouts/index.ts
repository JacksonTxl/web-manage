import LayoutBlank from './blank.vue'
import LayoutDefault from './default.vue'
// import LayoutSkeleton from './skeleton.vue'
import LayoutLoading from './loading.vue'

// this is will used in router/routes
export const layoutMap = {
  blank: LayoutBlank,
  default: LayoutDefault,
  // skeleton: LayoutSkeleton,
  loading: LayoutLoading
}
