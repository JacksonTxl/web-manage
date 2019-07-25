import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi, EditFaceParams } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  basicInfo$ = new State({})
  auth$ = new State({})
  authCommon$ = this.authService.authMap({
    add: 'shop:member:member|tag',
    face: 'brand_shop:iot:face|edit'
  })
  constructor(private cardsApi: MemberApi, private authService: AuthService) { }
  getHeaderInfo(id: string) {
    return this.cardsApi.getHeaderInfo(id).pipe(
      tap(res => {
        res = this.authService.filter(res, 'auth')
        this.info$.commit(() => res.common_info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  getBasicInfo(id: string) {
    return this.cardsApi.getBasicInfo(id).pipe(
      tap(res => {
        this.basicInfo$.commit(() => res.basic_info)
      })
    )
  }

  removeWechatBind(id: number) {
    return this.cardsApi.removeWechatBind(id)
  }

  getMemberLabelDelete(obj: any) {
    return this.cardsApi.getMemberLabelDelete(obj)
  }

  // 修改人脸图片
  editFace(id: number, params: EditFaceParams) {
    return this.cardsApi.updateUserFace(id, params)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.meta.query
    return this.getHeaderInfo(id)
  }
}
