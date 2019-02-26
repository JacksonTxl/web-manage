import { Route, RouteConfig } from 'vue-router'

declare interface StRouteGuard {
  beforeEach?: any
  beforeRouteEnter?: any
  beforeRouteUpdate?: any
}

declare interface StRoute extends Route {
  name: string
  meta: {
    query: Dictionary<any>
  }
}

declare interface StRouteConfig extends RouteConfig {
  guards?: StRouteGuard[]
  children?: StRouteConfig[]
  meta?: StRouteConfigMeta
}


interface QueryOption {
  default?: number | string
  type: NumberConstructor | StringConstructor
}

interface QueryOptions {
  [queryName: string]: QueryOption
}

interface StRouteConfigMeta {
  [key: string]: any
  queryOptions?: QueryOptions
}

