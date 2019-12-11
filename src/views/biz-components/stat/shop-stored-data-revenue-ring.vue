<template>
  <div class="shop-stored-data-revenue-ring"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'
import Vue from 'vue'
import StHelpTooltip from '@/views/components/help-tooltip/help-tooltip'
import { decimalFilter } from './filters'

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
    padding: {
      type: Array,
      default: () => [30, 80, 38, 0]
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
      default: '单'
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
        container: this.$el, // 对应图表的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象
        forceFit: true, // 当 forceFit: true 时宽度配置不生效
        padding: this.padding, // 设置图表的内边距
        height: this.height // 指定图表的高度
      })
      // 数据源数据，标准的 JSON 数组或者 DataSet.View 对象
      this.chart.source(this.dv, {
        value: {
          // formatter鼠标移入提示信息
          formatter: v => v + this.unit
        }
      })
      // coord 设置坐标系类型，同时允许进行各种坐标系变换，默认为笛卡尔坐标系。
      // theta 一种半径固定的极坐标系，常用于饼图。
      this.chart.coord('theta', {
        // // 空心圆的半径，值范围为 0 至 1
        innerRadius: 0.65
      })
      // legend 配置图表图例。
      this.chart.legend({
        // 图表位置
        position: 'right-center',
        // 针对分类类型图例，用于开启是否使用 HTML 渲染图例，默认为 false，true 表示使用 HTML 渲染图例。这种情况下不要使用 'legend-item:click' 建议使用  onClick
        useHtml: true,
        // 当 useHtml 为 true 时生效，用于指定生成图例的图例项 HTML 模板
        itemTpl: (name, color, checked, index) => {
          return (
            // `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">` +
            // `<i class="g2-legend-marker" style="background-color:{color};"></i>` +
            // `<span class="g2-legend-text">${name}&nbsp;<span id='legend-{index}'></span></span>` +
            // `</li>`
            `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">` +
            `<i class="g2-legend-marker" style="background-color:{color};"></i>` +
            `<span class="g2-legend-text">${name}</span>` +
            `<span class="g2-legend-money">¥ 4,544</span>` +
            `</li>`
          )
        }
      })
      // 辅助 html。
      this.chart.guide().html({
        // // html 的中心位置
        position: ['50%', '50%'],
        //
        html: () => {
          let sum = decimalFilter(this.dv.sum('value'))
          return (
            `<div class='guide'>` +
            `<div class='guide-title'><span class='guide-value'>${sum}</span><span class='guide-unit'>${
              this.unit
            }</span></div>` +
            `<div class='guide-name'>订单数</div>` +
            `</div>`
          )
        }
      })
      // 图表的 tooltip 配置，G2 图表的 tooltip 使用 html 渲染。
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
