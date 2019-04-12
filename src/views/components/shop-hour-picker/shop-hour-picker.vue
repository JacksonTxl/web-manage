<template>
  <div>
    <st-checkbox-button-group v-model="weekArr">
      <st-checkbox-button-item
        v-for="(item, index) in defaultWeekList"
        :key="index"
        :value="index"
      >{{item}}</st-checkbox-button-item>
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
      <a-row :gutter="8" v-for="(item,index) in slider" v-show="isShowDay(index)" :key="index" class="slider">
        <a-col :span="2">
          <span class="slider__title">{{item.title | filterWeekDay}}</span>
        </a-col>
        <a-col :span="18">
          <a-slider
            range
            :min="0"
            :max="24"
            :step="0.5"
            :tipFormatter="formatter"
            :tooltipVisible="isShowDay(index)"
            v-model="item.value"
          />
        </a-col>
        <a-col :span="4">
          <a-popover placement="bottomRight" trigger="click" class="slider-copy-bottom">
            <template slot="content">
              <a-checkbox-group
                @change="onChange"
                class="slider-copy"
                v-for=" (disabled,index) in item.week"
                :key="index"
              >
                <a-checkbox :value="index" :disabled="!disabled">{{index | filterWeekDay}}</a-checkbox>
              </a-checkbox-group>
            </template>
            <span @click="copyTo(item, index)">复制到</span>
          </a-popover>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { SLIDER, IS_COPE_WEEK, WEEK } from './shop-hour-picker.config'
import { constant, cloneDeep, difference } from 'lodash-es'
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
      defaultWeekList: WEEK,
      slider: cloneDeep(SLIDER),
      copeItem: {},
      weekArr: []
    }
  },
  watch: {
    slider: {
      handler() {
        console.log('emit')
        console.log(this.slider.filter(item => item.value.length))
        let value = this.slider.filter(item => item.value.length)
        value = value.map(item => {
          return {
            week_day: item.week_day,
            start_time: this.timeFilter(item.value[0]),
            end_time: this.timeFilter(item.value[1])
          }
        })
        this.$emit('ShopHourPickerChange', value)
      },
      deep: true
    },
    weekArr(n, o) {
      if (!o.length) return
      n.length > o.length ? this.addSlide(n, o) : this.deleteSlide(n, o)
    }
  },
  filters: {
    filterWeekDay(value) {
      return WEEK[value]
    }
  },
  mounted() {
    console.log('this.value', this.value)
    this.getWeekArr()
  },
  methods: {
    isShowDay(index) {
      return this.weekArr.indexOf(index) !== -1
    },
    timeFilter(time) {
      return /^\d+$/.test(time) && time > 9
        ? time + ':00'
        : /^\d+$/.test(time) && time <= 9
          ? '0' + time + ':00'
          : !/^\d+$/.test(time) && time <= 9
            ? '0' + (time + '').replace(/.5/gi, ':30')
            : (time + '').replace(/.5/gi, ':30') + ''
    },
    addSlide(n, o) {
      const index = difference(n, o)
      this.slider[n[n.length - 1]].title = n[n.length - 1]
      this.slider[n[n.length - 1]].value = [10, 24]
    },
    deleteSlide(n, o) {
      const index = difference(o, n)
      this.slider[index].value = []
      delete this.slider[index].title
    },
    onChange(index) {
      this.slider[index].value = this.copeItem.value
    },
    copyTo(item, index) {
      this.copeItem = cloneDeep(item)
      item.week = this.isCopeWeek()
      item.week[index] = false
    },
    // tooltip格式处理
    formatter(value) {
      const valueHalf = value > 9 ? `${parseInt(value)}:30` : `0${parseInt(value)}:30`
      const valueInt = value > 9 ? `${value}:00` : `0${value}:00`
      return value % 1 === 0 ? valueInt : valueHalf
    },
    getWeekArr() {
      this.$nextTick().then(() => {
        this.weekArr = this.value.map(item => item.week_day)
        this.getSliderInfoList()
      })
    },
    isCopeWeek() {
      const week = cloneDeep(IS_COPE_WEEK)
      this.weekArr.forEach(item => {
        week[item] = true
      })
      return week
    },
    // 获取的数据对格式进行处理
    getSliderInfoList() {
      this.value.map((item) => {
        const sliderByweekDay = this.slider[item.week_day]
        sliderByweekDay.value = [
          item.start_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0,
          item.end_time.replace(/:00/gi, '').replace(/:30/gi, '.5') - 0
        ]
        sliderByweekDay.title = item.week_day
      })
    }
  }
}
</script>
