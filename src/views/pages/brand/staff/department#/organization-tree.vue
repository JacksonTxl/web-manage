<template>
<div  class="organization-tree">
  <st-tree :treeData="treeData" @delete="deleteDepartment" @add="addDepartment" @edit="editDepartment" @node-click="getDepartment"></st-tree>
</div>

</template>

<script>
import { DepartmentService } from '@/views/pages/brand/staff/department.service#/department.service'
import { RouteService } from '../../../../../services/route.service'
export default {
  name: 'OrganizationTree',
  serviceInject() {
    return {
      departmentService: DepartmentService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      departmentList: this.departmentService.departmentList$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
    }
  },
  computed: {
    treeData() {
      return {
        name: '三体云动健身（600）',
        id: 0,
        children: this.departmentList
      }
    }
  },
  methods: {
    getDepartment(item) {
      this.$router.push({ query: { department_id: item, ...this.query } })
    },
    addDepartment(item) {
      this.departmentService.addDepartment(item).subscribe(() => {
        console.log(this.departmentList)
      })
    },
    editDepartment(item) {
      this.departmentService.updateDepartment(item).subscribe(() => {
        console.log(this.departmentList)
      })
    },
    deleteDepartment(item) {
      this.$confirm({
        title: '确认要删除',
        content: '删除部门后，该部门下的员工会自动归属父级部门，且无法恢复，确认删除？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            return this.departmentService.delDepartment({ id: item.id }).subscribe(() => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    },
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>
