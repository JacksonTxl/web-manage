import { Api } from '../../api'
const url = '/v1/setting/course'
export class CourseApi extends Api {
  /**
   * 课程类型列表
   */
  getCourseTypeList(query: GetCourseTypeListInput) {
    return this.http.get(url, { query })
  }
  /**
   * 添加课程类型
   */
  addCourseType(params: AddCourseTypeInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑课程类型
   */
  updateCourseType(params: UpdateCourseTypeInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  /**
   * 删除课程类型
   */
  deleteCourseType(params: DeleteCourseTypeInput) {
    return this.http.delete(`${url}/${params.id}`)
  }
}

export interface GetCourseTypeListInput {
  page?: number,
  size?: number
}

export interface AddCourseTypeInput {
  /**
   * 添加课程类型名称
   */
  setting_name: string
}

export interface UpdateCourseTypeInput {
  /**
   * 课程类型id
   */
  id: number
  /**
   * 编辑课程类型名称
   */
  setting_name: string
}

export interface DeleteCourseTypeInput {
  /**
   * 课程类型设置ID
   */
  id: number
}
