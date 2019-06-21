
<template>
  <div class="shop-member-list">
    <st-panel class="mg-t16">
      <div slot="title">
        <st-input-search placeholder="可输入姓名、手机号、卡号" v-model="form.keyword" style="width: 290px;"/>
      </div>
      <div slot="prepend">
        <div style="background: #F7F9FC; padding: 24px">
          <a-form class="ant-advanced-search-form">
            <a-row :gutter="24">
              <st-select v-model="form" ref="stSeleter">
                <div slot="custom" v-if="expand">
                  <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="入会时间：">
                    <a-range-picker
                      v-model="consumption"
                      v-if="form.be_member_start_time && form.be_member_stop_time"
                      :defaultValue="[moment(form.be_member_start_time, dateFormat), moment(form.be_member_stop_time, dateFormat)]"
                      @change="MembershipTime"
                    />
                    <a-range-picker v-else @change="MembershipTime" v-model="consumption"/>
                  </a-form-item>
                  <a-form-item
                    :label-col="{span:2}"
                    :wrapper-col="{ span: 12 }"
                    :label="memberEnums.is_follow.description"
                  >
                    <a-radio-group buttonStyle="solid" v-model="form.is_follow">
                      <a-radio-button value="-1">全部</a-radio-button>
                      <a-radio-button
                        v-for="(item,key,index) in memberEnums.is_follow.value"
                        :value="key"
                        :key="index"
                      >{{item}}</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </div>
              </st-select>
            </a-row>
            <a-row>
              <a-col :span="24" class="shop-member-list-handel">
                <div>
                  <a @click="toggle">
                    <span>{{!expand?'展开':'收起'}}</span>
                    <a-icon :type="expand ? 'up' : 'down'"/>
                  </a>
                </div>
                <div>
                  <a-button type="primary" @click="queryFunc">查询</a-button>
                  <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <st-button type="primary" class="shop-member-list-button" v-if="auth.add">
        <a href="javascript:;" @click="addUser()">添加用户</a>
      </st-button>
      <st-button class="shop-member-list-button" v-if="auth.import">导入用户</st-button>
      <st-button
        v-if="auth.tag"
        class="shop-member-list-button"
        :disabled="selectedRowData.length > 0 ? false :true"
      >
        <modal-link
          v-if="selectedRowData.length > 0"
          tag="a"
          :to=" { name: 'shop-add-lable',props:{selectedRowData:selectedRowData}}"
        >加标签</modal-link>
        <span v-else>加标签</span>
      </st-button>
      <a-popover placement="bottom">
        <template slot="content">
          <p v-if="auth.bindCoach">
            <modal-link
              tag="a"
              :to=" { name: 'shop-distribution-coach', props:{selectedRowData:selectDataList}}"
            >分配教练</modal-link>
          </p>
          <p v-if="auth.bindSalesman">
            <modal-link
              tag="a"
              :to=" { name: 'shop-distribution-ales', props:{selectedRowData:selectDataList}}"
            >分配销售</modal-link>
          </p>
        </template>
        <st-button
          v-if="auth.bindCoach && auth.bindSalesman"
          class="shop-member-list-button"
          :disabled="selectedRowData.length > 0 ? false :true"
        >分配员工</st-button>
      </a-popover>
      <st-button v-if="auth.export" class="shop-member-list-button">批量导出</st-button>
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
              <modal-link tag="a" :to=" { name: 'shop-distribution-coach'}">分配教练</modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['shop:member:member|bind_salesman']">
              <modal-link
                tag="a"
                :to=" { name: 'shop-distribution-ales',props: {selectedRowData: record.id}}"
              >分配销售</modal-link>
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
import StSelect from './list#/select.vue'
import moment from 'moment'
export default {
  serviceInject() {
    return {
      aService: ListService,
      userService: UserService
    }
  },
  rxState() {
    /**
     * @type {UserService}
     */
    const user = this.userService
    return {
      memberListInfo: this.aService.memberListInfo$,
      reserveEnums: user.reserveEnums$,
      memberEnums: user.memberEnums$,
      auth: this.aService.auth$
    }
  },
  components: {
    StSelect
  },
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      expand: false,
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
      selectDataList: [],
      selectedRowKeys: [],
      selectedRowData: [],
      columns: [
        { title: '人脸', dataIndex: '' },
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
  computed: {},
  created() {
    this.form = { ...this.$route.query }
  },
  methods: {
    onRemoveBind(record) {
      console.log(record)
      let that = this
      this.$confirm({
        title: '提示信息',
        content: '确认解绑选中的会员关系？',
        onOk() {
          that.aService.removeWechatBind(record.member_id).subscribe(() => {
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
      console.log(pagination, filters, sorter)
      this.pagination = pagination
      this.form.size = pagination.pageSize
      this.form.page = pagination.current
      this.$router.push({ query: this.form })
    },
    queryFunc() {
      console.log(this.form)
      this.$router.push({ query: this.form })
    }
  }
}
</script>
