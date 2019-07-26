<template>
  <div class="page-staff">
    <section class="page-staff-lf">
      <header class="staff-lf__search">
        <a-select allowClear placeholder="请选择部门" style="width:226px" @search="handleDepartmentSearch" @change="handleDepartmentSearchChange">
          <a-select-option v-for="v in departmentSearchList" :key="v.id">{{v.name}}</a-select-option>
        </a-select>
      </header>
      <main class="staff-lf__tree">
        <st-organ-tree
          ref="tree"
          :treeData="treeData"
          @updateData="updateData"
          @node-click="getDepartment"></st-organ-tree>
      </main>
    </section>
    <section class="page-staff-rg">
      <header class="staff-rg__operation">
        <a-row type="flex" justify="space-between">
          <a-col :span="10">
            <opreation-button :auth="auth" :rowKeys="ids" @add-staff="onAddStaff" @batch-import="onbatchImport" @import-staff="onImportStaff"></opreation-button>
          </a-col>
          <a-col :span="14">
            <filter-staff></filter-staff>
          </a-col>
        </a-row>
      </header>
      <main class="staff-rg__table">
        <div  style="width:100%">
          <staff-table ref="staffTable" :page="page" :loading="loading.getStaffList" @edit-staff="onEditStaff" @selectedRow="selectedRow" :staffList="staffList"></staff-table>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import FilterStaff from './department#/filter-staff.vue'
import OpreationButton from './department#/opreation-button.vue'
import StaffTable from './department#/staff-table'
import { DepartmentService } from './department.service'
import { RouteService } from '@/services/route.service'
import { UserService } from '@/services/user.service'
import StOrganTree from './department#/tree/tree.vue'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { cloneDeep } from 'lodash-es'

export default {
  name: 'Staff',
  serviceInject() {
    return {
      departmentService: DepartmentService,
      routeService: RouteService,
      userService: UserService,
      shopStaffApi: ShopStaffApi
    }
  },
  rxState() {
    return {
      departmentList: this.departmentService.departmentList$,
      departmentSearchList: this.departmentService.departmentSearchList$,
      staffList: this.departmentService.staffList$,
      loading: this.departmentService.loading$,
      page: this.departmentService.page$,
      auth: this.departmentService.auth$,
      query: this.routeService.query$,
      brand: this.userService.brand$
    }
  },
  components: {
    FilterStaff,
    OpreationButton,
    StaffTable,
    StOrganTree
  },
  computed: {
    shopList() {
      return [{ id: -1, name: '  全部' }, ...this.shopOptions]
    },
    treeData() {
      let num = 0
      let len = this.treeList.length
      // eslint-disable-next-line
      if (!len) this.treeList = this.departmentList
      console.log('treeData', this.treeList)
      this.treeList.forEach(department => {
        num += department.count
      })
      return {
        name: this.brand.name,
        id: 0,
        count: this.departmentCount,
        children: this.treeList
      }
    },
    departmentCount() {
      let num = 0
      this.departmentList.forEach(department => {
        num += department.count
      })
      return num
    }
  },
  data() {
    return {
      ids: [],
      treeList: []
    }
  },
  methods: {
    updateData() {
      this.departmentService.getDepartmentList().subscribe(res => {
        this.treeList = res.department
      })
    },
    getDepartment(item = 0) {
      this.query.department_id = item
      this.$router.push({ query: this.query, force: true })
    },
    selectedRow(ids) {
      console.log('selectedRow', ids)
      this.ids = ids
    },
    // 查询
    handleDepartmentSearch(e) {
      console.log('搜索条件', e)
      this.departmentService.searchDepartment(e)
      // this.$router.push({ name: 'brand-staff-department', query: { department_id: e } })
    },
    // 查询部门后点击列表某项
    handleDepartmentSearchChange(e) {
      if (!e) this.treeList = this.departmentList
      else this.treeList = this.deepSearchDepartment(this.departmentList, e)
    },
    // 查询部门后点击列表某项查找到对应列表
    deepSearchDepartment(departments, id) {
      let result = null
      if (!departments || !Array.isArray(departments)) return
      for (let x = 0; x < departments.length; x++) {
        let department = departments[x]
        if (department.id === id) {
          result = [department]
          break
        } else if (department.children && department.children.length) {
          result = this.deepSearchDepartment(department.children, id)
        }
      }
      return result
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
        },
        on: {
          ok: res => {
            this.updateData()
            this.$refs.staffTable.selectedRowKeys = []
            this.$router.push({
              query: this.query,
              force: true
            })
          }
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
