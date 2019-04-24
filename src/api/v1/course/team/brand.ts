import { Api } from '@/api/api'

export class BrandTeamCourseApi extends Api {
  /**
   * 添加品牌私教课
   */
  addCourse(params: SetCourseInput) {
    return this.http.post('/v1/course/team/brand', { params })
  }
  /**
   * 编辑品牌私教课
   */
  updateCourse(params: SetCourseInput) {
    return this.http.put(`/v1/course/team/brand/${params.course_id}`, { params })
  }
  /**
   * 设置上课门店
   */
  setShop(params: SetShopInput) {
    return this.http.put(`/v1/course/team/brand/set/shop/${params.course_id}`, { params })
  }
  /**
   * 编辑品牌私教课回显详情
   */
  getCourseEdit(query: GetCourseEditInput) {
    return this.http.get(`/v1/course/team/brand/edit/${query.course_id}`)
  }
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
