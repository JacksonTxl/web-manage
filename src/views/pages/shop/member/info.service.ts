import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'

interface InfoState {
  info: Object
  basicInfo: Object
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
      basicInfo: {},
      auth: {
        edit: this.authService.can('shop:member:member|edit'),
        bindCard: this.authService.can('shop:member:member|bind_card'),
        changeCoach: this.authService.can('shop:member:member|change_coach'),
        changeSalesman: this.authService.can('shop:member:member|change_salesman'),
        unbindWechat: this.authService.can('shop:member:member||unbind_wechat'),
        transfer: this.authService.can('shop:member:member|transfer'),
        frozen: this.authService.can('shop:member:member|frozen'),
        rebindCard: this.authService.can('shop:member:member|rebind_card'),
        tag: this.authService.can('shop:member:member|tag')
      }
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.basicInfo$ = new Computed(this.state$.pipe(pluck('basicInfo')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  getHeaderInfo(id: string) {
    return this.cardsApi.getHeaderInfo(id).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.state$.commit(state => {
          state.info = res.common_info
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
