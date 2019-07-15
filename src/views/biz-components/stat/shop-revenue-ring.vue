<template>
  <div class="stat-shop-revenue-ring"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from '@antv/data-set'
import chartMixin from './mixin'

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
            `<span class="g2-legend-text">${name}</span>` +
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

<style lang='less'>
.stat-shop-revenue-ring {
  .g2-legend-list {
    width: 160px;
  }
  .g2-legend-list-item {
    margin-right: 0 !important;
    margin-bottom: 16px !important;
  }
  .g2-legend-marker {
    margin-right: 8px !important;
  }
  .g2-legend-text {
    display: inline-block;
    width: 64px;
    color: #3e4d5c;
  }

  .guide {
    text-align: center;
    width: 200px;
  }
  .guide-title {
    color: #252a2e;
    margin-bottom: 8px;
  }
  .guide-value {
    font-family: bebas;
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
  }
  .guide-unit {
    font-size: 14px;
    line-height: 20px;
    margin-left: 4px;
  }
  .guide-name {
    font-size: 14px;
    line-height: 22px;
    color: #9bacb9;
  }
}
</style>
