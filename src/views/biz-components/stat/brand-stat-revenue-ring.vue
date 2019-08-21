<template>
  <div class="brand-stat-revenue-ring"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'
import Vue from 'vue'
import StHelpTooltip from '@/views/components/help-tooltip/help-tooltip'

export default {
  mixins: [chartMixin],
  props: {
    /**
     * @example
     * [{name:'图例1',value:123}]
     */
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 280
    },
    colors: {
      type: Array,
      default: () => [
        '#5C57FE',
        '#6332D1',
        '#009DFF',
        '#00D0F0',
        '#00FF87',
        '#24A68D',
        '#FFE679'
      ]
    },
    unit: {
      type: String,
      default: '元'
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
        padding: [8, 80, 8, 0],
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
        itemTpl: (name, color, checked, index) => {
          return (
            `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">` +
            `<i class="g2-legend-marker" style="background-color:{color};"></i>` +
            `<span class="g2-legend-text">${name}&nbsp;<span id='legend-{index}'></span></span>` +
            `</li>`
          )
        }
      })
      this.chart.guide().html({
        position: ['50%', '50%'],
        html: () => {
          const sum = this.dv.sum('value')
          return (
            `<div class='guide'>` +
            `<div class='guide-title'><span class='guide-value'>${sum}</span><span class='guide-unit'>${
              this.unit
            }</span></div>` +
            `<div class='guide-name'>总营收</div>` +
            `</div>`
          )
        }
      })
      this.chart.guide().arc({
        start: ['3%', '50%'],
        end: ['97%', '50%'],
        style: {
          lineWidth: 0,
          fill: '#E9EDF2',
          fillOpacity: 1,
          stroke: '#ccc'
        }
      })
      this.chart.guide().arc({
        start: ['97%', '50%'],
        end: ['3%', '50%'],
        style: {
          lineWidth: 0,
          fill: '#E9EDF2',
          fillOpacity: 1,
          stroke: '#ccc'
        }
      })
      this.chart.guide().arc({
        start: ['19%', '50%'],
        end: ['81%', '50%'],
        style: {
          lineWidth: 0,
          fill: '#fff',
          fillOpacity: 1,
          stroke: '#ccc'
        }
      })
      this.chart.guide().arc({
        start: ['81%', '50%'],
        end: ['19%', '50%'],
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

      this.chart
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

      this.changeData()

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
    },
    changeData() {
      new Vue({
        components: {
          StHelpTooltip
        },
        render: h => <st-help-tooltip id="TBDAR002" />
      }).$mount('#legend-1')
      new Vue({
        components: {
          StHelpTooltip
        },
        render: h => <st-help-tooltip id="TBDAR001" />
      }).$mount('#legend-5')
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.offMouseHandlers.forEach(fn => fn())
    }
  }
}
</script>
