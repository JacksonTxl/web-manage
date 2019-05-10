import { InfoService } from '../info.service'
import { Injectable, ServiceRoute } from 'vue-service-app'

@Injectable()
export class BasicService extends InfoService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    // const { id } = to.meta.query
    // this.getHeaderInfo(id).subscribe(() => {
    //     // next()
    // })
    console.log(this)
    next()
  }
}
