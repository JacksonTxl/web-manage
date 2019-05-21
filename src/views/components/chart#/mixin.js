import G2 from '@antv/g2'
import { ChartConfig } from './config'
export default {
  serviceInject() {
    return {
      chartConfig: ChartConfig
    }
  },
  props: {
    /**
     * 图表id
     */
    id: {
      type: String,
      default: 'chart'
    },
    /**
     * 面积图类型
     */
    type: {
      type: String,
      default: 'basic'
    },
    /**
     * 图表数据
     */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    data(val) {
      this.chart.changeData(val)
    }
  },
  data() {
    return {
      opts: {}
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    initChart(type) {
      this.initOpts(type)
      G2.track(false) // 关闭打点监控
      const chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        ...this.opts
      })
      chart.source(this.data)
      this.chart = chart
      return chart
    },
    initOpts(type) {
      const { chartConfig } = this
      this.opts = Object.assign(
        /**
         * 找到对应 type 的默认配置，例如 chartConfig.defaultLineConfig
         */
        chartConfig[`default${type.replace(/^[a-z]/, i => i.toUpperCase())}Options`],
        this.options
      )
    }
  }
}
