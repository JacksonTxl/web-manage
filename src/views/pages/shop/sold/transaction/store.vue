<template>
  <div :class="basic()">
    <div :class="basic('list')">
      <div :class="basic('head')">
        <p :class="basic('title')">查看商品</p>
        <st-input-search
          style="width: 291px"
          v-model="$searchQuery.product_name"
          @search="getList"
          placeholder="请输入商品名查找"
          :class="basic('search')"
        />
      </div>
      <ul :class="basic('product')" v-if="storeProductList1.length">
        <li v-for="(item, index) in storeProductList1" :key="index">
          <img class="goods-img" :src="item.img" alt="" />
          <div class="good-name">
            <span>{{ item.product_name }}</span>
          </div>
          <div class="good-price">
            <span>￥{{ item.min_price }}-{{ item.max_price }}</span>
            <span>库存：{{ item.count }}件</span>
          </div>
          <div class="product-mask" @click="onSku(item.id)">
            <img src="@/assets/img/icon-buy-car.png" alt="" />
            <p>添加至购物车</p>
          </div>
        </li>
      </ul>
      <div :class="basic('no-product')" v-else>
        <img
          width="150"
          src="https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-nodata.png"
        />
        <p>暂无数据</p>
      </div>
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
                    rowKey="product_id"
                    :pagination="false"
                    :columns="columns"
                    :dataSource="buyCar"
                  >
                    <template slot="name" slot-scope="customRender, record">
                      <div>{{ record.name }}</div>
                    </template>
                    <template slot="count" slot-scope="customRender, record">
                      <a-input-number
                        :min="1"
                        :max="100000"
                        v-model="record.count"
                      />
                    </template>
                    <template slot="priceSum" slot-scope="customRender, record">
                      {{ (record.count * record.price).toFixed(1) }}
                    </template>
                    <template
                      slot="action"
                      slot-scope="customRender, record, index"
                    >
                      <st-table-actions sytle="width: 120px">
                        <a @click="onDelBuyCar(index)">
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
                    v-decorator="decorators.memberId"
                    @search="onMemberSearch"
                    @change="onMemberChange"
                  >
                    <template slot="notFoundContent">
                      <div>
                        暂无此会员，
                        <span :class="basic('add-vpi')" @click="addMember">
                          添加新会员？
                        </span>
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
                <st-form-item :class="basic('discounts')" label="优惠券">
                  <div>
                    <div :class="basic('discounts-total')">
                      <span>{{ couponText }}</span>
                      <a-dropdown
                        v-model="couponDropdownVisible"
                        :disabled="couponList.length === 0"
                        :class="basic({ disabled: couponList.length === 0 })"
                        placement="bottomRight"
                        :getPopupContainer="trigger => trigger.parentNode"
                        :trigger="['click']"
                      >
                        <div :class="basic('discounts-promotion')">
                          <span>{{ couponList.length }}张可用优惠券</span>
                          <a-icon type="right" />
                        </div>
                        <a-radio-group
                          v-model="selectCoupon"
                          @change="onSelectCouponChange"
                          :class="basic('dropdown')"
                          slot="overlay"
                        >
                          <a-menu>
                            <a-menu-item
                              @click="onSelectCoupon"
                              :key="index"
                              v-for="(item, index) in couponList"
                            >
                              <a-radio :value="item">
                                {{ item.name }}{{ item.price }}
                              </a-radio>
                            </a-menu-item>
                          </a-menu>
                        </a-radio-group>
                      </a-dropdown>
                    </div>
                  </div>
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
import { columns, ruleOptions } from './store.config'
import StoreChooseSku from '@/views/biz-modals/store/choose-sku'
import StoreOrderTip from '@/views/biz-modals/store/order-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import SoldDealAddMember from '@/views/biz-modals/sold/deal/add-member'
import { ListService } from './list.service'
import { PatternService } from '@/services/pattern.service'
import { values } from 'lodash-es'
export default {
  name: 'shopSoldTransactionCloud',
  bem: {
    basic: 'shop-sold-transaction-cloud'
  },
  modals: {
    StoreChooseSku,
    StoreOrderTip,
    SoldDealGathering,
    SoldDealAddMember
  },
  serviceInject() {
    return {
      listService: ListService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.listService.loading$,
      memberList: this.listService.memberList$,
      saleList: this.listService.saleList$,
      storeProductList: this.listService.storeProductList$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      memberSearchText: '', // 搜索会员value
      couponText: '未选择优惠券', // 选择的优惠券名
      couponDropdownVisible: false,
      selectCoupon: '',
      couponList: [
        {
          name: '1',
          price: 30
        }
      ],
      buyCar: [],
      storeProductList1: [
        {
          product_name: '商品名',
          img: '',
          min_price: 100,
          max_price: 200,
          count: 40
        }
      ]
    }
  },
  mounted() {
    this.getList()
    this.listService.getSaleList().subscribe()
  },
  methods: {
    // 获取商品列表
    getList() {
      this.listService
        .getStoreProductList(this.$searchQuery.product_name)
        .subscribe()
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
            this.buyCar.push(result)
          }
        }
      })
    },
    // 删除购物车商品
    onDelBuyCar(i) {
      this.buyCar.splice(i, 1)
    },
    // 生成订单号
    createOrderNum() {
      return new Promise((resolve, reject) => {
        this.form.validate().then(values => {
          resolve(values)
        })
      })
    },
    // 创建订单
    async onCreateOrder() {
      let orderId = await this.createOrderNum()
      this.payCallBack(
        {
          type: 'create',
          message: '订单创建成功'
        },
        orderId
      )
    },
    // 立即支付
    async onPay(orderId) {
      if (!orderId) {
        orderId = await this.createOrderNum()
      }
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          order_id: orderId,
          type: 'cloud'
        },
        on: {
          success: res => {
            this.payCallBack(
              {
                type: 'pay',
                message: '收款成功'
              },
              orderId
            )
          }
        }
      })
    },
    // 订单收款modal
    createdOrderPay(props) {
      return new Promise((resolve, reject) => {
        this.$modalRouter.push({
          name: 'sold-deal-gathering',
          props,
          on: {
            success: resolve
          }
        })
      })
    },
    // 收款完提示
    payCallBack(props, orderId) {
      this.$modalRouter.push({
        name: 'store-order-tip',
        props,
        on: {
          success: res => {
            switch (res.type) {
              case 'PrintOrder':
                this.printOrder(orderId)
                break
              case 'ViewOrder':
                this.createdOrderViewOrder(orderId)
                break
              case 'Pay':
                this.onPay(orderId)
                break
            }
          }
        }
      })
    },
    // 小票打印
    printOrder(order_id) {
      window.open(
        '/ticket/gathering-print?id=' + order_id,
        '_blank',
        'width=800,height=600'
      )
    },
    // 查看订单
    createdOrderViewOrder(order_id) {
      this.$router.push({
        name: 'shop-finance-order-info-collection-details',
        query: {
          id: order_id
        }
      })
    },
    // 添加会员
    addMember() {
      this.$modalRouter.push({
        name: 'sold-deal-add-member',
        on: {
          success: res => {
            this.onMemberSearch(res.name, res.id)
            this.onMemberChange(res.id)
          }
        }
      })
    },
    // 会员搜索
    onMemberSearch(data, memberId) {
      this.memberSearchText = data
      if (data === '') {
        this.listService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.listService.getMember(data, 1).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['memberId'])
          }
          if (memberId) {
            this.form.setFieldsValue({
              memberId
            })
          }
        })
      }
    },
    // 选择会员
    onMemberChange(data) {
      console.log(data, 2222222)
    },
    onSelectCouponChange(event) {
      let price = this.couponList.filter(o => o.id === event.target.value.id)[0]
        .price
      this.couponText = `${price}元`
    },
    onSelectCoupon() {
      this.couponDropdownVisible = false
    }
  },
  computed: {
    columns
  }
}
</script>
