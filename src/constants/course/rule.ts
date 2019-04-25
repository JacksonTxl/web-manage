import { I18NService } from '@/services/i18n.service'
import { State } from 'rx-state/src'
import { Injectable } from 'vue-service-app'

@Injectable()
export class RuleConfig {
  constructor(private i18n: I18NService) { }
  /**
   * 课程名称
   */
  get courseCname() {
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
  get price() {
    return [
      'price', {
        rules: []
      }
    ]
  }
  get effectiveUnit() {
    return [
      'effective_unit', {
        rules: [],
        initialValue: 7
      }
    ]
  }
  get image() {
    return [
      'image'
    ]
  }
  get description() {
    return [
      'description'
    ]
  }
}
