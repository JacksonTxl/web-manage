import { Injectable } from 'vue-service-app'
import { MessageService } from '@/services/message.service'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { tap } from 'rxjs/operators'
@Injectable()
export class BindCardService {
  constructor(private staffApi: ShopStaffApi, private msg: MessageService) {
  }
  putStaffBindPhysical(params: any) {
    return this.staffApi.putStaffBindPhysical(params).pipe(tap(res => {
      this.msg.success({
        content: '绑定实体卡成功'
      })
    }))
  }
}
