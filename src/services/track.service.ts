import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'

@Injectable()
export class TrackService implements RouteGuard {
  inited = false
  constructor(private appConfig: AppConfig) {}
  init() {
    // 只在生产域名下才使用百度统计
    if (this.appConfig.HOST_IS_PROD) {
      const hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?11c0b426fbd4b0e05de4ee2084df1835'
      hm.defer = true
      const s = document.getElementsByTagName('script')[0]
      s.parentNode && s.parentNode.insertBefore(hm, s)
    }
    this.inited = true
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (!this.inited) {
      this.init()
    }
    next()
  }
}
