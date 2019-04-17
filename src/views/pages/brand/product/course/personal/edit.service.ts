import { ServiceRoute } from 'vue-service-app'
import { SetService } from './set.service'

export class EditService extends SetService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getPersonalBrandInfo({
      course_id: 6
    }).subscribe(() => {
      next()
    })
  }
}
