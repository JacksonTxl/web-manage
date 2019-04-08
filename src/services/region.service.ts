import { Injectable, ServiceRoute } from 'vue-service-app'
import { map, tap } from 'rxjs/operators'
import { RegionApi, GetRegionInput } from '@/api/basic/region'
import { of } from 'rxjs'

@Injectable()
export class RegionService {
  constructor(private regionApi: RegionApi) {}
  private filterCityId(cityOptions: any = []) {
    return cityOptions.map((item: any) => {
      item.id = '' + item.id
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
