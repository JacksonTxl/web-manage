import { MessageService } from '@/services/message.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { FindApi } from '@/api/find'

@Injectable()
export class FindService {
  loading$ = new State({})
  constructor(private findApi: FindApi, private msg: MessageService) {}
  @Effect()
  checkAccount(params: any) {
    return this.findApi.checkAccount(params)
  }
  @Effect()
  sendCaptcha(params: any) {
    return this.findApi.sendCaptcha(params)
  }
  @Effect()
  checkCaptcha(params: any) {
    return this.findApi.checkCaptcha(params)
  }
  @Effect()
  repairPwd(params: any) {
    return this.findApi.repairPwd(params)
  }
}
