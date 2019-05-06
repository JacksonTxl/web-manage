import { Api } from '../../api'

export class PackageApi extends Api {
  /**
   *
   * 创建课程包（不限课程）
   */
  AddCoursePackageUnlimited(params: any) {
    return this.http.post(`/v1/course/package/unlimited`, { params })
  }
}
