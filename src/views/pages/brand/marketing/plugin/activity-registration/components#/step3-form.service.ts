import { tap } from 'rxjs/operators'
import { State } from 'rx-state'
import { Controller, Injectable } from 'vue-service-app'
import { SignUpApi } from '@/api/v1/marketing/sign-up'
@Injectable()
export class Step3FormService {
  constructor(private api: SignUpApi) {}
  defaultExtInfo$ = new State([])
  getDefaultExtInfo() {
    return this.api.getSignUpDefaultExtInfo().pipe(
      tap(res => {
        this.defaultExtInfo$.commit(() => res.list)
      })
    )
  }
}
