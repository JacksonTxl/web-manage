import { ServiceRoute } from 'vue-service-app'

export class ListService {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('hello')
    console.log(to.meta)
    next()
  }
}
