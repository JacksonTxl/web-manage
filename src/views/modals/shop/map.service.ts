import { Injectable } from 'vue-service-app'
import { MapApi, MapLocationParams } from '@/api/v1/map'

@Injectable()
export class MapService {
  constructor(private mapApi: MapApi) {}
  getLocation(params:MapLocationParams) {
    return this.mapApi.getIPLocation(params)
  }
}
