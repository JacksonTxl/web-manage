import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { ManageApi } from '@/api/account/manage'
import { of, from } from 'rxjs'
import { delay } from 'rxjs/operators'

@Injectable()
export class ListService {
  list$: State<any[]>
  constructor(private manageApi: ManageApi) {
    this.list$ = new State([])
  }
  SET_LIST(data: any[]) {
    this.list$.commit(() => data)
  }
  getList() {
    return of([1, 2, 3]).pipe(delay(200))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList().subscribe(res => {
      this.SET_LIST(res)
      next()
    })
  }
}
