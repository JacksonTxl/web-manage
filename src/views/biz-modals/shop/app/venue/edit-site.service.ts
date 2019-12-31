import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { VenueApi, SiteEditParams } from '@/api/v1/venue'

@Injectable()
export class EditSiteService {
  loading$ = new State({})
  constructor(private venueApi: VenueApi) {}
  editSite(params: SiteEditParams) {
    return this.venueApi.editSite(params)
  }
}
