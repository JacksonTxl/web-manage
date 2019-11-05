<template>
  <div>
    <a-row>
      <a-col :lg="24">
        <a-col :lg="18">
          <a-select
            style="width: 160px"
            placeholder="请选择门店"
            v-model="query.shop_id"
            :defaultValue="-1"
            :options="shopOptions"
            @change="onSingleSearch('shop_id', $event)"
          ></a-select>
          <a-select
            class="mg-l8"
            style="width: 160px;"
            :defaultValue="-1"
            placeholder="请选择订单状态"
            :options="orderStatus"
            v-model="query.order_status"
            @change="onSingleSearch('order_status', $event)"
          ></a-select>
          <a-range-picker
            class="mg-l8"
            @change="onChooseDate"
            :disabledDate="disabledDate"
            format="YYYY-MM-DD"
          />
        </a-col>
        <a-col :lg="6">
          <st-input-search
            placeholder="请输入会员名姓名、手机号进行查询"
            @search="onSingleSearch('keyword', $event)"
          />
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="soldColums"
          :dataSource="soldInfo"
          :scroll="{ x: 1300 }"
          :loading="loading.getStaffSoldInfo"
          @change="onTableChange"
          rowkey="id"
          :page="page"
        >
          <template slot="product_name" slot-scope="text, record">
            <a
              href="javascript:;"
              class="mg-r8"
              @click="goCommodityDetai(record)"
              v-if="canJump(record)"
            >
              {{ text }}
            </a>
            <span v-else>{{ text }}</span>
          </template>
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { soldColums } from './columns.config'
import { SoldService } from './sold.service'
import { RouteService } from '@/services/route.service'
import tableMixins from '@/mixins/table.mixin'
export default {
  serviceInject() {
    return {
      soldservice: SoldService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      shopOptions: this.soldservice.shopOptions$,
      orderStatus: this.soldservice.orderStatus$,
      soldInfo: this.soldservice.soldInfo$,
      page: this.soldservice.page$,
      loading: this.soldservice.loading$,
      query: this.routeService.query$
    }
  },
  mixins: [tableMixins],
  data() {
    return {
      id: ''
    }
  },
  computed: {
    soldColums
  },
  mounted() {
    this.id = this.$route.meta.query.id
  },
  methods: {
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },

    disabledDate(current) {
      return (
        current && current.format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')
      )
    },
    canJump(e) {
      let arr = [1, 2, 3, 5]
      let product_type = e.product_type
      return arr.includes(product_type)
    },
    // 商品名称+规格名：点击跳转至商品详情页
    goCommodityDetai(e) {
      console.log('跳转到商品详情页', e)
      let product_type = e.product_type
      let product_id = e.product_id
      let routeMap = {
        1: {
          // 会籍卡
          name: 'brand-product-card-member-period-info',
          query: {
            id: product_id
          }
        },
        2: {
          // 私教
          name: 'brand-product-course-personal-info',
          query: {
            id: product_id
          }
        },
        3: {
          // 团教
          name: 'brand-product-course-team-info',
          query: {
            courseId: product_id
          }
        },
        5: {
          // 储值卡
          name: 'brand-product-card-deposit-info',
          query: {
            id: product_id
          }
        }
      }
      this.$router.push(routeMap[product_type])
    },
    onChooseDate(e) {
      console.log('选择到的日期', e)
      this.$router.push({
        query: {
          id: this.id,
          order_time_first: moment(e[0]).format('YYYY-MM-DD'),
          order_time_last: moment(e[1]).format('YYYY-MM-DD')
        }
      })
    }
  }
}
</script>
