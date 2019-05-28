import { I18NService } from '@/services/i18n.service'
import { Injectable } from 'vue-service-app'

@Injectable()
export class RuleConfig {
  constructor(private i18n: I18NService) { }
  get firstLetter() {
    return ['first_letter']
  }
  get startNum() {
    return [
      'start_num', {
        rules: [{
          required: true,
          message: '请输入起始编号'
        }]
      }
    ]
  }
  get num() {
    return [
      'num', {
        rules: [{
          required: true,
          message: '请输入柜子数量'
        }]
      }
    ]
  }
  get sortType() {
    return [
      'sort_type', {
        rules: [{
          required: true,
          message: '请输入递增方式'
        }]
      }
    ]
  }
  get priceNum() {
    return [
      'price_num', {
        rules: [{
          required: true,
          message: '请输入售卖价格'
        }]
      }
    ]
  }
  get transferNum() {
    return ['transfer_num']
  }
}
