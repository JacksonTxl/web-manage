import { UserService } from '@/services/user.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import {
  SiteQuery,
  VenueApi,
  SitesParams,
  SiteSwitchParams
} from '@/api/v1/venue'
@Injectable()
export class ListService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  selectedSites$ = new State([])
  auth$ = this.authService.authMap$({
    delAll: 'shop:product:venues_site|batch_del',
    addAll: 'shop:product:venues_site|batch_setting',
    addSite: 'shop:product:venues_site|add'
  })
  constructor(private venueApi: VenueApi, private authService: AuthService) {}
  @Effect()
  getList(query: SiteQuery) {
    return this.venueApi.getSiteList(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  delSites(params: SitesParams) {
    return this.venueApi.delSites(params)
  }
  setSites(sites: []) {
    this.selectedSites$.commit(() => sites)
  }
  switchSite(params: SiteSwitchParams) {
    return this.venueApi.switchSite(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { id } = to.query as any
    return this.getList({ venues_id: id })
  }
}
