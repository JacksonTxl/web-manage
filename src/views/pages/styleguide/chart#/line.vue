<template>
  <section class="sg-section">
    <h4>折线图</h4>
    <div class="mg-t24">
      <st-line-chart id="lineChartDemo" :data="chartData"/>
      <st-line-chart id="lineChartDemo2" :data="chartData2" :options="options2"/>
    </div>
    <button @click="reRender">重绘</button>
  </section>
</template>
<script>
import StLineChart from '@/views/biz-components/chart/line'
export default {
  components: {
    StLineChart
  },
  data() {
    return {
      options2: {
        fieldNames: {
          x: 'date',
          y: 'value'
        }
      },
      chartData: [{
        year: '05/19',
        value: 3
      }, {
        year: '05/20',
        value: 4
      }, {
        year: '05/21',
        value: 3.5
      }, {
        year: '05/22',
        value: 5
      }],
      chartData2: [{
        date: '05/19',
        value: 3
      }, {
        date: '05/20',
        value: 4
      }, {
        date: '05/21',
        value: 3.5
      }, {
        date: '05/22',
        value: 5
      }]
    }
  },
  methods: {
    reRender() {
      this.chartData = [
        {
          date: '06/01',
          value: 10
        },
        {
          date: '06/02',
          value: 12
        }
      ]
    }
  }
}
</script>
