import { Api } from '../../api'

export class CourseApi extends Api {
  /**
   * 课程类型列表
   */
  getCourseTypeList(query: GetCourseTypeListInput) {
    return this.http.get('/v1/setting/course', { query })
  }
  /**
   * 添加课程类型
   */
  addCourseType(params: AddCourseTypeInput) {
    return this.http.post('/v1/setting/course', { params })
  }
  /**
   * 编辑课程类型
   */
  updateCourseType(params: UpdateCourseTypeInput) {
    return this.http.put('/v1/setting/course', { params })
  }
  /**
   * 删除课程类型
   */
  deleteCourseType(params: DeleteCourseTypeInput) {
    return this.http.delete(`/v1/setting/course/${params.id}`)
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
