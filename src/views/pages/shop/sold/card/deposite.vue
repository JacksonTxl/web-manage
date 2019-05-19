<template>
  <div :class="basic()">
    <st-search-panel>
        <div style="display: flex;align-items: center;margin:16px 0;">
            <span style="width:70px;">条件1：</span>
            <a-select defaultValue="lucy" style="width: 120px">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
        </div>
        <div style="display: flex;align-items: center;margin:16px 0;">
            <span style="width:70px;">条件2：</span>
            <a-radio-group defaultValue="a" buttonStyle="solid">
            <a-radio-button value="a">Hangzhou</a-radio-button>
            <a-radio-button value="b">Shanghai</a-radio-button>
            <a-radio-button value="c">Beijing</a-radio-button>
            <a-radio-button value="d">Chengdu</a-radio-button>
            </a-radio-group>
        </div>
        <div slot="more">
            <div style="display: flex;align-items: center;margin:16px 0;">
            <span style="width:70px;">条件3：</span>
            <a-select defaultValue="lucy" style="width: 120px">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
            </div>
            <div style="display: flex;align-items: center;margin:16px 0;">
            <span style="width:70px;">条件4：</span>
            <a-radio-group defaultValue="a" buttonStyle="solid">
                <a-radio-button value="a">Hangzhou</a-radio-button>
                <a-radio-button value="b">Shanghai</a-radio-button>
                <a-radio-button value="c">Beijing</a-radio-button>
                <a-radio-button value="d">Chengdu</a-radio-button>
            </a-radio-group>
            </div>
        </div>
        <div slot="button">
            <st-button type="primary">查询1</st-button>
            <st-button class="mgl-8">重置1</st-button>
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
      data,
      columns
    }
  }
}
</script>
