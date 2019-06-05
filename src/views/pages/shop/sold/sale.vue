<template>
  <st-panel app initial :class="basic()">
    <div slot="title">
      <st-input-search
      placeholder="课程包名称"
      style="width: 290px;"/>
    </div>
    <div :class="basic('content')">
      <div :class="sale('operation')">
        <st-button type="primary">批量导出</st-button>
        <a-select :class="sale('select')" style="width: 160px">
          <a-select-option :value="-1">全部分类</a-select-option>
          <a-select-option
          v-for="(item,index) in cardSaleStatusList"
          :key="index"  :value="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
      <div :class="basic('table-select-info')">
          <st-icon type="weibo" />
          <span class="mgl-8 mgr-16">已选 <i :class="basic('table-select-number')">1</i> / 10 条数据</span>
          <a href="javascript:void(0)">删除</a>
      </div>
      <a-table :columns="columns" :dataSource="data">
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;">Invite 一 {{record.name}}</a>
          <a-divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <a-divider type="vertical" />
          <a href="javascript:;" class="ant-dropdown-link">
            More actions <a-icon type="down" />
          </a>
        </span>
      </a-table>
    </div>
  </st-panel>
</template>

<script>
const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age'
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address'
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' }
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer']
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser']
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher']
}]

export default {
  name: 'PageShopSoldLease',
  bem: {
    basic: 'page-shop-sold',
    sale: 'page-shop-sold-sale'
  },
  data() {
    return {
      // 售卡状态
      cardSaleStatusList: [
        { value: -1, label: '全部' },
        { value: 1, label: '有效' },
        { value: 2, label: '失效' },
        { value: 3, label: '已冻结' },
        { value: 4, label: '即将到期' }
      ],
      course_status: 1,
      data,
      columns
    }
  },
  mounted() {
    this.$modalRouter.push({
      name: 'sold-deal-sale'
    })
  }
}
</script>
