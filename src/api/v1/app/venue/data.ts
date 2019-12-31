import { Api } from '@/api/api'
// const prefix = '/mock/33'
export class DataApi extends Api {
  getList(query: Query) {
    return this.http.get(`/v1/stat/venues/brand`, { query })
  }
  getAppInfo() {
    return this.http.get(`/v1/applications/index`)
  }
}

export interface Query {
  page?: number
  size?: number
  shop?: number
  day?: number
  start_date?: string
  end_date?: string
}
