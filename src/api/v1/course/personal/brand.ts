import { Api } from '@/api/api'

export class BrandPersonalCourseApi extends Api {
  /**
   * 获取品牌私教课信息
   */
  getPersonalBrandInfo(query: GetPersonalBrandInfoInput) {
    return this.http.get(`/v1/course/personal/brand/${query.course_id}`)
  }
  /**
   * 获取品牌私教课列表
   */
  getCourseList(query: GetPersonalBrandCourseListInput) {
    return this.http.get('/v1/course/personal/brand', { query })
  }
  /**
   * 添加品牌私教课
   */
  addCourse(params: SetCourseInput) {
    return this.http.post('/v1/course/personal/brand', { params })
  }
  /**
   * 编辑品牌私教课
   */
  updateCourse(params: SetCourseInput) {
    return this.http.put(`/v1/course/personal/brand/${params.course_id}`, { params })
  }
  /**
   * 设置上课门店
   */
  setShop(params: SetShopInput) {
    return this.http.put(`/v1/course/personal/brand/set_shop/${params.course_id}`, { params })
  }

  /**
   * 设置售卖价格
   */
  setPrice(params: SetPriceInput) {
    return this.http.put(`/v1/course/personal/brand/set_price/${params.course_id}`, { params })
  }
  /**
   * 编辑品牌私教课回显详情
   */
  getCourseEdit(query: GetCourseEditInput) {
    return this.http.get(`/v1/course/personal/brand/edit/${query.course_id}`)
  }
  /**
   * 品牌私教课设置有效无效
   */
  setAvailable(params: SetAvailableInput) {
    return this.http.put(`/v1/course/personal/brand/available/${params.course_id}`, { params })
  }
  /**
   * 品牌私教课删除
   */
  deleteCourse(course_id: string) {
    return this.http.delete(`/v1/course/personal/brand/${course_id}`)
  }
  /**
   * 查询和这门课程关联的门店的详细信息
   */
  getCoursePersonalSupportShops(query: CoursePersonalSupportInput) {
    return this.http.get('/v1/course/personal/brand/support_shops', { query })
  }
  /**
   * 查询和这门课程关联的门店的详细信息
   */
  getCoursePersonalSupportCoaches(query: CoursePersonalSupportInput) {
    return this.http.get('/v1/course/personal/brand/support_coaches', { query })
  }
  /**
   * 获取私教课全局设置
   */
  getSetting() {
    return this.http.get('/v1/course/personal/setting')
  }
}
export interface CoursePersonalSupportInput{
  course_id: number,
  shop_id?: number,
  page: number,
  size: number,
  is_Pagination?: number
}
export interface GetPersonalBrandCourseListInput {
  category_id?: number,
  course_name?: string,
  page?: number,
  size?: number
}
export interface SetAvailableInput {
  course_id: string,
  available: number
}
export interface SetPersonalCourseInput {
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
export interface GetPersonalBrandInfoInput {
  /**
   * 课程id
   */
  course_id: string
}
export interface SetPriceInput {
  /**
   * 课程id
   */
  course_id: number,
  /**
   * 售卖价格 1为统一售价 2为门店售价
   */
  price_setting: number,
  /**
   * 价格梯度price_setting等于1时必填
   */
  price_gradient?: any[]
}

export interface GetCourseEditInput {
  course_id: number
}
