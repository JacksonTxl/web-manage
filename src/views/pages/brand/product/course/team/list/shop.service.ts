import { ListService } from './../list.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'
import {
  BrandTeamCourseApi,
  GetTeamBrandCourseListInput,
  PutCourseTeamIntoBrandInput
} from '@/api/v1/course/team/brand'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'
import { MessageService } from '@/services/message.service'

@Injectable()
export class ShopService implements RouteGuard {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  auth$ = this.authService.authMap$({
    transfer: 'brand_shop:product:team_course|transfer'
  })
  shopsOptions$ = this.listService.shopSelectOptions$
  categoryList$ = this.listService.categoryList$
  constructor(
    private shopTeamCourseApi: BrandTeamCourseApi,
    private authService: AuthService,
    private listService: ListService,
    private msg: MessageService
  ) {}
  @Effect()
  getList(params: GetTeamBrandCourseListInput) {
    return this.shopTeamCourseApi.getTeamCourseListInShop(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  deleteCourse(courseId: string) {
    return this.shopTeamCourseApi.deleteCourse(courseId)
  }
  putCourseTeamIntoBrand(query: PutCourseTeamIntoBrandInput) {
    return this.shopTeamCourseApi.putCourseTeamIntoBrand(query).pipe(
      tap(res => {
        this.msg.success({ content: '转入成功' })
      })
    )
  }
  init(query: any) {
    return forkJoin(this.getList(query))
  }
  beforeEach(to: ServiceRoute) {
    return this.init({ ...to.query })
  }
}
