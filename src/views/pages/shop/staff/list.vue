<template>
  <st-panel>
    <a-row :gutter="8">
      <a-col :lg="17">
        <a-select
          style="width: 160px; "
          class="mg-r8"
          :defaultValue="-1"
          placeholder="请选择部门"
          @change="onChooseDepartment"
        >
          <a-select-option :value="1">部门1</a-select-option>
          <a-select-option :value="3">部门2</a-select-option>
          <a-select-option :value="2">部门3</a-select-option>
          <a-select-option :value="-1">全部部门</a-select-option>
        </a-select>
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
        <st-button class="mg-r8" @click="onJoinDepartment">批量加入部门</st-button>
        <st-button class="mg-r8" @click="onAddStaff">添加员工</st-button>
        <st-button @click="onExportStaff">导入员工</st-button>
      </a-col>
      <a-col :lg="7" style="text-align: right;">
        <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 300px;" @search="onSearch"/>
      </a-col>
    </a-row>
    <a-row :gutter="8" class="mg-t8">
      <st-table
        :columns="columns"
        :dataSource="stafflist.staff_list"
        :scroll="{ x: 1500 }"
        class="page-shop-staff-table"
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
        <div slot="status" slot-scope="status">
          <a-badge :status="status == 1 ? 'success' : 'error'"/>
          {{status == 1 ? '在职' : '不在职'}}
        </div>
        <template slot="action" slot-scope="text,record">
          <a href="javascript:;" @click="onSearchDetail(record)">详情</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" @click="onEdit(record)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item>
              <modal-link
                tag="a"
                :to="{ name: 'shop-staff-bind-card', props: {} }"
              >绑实体卡</modal-link>
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
              >设置薪资账</modal-link>
            </a-menu-item>
            <a-menu-item>
              <modal-link
                tag="a"
                :to="{ name: 'staff-update-staff-position', props: {staffId: record.staff_id || 1} }"
              >解除门店关系</modal-link>
            </a-menu-item>
          </st-more-dropdown>
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
  { title: '性别', dataIndex: 'sex', key: 'sex' },
  { title: '工号', dataIndex: 'staff_num', key: 'staff_num' },
  { title: '所属部门', dataIndex: 'department', key: 'department' },
  {
    title: '所在门店',
    dataIndex: 'shop',
    key: 'shop',
    scopedSlots: { customRender: 'shop' }
  },
  { title: '员工职能', dataIndex: 'identity', key: 'identity' },
  { title: '在职状态', dataIndex: 'work_status', key: 'work_status' },
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
      stafflist: this.service.stafflist$
    }
  },
  data() {
    return {
      columns,
      pagination: {
        pageSize: 20,
        current: 1,
        total: 0
      }
    }
  },
  mounted() {
    this.pagination.total = this.stafflist.page.total_counts
    this.pagination.pageSize = this.stafflist.page.size
    this.pagination.current = this.stafflist.page.current_page
  },
  methods: {
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
    onSearchDetail(e) {
      this.$router.push({
        name: 'shop-staff-info',
        query: {
          id: e.staff_id,
          identity: e.identity
        }
      })
    },
    onEdit(e) {
      this.$router.push({
        name: 'shop-staff-edit',
        query: {
          id: e.staff_id
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
