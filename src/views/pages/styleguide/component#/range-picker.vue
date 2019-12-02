<template>
  <div>
    <p>时间范围选择</p>
    <div>
      <st-range-picker :disabledDays="180" v-model="date" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: []
    }
  }
}
</script>
