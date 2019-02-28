export interface ImgFilterOptions {
  /**
   * 图片宽度
   */
  w?: string | number
  /**
   * 图片高度
   */
  h?: string | number
}

export interface StResponse {
  code: number | string
  data: any
  message: string
}
