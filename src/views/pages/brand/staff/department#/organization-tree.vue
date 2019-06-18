<template>
<div  class="organization-tree">
  <st-organ-tree :treeData="treeData" @click-item="onCLickItem" @delete="deleteDepartment" @add="addDepartment" @edit="editDepartment" @node-click="getDepartment"></st-organ-tree>
</div>

</template>

<script>
import { DepartmentService } from '@/views/pages/brand/staff/department.service#/department.service'
import { RouteService } from '../../../../../services/route.service'
import StOrganTree from './tree/tree.vue'
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
    onCLickItem(IOtem) {
      console.log('onCLickItem', IOtem)
    },
    getDepartment(item) {
      this.$router.push({ query: { department_id: item, ...this.query } })
    },
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>
