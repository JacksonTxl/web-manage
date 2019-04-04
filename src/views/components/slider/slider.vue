<template>
  <div class="st-slider" :class="setSlider.disabled ?'' :  setSlider.className">
    <a-row class="st-slider__title-box" v-if="!setSlider.disabled">
      <a-col :span="2">时间段</a-col>
      <a-col :span="18">
        <ul class="st-slider__title-box-time">
          <li class="st-slider__title-box-time-comment">00:00</li>
          <li class="st-slider__title-box-time-06 st-slider__title-box-time-comment">06:00</li>
          <li class="st-slider__title-box-time-12 st-slider__title-box-time-comment">12:00</li>
          <li class="st-slider__title-box-time-18 st-slider__title-box-time-comment">18:00</li>
          <li class="st-slider__title-box-time-24 st-slider__title-box-time-comment">24:00</li>
        </ul>
      </a-col>
      <a-col :span="4" class="st-slider__title-box-operate">操作</a-col>
    </a-row>
    <div class="slider" v-for="(item,index) in setSlider.infoList" :key="index">
      <a-row>
        <a-col :span="2">
          <span class="slider__title">{{setSlider.infoList[index].title}}</span>
        </a-col>
        <a-col :span="18">
          <a-slider
            range
            :min="0"
            :max="24"
            :step="0.5"
            :tipFormatter="formatter"
            :tooltipVisible="true"
            :disabled="setSlider.disabled"
            v-model="setSlider.infoList[index].value"
          />
        </a-col>
        <a-col :span="4">
          <a-popover
            placement="bottomRight"
            trigger="click"
            class="slider-copy-bottom"
            v-if="item.week"
          >
            <template slot="content">
              <a-checkbox-group
                @change="onChange"
                class="slider-copy"
                v-for=" (weekInfo,index) in item.week"
                :key="index"
              >
                <a-checkbox :value="index" :disabled="weekInfo.disabled">{{weekInfo.key}}</a-checkbox>
              </a-checkbox-group>
            </template>
            <span @click="copyTo(index)">复制到</span>
          </a-popover>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StSlider',
  props: {
    getSlider: {
      type: Object
    }
  },
  data() {
    return {
      setSlider: [],
      checkedValues: [],
      copyToIndex: null
    }
  },
  mounted() {
    if (this.setSlider.length === 0) {
      this.setSlider = this.getSlider
      this.getFilterSlider()
    }
  },
  methods: {
    // 获取的数据对格式进行处理
    getFilterSlider() {
      if (this.getSlider.business_time) {
        let filterSlider = []
        this.getSlider.business_time.map(function(item) {
          filterSlider.push({
            title: item.title === 1 ? '周一' : item.week_day === 2 ? '周二' : item.week_day === 3 ? '周三' : item.week_day === 4 ? '周四' : item.week_day === 5 ? '周五' : item.week_day === 6 ? '周六' : '周日',
            value: [
              item.start_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0,
              item.end_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0
            ]
          })
        })
        this.getSlider.infoList = filterSlider
      }
    },
    // 复制到
    copyTo(index) {
      this.copyToIndex = index
      console.log(index)
    },
    filterWeek(name) {
      let self = this
      this.setSlider.infoList.map(function(item) {
        if (item.title === name) {
          item.value = self.setSlider.infoList[self.copyToIndex].value
          self.setSlider = JSON.parse(JSON.stringify(self.setSlider))
        }
      })
    },
    // 多选
    onChange(checkedValues) {
      let self = this
      if (checkedValues[0] === 0) {
        self.filterWeek('周一')
      }
      if (checkedValues[0] === 1) {
        self.filterWeek('周二')
      }
      if (checkedValues[0] === 2) {
        self.filterWeek('周三')
      }
      if (checkedValues[0] === 3) {
        self.filterWeek('周四')
      }
      if (checkedValues[0] === 4) {
        self.filterWeek('周五')
      }
      if (checkedValues[0] === 5) {
        self.filterWeek('周六')
      }
      if (checkedValues[0] === 6) {
        self.filterWeek('周日')
      }
    },
    // tooltip格式处理
    formatter(value) {
      if (value % 1 === 0) {
        if (value > 9) {
          return `${value}:00`
        } else {
          return `0${value}:00`
        }
      } else {
        if (value > 9) {
          return `${parseInt(value)}:30`
        } else {
          return `0${parseInt(value)}:30`
        }
      }
    },
    // 传出去的值的格式进行处理
    setFilterSlider() {
      let setSlider = JSON.parse(JSON.stringify(this.setSlider))
      let filterData = []
      setSlider.infoList.map(function(item) {
        filterData.push({
          'week_day': item.title === '周一' ? 1 : item.title === '周二' ? 2 : item.title === '周三' ? 3 : item.title === '周四' ? 4 : item.title === '周五' ? 5 : item.title === '周六' ? 6 : 7,
          start_time:
            /^\d+$/.test(item.value[0]) && item.value[0] > 9 ? item.value[0] + ':00' : /^\d+$/.test(item.value[0]) && item.value[0] <= 9 ? '0' + item.value[0] + ':00' : !/^\d+$/.test(item.value[0]) && item.value[0] <= 9 ? '0' + (item.value[0] + '').replace(/.5/gi, ':30') : (item.value[0] + '').replace(/.5/gi, ':30') + '',
          end_time:
            /^\d+$/.test(item.value[1]) && item.value[1] > 9 ? item.value[1] + ':00' : /^\d+$/.test(item.value[1]) && item.value[1] <= 9 ? '0' + item.value[1] + ':00' : !/^\d+$/.test(item.value[1]) && item.value[1] <= 9 ? '0' + (item.value[1] + '').replace(/.5/gi, ':30') : (item.value[1] + '').replace(/.5/gi, ':30') + ''
        })
      })
      setSlider.infoList = filterData
      return setSlider
    }
  },
  created() {},
  watch: {
    setSlider: {
      handler() {
        this.$emit('change', this.setFilterSlider())
      },
      deep: true
    },
    getSlider: {
      handler() {
        this.getFilterSlider()
        this.setSlider = this.getSlider
      }
    }
  }
}
</script>
