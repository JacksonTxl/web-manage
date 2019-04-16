import LayoutBlank from './blank.vue'
import LayoutDefaultShop from './default-shop.vue'
import LayoutDefaultBrand from './default-brand.vue'
import LayoutLogin from './login.vue'
import LayoutLoading from './loading.vue'

// this is will used in router/routes
export const layoutMap = {
  blank: LayoutBlank,
  'default-brand': LayoutDefaultBrand,
  'default-shop': LayoutDefaultBrand,
  login: LayoutLogin,
  loading: LayoutLoading
}
