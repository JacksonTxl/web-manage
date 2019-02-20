import { NavigationGuard, RouteConfig } from 'vue-router'

export interface CanActivate {
  canActivate: NavigationGuard
}
export interface GuardRouteConfig extends RouteConfig {
  canActivate?: CanActivate[]
}
