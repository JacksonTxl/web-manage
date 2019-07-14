<template>
  <div>
    <st-button class="mg-r8" v-if="auth.add" @click="onClickAddStaff" icon="add">添加员工</st-button>
    <!-- NOTE: 导入 -->
    <!-- <st-button class="mg-r8" v-if="auth.import" @click="onImportStaff">导入员工</st-button> -->
    <st-button  v-if="auth.join" @click="onBatchImport" :disabled="!rowKeys.length" icon="add">批量加入部门</st-button>
  </div>
</template>

<script>
export default {
  props: {
    auth: Object,
    default: () => {},
    rowKeys: Array
  },
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
