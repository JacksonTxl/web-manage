import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

interface UserExprienceInfoState {
  physicalListInfo: any
  followInfo: any
}
@Injectable()
export class UserExperienceService extends Store<UserExprienceInfoState> {
  state$: State<UserExprienceInfoState>
  physicalListInfo$: Computed<string>
  followInfo$: Computed<string>
  auth$ = this.authService.authMap$({
    add: 'shop:member:member_physical_record|add'
  })
  constructor(private memberApi: MemberApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      physicalListInfo: {},
      followInfo: {}
    })
    this.physicalListInfo$ = new Computed(
      this.state$.pipe(pluck('physicalListInfo'))
    )
    this.followInfo$ = new Computed(this.state$.pipe(pluck('followInfo')))
  }
  SET_CARDS_LIST_INFO(physicalListInfo: UserExprienceInfoState) {
    console.log(physicalListInfo)
    this.state$.commit(state => {
      state.physicalListInfo = physicalListInfo
    })
  }
  SET_FOLLOW_INFO(followInfo: UserExprienceInfoState) {
    this.state$.commit(state => {
      state.followInfo = followInfo
    })
  }
  getMemberSideRecord(id: any, query: any) {
    return this.memberApi.getMemberSideRecord(id, query).pipe(
      tap(res => {
        console.log(res, '获取数据')
        res = this.authService.filter(res)
        this.SET_CARDS_LIST_INFO(res)
      })
    )
  }
  getMemberSideChart(id: any) {
    return this.memberApi.getMemberSideChart(id).pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_FOLLOW_INFO(res)
      })
    )
  }
  init(id: string) {
    return forkJoin(
      this.getMemberSideRecord(id, {
        size: 20,
        page: 1
      }),
      this.getMemberSideChart({
        id: id,
        filed: 1
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
    this.init(to.meta.query.id).subscribe(() => next())
  }
}
