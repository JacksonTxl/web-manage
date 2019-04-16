import { SetService } from './set.service'
import { ServiceRoute } from 'vue-service-app'

export class EditService extends SetService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('this', this)
    this.getCountryCodes().subscribe(res => {
      console.log('mobel', res)
    })
    this.getStaffBrandReview('1').subscribe(res => {
      this.SET_STAFF_BRND(res)
      next()
    })
  }
}
