<template>
  <div class="stat-shop-course-facet-bar">
    <!-- 门店售课消课分面柱状图 -->
  </div>
</template>

<script>
import chartMixin from './mixin'
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'
export default {
  mixins: [chartMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => ['团体课', '私教课']
    },
    colors: {
      type: Array,
      default: () => ['l(0) 0:#57ABFF 1:#426BF7', 'l(0) 0:#8428FF 1:#6332D1']
    },
    height: {
      type: Number,
      default: 280
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
          key: 'type',
          value: 'value'
        })
        .transform({
          type: 'map',
          callback(row) {
            row.value = row.value ? +row.value : 0
            return row
          }
        })
    },
    initChart() {
      this.chart = new Chart({
        container: this.$el,
        padding: 'auto',
        renderer: 'svg',
        forceFit: true,
        height: this.height
      })

      this.chart.source(this.dv)
      // 图例位置
      this.chart.legend({
        position: 'top-left',
        marker: 'circle',
        offsetX: 5
      })
      // 图表分面 相当于两个柱状图
      this.chart.facet('mirror', {
        fields: ['type'],
        padding: 4,
        showTitle: false,
        transpose: true,

        eachView: (view, facet) => {
          const facetIndex = facet.colIndex
          view.axis('group', {
            position: 'top',
            label: {
              textStyle: {
                fill: '#3E4D5C',
                fontSize: 12
              }
            },
            tickLine: {
              alignWithLabel: false,
              length: 0
            },
            line: {
              lineWidth: 0
            }
          })

          const color = this.colors[facetIndex]
          view.axis('value', false)

          view
            .interval()
            .position('group*value')
            .tooltip('type*value', (t, v) => {
              return { name: t, value: v + '节' }
            })
            .color('type', [color])
            .size(24)
            .opacity(1)
            .label('value', val => {
              const maxValue = this.dv.max('value')

              let offset = -4
              let textAlign = facetIndex === 1 ? 'end' : 'start'
              let fill = 'white'
              const shouldPutLeft = val / maxValue < 0.1
              if (shouldPutLeft) {
                offset = 4
                textAlign = facetIndex === 1 ? 'start' : 'end'
                fill = '#3E4D5C'
              }

              return {
                offset: offset,
                textStyle: {
                  fill,
                  textAlign: textAlign
                }
              }
            })
        }
      })
      this.chart.render()
    }
  }
}
</script>
