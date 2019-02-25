import { NavigationGuard, RouteConfig, Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'

export interface StRouteGuard {
  beforeEach?: any
  beforeRouteEnter?: any
  beforeRouteUpdate?: any
}

interface QueryOption {
  default?: number | string
  type: NumberConstructor | StringConstructor
}

interface QueryOptions {
  [queryName: string]: QueryOption
}

export interface StRoute extends Route {
  name: string
  meta?: {
    query?: Dictionary<any>
  }
}
interface StRouteConfigMeta {
  [key: string]: any
  queryOptions?: QueryOptions
}

export interface StRouteConfig extends RouteConfig {
  guards?: StRouteGuard[]
  children?: StRouteConfig[]
  meta?: StRouteConfigMeta
}

export interface StRouteExpandConfig {
  [routeName: string]: StRouteConfig
}
