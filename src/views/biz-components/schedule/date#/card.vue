<template>
  <div class="schedule-card" :style="{height: height, top: top}">
    {{cardItem.course_name}}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cardItem: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    height() {
      const start_date = moment(`${this.cardItem.start_date} ${this.cardItem.start_time}`, 'YYYY-MM-DD HH:mm')
      const end_date = moment(`${this.cardItem.end_date} ${this.cardItem.end_time}`, 'YYYY-MM-DD HH:mm')
      // 秒
      const seconds = end_date.diff(start_date, 'seconds')
      // 分钟
      const mintus = (seconds / 60)
      return `${mintus * 60 / 82}px`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
