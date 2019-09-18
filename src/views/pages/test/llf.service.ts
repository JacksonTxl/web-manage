import { ShopApi } from '@/api/v1/shop'
import { Injectable, RouteGuard } from 'vue-service-app'
import { Effect, State } from 'rx-state'
@Injectable()
export class LlfService {
  loading$ = new State({})
  constructor(private shopApi: ShopApi) {}
}
