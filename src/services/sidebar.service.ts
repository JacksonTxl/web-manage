import { BeforeRouteEnter, StRoute } from '@/types'

class SidebarService implements BeforeRouteEnter {
  beforeRouteEnter(to: StRoute, from: StRoute, next: Function) {
    console.log('sidebar haha')
    next()
  }
}
export const sidebarService = new SidebarService()
