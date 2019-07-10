export const rules = (vm: any) => {
  const pattern = vm.pattern
  return {
    cnEnNum: [
      'cnEnNum', {
        rules: [{
          required: true,
          pattern: pattern.CN_EN_NUM('4-10'),
          message: '4-10个字，中英文及数字'
        }]
      }
    ],
    name: [
      'name', {
        rules: [{
          required: true,
          pattern: pattern.CN_EN_NUM_SPACE('1-15'),
          message: '1-15个字，中英文、数字、中间空格'
        }]
      }
    ],
    cn: [
      'cn', {
        rules: [{
          required: true,
          pattern: pattern.CN('2-6'),
          message: '2-6个字，中文'
        }]
      }
    ],
    en: [
      'en', {
        rules: [{
          required: true,
          pattern: pattern.EN('2-6'),
          message: '2-6个字，英文'
        }]
      }
    ],
    cnEn: [
      'cnEn', {
        rules: [{
          required: true,
          pattern: pattern.CN_EN('2-6'),
          message: '2-6位，中英文'
        }]
      }
    ],
    num: [
      'num', {
        rules: [{
          required: true,
          pattern: pattern.NUM('2-6'),
          message: '2-6位，整数'
        }]
      }
    ],
    mobile: [
      'mobile', {
        rules: [{
          required: true,
          pattern: pattern.MOBILE,
          message: '手机号格式不正确'
        }]
      }
    ],
    tel: [
      'tel', {
        rules: [{
          required: true,
          pattern: pattern.TEL,
          message: '手机号或座机号格式不正确'
        }]
      }
    ],
    id: [
      'id', {
        rules: [{
          required: true,
          pattern: pattern.ID,
          message: '身份证格式不正确'
        }]
      }
    ],
    email: [
      'email', {
        rules: [{
          required: true,
          pattern: pattern.EMAIL,
          message: '邮箱格式不正确'
        }]
      }
    ],
    img: [
      'img', {
        rules: [{
          required: true,
          pattern: pattern.IMG,
          message: '图片类型不正确'
        }]
      }
    ],
    note: [
      'note', {
        rules: [{
          required: true,
          pattern: pattern.CN_EN_NUM('1-100'),
          message: '1-100个字，中英文及数字'
        }]
      }
    ]
  }
}
