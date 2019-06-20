import LayoutBlank from './blank.vue'
import LayoutDefaultShop from './default-shop.vue'
import LayoutDefault from './default.vue'
import LayoutLogin from './login.vue'
import LayoutLoading from './loading.vue'

// this is will used in router/routes
export const layoutMap = {
  blank: LayoutBlank,
  'default': LayoutDefault,
  'default-shop': LayoutDefaultShop,
  login: LayoutLogin,
  loading: LayoutLoading
}
