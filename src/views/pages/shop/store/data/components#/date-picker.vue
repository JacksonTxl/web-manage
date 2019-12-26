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
      :disabledDate="disabledDate"
      :defaultValue="moment(defaultValue)"
      @change="onChange"
    />
    <a-month-picker
      :defaultValue="moment(defaultValue)"
      v-else
      @change="onChange"
      :disabledDate="disabledDate"
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
      return current && current > moment(this.defaultValue)
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
