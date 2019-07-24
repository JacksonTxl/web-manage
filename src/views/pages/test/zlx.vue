<template>
  <div>
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
export default {
  components: {
    Calendar
  },
  methods: {
    onMouseLeave() {
      console.log('onMouseLeave')
    }
  }
}
</script>

<style scoped>
  .zlx{
    width:100px;
    height: 100px;
    background: #3e4
  }
</style>
