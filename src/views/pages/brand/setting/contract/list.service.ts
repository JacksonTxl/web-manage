import { Injectable, Controller } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'
import { AuthService } from '@/services/auth.service'

interface ListState {
  list: any[]
}

@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  auth$ = this.authService.authMap$({
    edit: 'brand:contract:contract_tpl|edit'
  })
  constructor(
    private contractApi: ContractApi,
    private authService: AuthService
  ) {}
  SET_LIST(list: any[]) {
    this.list$.commit(() => list)
  }
  getList() {
    return this.contractApi.getList().pipe(
      tap(res => {
        this.SET_LIST(res.list)
      })
    )
  }
  init() {
    return forkJoin(this.getList())
  }
  beforeRouteEnter() {
    return this.init()
  }
}
