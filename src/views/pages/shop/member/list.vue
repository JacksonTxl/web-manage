
<template>
  <div class="shop-member-list">
    <st-panel class="mg-t16">
      <div slot="title">
        <st-input-search placeholder="可输入姓名、手机号、卡号" v-model="querySelect.keyword" @search="onSearch" style="width: 290px;"/>
      </div>

      <div slot="prepend">
        <st-search-panel>
          <div :class="basic('select')">
            <span style="width:90px;">用户级别：</span>
            <st-search-radio label="" @change="onSearch" v-model="querySelect.member_level" :list="memberLevel"/>
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">来源方式：</span>
            <st-search-radio label="" @change="onSearch" v-model="querySelect.register_way" :list="sourceList"/>
          </div>
          <div :class="basic('select')">
            <span style="width:90px;">注册时间：</span>
            <a-range-picker :defaultValue="defaultRegValue" v-model="register_time" @change="onChangeReg">
            </a-range-picker>
          </div>
          <div slot="more">
            <div :class="basic('select')">
              <span style="width:90px;">入会时间：</span>
              <a-range-picker :defaultValue="defaultBeMemberValue" v-model="enter_time" @change="onChangeBeMember">
              </a-range-picker>
            </div>
            <div :class="basic('select')">
              <span style="width:90px;">员工跟进：</span>
              <st-search-radio label="" @change="onSearch" v-model="querySelect.is_follow" :list="isFollow"/>
            </div>
          </div>
          <div slot="button">
            <st-button type="primary" @click="onSearch">查询</st-button>
            <st-button class="mgl-8" @click="onReset">重置</st-button>
          </div>
        </st-search-panel>
      </div>
      <div class="mg-t16">
        <st-button type="primary" @click="addUser()" class="shop-member-list-button" v-if="auth.add" icon='add'>
          添加用户
        </st-button>
        <st-button class="shop-member-list-button" v-if="auth.import">导入用户</st-button>
        <st-button
          v-if="auth.tag"
          class="shop-member-list-button"
          :disabled="!selectedRows.length"
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
            :disabled="selectedRows.length > 0 ? false :true"
          >分配员工</st-button>
        </a-popover>
        <st-button v-if="auth.export" :disabled='isSelectedDisabled' class="shop-member-list-button">批量导出</st-button>
      </div>
      <st-table
        class="mg-t24"
        :columns="columns"
        :scroll="{x:1280}"
        :alertSelection="{onReset:onSelectionReset}"
        :rowSelection="{selectedRowKeys,onChange:onSelectionChange}"
        rowKey="member_id"
        :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
        @change="onTableChange"
        :dataSource="list"
      >
        <div slot="member_name" slot-scope="text,record">
          <a href="javascript:;" v-if="record.auth['shop:member:member|get']" @click="infoFunc(record)">{{text}}</a>
          <span v-else>{{text}}</span>
        </div>
        <div slot="action" slot-scope="record">
          <st-table-actions>
            <a v-if="record.auth['shop:member:member|get']" @click="infoFunc(record)">详情</a>
            <a v-if="record.auth['shop:member:member|edit']" @click="edit(record)">编辑</a>
            <a v-if="record.auth['shop:member:member|bind_coach']" @click="onDistributionCoach(record)">分配教练</a>
            <a v-if="record.auth['shop:member:member|bind_salesman']" @click="onDistributionSale(record)">分配销售</a>
            <a v-if="record.auth['shop:member:member|bind_card']" v-modal-link="{ name: 'shop-binding-entity-card', props:{record:record}}">绑实体卡</a>
            <a v-if="record.auth['shop:member:member|rebind_card']" v-modal-link="{ name: 'shop-missing-card', props:{record:record}}">重绑实体卡</a>
            <a v-if="record.auth['shop:member:member|transfer']" v-modal-link="{ name: 'shop-transfer-shop', props:{record:record}}">转店</a>
            <a v-if="record.auth['shop:member:member|frozen']" v-modal-link="{ name: 'shop-frozen', props:{record:record}}">冻结用户</a>
            <a v-if="record.auth['shop:member:member|unbind_wechat']" @click="onRemoveBind(record)">解除微信绑定</a>
          </st-table-actions>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config.ts'

export default {
  name: 'memberList',
  mixins: [tableMixin],
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
    const user = this.userService
    return {
      shopMemberEnums: user.shopMemberEnums$,
      reserveEnums: user.reserveEnums$,
      memberEnums: user.memberEnums$,
      auth: this.listService.auth$,
      query: this.routeService.query$,
      list: this.listService.list$,
      page: this.listService.page$
    }
  },
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      expand: false,
      sourceRegisterList: [],
      consumption: [],
      querySelect: {},
      register_time: [],
      enter_time: [],
      selectDataList: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  computed: {
    columns,
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
    this.setSearchData()
  },
  methods: {
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
      this.$router.push({ force: true, query: { ...this.querySelect } })
    },
    // 重置
    onReset() {
      this.querySelect = {
        keyword: '',
        member_level: -1,
        register_way: -1,
        register_start_time: '',
        register_stop_time: '',
        be_member_start_time: '',
        be_member_stop_time: '',
        is_follow: -1,
        page: 1,
        size: 20
      }
      this.register_time = []
      this.enter_time = []
      this.$router.push({ force: true, query: { ...this.querySelect } })
    },
    // 设置searchData
    setSearchData() {
      this.querySelect = this.query
      if (!this.querySelect.register_start_time || !this.querySelect.register_stop_time) {
        this.register_time = []
      } else {
        this.register_time = [moment(this.querySelect.register_start_time), cloneDeep(moment(this.querySelect.register_stop_time))]
      }
      if (!this.querySelect.register_start_time || !this.querySelect.register_stop_time) {
        this.enter_time = []
      } else {
        this.enter_time = [moment(this.querySelect.be_member_start_time), cloneDeep(moment(this.querySelect.be_member_start_time))]
      }
    },
    // 分配教练
    onDistributionCoach(record) {
      this.$confirm({
        title: '提示信息',
        content: '该教练已经存在跟进教练，是否确认替换？',
        onOk: () => {
          this.$modalRouter.push({
            name: 'shop-distribution-coach',
            props: {
              memberIds: [record.member_id]
            },
            on: {
              success: () => {
                this.$router.push({ force: true })
              }
            }
          })
        },
        onCancel() {}
      })
    },
    // 分配销售
    onDistributionSale(record) {
      this.$confirm({
        title: '提示信息',
        content: '该教练已经存在跟进销售，是否确认替换？',
        onOk: () => {
          this.$modalRouter.push({
            name: 'shop-distribution-sale',
            props: {
              memberIds: [record.member_id]
            },
            on: {
              success: () => {
                this.$router.push({ force: true })
              }
            }
          })
        },
        onCancel() {}
      })
    },
    onRemoveBind(record) {
      this.$confirm({
        title: '提示信息',
        content: '确认解绑选中的会员关系？',
        onOk() {
          this.listService.removeWechatBind(record.member_id).subscribe(() => {
            this.$router.push({ force: true })
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
      this.selectedRows = []
    },
    onSelectionChange(keys, selectedRows) {
      this.selectedRowKeys = keys
      this.selectedRows = selectedRows
      this.selectDataList = selectedRows.map(item => {
        return item.id
      })
    },
    onTableChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize } })
    },
    queryFunc() {
      this.$router.push({ query: this.form })
    }
  }
}
</script>
