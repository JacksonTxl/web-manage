<template>
  <div class="stat-shop-course-line"></div>
</template>

<script>
import { toKFilter } from './filters'
import { View } from '@antv/data-set'
import { Chart } from '@antv/g2'
import chartMixin from './mixin'

export default {
  mixins: [chartMixin],
  props: {
    /**
     * 数据
     * @example
     * [{date:'05-28',私教预约人数:250,私教签到人数:250,团体课排课人数:20}]
     */
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 280
    },
    // 使用的字段key值数组
    fields: {
      type: Array,
      default: () => ['团体课可预约人数', '团体课签到人数', '团体课预约人数', '私教课签到人数', '私教课预约人数']
    },
    // 颜色数组
    colors: {
      type: Array,
      default: () => ['#5095FC', '#6831D7', '#06DB8C', '#872333', '#98db23']
    },
    shadowColors: {
      type: Array,
      default: () => [
        'rgba(80,149,252,.4)',
        'rgba(104,49,215,.4)',
        'rgba(6,219,140,.4)',
        'rgba(135,35,51,.4)',
        'rgba(152,219,35,.4)'
      ]
    }
  },
  computed: {
    colorMap() {
      return this.fields.reduce((res, field, idx) => {
        res[field] = this.colors[idx % this.colors.length]
        return res
      }, {})
    },
    shadowColorMap() {
      return this.fields.reduce((res, field, idx) => {
        res[field] = this.shadowColors[idx % this.shadowColors.length]
        return res
      }, {})
    }
  },
  methods: {
    initDv() {
      this.dv = new View()
      this.dv.source(this.data)
      this.dv.transform({
        type: 'fold',
        fields: this.fields,
        key: 'name',
        value: 'value'
      })
    },
    initChart() {
      this.chart = new Chart({
        container: this.$el,
        forceFit: true,
        height: this.height,
        padding: [80, 16, 32, 'auto'],
        renderer: 'svg'
      })

      this.chart.source(this.dv, {
        date: {
          tickCount: 10,
          range: [0, 1]
        },
        value: {
          tickCount: 5,
          formatter: toKFilter
        }
      })
      this.chart.axis('date', {
        label: {
          textStyle: {
            fill: '#9BACB9'
          }
        },
        tickLine: {
          lineWidth: 0,
          length: 0
        }
      })
      this.chart.axis('value', {
        label: {
          textStyle: {
            fill: '#9BACB9'
          }
        },
        grid: {
          lineStyle: {
            lineWidth: 0.5,
            lineDash: [0, 0]
          }
        }
      })
      this.chart.legend('name', {
        position: 'top-left',
        useHtml: true,
        offsetY: -16,
        offsetX: -22,
        textStyle: {
          fill: '#3E4D5C'
        },
        itemTpl: () => {
          return (
            '<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">' +
            `<span class="g2-legend-marker" style="background-color:{color};"></span>` +
            ` <span class="g2-legend-text">{value}</span>` +
            '</li>'
          )
        }
      })
      this.chart
        .line()
        .style('name', {
          shadowColor: name => this.shadowColorMap[name],
          shadowBlur: 20,
          shadowOffsetY: 4
        })
        .tooltip('name*value', (name, value) => {
          return {
            name,
            value: value || 0 + '人'
          }
        })
        .shape('smooth')
        .size(2)
        .position('date*value')
        .color('name', this.colors)

      this.chart.render()
    }
  }
}
</script>

<style lang="less">
.stat-shop-course-line {
  .g2-legend-list {
    text-align: left !important;
    padding: 0 48px !important;
  }
  .g2-legend-list {
    user-select: none;
  }
  .g2-legend-list-item.unChecked {
    .g2-legend-marker {
      background-color: transparent !important;
      border: 1px solid #e6e9ef;
      &:after {
        opacity: 0;
      }
    }
  }
  .g2-legend-list-item{
    width:120px;
  }
  .g2-legend-marker {
    box-sizing: border-box;
    border-radius: 2px !important;
    width: 12px !important;
    height: 12px !important;
    // display: none !important;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 7px;
      height: 5px;
      border: 1px solid white;
      border-right-color: transparent;
      border-top-color: transparent;
      left: 50%;
      top: 50%;
      margin-top: -1px;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  .legend-checkbox {
    margin-right: 8px;
    cursor: pointer;
  }
}
</style>
