import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { BrandApi, UpdateInput } from '@/api/v1/setting/brand'
import { VenueApi, VenueQuery, SwitchParams } from '@/api/v1/venue'
import { get } from 'lodash-es'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ManageService implements Controller {
  info$ = new State({})
  systemInfo$ = new State({})
  loading$ = new State({})
  venueList$ = new State([])
  auth$ = this.authService.authMap$({
    add: 'shop:product:venues|add'
  })
  constructor(
    private brandApi: BrandApi,
    private venueApi: VenueApi,
    private authService: AuthService
  ) {}
  getVenueList() {
    return this.venueApi.getVenueList().pipe(
      tap((res: any) => {
        this.venueList$.commit(() => res.list)
      })
    )
  }
  delVenue(query: VenueQuery) {
    return this.venueApi.delVenue(query)
  }
  switchVenue(params: SwitchParams) {
    return this.venueApi.switchVenue(params)
  }
  @Effect()
  update(data: UpdateInput) {
    return this.brandApi.update(data)
  }
  redirect(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-app-venue-manage') {
      next({
        name: 'shop-app-venue-manage-list',
        query: {
          id: get(this.venueList$.snapshot(), '0.venues_id')
        }
      })
    } else {
      next()
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('beforeRouteEnter')
    this.getVenueList().subscribe(() => {
      this.redirect(to, from, next)
    })
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirect(to, from, next)
  }
}
