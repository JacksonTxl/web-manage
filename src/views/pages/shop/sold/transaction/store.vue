<template>
  <st-panel :class="basic()" :loading="loading.getStoreProductList">
    <st-mina-panel app>
      <div slot="actions" :class="basic('footer')">
        <div :class="basic('footer-page')">
          <st-pagination :page="productPage" @change="onChange" class="mg-t8" />
        </div>
        <div :class="basic('footer-action')">
          <div class="price">
            <span>共{{ buyCar.length }}件商品 合计：</span>
            <span class="money">￥{{ currentPrice }}</span>
          </div>
          <div class="button">
            <st-button @click="onCreateOrder" :loading="loading.createOrder">
              创建订单
            </st-button>
            <st-button
              type="primary"
              class="mg-l16"
              @click="onPayOrder(null)"
              :loading="loading.createOrderPay"
            >
              立即支付
            </st-button>
          </div>
        </div>
      </div>
      <div :class="basic('list')">
        <div :class="basic('head')">
          <p :class="basic('title')">查看商品</p>
          <st-input-search
            style="width: 291px"
            v-model="$searchQuery.product_name"
            @search="onKeywordsSearch('product_name', $event)"
            placeholder="请输入商品名查找"
            :class="basic('search')"
          />
        </div>
        <ul :class="basic('product')" v-if="storeProductList.length">
          <li v-for="(item, index) in storeProductList" :key="index">
            <img :class="basic('product-img')" :src="item.img" alt="" />
            <div :class="basic('product-name')">
              <span>{{ item.product_name }}</span>
            </div>
            <div :class="basic('product-price')">
              <span>
                {{ item.price }}
              </span>
              <span>库存:{{ item.count }}件</span>
            </div>
            <div class="product-mask" @click="onSku(item.id)">
              <img src="@/assets/img/icon-buy-car.png" alt="" />
              <p>添加至购物车</p>
            </div>
          </li>
        </ul>
        <st-no-data v-else></st-no-data>
      </div>
      <div :class="basic('buycar')">
        <p class="title">购物车</p>
        <div>
          <st-form :form="form" labelWidth="66px">
            <st-form-item :class="basic('padding')">
              <st-table
                :class="basic('table')"
                rowKey="sku_id"
                :pagination="false"
                :columns="columns"
                :scroll="{ y: 320 }"
                :dataSource="buyCar"
              >
                <template slot="product_name" slot-scope="customRender, record">
                  <div>
                    {{ record.product_name }}
                    <span v-if="record.rule_name">
                      ({{ record.rule_name }})
                    </span>
                  </div>
                </template>
                <template slot="stock_amount" slot-scope="customRender, record">
                  <a-input-number
                    :min="1"
                    :max="record.stock_amount"
                    @change="onMemberChange(0)"
                    v-model="record.nums"
                  />
                </template>
                <template slot="priceSum" slot-scope="customRender, record">
                  {{ (record.nums * record.unit_price).toFixed(1) }}
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
              <div :class="basic('all-price')" v-if="buyCar.length">
                总额：￥{{ actualAmount }}
              </div>
            </st-form-item>
            <st-form-item :class="basic('padding')">
              <div class="divider-line"></div>
            </st-form-item>
            <st-form-item label="购买会员" required>
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
                <template
                  slot="notFoundContent"
                  v-if="!memberList.length && memberSearchText !== ''"
                >
                  <div>
                    暂无此会员，
                    <span :class="basic('add-member')" @click="addMember">
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
              <st-input-number
                :float="true"
                @input="getPrice(0)"
                v-model="reducePrice"
                maxlength="12"
                placeholder="请输入减免金额"
              >
                <span slot="addonAfter">元</span>
              </st-input-number>
            </st-form-item>
            <st-form-item label="销售">
              <a-select
                v-decorator="decorators.saleName"
                placeholder="请选择销售名字"
              >
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
                v-model="description"
                maxlength="200"
                placeholder="请填写备注"
                class="st-textarea"
              ></a-textarea>
            </st-form-item>
          </st-form>
        </div>
      </div>
    </st-mina-panel>
  </st-panel>
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
import { PRODUCT_TYPE } from '@/constants/sold/transaction'
import { MessageService } from '@/services/message.service'
export default {
  name: 'shopSoldTransactionCloud',
  mixins: [tableMixin],
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
      pattern: PatternService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.listService.loading$,
      memberList: this.listService.memberList$,
      saleList: this.listService.saleList$,
      storeProductList: this.listService.storeProductList$,
      currentPrice: this.listService.currentPrice$,
      actualAmount: this.listService.actualAmount$,
      couponList: this.listService.couponList$,
      productPage: this.listService.productPage$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      PRODUCT_TYPE,
      memberSearchText: '', // 搜索会员value
      couponText: '未选择优惠券', // 选择的优惠券名
      couponDropdownVisible: false,
      selectCoupon: '', // 优惠券选择的信息
      reducePrice: null,
      description: '',
      buyCar: []
    }
  },
  watch: {
    $searchQuery() {
      this.productPage = {}
      this.getList()
    }
  },
  mounted() {
    this.getList()
    this.$searchQuery.product_type = PRODUCT_TYPE.STORE
    this.listService.couponList$.commit(() => [])
    this.getUseCouponList(0)
    this.listService.getSaleList().subscribe()
  },
  methods: {
    // 获取商品列表
    getList() {
      this.listService.getStoreProductList(this.$searchQuery).subscribe()
    },
    // 添加购物车
    onSku(record) {
      this.listService.getGoodsDetail(record).subscribe(res => {
        if (res.all_spec) {
          // 多规格添加至购物车
          this.$modalRouter.push({
            name: 'store-choose-sku',
            props: {
              productData: res
            },
            on: {
              success: result => {
                let state = this.buyCarJudge(result.sku_id, result.stock_amount)
                if (state === 'error') {
                  return
                }
                result.product_id = record
                if (!state) {
                  this.buyCar.push(result)
                }
                this.onMemberChange(0)
              }
            }
          })
        } else {
          // 单规格添加至购物车
          let state = this.buyCarJudge(
            res.product_sku[0].sku_id,
            res.product_sku[0].stock_amount
          )
          if (state === 'error') {
            return
          }
          if (!state) {
            this.buyCar.push({
              sku_id: res.product_sku[0].sku_id,
              product_id: record,
              nums: 1,
              rule_name: '',
              product_name: res.product_name,
              unit_price: res.product_sku[0].selling_price,
              stock_amount: res.product_sku[0].stock_amount
            })
          }
          this.onMemberChange(0)
        }
      })
    },
    // 购物车添加商品库存验证
    buyCarJudge(id, number) {
      if (!number) {
        this.messageService.warn({ content: '商品库存不足' })
        return 'error'
      }
      for (let i = 0; i < this.buyCar.length; i++) {
        let val = this.buyCar[i]
        if (val.sku_id === id) {
          if (val.nums >= number) {
            this.messageService.warn({ content: '商品库存不足' })
            return 'error'
          } else {
            val.nums = val.nums + 1
            return 'noAdd'
          }
        }
      }
      if (this.buyCar.length >= 20) {
        this.messageService.warn({ content: '购物车已满' })
        return 'error'
      }
    },
    // 删除购物车商品
    onDelBuyCar(i) {
      this.buyCar.splice(i, 1)
      this.onMemberChange(0)
    },
    // 生成订单号
    createOrderNum(type) {
      return new Promise((resolve, reject) => {
        this.form.validate().then(values => {
          let params = {
            member_id: values.memberId,
            coupon_id: this.selectCoupon.id,
            sale_id: values.saleName,
            reduce_price: this.reducePrice || 0,
            description: this.description,
            sale_range: 1,
            shipping_mode: 1,
            order_amount: this.currentPrice,
            sku_info: this.buyCar
          }
          if (type === 'order') {
            this.listService.createOrder(params).subscribe(result => {
              resolve(result.info.order_id.order_id)
            })
          } else {
            this.listService.createOrderPay(params).subscribe(result => {
              resolve(result.info.order_id.order_id)
            })
          }
        })
      })
    },
    // 创建订单
    async onCreateOrder() {
      let orderId = await this.createOrderNum('order')
      this.payCallBack(
        {
          type: 'create',
          message: '订单创建成功'
        },
        orderId
      )
    },
    // 立即支付
    async onPayOrder(orderId) {
      if (!orderId) {
        orderId = await this.createOrderNum('orderPay')
      }
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          order_id: orderId,
          type: 'cloud_store'
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
                this.onPayOrder(orderId)
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
    // 优惠券处理
    onSelectCouponChange(event) {
      let price = this.couponList.filter(o => o.id === event.target.value.id)[0]
        .price
      this.couponText = `${price}元`
      this.getPrice(0)
    },
    // 优惠券处理
    onSelectCoupon() {
      this.couponDropdownVisible = false
    },
    // 价格计算
    getPrice(cardId) {
      let productInfo = []
      const memberId = cardId ? cardId : this.form.getFieldValue('memberId')
      this.buyCar.forEach(val => {
        productInfo.push({
          sku_id: val.sku_id,
          nums: val.nums || 0
        })
      })
      this.listService
        .getStorePrice({
          product_type: 8,
          reduce_amount: this.reducePrice || undefined,
          coupon_id: this.selectCoupon.id || undefined,
          member_id: memberId || undefined,
          product_info: productInfo.length ? productInfo : undefined
        })
        .subscribe()
    },
    // 获取可用优惠券
    getUseCouponList(cardId) {
      let productInfo = []
      const memberId = cardId ? cardId : this.form.getFieldValue('memberId')
      this.buyCar.forEach(val => {
        productInfo.push({
          product_id: val.product_id,
          sku_id: val.sku_id,
          nums: val.nums || 0
        })
      })
      this.listService
        .getUseCoupon({
          product_info: JSON.stringify(productInfo),
          member_id: memberId
        })
        .subscribe()
    },
    // 同时获取价格和优惠券列表
    onMemberChange(data) {
      this.getPrice(data)
      this.getUseCouponList(data)
    },
    // 分页切换
    onChange(pagination) {
      this.$searchQuery.current_page = pagination.current
      this.$searchQuery.size = pagination.pageSize
      this.getList()
    }
  },
  computed: {
    columns
  }
}
</script>
