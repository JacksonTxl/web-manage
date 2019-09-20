<template>
  <div class="stat-brand-user-avg-bar"></div>
</template>

<script>
import { View } from 'st-data-set'
import { Chart } from '@antv/g2'
import { toKFilter, thousandsFilter } from './filters'
import chartMixin from './mixin'

export default {
  mixins: [chartMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => ['l(90) 0:#57ACFF 1:#4169F7']
    },
    height: {
      type: Number,
      default: 200
    }
  },
  methods: {
    initDv() {
      this.dv = new View()
      this.dv.source(this.data)
      this.dv.transform({
        type: 'map',
        callback(row) {
          row.value = +row.value
          return row
        }
      })
    },
    initChart() {
      this.chart = new Chart({
        container: this.$el,
        forceFit: true,
        height: this.height,
        renderer: 'svg',
        padding: 'auto'
      })

      this.chart.source(this.dv, {
        value: {
          formatter: toKFilter
        }
      })
      this.chart.legend(false)

      this.chart.axis('name', {
        label: {
          offsetY: 2,
          textStyle: {
            fontSize: 12,
            fill: '#9BACB9'
          }
        },
        line: {
          stroke: '#f3f3f4', // 坐标轴线的颜色
          // strokeOpacity: {number}, // 坐标轴线的透明度，数值范围为 0 - 1
          lineWidth: 0.5 // 设置坐标轴线的粗细
        },
        tickLine: {
          lineWidth: 0,
          length: 0
        }
      })

      this.chart.axis('value', {
        grid: {
          lineStyle: {
            stroke: '#E9E9E9',
            lineWidth: 0.5,
            lineDash: [0, 0]
          }
        },
        label: {
          textStyle: {
            fontSize: 12,
            fill: '#9BACB9'
          }
        },
        range: [0, 1]
      })
      this.chart.tooltip({
        showTitle: false
      })

      this.chart
        .interval()
        .opacity(0.9)
        .position('name*value')
        .tooltip('name*value', (name, value) => {
          return {
            name,
            value: '¥' + thousandsFilter(value)
          }
        })
        .color('name', this.colors)
      this.chart.render()
    }
  }
}
</script>
