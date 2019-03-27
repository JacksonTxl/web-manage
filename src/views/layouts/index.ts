import LayoutBlank from './blank.vue'
import LayoutDefault from './default.vue'
import LayoutDefaultBrand from './kael-default-brand.vue'
import LayoutLogin from './login.vue'
import LayoutLoading from './loading.vue'

// this is will used in router/routes
export const layoutMap = {
  blank: LayoutBlank,
  'default-brand': LayoutDefaultBrand,
  'default-shop': LayoutDefault,
  login: LayoutLogin,
  loading: LayoutLoading
}
