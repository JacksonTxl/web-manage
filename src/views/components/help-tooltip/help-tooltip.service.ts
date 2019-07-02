import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { Effect } from 'rx-state'
import { ConstApi, GetToolTipInput } from '@/api/const'
@Injectable()
export class HelpTooltipService extends Store<any> {
  constructor(private constApi: ConstApi) {
    super()
  }
  @Effect()
  getToolTip(id: GetToolTipInput) {
    return this.constApi.getToolTip(id)
  }
}
