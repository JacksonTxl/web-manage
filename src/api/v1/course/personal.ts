import { Api } from '../../api'

const mock = {}
export class PersonalApi extends Api {
  /**
   * 获取品牌私教课列表
   */
  getCourseListInBrand(query: GetPersonalBrandCourseListInput) {
    return this.http.get('/v1/course/personal/brand', { query })
  }
  /**
   * 获取品牌门店下私教课列表
   */
  getCourseListInShop(query: GetPersonalBrandCourseListInput) {
    return this.http.get('/v1/course/personal/brand/shop', { query })
  }
  /**
   * 获取品牌私教课信息
   */
  getPersonalBrandInfo(query: GetPersonalBrandInfoInput) {
    return this.http.get(`/v1/course/personal/brand/${query.course_id}`)
  }
  /**
   * 添加品牌私教课
   */
  addPersonalBrand(params: SetPersonalBrandInput) {
    return this.http.post('/v1/course/personal/brand', { params })
  }
  /**
   * 编辑品牌私教课
   */
  updatePersonalBrand(params: SetPersonalBrandInput) {
    return this.http.put('/v1/course/personal/brand', { params, mock: {} })
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
   * 品牌私教课设置有效无效
   */
  setAvailableInBrand(params: SetAvailableInput) {
    return this.http.put(`/v1/course/personal/brand/available/${params.course_id}`, { params })
  }
  /**
   * 品牌私教课删除
   */
  deleteCourse(course_id: string) {
    return this.http.delete(`/v1/course/personal/brand/${course_id}`)
  }
  /**
   * 门店私教课设置有效无效
   */
  setAvailableInShop(params: SetAvailableInput) {
    return this.http.put(`/v1/course/personal/shop/available/${params.course_id}`, { params })
  }
}
export interface SetAvailableInput {
  course_id: string,
  available: number
}
export interface SetAvailableInShopInput {
  course_id: string,
  available: number,
  shop_id: number
}
export interface GetPersonalBrandCourseListInput {
  category_id?: number,
  course_name?: string,
  page?: number,
  size?: number
}

export interface GetPersonalBrandInfoInput {
  /**
   * 课程id
   */
  course_id: string
}
export interface SetPersonalBrandInput {
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
