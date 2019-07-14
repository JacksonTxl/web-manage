<template>
  <div :class="{'get-day': isGet}">
    <span>{{dateString}} </span>
    <a href="javascript:;" class="get-day__button" v-if="isGet" @click="onClickDaySchedule"> 查看日排期</a>
  </div>
</template>

<script>
export default {
  name: 'GetDay',
  props: {
    date: {
      type: String,
      default: ''
    },
    isGet: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dateString() {
      const d = moment(this.date).format('MM/DD').valueOf()
      const weekDay = moment(this.date).format('ddd').valueOf()
      return `${d}${weekDay}`
    }
  },
  methods: {
    onClickDaySchedule() {
      this.$emit('scan', this.date)
    }
  }
}
</script>
