import { Api } from '@/api/api'

export class ShopTeamCourseApi extends Api {
  /**
   * 添加品牌私教课
   */
  add(params: AddInput) {
    return this.http.post('/v1/course/team/shop', { params })
  }
  /**
   * 编辑品牌私教课回显详情
   */
  getUpdateInfo(query: GetUpdateInfoInput) {
    return this.http.get(`/v1/course/team/shop/edit/${query.course_id}`)
  }
  /**
   * 编辑品牌私教课
   */
  update(params: UpdateInput) {
    return this.http.put(`/v1/course/team/shop/${params.course_id}`, { params })
  }
  /**
   *
   * 删除团课课程
   */
  deleteTeamCourse(course_id: string) {
    return this.http.delete(`/v1/course/team/shop/${course_id}`)
  }
  /**
   * 获取门店团体课列表
   */
  getTeamCourseList(query: GetTeamBrandCourseListInput) {
    return this.http.get('/v1/course/team/shop', { query })
  }
  getTeamCourseInfo(course_id: string) {
    return this.http.get(`/v1/course/team/shop/${course_id}`)
  }
}

/**
 * 添加课程
 */
export interface AddInput {
  /**
   * 课程名称
   */
  course_name: string
  /**
   * 课程分类id
   */
  category_id: number
  /**
   * 训练目的
   */
  train_aim: any[]
  /**
   * 课程时长
   */
  duration: number
  /**
   * 参考价格
   */
  price?: number
  /**
   * 图片id
   */
  image_id?: number
  /**
   * 课程介绍
   */
  description: string
}
/**
 * 编辑课程
 */
export interface UpdateInput extends AddInput {
  /**
   * 课程id
   */
  course_id: number
}
/**
 * 编辑课程回显信息
 */
export interface GetUpdateInfoInput {
  course_id: number
}

export interface PutCourseTeamIntoBrandInput {
  course_id: number
  shop_setting: number
  shop_ids: any[]
  coach_ids?: any[]
}
export interface GetTeamBrandCourseListInput {
  category_id?: number
  course_name?: string
  page?: number
  size?: number
  is_available?: number
}
