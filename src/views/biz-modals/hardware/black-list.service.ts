import { Injectable } from 'vue-service-app'
import {
  HareWareApi,
  GetBlackListQuery,
  GetBlackListSelectQuery,
  PostBlackListParams
} from '@/api/v1/setting/hardware'
import { State, Computed, Effect } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class BlackService {
  loading$ = new State({})
  blackList$ = new State([])
  searchList$ = new State([])
  blackKeys$ = new State([])
  constructor(private HareWareApi: HareWareApi) {}
  @Effect()
  getBlackList(query: GetBlackListQuery) {
    return this.HareWareApi.getBlackList(query).pipe(
      tap(res => {
        this.blackList$.commit(() => res.list)
      }),
      tap(res => {
        this.blackKeys$.commit(() => {
          return res.list.map(({ user_id }: any) => {
            return user_id
          })
        })
      })
    )
  }
  onSearchKeyWords(query: GetBlackListSelectQuery) {
    return this.HareWareApi.onSearchKeyWords(query).pipe(
      tap(res => {
        this.searchList$.commit(() => res.list)
      })
    )
  }
  postBlackListSetting(params: PostBlackListParams) {
    return this.HareWareApi.postBlackListSetting(params)
  }
}
