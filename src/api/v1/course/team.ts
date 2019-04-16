import { Api } from '../../api'

const mock = {}
export class TeamApi extends Api {
  /**
   * 获取品牌私教课列表
   */
  getTeamBrandCourseList(query: GetTeamBrandCourseListInput) {
    return this.http.get('/v1/course/team/brand/', { query, mock })
  }
}
export interface GetTeamBrandCourseListInput {
  category_id?: number,
  course_name?: string,
  page?: number,
  size?: number
}
