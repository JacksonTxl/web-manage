import { Injectable } from 'vue-service-app'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { tap, pluck } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'
import { State, Computed } from 'rx-state'

export interface SetState {
  list: object[],
  operate: number
}

@Injectable()
export class LeaveStoreService {
  state$: State<SetState>
  list$: Computed<object[]>
  operate$: Computed<number>
  constructor(private api: ShopStaffApi, private message: MessageService) {
    this.state$ = new State({
      list: [],
      operate: 0
    })

    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.operate$ = new Computed(this.state$.pipe(pluck('operate')))
  }
  getInfo(id: string) {
    return this.api.getLeaveStoreInfo(id).pipe(tap(res => {
      this.state$.commit(state => {
        state.list = res.list
        state.operate = res.operate
      })
    }))
  }
  leaveStore(id: string) {
    return this.api.leaveStore(id).pipe(tap(res => {
      this.message.success({ content: '解除门店关系成功' })
    }))
  }
}
