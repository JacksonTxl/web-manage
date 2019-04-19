<template>
  <div class="page-staff">
    <section class="page-staff-lf">
      <header class="staff-lf__search">
        <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round"></st-input-search>
      </header>
      <main class="staff-lf__tree">
        <organization-tree></organization-tree>
      </main>
    </section>
    <section class="page-staff-rg">
      <header class="staff-rg__operation">
        <filter-staff></filter-staff>
        <opreation-button @add-staff="onAddStaff"></opreation-button>
      </header>
      <main class="staff-rg__table">
        <div  style="width:100%">
          <staff-table @edit-staff="onEditStaff" :staffList="staffList"></staff-table>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import OrganizationTree from './department#/organization-tree.vue'
import FilterStaff from './department#/filter-staff.vue'
import OpreationButton from './department#/opreation-button.vue'
import StaffTable from './department#/staff-table'
import { DepartmentService } from '@/views/pages/brand/staff/department.service'
export default {
  name: 'Staff',
  serviceInject() {
    return {
      department: DepartmentService
    }
  },
  rxState() {
    return {
      staffList: this.department.staffList$,
      loading: this.department.loading$
    }
  },
  components: {
    OrganizationTree,
    FilterStaff,
    OpreationButton,
    StaffTable
  },
  methods: {
    onEditStaff(staffId) {
      console.log(staffId)
      this.$router.push({ name: 'brand-staff-edit', query: { staffId: 1 } })
    },
    onAddStaff() {
      this.$router.push('/brand/staff/add')
    }
  },
  mounted() {
    console.log(this.loading.getStaffList)
  }
}
</script>
