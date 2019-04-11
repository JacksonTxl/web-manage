import { Api } from '../../api'

export class PersonalApi extends Api {
  /**
   * 获取品牌私教课信息
   */
  getPersonalBrand(query: GetPersonalBrandInput) {
    return this.http.get('/v1/course/personal/brand/', { query })
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
    return this.http.put('/v1/course/personal/brand', { params })
  }
}

export interface GetPersonalBrandInput {
  /**
   * 课程id
   */
  course_id: number
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
