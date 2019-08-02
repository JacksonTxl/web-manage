<template>
  <div>
    <st-checkbox-button-group v-model="weekArr" @change="onChangeGetWeekDay">
      <st-checkbox-button-item
        v-for="item in weekList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </st-checkbox-button-item>
    </st-checkbox-button-group>
    <div class="shop-hour-picker shop-hour-picker-box">
      <a-row class="shop-hour-picker__title-box">
        <a-col :span="2">时间段</a-col>
        <a-col :span="18">
          <ul class="shop-hour-picker__title-box-time">
            <li class="shop-hour-picker__title-box-time-comment">00:00</li>
            <li
              class="shop-hour-picker__title-box-time-06 shop-hour-picker__title-box-time-comment"
            >
              06:00
            </li>
            <li
              class="shop-hour-picker__title-box-time-12 shop-hour-picker__title-box-time-comment"
            >
              12:00
            </li>
            <li
              class="shop-hour-picker__title-box-time-18 shop-hour-picker__title-box-time-comment"
            >
              18:00
            </li>
            <li
              class="shop-hour-picker__title-box-time-24 shop-hour-picker__title-box-time-comment"
            >
              24:00
            </li>
          </ul>
        </a-col>
        <a-col :span="4" class="shop-hour-picker__title-box-operate">
          操作
        </a-col>
      </a-row>
      <div
        class="slider"
        v-for="(item, index) in setSlider.infoList"
        :key="index"
      >
        <a-row>
          <a-col :span="2">
            <span class="slider__title">
              {{ (setSlider.infoList[index].title - 1) | filterWeekDay }}
            </span>
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
              @afterChange="onAfterChange(item, index)"
              v-model="setSlider.infoList[index].value"
            />
          </a-col>
          <a-col :span="4">
            <a-popover
              placement="bottomRight"
              trigger="click"
              class="slider-copy-bottom"
            >
              <template slot="content">
                <a-checkbox-group
                  @change="onChange"
                  class="slider-copy"
                  v-for="(weekInfo, index) in item.week"
                  :key="index"
                >
                  <a-checkbox :value="index" :disabled="!weekInfo">
                    {{ index }}
                  </a-checkbox>
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
import { constant, cloneDeep } from 'lodash-es'
export default {
  name: 'StShopHourPicker',
  model: {
    prop: 'value',
    event: 'ShopHourPickerChange'
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
      sd: '8',
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
      setSlider: { infoList: [] },
      // 获取的滑动的slider数值
      getSliderArr: [],
      // 默认
      defaultWeekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      getWeek: [],
      // 获取点击的是哪一个slider
      copyIndex: 0
    }
  },
  filters: {
    filterWeekDay(value) {
      const defaultWeekList = [
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
        '周日'
      ]
      return defaultWeekList[value]
    }
  },
  methods: {
    copyTo(copyIndex) {
      this.copyIndex = copyIndex
    },
    onChange(weekDay) {
      let self = this
      self.setSlider.infoList.forEach(item => {
        if (item.title === weekDay) {
          item.value = self.setSlider.infoList[self.copyIndex].value
          self.setSlider = cloneDeep(self.setSlider)
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
    },
    // 获取的数据对格式进行处理
    getSliderInfoList(getSliderData) {
      if (!getSliderData.business_time.length) return { infoList: [] }
      let self = this
      let weekArr = []
      let getSlider = cloneDeep(getSliderData)
      let filterSlider = []
      weekArr = getSlider.business_time.map(item => {
        console.log(item)
        filterSlider.push({
          title: item.week_day,
          value: [
            item.start_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0,
            item.end_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0
          ],
          week: []
        })
        return item.week_day
      })
      self.getWeek = [...self.getWeek, ...weekArr]
      self.weekArr = weekArr
      self.weekArrRetain = weekArr
      getSlider.infoList = filterSlider
      return self.copyWeek(getSlider)
    },
    onChangeGetWeekDay() {
      let self = this
      let weekArr = cloneDeep(this.weekArr)
      let weekArrRetain = cloneDeep(this.weekArrRetain)
      weekArr.sort()
      // 新增
      let week_day = self.getArrDifference(weekArr, weekArrRetain)
      if (weekArr.length > weekArrRetain.length) {
        if (week_day.length > 0) {
          self.setSlider.business_time.push({
            week_day: week_day[0],
            start_time: '09:00',
            end_time: '18:00'
          })
        }
      } else {
        if (week_day.length > 0) {
          self.setSlider.business_time.forEach((item, index) => {
            if (week_day[0] === item.week_day) {
              self.setSlider.business_time.splice(index, 1)
            }
          })
        }
      }
      self.weekArrRetain = weekArr
      self.setSlider.business_time.sort((a, b) => {
        return a.week_day - b.week_day
      })
      self.setSlider = self.getSliderInfoList(self.setSlider)
      let infoList = self.getSliderInfoList(self.setSlider).infoList
      this.$emit('ShopHourPickerChange', infoList)
    },
    // 对复制日期进行处理 获取可复制日期 自己不能复制
    copyWeek(getSlider) {
      let self = this
      let addcopyWeek = cloneDeep(getSlider)
      addcopyWeek.infoList.forEach((item, index) => {
        item.week.length = 7
        self.weekArr.forEach(weekIndex => {
          item.week[weekIndex] = true
        })
        item.week[item.title] = false
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
      if (!this.setSlider.infoList) return
      let self = this
      let setSlider = cloneDeep(this.setSlider)
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
        week_day: item.title,
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
  watch: {
    value() {
      this.setSlider = this.getSliderInfoList({ business_time: this.value })
    }
  }
}
</script>
