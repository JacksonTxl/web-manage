<template>
  <st-panel >
    <st-range-picker :disabledDays="180"></st-range-picker>
  </st-panel>
</template>
<script>
import StRangePicker from '@/views/components/datetime-picker/range-picker'
export default {
  data() {
    return {
    }
  },
  methods: {

  },
  components: {
    StRangePicker
  }
}
</script>
