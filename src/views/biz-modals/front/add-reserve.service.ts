import { AddReserveCreateInput } from './../../../api/v1/front/reserve'
import { anyAll } from './../../../operators/any-all'
import { ReserveApi, AddReserveInput } from '@/api/v1/front/reserve'
import { State, Effect } from 'rx-state'
import { Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class AddReserveService {
  loading$ = new State({})
  memberList$ = new State([])
  staffList$ = new State([])
  constructor(private reserveApi: ReserveApi, private msg: MessageService) {}
  @Effect()
  addReserve(params: AddReserveInput) {
    return this.reserveApi.addReserve(params).pipe(
      tap(res => {
        this.msg.success({ content: '添加到访成功' })
      })
    )
  }
  addReserveCreate(params: AddReserveCreateInput) {
    return this.reserveApi.addReserveCreate(params).pipe(
      tap(res => {
        this.msg.success({ content: '添加到访成功' })
      })
    )
  }
  getMemberList(query: any) {
    return this.reserveApi.getMemberList(query).pipe(
      tap(res => {
        this.memberList$.commit(() => res.list)
      })
    )
  }
  getStaffList() {
    return this.reserveApi.getStafflist().pipe(
      tap(res => {
        this.staffList$.commit(() =>
          res.list.map((item: any) => {
            return { label: item.staff_name, value: item.id }
          })
        )
      })
    )
  }
}
