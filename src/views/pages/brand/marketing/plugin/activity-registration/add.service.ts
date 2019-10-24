import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { SignUpApi, SignUpInfo } from '@/api/v1/marketing/sign-up'
import { MessageService } from '@/services/message.service'

@Injectable()
export class AddService {
  loading$ = new State({})
  defaultForm$ = new State({})
  info$ = new State({})

  constructor(private api: SignUpApi, private msg: MessageService) {}
  addActivity(params: SignUpInfo) {
    return this.api.addSignUp(params).pipe(
      tap(res => {
        // this.msg.success({ content: '发布活动成功！' })
      })
    )
  }
  updateActivity(params: any) {
    return this.api.updateSignUpInfo(params).pipe(
      tap(res => {
        this.msg.success({ content: '编辑活动成功！' })
      })
    )
  }
  copyActivity(params: any) {
    return this.api.addSignUp(params).pipe(
      tap(res => {
        this.msg.success({ content: '复制活动成功！' })
      })
    )
  }
  saveDraftActivity(params: SignUpInfo) {
    return this.api.addSignUp(params).pipe(
      tap(res => {
        this.msg.success({ content: '存草稿成功！' })
      })
    )
  }
}
