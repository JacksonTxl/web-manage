import { Injectable } from 'vue-service-app'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'
import { State } from 'rx-state'

export interface SetState {
  list: object[]
  operate: number
}

@Injectable()
export class LeaveStoreService {
  list$ = new State([])
  operate$ = new State(0)
  constructor(private api: ShopStaffApi, private message: MessageService) {}
  getInfo(id: string) {
    return this.api.getLeaveStoreInfo(id).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.operate$.commit(() => res.operate)
      })
    )
  }
  leaveStore(id: string) {
    return this.api.leaveStore(id).pipe(
      tap(res => {
        this.message.success({ content: '解除门店关系成功' })
      })
    )
  }
}
