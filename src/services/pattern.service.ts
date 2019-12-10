export class PatternService {
  private DEFAULT_LEN: string = '1-20'
  private PATTERN_MAP: PatternMap = {
    /**
     * 中文
     */
    CN: '^[\\u4e00-\\u9fa5]{**}$',
    /**
     * 英文
     */
    EN: '^[A-Za-z]{**}$',
    /**
     * 大写英文
     */
    UC_EN: '^[A-Z]{**}$',
    /**
     * 小写英文
     */
    LC_EN: '^[a-z]{**}$',
    /**
     * 英文 数字 二者至少有一位
     * /(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])^[\dA-Za-z]{6,15}$/
     */
    // @ts-ignore
    UC_LC_EN: '(?=.*[\\d])(?=.*[A-z])^[\\dA-Za-z]{**}$',
    /**
     * 英文、数字 至少有一个 英文不区分大小写
     */
    // @ts-ignore
    UL_EN_NUM: '(?=.*[\\d])(?=.*[a-z])(?=.*[A-Z])^[\\dA-Za-z]{**}$',
    /**
     * 数字
     */
    NUM: '^\\d{**}$',
    /**
     * 数字可以有小数点
     */
    NUM_POINT: '^\\d+(.\\d+)?$',
    /**
     * 中文、英文
     */
    CN_EN: '^[A-Za-z\\u4e00-\\u9fa5]{**}$',
    /**
     * 中文、英文、数字，不含标点符号
     */
    CN_EN_NUM: '^[A-Za-z0-9\\u4e00-\\u9fa5]{**}$',
    /**
     * 英文、数字
     */
    EN_NUM: '^[A-Za-z0-9]{**}$',

    /**
     * 中文、英文、数字、空格
     */
    CN_EN_NUM_SPACE:
      '^[A-Za-z0-9\\u4e00-\\u9fa5]{1,2}$|^[A-Za-z0-9\\u4e00-\\u9fa5][A-Za-z0-9\\u4e00-\\u9fa5\\s]{**}[A-Za-z0-9\\u4e00-\\u9fa5]$',
    /**
     * 包含手机号和座机号
     */
    TEL:
      '^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8,9][0-9]\\d{8})))$',
    /**
     * 手机号
     */
    MOBILE: '^1[0-9]{10}$',
    /**
     * 电子邮箱
     */
    EMAIL: '^(?![\\w\\.@]{51,}$)(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$',
    /**
     * 身份证号
     */
    ID: '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
    /**
     * 图片类型
     */
    IMG: '^(image\\/png|image\\/jpg|image\\/jpeg)$'
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
    return new RegExp(
      this.PATTERN_MAP[patternName].replace('**', `${lens[0]},${lens[1]}`)
    )
  }
  /**
   * 中文
   * @param len
   */
  CN(len: string = this.DEFAULT_LEN) {
    return this.createPattern('CN', len)
  }
  /**
   * 英文
   * @param len
   */
  EN(len: string = this.DEFAULT_LEN) {
    return this.createPattern('EN', len)
  }
  /**
   * 纯大写英文
   * @param len
   */
  UC_EN(len: string = this.DEFAULT_LEN) {
    return this.createPattern('UC_EN', len)
  }
  /**
   * 纯小写英文
   * @param len
   */
  LC_EN(len: string = this.DEFAULT_LEN) {
    return this.createPattern('LC_EN', len)
  }
  /**
   * 大小写至少包含一个的英文 + 数字
   * @param len
   */
  UC_LC_EN(len: string = this.DEFAULT_LEN) {
    return this.createPattern('UC_LC_EN', len)
  }
  /**
   * 英文大小写，数字每样至少有一个
   * @param len
   */
  UL_EN_NUM(len: string = this.DEFAULT_LEN) {
    return this.createPattern('UL_EN_NUM', len)
  }
  /**
   * 中文、英文
   * @param len
   */
  CN_EN(len: string = this.DEFAULT_LEN) {
    return this.createPattern('CN_EN', len)
  }
  /**
   * 数字（整数）
   * @param len
   */
  NUM(len: string = this.DEFAULT_LEN) {
    return this.createPattern('NUM', len)
  }
  /**
   * 数字（小数）
   * @param len
   */
  NUM_POINT(len: string = this.DEFAULT_LEN) {
    return this.createPattern('NUM_POINT', len)
  }
  /**
   * 浮点数，最多支持 decimal 位小数
   * @param decimal
   */
  NUM_FLOAT(decimal: number = 1) {
    return new RegExp(`^\\d+(\.\\d{1,${decimal}})?$`)
  }
  /**
   * 中文、英文、数字，不含标点符号
   * @param len
   */
  CN_EN_NUM(len: string = this.DEFAULT_LEN) {
    return this.createPattern('CN_EN_NUM', len)
  }
  /**
   * 英文、数字
   * @param len
   */
  EN_NUM(len: string = this.DEFAULT_LEN) {
    return this.createPattern('EN_NUM', len)
  }
  /**
   * 中文、英文、数字、空格（中间，非开头与结尾）
   */
  CN_EN_NUM_SPACE(len: string = this.DEFAULT_LEN) {
    const lens = len.split('-')
    if (+lens[1] <= 2) {
      return this.createPattern('CN_EN_NUM', len)
    }
    return this.createPattern(
      'CN_EN_NUM_SPACE',
      `${+lens[0] - 2 >= 0 ? +lens[0] - 2 : 0}-${+lens[1] - 2}`
    )
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
