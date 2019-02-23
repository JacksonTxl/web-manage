import { NavigationGuard, RouteConfig, Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'

export interface BeforeRouteEnter {
  beforeRouteEnter: NavigationGuard
}

interface QueryOption {
  default?: number | string
  type: NumberConstructor | StringConstructor
}

interface QueryOptions {
  [queryName: string]: QueryOption
}

export interface StRoute extends Route {
  meta?: {
    query?: Dictionary<any>
  }
}

export interface StRouteConfig extends RouteConfig {
  beforeRouteEnter: BeforeRouteEnter[]
  meta:{
    queryOptions?: QueryOptions
  }
  children?: StRouteConfig[]
}

export interface StRouteExpandConfig {
  [routeName: string]: StRouteConfig
}
