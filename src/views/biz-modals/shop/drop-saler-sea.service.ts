import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class DropSalerSeaService {
  loading$ = new State({})
  constructor(private cardsApi: MemberApi) {}
  dropSalerSea(params: any) {
    return this.cardsApi.dropSalerSea(params)
  }
}
