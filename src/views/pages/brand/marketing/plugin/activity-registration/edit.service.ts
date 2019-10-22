import { CopyService } from './copy.service'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  MarketingApi,
  AddMarketingCouponParams,
  EditMarketingCouponParams
} from '@/api/v1/marketing/marketing'
import { tap, pluck } from 'rxjs/operators'
import { SignUpApi, SignUpInfo } from '@/api/v1/marketing/sign-up'

@Injectable()
export class EditService implements RouteGuard {
  constructor(private copyService: CopyService) {}
  beforeRouteEnter(to: ServiceRoute) {
    return this.copyService.getDefaultForm(to.meta.query.id)
  }
}
