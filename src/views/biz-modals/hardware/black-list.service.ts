import { Injectable } from 'vue-service-app'
import {
  HareWareApi,
  GetBlackListQuery,
  GetBlackListSelectQuery,
  PostBlackListParams
} from '@/api/v1/setting/hardware'
import { State, Computed, Effect } from 'rx-state'
interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class BlackService {
  loading$ = new State({})

  constructor(private HareWareApi: HareWareApi) {}
  @Effect()
  getBlackList(query: GetBlackListQuery) {
    return this.HareWareApi.getBlackList(query)
  }
  onSearchKeyWords(query: GetBlackListSelectQuery) {
    return this.HareWareApi.onSearchKeyWords(query)
  }
  postBlackListSetting(params: PostBlackListParams) {
    return this.HareWareApi.postBlackListSetting(params)
  }
}
