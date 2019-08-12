<template>
  <st-modal title="选择所属部门" size="small" v-model="show" @ok="onSubmit">
    <a-select
      allowClear
      placeholder="请选择部门"
      mode="multiple"
      style="width:100%"
      @change="onChange"
    >
      <a-select-option v-for="v in departmentSearchList" :key="v.id">
        {{ v.name }}
      </a-select-option>
    </a-select>
  </st-modal>
</template>
<script>
import { DepartmentService } from '../../pages/brand/staff/department.service'

export default {
  name: 'AddDepartment',
  data() {
    return {
      show: false
    }
  },
  serviceInject() {
    return {
      departmentService: DepartmentService
    }
  },
  rxState() {
    return {
      departmentSearchList: this.departmentService.departmentSearchList$
    }
  },
  methods: {
    onSubmit() {
      this.show = false
    },
    onChange(data) {
      const lable = []
      const value = []
      data.forEach(ele => {
        this.departmentSearchList.forEach(item => {
          if (item.id === ele) {
            lable.push(item.name)
            value.push(item.id)
          }
        })
      })
      this.$emit('success', { lable, value })
    }
  },
  created() {
    this.departmentService.searchDepartment('').subscribe()
  }
}
</script>
