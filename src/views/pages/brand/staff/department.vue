<template>
  <div class="page-staff">
    <section class="page-staff-lf">
      <header class="staff-lf__search">
        <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round"></st-input-search>
      </header>
      <main class="staff-lf__tree">
        <organization-tree></organization-tree>
        <modal-link tag='a-button' :to="{ name: 'staff-turnover' }">
          离职
        </modal-link>
        <modal-link tag='a-button' :to="{ name: 'staff-update-staff-position' }">
          更改员工职位
        </modal-link>
        <modal-link tag='a-button' :to="{ name: 'staff-salary-account-setting' }">
          工资账户设置
        </modal-link>
        <modal-link tag='a-button' :to="{ name: 'staff-bind-entity-card' }">
          绑定实体卡
        </modal-link>
        <modal-link tag='a-button' :to="{ name: 'staff-re-bind-entity-card' }">
          重新绑定实体卡
        </modal-link>
        <modal-link tag='a-button' :to="{ name: 'staff-delete' }">
          删除员工
        </modal-link>
      </main>
    </section>
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
  </div>
</template>

<script>
import OrganizationTree from './department#/organization-tree.vue'
import FilterStaff from './department#/filter-staff.vue'
import OpreationButton from './department#/opreation-button.vue'
import StaffTable from './department#/staff-table'
import { DepartmentService } from '@/views/pages/shop/staff/department.service'
export default {
  name: 'Staff',
  serviceInject() {
    return {
      department: DepartmentService
    }
  },
  subscriptions() {

  },
  components: {
    OrganizationTree,
    FilterStaff,
    OpreationButton,
    StaffTable
  },
  methods: {
    addStaff() {
      this.$router.push('/brand/staff/add')
    }
  }
}
</script>
