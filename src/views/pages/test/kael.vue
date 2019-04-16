<template>
  <div>
    <a-date-picker
      :disabledDate="disabledStartDate"
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      v-model="startValue"
      placeholder="Start"
      @openChange="handleStartOpenChange"
    />
    <a-date-picker
      :disabledDate="disabledEndDate"
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="End"
      v-model="endValue"
      :open="endOpen"
      @openChange="handleEndOpenChange"
    />
  </div>
</template>
<script>
import { findLastKey } from 'lodash-es'
export default {
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false
    }
  },
  watch: {
    startValue(val) {
      console.log('startValue', val)
    },
    endValue(val) {
      console.log('endValue', val)
    }
  },
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      // 当天
      let flag = true
      // if (startValue.valueOf() < moment().valueOf()) {
      //   flag = true
      // }
      // 7*24
      console.log("startValue.add(7, 'd').valueOf()", startValue)
      console.log('endValue.valueOf()', endValue.valueOf())
      console.log('startValue.valueOf()', startValue.valueOf())
      if (startValue.valueOf() + 604800000 >= endValue.valueOf()) {
        flag = false
      }
      // return startValue.valueOf() < moment().valueOf() || startValue.valueOf() < endValue.valueOf()
      // return startValue.valueOf() > endValue.valueOf();
      return flag || startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      // 当天
      let flag = true
      // if (startValue.valueOf() < moment().valueOf()) {
      //   flag = true
      // }
      // 7*24
      console.log("startValue.add(7, 'd').valueOf()", startValue)
      console.log('endValue.valueOf()', endValue.valueOf())
      console.log('startValue.valueOf()', startValue.valueOf())
      if (startValue.valueOf() + 604800000 >= endValue.valueOf()) {
        flag = false
      }
      return flag || startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    }
  }
}
</script>
