import { MessageService } from '@/services/message.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ModifyApi } from '@/api/modify'

@Injectable()
export class ModifyService {
  loading$ = new State({})
  info$ = new State({})
  constructor(private modifyApi: ModifyApi, private msg: MessageService) {}
  getUserInfo() {
    return this.modifyApi.getUserInfo().pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  checkAccount(params: any) {
    return this.modifyApi.checkAccount(params)
  }
  getCaptcha(params: any) {
    return this.modifyApi.getCaptcha(params)
  }
  checkCaptcha(params: any) {
    return this.modifyApi.checkCaptcha(params)
  }
  @Effect()
  resetPass(params: any) {
    return this.modifyApi.resetPass(params)
  }
}
