<template>
  <div>
    <st-button class="mg-r8" @click="onBatchImport">批量加入部门</st-button>
    <st-button class="mg-r8" @click="onClickAddStaff">添加员工</st-button>
    <st-button @click="onImportStaff">导入员工</st-button>
  </div>
</template>

<script>
export default {
  name: 'OpreationButton',
  methods: {
    onClickAddStaff() {
      this.$emit('add-staff')
    },
    onBatchImport() {
      this.$emit('batch-import')
    },
    onImportStaff() {
      this.$emit('import-staff')
    }
  }
}
</script>
