import { Api } from '../../api'
const url = '/v1/setting/course'
export class CourseApi extends Api {
  /**
   * 课程类型列表
   */
  getCourseCategoryList(query: GetCourseCategoryListInput) {
    return this.http.get(url, { query })
  }
  /**
   * 添加课程类型
   */
  addCourseCategory(params: AddCourseCategoryInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑课程类型
   */
  updateCourseCategory(params: UpdateCourseCategoryInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  /**
   * 删除课程类型
   */
  deleteCourseCategory(params: DeleteCourseCategoryInput) {
    return this.http.delete(`${url}/${params.id}`)
  }
}

export interface GetCourseCategoryListInput {
  page?: number,
  size?: number
}

export interface AddCourseCategoryInput {
  /**
   * 添加课程类型名称
   */
  setting_name: string
}

export interface UpdateCourseCategoryInput {
  /**
   * 课程类型id
   */
  id: number
  /**
   * 编辑课程类型名称
   */
  setting_name: string
}

export interface DeleteCourseCategoryInput {
  /**
   * 课程类型设置ID
   */
  id: number
}
