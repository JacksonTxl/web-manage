import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourtApi } from '@/api/v1/shop/area'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService {
  loading$ = new State({})
  list$ = new State([])
  auth$ = this.authService.authMap$({
    areaAdd: 'shop:shop:shop_area|add',
    areaEdit: 'shop:shop:shop_area|edit',
    areaDel: 'shop:shop:shop_area|del',
    seatSet: 'shop:shop:area_seat|set'
  })
  constructor(protected courtApi: CourtApi, private authService: AuthService) {}

  @Effect()
  getList() {
    return this.courtApi.getList().pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
  del(id: number) {
    return this.courtApi.del(id)
  }
  sort(list: any[]) {
    list = list.map((item, index) => {
      return {
        id: item.id,
        sorted: index
      }
    })
    return this.courtApi.sort({ list })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList()
  }
}
