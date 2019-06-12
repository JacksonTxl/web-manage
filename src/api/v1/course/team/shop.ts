import { Api } from '@/api/api'

export class ShopTeamCourseApi extends Api {
  /**
   * 添加品牌私教课
   */
  addCourse(params: SetCourseInput) {
    return this.http.post('/v1/course/team/shop', { params })
  }
  /**
   * 编辑品牌私教课
   */
  updateCourse(params: SetCourseInput) {
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
   * 获取品牌门店私教课列表
   */
  getTeamCourseListInShop(query: GetTeamBrandCourseListInput) {
    return this.http.get('/v1/course/team/brand/shop', { query })
  }
  /**
   * 设置上课门店
   */
  setShop(params: SetShopInput) {
    return this.http.put(`/v1/course/team/shop/set/shop/${params.course_id}`, { params })
  }
  /**
   * 编辑品牌私教课回显详情
   */
  getCourseEdit(query: GetCourseEditInput) {
    return this.http.get(`/v1/course/team/shop/edit/${query.course_id}`)
  }
  /**
   * 批量转入品牌团课
   */
  putCourseTeamIntoBrand(params: PutCourseTeamIntoBrandInput) {
    return this.http.put(`/v1/course/team/into/brand`, { params })
  }
}
export interface PutCourseTeamIntoBrandInput {
  course_id: number,
  shop_setting: number,
  shop_ids: any[],
  coach_ids?: any[]
}
export interface GetTeamBrandCourseListInput {
  category_id?: number,
  course_name?: string,
  page?: number,
  size?: number,
  is_available?: number
}
export interface SetCourseInput {
  /**
   * 课程id
   */
  course_id: number
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

export interface GetCourseEditInput {
  course_id: number
}
