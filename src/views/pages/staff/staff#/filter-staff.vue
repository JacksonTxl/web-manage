<template>
  <div>
    <a-select class="filter-staff__item"  defaultValue="lucy" style="width: 240px" @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <a-select class="filter-staff__item" defaultValue="lucy" style='width: 240px'>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: 'FilterStaff',
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
