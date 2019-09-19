import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { ImportService } from '@/services/import.service'

@Injectable()
export class TrackService implements RouteGuard {
  constructor(
    private appConfig: AppConfig,
    private importService: ImportService
  ) {}

  beforeRouteEnter() {
    if (this.appConfig.HOST_IS_PROD) {
      this.importService.loadJs(
        'https://hm.baidu.com/hm.js?11c0b426fbd4b0e05de4ee2084df1835'
      )
    }
  }
}
