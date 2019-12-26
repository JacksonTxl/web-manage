import { NProgressService } from '@/services/nprogress.service'
import { RouteGuard, Injectable } from 'vue-service-app'
import { StyleService } from '@/services/style.service'
/**
 * 加载进度守卫
 */
@Injectable()
export class ProgressGuard implements RouteGuard {
  constructor(
    private nprogress: NProgressService,
    private styleService: StyleService
  ) {
    // 全局抓取错误 有错误就将loading状态取消
    window.addEventListener('error', e => {
      this.nprogress.done()
    })
  }
  beforeEach() {
    this.styleService.getSystemInfo()
    this.nprogress.start()
  }
  afterEach() {
    this.nprogress.done()
  }
}
