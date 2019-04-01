import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { StaffApi } from '@/api/staff/staff'
import { StaffPubApi } from '@/api/staff/staff-pub'
import { Store } from '@/services/store'

@Injectable()
export class AddService {
  constructor(private StaffPubApi: StaffPubApi) {

  }
  getCounty() {
    return this.StaffPubApi.getCountry()
  }
  beforeRouteEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to)
    console.log(from)
    console.log(next)
    next()
  }
}
