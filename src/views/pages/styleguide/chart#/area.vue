<template>
  <section class="sg-section">
    <h4>面积图</h4>
    <div class="mg-t24">
      <st-area-chart id="areaChartDemo" :data="chartData"/>
    </div>
    <button @click="reRender">重绘</button>
    <div class="mg-t24">
      <st-area-chart id="areaChartDemo2" :data="chartData2" :options="options2"/>
    </div>
  </section>
</template>
<script>
import StAreaChart from '@/views/components/chart#/area'
export default {
  components: {
    StAreaChart
  },
  data() {
    return {
      options2: {
        fieldNames: {
          x: 'whateverX',
          y: 'whateverY'
        },
        lineColor: '#dd675c',
        areaColor: '#f9ce53'
      },
      chartData: [
        {
          year: '2013',
          value: 30900
        },
        {
          year: '2014',
          value: 27409
        },
        {
          year: '2015',
          value: 38000
        },
        {
          year: '2016',
          value: 31056
        },
        {
          year: '2017',
          value: 31982
        },
        {
          year: '2018',
          value: 32040
        },
        {
          year: '2019',
          value: 33233
        }
      ],
      chartData2: [
        {
          whateverX: '2013',
          whateverY: 30900
        },
        {
          whateverX: '2014',
          whateverY: 27409
        },
        {
          whateverX: '2015',
          whateverY: 38000
        },
        {
          whateverX: '2016',
          whateverY: 31056
        },
        {
          whateverX: '2017',
          whateverY: 31982
        },
        {
          whateverX: '2018',
          whateverY: 32040
        },
        {
          whateverX: '2019',
          whateverY: 33233
        }
      ]
    }
  },
  methods: {
    reRender() {
      this.chartData = [
        {
          year: '2013',
          value: 30900
        },
        {
          year: '2014',
          value: 27409
        }
      ]
    }
  }
}
</script>
