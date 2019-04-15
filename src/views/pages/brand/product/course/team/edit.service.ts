import { ServiceRoute } from 'vue-service-app'
import { TeamService } from './team.service'

export class TeamEditService extends TeamService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('to', to)
    // this.getDetail({
    // //   course_id: 1
    // }).subscribe(res => {
    //   this.SET_PERSONAL_BRND(res)
    // })
    next()
  }
}
