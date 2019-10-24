import { Api } from '../api'
export class ExcelApi extends Api {
  getLogList(query: any) {
    return this.http.get('/v1/excel/output/log', { query })
  }
  getDownloadUrl(id: number) {
    return this.http.get(`/v1/excel/download/${id}`)
  }
  export(type: string, params: any) {
    return this.http.put(`/v1/excel/${type}`, { params })
  }
  exportCrowd(type: string, params: any) {
    return this.http.put(`/v1/excel/crowd/${type}`, { params })
  }
}
