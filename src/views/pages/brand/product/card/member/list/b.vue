<template>
  <div class="pages-brand-product-card-list-b">
    <st-button type="primary">
      <a-icon type="plus"/>新增私教课程
    </st-button>
    <div class="pages-brand-product-card-list-b-box">
      <a-select
        defaultValue="所有类型"
        class="pages-brand-product-card-list-b-box-select"
        @change="handleChange"
      >
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select
        defaultValue="所有类型"
        class="pages-brand-product-card-list-b-box-select"
        @change="handleChange"
      >
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select
        defaultValue="所有类型"
        class="pages-brand-product-card-list-b-box-select"
        @change="handleChange"
      >
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
    </div>
    <st-table
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
      <!-- 会员卡名称start -->
      <a
        slot="member"
        slot-scope="text,record"
        href="javascript:;"
        @click="memberFun(text,record)"
      >{{text}}</a>
      <!-- 会员卡名称end -->
      <!-- 支持入场门店start -->
      <a slot="admission" slot-scope="text,record" href="javascript:;" @click="name(text,record)">
        <a-popover placement="bottomRight" :overlayStyle="{width:'520px'}" v-if="record.columns1">
          <template slot="content">
            <a-table
              bordered
              :dataSource="record.data1"
              :columns="record.columns1"
              :pagination="false"
              rowKey="id"
            ></a-table>
          </template>
          {{text}}
        </a-popover>
        <span v-else class="admission">{{text}}</span>
      </a>

      <!-- 支持入场门店end -->
      <!-- 售卖状态start -->
      <a slot="sellStatus" slot-scope="text,record" href="javascript:;" @click="name(text,record)">
        <span v-if="text ==='可售卖'" class="pages-brand-product-card-list-b-marketable"></span>
        <span v-if="text ==='停售'" class="pages-brand-product-card-list-b-stopSell"></span>
        {{text}}
        <a-popover
          title="操作人:AAA   操作时间:2018/10/10 23:59:59"
          placement="bottomRight"
          :overlayStyle="{width:'336px'}"
        >
          <template slot="content">
            <p>停售原因是不想停售原因是不想停售原因是不想停售原因是不想停售原因是不想</p>
          </template>
          <a-icon type="exclamation-circle" v-if="text ==='停售'"/>
        </a-popover>
      </a>
      <!-- 售卖状态end -->
      <!-- 操作end -->
      <div slot="action" slot-scope="record">
        <a href="javascript:;" @click="info(record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a href="javascript:;">上架</a>
        <a href="javascript:;" v-if="false">恢复售卖</a>
        <template v-if="true">
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item>转让</a-menu-item>
            <a-menu-item>出售</a-menu-item>
            <a-menu-item>你好</a-menu-item>
          </st-more-dropdown>
        </template>
      </div>
      <!-- 操作end -->
    </st-table>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      data: [
        {
          id: 1,
          member: 'John Brown',
          age: 32,
          type: '期限卡',
          effective: '720天',
          admission: '多店（共3门店）',
          sell: '古美路店天',
          release: '门店',
          sellStatus: '可售卖',
          action: 'New York No. 1 Lake Park',
          columns1: [
            {
              title: '省',
              dataIndex: 'member',
              scopedSlots: { customRender: 'member' }
            },
            {
              title: '市',
              dataIndex: 'type'
            },
            {
              title: '区',
              dataIndex: 'effective'
            },
            {
              title: '门店名称',
              dataIndex: 'admission'
            }
          ],
          data1: [
            {
              id: 1,
              member: '徐汇1店',
              age: '徐汇1店',
              type: '徐汇1店',
              effective: '徐汇1店',
              admission: '徐汇1店'
            },
            {
              id: 2,
              member: '徐汇1店',
              age: '徐汇1店',
              type: '徐汇1店',
              effective: '徐汇1店',
              admission: '徐汇1店'
            }
          ]
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
  },
  methods: {
    // 会员卡名称点击事件
    memberFun(text, record) {
      console.log(text, record, '会员卡名称点击事件')
    },
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
