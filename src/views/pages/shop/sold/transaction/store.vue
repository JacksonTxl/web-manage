<template>
  <div :class="basic()">
    <div :class="basic('list')">
      <div :class="basic('head')">
        <p :class="basic('title')">查看商品</p>
        <st-input-search
          style="width: 291px"
          v-model="$searchQuery.product_name"
          @search="onSearch"
          placeholder="请输入商品名查找"
          :class="basic('search')"
        />
      </div>
      <ul :class="basic('product')">
        <li
          @click="onSku(record)"
          v-for="(item, index) in [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
          ]"
          :key="index"
        >
          <img
            src="https://img.cdn.xinchanedu.com/uploadImg/aix/2019/Aug/1565149862022.jpg"
            alt=""
          />
          <div class="good-name">
            <span>大苏打撒旦艰苦拉萨建档立卡首都卡拉就是</span>
          </div>
          <div class="good-price">
            <span>￥100-300</span>
            <span>库存：31件</span>
          </div>
        </li>
      </ul>
    </div>
    <div :class="basic('buycar')">
      <st-mina-panel app>
        <div slot="actions" :class="basic('footer')">
          <div class="price">
            <span>共2件商品 合计：</span>
            <span>￥240</span>
          </div>
          <div class="button">
            <st-button @click="onCreateOrder">
              创建订单
            </st-button>
            <st-button type="primary" @click="onPay">
              立即支付
            </st-button>
          </div>
        </div>
        <p class="title">购物车</p>
        <div>
          <st-form :form="form" labelWidth="56px">
            <a-row :gutter="8">
              <a-col :span="30">
                <st-form-item :class="basic('padding')">
                  <st-table
                    :class="basic('table')"
                    rowKey="id"
                    :pagination="false"
                    :columns="columns"
                    :dataSource="list"
                  >
                    <template slot="name" slot-scope="customRender, record">
                      <div>{{ record.name }}</div>
                    </template>
                    <template slot="numbers" slot-scope="customRender, record">
                      <a-input-number
                        :min="1"
                        :max="100000"
                        :defaultValue="record.numbers"
                      />
                    </template>
                    <template slot="action">
                      <st-table-actions sytle="width: 120px">
                        <a @click="payCallBack">
                          删除
                        </a>
                      </st-table-actions>
                    </template>
                  </st-table>
                </st-form-item>
                <st-form-item :class="basic('padding')">
                  <div class="divider-line"></div>
                </st-form-item>
                <st-form-item label="购买会员">
                  <a-select
                    showSearch
                    allowClear
                    placeholder="输入手机号或会员名搜索"
                    :defaultActiveFirstOption="false"
                    :showArrow="false"
                    :filterOption="false"
                  >
                    <template slot="notFoundContent">
                      <div>
                        暂无此会员，
                        <span :class="basic('add-vpi')">添加新会员？</span>
                      </div>
                    </template>
                    <a-select-option
                      v-for="(item, index) in memberList"
                      :value="item.id"
                      :key="index"
                    >
                      <span
                        v-html="
                          `${item.member_name} ${item.mobile}`.replace(
                            new RegExp(memberSearchText, 'g'),
                            `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
                          )
                        "
                      >
                        {{ item.member_name }} {{ item.mobile }}
                      </span>
                    </a-select-option>
                  </a-select>
                </st-form-item>
                <st-form-item label="优惠券">
                  -50 >
                </st-form-item>
                <st-form-item label="减免">
                  <st-input-number :float="true" placeholder="请输入减免金额">
                    <span slot="addonAfter">元</span>
                  </st-input-number>
                </st-form-item>
                <st-form-item label="销售">
                  <a-select placeholder="请选择销售名字">
                    <a-select-option
                      v-for="(item, index) in saleList"
                      :key="index"
                      :value="item.id"
                    >
                      {{ item.staff_name }}
                    </a-select-option>
                  </a-select>
                </st-form-item>
                <st-form-item label="备注">
                  <a-textarea
                    placeholder="请填写备注"
                    class="st-textarea"
                  ></a-textarea>
                </st-form-item>
              </a-col>
            </a-row>
          </st-form>
        </div>
      </st-mina-panel>
    </div>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './store.config'
import StoreChooseSku from '@/views/biz-modals/store/choose-sku'
import StoreOrderTip from '@/views/biz-modals/store/order-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
export default {
  name: 'shopSoldTransactionCloud',
  bem: {
    basic: 'shop-sold-transaction-cloud'
  },
  modals: {
    StoreChooseSku,
    StoreOrderTip,
    SoldDealGathering
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators({})
    return {
      form,
      decorators,
      memberList: [],
      saleList: [],
      list: [{ id: 1 }, { id: 2 }]
    }
  },
  methods: {
    onSearch() {
      console.log('3')
    },
    // 会员卡签单
    onSku(record) {
      this.$modalRouter.push({
        name: 'store-choose-sku',
        props: {
          id: ''
        },
        on: {
          success: result => {
            console.log('sss')
          }
        }
      })
    },
    // 创建订单
    onCreateOrder() {
      this.$modalRouter.push({
        name: 'store-order-tip',
        props: {
          type: 'create',
          message: '订单创建成功'
        },
        on: {
          success: res => {
            console.log(res)
          }
        }
      })
    },
    // 立即支付
    onPay() {
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          order_id: 327187807404143,
          type: 'cloud'
        },
        on: {
          success: res => {
            this.payCallBack()
            console.log(res)
          }
        }
      })
    },
    // 收款完提示
    payCallBack() {
      this.$modalRouter.push({
        name: 'store-order-tip',
        props: {
          type: 'pay',
          message: '收款成功'
        },
        on: {
          success: res => {
            if (res.type === 'PrintOrder') {
              this.printOrder(327187807404143)
            }
            console.log(res)
          }
        }
      })
    },
    printOrder(order_id) {
      window.open(
        '/ticket/gathering-print?id=' + order_id,
        '_blank',
        'width=800,height=600'
      )
    }
  },
  // serviceInject() {
  //   return {
  //     listService: ListService
  //   }
  // }
  // rxState() {
  //   return {
  //     list: this.listService.list$,
  //     page: this.listService.page$,
  //     loading: this.listService.loading$,
  //     productTypes: this.listService.productTypes$,
  //     auth: this.listService.auth$
  //   }
  // }
  computed: {
    columns
  }
}
</script>
