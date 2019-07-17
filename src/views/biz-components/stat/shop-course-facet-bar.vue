<template>
  <div class="stat-shop-course-facet-bar">
    <!-- 门店售课消课分面柱状图 -->
  </div>
</template>

<script>
import chartMixin from './mixin'
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'
import Vue from 'vue'
import StHelpTooltip from '@/views/components/help-tooltip/help-tooltip'
import { debounce } from 'lodash-es'
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
  mounted() {
    window.addEventListener('resize', debounce(this.mountedTooltip, 200))
  },
  methods: {
    mountedTooltip() {
      setTimeout(this.changeData, 400)
    },
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
      let tooltipEl = new Vue({
        components: {
          StHelpTooltip
        },
        render: h => (
          <st-help-tooltip></st-help-tooltip>
        )
      }).$mount().$el
      this.chart = new Chart({
        container: this.$el,
        padding: ['auto', 'auto', 'auto', 70],
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
              offset: 70,
              textStyle: {
                fill: '#3E4D5C',
                fontSize: 12
              },
              htmlTemplate: (text, item, index) => { // 增加tooltipEl.outerHTML，防止mounted未完成导致的空白闪烁
                return `<span style="width:70px;display:block;">${text}&nbsp;<span id="axis-${index}">${tooltipEl.outerHTML}</span></span>`
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

          view.guide().region({
            start: ['0%', '11.5%'], // 辅助框起始位置，值为原始数据值，支持 callback
            end: ['100%', '21.5%'], // 辅助框结束位置，值为原始数据值，支持 callback
            style: {
              lineWidth: 0, // 辅助框的边框宽度
              fill: '#E9EDF2', // 辅助框填充的颜色
              fillOpacity: 1, // 辅助框的背景透明度
              stroke: '#ccc' // 辅助框的边框颜色设置
            }
          })
          view.guide().region({
            start: ['0%', '45%'], // 辅助框起始位置，值为原始数据值，支持 callback
            end: ['100%', '55%'], // 辅助框结束位置，值为原始数据值，支持 callback
            style: {
              lineWidth: 0, // 辅助框的边框宽度
              fill: '#E9EDF2', // 辅助框填充的颜色
              fillOpacity: 1, // 辅助框的背景透明度
              stroke: '#ccc' // 辅助框的边框颜色设置
            }
          })
          view.guide().region({
            start: ['0%', '78.5%'], // 辅助框起始位置，值为原始数据值，支持 callback
            end: ['100%', '88.5%'], // 辅助框结束位置，值为原始数据值，支持 callback
            style: {
              lineWidth: 0, // 辅助框的边框宽度
              fill: '#E9EDF2', // 辅助框填充的颜色
              fillOpacity: 1, // 辅助框的背景透明度
              stroke: '#ccc' // 辅助框的边框颜色设置
            }
          })
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
      this.changeData()
    },
    changeData() {
      if (document.querySelector('#axis-0')) {
        new Vue({
          components: {
            StHelpTooltip
          },
          render: h => (
            <st-help-tooltip id="TBDAC001"></st-help-tooltip>
          )
        }).$mount('#axis-0')
        new Vue({
          components: {
            StHelpTooltip
          },
          render: h => (
            <st-help-tooltip id="TBDAC002"></st-help-tooltip>
          )
        }).$mount('#axis-1')
        new Vue({
          components: {
            StHelpTooltip
          },
          render: h => (
            <st-help-tooltip id="TBDAC003"></st-help-tooltip>
          )
        }).$mount('#axis-2')
      }
    }
  }
}
</script>
