<template>
  <div class="st-shop-hour-picker" :class="{isInfo: isInfo}">
    <st-checkbox-button-group v-model="weekArr" v-if="!isInfo" :class="ShopHourPicker('check')">
      <template v-for="(item, index) in defaultWeekList">
        <st-checkbox-button-item
          :key="index"
          :value="item.value"
        >{{item.label}}</st-checkbox-button-item>
      </template>
    </st-checkbox-button-group>
    <div class="st-shop-hour-picker__content">
      <div class="st-shop-hour-picker__title">
        <div class="label">时间段</div>
        <div class="timeBox" :class="{isInfo: isInfo, isNotInfo: !isInfo}">
          <div class="time" v-for="(time, index) in currentTime" :key="index">{{time}}</div>
        </div>
        <div class="operate" v-if="!isInfo">操作</div>
      </div>
      <div :class="ShopHourPicker('box')" v-for="(item,index) in slider" :key="index">
        <div :class="ShopHourPicker('slider')" v-if="sliderCanShow(index)">
          <div class="label">
            <span>{{item.title | filterWeekDay}}</span>
          </div>
          <div class="sliderBox">
            <st-date-slider
              :min="0"
              :max="24"
              :step="0.5"
              :disable="isInfo"
              :tipFormatter="formatter"
              v-model="item.value"
            ></st-date-slider>
          </div>
          <div class="operation" v-if="!isInfo">
            <a-popover placement="bottomRight" trigger="click" class="slider-copy-bottom">
              <template slot="content">
                <a-checkbox-group
                  @change="onChange"
                  class="slider-copy"
                  v-for="(disabled,index) in item.week"
                  :key="index"
                >
                  <a-checkbox :value="index" :disabled="!disabled">{{index | filterWeekDay}}</a-checkbox>
                </a-checkbox-group>
              </template>
              <span @click="copyTo(item, index)">复制到</span>
            </a-popover>
          </div>
        </div>
        <!-- <a-row type="flex" align="middle" v-if="sliderCanShow(index)" :class="ShopHourPicker('slider')">
          <a-col :span="2" class="label">
            <span>{{item.title | filterWeekDay}}</span>
          </a-col>
          <a-col :span="18">
            <st-date-slider
              :min="0"
              :max="24"
              :step="0.5"
              :disable="isInfo"
              :tipFormatter="formatter"
              v-model="item.value"
            ></st-date-slider>
          </a-col>
          <a-col :span="4" class="operation">
            <a-popover placement="bottomRight" trigger="click" class="slider-copy-bottom">
              <template slot="content">
                <a-checkbox-group
                  @change="onChange"
                  class="slider-copy"
                  v-for="(disabled,index) in item.week"
                  :key="index"
                >
                  <a-checkbox :value="index" :disabled="!disabled">{{index | filterWeekDay}}</a-checkbox>
                </a-checkbox-group>
              </template>
              <span @click="copyTo(item, index)">复制到</span>
            </a-popover>
          </a-col>
        </a-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import { SLIDER, WEEK_NO_SELF, WEEK, TIMER } from './shop-hour-picker.config'
import { constant, cloneDeep, difference } from 'lodash-es'
export default {
  name: 'StShopHourPicker',
  bem: {
    ShopHourPicker: 'st-shop-hour-picker'
  },
  model: {
    prop: 'value',
    event: 'ShopHourPickerChange'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    isInfo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultWeekList: WEEK,
      slider: SLIDER,
      copeSlider: {}, // 复制到功能需要,为中间值
      oldSlider: {},
      weekArr: [],
      timeArr: TIMER
    }
  },
  computed: {
    currentTime() {
      return this.timeArr[this.isInfo ? 'info' : 'edit']
    },
    colFloor() {
      return this.isInfo ? 2 : 3
    }
  },
  watch: {
    slider: {
      handler() {
        console.log('slider watch', this.slider)
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
      if ((n.length === o.length) || !o) return
      n.length > o.length ? this.editSliderData(n, o) : this.removeSliderData(n, o)
    }
  },
  filters: {
    filterWeekDay(value) {
      return WEEK[value] && WEEK[value]['label']
    }
  },
  mounted() {
    this.getWeekArr()
  },
  methods: {
    // slider是否展示
    sliderCanShow(index) {
      return this.weekArr.indexOf(index) !== -1
    },
    // 时间过滤器
    timeFilter(time) {
      console.log('timeFilter', time)
      return /^\d+$/.test(time) && time > 9
        ? time + ':00'
        : /^\d+$/.test(time) && time <= 9
          ? '0' + time + ':00'
          : !/^\d+$/.test(time) && time <= 9
            ? '0' + (time + '').replace(/.5/gi, ':30')
            : (time + '').replace(/.5/gi, ':30') + ''
    },
    // tooltip格式处理
    formatter(value) {
      const valueHalf = value > 9 ? `${parseInt(value)}:30` : `0${parseInt(value)}:30`
      const valueInt = value > 9 ? `${value}:00` : `0${value}:00`
      return value % 1 === 0 ? valueInt : valueHalf
    },
    // 添加slider
    editSliderData(n, o) {
      const index = difference(n, o)
      this.slider[n[n.length - 1]].title = n[n.length - 1]
      this.slider[n[n.length - 1]].value = [10, 24]
    },
    // 删除slider
    removeSliderData(n, o) {
      const index = difference(o, n)
      this.slider[index].value = []
      delete this.slider[index].title
    },
    onChange(sliders) {
      Array.isArray(sliders) && sliders.forEach(key => {
        if (this.slider[key]) this.slider[key].value = this.copeSlider.value
      })
    },
    copyTo(item, index) {
      this.copeSlider = cloneDeep(item)
      const week = cloneDeep(WEEK_NO_SELF)
      // WEEK_NO_SELF中对应weekArr中的值设置为true,非对应的或
      this.weekArr.forEach(item => {
        week[item] = true
      })
      week[index] = false
      item.week = week
      console.log('copyTo', item)
    },
    // 获取日期选择数组
    getWeekArr() {
      console.log('getWeekArr')
      this.$nextTick().then(() => {
        this.weekArr = this.value.map(item => item.week_day)
        if (this.weekArr.length) this.getSliderInfoList()
      })
    },
    // 获取的数据对格式进行处理
    getSliderInfoList() {
      console.log('getSliderInfoList')
      this.value.map(item => {
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
