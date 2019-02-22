import { NavigationGuard, RouteConfig, Route } from 'vue-router'

export interface BeforeRouteEnter {
  beforeRouteEnter: NavigationGuard
}
export interface StRoute extends Route {}
interface QueryOption {
  default?: number | string
  type: NumberConstructor | StringConstructor
}

interface QueryOptions {
  [key: string]: QueryOption
}

export interface StRouteConfig extends RouteConfig {
  beforeRouteEnter: BeforeRouteEnter[]
  queryOptions?: QueryOptions
  children?: StRouteConfig[]
}
