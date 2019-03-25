import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { ManageApi } from '@/api/account/manage'

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
    return this.manageApi.findManageMail({
      mail: '123',
      captcha: '456'
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList().subscribe(res => {
      this.SET_LIST(res)
      next()
    })
  }
}