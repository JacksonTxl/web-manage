<template>
<div  class="organization-tree">
  <st-organ-tree ref="tree" :treeData="treeData" @node-click="getDepartment"></st-organ-tree>
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
  components: {
    StOrganTree
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
    getDepartment(item = 0) {
      this.query.department_id = item
      this.$router.push({ query: this.query, force: true })
    }
  }
}
</script>
