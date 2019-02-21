import { BeforeRouteEnter } from '@/types'
import { Route } from 'vue-router'

class SidebarService implements BeforeRouteEnter {
  beforeRouteEnter(to: Route, from: Route, next: any) {
    next()
  }
}
export const sidebarService = new SidebarService()
