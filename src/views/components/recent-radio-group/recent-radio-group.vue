<template>
  <div :class="b()">
    <a-radio-group v-model="recent">
      <a-radio-button v-for="item in days" :value="item" :key="item">
        近{{ item }}天
      </a-radio-button>
    </a-radio-group>
    <a-range-picker
      :class="[b('range'), { active: !recent }]"
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
    b: 'st-recent-radio-group'
  },
  props: {
    days: {
      type: Array,
      default: () => {
        return [7, 30, 90]
      }
    },
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
      recent: 7,
      dateRange: []
    }
  },
  watch: {
    recent(newValue) {
      if (newValue && newValue !== 0) {
        this.$emit('change', {
          recently_day: newValue,
          start_date: undefined,
          end_date: undefined
        })
        this.dateRange = []
      }
    }
  },
  mounted() {
    if (this.value.start_date && this.value.end_date) {
      this.recent = false
      this.dateRange = [
        moment(this.value.start_date),
        moment(this.value.end_date)
      ]
    } else {
      this.dateRange = []
    }
    if (this.value.day) {
      this.recent = this.value.day
    }
  },
  methods: {
    moment,
    recentChange(date, dateString) {
      this.recent = false
      this.$emit('change', {
        start_date: dateString[0],
        end_date: dateString[1],
        recently_day: undefined
      })
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
