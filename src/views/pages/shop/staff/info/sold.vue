<template>
  <div>
    <a-row>
      <a-col :lg="24">
        <a-col :lg="18">
          <a-select
            style="width: 160px;"
            :defaultValue="-1"
            placeholder="请选择订单状态"
            @change="onSingleSearch('order_status', $event)"
          >
            <a-select-option :value="-1">全部订单状态</a-select-option>
            <a-select-option :value="1">未完成</a-select-option>
            <a-select-option :value="2">已完成</a-select-option>
            <a-select-option :value="3">已取消</a-select-option>
            <a-select-option :value="4">已退款</a-select-option>
            <a-select-option :value="5">处理中</a-select-option>
          </a-select>
          <a-range-picker
            class="mg-l8"
            @change="onChooseDate"
            :disabledDate="disabledDate"
            format="YYYY-MM-DD"
          />
        </a-col>
        <a-col :lg="6">
          <st-input-search
            placeholder="请输入姓名、手机号进行查询"
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
      query: this.routerService.query$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: { soldColums },
  mounted() {
    console.log('loading', this.loading)
    this.id = this.$route.meta.query.id
    console.log('soldInfo', this.soldInfo)
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
        current && current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
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
      console.log('跳转到商品详情页', e)
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
    onChooseStatus(e) {
      this.$router.push({
        query: {
          id: this.id,
          order_status: e
        },
        force: true
      })
    },
    // 选择门店
    onChooseShop(e) {
      this.$router.push({
        query: {
          id: this.id,
          shop_id: id
        },
        force: true
      })
    },
    onChooseDate(e) {
      console.log('选择到的日期', e)
      this.$router.push({
        query: {
          id: this.id,
          order_time_first: moment(e[0]).format('YYYY-MM-DD'),
          order_time_last: moment(e[1]).format('YYYY-MM-DD')
        },
        force: true
      })
    },
    // 搜索
    searchCourse(e) {
      this.$router.push({
        query: {
          id: this.id,
          keyword: e
        },
        force: true
      })
    }
  },
  filters: {
    orderStatusFilter(status) {
      console.log(status, typeof status)
      let ret = ''
      switch (status) {
        case 1:
          ret = '未完成'
          break
        case 2:
          ret = '已完成'
          break
        case 3:
          ret = '已取消'
          break
        case 4:
          ret = '已退款'
          break
        case 5:
          ret = '部分退款'
          break
      }
      return ret
    },
    payStatusFilter(status) {
      let ret = ''
      switch (status) {
        case 1:
          ret = '待支付'
          break
        case 2:
          ret = '部分付款'
          break
        case 3:
          ret = '付款完成'
          break
      }
      return ret
    },
    productTypeFilter(status) {
      let ret = ''
      switch (status) {
        case 1:
          ret = '会员卡'
          break
        case 2:
          ret = '私教课'
          break
        case 3:
          ret = '团体课'
          break
        case 4:
          ret = '课程包'
          break
        case 5:
          ret = '储值卡'
          break
        case 6:
          ret = '小班课'
          break
        case 7:
          ret = '手续费'
          break
        case 8:
          ret = '定金'
          break
        case 9:
          ret = '押金'
          break
        case 10:
          ret = '储物柜'
          break
      }
      return ret
    }
  }
}
</script>
