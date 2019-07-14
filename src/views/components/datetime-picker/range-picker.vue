<template>
  <div class="st-range-datepicker">
    <a-date-picker
      :disabledDate="disabledStartDate"
      :showTime="value.startTime.showTime"
      :placeholder="value.startTime.placeholder"
      :format="value.startTime.format"
      v-model="value.startTime.value"
      @change="value.startTime.change"
      @openChange="handleStartOpenChange"
    />
    &nbsp;~&nbsp;
    <a-date-picker
      :disabledDate="disabledEndDate"
      :showTime="value.endTime.showTime"
      :placeholder="value.endTime.placeholder"
      :format="value.endTime.format"
      v-model="value.endTime.value"
      @change="value.endTime.change"
      :open="endOpen"
      @openChange="handleEndOpenChange"
    />
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'StRangePicker',
  serviceInject() {
    return {
    }
  },
  props: {
    disabledDays: {
      type: Number || String,
      default: 0
    },
    value: {
      type: Object,
      default: () => {
        const obj = {
          startTime: {
            showTime: false,
            disabledBegin: '2019-07-03',
            placeholder: '开始日期',
            disabled: false,
            value: null,
            format: 'YYYY-MM-DD',
            change: ($event) => {

            }
          },
          endTime: {
            showTime: false,
            placeholder: '结束日期',
            disabled: false,
            value: null,
            format: 'YYYY-MM-DD',
            change: ($event) => {

            }
          }
        }
        return obj
      }

    }
  },
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false
    }
  },
  mounted() {
  },
  computed: {

  },
  watch: {

  },
  methods: {
    moment,
    disabledStartDate(startValue) {
      const endValue = this.value.endTime.value
      if (this.value.startTime.disabledBegin) {
        return startValue.valueOf() < moment(this.value.startTime.disabledBegin).valueOf()
      }
      if (!startValue || !endValue) {
        return false
      }

      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.value.startTime.value
      if (!endValue || !startValue) {
        return false
      }
      if (+this.disabledDays > 0) {
        return moment(startValue).add(+this.disabledDays, 'days').valueOf() < endValue.valueOf() || moment(startValue).valueOf() > endValue.valueOf()
      }
      return moment(startValue).valueOf() < endValue.valueOf()
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
