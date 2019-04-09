<template>
  <div>
    <st-button type="primary">
      <a-icon type="plus"/>新增私教课程
    </st-button>
    <div style="display: inline-block;float: right;">
      <a-select defaultValue="所有类型" style="width: 184px;margin-left:24px" @change="handleChange">
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select defaultValue="所有类型" style="width: 184px;margin-left:24px" @change="handleChange">
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select defaultValue="所有类型" style="width: 184px;margin-left:24px" @change="handleChange">
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
    </div>
    <a-table :columns="columns" :dataSource="data" @change="onChange" :scroll="{ x: 1300 }">
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
      <a
        slot="sellStatus"
        slot-scope="text,record"
        href="javascript:;"
        @click="name(text,record)"
      >{{text}}</a>
      <div slot="action" slot-scope="record">
        <modal-link tag="a" :to="{name:'test'}">打开</modal-link>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
      </div>
    </a-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
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
          member: 'John Brown',
          age: 32,
          type: '期限卡',
          effective: '720天',
          admission: '古美路店天',
          sell: '古美路店天',
          release: '门店',
          sellStatus: '可售卖',
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
          width: 120,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    name(text, record) {
      console.log(text, record)
    },
    onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    onDelete(record) {
      console.log('delete ', record)
    },
    onTableChange(pagination) {
      this.$router.push({
        query: {
          p: pagination.current
        }
      })
      console.log('pagination', pagination)
    }
  }
}
</script>
