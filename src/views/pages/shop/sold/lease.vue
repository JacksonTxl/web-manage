<template>
  <st-panel app initial :class="basic()">
    <div slot="title">
      <st-input-search
      placeholder="请输入租赁柜名、会员姓名或手机号查找"
      style="width: 290px;"/>
    </div>
    <st-search-panel>
      <div :class="basic('select')">
        <span style="width:90px;">租赁状态：</span>
        <st-search-radio v-model="leaseStatus" :list="leaseList"/>
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">起租时间：</span>
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="开始日期"
          :showToday="false"
        />
        &nbsp;~&nbsp;
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="结束日期"
          :showToday="false"
        />
      </div>
      <div slot="button">
          <st-button type="primary" @click="onSearch">查询</st-button>
          <st-button class="mgl-8" @click="onReset">重置</st-button>
      </div>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')">
          <st-button type="primary">批量导出</st-button>
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
import { UserService } from '@/services/user.service'
export default {
  name: 'PageShopSoldLease',
  bem: {
    basic: 'page-shop-sold'
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      sold: this.userService.soldEnums$
    }
  },
  computed: {
    leaseList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.sold.sold_cabinet.cabinet_status) return list
      Object.entries(this.sold.sold_cabinet.cabinet_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  data() {
    return {
      columns: [
        {
          title: '商品名称',
          dataIndex: 'product_name',
          scopedSlots: { customRender: 'product_name' }
        }, {
          title: '商品类型',
          dataIndex: 'product_type',
          scopedSlots: { customRender: 'product_type' }
        }, {
          title: '价格',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        }, {
          title: '销量',
          dataIndex: 'number',
          scopedSlots: { customRender: 'number' }
        }, {
          title: '操作',
          dataIndex: 'action',
          width: 140,
          scopedSlots: { customRender: 'action' }
        }],
      list: [],
      leaseStatus: -1
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.list = [
        {
          'id': 1,
          'product_name': '会员卡',
          'product_type': 1,
          'price': '200.1',
          'number': 100
        },
        {
          'id': 12,
          'product_name': '储值卡',
          'product_type': 2,
          'price': '1000',
          'number': 666
        },
        {
          'id': 13,
          'product_name': '私教课',
          'product_type': 3,
          'price': '500',
          'number': 888
        },
        {
          'id': 14,
          'product_name': '课程包',
          'product_type': 4,
          'price': '300',
          'number': 999
        }
      ]
    }
  }
}
</script>
