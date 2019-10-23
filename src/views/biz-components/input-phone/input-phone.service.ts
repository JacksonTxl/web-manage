import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi } from '@/api/v1/staff'

@Injectable()
export class InputPhoneService {
  countryList$ = new State([])
  constructor(private staffApi: StaffApi) {}
  getCountryCodes() {
    return this.staffApi.getCountryCodes().pipe(
      tap(res => {
        this.countryList$.commit(() => res.code_list)
      })
    )
  }
}
