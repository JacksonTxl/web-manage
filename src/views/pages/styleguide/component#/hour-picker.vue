<template>
  <section id="hour-picker" class="sg-section">
    <h3>hour-picker 多时间段选择</h3>
    <p v-if="periods.length">您选择了：{{periods}}</p>
    <st-hour-picker v-model="periods"/>
  </section>
</template>
<script>
export default {
  data() {
    return {
      periods: ['0:00-2:00', '4:00-6:00', '10:00-12:00']
    }
  }
}
</script>
