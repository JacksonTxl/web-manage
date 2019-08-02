<template>
  <li class="unit" @click="onClick">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'ScheduleUnit',
  props: {
    date: {
      type: Object,
      default: () => {
        return {}
      }
    },
    time: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cDate() {
      let tempTime = ''
      let weekOfday = moment(this.date.date).format('E')
      let tempDate = moment(this.date.date)
        .subtract(weekOfday - this.date.week, 'days')
        .format('YYYY-MM-DD')
      if (this.time < 9) {
        tempTime = `0${this.time}:00`
      } else {
        tempTime = `${this.time}:00`
      }
      return moment(`${tempDate} ${tempTime}`)
    }
  },
  methods: {
    onClick() {
      this.$emit('change', this.cDate)
    }
  }
}
</script>
