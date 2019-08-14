import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { map, tap, pluck } from 'rxjs/operators'
import { RegionApi, GetRegionInput } from '@/api/region'
import { of } from 'rxjs'
import { State } from 'rx-state'

@Injectable()
export class RegionService implements RouteGuard {
  regionPC$ = new State([])
  constructor(private regionApi: RegionApi) {}
  getRegionPC() {
    return this.regionApi.getRegions().pipe(
      map(data$ => {
        if (data$) {
          data$.forEach((i: any) => {
            i.children.forEach((inner: any) => {
              delete inner.children
            })
          })
        }
        return data$
      })
    )
  }
  // SET_REGION_PC
  private filterCityId(cityOptions: any = []) {
    return cityOptions.map((item: any) => {
      this.filterCityId(item.children)
      return item
    })
  }
  getRegions() {
    const local = window.localStorage
    if (local.getItem('regionTree')) {
      return of(JSON.parse(local.regionTree))
    } else {
      return this.regionApi.getRegions().pipe(
        tap(state$ => {
          const regionTree = JSON.stringify(state$)
          local.setItem('regionTree', regionTree)
        }),
        map(data$ => {
          return this.filterCityId(data$)
        })
      )
    }
  }
  getRegionCitys(id: GetRegionInput) {
    return this.regionApi.getRegionCitys(id)
  }
  getRegionDistricts(id: GetRegionInput) {
    return this.regionApi.getRegionDistricts(id)
  }
  getRegionProvinces() {
    return this.regionApi.getRegionProvinces()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    console.log('触发了么')
    return this.getRegions()
  }
}
