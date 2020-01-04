import { Injectable } from 'vue-service-app'

@Injectable()
export class StyleService {
  /**
   * 区分操作系统
   */
  getSystemInfo() {
    const platform = navigator.platform
    let html: any = document.querySelector('html')
    if (
      platform.indexOf('Win') > -1 &&
      html.className.indexOf('Win-specific') < 0
    ) {
      html.className += ' Win-specific'
    }
  }
}
