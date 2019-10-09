import { Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'
import { CabinetApi } from '@/api/v1/setting/cabinet'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CabinetListService {
  state$ = new State<any>({})
  list$ = new State([])
  auth$ = this.authService.authMap$({
    edit: 'shop:cabinet:cabinet|edit'
  })
  constructor(
    private cabinetApi: CabinetApi,
    private authService: AuthService
  ) {}
  getList(type: string, id: number) {
    return this.cabinetApi.getList(id, type).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
}
