<template>
  <div :class="basic()">
    <a-select defaultValue="1" @change="handleChange">
      <a-select-option value="1">日</a-select-option>
      <a-select-option value="2">周</a-select-option>
      <a-select-option value="3">月</a-select-option>
    </a-select>
    <a-date-picker
      v-if="selectValue === '1'"
      :disabledDate="disabledDate"
      @change="onChange"
      :defaultValue="moment(defaultValue)"
    />
    <a-week-picker
      v-else-if="selectValue === '2'"
      :disabledDate="disabledWeek"
      :defaultValue="moment(defaultValue)"
      @change="onChange"
    />
    <a-month-picker
      :defaultValue="moment(defaultValue)"
      v-else
      @change="onChange"
      :disabledDate="disabledMonth"
    />
  </div>
</template>
<script>
import moment from 'moment'
export default {
  bem: {
    basic: 'shop-store-data-picker'
  },
  methods: {
    disabledDate(current) {
      let start = this.defaultValue.split('-')
      start[1] =
        start[1] - 4 > 0 ? start[1] - 4 : (start[0] - 1, start[1] + 12 - 4)
      start.join('-')
      return (
        (current && current > moment(this.defaultValue)) ||
        current < moment(start)
      )
    },
    disabledWeek(current) {
      let start = this.defaultValue.split('-')
      start[1] =
        start[1] - 7 > 0 ? start[1] - 7 : (start[0] - 1, start[1] + 12 - 7)
      start.join('-')
      return (
        (current && current > moment(this.defaultValue)) ||
        current < moment(start)
      )
    },
    disabledMonth(current) {
      let start = this.defaultValue.split('-')
      start[0] = start[0] - 1
      start.join('-')
      return (
        (current && current > moment(this.defaultValue)) ||
        current < moment(start.join('-'))
      )
    },
    onChange(date, dateString) {
      if (this.selectValue === '2') {
        dateString = dateString.slice(0, dateString.length - 1)
      }
      this.$emit('timesFn', {
        date: dateString,
        date_type: this.selectValue - 0
      })
    },
    handleChange(e) {
      this.selectValue = e
    }
  },
  data() {
    return {
      moment,
      selectValue: '1',
      defaultValue:
        moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD') + ''
    }
  }
}
</script>
