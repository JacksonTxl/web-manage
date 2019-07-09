<template>
  <div class="page-staff">
    <section class="page-staff-lf">
      <header class="staff-lf__search">
        <st-input-search placeholder="请输入部门/员工名称" style="width:226px" round="round" @search="onSearch"></st-input-search>
      </header>
      <main class="staff-lf__tree">
        <organization-tree></organization-tree>
      </main>
    </section>
    <section class="page-staff-rg">
      <header class="staff-rg__operation">
        <opreation-button :auth="auth" @add-staff="onAddStaff" @batch-import="onbatchImport" @import-staff="onImportStaff"></opreation-button>
        <filter-staff></filter-staff>
      </header>
      <main class="staff-rg__table">
        <div  style="width:100%">
          <staff-table :page="page" :loading="loading.getStaffList" @edit-staff="onEditStaff" @selectedRow="selectedRow" :staffList="staffList"></staff-table>
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
      departmentService: DepartmentService
    }
  },
  rxState() {
    return {
      staffList: this.departmentService.staffList$,
      loading: this.departmentService.loading$,
      page: this.departmentService.page$,
      auth: this.departmentService.auth$
    }
  },
  components: {
    OrganizationTree,
    FilterStaff,
    OpreationButton,
    StaffTable
  },
  computed: {
    shopList() {
      return [{ id: -1, name: '  全部' }, ...this.shopOptions]
    }
  },
  data() {
    return {
      ids: []
    }
  },
  methods: {
    selectedRow(ids) {
      console.log('selectedRow', ids)
      this.ids = ids
    },
    // 查询
    onSearch(e) {
      console.log('搜索条件', e)
      this.$router.push({ name: 'brand-staff-department', query: { department_id: e } })
    },
    // 编辑
    onEditStaff(staffId) {
      this.$router.push({ name: 'brand-staff-edit', query: { id: staffId } })
    },
    // 添加员工
    onAddStaff() {
      this.$router.push('/brand/staff/add')
    },
    // 批量导入
    onbatchImport() {
      this.$modalRouter.push({
        name: 'staff-batch-import',
        props: {
          ids: this.ids
        }
      })
      console.log('批量导入')
    },
    // 导入员工
    onImportStaff() {
      console.log('导入员工')
    }
  }
}
</script>
