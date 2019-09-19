<template>
  <div class="stat-brand-revenue-area"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'

export default {
  mixins: [chartMixin],
  props: {
    /**
     * @example
     * [{date:'05-27',访问用户:20,办理入会:10,消费用户:20,注册用户:10,访问用户:10}]
     */
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 400
    },
    fields: {
      type: Array,
      default: () => [
        '访问用户',
        '注册用户',
        '消费用户',
        '办理入会',
        '购买私教'
      ]
    },
    colors: {
      type: Array,
      default: () => ['#3F66F4', '#2B90D0', '#1EACB7', '#11C79F', '#00E881']
    }
  },
  computed: {
    areaColors() {
      return this.colors.map(c => `l(90) 0:${c} 1:#ffffff`)
    }
  },
  methods: {
    initDv() {
      this.dv = new View()
      this.dv.source(this.data)
      this.dv
        .transform({
          type: 'fold',
          // 展开数据使用的字段
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
        height: this.height,
        padding: 'auto',
        renderer: 'svg'
      })
      this.chart.source(this.dv, {
        value: {
          min: 0
        },
        date: {
          tickCount: 10,
          range: [0, 1]
        }
      })
      this.chart.axis('value', {
        grid: {
          lineStyle: {
            lineWidth: 0.5,
            lineDash: [0, 0]
          }
        },
        label: false
      })
      this.chart.axis('date', {
        label: {
          offsetY: 2,
          textStyle: {
            fontSize: 12,
            fill: '#9BACB9'
          }
        },
        tickLine: {
          lineWidth: 0,
          length: 0
        }
      })
      this.chart.legend({
        position: 'top-right',
        marker: 'circle',
        offsetY: -24,
        textStyle: {
          fill: '#3E4D5C'
        }
      })

      this.chart
        .line()
        .shape('smooth')
        .size(2)
        .tooltip('name*value', (name, value) => {
          return {
            name,
            value: value + '人'
          }
        })
        .position('date*value')
        .color('name', this.colors)

      this.chart
        .area()
        .shape('smooth')
        .opacity(0.5)
        .position('date*value')
        .tooltip(false)
        .color('name', this.areaColors)

      this.chart.render()
    }
  }
}
</script>
