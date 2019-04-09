<template>
  <div class="pages-test-store container-basis">
    <slider class="pages-test-store__slider" :getSlider="getSlider"></slider>
  </div>
</template>

<script>
import slider from '../../components/slider/slider.1.vue'
export default {
  components: {
    slider
  },
  data() {
    return {
      getSlider: {
        business_time: [
          {
            week_day: 1,
            start_time: '00:00',
            end_time: '24:00'
          },
          {
            week_day: 2,
            start_time: '10:00',
            end_time: '24:00'
          },
          {
            week_day: 5,
            start_time: '22:00',
            end_time: '24:00'
          }
        ]
      }
    }
  },
  created() {
    // this.tooltip()
  },
  methods: {
    formatter(value) {
      return `${value}:00`
    },
    tooltip() {
      let self = this
      this.$nextTick(function() {
        setTimeout(() => {
          let tooltipEle = document.getElementsByClassName(
            'ant-tooltip-placement-top'
          )
          for (let i = 0; i <= tooltipEle.length; i++) {
            if (tooltipEle[i]) {
              tooltipEle[i].classList.add('st-slider')
            }
          }
        })
      })
    }
  }
}
</script>
