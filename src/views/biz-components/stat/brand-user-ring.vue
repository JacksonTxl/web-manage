<template>
  <div class="stat-brand-user-ring"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'
import { decimalFilter } from './filters'
import { isEmpty } from 'lodash-es'

export default {
  mixins: [chartMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 200
    },
    colors: {
      type: Array,
      default: () => [
        '#5C57FE',
        '#6332D1',
        '#009DFF',
        '#00D0F0',
        '#FFE679',
        '#aFa679'
      ]
    },
    unit: {
      type: String,
      default: '人'
    }
  },
  computed: {
    dataSource() {
      if (this.data.length === 0) return this.data
      const isEmpty = this.data
        .map(item => item.value)
        .reduce((value, total) => value + total)
      const emptyItem = { name: 'empty', value: 1 }
      return !isEmpty ? [...this.data, emptyItem] : this.data
    }
  },
  methods: {
    initDv() {
      this.dv = new View()
      this.dv.source(this.dataSource)
      this.dv
        .transform({
          type: 'map',
          callback(row) {
            row.value = +row.value
            return row
          }
        })
        // 计算百分比
        .transform({
          type: 'percent',
          field: 'value',
          dimension: 'name',
          as: 'percent'
        })
    },
    initChart() {
      this.chart = new Chart({
        container: this.$el,
        forceFit: true,
        padding: ['auto', 140, 'auto', 'auto'],
        height: this.height
      })
      this.chart.source(this.dv, {
        value: {
          formatter: v => v + this.unit
        }
      })
      this.chart.coord('theta', {
        innerRadius: 0.65
      })
      this.chart.legend({
        position: 'right-center',
        useHtml: true,
        clickable: false,
        itemTpl: (name, color, checked, index) => {
          const row = this.dv.findRow({ name })
          const percent = parseInt(row.percent * 100)
          return (
            `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">` +
            `<i class="g2-legend-marker" style="background-color:{color};"></i>` +
            `<span class="g2-legend-text">${name}</span>` +
            `<div class='legend-right'>` +
            `<span class='legend-divider'>|</span>` +
            `<span class='legend-percent'>${percent}%</span>` +
            `</div>` +
            `</li>`
          )
        },
        onHover: ev => {
          // 总计为 0 是执行hover

          const $s = this.$el.querySelector.bind(this.$el)
          const name = ev.item.value
          const row = this.dv.findRow({ name })
          const shapes = ev.shapes
          const geom = ev.geom
          const legend = ev.currentTarget
          // 选中对应单元
          row.value && geom.setShapesActived(shapes)
          $s('.guide-value').textContent = row.value
          $s('.guide-name').textContent = row.name
        }
      })
      this.chart.guide().html({
        position: ['50%', '50%'],
        html: () => {
          let initRow = this.data[0]
          return (
            `<div class='guide'>` +
            `<div class='guide-title'><span class='guide-value'>${
              initRow.value
            }</span><span class='guide-unit'>人</span></div>` +
            `<div class='guide-name'>${initRow.name}</div>` +
            `</div>`
          )
        }
      })
      this.chart.tooltip({
        showTitle: false
      })

      const interval = this.chart
        .intervalStack()
        .style({
          fillOpacity: 1,
          cursor: 'pointer'
        })
        .position('value')
        .color('name', [...this.colors, '#e9edf2'])
        .select(false)
        .active({
          style: {
            fillOpacity: 1,
            lineWidth: 8
          }
        })

      this.chart.render()

      const shapes = interval.getShapes()
      // 默认显示第一个 当有empty时第一个为零 不需要
      if (origin.name === 'empty') {
        const firstShape = shapes[0]
        interval.setShapesActived(firstShape)
      }

      const $s = this.$el.querySelector.bind(this.$el)

      this.chart.on('interval:mouseenter', e => {
        const shape = e.shape
        const origin = e.data._origin
        if (origin.name === 'empty') {
          this.intervalStack.clearActivedShapes(shape)
          return
        }
        $s('.guide-value').textContent = origin.value
        $s('.guide-name').textContent = origin.name
      })
    }
  },
  beforeDestroy() {
    if (this.chart) {
      // 注销图形所有事件
      this.chart.off()
    }
  }
}
</script>
