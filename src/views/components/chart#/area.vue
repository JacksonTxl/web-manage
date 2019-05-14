<template>
  <div :id="id"></div>
</template>
<script>
import G2 from '@antv/g2'
const defaultOptions = {
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
export default {
  name: 'StAreaChart',
  props: {
    /**
     * 图表id
     */
    id: {
      type: String,
      default: 'area-chart'
    },
    /**
     * 面积图类型
     */
    type: {
      type: String,
      default: 'basic'
    },
    /**
     * 图表数据
     */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    data(val) {
      this.chart.changeData(val)
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const opts = Object.assign(defaultOptions, this.options)
      const { x, y } = opts.fieldNames
      G2.track(false) // 关闭打点监控
      const chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        ...opts
      })
      this.chart = chart
      chart.source(this.data)
      chart.scale({
        [x]: {
          range: [0, 1]
        }
      })
      chart.axis(x, {
        label: {
          textStyle: {
            fill: '#9BACB9'
          },
          tickLine: null
        },
        tickLine: {
          alignWithLabel: false,
          length: 0
        }
      })
      chart.axis(y, {
        label: {
          formatter: function formatter(val) {
            return (val / 10000).toFixed(1) + 'k'
          },
          textStyle: {
            fill: '#9BACB9'
          }
        },
        grid: {
          type: 'line',
          lineStyle: {
            stroke: '#E6E9EF', // 网格线的颜色
            lineWidth: 1, // 网格线的粗细
            lineDash: [0, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
          }
        }
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart.area().position([x, y]).color(opts.areaColor).shape('smooth')
      chart.line().position([x, y]).color(opts.lineColor).size(opts.lineWidth).shape('smooth')
      chart.render()
    }
  }
}
</script>
