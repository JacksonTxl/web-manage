
<template>
  <div class="shop-member-list">
    <st-panel class="mg-t16">
      <div slot="title">
        <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 290px;"/>
      </div>
      <div slot="prepend">
        <div style="background: #F7F9FC; padding: 24px">
          <a-form class="ant-advanced-search-form">
            <a-row :gutter="24">
              <st-sleter v-model="form">
                <div slot="custom" v-if="expand">
                  <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="入会时间：">
                    <a-range-picker @change="MembershipTime"/>
                  </a-form-item>
                  <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="员工跟进">
                    <a-radio-group buttonStyle="solid" v-model="form.followUp">
                      <a-radio-button :value="-1">全部</a-radio-button>
                      <a-radio-button :value="1">有</a-radio-button>
                      <a-radio-button :value="2">无</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </div>
              </st-sleter>
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
                  <a-button type="primary">查询</a-button>
                  <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <st-button type="primary" class="shop-member-list-button">
        <a-icon type="plus"/>添加用户
      </st-button>
      <st-button class="shop-member-list-button">导入用户</st-button>
      <st-button class="shop-member-list-button">加标签</st-button>
      <st-button class="shop-member-list-button">分配员工</st-button>
      <st-button class="shop-member-list-button">批量导出</st-button>
      <st-table
        class="mg-t24"
        :columns="columns"
        :alertSelection="{onReset:onSelectionReset}"
        :rowSelection="{selectedRowKeys:selectedRowKeys,onChange:onSelectionChange}"
        rowKey="id"
        @change="onTableChange"
        :dataSource="tableData"
      >
        <div slot="action" slot-scope="record">
          <a href="javascript:;" @click="infoFunc(text, record)">详情</a>
          <a-divider type="vertical"></a-divider>
          <a href="javascript:;" @click="infoFunc(text, record)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item>分配员工</a-menu-item>
            <a-menu-item>绑实体卡</a-menu-item>
            <a-menu-item>转店</a-menu-item>
            <a-menu-item>冻结用户</a-menu-item>
            <a-menu-item>解除微信绑定</a-menu-item>
          </st-more-dropdown>
        </div>
      </st-table>
    </st-panel>
  </div>
</template>
<script>
import sleter from './list#/seleter.vue'
const tableData = new Array(60).fill(1).map((item, i) => ({ id: i, name: i }))
export default {
  components: {
    'st-sleter': sleter
  },
  data() {
    return {
      expand: false,
      form: {
        grade: '',
        source: '',
        register: [],
        Membership: [],
        followUp: ''
      },
      tableData,
      selectedRowKeys: [],
      columns: [
        { title: '人脸', dataIndex: 'id' },
        { title: '姓名', dataIndex: 'name' },
        { title: '手机号', dataIndex: 'name1' },
        { title: '用户等级', dataIndex: 'name2' },
        { title: '跟进销售', dataIndex: 'name3' },
        { title: '跟进教练', dataIndex: 'name4' },
        { title: '注册时间', dataIndex: 'name5' },
        { title: '成为会员时间', dataIndex: 'name6' },
        { title: '累计消费(元)', dataIndex: 'name7' },
        { title: '操作', width: 140, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  computed: {},
  methods: {
    handleReset() {
      let self = this
      for (let prop in self.form) {
        self.form[prop] = ''
      }
    },
    MembershipTime(date, dateString) {
      this.form.Membership = dateString
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
    onTableChange(pagination) {}
  }
}
</script>
