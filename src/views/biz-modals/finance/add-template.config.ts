import { PatternService } from '@/services/pattern.service'
export const ruleOptions = (vm: any) => {
  const pattern = new PatternService()
  return {
    template_name: {
      rules: [
        {
          required: true,
          pattern: pattern.CN_EN_NUM_SPACE('1-15'),
          message: '请输入模板名称'
        }
      ]
    },
    salary: {
      rules: [
        {
          required: true,
          pattern: pattern.NUM('1-6'),
          message: '请输入月底薪'
        }
      ]
    }
  }
}
