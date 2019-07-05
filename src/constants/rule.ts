export class RuleConfig {
  mobile = /^1[34578]\d{9}$/
  id_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证
  shop_name = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/ // 门店名称
  card_name = /^(?! )[a-zA-Z0-9\u4e00-\u9fa5 ]{1,30}$/ // 卡名称,名称中间允许出现空格
  img_type = /^(image\/png|image\/jpg|image\/jpeg)$/ // 图片类型
  number = /^(\d+(\.\d?)?|\.\d?)$/ // 包含小数的数字  匹配 1.1 / 1. / .1 三种形式
  email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/

  private REGEXP_MAP: RegExpMap = {
    'CN_EN_NUM': '^[A-z0-9\\u4e00-\\u9fa5]{**}$'
  }
  /**
   * @param len
   * @param type
   * 示例 generateRule('4-16')
   */
  generateRule(len: string = '1-20', type: string = 'CN_EN_NUM') {
    if (!/^\d+-\d+$/.test(len)) {
      console.error(`请指定位数，例如'4-20'`)
      return
    }
    if (!this.REGEXP_MAP.hasOwnProperty(type)) {
      console.error(`类型${type}未定义`)
      return
    }
    const lens = len.split('-')
    return new RegExp(this.REGEXP_MAP[type].replace('**', `${lens[0]},${lens[1]}`))
  }
}

export interface RegExpMap {
  /**
   * 中文、英文、数字，不含标点符号
   */
  [key: string]: string
}
