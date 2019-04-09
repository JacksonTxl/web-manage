<template>
<div>
  <div class="page-shop-sale-list__brand--count mg-t16 pd-x16 pd-y8">
    <span>i</span><span>已选</span>
  </div>
  <st-table
      class="mg-t8"
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="data"
      :rowSelection="rowSelection"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
      <a
        slot="member"
        slot-scope="text,record"
        href="javascript:;"
        @click="name(text,record)"
      >{{text}}</a>
      <a
        slot="admission"
        slot-scope="text,record"
        href="javascript:;"
        @click="name(text,record)"
      >{{text}}</a>
      <a slot="sellStatus" slot-scope="text,record" href="javascript:;" @click="name(text,record)">
        <span
          v-if="text ==='可售卖'"
          style="width:8px;
                 height:8px;
                 display: inline-block;
                 border-radius: 50%;
                 background:rgba(82,196,26,1);"
        ></span>
        <span
          v-if="text ==='停售'"
          style="width:8px;
                 height:8px;
                 display: inline-block;
                 border-radius: 50%;
                 background:rgba(245,34,45,1);"
        ></span>
        {{text}}
        <a-popover title="Title" placement="bottomRight">
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-icon type="exclamation-circle" v-if="text ==='停售'"/>
        </a-popover>
      </a>
      <div slot="action" slot-scope="record">
        <modal-link tag="a" :to="{name:'test'}">打开</modal-link>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
        <st-more-dropdown style="margin-left: 12px;">
          <a-menu-item>转让</a-menu-item>
          <a-menu-item>出售</a-menu-item>
          <a-menu-item>你好</a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>

</div>

</template>

<script>
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

export default {
  name: 'ShopSaleListTable',
  data() {
    return {
      rowSelection,
      data: [
        {
          id: 1,
          member: 'John Brown',
          age: 32,
          type: '期限卡',
          effective: '720天',
          admission: '古美路店天',
          sell: '古美路店天',
          release: '门店',
          sellStatus: '可售卖',
          action: 'New York No. 1 Lake Park'
        },
        {
          id: 2,
          member: 'John Brown',
          age: 32,
          type: '期限卡',
          effective: '720天',
          admission: '古美路店天',
          sell: '古美路店天',
          release: '门店',
          sellStatus: '停售',
          action: 'New York No. 1 Lake Park'
        }
      ],
      columns: [
        {
          title: '会员卡名称',
          dataIndex: 'member',
          scopedSlots: { customRender: 'member' }
          // sorter: (a, b) => a.name.length - b.name.length
        },
        {
          title: '类型',
          dataIndex: 'type',
          sorter: (a, b) => a.name.length - b.name.length
        },
        {
          title: '有效期/有效次数',
          dataIndex: 'effective'
        },
        {
          title: '支持入场门店',
          dataIndex: 'admission',
          scopedSlots: { customRender: 'admission' }
        },
        {
          title: '支持售卖门店',
          dataIndex: 'sell'
        },
        {
          title: '发布渠道',
          dataIndex: 'release'
        },
        {
          title: '售卖状态',
          dataIndex: 'sellStatus',
          scopedSlots: { customRender: 'sellStatus' }
        },
        // {
        //   title: 'Age',
        //   dataIndex: 'age',
        //   sorter: (a, b) => a.age - b.age
        // },
        {
          title: 'action',
          dataIndex: 'action',
          fixed: 'right',
          width: 140,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
