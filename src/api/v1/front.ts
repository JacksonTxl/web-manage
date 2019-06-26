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
}
