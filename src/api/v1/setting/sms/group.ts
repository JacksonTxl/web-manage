import { Api } from '@/api/api'

export class GroupApi extends Api {
  getGroupList(query: GroupListQuery) {
    return this.http.get('/v1/setting/sms/group', { query })
  }
  getTemplateList(query: GroupTemplateQuery) {
    return this.http.get('/v1/setting/sms/template', { query })
  }
  onReset(id: string) {
    return this.http.delete('/v1/setting/sms/group/cancel?group_id=' + id)
  }
  onDelete(id: string) {
    return this.http.delete('/v1/setting/sms/template?tmpl_id=' + id)
  }
  addTemplate(query: any) {
    return this.http.delete('/v1/setting/sms/template', { query })
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
