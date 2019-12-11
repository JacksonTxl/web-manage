import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { Store } from '@/services/store'
import { CourseGroupApi } from '@/api/v1/course/group'
@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(private courseApi: CourseGroupApi) {}
  @Effect()
  addGroup(params: any) {
    return this.courseApi.addGroup(params)
  }
  @Effect()
  setCoach(params: any) {
    return this.courseApi.setCoach(params)
  }
  @Effect()
  setPrice(params: any) {
    return this.courseApi.setPrice(params)
  }
}
