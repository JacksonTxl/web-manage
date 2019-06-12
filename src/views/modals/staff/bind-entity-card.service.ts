import { Injectable } from 'vue-service-app'

import {
  StaffApi, PutStaffBindPhysicalInput
} from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'
import { tap } from 'rxjs/operators'

/**
 *
 */
@Injectable()
export class BindEntityCardService {
  constructor(private staffApi: StaffApi, private msg: MessageService) {
  }
  putStaffBindPhysical(params: PutStaffBindPhysicalInput) {
    return this.staffApi.putStaffBindPhysical(params).pipe(tap(res => {
      this.msg.success({
        content: '绑定实体卡成功'
      })
    }))
  }
}
