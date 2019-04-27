
<template>
  <div class="shop-member-list">
    <st-panel class="mg-t16">
      <div slot="title">
        <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 290px;"/>
      </div>
      <div slot="prepend">
        <div style="background: #F7F9FC; padding: 24px">
          <a-form class="ant-advanced-search-form" :form="form">
            <a-row :gutter="24">
              <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="用户等级">
                <a-radio-group buttonStyle="solid" v-model="form.value">
                  <a-radio-button value="a">全部用户</a-radio-button>
                  <a-radio-button value="b">潜在用户</a-radio-button>
                  <a-radio-button value="c">正式会员</a-radio-button>
                  <a-radio-button value="d">流失会员</a-radio-button>
                </a-radio-group>
              </a-form-item>

              <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="来源方式">
                <a-radio-group buttonStyle="solid" v-model="form.source">
                  <a-radio-button value="a">全部</a-radio-button>
                  <a-radio-button value="b">外出获取</a-radio-button>
                  <a-radio-button value="c">直接到访</a-radio-button>
                  <a-radio-button value="d">小程序</a-radio-button>
                  <a-radio-button value="e">多人拼团</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="注册时间">
                <a-range-picker @change="onChange"/>
              </a-form-item>
              <a-form-item
                v-if="expand"
                :label-col="{span:2}"
                :wrapper-col="{ span: 12 }"
                label="入会时间："
              >
                <a-range-picker @change="onChange"/>
              </a-form-item>
              <a-form-item
                v-if="expand"
                :label-col="{span:2}"
                :wrapper-col="{ span: 12 }"
                label="员工跟进"
              >
                <a-radio-group buttonStyle="solid" v-model="form.value">
                  <a-radio-button value="a">全部</a-radio-button>
                  <a-radio-button value="b">有</a-radio-button>
                  <a-radio-button value="c">无</a-radio-button>
                </a-radio-group>
              </a-form-item>
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
const tableData = new Array(60).fill(1).map((item, i) => ({ id: i, name: i }))
export default {
  data() {
    return {
      expand: false,

      form: {
        value: '',
        source: ''
      },

      tableData,
      selectedRowKeys: [],
      columns: [
        { title: '人脸', dataIndex: 'id' },
        { title: '姓名', dataIndex: 'name' },
        { title: '手机号', dataIndex: 'name' },
        { title: '用户等级', dataIndex: 'name' },
        { title: '跟进销售', dataIndex: 'name' },
        { title: '跟进教练', dataIndex: 'name' },
        { title: '注册时间', dataIndex: 'name' },
        { title: '成为会员时间', dataIndex: 'name' },
        { title: '累计消费(元)', dataIndex: 'name' },
        { title: '操作', width: 140, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  computed: {},
  methods: {
    handleReset() {},
    onChange(date, dateString) {
      console.log(date, dateString)
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
