import { NavigationGuard, RouteConfig } from 'vue-router'

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

export interface StRouteConfig extends RouteConfig {
  beforeRouteEnter?: BeforeRouteEnter[]
  queryOptions?: QueryOptions
  children?: StRouteConfig[]
}

export interface StRouteExpandConfig {
  [routeName: string]: StRouteConfig
}
