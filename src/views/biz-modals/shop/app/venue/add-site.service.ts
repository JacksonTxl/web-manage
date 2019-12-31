import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { VenueApi, SitesAddParams } from '@/api/v1/venue'

@Injectable()
export class AddSiteService {
  loading$ = new State({})
  constructor(private venueApi: VenueApi) {}
  addSites(params: SitesAddParams) {
    return this.venueApi.addSites(params)
  }
}
