<template>
    <div :class="b()">
        <a-radio-group v-model="recent">
            <a-radio-button value="7">近7天</a-radio-button>
            <a-radio-button value="30">近30天</a-radio-button>
            <a-radio-button value="90">近90天</a-radio-button>
        </a-radio-group>
        <a-range-picker :class="[b('range'),{'active':!recent}]" @change="recentChange"   v-bind="$attrs" :disabledDate="disabledDate"/>
    </div>
</template>
<script>
export default {
  name: 'RecentRadioGroup',
  bem: {
    b: 'shop-dashboard-recent-radio-goup'
  },
  data() {
    return {
      recent: '7'
    }
  },
  watch: {
    recent(newValue) {
      newValue && this.$emit('change', { recently_day: newValue })
    }
  },
  methods: {
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
