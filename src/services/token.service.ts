import Cookie from 'js-cookie'
import { Injectable } from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { State } from 'rx-state'
import { NProgressService } from './nprogress.service'
import { filter } from 'rxjs/operators'

@Injectable()
export class TokenService {
  token$ = new State<string>(Cookie.get(this.appConfig.SAAS_TOKEN_NAME))
  constructor(
    private appConfig: AppConfig,
    private nprogressService: NProgressService
  ) {
    this.token$.pipe(filter(token => !!token)).subscribe(token => {
      Cookie.set(this.appConfig.SAAS_TOKEN_NAME, token, {
        expires: this.appConfig.COOKIE_EXPIRES
      })
      /**
       * 给第三方（文档中心(help.styd.cn)等）用
       */
      Cookie.set(this.appConfig.THIRD_PARTY_TOKEN_NAME, token, {
        expires: this.appConfig.COOKIE_EXPIRES,
        domain: '.styd.cn'
      })
    })
  }
  SET_TOKEN(token: string) {
    this.token$.commit(() => token)
  }
  REMOVE_TOKEN() {
    this.token$.commit(() => '')
  }
}
