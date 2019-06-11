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
          <st-button type="primary">查询</st-button>
          <st-button class="mgl-8">重置</st-button>
      </div>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')">
          <st-button type="primary">批量导出</st-button>
      </div>
      <st-table
      rowKey="id"
      :columns="columns"
      :dataSource="list">
        <div slot="action">
          <a>续租</a>
          <a-divider type="vertical"></a-divider>
          <a>退款</a>
          <a-divider type="vertical"></a-divider>
          <a>转让</a>
          <a-divider type="vertical"></a-divider>
          <a>查看合同</a>
        </div>
      </st-table>
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
          title: '租赁柜号',
          dataIndex: 'serial_num',
          scopedSlots: { customRender: 'serial_num' }
        }, {
          title: '剩余天数',
          dataIndex: 'remain_days',
          scopedSlots: { customRender: 'remain_days' }
        }, {
          title: '租赁天数',
          dataIndex: 'lease_days',
          scopedSlots: { customRender: 'lease_days' }
        }, {
          title: '姓名',
          dataIndex: 'member_name',
          scopedSlots: { customRender: 'member_name' }
        }, {
          title: '手机号',
          dataIndex: 'mobile',
          scopedSlots: { customRender: 'mobile' }
        }, {
          title: '状态',
          dataIndex: 'lease_status',
          scopedSlots: { customRender: 'lease_status' }
        }, {
          title: '到期日期',
          dataIndex: 'end_time',
          scopedSlots: { customRender: 'end_time' }
        }, {
          title: '起租日期',
          dataIndex: 'start_time',
          scopedSlots: { customRender: 'start_time' }
        }, {
          title: '销售人员',
          dataIndex: 'sale_name',
          scopedSlots: { customRender: 'sale_name' }
        }, {
          title: '关联订单号',
          dataIndex: 'order_id',
          scopedSlots: { customRender: 'order_id' }
        }, {
          title: '操作',
          dataIndex: 'action',
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
          'serial_num': 'A1',
          'remain_days': 30,
          'lease_days': 180,
          'member_name': '王佳琳',
          'mobile': '13800000009',
          'end_time': '2019-01-22',
          'lease_status': 1,
          'start_time': '2019-01-22',
          'sale_name': '航潮',
          'order_id': 89849784787,
          'id': 121124112412412
        },
        {
          'serial_num': 'A1',
          'remain_days': 30,
          'lease_days': 180,
          'member_name': '王佳琳',
          'mobile': '13800000009',
          'end_time': '2019-01-22',
          'lease_status': 1,
          'start_time': '2019-01-22',
          'sale_name': '航潮',
          'order_id': 89849784787,
          'id': 121124122412412
        },
        {
          'serial_num': 'A1',
          'remain_days': 30,
          'lease_days': 180,
          'member_name': '王佳琳',
          'mobile': '13800000009',
          'end_time': '2019-01-22',
          'lease_status': 2,
          'start_time': '2019-01-22',
          'sale_name': '航潮',
          'order_id': 89849784787,
          'id': 121124412412412
        },
        {
          'serial_num': 'A1',
          'remain_days': 30,
          'lease_days': 180,
          'member_name': '王佳琳',
          'mobile': '13800000009',
          'end_time': '2019-01-22',
          'lease_status': 1,
          'start_time': '2019-01-22',
          'sale_name': '航潮',
          'order_id': 89849784787,
          'id': 121125412412412
        }
      ]
    }
  }
}
</script>
