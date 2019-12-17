<template>
  <div :class="detail()">
    <div :class="detail('search')">
      <a-select
        :class="detail('search-select')"
        v-model="chooseGood"
        @change="onSingleSearch('product_id', $event)"
        placeholder="请选择商品"
      >
        <a-select-option :value="-1">商品111</a-select-option>
        <a-select-option :value="2">商品222</a-select-option>
        <a-select-option :value="3">商品333</a-select-option>
        <a-select-option :value="4">商品444</a-select-option>
      </a-select>
      <a-select
        :class="detail('search-select')"
        v-model="stockType"
        @change="onSingleSearch('stock_flow', $event)"
        placeholder="出入库类型"
      >
        <a-select-option :value="-1">类型11</a-select-option>
        <a-select-option :value="2">类型22</a-select-option>
        <a-select-option :value="3">类型33</a-select-option>
      </a-select>
      <a-range-picker
        @change="onChooseDate"
        format="YYYY-MM-DD"
        :class="detail('search-time')"
      />
    </div>

    <div>
      <st-table
        :columns="detailColumns"
        :dataSource="tableData"
        :scroll="{ x: 1800 }"
      ></st-table>
    </div>
  </div>
</template>
<script>
import { detailColumns } from './detail.config.ts'
import { DetailService } from './detail.service'
import tableMixin from '@/mixins/table.mixin'
import moment from 'moment'
export default {
  bem: {
    detail: 'page-shop-store-stock-list-detail'
  },
  serviceInject() {
    return { detailService: DetailService }
  },
  rxState() {
    return {
      // tableData: this.detailService.list$
      loading: this.addService.loading$
    }
  },
  mixins: [tableMixin],
  data() {
    return { detailColumns, tableData: [], chooseGood: -1, stockType: -1 }
  },
  methods: {
    onChange(e) {},
    // 日期选择
    onChooseDate(e) {
      this.$router.push({
        query: {
          product_id: this.$searchQuery.product_id,
          stock_flow: this.$searchQuery.stock_flow,
          page: this.$searchQuery.page,
          size: this.$searchQuery.size,
          start_time: moment(e[0]).format('YYYY-MM-DD'),
          end_time: moment(e[1]).format('YYYY-MM-DD')
        }
      })
    }
  }
}
</script>
