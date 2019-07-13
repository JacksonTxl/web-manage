<template>
  <div class="stat-shop-entry-line">
    <!-- 门店入场人数图表 -->
  </div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'
import chartMixin from './mixin'
import { toKFilter } from './filters'
export default {
  name: 'ShopAddUser',
  mixins: [chartMixin],
  props: {
    /**
     * @example
     * [{date:'05-19',value:2015},{date:'08-20',value:3800}]
     */
    data: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: 'l(90) 0:#57ABFF 1:#4169F7'
    },
    height: {
      type: Number,
      default: 400
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
        // svg阴影比较符合预期
        renderer: 'svg',
        padding: [16, 16, 32, 20],
        height: this.height
      })
      this.chart.source(this.dv, {
        date: {
          tickCount: 10,
          range: [0, 1]
        },
        value: {
          formatter: toKFilter,
          tickCount: 4,
          min: 0
        }
      })

      this.chart.axis('date', {
        label: {
          textStyle: {
            fill: '#9BACB9'
          }
        },
        tickLine: {
          lineWidth: 0,
          length: 0
        }
      })
      this.chart.axis('value', {
        label: {
          textStyle: {
            fill: '#9BACB9'
          }
        },
        grid: {
          lineStyle: {
            lineWidth: 0.5,
            lineDash: [0, 0]
          }
        }
      })
      this.chart
        .line()
        .shape('smooth')
        .position('date*value')
        .size(2)
        .style({
          shadowColor: 'rgba(65,105,247,.4)',
          shadowBlur: 20,
          shadowOffsetY: 4
        })
        .color(this.color)

      this.chart.render()
    }
  }
}
</script>
