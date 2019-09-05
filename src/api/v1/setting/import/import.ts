import { Api } from '@/api/api'

export class ImportApi extends Api {
  /**
   * 下载excel模板
   * @param file_type 文件类型
   */
  fetchDownloadFileInfo(file_type: number) {
    return this.http.put('/v1/excel/download', { params: { file_type } })
  }
  /**
   * 导入文件
   * @param params 参数
   */
  uploadFile(params: InputFileParams) {
    return this.http.put('/v1/excel/input', { params })
  }
  /**
   * 导入记录
   * @param params 参数
   */
  excelList(query: ListParams) {
    return this.http.get('/v1/excel/excel_list', { query })
  }
}
export interface InputFileParams {
  file_save_type: number
  file_source: string
  input_type: number
  shop_id: number
}
export interface ListParams {
  size: number
  current_page: number
}
