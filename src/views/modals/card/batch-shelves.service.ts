import { Injectable } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CardsApi } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class BatchShelvesService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardsApi) {}
  getInfo(id:string) {
    return this.cardApi.getCardShelfInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
}
