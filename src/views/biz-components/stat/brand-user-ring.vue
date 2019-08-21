<template>
  <div class="stat-brand-user-ring"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'

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
      default: () => ['#5C57FE', '#6332D1', '#009DFF', '#00D0F0', '#FFE679']
    },
    unit: {
      type: String,
      default: '人'
    }
  },
  methods: {
    initDv() {
      this.dv = new View()
      this.dv.source(this.data)
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
        }
      })
      this.chart.guide().html({
        position: ['50%', '50%'],
        html: () => {
          const initRow = this.data[0]
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

      this.chart.guide().arc({
        start: (xScales, yScales) => {
          if (this.dv.sum('value') === 0) {
            this.hoverable = false
            return ['19%', '50%']
          }
          return []
        },
        end: (xScales, yScales) => {
          if (this.dv.sum('value') === 0) {
            this.hoverable = false
            return ['81%', '50%']
          }
          return []
        },
        style: {
          lineWidth: 0,
          fill: '#E9EDF2',
          fillOpacity: 1,
          stroke: '#ccc'
        }
      })
      this.chart.guide().arc({
        start: (xScales, yScales) => {
          if (this.dv.sum('value') === 0) {
            this.hoverable = false
            return ['81%', '50%']
          }
          return []
        },
        end: (xScales, yScales) => {
          if (this.dv.sum('value') === 0) {
            this.hoverable = false
            return ['19%', '50%']
          }
          return []
        },
        style: {
          lineWidth: 0,
          fill: '#E9EDF2',
          fillOpacity: 1,
          stroke: '#ccc'
        }
      })
      this.chart.guide().arc({
        start: ['30%', '50%'],
        end: ['70%', '50%'],
        style: {
          lineWidth: 0,
          fill: '#fff',
          fillOpacity: 1,
          stroke: '#ccc'
        }
      })
      this.chart.guide().arc({
        start: ['70%', '50%'],
        end: ['30%', '50%'],
        style: {
          lineWidth: 0,
          fill: '#fff',
          fillOpacity: 1,
          stroke: '#ccc'
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
        .color('name', this.colors)
        .select(false)
        .active({
          style: {
            fillOpacity: 1,
            lineWidth: 8
          }
        })

      this.chart.render()

      const shapes = interval.getShapes()
      const firstShape = shapes[0]
      interval.setShapesActived(firstShape)

      const $s = this.$el.querySelector.bind(this.$el)

      this.chart.on('interval:mouseenter', e => {
        const origin = e.data._origin
        $s('.guide-value').textContent = origin.value
        $s('.guide-name').textContent = origin.name
      })
      const legendListItems = [
        ...this.$el.querySelectorAll('.g2-legend-list-item')
      ]

      const vm = this
      vm.offMouseHandlers = []
      const mouseHandler = function() {
        const name = this.dataset.value
        const row = vm.dv.findRow({ name })
        $s('.guide-value').textContent = row.value
        $s('.guide-name').textContent = row.name
      }

      legendListItems.forEach(el => {
        el.addEventListener('mouseenter', mouseHandler, false)
        this.offMouseHandlers.push(() => {
          el.addEventListener('mouseenter', mouseHandler, false)
        })
      })
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.offMouseHandlers.forEach(fn => fn())
    }
  }
}
</script>
