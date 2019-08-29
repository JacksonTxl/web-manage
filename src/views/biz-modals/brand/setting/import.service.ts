import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { ImportApi, InputFileParams } from '@/api/v1/setting/import/import'
import { tap } from 'rxjs/operators'

@Injectable()
export class ImportService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private importApi: ImportApi) {}
  @Effect()
  uploadFile(params: InputFileParams) {
    return this.importApi.uploadFile(params)
  }
  // @Effect()
  // refund(params: RefundParams) {
  //   return this.cabinetApi.refund(params).pipe(
  //     tap((res: any) => {
  //       this.info$.commit(() => res.info)
  //     })
  //   )
  // }
}
