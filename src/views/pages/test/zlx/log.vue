<template>
  <div>

    <time-picker></time-picker>
    <div class="zlx" @mouseleave="onMouseLeave"></div>
  </div>
</template>

<script>
import TimePicker from '@/views/pages/test/zlx/timepicker#/index'
export default {
  components: {
    TimePicker
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
