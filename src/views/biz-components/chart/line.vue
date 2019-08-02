<template>
  <div :id="id"></div>
</template>
<script>
import mixin from './mixin'
export default {
  name: 'StLineChart',
  mixins: [mixin],
  methods: {
    renderChart() {
      const chart = this.initChart('line')
      const { x, y } = this.opts.fieldNames
      chart.scale(y, {
        min: 0
      })
      chart.scale(x, {
        range: [0, 1]
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart.line().position([x, y])
      chart
        .point()
        .position([x, y])
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      chart.render()
    }
  }
}
</script>
