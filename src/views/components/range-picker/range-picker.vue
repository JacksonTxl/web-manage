<template>
  <div class="st-range-datepicker">
    <a-date-picker
      :disabled="model.startTime.disabled"
      :disabledDate="disabledStartDate"
      :showTime="model.startTime.showTime"
      :placeholder="model.startTime.placeholder"
      :format="model.startTime.format"
      v-model="model.startTime.value"
      @change="model.startTime.change"
      @openChange="handleStartOpenChange"
    />
    &nbsp;~&nbsp;
    <a-date-picker
      :disabled="model.endTime.disabled"
      :disabledDate="disabledEndDate"
      :showTime="model.endTime.showTime"
      :placeholder="model.endTime.placeholder"
      :format="model.endTime.format"
      v-model="model.endTime.value"
      @change="model.endTime.change"
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
    return {}
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
            change: $event => {}
          },
          endTime: {
            showTime: false,
            placeholder: '结束日期',
            disabled: false,
            value: null,
            format: 'YYYY-MM-DD',
            change: $event => {}
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
      endOpen: false,
      model: {}
    }
  },
  created() {
    this.model = this.value
    const oriStartChange = this.model.startTime.change.bind(null)
    const oriEndChange = this.model.endTime.change.bind(null)

    this.model.startTime.change = $event => {
      this.$emit('change', [$event, this.model.endTime.value])
      oriStartChange($event)
    }
    this.model.endTime.change = $event => {
      this.$emit('change', [this.model.startTime.value, $event])
      oriEndChange($event)
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    moment,
    disabledStartDate(startValue) {
      const endValue = this.value.endTime.value
      if (this.value.startTime.disabledBegin) {
        return (
          startValue.valueOf() <
          moment(this.value.startTime.disabledBegin).valueOf()
        )
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
        return (
          moment(startValue)
            .add(+this.disabledDays, 'days')
            .valueOf() < endValue.valueOf() ||
          moment(startValue).valueOf() > endValue.valueOf()
        )
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
