import { Api } from '../../api'

export interface OnsalePackageInput {
  id: string | number,
  start_time: string,
  end_time: string
}
export class PackageApi extends Api {
  /**
   * 创建课程包（不限课程）
   */
  AddCoursePackageUnlimited(params: any) {
    return this.http.post(`/v1/course/package/unlimited`, { params })
  }
  /**
   * 课程包上架
   */
  onsaleCoursePackage(params:OnsalePackageInput) {
    return this.http.put(`/v1/course/package/onsale/${params.id}`, { params: {
      start_time: params.start_time,
      end_time: params.end_time
    } })
  }
}
