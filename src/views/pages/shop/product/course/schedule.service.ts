
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
export class ScheduleService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
