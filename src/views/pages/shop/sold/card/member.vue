<template>
  <div :class="basic()">
    <st-search-panel>
        <div style="display: flex;align-items: center;margin:16px 0;">
          <span style="width:90px;">会员卡类型：</span>
          <st-search-radio v-model="searchData.card_type" :list="cardTypeList"/>
        </div>
        <div style="display: flex;align-items: center;margin:16px 0;">
          <span style="width:90px;">售卡状态：</span>
          <st-search-radio v-model="searchData.card_status" :list="cardSaleStatusList"/>
        </div>
        <div slot="more">
          <div style="display: flex;align-items: center;margin:16px 0;">
            <span style="width:90px;">开卡状态：</span>
            <st-search-radio v-model="searchData.is_open" :list="cardOpenStatusList"/>
          </div>
          <div style="display: flex;align-items: center;margin:16px 0;">
            <span style="width:90px;">开卡时间：</span>
            <st-search-radio v-model="searchData.is_open" :list="cardOpenStatusList"/>
        </div>
        </div>
        <div slot="button">
            <st-button type="primary">查询</st-button>
            <st-button class="mgl-8">重置</st-button>
        </div>
    </st-search-panel>
    <div :class="basic('content')">
        <div :class="basic('content-batch')">
            <st-button type="primary" class="mgr-8">批量导出</st-button>
            <st-button class="mgr-8">批量导出</st-button>
            <st-button type="primary" class="mgr-8">批量导出</st-button>
            <st-button class="mgr-8">批量导出</st-button>
            <st-button type="primary" class="mgr-8">批量导出</st-button>
            <st-button type="primary" class="mgr-8">批量导出</st-button>
        </div>
        <div :class="basic('table-select-info')">
            <st-icon type="weibo" />
            <span class="mgr-8">已选 <i>2</i> / 10 条数据</span>
            <a href="javascript:void(0)">删除</a>
        </div>
        <div :class="basic('table')">
            <a-table :columns="columns" :dataSource="data" >
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
    </div>
  </div>
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
  name: 'PageShopSoldCardMemberList',
  bem: {
    basic: 'page-shop-sold'
  },
  data() {
    return {
      // 会员卡类型
      cardTypeList: [
        { value: -1, label: '全部' },
        { value: 1, label: '期限卡' },
        { value: 2, label: '会员卡' }
      ],
      // 售卡状态
      cardSaleStatusList: [
        { value: 1, label: '有效' },
        { value: 2, label: '失效' },
        { value: 3, label: '已冻结' },
        { value: 4, label: '即将到期' }
      ],
      // 开卡状态
      cardOpenStatusList: [
        { value: -1, label: '全部' },
        { value: 1, label: '已开卡' },
        { value: 2, label: '未开卡' }
      ],
      searchData: {
        card_type: -1,
        card_status: 1,
        is_open: -1,
        start_time: '',
        end_time: '',
        size: 20,
        page: 1
      },
      data,
      columns
    }
  }
}
</script>
