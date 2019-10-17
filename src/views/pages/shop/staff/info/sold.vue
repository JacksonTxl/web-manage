<template>
  <div>
    <a-row>
      <a-select
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
      <st-input-search
        style="float:right"
        placeholder="请输入姓名、手机号进行查询"
        @search="onSingleSearch('keyword', $event)"
      />
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="soldColums"
          :dataSource="soldInfo"
          :scroll="{ x: 1300 }"
          :loading="loading.getStaffSoldInfo"
          :page="page"
          rowkey="id"
          @change="onTableChange"
        >
          <template slot="id" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goOrderDetai(record)">
              {{ text }}
            </a>
          </template>
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
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      soldService: SoldService,
      routerService: RouteService
    }
  },
  rxState() {
    return {
      soldInfo: this.soldService.soldInfo$,
      loading: this.soldService.loading$,
      page: this.soldService.page$,
      query: this.routerService.query$,
      orderStatus: this.soldService.orderStatus$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: { soldColums },
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
      let arr = [1, 2, 3, 4, 5]
      let product_type = e.product_type
      return arr.includes(product_type)
    },
    // 订单编号：点击跳转至订单详情页
    goOrderDetai(e) {
      console.log('跳转到订单详情页', e)
      this.$router.push({
        name: 'shop-finance-order-info-collection-details',
        query: {
          id: e.id
        }
      })
    },
    // 商品名称+规格名：点击跳转至商品详情页
    goCommodityDetai(e) {
      let product_type = e.product_type
      let product_id = e.product_id
      let routeMap = {
        1: {
          // 会籍卡
          name: 'shop-product-card-member-period-info',
          query: {
            id: product_id
          }
        },
        2: {
          // 私教
          name: 'shop-product-course-manage-personal-info',
          query: {
            id: product_id
          }
        },
        3: {
          // 团教
          name: 'brand-product-course-manage-team-info',
          query: {
            courseId: product_id
          }
        },
        4: {
          // 课程包
          name: 'shop-product-course-manage-package-info-unlimit-package',
          query: {
            id: product_id
          }
        },
        5: {
          // 储值卡
          name: 'shop-product-card-deposit-info',
          query: {
            id: product_id
          }
        }
      }
      this.$router.push(routeMap[product_type])
    },
    onChooseDate(e) {
      this.$router.push({
        query: {
          id: this.id,
          order_time_first: moment(e[0]).format('YYYY-MM-DD'),
          order_time_last: moment(e[1]).format('YYYY-MM-DD')
        },
        force: true
      })
    }
  }
}
</script>
