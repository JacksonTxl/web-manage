<template>
  <div>
    <st-checkbox-button-group v-model="weekArr" @change="buttonchange">
      <st-checkbox-button-item
        v-for="item in weekList"
        :key="item.value"
        :value="item.value"
      >{{item.label}}</st-checkbox-button-item>
    </st-checkbox-button-group>
    <div class="shop-hour-picker shop-hour-picker-box">
      <a-row class="shop-hour-picker__title-box">
        <a-col :span="2">时间段</a-col>
        <a-col :span="18">
          <ul class="shop-hour-picker__title-box-time">
            <li class="shop-hour-picker__title-box-time-comment">00:00</li>
            <li
              class="shop-hour-picker__title-box-time-06 shop-hour-picker__title-box-time-comment"
            >06:00</li>
            <li
              class="shop-hour-picker__title-box-time-12 shop-hour-picker__title-box-time-comment"
            >12:00</li>
            <li
              class="shop-hour-picker__title-box-time-18 shop-hour-picker__title-box-time-comment"
            >18:00</li>
            <li
              class="shop-hour-picker__title-box-time-24 shop-hour-picker__title-box-time-comment"
            >24:00</li>
          </ul>
        </a-col>
        <a-col :span="4" class="shop-hour-picker__title-box-operate">操作</a-col>
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
              :defaultValue="setSlider.infoList[index].value"
              :tipFormatter="formatter"
              :tooltipVisible="true"
              @change="sliderFunc"
              @afterChange="onAfterChange(item,index)"
              v-model="setSlider.infoList[index].value"
            />
          </a-col>
          <a-col :span="4">
            <a-popover placement="bottomRight" trigger="click" class="slider-copy-bottom">
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
  </div>
</template>
<script>
import { constant } from 'lodash-es'
export default {
  name: 'StShopHourPicker',
  model: {
    prop: 'value',
    event: 'shopHourPicker'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 星期选择
      weekArr: [],
      // 保留
      weekArrRetain: [],
      weekList: [
        { value: 1, label: '周一' },
        { value: 2, label: '周二' },
        { value: 3, label: '周三' },
        { value: 4, label: '周四' },
        { value: 5, label: '周五' },
        { value: 6, label: '周六' },
        { value: 7, label: '周日' }
      ],
      setSlider: [],
      // 获取的滑动的slider数值
      getSliderArr: [],
      // 默认
      defaultWeekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      getWeek: [],
      // 获取点击的是哪一个slider
      copyIndex: 0
    }
  },
  mounted() {
    // 初始话数据
    console.log(this.value, '初始话数据')
    this.setSlider = this.getFilterSlider({ business_time: this.value })
  },
  methods: {
    buttonchange() {
      let self = this
      let weekArr = JSON.parse(JSON.stringify(this.weekArr))
      weekArr.sort()
      if (weekArr.length > self.weekArrRetain.length) {
        if (self.getArrDifference(weekArr, self.weekArrRetain).length > 0) {
          self.setSlider.business_time.push({
            week_day: self.getArrDifference(weekArr, self.weekArrRetain)[0],
            start_time: '09:00',
            end_time: '18:00'
          })
        }
      } else {
        if (self.getArrDifference(weekArr, self.weekArrRetain).length > 0) {
          self.setSlider.business_time.forEach((item, index) => {
            if (
              self.getArrDifference(weekArr, self.weekArrRetain)[0] ===
              item.week_day
            ) {
              self.setSlider.business_time.splice(index, 1)
            }
          })
        }
      }
      self.weekArrRetain = weekArr
      self.setSlider.business_time.sort((a, b) => {
        return a.week_day - b.week_day
      })

      self.setSlider = self.getFilterSlider1(self.setSlider)
    },
    copyTo(copyIndex) {
      this.copyIndex = copyIndex
    },
    onChange(data) {
      let self = this
      let toCopy = self.defaultWeekList[data]
      self.setSlider.infoList.forEach(item => {
        if (item.title === toCopy) {
          item.value = self.setSlider.infoList[self.copyIndex].value
          self.setSlider = JSON.parse(JSON.stringify(self.setSlider))
        }
      })
    },
    // 数据改变后改变data数据
    onAfterChange(data, index) {
      let self = this
      if (this.getSliderArr.length > 0) {
        data.value = this.getSliderArr
        this.setSlider.infoList[index] = data
        this.getSliderArr = []
        self.setSlider.business_time = this.setFilterSlider().infoList
      }
    },
    // 获取改变后的slider数据
    sliderFunc(data) {
      this.getSliderArr = data
      this.$emit('shopHourPicker', this.setFilterSlider().infoList)
    },
    // 获取的数据对格式进行处理
    getFilterSlider(getSliderData) {
      let self = this
      let weekArr = []
      let getSlider = JSON.parse(JSON.stringify(getSliderData))
      if (getSlider.business_time) {
        let filterSlider = []
        getSlider.business_time.map(function(item) {
          let week_day =
            item.week_day === 1
              ? '周一'
              : item.week_day === 2
                ? '周二'
                : item.week_day === 3
                  ? '周三'
                  : item.week_day === 4
                    ? '周四'
                    : item.week_day === 5
                      ? '周五'
                      : item.week_day === 6
                        ? '周六'
                        : '周日'
          weekArr.push(item.week_day)
          filterSlider.push({
            title: week_day,
            value: [
              item.start_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0,
              item.end_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0
            ],
            week: []
          })
          // console.log(item.week_day)
          self.getWeek.push(week_day)
        })
        self.weekArr = weekArr
        self.weekArrRetain = JSON.parse(JSON.stringify(weekArr))
        getSlider.infoList = filterSlider
        return self.copyWeek(getSlider)
      }
    },
    getFilterSlider1(getSliderData) {
      let self = this
      let getSlider = JSON.parse(JSON.stringify(getSliderData))
      if (getSlider.business_time) {
        let filterSlider = []
        getSlider.business_time.map(function(item) {
          let week_day =
            item.week_day === 1
              ? '周一'
              : item.week_day === 2
                ? '周二'
                : item.week_day === 3
                  ? '周三'
                  : item.week_day === 4
                    ? '周四'
                    : item.week_day === 5
                      ? '周五'
                      : item.week_day === 6
                        ? '周六'
                        : '周日'
          filterSlider.push({
            title: week_day,
            value: [
              item.start_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0,
              item.end_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0
            ],
            week: []
          })
          // console.log(item.week_day)
          self.getWeek.push(week_day)
        })
        getSlider.infoList = filterSlider
        setTimeout(() => {
          self.$emit('shopHourPicker', self.setFilterSlider().infoList)
        })

        return self.copyWeek(getSlider)
      }
    },
    // 对复制日期进行处理
    copyWeek(getSlider) {
      let self = this
      let addcopyWeek = JSON.parse(JSON.stringify(getSlider))
      addcopyWeek.infoList.forEach((item, index) => {
        let w = []
        for (let i = 0; i < 7; i++) {
          w.push({
            key: self.defaultWeekList[i],
            disabled: !(
              self.getWeek.indexOf(self.defaultWeekList[i]) >= 0 &&
              item.title !== self.defaultWeekList[i]
            )
          })
        }
        item.week = w
      })
      return addcopyWeek
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
    // 还原格式
    setFilterSlider() {
      let self = this
      let setSlider = JSON.parse(JSON.stringify(this.setSlider))
      let filterData = []
      setSlider.infoList.map(function(item) {
        filterData.push(self.filterSlider(item))
      })
      setSlider.infoList = filterData
      return setSlider
    },
    filterSlider(item) {
      let self = this
      return {
        week_day:
          item.title === '周一'
            ? 1
            : item.title === '周二'
              ? 2
              : item.title === '周三'
                ? 3
                : item.title === '周四'
                  ? 4
                  : item.title === '周五'
                    ? 5
                    : item.title === '周六'
                      ? 6
                      : 7,
        start_time: self.timeFilter(item, 0),
        end_time: self.timeFilter(item, 1)
      }
    },
    // 时间处理函数
    timeFilter(item, index) {
      return /^\d+$/.test(item.value[index]) && item.value[index] > 9
        ? item.value[index] + ':00'
        : /^\d+$/.test(item.value[index]) && item.value[index] <= 9
          ? '0' + item.value[index] + ':00'
          : !/^\d+$/.test(item.value[index]) && item.value[index] <= 9
            ? '0' + (item.value[index] + '').replace(/.5/gi, ':30')
            : (item.value[index] + '').replace(/.5/gi, ':30') + ''
    },
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    }
  },
  created() {},
  watch: {
    value() {
      this.setSlider = this.getFilterSlider({ business_time: this.value })
    }
    // weekArr: {
    //   handler() {

    //   }
    // }
  }
}
</script>
