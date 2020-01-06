import { RouteGuard, Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { ImportService } from '@/services/import.service'

/**
 * 统计守卫 这里是百度统计
 */
@Injectable()
export class TrackGuard implements RouteGuard {
  constructor(
    private appConfig: AppConfig,
    private importService: ImportService
  ) {}
  beforeRouteEnter() {
    if (this.appConfig.HOST_IS_PROD) {
      this.importService.loadJs(
        'https://hm.baidu.com/hm.js?11c0b426fbd4b0e05de4ee2084df1835'
      )
    } else {
      /**
       * 个人测试
       */
      this.importService.loadJs(
        'https://hm.baidu.com/hm.js?9259620caae443c3d2bc583b235e192b'
      )
    }
  }
}
