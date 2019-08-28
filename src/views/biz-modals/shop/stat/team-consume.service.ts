import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CourseApi } from '@/api/v1/setting/course'
import { PackageApi, GetCourseInput } from '@/api/v1/course/package'

@Injectable()
export class TeamConsumeService {
  courseTypeList$ = new State({})
  loading$ = new State({})
  constructor(private courseApi: CourseApi, private packageApi: PackageApi) {}
  @Effect()
  getCourseList(params: GetCourseInput) {
    return this.packageApi.getCourseList(params)
  }
  getCourseTypeList() {
    return this.courseApi.getCourseCategoryList({})
  }
}
