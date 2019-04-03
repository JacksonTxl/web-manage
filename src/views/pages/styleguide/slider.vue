<template>
  <div>
    <slider :getSlider="getSlider" @change="onChange"></slider>
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
        className: 'st-slider-box',
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
          },
          {
            title: '周五',
            value: [9, 13]
          },
          {
            title: '周六',
            value: [5, 13],
            week: [
              {
                key: '周一',
                disabled: false
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
                disabled: false
              },
              {
                key: '周六',
                disabled: false
              },
              {
                key: '周日',
                disabled: false
              }
            ]
          },
          {
            title: '周日',
            value: [6, 24]
          }
        ]
      },
      weekData: []
    }
  },
  created() {
    this.weekData = [1, 2, 3, 4, 5, 6]
  },
  methods: {
    onChange(value) {
      console.log(value)
    }
  },
  watch: {
    weekData: {
      handler() {
        let filter = []
        this.weekData.forEach(item => {
          if (item === 0) {
            filter.push({
              title: '周一',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: true
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf(1) >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf(2) >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf(3) >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf(4) >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf(5) >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf(6) >= 0)
                }
              ]
            })
          }
          if (item === 1) {
            filter.push({
              title: '周二',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf(0) >= 0)
                },
                {
                  key: '周二',
                  disabled: true
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf(2) >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf(3) >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf(4) >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf(5) >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf(6) >= 0)
                }
              ]
            })
          }
          if (item === 2) {
            filter.push({
              title: '周三',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf(0) >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf(1) >= 0)
                },
                {
                  key: '周三',
                  disabled: true
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf(3) >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf(4) >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf(5) >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf(6) >= 0)
                }
              ]
            })
          }
          if (item === 3) {
            filter.push({
              title: '周四',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf(0) >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf(1) >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf(2) >= 0)
                },
                {
                  key: '周四',
                  disabled: true
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf(4) >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf(5) >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf(6) >= 0)
                }
              ]
            })
          }
          if (item === 4) {
            filter.push({
              title: '周五',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf(0) >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf(1) >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf(2) >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf(3) >= 0)
                },
                {
                  key: '周五',
                  disabled: true
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf(5) >= 0)
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf(6) >= 0)
                }
              ]
            })
          }
          if (item === 5) {
            filter.push({
              title: '周六',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf(0) >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf(1) >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf(2) >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf(3) >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf(4) >= 0)
                },
                {
                  key: '周六',
                  disabled: true
                },
                {
                  key: '周日',
                  disabled: !(this.weekData.indexOf(6) >= 0)
                }
              ]
            })
          }
          if (item === 6) {
            filter.push({
              title: '周日',
              value: [9, 18],
              week: [
                {
                  key: '周一',
                  disabled: !(this.weekData.indexOf(0) >= 0)
                },
                {
                  key: '周二',
                  disabled: !(this.weekData.indexOf(1) >= 0)
                },
                {
                  key: '周三',
                  disabled: !(this.weekData.indexOf(2) >= 0)
                },
                {
                  key: '周四',
                  disabled: !(this.weekData.indexOf(3) >= 0)
                },
                {
                  key: '周五',
                  disabled: !(this.weekData.indexOf(4) >= 0)
                },
                {
                  key: '周六',
                  disabled: !(this.weekData.indexOf(5) >= 0)
                },
                {
                  key: '周日',
                  disabled: true
                }
              ]
            })
          }
        })
        this.getSlider.infoList = filter
        this.getSlider = JSON.parse(JSON.stringify(this.getSlider))
      }
    }
  }
}
</script>
