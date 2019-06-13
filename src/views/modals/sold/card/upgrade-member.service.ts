import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { ContractApi } from '@/api/v1/setting/contract'

@Injectable()
export class UpgradeMemberService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private contractApi:ContractApi, private cardApi:CardApi) {}
  getInfo(id:string) {
    return this.cardApi.getCardUpgradeInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  serviceInit(id:string) {
    return forkJoin(this.getInfo(id))
  }
  @Effect()
  getCardList(search?:string) {
    return this.cardApi.getCardUpgradeList(search)
  }
  @Effect()
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
}
