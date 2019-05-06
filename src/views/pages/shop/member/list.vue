
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
              <st-seleter v-model="form" ref="stSeleter">
                <div slot="custom" v-if="expand">
                  <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="入会时间：">
                    <a-range-picker
                      v-model="consumption"
                      v-if="form.low_consumption && form.high_consumption"
                      :defaultValue="[moment(form.low_consumption, dateFormat), moment(form.high_consumption, dateFormat)]"
                      @change="MembershipTime"
                    />
                    <a-range-picker v-else @change="MembershipTime" v-model="consumption"/>
                  </a-form-item>
                  <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="员工跟进">
                    <a-radio-group buttonStyle="solid" v-model="form.follow_salesman">
                      <a-radio-button value="-1">全部</a-radio-button>
                      <a-radio-button value="1">有</a-radio-button>
                      <a-radio-button value="2">无</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </div>
              </st-seleter>
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
      <st-button type="primary" class="shop-member-list-button">
        <modal-link tag="a" :to=" { name: 'shop-add-user'}">添加用户</modal-link>
      </st-button>
      <st-button class="shop-member-list-button">导入用户</st-button>
      <st-button class="shop-member-list-button">
        <modal-link tag="a" :to=" { name: 'shop-add-lable'}">加标签</modal-link>
      </st-button>
      <a-popover placement="bottom">
        <template slot="content">
          <p>
            <modal-link tag="a" :to=" { name: 'shop-distribution-coach'}">分配教练</modal-link>
          </p>
          <p>
            <modal-link tag="a" :to=" { name: 'shop-distribution-ales'}">分配销售</modal-link>
          </p>
        </template>
        <st-button class="shop-member-list-button">分配员工</st-button>
      </a-popover>

      <st-button class="shop-member-list-button">批量导出</st-button>
      <st-table
        class="mg-t24"
        :columns="columns"
        :alertSelection="{onReset:onSelectionReset}"
        :rowSelection="{selectedRowKeys:selectedRowKeys,onChange:onSelectionChange}"
        rowKey="id"
        @change="onTableChange"
        :dataSource="tableData"
        :pagination="pagination"
      >
        <div slot="action" slot-scope="text">{{text}}</div>
        <div slot="action" slot-scope="record">
          <a href="javascript:;" @click="infoFunc( record)">详情</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;">编辑</a>
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item>
              <modal-link tag="a" :to=" { name: 'shop-add-user'}">分配员工</modal-link>
              <!-- <modal-link tag="a" :to=" { name: 'shop-distribution-coach'}">分配教练</modal-link>
              <modal-link tag="a" :to=" { name: 'shop-distribution-ales'}">分配销售</modal-link>-->
            </a-menu-item>
            <a-menu-item>
              <modal-link tag="a" :to=" { name: 'shop-binding-entity-card'}">绑实体卡</modal-link>
            </a-menu-item>
            <a-menu-item>
              <modal-link tag="a" :to=" { name: 'shop-missing-card'}">遗失补卡</modal-link>
            </a-menu-item>
            <a-menu-item>转店</a-menu-item>
            <a-menu-item>
              <modal-link tag="a" :to=" { name: 'shop-frozen'}">冻结用户</modal-link>
            </a-menu-item>
            <a-menu-item>解除微信绑定</a-menu-item>
          </st-more-dropdown>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>
import { ListService } from './list.service'
import StSeleter from './list#/seleter.vue'
import moment from 'moment'
// const tableData = new Array(60).fill(1).map((item, i) => ({ id: i, name: i }))
export default {
  serviceInject() {
    return {
      aService: ListService
    }
  },
  rxState() {
    return {
      memberListInfo: this.aService.memberListInfo$
    }
  },
  components: {
    StSeleter
  },
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      expand: false,
      consumption: [],
      form: {
        member_level: '',
        register_type: '',
        start_time: '',
        stop_time: '',
        low_consumption: '',
        high_consumption: '',
        follow_salesman: '',
        keyword: '',
        current_page: '',
        size: 20
      },
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      tableData: [],
      selectedRowKeys: [],
      columns: [
        { title: '人脸', dataIndex: 'id' },
        { title: '姓名', dataIndex: 'member_name' },
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
    // if (this.$route.query) {
    // current: 1,
    // pageSize: 10,
    // total: 50
    this.pageFilter(this.memberListInfo)
    this.form = { ...this.$route.query }
    // }
  },
  methods: {
    moment,
    pageFilter(data) {
      this.tableData = data.members_list
      this.pagination.current = data.page.current_page
      this.pagination.pageSize = data.page.size
      this.pagination.total = data.page.total_counts
      this.form.size = this.pagination.pageSize
      this.form.current_page = this.pagination.current
    },
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
      this.form.low_consumption = dateString[0]
      this.form.high_consumption = dateString[1]
    },
    toggle() {
      this.expand = !this.expand
    },
    onSelectionReset() {
      this.selectedRowKeys = []
    },
    onSelectionChange(keys) {
      this.selectedRowKeys = keys
    },
    onTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter)
      this.pagination = pagination
      this.form.size = pagination.pageSize
      this.form.current_page = pagination.current
      this.$router.push({ query: this.form })
    },
    queryFunc() {
      console.log(this.form)
      this.$router.push({ query: this.form })
    }
  }
}
</script>
