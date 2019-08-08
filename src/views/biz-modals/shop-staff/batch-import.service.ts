import { Injectable } from 'vue-service-app'

import { StaffApi, TransferBrandInput } from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'

@Injectable()
export class BatchImportService {
  loading$ = new State({})
  constructor(private staffApi: StaffApi, private msg: MessageService) {}
  @Effect()
  transferBrand(params: TransferBrandInput) {
    return this.staffApi.transferBrand(params).pipe(
      tap(res => {
        this.msg.success({
          content: '批量导入成功'
        })
      })
    )
  }
}
