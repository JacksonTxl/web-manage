import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'

interface InfoState {
  info: Object
  basicInfo: Object
  auth: Object
}
@Injectable()
export class InfoService extends Store<InfoState> {
  state$: State<InfoState>
  info$: Computed<Object>
  basicInfo$: Computed<Object>
  auth$: Computed<Object>
  constructor(private cardsApi: MemberApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      info: {},
      basicInfo: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.basicInfo$ = new Computed(this.state$.pipe(pluck('basicInfo')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  getHeaderInfo(id: string) {
    return this.cardsApi.getHeaderInfo(id).pipe(
      tap(res => {
        res = this.authService.filter(res, 'auth')
        this.state$.commit(state => {
          state.info = res.common_info
          state.auth = res.auth
        })
      })
    )
  }
  getBasicInfo(id: string) {
    return this.cardsApi.getBasicInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.basic_info
        })
      })
    )
  }

  removeWechatBind(id: number) {
    return this.cardsApi.removeWechatBind(id)
  }

  getMemberLabelDelete(obj: any) {
    return this.cardsApi.getMemberLabelDelete(obj)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const { id } = to.meta.query
    this.getHeaderInfo(id).subscribe(() => {
      // next()
    })
    next()
  }
}
