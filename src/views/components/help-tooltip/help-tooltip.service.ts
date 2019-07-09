import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { TooltipApi, GetInfoInput } from '@/api/v1/admin/tooltip'
@Injectable()
export class HelpTooltipService {
  loading$ = new State({})
  constructor(private tooltipApi: TooltipApi) {}
  @Effect()
  getToolTip(sn: GetInfoInput) {
    return this.tooltipApi.getInfo(sn)
  }
}
