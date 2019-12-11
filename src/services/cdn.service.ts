// @ts-ignore
import SentryReporter from 'sentry-reporter-js'
import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'

class CDNError extends Error {
  constructor(message = '') {
    super()
    this.name = 'CDNError'
    this.message = message
  }
}
@Injectable()
export class CdnService {
  constructor(private userService: UserService) {}
  uploadError() {
    const userService = this.userService
    let cdnErrors: any = localStorage.getItem('cdnErrors')
    if (cdnErrors) {
      cdnErrors = JSON.parse(cdnErrors)
      const keys = Object.keys(cdnErrors)
      const fingerprint = ['cdn-404-error']
      for (let i = 0; i < keys.length; i++) {
        SentryReporter.captureException(new CDNError(keys[i]), {
          level: 'error',
          fingerprint,
          extra: {
            occur_time: cdnErrors[keys[i]],
            cdn_domain: keys[i],
            fingerprint,
            brand_info: userService.brand$.snapshot(),
            shop_info: userService.shop$.snapshot(),
            staff_info: userService.user$.snapshot()
          }
        })
      }
      localStorage.removeItem('cdnErrors')
    }
  }
}
