import {
  Injectable,
  ServiceRoute,
  Controller,
  ServiceRouter
} from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { BrandApi, UpdateInput } from '@/api/v1/setting/brand'
import { VenueApi, VenueQuery, SwitchParams } from '@/api/v1/venue'
import { get } from 'lodash-es'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class ManageService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  venueList$ = new State([])
  perTime$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:product:venues|add'
  })
  constructor(
    private brandApi: BrandApi,
    private venueApi: VenueApi,
    private authService: AuthService,
    private router: ServiceRouter
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
  setPerTime(value: number) {
    this.perTime$.commit(() => value)
  }
  @Effect()
  update(data: UpdateInput) {
    return this.brandApi.update(data)
  }
  redirect(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (
      to.name === 'shop-app-venue-manage' &&
      from.name !== 'shop-app-venue-manage-add'
    ) {
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
  beforeCreate() {
    this.getVenueList().subscribe(() => {
      this.router.push({
        name: 'shop-app-venue-manage-list',
        query: {
          id: get(this.venueList$.snapshot(), '0.venues_id')
        }
      })
    })
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('beforeRouteUpdate', from.name)
    if (
      from.name === 'shop-app-venue-manage-add' ||
      from.name === 'shop-app-venue-manage-edit'
    ) {
      this.getVenueList().subscribe(() => {
        this.redirect(to, from, next)
      })
    } else {
      this.redirect(to, from, next)
    }
  }
}
