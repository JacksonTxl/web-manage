<template>
  <section id="hour-picker" class="sg-section">
    <h3>hour-picker 多时间段选择</h3>
    <p v-if="v.length">您选择了：{{v}}</p>
    <st-hour-picker :value="v" @change="onHourPickerChange"/>
  </section>
</template>
<script>
export default {
  data() {
    return {
      v: ['0-2', '4-6', '10-12']
    }
  },
  methods: {
    onHourPickerChange(v) {
      this.v = v
    }
  }
}
</script>
