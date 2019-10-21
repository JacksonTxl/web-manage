import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  MarketingApi,
  AddMarketingCouponParams,
  EditMarketingCouponParams
} from '@/api/v1/marketing/marketing'
import { TitleService } from '@/services/title.service'
import { tap, pluck } from 'rxjs/operators'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'
import { SignUpApi, SignUpInfo } from '@/api/v1/marketing/sign-up'
import { MessageService } from '@/services/message.service'

@Injectable()
export class AddService implements RouteGuard {
  loading$ = new State({})
  defaultForm$ = new State({})
  info$ = new State({})

  constructor(private api: SignUpApi, private msg: MessageService) {}
  releaseActivity(params: SignUpInfo) {
    return this.api.addSignUp(params).pipe(
      tap(res => {
        this.msg.success({ content: '发布活动成功！' })
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
