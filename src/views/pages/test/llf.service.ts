import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ManageApi, ManagePhoneInput } from '@/api/v1/account/manage'
import { LayoutBrandService } from '@/services/layouts/layout-brand.service'
import { of } from 'rxjs'

interface LlfState {
  name: string
  age: number
}
@Injectable()
export class LlfService extends Store<LlfState> {
  state$: State<LlfState>
  name$: Computed<string>
  constructor(
    private manageApi: ManageApi,
    private layoutBrandSerivce: LayoutBrandService
  ) {
    super()
    this.state$ = new State({
      name: 'lee',
      age: 33
    })
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
  @Effect()
  test(data: ManagePhoneInput) {
    return this.manageApi.findManagePhone(data)
  }
  init() {
    this.layoutBrandSerivce.SET_BREADCRUMBS([
      {
        label: '这是标签',
        href: '/brand/add'
      },
      {
        label: '这是第二个标签',
        href: '/brand/shop/add'
      }
    ])
    return of('ok')
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => {
      next()
    })
  }
}
