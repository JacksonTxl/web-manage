import { listToTree } from '@/utils/list-to-tree.ts'
import { cloneDeep } from 'lodash-es'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { PackageApi } from '@/api/v1/course/package'
import { anyAll } from '@/operators'

@Injectable()
export class ScopeService {
  loading$ = new State({})
  list_num$ = new State(0)
  coachList$ = new State([])
  teamCourseList$ = new State([])
  teamCourseTreeList$ = new State([])
  personalCourseList$ = new State([])
  personalCourseTreeList$ = new State([])
  constructor(private courseApi: CourseApi, private packageApi: PackageApi) {}
  fetchCourseNum(params: any) {
    params = cloneDeep(params)
    params.package_type = 2
    return this.courseApi.fetchSoldPackageValidNum(params).pipe(
      tap((res: any) => {
        this.list_num$.commit(() => res.list_num)
      })
    )
  }
  getCoachList() {
    return this.packageApi.getCoachList().pipe(
      tap((res: any) => {
        this.coachList$.commit(() => res.list)
      })
    )
  }
  geAllCourseList() {
    return this.packageApi.geAlltCourseList().pipe(
      tap((res: any) => {
        this.teamCourseList$.commit(() => cloneDeep(res.course_list))
        this.teamCourseTreeList$.commit(() =>
          listToTree(cloneDeep(res.course_list))
        )
      })
    )
  }
  geAllPersonalCourseList() {
    return this.courseApi.geAllPersonalCourseList().pipe(
      tap((res: any) => {
        this.personalCourseList$.commit(() => cloneDeep(res.course_list))
        this.personalCourseTreeList$.commit(() =>
          listToTree(cloneDeep(res.course_list))
        )
      })
    )
  }
  @Effect()
  changePackageRange(params: any) {
    return this.courseApi.changePackageRange(params)
  }
  init(params: any) {
    return anyAll(
      this.fetchCourseNum(params),
      this.getCoachList(),
      this.geAllCourseList(),
      this.geAllPersonalCourseList()
    )
  }
}
