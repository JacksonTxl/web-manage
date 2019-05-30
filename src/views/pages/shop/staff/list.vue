<template>
  <st-panel class="page-shop-staff-list">
    <a-row :gutter="8">
      <a-col :lg="17">
        <a-tree-select
          showSearch
          class="mg-r8"
          style="width: 160px"
          :value="value"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择部门"
          allowClear
          treeDefaultExpandAll
          @change="selectDepartment"
        >
          <a-tree-select-node v-for="item in department" :value="item.id" :title="item.name" :key="item.id">
            <a-tree-select-node v-for="item1 in item.children" :value="item1.id" :title="item1.name" :key="item1.id">
              <a-tree-select-node v-for="item2 in item1.children" :value="item2.id" :title="item2.name" :key="item2.id">
                <a-tree-select-node v-for="item3 in item2.children" :value="item3.id" :title="item3.name" :key="item3.id">
                  <a-tree-select-node v-for="item4 in item3.children" :value="item4.id" :title="item4.name" :key="item4.id" />>
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
          @change="onChooseStaffFn"
        >
          <a-select-option :value="1">一般员工</a-select-option>
          <a-select-option :value="3">私人教练</a-select-option>
          <a-select-option :value="2">会籍销售</a-select-option>
          <a-select-option :value="-1">全部员工职能</a-select-option>
        </a-select>
        <a-select
          style="width: 160px; "
          class="mg-r8"
          :defaultValue="-1"
          placeholder="请选择员工状态"
          @change="onChooseStaffStatus"
        >
          <a-select-option :value="1">在职</a-select-option>
          <a-select-option :value="2">离职</a-select-option>
          <a-select-option :value="-1">全部员工状态</a-select-option>
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
        <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 300px;" @search="onSearch"/>
      </a-col>
    </a-row>
    <a-row :gutter="8" class="mg-t8">
      <st-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="stafflist.list"
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
              <a-menu-item v-if="record.has_card == 0">
                <modal-link tag="a" :to="{ name: 'shop-staff-bind-card', props: {staff_name: record.staff_name } }">绑实体卡</modal-link>
              </a-menu-item>
              <a-menu-item v-if="record.has_card == 1">
                <modal-link tag="a" :to="{ name: 'shop-staff-re-bind-card', props: {staff_name: record.staff_name } }">重绑实体卡</modal-link>
              </a-menu-item>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'staff-reinstatement', props: {staff_id: record.staff_id || 1} }"
                >管理登录账号</modal-link>
              </a-menu-item>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'staff-turnover', props: {staff_id: record.staff_id || 1} } "
                >职位变更</modal-link>
              </a-menu-item>
              <a-menu-item>
                <modal-link
                  tag="a"
                  :to="{ name: 'staff-update-staff-position', props: {staffId: record.staff_id || 1} }"
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
  </st-panel>
  <!-- 绑实体卡、管理登录账号、职位变更、设置薪资账、解除门店关系 -->
</template>

<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { ListService } from './list.service'
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
  serviceInject() {
    return {
      userService: UserService,
      messageService: MessageService,
      service: ListService
    }
  },
  rxState() {
    return {
      stafflist: this.service.stafflist$,
      department: this.service.department$
    }
  },
  data() {
    return {
      columns,
      pagination: {
        pageSize: this.stafflist.page.size,
        current: this.stafflist.page.current_page,
        total: this.stafflist.page.total_counts
      },
      selectedRowKeys: [],
      selectStaff: [],
      value: ''
    }
  },
  created() {
    console.log('部门列表', this.department)
  },
  methods: {
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
