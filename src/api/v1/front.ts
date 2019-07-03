import { Api } from '../api'

export interface AddWorkNotesInput {
  subject: string
  content: string
}
export interface GetMemberListInput {
  keyword?:string
}
export interface GetEntranceListInput {
  entry_type?:number
  keyword?:string
  page:number
  size:number
}
export interface SetEntranceLeaveBatchInput {
  ids: Array<number>
}
export interface SetEntranceInput {
  member_id:number
  cabinet_id?:number
  proof_type:number
  proof_value:number
  seller_id?:number
  coach_id?:number
}
export interface EditEntranceCabinetInput{
  id:number
  cabinet_id:number
}
export class FrontApi extends Api {
  /**
   * 新增待办
   */
  addWorkNotes(params:AddWorkNotesInput) {
    return this.http.post(`/v1/front/notes`, { params })
  }
  /**
   * 待办列表
   */
  getWorkNoteList() {
    return this.http.get(`/v1/front/notes`)
  }
  /**
   *  完成待办
   */
  setWorkNote(id:string) {
    return this.http.put(`/v1/front/notes/${id}`)
  }
  /**
   *  已完成的待办列表
   */
  getWorkNoteDoneList() {
    return this.http.get(`/v1/front/notes/done`)
  }
  /**
   * 搜索会员
   */
  getMemberList(query:GetMemberListInput) {
    return this.http.get(`/v1/member/options`, { query })
  }
  /**
   * 入场管理列表
   */
  getEntranceList(query:GetEntranceListInput) {
    return this.http.get(`/v1/front/entrance`, { query })
  }
  /**
   * 单个离场
   */
  setEntranceLeave(id:string) {
    return this.http.delete(`/v1/front/entrance/leave/${id}`)
  }
  /**
   * 批量离场
   */
  setEntranceLeaveBatch(params:SetEntranceLeaveBatchInput) {
    return this.http.delete(`/v1/front/entrance/batch`, { params })
  }
  /**
   * 前台头部统计
   */
  getEntranceSummary() {
    return this.http.get(`/v1/front/stat`)
  }
  /**
   * 销售员列表
   */
  getSellerList() {
    return this.http.get(`/v1/front/entrance/seller`, { mock: {} })
  }
  /**
   * 教练列表
   */
  getCoachList() {
    return this.http.get(`/v1/front/entrance/coach`, { mock: {} })
  }
  /**
   * 前台会员详情
   */
  getMemberInfo(id:string) {
    return this.http.get(`/v1/front/entrance/member/${id}`)
  }
  /**
   *  入场凭证列表
   */
  getEntranceOptionList(id:string) {
    return this.http.get(`/v1/front/entrance/options/${id}`)
  }
  /**
   *  储物柜列表
   */
  getCabinetList(id:string) {
    return this.http.get(`/v1/front/cabinet/options/${id}`)
  }
  /**
   *  会员入场
   */
  setEntrance(params:SetEntranceInput) {
    return this.http.post(`/v1/front/entrance`, { params })
  }
  /**
   *  修改入场会员的储物柜
   */
  editEntranceCabinet(params:EditEntranceCabinetInput) {
    return this.http.put(`/v1/front/entrance/cabinet`, { params })
  }
}
