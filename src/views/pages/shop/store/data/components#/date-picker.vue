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
      @change="onChange"
    />
    <a-month-picker v-else @change="onChange" :disabledDate="disabledMonth" />
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
      return (
        (current && current > moment(this.defaultValue)) ||
        current < moment(moment().subtract(3, 'months'))
      )
    },
    disabledWeek(current) {
      return (
        (current && current >= moment(new Date() - 3600 * 24 * 1000)) ||
        current < moment(moment().subtract(6, 'months'))
      )
    },
    disabledMonth(current) {
      return (
        (current && current > moment().add(0, 'month')) ||
        current < moment(moment().subtract(12, 'months'))
      )
    },
    onChange(date, dateString) {
      if (dateString) {
        if (this.selectValue === '2') {
          dateString = dateString.slice(0, dateString.length - 1)
        }
        let propData = {
          date: dateString,
          date_type: this.selectValue - 0
        }
        this.$emit('timesFn', propData)
      }
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
