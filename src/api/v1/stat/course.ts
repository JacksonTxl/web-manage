import { Api } from '@/api/api'
// 品牌下的课程数据统计
export class CourseApi extends Api {
  /**
   * 课程图表
   */
  getChart(query: CourseChartParams) {
    return this.http.get(`/v1/stat/course/chart`, { query })
  }
  /**
   * 课程报表
   */
  getData(query: CourseDataParams) {
    return this.http.get(`/v1/stat/course/brand`, { query })
  }
}

export interface CourseChartParams {
  shop_id?: number
  day?: number
  start_date?: string
  end_date?: string
}

export interface CourseDataParams {
  shop_id?: number
  current_page?: number
  size?: number
  day?: number
  start_date?: string
  end_date?: string
}
