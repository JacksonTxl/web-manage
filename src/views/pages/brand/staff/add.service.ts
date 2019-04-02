import { SaveData } from './../../../../api/staff/staff-add'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { StaffAddApi } from '@/api/staff/staff-add'
import { StaffPubApi } from '@/api/staff/staff-pub'
import { StaffApi } from '@/api/v1/staff'

@Injectable()
export class AddService {
  constructor(private StaffApi: StaffApi) {

  }
  // getCounty() { // 获取国际化手机号前缀
  //   return this.StaffPubApi.getCountry()
  // }

  save(data: SaveData) {
    return this.StaffApi.saveStaffInfo(data)
  }

  beforeRouteEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to)
    console.log(from)
    console.log(next)
    next()
  }
}
