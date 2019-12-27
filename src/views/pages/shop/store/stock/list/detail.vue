<template>
  <div :class="detail()">
    <div :class="detail('search')">
      <a-select
        :class="detail('search-select')"
        v-model="chooseGood"
        @change="onSingleSearch('product_id', $event)"
        placeholder="请选择商品"
      >
        <a-select-option
          :value="item.id"
          v-for="item in productList"
          :key="item.id"
        >
          {{ item.product_name }}
        </a-select-option>
      </a-select>
      <a-select
        :class="detail('search-select')"
        v-model="stockType"
        @change="onSingleSearch('stock_flow', $event)"
        placeholder="出入库类型"
      >
        <a-select-option
          :value="item.value"
          v-for="item in stockFlow"
          :key="item.value"
        >
          {{ item.label }}
        </a-select-option>
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
        :page="page"
        :scroll="{ x: 1800 }"
        rowKey="id"
        @change="onTableChange"
      >
        <template slot="stock_flow" slot-scope="text, record">
          <div>{{ record.stock_flow.doc }}</div>
        </template>
      </st-table>
    </div>
  </div>
</template>
<script>
import { detailColumns } from './detail.config.ts'
import { DetailService } from './detail.service'
import tableMixin from '@/mixins/table.mixin'
import moment from 'moment'
import { UserService } from '@/services/user.service'
export default {
  bem: {
    detail: 'page-shop-store-stock-list-detail'
  },
  serviceInject() {
    return { detailService: DetailService, userService: UserService }
  },
  rxState() {
    return {
      tableData: this.detailService.list$,
      loading: this.detailService.loading$,
      page: this.detailService.page$,
      productList: this.detailService.productList$,
      stockFlow: this.userService.getOptions$('cloud_store.stock_flow')
    }
  },
  mixins: [tableMixin],
  data() {
    return { detailColumns, chooseGood: -1, stockType: -1 }
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
