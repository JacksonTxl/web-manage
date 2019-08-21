<template>
  <div @click="onClick" class="add-schedule-button">
    <div class="icon mg-b8">
      <st-icon type="add"></st-icon>
    </div>
    <slot>{{ title }}</slot>
  </div>
</template>

<script>
export default {
  name: 'AddButton',
  props: {
    title: {
      type: String,
      defalut: '添加课程排期'
    },
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
      tempTime = `0${this.time - 1}:00`
      tempTime = tempTime.slice(tempTime.length - 5)
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
