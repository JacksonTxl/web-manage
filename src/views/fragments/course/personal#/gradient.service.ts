import { Injectable } from 'vue-service-app'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
@Injectable()
export class GradientService {
  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}
  private errorTip(msg: string = '') {
    this.messageService.error({
      content: msg
    })
  }
  check(gradient: any[] = []) {
    let ret = true
    const brand = this.userService.brand$.snapshot()
    /**
     * priceModel 1、教练统一定价 2、教练分级定价
     */
    const { priceModel } = brand
    const isLevelModel = priceModel === 2
    for (let i = 0; i < gradient.length; i++) {
      const record = gradient[i]
      /**
       * 教练分级定价模式下，需要校验教练等级
       */
      if (isLevelModel) {
        if (record.level_id <= 0) {
          this.errorTip('请选择教练等级')
          ret = false
          break
        }
      }
    }
    return ret
  }
}
