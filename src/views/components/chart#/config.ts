export class ChartConfig {
  /**
   * 面积图基础配置
   */
  get defaultAreaOptions() {
    return {
      /**
       * 指定图表的高度，单位为 'px
       */
      height: 300,
      /**
       * 设置图表的内边距
       */
      padding: 'auto',
      fieldNames: {
        x: 'year',
        y: 'value'
      },
      lineColor: '#258EF9',
      lineWidth: 2,
      /**
       * 使用渐变色，l 后面传入角度，0 代表起始颜色，1 代表结束颜色
       */
      areaColor: 'l(90) 0:rgba(63, 102, 246, .2) 1:rgba(0, 202, 255, 0)'
    }
  }
  /**
   * 折线图基础配置
   */
  get defaultLineOptions() {
    return {
      /**
       * 指定图表的高度，单位为 'px
       */
      height: 300,
      /**
       * 设置图表的内边距
       */
      padding: 'auto',
      fieldNames: {
        x: 'year',
        y: 'value'
      },
      lineColor: '#258EF9',
      lineWidth: 2,
      /**
       * 使用渐变色，l 后面传入角度，0 代表起始颜色，1 代表结束颜色
       */
      areaColor: 'l(90) 0:rgba(63, 102, 246, .2) 1:rgba(0, 202, 255, 0)'
    }
  }
}
