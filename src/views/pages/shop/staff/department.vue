<template>
  <div class="page-staff">
    <a-row>
      <a-col :span="4">
        <section class="page-staff-lf">
          <header class="staff-lf__search">
            <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round"></st-input-search>
          </header>
          <main class="staff-lf__tree">
            <organization-tree></organization-tree>
          </main>
        </section>
      </a-col>
      <a-col :span="20">
        <section class="page-staff-rg">
          <header class="staff-rg__operation">
            <filter-staff></filter-staff>
            <opreation-button @add-staff="addStaff"></opreation-button>
          </header>
          <main class="staff-rg__table">
            <div  style="width:100%">
              <staff-table></staff-table>
            </div>
          </main>
        </section>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import OrganizationTree from './department#/organization-tree.vue'
import FilterStaff from './department#/filter-staff.vue'
import OpreationButton from './department#/opreation-button.vue'
import StaffTable from './department#/staff-table'
export default {
  name: 'Staff',
  components: {
    OrganizationTree,
    FilterStaff,
    OpreationButton,
    StaffTable
  },
  methods: {
    addStaff() {
      this.$router.push('/shop/staff/add')
    }
  }
}
</script>
