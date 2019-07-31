<template>
  <div :class="b()">
      <a-radio-group v-model="recent">
          <a-radio-button :value="7">近7天</a-radio-button>
          <a-radio-button :value="30">近30天</a-radio-button>
          <a-radio-button :value="90">近90天</a-radio-button>
      </a-radio-group>
      <a-range-picker
        :class="[b('range'),{'active':!recent}]"
        @change="recentChange"
        v-model="dateRange"
        v-bind="$attrs"
        :disabledDate="disabledDate"
      />
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'StRecentRadioGroup',
  bem: {
    b: 'st-recent-radio-goup'
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          day: undefined,
          start_date: undefined,
          end_date: undefined
        }
      }
    }
  },
  data() {
    return {
      recent: '7',
      dateRange: []
    }
  },
  watch: {
    recent(newValue) {
      if (newValue && newValue !== 0) {
        this.$emit('change', { recently_day: newValue })
        this.dateRange = []
      }
    }
  },
  mounted() {
    if (this.value.start_date && this.value.end_date) {
      this.recent = false
      this.dateRange = [moment(this.value.start_date), moment(this.value.end_date)]
    } else {
      this.dateRange = []
    }
    if (this.value.day) {
      this.recent = this.value.day
    } else {
      this.recent = 7
    }
  },
  methods: {
    moment,
    recentChange(date, dateString) {
      this.recent = false
      this.$emit('change', { start_date: dateString[0], end_date: dateString[1] })
    },
    disabledDate(current) {
      if (this.$attrs.disabledDate) {
        return this.$attrs.disabledDate(current)
      }
      return current && current > moment()
    }
  }
}
</script>
