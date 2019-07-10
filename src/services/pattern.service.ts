export class PatternService {
  private PATTERN_MAP: PatternMap = {
    /**
     * 中文、英文、数字，不含标点符号
     */
    'CN_EN_NUM': '^[A-z0-9\\u4e00-\\u9fa5]{**}$',
    /**
     * 中文、英文、数字、空格
     */
    'CN_EN_NUM_SPACE': '^[A-z0-9\\u4e00-\\u9fa5][A-z0-9\\u4e00-\\u9fa5\\s]{**}[A-z0-9\\u4e00-\\u9fa5]$',
    /**
     * 包含手机号和座机号
     */
    'TEL': '^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$',
    /**
     * 手机号
     */
    'MOBILE': '^1[0-9]{10}$',
    /**
     * 电子邮箱
     */
    'EMAIL': '^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$',
    /**
     * 身份证号
     */
    'ID': '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
    /**
     * 图片类型
     */
    'IMG': '^(image\\/png|image\\/jpg|image\\/jpeg)$'
    /**
     * 数字
     */
  }
  /**
   * 校验参数 len
   */
  private checkLen(len: string): boolean {
    if (!/^\d+-\d+$/.test(len)) {
      console.error(`请指定位数，例如'4-20'`)
      return false
    }
    return true
  }
  private createPattern(patternName: string, len: string) {
    if (!this.checkLen(len)) {
      return
    }
    const lens = len.split('-')
    return new RegExp(this.PATTERN_MAP[patternName].replace('**', `${lens[0]},${lens[1]}`))
  }
  /**
   * 中文、英文、数字，不含标点符号
   * @param len
   */
  CN_EN_NUM(len: string = '1-20') {
    return this.createPattern('CN_EN_NUM', len)
  }
  /**
   * 中文、英文、数字、空格（中间，非开头与结尾）
   */
  CN_EN_NUM_SPACE(len: string = '1-20') {
    const lens = len.split('-')
    if (+lens[0] <= 2) {
      return this.createPattern('CN_EN_NUM', len)
    }
    return this.createPattern('CN_EN_NUM_SPACE', `${+lens[0] - 2}-${+lens[1] - 2}`)
  }
  /**
   * 手机号与座机号
   */
  get TEL() {
    return new RegExp(this.PATTERN_MAP['TEL'])
  }
  /**
   * 手机号
   */
  get MOBILE() {
    return new RegExp(this.PATTERN_MAP['MOBILE'])
  }
  get EMAIL() {
    return new RegExp(this.PATTERN_MAP['EMAIL'])
  }
  get ID() {
    return new RegExp(this.PATTERN_MAP['ID'])
  }
  get IMG() {
    return new RegExp(this.PATTERN_MAP['IMG'])
  }
}

export interface PatternMap {
  [key: string]: string
}
