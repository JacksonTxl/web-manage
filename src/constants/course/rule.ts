import { I18NService } from '@/services/i18n.service'
import { Injectable } from 'vue-service-app'

@Injectable()
export class RuleConfig {
  constructor(private i18n: I18NService) { }
  /**
   * 课程 id
   */
  get courseId() {
    return ['course_id']
  }
  /**
   * 课程名称
   */
  get courseName() {
    return [
      'course_name', {
        rules: [{
          required: true,
          message: '请输入课程名称'
        }, {
          min: 4,
          message: '支持输入4~30个字的课程名称'
        }]
      }
    ]
  }
  /**
   * 课程分类id
   */
  get categoryId() {
    return [
      'category_id', {
        rules: [{
          required: true,
          message: '请选择课程类型'
        }]
      }
    ]
  }
  /**
   * 训练目的
   */
  get trainAim() {
    return [
      'train_aim', {
        rules: [{
          required: true,
          message: '请选择训练目的'
        }]
      }
    ]
  }
  /**
   * 课程时长
   */
  get duration() {
    return [
      'duration', {
        rules: [{
          required: true,
          message: '请输入课程时长'
        }]
      }
    ]
  }
  /**
   * 是否支持在线购买
   */
  get isOnlineSale() {
    return [
      'is_online_sale', {
        rules: [{
          required: true,
          message: '请选择是否支持在线购买'
        }]
      }
    ]
  }
  /**
   * 参考定价
   */
  get price() {
    return [
      'price', {
        rules: []
      }
    ]
  }
  /**
   * 课程有效期
   */
  get effectiveUnit() {
    return [
      'effective_unit', {
        rules: [{
          required: true,
          message: '请输入课程有效期'
        }],
        initialValue: 7
      }
    ]
  }
  /**
   * 课程图片
   */
  get image() {
    return ['image']
  }
  /**
   * 课程描述
   */
  get description() {
    return ['description', {
      initialValue: ''
    }]
  }
  /**
   * 上课门店类型（全店/指定门店）
   */
  get shopSetting() {
    return [
      'shop_setting', {
        initialValue: '1'
      }
    ]
  }
  /**
   * 上课门店 门店ids
   */
  get shopIds() {
    return [
      'shop_ids', {
        rules: [{
          required: true,
          message: '请选择上课门店'
        }]
      }
    ]
  }
  /**
 * 上课教练 教练ids
 */
  get coachIds() {
    return [
      'coach_ids', {
        rules: []
      }
    ]
  }
  /**
   * 售价设置(售卖场馆自主定价/品牌统一定价)
   */
  get priceSetting() {
    return [
      'price_setting', {
        initialValue: 1
      }
    ]
  }
  /**
   * 课程定价
   */
  get priceGradient() {
    return [
      'price_gradient', {
        rules: []
      }
    ]
  }
  /**
   * 训练强度
   */
  get strengthLevel() {
    return ['strength_level', {
      rules: [{
        required: true,
        message: '请选择训练强度'
      }]
    }]
  }
  /**
   * 卡路里
   */
  get calories() {
    return ['calories']
  }
  /**
   * 售卖方式
   */
  get sellType() {
    return ['sell_type', {
      initialValue: [2]
    }]
  }
  /**
   * 是否支持单节售卖
   */
  get singleSell() {
    return ['single_sell', {
      initialValue: 0
    }]
  }
  /**
   * 是否支持单节预约
   */
  get singleReserve() {
    return ['single_reserve', {
      initialValue: 0
    }]
  }
  /**
   * 单节售卖价格
   */
  get singlePrice() {
    return ['single_price', {
      initialValue: ''
    }]
  }
}
