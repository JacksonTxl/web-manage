<template>
  <section class="sg-section">
    <h3>
      g2（图表插件）
      <a href="https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html" targe="_blank">g2 文档</a>
    </h3>
    <div id="demoChart"></div>
  </section>
</template>
<script>
import G2 from '@antv/g2'
export default {
  name: 'ChartDemo',
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const data = [{
        year: '1991',
        value: 15468
      }, {
        year: '1992',
        value: 16100
      }, {
        year: '1993',
        value: 15900
      }, {
        year: '1994',
        value: 17409
      }, {
        year: '1995',
        value: 17000
      }, {
        year: '1996',
        value: 31056
      }, {
        year: '1997',
        value: 31982
      }, {
        year: '1998',
        value: 32040
      }, {
        year: '1999',
        value: 33233
      }]
      const chart = new G2.Chart({
        container: 'demoChart',
        forceFit: true,
        height: window.innerHeight
      })
      chart.source(data)
      chart.scale({
        value: {
          min: 10000
        },
        year: {
          range: [0, 1]
        }
      })
      chart.axis('value', {
        label: {
          formatter: function formatter(val) {
            return (val / 10000).toFixed(1) + 'k'
          }
        }
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart.area().position('year*value')
      chart.line().position('year*value').size(2)
      chart.render()
    }
  }
}
</script>
