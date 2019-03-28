<template>
  <div class="page-staff">
    <section class="page-staff-lf">
      <header class="staff-lf__search">
        <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round"></st-input-search>
      </header>
      <main class="staff-lf__tree">组织架构树
        <organization-tree></organization-tree>
      </main>
    </section>
    <section class="page-staff-rg">
      <header class="staff-rg__operation">
        <filter-staff></filter-staff>
        <opreation-button></opreation-button>
      </header>
      <main class="staff-rg__table">
        <staff-table></staff-table>
      </main>
    </section>
  </div>
</template>

<script>
import OrganizationTree from './staff#/organization-tree.vue'
import FilterStaff from './staff#/filter-staff.vue'
import OpreationButton from './staff#/opreation-button.vue'
import StaffTable from './staff#/staff-table'
export default {
  name: 'Staff',
  components: {
    OrganizationTree,
    FilterStaff,
    OpreationButton,
    StaffTable
  }
}
</script>
