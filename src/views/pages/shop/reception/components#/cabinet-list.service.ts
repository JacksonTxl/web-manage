import { RouteService } from '@/services/route.service'
import { Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'
import { CabinetApi } from '@/api/v1/setting/cabinet'
import { AuthService } from '@/services/auth.service'
import { CABINET, CABINET_BUSINESS_TYPE } from '@/constants/reception/cabinet'

@Injectable()
export class CabinetListService {
  state$ = new State<any>({})
  list$ = new State([])
  auth$ = this.authService.authMap$({
    edit: 'shop:cabinet:cabinet|edit'
  })
  constructor(
    private cabinetApi: CabinetApi,
    private authService: AuthService,
    private routeService: RouteService
  ) {}
  getList(type: string, id: number) {
    return this.cabinetApi.getList(id, type).pipe(
      tap(res => {
        res.list.map((item: any) => {
          item.cabinetClass = this.cabinetClass(item)
          return item
        })
        this.list$.commit(() => res.list)
      })
    )
  }
  cabinetUsingItem(item: any) {
    const isCabinetType = this.routeService.query$.value.type === 'long-term'
    if (isCabinetType && item.sale_status === 1) {
      item.cabinet_business_type = 2
    }
    return item
  }
  cabinetClass(item: any) {
    let cabinet = ''
    switch (this.cabinetUsingItem(item).cabinet_business_type) {
      case CABINET_BUSINESS_TYPE.AVAILABLE:
        cabinet = ''
        break
      case CABINET_BUSINESS_TYPE.USING:
        cabinet = 'shop-reception-cabinet__item--normal-using'
        if (item.is_smart) {
          cabinet = 'shop-reception-cabinet__item--using'
        }
        break
      case CABINET_BUSINESS_TYPE.BROKEN:
        cabinet = 'shop-reception-cabinet__item--broken'
        break
      case CABINET_BUSINESS_TYPE.REPAIR:
        cabinet = 'shop-reception-cabinet__item--repair'
        break
    }
    return cabinet
  }
}
