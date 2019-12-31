import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  VenueApi,
  SitesAddParams,
  SettingsQuery,
  OrderParams,
  SettingDelQuery
} from '@/api/v1/venue'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class SettingService {
  loading$ = new State({})
  list$ = new State([])
  auth$ = this.authService.authMap$({
    add: 'shop:product:venues_site|setting_add',
    edit: 'shop:product:venues_site|setting_edit',
    top: 'shop:product:venues_site|setting_top',
    del: 'shop:product:venues_site|setting_del'
  })
  constructor(private venueApi: VenueApi, private authService: AuthService) {}
  addSites(params: SitesAddParams) {
    return this.venueApi.addSites(params)
  }
  orderSetting(params: OrderParams) {
    return this.venueApi.orderSettings(params)
  }
  deleteSetting(query: SettingDelQuery) {
    return this.venueApi.deleteSetting(query)
  }
  getList(query: SettingsQuery) {
    return this.venueApi.getSettings(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
}
