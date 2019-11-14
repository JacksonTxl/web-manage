import { CopyService } from './copy.service'
import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  MarketingApi,
  AddMarketingCouponParams,
  EditMarketingCouponParams
} from '@/api/v1/marketing/marketing'
import { tap, pluck } from 'rxjs/operators'
import { SignUpApi, SignUpInfo } from '@/api/v1/marketing/sign-up'

@Injectable()
export class EditService {
  constructor(private copyService: CopyService) {}
  beforeRouteEnter(to: ServiceRoute) {
    return this.copyService.getDefaultForm(to.meta.query.id)
  }
}
