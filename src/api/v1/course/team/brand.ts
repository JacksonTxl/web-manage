import { Api } from '@/api/api'

export class BrandTeamCourseApi extends Api {
  /**
   * 添加品牌团体课
   */
  add(params: AddInput) {
    return this.http.post('/v1/course/team/brand', { params })
  }
  /**
   * 编辑品牌私教课回显详情
   */
  getUpdateInfo(query: GetUpdateInfoInput) {
    return this.http.get(`/v1/course/team/brand/edit/${query.course_id}`)
  }
  /**
   * 编辑品牌团体课
   */
  update(params: UpdateInput) {
    return this.http.put(`/v1/course/team/brand/${params.course_id}`, { params })
  }
  /**
   * 设置上课门店
   */
  setShop(params: SetShopInput) {
    return this.http.put(`/v1/course/team/brand/set/shop/${params.course_id}`, { params })
  }
  /**
   * 获取品牌私教课列表
   */
  getTeamCourseList(query: GetTeamBrandCourseListInput) {
    return this.http.get('/v1/course/team/brand', { query })
  }
  /**
  * 获取品牌门店私教课列表
  */
  getTeamCourseListInShop(query: GetTeamBrandCourseListInput) {
    return this.http.get('/v1/course/team/brand/shop', { query })
  }
  /**
   * 删除品牌私教课
   */
  deleteCourse(courseId: string) {
    return this.http.delete(`/v1/course/team/brand/${courseId}`)
  }
  /**
   *
   * 获取团课课程详情
   */
  getTeamCourseInfo(course_id: string) {
    return this.http.get(`/v1/course/team/brand/${course_id}`)
  }
  /**
   * 批量转入品牌团课
   */
  putCourseTeamIntoBrand(params: PutCourseTeamIntoBrandInput) {
    return this.http.put(`/v1/course/team/into/brand`, { params })
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
  train_aim: any[],
  /**
   * 课程时长
   */
  duration: number,
  /**
   * 参考价格
   */
  price?: number,
  /**
   * 图片id
   */
  image_id?: number,
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
/**
 * 设置上课门店
 */
export interface SetShopInput {
  /**
   * 课程id
   */
  course_id: number,
  /**
   * 上课门店 1为全店 2为指定门店
   */
  shop_setting: number,
  /**
   * 门店ID shop_setting为1时空
   */
  shop_id: any[],
  /**
   * 教练ID
   */
  coach_id?: any[]
}

export interface GetTeamBrandCourseListInput {
  category_id?: number,
  course_name?: string,
  page?: number,
  size?: number,
  is_available?: number
}
export interface PutCourseTeamIntoBrandInput {
  course_id: number,
  shop_setting: number,
  shop_ids: any[],
  coach_ids?: any[]
}
