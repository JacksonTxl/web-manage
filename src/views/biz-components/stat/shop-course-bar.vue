<template>
  <!-- 售课消课bar图表 -->
  <div class="stat-shop-course-bar"></div>
</template>

<script>
import { View } from '@antv/data-set'
import { Chart } from '@antv/g2'
import { toKFilter } from './filters'
import chartMixin from './mixin'
export default {
  mixins: [chartMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => ['售课数', '消课数']
    },
    colors: {
      type: Array,
      default: () => ['l(90) 0:#6E37AA 1:#8652D5', 'l(90) 0:#61C5FF 1:#387FCD']
    }
  },
  methods: {
    initDv() {
      this.dv = new View()
      this.dv.source(this.data)
      this.dv
        .transform({
          type: 'fold',
          fields: this.fields,
          key: 'name',
          value: 'value'
        })
        .transform({
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
        height: 280,
        padding: [80, 8, 32, 48],
        renderer: 'svg'
      })

      this.chart.source(this.dv, {
        value: {
          formatter: toKFilter,
          tickCount: 5
        }
      })

      this.chart.axis('type', {
        label: {
          textStyle: {
            fill: '#9BACB9'
          }
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

      this.chart.legend({
        position: 'top-left',
        marker: 'circle',
        itemGap: 32,
        offsetY: -40,
        textStyle: {
          fill: '#3E4D5C'
        }
      })

      this.chart
        .interval()
        .tooltip('name*value', (name, value) => ({
          name,
          value: value + '节'
        }))
        .position('type*value')
        .color('name', this.colors)
        .adjust({
          type: 'dodge',
          marginRatio: 0
        })
      this.chart.render()
    }
  }
}
</script>
