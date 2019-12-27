import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { NoticeApi, PutNoticeParams } from '@/api/v1/setting/sms/notice'
@Injectable()
export class NoticeService {
  memberList$ = new State([])
  shopList$ = new State([])
  roleList$ = new State([])
  authTabs$ = this.authService.getAuthTabs$('brand-setting-sms-notice')
  constructor(private noticeApi: NoticeApi, private authService: AuthService) {}
  SET_MEMBER_LIST(list: any) {
    this.memberList$.commit(() =>
      list.filter(({ notify_type }: any) => notify_type.value === 1)
    )
  }
  SET_SHOP_LIST(list: any) {
    this.shopList$.commit(() =>
      list.filter(({ notify_type }: any) => notify_type.value === 2)
    )
  }
  getNoticeList() {
    return this.noticeApi.getNoticeList().pipe(
      tap((res: any) => {
        this.SET_SHOP_LIST(res.list)
        this.SET_MEMBER_LIST(res.list)
      })
    )
  }
  getRoleList() {
    return this.noticeApi.getRoleList().pipe(
      tap(res => {
        this.roleList$.commit(() =>
          res.list.map((item: any) => {
            return { label: item.name, value: `${item.id}` }
          })
        )
      })
    )
  }
  putNotice(params: PutNoticeParams) {
    return this.noticeApi.putNotice(params).pipe(tap((res: any) => {}))
  }
  beforeRouteEnter() {
    return this.getRoleList()
  }
  beforeEach() {
    return this.getNoticeList()
  }
}
