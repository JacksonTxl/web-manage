import { Api } from '../../api'

const mock = {}
export interface GetTeamBrandCourseListInput {
  category_id?: number,
  course_name?: string,
  page?: number,
  size?: number
}
export class TeamApi extends Api {
  /**
   * 获取品牌私教课列表
   */
  getTeamBrandCourseList(query: GetTeamBrandCourseListInput) {
    return this.http.get('/v1/course/team/brand/', { query, mock })
  }
  /**
   * 获取课程类型
   */
  getTeamCourseType(query: GetTeamCourseTypeQuery) {
    // return this.http.get(`/v1/course/team/brand/`, { mock: {} })
  }
  /**
   * 获取训练目的
   */
  getTrainPurpose(params: GetTrainPurposeQuery) {
    // return this.http.post('/v1/course/personal/brand', { params })
  }
  /**
   * 获取团课设置详情
   */
  getTeamCourseDetail(params: GetTeamCourseDetailQuery) {
    // return this.http.put('/v1/course/personal/brand', { params })
  }
  /**
   * 提交修改
   */
  submitChange(params: SubmitChangeQuery) {
    // return this.http.post('/v1/course/personal/set_shop', { params })
  }
}

export interface GetTeamCourseTypeQuery{

}

export interface GetTrainPurposeQuery{

}

export interface GetTeamCourseDetailQuery{

}

export interface SubmitChangeQuery{

}