<template>
  <st-panel app initial :class="basic()">
    <div slot="title" :class="sale('search')">
      <st-input-search
      placeholder="请输入商品名查找"
      style="width: 290px;"/>
      <a-select :class="sale('select')" v-model="saleType" style="width: 160px">
        <a-select-option
        v-for="(item,index) in saleTypeList"
        :key="index"
        :value="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <div :class="basic('content')">
      <st-table
      rowKey="id"
      :columns="columns"
      :dataSource="list">
        <template slot="product_name" slot-scope="text">
          {{text}}
        </template>
        <template slot="product_type" slot-scope="text">
          {{text}}
        </template>
        <template slot="price" slot-scope="text">
          {{text}}
        </template>
        <template slot="number" slot-scope="text">
          {{text}}
        </template>
        <div slot="action" slot-scope="text,record">
          <!-- <a @click="onPay(record)">收钱</a> -->
          <a @click="onAdvance(record)">加定金</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onCabinet(record)">储物柜</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onDeposite(record)">储值卡签单</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onSale(record)">签单</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onCourse(record)">课程包</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onPersonalCourse(record)">私教课</a>
        </div>
      </st-table>
    </div>
  </st-panel>
</template>

<script>
import { ListService } from './list.service'
export default {
  name: 'PageShopSoldLease',
  bem: {
    basic: 'page-shop-sold',
    sale: 'page-shop-sold-sale'
  },
  serviceInject() {
    return {
      listService: ListService
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
      saleTypeList: [
        { value: -1, label: '全部' },
        { value: 1, label: '会员卡' },
        { value: 2, label: '私教课' },
        { value: 3, label: '课程包' },
        { value: 4, label: '储值卡' },
        { value: 5, label: '租赁' }
      ],
      saleType: -1
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
    },
    onCabinet(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-cabinet',
        props: {
          id: '0'
        },
        on: {
          success: res => {
            if (res.type === 'create') {
              // 创建订单
              console.log(res.orderId, 1)
            } else if (res.type === 'createPay') {
              // 创建订单并支付
              console.log(res.orderId, 2)
            }
          }
        }
      })
    },
    onDeposite(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-deposite-card',
        props: {
          id: '1'
        },
        on: {
          success: res => {
            if (res.type === 'create') {
              // 创建订单
              console.log(res.orderId, 1)
            } else if (res.type === 'createPay') {
              // 创建订单并支付
              this.$modalRouter.push({
                name: 'sold-deal-gathering',
                props: {
                  order_id: res.orderId,
                  type: 'deposit'
                },
                on: {
                  ok: res => {
                    console.log(res)
                  }
                }
              })
            }
          }
        }
      })
    },
    onPay(record) {
      this.$modalRouter.push({
        name: 'sold-deal-gathering'
      })
    },
    onAdvance() {
      this.listService.addAdvance({
        member_id: 20554589995205,
        sale_id: 29338200768663,
        pay_price: `${Date.now() % 10}`,
        pay_channel: 1,
        contract_number: 'C62',
        description: '11'
      }).subscribe()
    },
    onSale(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-member-card',
        props: {
          id: '1'
        },
        on: {
          success: () => {
            console.log('success')
          }
        }
      })
    },
    onCourse(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-course',
        props: {
          id: '1'
        },
        on: {
          success: () => {
            console.log('success')
          }
        }
      })
    },
    onPersonalCourse(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-personal-course',
        props: {
          id: '1'
        },
        on: {
          success: () => {
            console.log('success')
          }
        }
      })
    }
  }
}
</script>
