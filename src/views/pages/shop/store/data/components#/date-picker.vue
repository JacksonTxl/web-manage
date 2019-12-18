<template>
  <div :class="basic()">
    <a-select defaultValue="date" @change="handleChange">
      <a-select-option value="date">日</a-select-option>
      <a-select-option value="week">周</a-select-option>
      <a-select-option value="month">月</a-select-option>
    </a-select>
    <a-date-picker v-if="selectValue === 'date'" @change="onChange" />
    <a-week-picker v-else-if="selectValue === 'week'" @change="onChange" />
    <a-month-picker v-else @change="onChange" />
  </div>
</template>
<script>
export default {
  bem: {
    basic: 'shop-store-data-picker'
  },
  methods: {
    onChange(query) {
      console.log(query)
    },
    handleChange(e) {
      this.selectValue = e
      console.log(e)
    }
  },
  data() {
    return {
      selectValue: 'date'
    }
  }
}
</script>
