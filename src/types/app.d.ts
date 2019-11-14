import { ServiceRouteConfig } from "vue-service-app";

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


export interface RouteConfig extends ServiceRouteConfig {
  meta: {
    /**
     * 布局视图名称 @/views/layouts/index.ts
     */
    layout: string
    /**
     * 面包屑的标题
     */
    title: string
    name: string
    /**
     * 生命平级路由的父级路由nameπ
     */
    parentId: string
    /**
     * 路由对应的权限key名
     */
    auth: string
    /**
     * 父级路由带有的tabs路由名数组
     */
    tabs: string[]
  }
  guards: object[]
}
