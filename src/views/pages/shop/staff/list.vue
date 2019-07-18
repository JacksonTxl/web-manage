<template>
  <st-panel class="page-shop-staff-list" app>
    <a-row>
      <a-col :lg="17" class="page-shop-staff-list__selectRow">
        <a-tree-select
          showSearch
          class="mg-r8"
          style="width: 160px"
          v-model="query.department_id"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择部门"
          allowClear
          treeDefaultExpandAll
          @change="onSingleSearch('department_id', $event)"
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
                  />
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>
        <a-select
          class="mg-r8"
          :defaultValue="-1"
          placeholder="请选择员工职能"
          v-model="query.identity"
          @change="onSingleSearch('identity', $event)">
          <a-select-option v-for="(item, index) in staffEnums.identity.value" :key="index" :value="+index">{{item}}</a-select-option>
        </a-select>
        <a-select
          class="mg-r8"
          :defaultValue="-1"
          placeholder="请选择员工状态"
          v-model="query.work_status"
          @change="onSingleSearch('work_status', $event)">
          <a-select-option v-for="(item, index) in staffEnums.work_status.value" :key="index" :value="+index">{{item}}</a-select-option>
        </a-select>
        <st-button v-if="auth.add" class="mg-r8" icon="add" @click="onAddStaff">添加员工</st-button>
        <!-- NOTE: 导入 -->
        <!-- <st-button v-if="auth.import" class="mg-r8" @click="onExportStaff">导入员工</st-button> -->
        <st-button :disabled="selectedRowKeys.length > 0 ? false : true" @click="onJoinDepartment" v-if="auth.join">批量加入部门</st-button>
      </a-col>
      <a-col :lg="7" style="text-align: right;">
        <st-input-search placeholder="搜索员工" v-model="query.keyword" @search="onSingleSearch('keyword', $event)"/>
      </a-col>
    </a-row>
    <a-row class="mg-t8">
      <st-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectionChange}"
        :columns="columns"
        :dataSource="staffList"
        :scroll="{ x: 1500 }"
        class="page-shop-staff-table"
        rowKey="id"
        :page="page"
        @change="onTableChange"
      >
        <div class="page-staff-table-name" slot="staff_name" slot-scope="text, record">
          <img class="page-staff-table-name__img mg-r8" :src="record.avatar">
          <span class="name">{{text}}</span>
        </div>
        <template slot="shop" slot-scope="text,record">
          <template v-for="item in record.shop">
            <span :key="item.id" class="mg-r8" v-if="item">{{ item.name }}</span>
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
          <st-table-actions>
            <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:staff|get']" @click="onSearchDetail(record)">详情</a>
            <template v-if="record.work_status.name === '在职'">
              <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:staff|edit']"
                @click="onEdit(record)">编辑</a>
              <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:staff|bind_card']"
                v-modal-link="{ name: 'shop-staff-bind-card', props: {staff: record }}">绑定实体卡</a>
              <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:staff|rebind_card']"
                v-modal-link="{ name: 'shop-staff-bind-card', props: {staff: record }}">重绑实体卡</a>
              <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:account|save']"
                v-modal-link="{ name: 'shop-staff-re-password', props: {staff: record}}">管理登录账号</a>
              <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:staff|position']"
                v-modal-link="{ name: 'shop-staff-update-staff-position', props: {staff: record}}">职位变更</a>
              <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:staff|salary']"
                v-modal-link="{ name: 'shop-staff-salary-account-setting', props: {staff: record}}">设置薪资账户</a>
              <a href="javascript: void(0)" v-if="record.auth['brand_shop:staff:staff|shop_leave']"
                v-modal-link="{ name: 'shop-staff-leave-current-shop', props: {staff: record}}">解除门店关系</a>
            </template>
          </st-table-actions>
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
import { columns } from './list.config'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [ tableMixin ],
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
      page: this.service.page$,
      department: this.service.department$,
      staffEnums: this.service.staffEnums$,
      auth: this.service.auth$
    }
  },
  data() {
    return {
      visible: false,
      value: '',
      enums: {},
      modaldata: {}
    }
  },
  computed: {
    columns
  },
  methods: {
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
      this.onSearhReset()
    },
    onJoinDepartment(e) {
      console.log('批量加入部门')
      this.$modalRouter.push({
        name: 'shop-staff-batch-import',
        props: {
          ids: this.selectedRowKeys
        },
        on: {
          change: this.joinok
        }
      })
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
          id: e.id
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
    }
  }
}
</script>
