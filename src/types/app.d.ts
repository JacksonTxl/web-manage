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
  msg: string
}

export interface StPage {
  /**
   * 总页数
   */
  total_pages: number
  /**
   * 总条数
   */
  total_counts: number
  /**
   * 每页几条
   */
  size: number
  /**
   * 当前页
   */
  current_page: number
}
