<template>
  <st-modal title="选择所属部门" size="small" v-model="show" @ok="onSubmit">
    <department-select
    size="346px"
    v-model="value"
    @changeLabel="onChange"
    :treeCheckable="true">

    </department-select>
  </st-modal>
</template>
<script>
import DepartmentSelect from '@/views/biz-components/department-select'
export default {
  name: 'AddDepartment',
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      treeExpandedKeys: [],
      value: undefined
    }
  },
  components: {
    DepartmentSelect
  },
  methods: {
    onSubmit() {
      this.show = false
    },
    onChange(data) {
      data.value = data.value.map(item => +item)
      this.$emit('success', data)
    }
  }
}
</script>
