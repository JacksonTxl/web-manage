import { Injectable, ServiceRoute } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { DataApi } from '@/api/v1/app/venue/data'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'

@Injectable()
export class CenterService {
  banner$ = new State({})
  list$ = new State({})
  constructor(private authService: AuthService, private dataApi: DataApi) {}
  getInfo() {
    return this.dataApi.getAppInfo().pipe(
      tap((res: any) => {
        this.banner$.commit(() => res.banner)
        this.list$.commit(() => res.apps)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo()
  }
}
