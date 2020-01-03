import { Api } from '@/api/api'

export class AppApi extends Api {
  getInfo(query: QUERY) {
    return this.http.get('/v1/setting/app/common', { query })
  }
  update(params: UpdateInput) {
    return this.http.post('/v1/setting/app/edit', { params })
  }
}

export interface QUERY {
  application_type: number
}
export interface UpdateInput {
  venues_reserve_start: number
  venues_reserve_end: number
  venues_cancel_reserve_limit: number
  application_type: number
}
