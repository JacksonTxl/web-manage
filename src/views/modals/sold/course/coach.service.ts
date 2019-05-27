import { Injectable } from 'vue-service-app'
import { CourseApi, EditCoursePersonalCoachInput } from '@/api/v1/sold/course'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { CoachApi } from '@/api/v1/staff/coach'

@Injectable()
export class CoachService {
  loading$ = new State({})
  coachList$ = new State({})
  constructor(private coachApi: CoachApi, private courseApi: CourseApi) {}
  @Effect()
  getCoachList() {
    return this.coachApi.getCoachList().pipe(tap((res:any) => {
      this.coachList$.commit(() => res.list)
    }))
  }
  @Effect()
  edit(params: EditCoursePersonalCoachInput, id:string) {
    return this.courseApi.editCoursePersonalCoach(params, id)
  }
}
