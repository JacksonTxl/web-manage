import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'
import { State, computed } from 'rx-state'
import { UserService } from './user.service'

@Injectable()
export class TitleService implements RouteGuard {
  title$ = new State<string>('')
  documentTitle$ = computed<string>(
    (title: string, brand: any, shop: any) => {
      if (brand.name || shop.name) {
        return `${title ? title + ' - ' : ''}${shop.name} ${brand.name}`
      }
      return `${title ? title + ' - ' : ''}三体云动`
    },
    [this.title$, this.userService.brand$, this.userService.shop$]
  )

  constructor(private userService: UserService) {
    this.documentTitle$.subscribe(documentTitle => {
      document.title = documentTitle
    })
  }
  SET_TITLE(title: string) {
    this.title$.commit(() => title)
  }
  beforeEach(to: ServiceRoute) {
    this.SET_TITLE(this.userService.interpolation(to.meta.title))
  }
}
