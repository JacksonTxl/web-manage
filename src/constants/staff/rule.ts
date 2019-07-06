import { I18NService } from '@/services/i18n.service'
import { Injectable } from 'vue-service-app'
import { PatternService } from '@/services/pattern.service'

@Injectable()

export class RuleConfig {
  constructor(
    private i18n: I18NService,
    private pattern: PatternService
  ) {}
  // 员工姓名
  get staff_name() {
    return ['staff_name', {
      rules: [
        {
          required: true,
          message: '请填写姓名'
        },
        {
          pattern: this.pattern.CN_EN_NUM('4-15'),
          message: '请输入4-15个字，中英文及数字'
        }
      ]
    }]
  }
  // 员工昵称
  get nickname() {
    return ['nickname', {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        },
        {
          pattern: this.pattern.CN_EN_NUM('4-10'),
          message: '请输入4-10个字，中英文及数字'
        }
      ]
    }]
  }

  // 手机号国籍编码
  get country_code_id() {
    return ['country_code_id', { initialValue: 37 }]
  }
  // 手机号
  get phone() {
    return ['mobile', {
      rules: [
        {
          required: true,
          message: '手机号格式错误',
          pattern: this.pattern.MOBILE
        }
      ]
    }]
  }
  // 邮箱
  get mail() {
    return ['mail', {
      rules: [
        {
          required: true,
          message: '请填写邮箱',
          pattern: this.pattern.EMAIL
        }
      ]
    }]
  }
  // 性别
  get sex() {
    return ['sex', {
      rules: [{ required: true, message: '请选择你的性别' }]
    }]
  }
  // 证件类型
  get idtype() {
    return ['id_type']
  }
  // 证件号
  get idnumber() {
    return ['id_number', {
      rules: [
        {
          required: true,
          message: '请填写正确的身份证号',
          pattern: this.pattern.ID
        }
      ]
    }]
  }
  // 员工头像
  get image_avatar() {
    return ['image_avatar']
  }
  // 员工人脸
  get image_face() {
    return ['image_face']
  }
  // 员工职能
  get identity() {
    return ['identity', {
      rules: [{ required: true, message: '请选择职能' }]
    }]
  }

  // 部门
  get department_id() {
    return ['department_id']
  }
  // 工号
  get staff_num() {
    return ['staff_num', {
      rules: [{ required: true, message: '请填写工号' }]
    }]
  }
  // 工作性质
  get nature_work() {
    return ['nature_work', {
      rules: [{ required: true, message: '请选择工作性质' }]
    }]
  }

  // 入职时间
  get entry_date() {
    return ['entry_date']
  }

  // 门店
  get shop_id() {
    return ['shop_id', {
      rules: [{ required: true, message: '请选择门店' }]
    }]
  }
  // 角色
  get role_id() {
    return ['role_id']
  }
  // 系统使用权限
  get is_permission() {
    return ['is_permission', { initialValue: 0 }]
  }

  // 教练等级
  get coach_levelRule() {
    return ['coach_level_id', {
      rules: [{ required: true, message: '请选择教练等级' }]
    }]
  }

  // 毕业院校
  get graduated_school() {
    return ['graduated_school']
  }

  // 学历
  get education() {
    return ['education']
  }
  // 生日
  get birthday() {
    return ['birthday']
  }

  // 婚姻状况
  get marry_status() {
    return ['marry_status']
  }

  // 毕业时间
  get graduation_time() {
    return ['graduation_time']
  }

  // 专业
  get profession() {
    return ['profession']
  }

  // 籍贯
  get native_place() {
    return ['native_place']
  }

  // 子女状态
  get children_status() {
    return ['children_status']
  }

  // 家庭住址
  get provinces() {
    return ['provinces']
  }

  // 详细住址
  get address() {
    return ['address']
  }

  // 备注
  get description() {
    return ['description']
  }

  // 从业时间
  get employment_time() {
    return ['employment_time']
  }
  // 个人经历
  get introduction() {
    return ['introduction']
  }
}
