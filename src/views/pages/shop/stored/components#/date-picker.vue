<template>
  <div>
    <a-select
      defaultValue="日"
      style="width: 76px;margin-right:12px"
      @change="handleChange"
    >
      <a-select-option value="jack">日</a-select-option>
      <a-select-option value="lucy">周</a-select-option>
      <a-select-option value="Yiminghe">月</a-select-option>
    </a-select>
    <a-date-picker @change="onChange" />
  </div>
</template>
<script>
export default {
  methods: {
    onChange(query) {
      console.log(query)
    },
    handleChange(e) {
      console.log(e)
    }
  }
}
</script>
