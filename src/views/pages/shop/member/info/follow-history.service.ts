import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

interface FollowHistoryInfoState {
  followHistoryInfo: any
  followInfo: any
}
@Injectable()
export class FollowHistoryService extends Store<FollowHistoryInfoState> {
  state$: State<FollowHistoryInfoState>
  followHistoryInfo$: Computed<string>
  followInfo$: Computed<string>
  auth$: Computed<Object>
  constructor(private memberApi: MemberApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      followHistoryInfo: {},
      followInfo: {},
      auth: {
        add: this.authService.can('shop:member:member_record|add')
      }
    })
    this.followHistoryInfo$ = new Computed(this.state$.pipe(pluck('followHistoryInfo')))
    this.followInfo$ = new Computed(this.state$.pipe(pluck('followInfo')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_FOLLOW_HISTORY_INFO(followHistoryInfo: FollowHistoryInfoState) {
    console.log(followHistoryInfo)
    this.state$.commit(state => {
      state.followHistoryInfo = followHistoryInfo
    })
  }
  SET_FOLLOW_INFO(followInfo: FollowHistoryInfoState) {
    this.state$.commit(state => {
      state.followInfo = followInfo
    })
  }
  getListInfo(id: any) {
    return this.memberApi.getMemberFollowRecord(id).pipe(
      tap(res => {
        console.log(res, '获取数据')
        res = this.authService.filter(res)
        this.SET_FOLLOW_HISTORY_INFO(res)
      })
    )
  }
  getFollowInfo(id: any) {
    return this.memberApi.getMemberFollow(id).pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_FOLLOW_INFO(res)
      })
    )
  }
  init(id: string) {
    return forkJoin(this.getListInfo(id), this.getFollowInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.meta.query.id).subscribe(() => next())
  }
}
