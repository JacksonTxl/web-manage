import { I18NService } from './i18n.service'
import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { UserService } from './user.service'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TitleService implements RouteGuard {
  title$ = new State<string>('')
  documentTitle$ = new Computed(
    combineLatest(
      this.title$,
      this.userService.brand$,
      this.userService.shop$
    ).pipe(
      map(([title, brand, shop]) => {
        if (brand.name || shop.name) {
          return `${title ? title + ' - ' : ''}${shop.name} ${brand.name}`
        }
        return `${title ? title + ' - ' : ''}三体云动`
      })
    )
  )

  constructor(private userService: UserService) {
    this.documentTitle$.subscribe(documentTitle => {
      document.title = documentTitle
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.title$.commit(() => to.meta.title)
    next()
  }
}
