<template>
  <div class="biz-stat-ring" :style="{ height: height + 'px' }">
    <div ref="placeholder" class="biz-stat-ring__placeholder"></div>
    <div ref="data" class="biz-stat-ring__data"></div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'
import { decimalFilter } from './filters'
import StHelpTooltip from '@/views/components/help-tooltip/help-tooltip'

export default {
  name: 'BizStatRing',
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
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.initDv()
    this.initChart()
  },
  methods: {
    initDv() {
      console.log('ok')
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
      console.log(this.$refs.placeholder)
      this.placeholderChart = new Chart({
        container: this.$refs.placeholder,
        forceFit: true,
        renderer: 'svg',
        padding: ['auto', 120, 'auto', 'auto'],
        height: this.height
      })

      this.placeholderChart.source([{ name: '', value: 0 }])

      this.placeholderChart
        .intervalStack()
        .position('value')
        .color('name', ['#E9EDF2'])
        .tooltip(false)

      this.placeholderChart.render()

      // this.chart = new Chart({
      //   container: this.$refs.dataChart,
      //   forceFit: true,
      //   padding: ['auto', 180, 'auto', 'auto'],
      //   renderer: 'svg',
      //   height: this.height
      // })
      // this.chart.source(this.dv, {
      //   value: {
      //     formatter: v => v + this.unit
      //   }
      // })
      // this.chart.tooltip({
      //   showTitle: false,
      //   itemTpl: `<li>
      //               <span style="background-color:{color};" class="g2-tooltip-marker">{name}</span>
      //               <span class="st-g2-tooltip-value">| {value}</span>
      //             </li>`
      // })
      // this.chart.coord('theta', {
      //   innerRadius: 0.65
      // })
      // this.chart.legend({
      //   position: 'right-center',
      //   useHtml: true,
      //   itemTpl: (name, color, checked, index) => {
      //     const row = this.dv.findRow({ name })
      //     const value = row.value
      //     return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">
      //               <i class="g2-legend-marker" style="background-color:{color};"></i>
      //               <span class="g2-legend-text">${name}</span>
      //               <div class='legend-right mg-l12'>
      //                 <span class='legend-percent'>${value}${this.unit}</span>
      //               </div>
      //             </li>`
      //   }
      // })

      // // 总计的自定义DOM
      // this.chart.guide().html({
      //   position: ['50%', '50%'],
      //   html: () => {
      //     let sum = this.dv.sum('value')
      //     return `<div class='guide'>
      //               <div class='guide-name'>
      //                 <span class="mg-r4">${this.name}</span>
      //                 <span id="guide-name-tooltip${this.tooltipId}"></span>
      //                 </div>
      //               <div class='guide-title'>
      //                 <span class='guide-value'>${sum}</span>
      //                 <span class='guide-unit'>${this.unit}</span>
      //               </div>
      //             </div>`
      //   }
      // })

      // // 环形图初始化
      // const interval = this.chart
      //   .intervalStack()
      //   .style({
      //     fillOpacity: 1,
      //     cursor: 'pointer'
      //   })
      //   .tooltip('name*percent', function(item, percent, a) {
      //     return {
      //       name: item,
      //       value: percent + '%'
      //     }
      //   })
      //   .position('value')
      //   .color('name', this.colors)
      //   .select(false)
      //   .active({
      //     style: {
      //       fillOpacity: 1,
      //       lineWidth: 8
      //     }
      //   })

      // this.chart.render()
      // this.changeData()
      // const $s = this.$el.querySelector.bind(this.$el)
      // // 鼠标进入环形显示相关的值
      // this.chart.on('interval:mouseenter', e => {
      //   const origin = e.data._origin
      //   $s('.guide-value').textContent = origin.value
      //   $s('.guide-name').textContent = origin.name
      // })
      // // 鼠标离开显示总值
      // this.chart.on('interval:mouseleave', e => {
      //   $s('.guide-value').textContent = this.total
      //   $s('.guide-name').textContent = this.name
      //   const component = new Vue({
      //     components: {
      //       StHelpTooltip
      //     },
      //     render: h => <st-help-tooltip class={'mg-l4'} id={this.tooltipId} />
      //   }).$mount()
      //   $s('.guide-name').appendChild(component.$el)
      // })
      // const legendListItems = [
      //   ...this.$el.querySelectorAll('.g2-legend-list-item')
      // ]

      // const vm = this
      // vm.offMouseHandlers = []
      // // 控制右边标注的鼠标移入移出的数值变化
      // const mouseHandler = function() {
      //   const name = this.dataset.value
      //   const row = vm.dv.findRow({ name })
      //   $s('.guide-value').textContent = row.value
      //   $s('.guide-name').textContent = row.name
      // }
      // const mouseLeaveHandler = () => {
      //   $s('.guide-value').textContent = this.total
      //   $s('.guide-name').textContent = this.name
      //   const component = new Vue({
      //     components: {
      //       StHelpTooltip
      //     },
      //     render: h => <st-help-tooltip class={'mg-l4'} id={this.tooltipId} />
      //   }).$mount()
      //   $s('.guide-name').appendChild(component.$el)
      // }

      // legendListItems.forEach(el => {
      //   el.addEventListener('mouseenter', mouseHandler, false)
      //   this.offMouseHandlers.push(() => {
      //     el.addEventListener('mouseenter', mouseHandler, false)
      //   })
      // })
      // legendListItems.forEach(el => {
      //   el.addEventListener('mouseleave', mouseLeaveHandler, false)
      //   this.offMouseHandlers.push(() => {
      //     el.addEventListener('mouseleave', mouseLeaveHandler, false)
      //   })
      // })
    },
    changeData() {
      // new Vue({
      //   el: `#guide-name-tooltip${this.tooltipId}`,
      //   components: {
      //     StHelpTooltip
      //   },
      //   render: h => <st-help-tooltip id={this.tooltipId} />
      // })
    }
  },
  beforeDestroy() {
    // if (this.chart) {
    //   this.offMouseHandlers.forEach(fn => fn())
    // }
  }
}
</script>
