<template>
  <st-modal title="选择所属部门" size="small" v-model="show" @ok="onSubmit">
    <department-select
    :treeCheckable="true">

    </department-select>
  </st-modal>
</template>
<script>
import DepartmentSelect from '@/views/biz-components/department-select'
export default {
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
    onChange(value) {
      this.value = value
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.show = false
          this.$emit('change')
        }
      })
    }
  }
}
</script>
