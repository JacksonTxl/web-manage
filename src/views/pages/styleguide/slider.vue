<template>
  <div>
    <slider class="pages-test-store__slider" :getSlider="getSlider"></slider>
  </div>
</template>

<script>
import slider from '../../components/slider/slider.vue'
export default {
  components: {
    slider
  },
  data() {
    return {
      getSlider: {
        disabled: false,
        infoList: [
          {
            title: '周一',
            value: [0.5, 13],
            week: [
              {
                key: '周一',
                disabled: true
              },
              {
                key: '周二',
                disabled: false
              },
              {
                key: '周三',
                disabled: false
              },
              {
                key: '周四',
                disabled: false
              },
              {
                key: '周五',
                disabled: true
              },
              {
                key: '周六',
                disabled: true
              },
              {
                key: '周日',
                disabled: true
              }
            ]
          },
          {
            title: '周二',
            value: [6, 13],
            week: [
              {
                key: '周一',
                disabled: true
              },
              {
                key: '周二',
                disabled: false
              },
              {
                key: '周三',
                disabled: false
              },
              {
                key: '周四',
                disabled: false
              },
              {
                key: '周五',
                disabled: true
              },
              {
                key: '周六',
                disabled: true
              },
              {
                key: '周日',
                disabled: true
              }
            ]
          },
          {
            title: '周三',
            value: [12, 13.5]
          },
          {
            title: '周四',
            value: [18, 24]
          }
          // {
          //   title: '周五',
          //   value: [9, 13]
          // },
          // {
          //   title: '周六',
          //   value: [5, 13]
          //   // week: [
          //   //   {
          //   //     key: '周一',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周二',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周三',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周四',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周五',
          //   //     disabled: false
          //   //   },
          //   //   {
          //   //     key: '周六',
          //   //     disabled: true
          //   //   },
          //   //   {
          //   //     key: '周日',
          //   //     disabled: true
          //   //   }
          //   // ]
          // },
          // {
          //   title: '周日',
          //   value: [6, 24]
          // }
        ]
      }

    }
  },
  created() {

  }

}
</script>
