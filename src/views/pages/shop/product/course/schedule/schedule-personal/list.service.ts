import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ScheduleApi1v1, GetSchedulePersonalListInput } from '@/api/v1/course/personal/schedule1v1'

interface ListStata {
  listData: Object
}
@Injectable()
export class ListService extends Store<ListStata> {
    state$: State<ListStata>
    listData$: Computed<Object>
    constructor(private cardsApi: ScheduleApi1v1) {
      super()
      this.state$ = new State({
        listData: {}
      })
      this.listData$ = new Computed(this.state$.pipe(pluck('listData')))
    }
    getList(query:GetSchedulePersonalListInput) {
      return this.cardsApi.getSchedulePersonalList(query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.listData = res
          })
        })
      )
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      this.getList({
        start_time: '2019-05-01',
        end_time: '2019-05-23'
      }).subscribe(() => {
        next()
      })
    }
}
