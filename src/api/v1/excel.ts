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
  // 课程包导出
  exportCourse(type: string, params: any) {
    return this.http.put(`/v1/excel/${type}`, { params })
  }
  // 私教课导出
  exportPersonal(type: string, params: any) {
    return this.http.put(`/v1/excel/${type}`, { params })
  }
  // 员工导出
  exportStaff(type: string, params: any) {
    console.log(type, params)
    return this.http.put(`/v1/excel/${type}`, { params })
  }
  // 会员卡导出
  exportMember(type: string, params: any) {
    console.log(type, params)
    return this.http.put(`/v1/excel/${type}`, { params })
  }
  // 储值卡导出
  exportStored(type: string, params: any) {
    return this.http.put(`/v1/excel/${type}`, { params })
  }
}
