import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { Effect } from 'rx-state/src'
import {
  HelpApi,
  GetHelpInput
} from '@/api/v1/help'
@Injectable()
export class HelpTooltipService extends Store<any> {
  constructor(private helpApi: HelpApi) {
    super()
  }
  @Effect()
  getHelp(id: GetHelpInput) {
    return this.helpApi.getHelp(id)
  }
}
