
<template>
  <div class="shop-member-list">
    <st-panel class="mg-t16">
      <div slot="title">
        <st-input-search placeholder="可输入姓名、手机号、卡号" v-model="query.keyword" @search="onChangeSearchQuery" style="width: 290px;"/>
      </div>

      <div slot="prepend">
        <st-search-panel>
          <div :class="basic('select')">
            <span style="width:90px;">用户级别：</span>
            <st-search-radio label="" @change="onChangeSearchQuery" v-model="querySelect.member_level" :list="memberLevel"/>
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">来源方式：</span>
            <st-search-radio label="" @change="onChangeSearchQuery" v-model="querySelect.register_way" :list="sourceList"/>
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">注册时间：</span>
            <a-range-picker :defaultValue="defaultRegValue" @change="onChangeReg">
            </a-range-picker>
          </div>
          <div slot="more">
            <div :class="basic('select')">
              <span style="width:90px;">入会时间：</span>
              <a-range-picker :defaultValue="defaultBeMemberValue" @change="onChangeBeMember">
              </a-range-picker>
            </div>
            <div :class="basic('select')">
              <span style="width:90px;">员工跟进：</span>
              <st-search-radio label="" @change="onChangeSearchQuery" v-model="querySelect.is_follow" :list="isFollow"/>
            </div>
          </div>
          <div slot="button">
            <st-button type="primary" @click="onSearch">查询</st-button>
            <st-button class="mgl-8" @click="onReset">重置</st-button>
          </div>
        </st-search-panel>
      </div>
      <div class="mg-t16">
        <st-button type="primary" class="shop-member-list-button" v-if="auth.add">
          <a href="javascript:;" @click="addUser()">添加用户</a>
        </st-button>
        <st-button class="shop-member-list-button" v-if="auth.import">导入用户</st-button>
        <st-button
          v-if="auth.tag"
          class="shop-member-list-button"
          :disabled="!selectedRowData.length"
          v-modal-link="{
            name: 'shop-add-lable',
            props: {
              memberIds: selectedRowKeys
            }
          }"
        >
          加标签
        </st-button>
        <a-popover placement="bottom">
          <template slot="content">
            <p v-if="auth.bindCoach">
              <a href="javascript: void(0);"
                v-modal-link="{
                  name: 'shop-distribution-coach',
                  props: {
                    memberIds: selectedRowKeys
                  }
                }"
              >
                分配教练
              </a>
            </p>
            <p v-if="auth.bindSalesman">
              <a href="javascript: void(0);"
                v-modal-link="{
                  name: 'shop-distribution-sale',
                  props: {
                    memberIds: selectedRowKeys
                  }
                }"
              >
                分配销售
              </a>
            </p>
          </template>
          <st-button
            v-if="auth.bindCoach && auth.bindSalesman"
            class="shop-member-list-button"
            :disabled="selectedRowData.length > 0 ? false :true"
          >分配员工</st-button>
        </a-popover>
        <st-button v-if="auth.export" class="shop-member-list-button">批量导出</st-button>
      </div>
      <st-table
        class="mg-t24"
        :columns="columns"
        :alertSelection="{onReset:onSelectionReset}"
        :rowSelection="{selectedRowKeys:selectedRowKeys,onChange:onSelectionChange}"
        rowKey="member_id"
        @change="onTableChange"
        :dataSource="memberListInfo.list"
      >
        <div slot="member_name" slot-scope="text,record">
          <a href="javascript:;" v-if="record.auth['shop:member:member|get']" @click="infoFunc(record)">{{text}}</a>
          <span v-else>{{text}}</span>
        </div>
        <div slot="action" slot-scope="record">
          <a href="javascript:;" v-if="record.auth['shop:member:member|get']" @click="infoFunc(record)">详情</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" v-if="record.auth['shop:member:member|edit']" @click="edit(record)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item v-if="record.auth['shop:member:member|bind_coach']">
              <modal-link
                tag="a"
                :to=" {
                  name: 'shop-distribution-coach',
                  props: {
                    memberIds: [record.member_id]
                  }
                }"
              >
                分配教练
              </modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:member|bind_salesman']">
              <a href="javascript: void(0);"
                v-modal-link="{
                  name: 'shop-distribution-sale',
                  props: {
                    memberIds: [record.member_id]
                  }
                }"
              >
                分配销售
              </a>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:member|bind_card']">
              <modal-link
                tag="a"
                :to=" { name: 'shop-binding-entity-card', props:{record:record}}"
              >绑实体卡</modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:member|rebind_card']">
              <modal-link tag="a" :to=" { name: 'shop-missing-card', props:{record:record}}">遗失补卡</modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:member|transfer']">
              <modal-link tag="a" :to=" { name: 'shop-transfer-shop', props:{record:record}}">转店</modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:member|frozen']">
              <modal-link tag="a" :to=" { name: 'shop-frozen', props:{record:record}}">冻结用户</modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:member|unbind_wechat']" @click="onRemoveBind(record)">解除微信绑定</a-menu-item>
          </st-more-dropdown>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>

import { UserService } from '@/services/user.service'
import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
export default {
  name: 'memberList',
  bem: {
    basic: 'page-shop-finance'
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService,
      routeService: RouteService
    }
  },
  rxState() {
    /**
     * @type {UserService}
     */
    const user = this.userService
    return {
      memberListInfo: this.listService.memberListInfo$,
      shopMemberEnums: user.shopMemberEnums$,
      reserveEnums: user.reserveEnums$,
      memberEnums: user.memberEnums$,
      auth: this.listService.auth$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      expand: false,
      sourceRegisterList: [],
      consumption: [],
      form: {
        member_level: '',
        register_way: '',
        register_start_time: '',
        register_stop_time: '',
        be_member_start_time: '',
        be_member_stop_time: '',
        is_follow: '',
        keyword: '',
        page: '',
        size: 20
      },
      querySelect: {},
      selectDataList: [],
      selectedRowKeys: [],
      selectedRowData: [],
      columns: [
        // { title: '人脸', dataIndex: '' },
        {
          title: '姓名',
          dataIndex: 'member_name',
          scopedSlots: { customRender: 'member_name' }
        },
        { title: '手机号', dataIndex: 'mobile' },
        {
          title: '用户等级',
          dataIndex: 'member_level',
          scopedSlots: { customRender: 'member_level' }
        },
        { title: '跟进销售', dataIndex: 'follow_salesman' },
        { title: '跟进教练', dataIndex: 'follow_coach' },
        { title: '注册时间', dataIndex: 'register_time' },
        { title: '成为会员时间', dataIndex: 'be_member_time' },
        { title: '累计消费(元)', dataIndex: 'sum_consumption' },
        { title: '操作', width: 140, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  computed: {
    memberLevel() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.shopMemberEnums.member_level) return list
      Object.entries(this.shopMemberEnums.member_level.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    isFollow() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.is_follow) return list
      Object.entries(this.memberEnums.is_follow.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    defaultRegValue() {
      if (!this.query.register_start_time) return null
      return [moment(this.query.register_start_time, this.dateFormat), moment(this.query.register_stop_time, this.dateFormat)]
    },
    defaultBeMemberValue() {
      if (!this.query.be_member_start_time) return null
      return [moment(this.query.be_member_start_time, this.dateFormat), moment(this.query.be_member_stop_time, this.dateFormat)]
    },
    sourceList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.sourceRegisterList) return list
      Object.entries(this.sourceRegisterList).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  mounted() {
    this.sourceRegisters()
    this.querySelect = {
      member_level: +this.query.member_level,
      register_way: +this.query.register_way,
      is_follow: +this.query.is_follow,
      register_start_time: this.query.register_start_time,
      register_stop_time: this.query.register_stop_time,
      be_member_start_time: this.query.be_member_start_time,
      be_member_stop_time: this.query.be_member_stop_time
    }
  },
  methods: {
    onChangeSearchQuery() {
      this.$router.push({ query: { keyword: this.query.keyword } })
    },
    onChangeReg(date, dateString) {
      this.querySelect = { ...this.querySelect, register_start_time: dateString[0], register_stop_time: dateString[1] }
    },
    onChangeBeMember(date, dateString) {
      this.querySelect = { ...this.querySelect, be_member_start_time: dateString[0], be_member_stop_time: dateString[1] }
    },
    sourceRegisters() {
      this.listService.getMemberSourceRegisters().subscribe(status => {
        this.sourceRegisterList = status
      })
    },
    // 查询
    onSearch() {
      this.$router.push({ query: { ...this.querySelect } })
    },
    // 重置
    onReset() {
      this.querySelect = {}
      this.$router.push({ query: {} })
    },
    onRemoveBind(record) {
      let that = this
      this.$confirm({
        title: '提示信息',
        content: '确认解绑选中的会员关系？',
        onOk() {
          that.listService.removeWechatBind(record.member_id).subscribe(() => {
            console.log('ok')
          })
        },
        onCancel() {}
      })
    },
    edit(record) {
      this.$router.push({ name: 'shop-member-edit', query: { id: record.member_id } })
    },
    addUser() {
      this.$router.push({ name: 'shop-member-add' })
    },
    infoFunc(record) {
      this.$router.push({
        name: 'shop-member-info-basic',
        query: { id: record.member_id }
      })
    },
    moment,
    handleReset() {
      let self = this
      for (let prop in self.form) {
        self.form[prop] = ''
      }
      this.$refs.stSeleter.handleResetItem()
      this.consumption = []
      this.$router.push({ query: {} })
    },
    MembershipTime(date, dateString) {
      this.form.be_member_start_time = dateString[0]
      this.form.be_member_stop_time = dateString[1]
    },
    toggle() {
      this.expand = !this.expand
    },
    onSelectionReset() {
      this.selectedRowKeys = []
      this.selectedRowData = []
    },
    onSelectionChange(keys, selectedRowData) {
      this.selectedRowKeys = keys
      this.selectedRowData = selectedRowData
      this.selectDataList = selectedRowData.map(item => {
        return item.id
      })
    },
    onTableChange(pagination, filters, sorter) {
      this.pagination = pagination
      this.form.size = pagination.pageSize
      this.form.page = pagination.current
      this.$router.push({ query: this.form })
    },
    queryFunc() {
      this.$router.push({ query: this.form })
    }
  }
}
</script>
