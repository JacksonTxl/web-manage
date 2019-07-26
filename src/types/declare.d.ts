/**
 * 全局声明文件
 */

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.png' {
  const value: any
  export default value
}

declare module '*.jpg' {
  const value: any
  export default value
}

declare module 'vue-full-calendar' {
  const value: any
  export default value
}

declare module 'v-viewer' {
  const value: any
  export default value
}

declare module 'vue-countup-v2' {
  const value: any
  export default value
}

interface StFormRuleConfig {
  /**
   * 自定义校验
   * 返回字符串代表校验错误
   */
  validator(rule: StFormRuleConfig, value: any, values: object): any
  /**
   * 校验前转换字段值
   */
  transform(value: any): any
  /**
   * 正则表达式校验
   */
  pattern: RegExp
  message: string
  enum: string
  len: number
  max: number
  min: number
  required: boolean
  type: string
  whitespace: boolean
}

interface StFormDecoratorConfig {
  [key: string]: {
    rules: StFormRuleConfig[]
    initialValue: any
    /**
     * 转换默认的 value 给控件
     */
    normalize(value: any, preValue: any, allValues: any): any
    preserve: boolean
    /**
     * 收集子节点的值的时机
     */
    trigger: string
    /**
     * 当某一规则校验不通过时，是否停止剩下的规则的校验
     */
    validateFirst: boolean
    /**
     * 校验子节点值的时机
     */
    validateTrigger: string
    /**
     * 子节点的值的属性
     */
    valuePropName: string
  }
}

interface StForm {
  decorators(): StFormDecoratorConfig
}

interface StFormFactory {
  create(): StForm
}

declare module 'vue/types/vue' {
  interface Vue {
    $stForm: StFormFactory
  }
}
