export class RuleConfig {
  mobile = /^1[34578]\d{9}$/
  id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证
  shop_name = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/ // 门店名称
  card_name = /^(?! )[a-zA-Z0-9\u4e00-\u9fa5 ]{1,30}$/ // 卡名称,名称中间允许出现空格
  img_type = /^(image\/png|image\/jpg|image\/jpeg)$/ // 图片类型
  number = /^(\d+(\.\d?)?|\.\d?)$/ // 包含小数的数字  匹配 1.1 / 1. / .1 三种形式
  email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
  getRule(len = '1-20', opts: any = {}) {
    const DEFAULT_OPTS = {
      /**
       * 中文、英文、数字
       */
      type: 1
    }
    opts = {
      ...DEFAULT_OPTS,
      ...opts
    }
    const REGEXP_MAP: any = {
      1: '^[A-z0-9\\u4e00-\\u9fa5]{**}$'
    }
    const type = opts.type
    const lens = len.split('-')
    return new RegExp(REGEXP_MAP[type].replace('**', `${lens[0]},${lens[1]}`))
  }
}
