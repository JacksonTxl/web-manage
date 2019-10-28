import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { GroupApi } from '@/api/v1/setting/sms/group'
import { tap } from 'rxjs/operators'

@Injectable()
export class SmsReceiveNumService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({
    current_page: 1,
    size: 20,
    total_counts: 1,
    total_pages: 1
  })
  constructor(private groupApi: GroupApi) {}
  @Effect()
  getReceiveNumList(query: any) {
    return this.groupApi.getReceiveNumList(query).pipe(
      tap((res: any) => {
        console.log(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
}
