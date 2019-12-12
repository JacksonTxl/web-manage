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
            <st-button>
              创建订单
            </st-button>
            <st-button type="primary">
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
                    <template slot="action" slot-scope="customRender, record">
                      <st-table-actions sytle="width: 120px">
                        <a @click="onSku(record)">
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
                  <a-input placeholder="请输入会员姓名"></a-input>
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
// import { ListService } from './list.service'
import { columns } from './cloud-store.config'
import StoreChooseSku from '@/views/biz-modals/store/choose-sku'
export default {
  name: 'shopSoldTransactionCloud',
  bem: {
    basic: 'shop-sold-transaction-cloud'
  },
  modals: { StoreChooseSku },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators({})
    return {
      form,
      decorators,
      saleList: [],
      list: [{}, {}]
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
