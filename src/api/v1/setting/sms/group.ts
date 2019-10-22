import { Api } from '@/api/api'

export class GroupApi extends Api {
  getGroupList(query: GroupListQuery) {
    return this.http.get('/v1/setting/sms/group', { query })
  }
  getTemplateList(query: GroupTemplateQuery) {
    return this.http.get('/v1/setting/sms/template', { query })
  }
  getTemplateOptionList(query: GroupTemplateQuery) {
    return this.http.get('/v1/setting/sms/template/options', { query })
  }
  onReset(id: any) {
    return this.http.delete('/v1/setting/sms/group/cancel/' + id)
  }
  onDelete(id: any) {
    return this.http.delete('/v1/setting/sms/template/' + id)
  }
  addTemplate(params: any) {
    return this.http.post('/v1/setting/sms/template', { params })
  }
  editTemplate(params: any) {
    return this.http.put('/v1/setting/sms/template', { params })
  }
  getCrowdList(query: any) {
    return this.http.get('/v1/setting/sms/group/crowd', { query })
  }
  addGroup(params: any) {
    return this.http.post('/v1/setting/sms/group', { params })
  }
  editGroup(params: any) {
    return this.http.put('/v1/setting/sms/group', { params })
  }
  getEditInfo(query: any) {
    return this.http.get('/v1/setting/sms/group/info/' + query)
  }
}
export interface GroupListQuery {
  page: number
  size: number
  search: string
  send_status: number
  start_time: string
  end_time: string
}
export interface GroupTemplateQuery {
  page: number
  size: number
  search: string
  send_status: number
  start_time: string
  end_time: string
}
