<template>
  <div class="brand-stat-course-ring"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'
import { decimalFilter } from './filters'
import StHelpTooltip from '@/views/components/help-tooltip/help-tooltip'

export default {
  name: 'BrandStatCourseRing',
  mixins: [chartMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 198
    },
    name: {
      type: String,
      default: ''
    },
    tooltipId: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    colors: {
      type: Array,
      default: () => ['#4679F9', '#894BFF']
    },
    unit: {
      type: String,
      default: '节'
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
        padding: ['auto', 180, 'auto', 'auto'],
        height: this.height
      })
      this.chart.source(this.dv, {
        value: {
          formatter: v => v + this.unit
        }
      })
      this.chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name} <span class="st-g2-tooltip-value">| {value}</span></li>'
      })
      this.chart.coord('theta', {
        innerRadius: 0.65
      })
      this.chart.legend({
        position: 'right-center',
        useHtml: true,
        itemTpl: (name, color, checked, index) => {
          const row = this.dv.findRow({ name })
          const value = row.value
          return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">
                    <i class="g2-legend-marker" style="background-color:{color};"></i>
                    <span class="g2-legend-text">${name}</span>
                    <div class='legend-right mg-l12'>
                      <span class='legend-percent'>${value}${this.unit}</span>
                    </div>
                  </li>`
        }
      })
      this.chart.guide().html({
        position: ['50%', '50%'],
        html: () => {
          let sum = this.dv.sum('value')
          return `<div class='guide'>
          <div class='guide-name'><span class="mg-r4">${
            this.name
          }</span><span id="guide-name-tooltip${this.tooltipId}"></span></div>
            <div class='guide-title'><span class='guide-value'>${sum}</span><span class='guide-unit'>${
            this.unit
          }</span></div>
            </div>`
        }
      })

      this.chart.guide().arc({
        start: (xScales, yScales) => {
          if (this.dv.sum('value') === 0) {
            this.hoverable = false
            return ['22%', '50%']
          }
          return []
        },
        end: (xScales, yScales) => {
          if (this.dv.sum('value') === 0) {
            this.hoverable = false
            return ['78%', '50%']
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
            return ['78%', '50%']
          }
          return []
        },
        end: (xScales, yScales) => {
          if (this.dv.sum('value') === 0) {
            this.hoverable = false
            return ['22%', '50%']
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

      const interval = this.chart
        .intervalStack()
        .style({
          fillOpacity: 1,
          cursor: 'pointer'
        })
        .tooltip('name*percent', function(item, percent, a) {
          return {
            name: item,
            value: percent + '%'
          }
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
      this.changeData()
      const $s = this.$el.querySelector.bind(this.$el)

      this.chart.on('interval:mouseenter', e => {
        const origin = e.data._origin
        $s('.guide-value').textContent = origin.value
        $s('.guide-name').textContent = origin.name
      })
      this.chart.on('interval:mouseleave', e => {
        $s('.guide-value').textContent = this.total
        $s('.guide-name').textContent = this.name
        const component = new Vue({
          components: {
            StHelpTooltip
          },
          render: h => <st-help-tooltip class={'mg-l4'} id={this.tooltipId} />
        }).$mount()
        $s('.guide-name').appendChild(component.$el)
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
      const mouseLeaveHandler = () => {
        $s('.guide-value').textContent = this.total
        $s('.guide-name').textContent = this.name
        const component = new Vue({
          components: {
            StHelpTooltip
          },
          render: h => <st-help-tooltip class={'mg-l4'} id={this.tooltipId} />
        }).$mount()
        $s('.guide-name').appendChild(component.$el)
      }

      legendListItems.forEach(el => {
        el.addEventListener('mouseenter', mouseHandler, false)
        this.offMouseHandlers.push(() => {
          el.addEventListener('mouseenter', mouseHandler, false)
        })
      })
      legendListItems.forEach(el => {
        el.addEventListener('mouseleave', mouseLeaveHandler, false)
        this.offMouseHandlers.push(() => {
          el.addEventListener('mouseleave', mouseLeaveHandler, false)
        })
      })
    },
    changeData() {
      new Vue({
        el: `#guide-name-tooltip${this.tooltipId}`,
        components: {
          StHelpTooltip
        },
        render: h => <st-help-tooltip id={this.tooltipId} />
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
