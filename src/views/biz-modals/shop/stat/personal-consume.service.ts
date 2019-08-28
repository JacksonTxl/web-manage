import { StatApi } from '@/api/v1/stat/shop'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'

@Injectable()
export class PersonalConsumeService {
  courseTypeList$ = new State({})
  loading$ = new State({})
  constructor(private statApi: StatApi) {}
  @Effect()
  getCourseList(params: any) {
    return this.statApi.getCourseList(params)
  }
}
