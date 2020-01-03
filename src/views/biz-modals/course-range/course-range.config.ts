import { PatternService } from '@/services/pattern.service'

export const ruleOptions = (vm: any) => {
  const pattern = new PatternService()
  return {
    id: {},
    setting_name: {
      rules: [
        {
          required: true,
          pattern: pattern.CN_EN_NUM_SPACE('1-14'),
          message: '1-14个字，支持中英文、数字'
        }
      ]
    }
  }
}
