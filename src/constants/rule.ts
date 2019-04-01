export class RuleConfig {
  mobile = /^1[34578]\d{9}$/
  id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证
}
