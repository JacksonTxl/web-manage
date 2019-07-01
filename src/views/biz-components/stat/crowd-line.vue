<template>
  <div class="stat-crowd-line"></div>
</template>

<script>
import chartMixin from './mixin'
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'
import { toKFilter, thousandsFilter } from './filters'
export default {
  mixins: [chartMixin],
  props: {
    /**
     * @example
     * [{date:'05/19',入场人数:1346,领券人数:1023,交易人数:940,上课人数:680},{date:'05/20',入场人数:1346,领券人数:1023,交易人数:940,上课人数:680}]
     */
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 324
    },
    fields: {
      type: Array,
      default: () => ['入场人数', '领券人数', '交易人数', '上课人数']
    },
    colors: {
      type: Array,
      default: () => ['#3F66F6', '#06DB8C', '#FFB946', '#C87FFF']
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
        height: this.height,
        renderer: 'svg'
      })
      this.chart.source(this.dv, {
        date: {
          range: [0, 1]
        },
        value: {
          tickCount: 8,
          mix: 0,
          formatter: toKFilter
        }
      })
      this.chart.legend(false)
      this.chart.axis('date', {
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
        }
      })
      this.chart
        .line()
        .tooltip('name*value', (name, value) => {
          return {
            name,
            value: thousandsFilter(value, 0) + '人'
          }
        })
        .size(2)
        .position('date*value')
        .color('name', this.colors)

      this.chart.render()
    }
  }
}
</script>
