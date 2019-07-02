import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CourseApi } from '@/api/v1/setting/course'

@Injectable()
export class LeaseService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private leaseApi: CourseApi) {}
  beforeEach(to:ServiceRoute, from: ServiceRoute, next: ()=>{}) {
    next()
  }
}
