import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CourseApi, FreezeCoursePackageInput } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'

@Injectable()
export class FreezeService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}

  getInfo(id:string) {
    return this.courseApi.getFreezeCourseInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }

  @Effect()
  freeze(params: FreezeCoursePackageInput, id:string, type:string) {
    return this.courseApi.freezeCourse(params, id, type)
  }
}
