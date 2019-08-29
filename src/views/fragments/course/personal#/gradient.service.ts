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
    const brand = this.userService.brand$.snapshot()
    /**
     * priceModel 1、教练统一定价 2、教练分级定价
     */
    const { priceModel } = brand
    const isLevelModel = priceModel === 2

    const isNotSelectCoachLevel = gradient.find(record => record.level_id <= 0)
    /**
     * 教练分级定价模式下，需要校验教练等级
     */
    if (isLevelModel && isNotSelectCoachLevel) {
      this.errorTip('请选择教练等级')
      return false
    }
    return true
  }
}
