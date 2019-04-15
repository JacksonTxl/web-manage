<template>
  <div>
    <a-select class="filter-staff__item"  defaultValue="lucy" style="width: 240px" @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <a-select class="filter-staff__item" :defaultValue="1" style='width: 240px'>
      <a-select-option v-for="status in workStatus" :value="status.value" :key="status.value">{{status.label}}</a-select-option>
    </a-select>
  </div>
</template>
<script>
const workStatus = [{ label: '在职', value: 1 }, { label: '离职', value: 0 }]
export default {
  name: 'FilterStaff',
  data() {
    return {
      workStatus
    }
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
