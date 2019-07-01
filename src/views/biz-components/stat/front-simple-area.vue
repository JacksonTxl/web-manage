<template>
  <div class="stat-brand-simple-line"></div>
</template>

<script>
import chartMixin from './mixin'
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'
export default {
  mixins: [chartMixin],
  props: {
    /**
     * @example
     * [
        { name: '1', value: 102  },
        { name: '2', value: 12  },
        { name: '3', value: 50  }
      ]
     */
    data: {
      type: Array,
      default: () => []
    },
    unit: {
      type: String,
      default: '元'
    },
    color: {
      type: String,
      default: '#3F67F5'
    },
    height: {
      type: Number,
      default: 64
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
        padding: [2, 2, 0, 2]
      })

      this.chart.source(this.dv, {
        name: {
          range: [0, 1]
        },
        value: {
          min: 0,
          tickCount: 3
        }
      })
      this.chart.axis('value', {
        nice: true,
        grid: {
          lineStyle: {
            stroke: '#E6E9EF',
            lineWidth: 0.5,
            lineDash: [0, 0]
          }
        }
      })
      this.chart.axis('name', false)
      this.chart.tooltip({
        showTitle: false,
        useHtml: true,
        itemTpl:
          `<li class='tooltip-item' data-index={index} style='background-color:${
            this.color
          };'>` +
          `<span class='g2-tooltip-value'>{value}${this.unit}</span>` +
          `</li>`
      })

      this.chart
        .line()
        .shape('smooth')
        .color(this.color)
        .position('name*value')

      this.chart
        .area()
        .shape('smooth')
        .opacity(0.5)
        .tooltip(false)
        .color(`l(90) 0:${this.color} 1:#ffffff`)
        .position('name*value')

      this.chart.render()
    }
  }
}
</script>

<style lang="less">
.stat-brand-simple-line {
  .g2-tooltip {
    padding: 0 !important;
  }
  .tooltip-item {
    margin: 0 !important;
    border-radius: 2px;
    padding: 4px 6px;
  }
  .g2-tooltip-value {
    margin: 0 !important;
    float: none !important;
    color: white;
    font-size: 12px;
  }
}
</style>
