<template>
  <st-modal title="选择所属部门" size="small" v-model="show" @ok="onSubmit">
    <department-select
      v-model="mod"
      size="100%"
      labelInValue
      treeCheckable
    ></department-select>
  </st-modal>
</template>
<script>
import DepartmentSelect from '@/views/biz-components/department-select'
export default {
  name: 'AddDepartment',
  data() {
    return {
      show: false,
      treeExpandedKeys: [],
      mod: undefined,
      label: [],
      value: []
    }
  },
  components: {
    DepartmentSelect
  },
  methods: {
    onSubmit() {
      this.show = false
      this.mod.forEach(item => {
        this.label.push(item.label)
        this.value.push(item.value)
      })
      this.$emit('success', { label: this.label, value: this.value })
    }
  }
}
</script>
