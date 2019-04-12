import { ServiceRoute } from 'vue-service-app'
import { SetService } from './set.service'

export class AddService extends SetService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getPersonalBrand({
      course_id: 1
    }).subscribe(res => {
      this.SET_PERSONAL_BRND(res)
    })
    next()
  }
}
