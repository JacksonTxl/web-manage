import { I18NService } from '@/services/i18n.service'
import { Injectable } from 'vue-service-app'

@Injectable()
export class RuleConfig {
  constructor(private i18n: I18NService) { }
  /**
   * 首字母
   */
  // get firstLetter() {
  //   return ['first_letter']
  // }
  /**
   * 起始编号/单个柜子编号
   */
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
  /**
   * 柜子数量
   */
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
  /**
   * 递增方式
   */
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
  /**
   * 价格
   */
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
  /**
   * 转让手续费
   */
  get transferNum() {
    return ['transfer_num']
  }
  /**
   * 可用状态
   */
  get useStatus() {
    return [
      'use_status', {
        rules: [{
          required: true,
          message: '请选择可用状态'
        }]
      }
    ]
  }
  get reason() {
    return ['reason', {
      initialValue: ''
    }]
  }
}
