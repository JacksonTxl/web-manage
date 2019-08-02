import { Injectable, ServiceRoute } from 'vue-service-app'
import { map, tap, pluck } from 'rxjs/operators'
import { RegionApi, GetRegionInput } from '@/api/region'
import { of } from 'rxjs'
import { State, Computed } from 'rx-state'
import { Store } from './store'

@Injectable()
export class RegionService extends Store<any> {
  state$: State<any>
  regionPC$: Computed<any>
  constructor(private regionApi: RegionApi) {
    super()
    this.state$ = new State({
      regionPC: []
    })
    this.regionPC$ = new Computed(this.state$.pipe(pluck('regionPC')))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('触发了么')
    this.getRegions().subscribe(() => {
      next()
    })
  }

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
}
