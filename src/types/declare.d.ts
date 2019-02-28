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
