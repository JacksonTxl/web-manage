import Cookie from 'js-cookie'
import { RouteGuard, Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { State } from 'rx-state'
import { NProgressService } from './nprogress.service'

@Injectable()
export class TokenService implements RouteGuard {
  token$ = new State<string>(Cookie.get(this.appConfig.TOKEN_NAME) || '')
  constructor(
    private appConfig: AppConfig,
    private nprogressService: NProgressService
  ) {
    this.token$.subscribe(token => {
      Cookie.set(this.appConfig.TOKEN_NAME, token, { expires: 7 })
    })
  }
  SET_TOKEN(token: string) {
    this.token$.commit(() => token)
  }
  REMOVE_TOKEN() {
    this.token$.commit(() => '')
  }
  beforeRouteEnter() {
    this.nprogressService.SET_TEXT('用户凭证获取完毕')
    if (!this.token$.snapshot()) {
      location.href = '/account/login'
    }
  }
}
