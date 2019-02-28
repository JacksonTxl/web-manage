import VueRouter, { Route, RouteConfig } from 'vue-router'
import { VueConstructor } from 'vue'

type PluginFunction<T> = (Vue: VueConstructor, options?: T) => void

interface Dictionary<T> {
  [key: string]: T
}

interface QueryOption {
  default?: number | string
  type: NumberConstructor | StringConstructor
}

interface QueryOptions {
  [queryName: string]: QueryOption
}

interface ServiceRouteConfigMeta {
  [key: string]: any
  queryOptions?: QueryOptions
}

// 全局声明类型 declares
export interface ServiceRoute extends Route {
  name: string
  meta: {
    query: Dictionary<any>
  }
}

export interface ServiceRouteConfig extends RouteConfig {
  guards?: any[] | never[]
  queryOptions?: QueryOptions
  children?: ServiceRouteConfig[]
  meta?: ServiceRouteConfigMeta
}

interface RouterConfig {
  base?: string
  routes?: ServiceRouteConfig[]
}

export interface RouteGuard {
  beforeEach?(to: ServiceRoute, from: ServiceRoute, next: Function): void
  beforeRouteEnter?(to: ServiceRoute, from: ServiceRoute, next: Function): void
  beforeRouteUpdate?(to: ServiceRoute, from: ServiceRoute, next: Function): void
  afterEach?(to: ServiceRoute, from: ServiceRoute, next: Function): void
}

export class VueServiceApp {
  static install: PluginFunction<never>
}

declare module 'vue-service-app' {
  export class Router {
    constructor(options?: RouterConfig)
    router: VueRouter
  }
}

export default VueServiceApp
