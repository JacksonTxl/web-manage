<template>
  <st-panel class="page-shop-staff-list" app>
    <a-row :gutter="8">
      <a-col :lg="17">
        <a-tree-select
          showSearch
          class="mg-r8"
          style="width: 160px"
          v-model="query.department_id"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择部门"
          allowClear
          treeDefaultExpandAll
          @change="onChange"
        >
          <a-tree-select-node
            v-for="item in department"
            :value="item.id"
            :title="item.name"
            :key="item.id"
          >
            <a-tree-select-node
              v-for="item1 in item.children"
              :value="item1.id"
              :title="item1.name"
              :key="item1.id"
            >
              <a-tree-select-node
                v-for="item2 in item1.children"
                :value="item2.id"
                :title="item2.name"
                :key="item2.id"
              >
                <a-tree-select-node
                  v-for="item3 in item2.children"
                  :value="item3.id"
                  :title="item3.name"
                  :key="item3.id"
                >
                  <a-tree-select-node
                    v-for="item4 in item3.children"
                    :value="item4.id"
                    :title="item4.name"
                    :key="item4.id"
                  />>
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>
        <a-select
          style="width: 160px; "
          class="mg-r8"
          :defaultValue="-1"
          placeholder="请选择员工职能"
          v-model="query.identity"
          @change="onChange">
          <a-select-option v-for="(item, index) in staffEnums.identity.value" :key="index" :value="+index">{{item}}</a-select-option>
        </a-select>
        <a-select
          style="width: 160px; "
          class="mg-r8"
          :defaultValue="-1"
          placeholder="请选择员工状态"
          v-model="query.work_status"
          @change="onChange">
          <a-select-option v-for="(item, index) in staffEnums.work_status.value" :key="index" :value="+index">{{item}}</a-select-option>

        </a-select>
        <st-button class="mg-r8" :disabled="selectedRowKeys.length > 0 ? false : true">
          <modal-link
            tag="a"
            :to="{ name: 'shop-staff-join-department', props: {},on :{change: joinok} }"
          >批量加入部门</modal-link>
        </st-button>
        <st-button class="mg-r8" @click="onAddStaff">添加员工</st-button>
        <st-button @click="onExportStaff">导入员工</st-button>
      </a-col>
      <a-col :lg="7" style="text-align: right;">
        <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 300px;" v-model="query.keywords" @search="onChange"/>
      </a-col>
    </a-row>
    <a-row :gutter="8" class="mg-t8">
      <st-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="staffList.list"
        :scroll="{ x: 1500 }"
        class="page-shop-staff-table"
        :rowKey="record => record.staff_id"
        @change="pageChange"
        :pagination="pagination"
      >
        <div class="page-staff-table-name" slot="staff_name" slot-scope="text, record">
          <img class="page-staff-table-name__img mg-r8" :src="record.avatar">
          <span class="name">{{text}}</span>
        </div>
        <template slot="shop" slot-scope="text,record">
          <template v-for="item in record.shop">
            <span :key="item.id" class="mg-r8">{{ item.name }}</span>
          </template>
        </template>
        <template slot="identity" slot-scope="text,record">
          <template v-for="item in record.identity">
            <span :key="item.id" class="mg-r8">{{ item.name }}</span>
          </template>
        </template>
        <template slot="sex" slot-scope="text">
          <span>{{ text.name }}</span>
        </template>
        <template slot="work_status" slot-scope="text">
          <div class="page-staff-list-work_status">
            <a-badge :status="text.name === '在职' ? 'success' : 'error'"/>
            {{ text.name }}
          </div>
        </template>
        <template slot="action" slot-scope="text,record">
          <a href="javascript:;" @click="onSearchDetail(record)">详情</a>
          <template v-if="record.work_status.name === '在职'">
            <a-divider type="vertical"></a-divider>
            <a href="javascript:;" @click="onEdit(record)">编辑</a>
            <a-divider type="vertical"></a-divider>
            <st-more-dropdown>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'shop-staff-bind-card', props: {staff: record } }"
                >绑实体卡</modal-link>
              </a-menu-item>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'shop-staff-re-password', props: {staff: record} }"
                >管理登录账号</modal-link>
              </a-menu-item>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'shop-staff-update-staff-position', props: {data: record}} "
                >职位变更</modal-link>
              </a-menu-item>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'shop-staff-wages-account-set', props: {data: record} }"
                >设置薪资账户</modal-link>
              </a-menu-item>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'shop-staff-leave-current-store', props: {data: record}}"
                >解除门店关系</modal-link>
              </a-menu-item>
            </st-more-dropdown>
          </template>
        </template>
      </st-table>
    </a-row>
    <change-staff-postion :show="visible" :enums="enums" :data="modaldata"/>
  </st-panel>
</template>

<script>
import { UserService } from '@/services/user.service'
import { ListService } from './list.service'
import ChangeStaffPostion from './list#/change-staff-postion'
import { RouteService } from '../../../../services/route.service'
const columns = [
  {
    title: '姓名',
    dataIndex: 'staff_name',
    key: 'staff_name',
    fixed: 'left',
    width: 100
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    fixed: 'left',
    width: 100
  },
  { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    scopedSlots: { customRender: 'sex' }
  },
  { title: '工号', dataIndex: 'staff_num', key: 'staff_num' },
  { title: '所属部门', dataIndex: 'department', key: 'department' },
  {
    title: '所在门店',
    dataIndex: 'shop',
    key: 'shop',
    scopedSlots: { customRender: 'shop' }
  },
  {
    title: '员工职能',
    dataIndex: 'identity',
    key: 'identity',
    scopedSlots: { customRender: 'identity' }
  },
  {
    title: '在职状态',
    dataIndex: 'work_status',
    key: 'work_status',
    scopedSlots: { customRender: 'work_status' }
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    ChangeStaffPostion
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      service: ListService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      staffList: this.service.staffList$,
      department: this.service.department$,
      staffEnums: this.service.staffEnums$
    }
  },
  data() {
    return {
      visible: false,
      columns,
      pagination: {
        pageSize: this.staffList.page.size,
        current: this.staffList.page.current_page,
        total: this.staffList.page.total_counts
      },
      selectedRowKeys: [],
      selectStaff: [],
      value: '',
      enums: {},
      modaldata: {}
    }
  },
  methods: {
    onChange() {
      this.$router.push({ query: this.query })
    },
    changeStaffPosition(id) {
      this.userService.getEnums().subscribe(res => {
        this.enums = res.staff
        this.visible = true
        this.modaldata = {
          nature_work: 1,
          identity: [1, 2]
        }
      })
    },
    selectDepartment(e) {
      console.log(e)
      this.value = e + ''
    },
    joinok() {
      this.selectedRowKeys = []
      this.selectStaff = []
      this.$router.push({
        query: {},
        force: true
      })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectStaff = selectedRows.map(item => {
        return item.staff_id
      })

      console.log('选中的行', this.selectStaff)
    },
    onJoinDepartment(e) {
      console.log('批量加入部门')
    },
    onAddStaff() {
      this.$router.push({
        name: 'shop-staff-add'
      })
    },
    onExportStaff() {
      console.log('导入员工')
    },
    // 详情
    onSearchDetail(e) {
      let identity = e.identity.map(ele => {
        return ele.id
      })
      this.$router.push({
        name: 'shop-staff-info',
        query: {
          id: e.id,
          identity: identity
        }
      })
    },
    onEdit(e) {
      this.$router.push({
        name: 'shop-staff-edit',
        query: {
          id: e.id
        }
      })
    },
    onChooseDepartment(e) {
      console.log('选择部门', e)
      this.$router.push({
        query: {
          shop_id: e
        },
        force: true
      })
    },
    onChooseStaffFn(e) {
      console.log('选择员工职能', e)
    },
    onChooseStaffStatus(e) {
      console.log('选择员工状态', e)
      this.$router.push({
        query: {
          work_status: e
        },
        force: true
      })
    },
    onSearch(e) {
      console.log('搜索员工', e)
    },
    pageChange(pagination) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.$router.push({
        query: {
          page: pagination.current,
          size: pagination.pageSize
        },
        force: true
      })
    }
  }
}
</script>
