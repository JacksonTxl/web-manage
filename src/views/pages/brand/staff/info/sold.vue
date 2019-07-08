<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">

          <shop-select style="width: 160px" v-model="query.shop_id" @change="onChange"></shop-select>

          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择预约状态" @change="onChooseStatus">
            <a-select-option :value="-1">全部订单状态</a-select-option>
            <a-select-option :value="1">预约失败</a-select-option>
            <a-select-option :value="3">候补中</a-select-option>
            <a-select-option :value="2">预约成功</a-select-option>
            <a-select-option :value="4">取消预约</a-select-option>
          </a-select>
          <a-range-picker class="mg-l8" @change="onChooseDate" format="YYYY-MM-DD"/>
        </a-col>
        <a-col :lg="2"></a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入会员名姓名、手机号进行查询" @search="searchCourse"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="soldColums"
          :dataSource="soldInfo.list"
          :scroll="{ x: 1750}"
          :loading="loading.getStaffSoldInfo"
          @change="onTableChange"
          :page="page"
        >
          <template slot="id" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goOrderDetai(record)">{{ text }}</a>
          </template>
          <template slot="product_type" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goCommodityDetai(record)">{{ text }}</a>
          </template>
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { soldColums } from './columns.config'
import { SoldService } from './sold.service'
import ShopSelect from '@/views/biz-components/shop-select'
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
  components: {
    ShopSelect
  },
  mounted() {
    this.id = this.$route.meta.query.id
  },
  methods: {
    // 订单编号：点击跳转至订单详情页
    goOrderDetai(e) {
      console.log('跳转到订单详情页', e)
    },
    // 商品名称+规格名：点击跳转至商品详情页
    goCommodityDetai(e) {
      console.log('跳转到商品详情页', e)
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
    onChange() {
      this.$router.push({ query: this.query })
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
  }
}
</script>
