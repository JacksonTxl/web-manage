<template>
  <div class="shop-store-data-ring"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { View } from 'st-data-set'
import chartMixin from './mixin'
import { decimalFilter } from './filters'

export default {
  name: 'BrandStatCourseRing',
  mixins: [chartMixin],
  data() {
    return {
      intervalStack: {},
      resize: -99
    }
  },
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
    padding: {
      type: Array,
      default: () => [50, 80, 30, 'auto']
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
      default: () => {
        return {
          height: 198,
          totalName: '',
          color: ['#4679F9', '#894BFF'],
          totalCount: 0,
          unit: ''
        }
      }
    }
  },
  computed: {
    dataSource() {
      //传入的总计为0时，多一个环形图为0的灰色环形图
      if (this.total === 0) {
        return [...this.data, { name: 'empty', value: 1 }]
      }
      return this.data
    }
  },
  methods: {
    initDv() {
      this.dv = new View()
      this.dv.source(this.dataSource)
      this.dv.transform({
        type: 'map',
        callback(row) {
          row.value = +row.value
          return row
        }
      })
    },
    initChart() {
      // chart初始化实例
      this.getChartInstance()
      // 加载数据
      this.chart.source(this.dv, {
        value: {
          formatter: v => v + this.unit
        }
      })
      // 设置坐标系
      this.setCoord()
      // 设置提示信息
      this.setTooltip()
      // 设置图例
      this.setLegend()
      // 设置复制元素
      this.setGuideHtml()
      // 设置渲染环形图
      this.getintervalStack()
    },
    getintervalStack() {
      // 环形图初始化
      this.intervalStack = this.chart
        .intervalStack()
        .style({
          fillOpacity: 1,
          cursor: 'pointer'
        })
        .tooltip('name*value', function(item, percent, a) {
          return {
            name: item,
            value: percent
          }
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
      // 自定义监听环形图事件
      this.chartEvent()
    },
    getChartInstance() {
      this.chart = new Chart({
        container: this.$el,
        forceFit: true,
        padding: this.padding,
        height: this.height
      })
    },
    setTooltip() {
      this.chart.tooltip({
        showTitle: false,
        itemTpl: `<li class="tooltip-item-{name}">
                    <span style="background-color:{color};" class="g2-tooltip-marker"></span>
                    {name}
                    <span class="st-g2-tooltip-value">| {value}</span>
                  </li>`
      })
    },
    setCoord() {
      this.chart.coord('theta', {
        innerRadius: 0.65
      })
    },
    setLegend() {
      this.chart.legend({
        position: 'right-center',
        useHtml: true,
        itemTpl: (name, color, checked, index) => {
          const row = this.dv.findRow({ name })
          const value = row.value
          return `<li class="g2-legend-list-item item-{originValue} item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">
                    <i class="g2-legend-marker" style="background-color:{color};"></i>
                    <span class="g2-legend-text">${name}</span>
                    <div class='legend-right mg-l12'>
                      <span class='legend-percent'>${this.thousandBit(value)}${
            this.unit
          }</span>
                    </div>
                  </li>`
        },
        onHover: ev => {
          // 总计为 0 是执行hover
          // if (this.total === 0) return
          const $s = this.$el.querySelector.bind(this.$el)
          const name = ev.item.value
          const row = this.dv.findRow({ name })
          const shapes = ev.shapes
          const geom = ev.geom
          const legend = ev.currentTarget
          // 选中对应单元
          this.total !== 0 && geom.setShapesActived(shapes)
          legend.addEventListener('mouseleave', () => {
            this.resetTotal()
          })
          $s('.guide-value').textContent = this.thousandBit(row.value)
          $s('.guide-name-text').textContent = row.name
        }
      })
    },
    setGuideHtml() {
      // 总计的自定义DOM
      this.chart.guide().html({
        position: ['50%', '50%'],
        html: () => {
          this.resize = Math.random()
          return `<div class='guide'>
                    <div class='guide-title'>
                      <span class='guide-value'>${this.thousandBit(
                        this.total
                      )}</span>
                      <span class='guide-unit'>${this.unit}</span>
                    </div>
                    <div class='guide-name'>
                      <span class="guide-name-text">${this.name}</span>
                    </div>
                  </div>`
        }
      })
    },
    resetTotal() {
      const $s = this.$el.querySelector.bind(this.$el)
      $s('.guide-value').textContent = this.thousandBit(this.total)
      $s('.guide-name-text').textContent = this.name
    },
    setUnit(e) {
      const $s = this.$el.querySelector.bind(this.$el)
      // 当环形图总计都是零的时候隐藏tooltip
      if (e.data._origin.name === 'empty') {
        $s('.g2-tooltip').setAttribute('style', 'display: none')
        return
      }
      const origin = e.data._origin
      const shapes = e.shapes
      const geom = e.geom

      $s('.guide-value').textContent = this.thousandBit(origin.value)
      $s('.guide-name-text').textContent = origin.name
    },
    chartEvent() {
      // 鼠标进入环形显示相关的值
      this.chart.on('interval:mouseenter', ev => {
        const shape = ev.shape
        const origin = ev.data._origin
        if (origin.name === 'empty') {
          this.intervalStack.clearActivedShapes(shape)
        }
        this.setUnit(ev)
      })
      // 鼠标离开显示总值
      this.chart.on('interval:mouseleave', e => {
        this.resetTotal()
      })
    },
    thousandBit(value) {
      return (value + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
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
