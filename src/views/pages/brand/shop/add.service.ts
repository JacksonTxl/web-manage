import { Injectable } from 'vue-service-app'
import { ShopApi, ShopInput } from '@/api/v1/shop'

@Injectable()
export class AddService {
  constructor(private shopApi: ShopApi) {}
  save(data: ShopInput) {
    return this.shopApi.add(data)
  }
}
