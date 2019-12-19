<template>
  <div :class="search()">
    <portal to="SHOP_STORE_STOCK_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.product_name"
        @search="onKeywordsSearch('product_name', $event)"
        :placeholder="`请输入商品名称`"
        maxlength="50"
      />
    </portal>

    <div :class="search('btn')">
      <st-button
        type="primary"
        :class="search('btn--in')"
        @click="moreIn(false)"
      >
        批量入库
      </st-button>
      <st-button type="primary" @click="moreIn(true)">批量出库</st-button>
    </div>
    <st-table
      :columns="searchColumns"
      :dataSource="tableData"
      :scroll="{ x: 1200 }"
      :rowSelection="{
        onChange: onChange,
        selectedRowKeys: selectedRowKeys
      }"
      rowKey="sku_id"
    >
      <template slot="action" slot-scope="text, record">
        <st-table-actions sytle="width: 120px">
          <a
            v-modal-link="{
              name: 'store-put-in',
              props: { skuList: [record] }
            }"
          >
            入库
          </a>
          <a
            v-modal-link="{
              name: 'store-put-in',
              props: { isOut: true, skuList: [record] }
            }"
          >
            出库
          </a>
          <a @click="goDetail(record)">
            明细
          </a>
        </st-table-actions>
      </template>
    </st-table>
  </div>
</template>
<script>
import { searchColumns } from './search.config.ts'
import StorePutIn from '@/views/biz-modals/store/put-in'
import tableMixin from '@/mixins/table.mixin'
import { SearchService } from './search.service'
export default {
  bem: {
    search: 'page-shop-store-stock-list-search'
  },
  serviceInject() {
    return { searchService: SearchService }
  },
  rxState() {
    return {
      // tableData: this.searchService.list$
      loading: this.searchService.loading$
    }
  },
  mixins: [tableMixin],
  data() {
    return {
      searchColumns,
      name: '',
      tableData: [
        {
          product_id: '11',
          product_name: '11',
          category_name: '11',
          amount: '11',
          use_amount: '11',
          sku_name: '11',
          sku_id: '11'
        },
        {
          product_id: '22',
          product_name: '22',
          category_name: '22',
          amount: '22',
          use_amount: '22',
          sku_name: '22',
          sku_id: '22'
        },
        {
          product_id: '33',
          product_name: '33',
          category_name: '33',
          amount: '33',
          use_amount: '33',
          sku_name: '33',
          sku_id: '33'
        },
        {
          product_id: '44',
          product_name: '44',
          category_name: '44',
          amount: '44',
          use_amount: '44',
          sku_name: '44',
          sku_id: '44'
        },
        {
          product_id: '55',
          product_name: '55',
          category_name: '55',
          amount: '55',
          use_amount: '55',
          sku_name: '55',
          sku_id: '55'
        }
      ],
      selectedRowKeys: []
    }
  },
  modals: { StorePutIn },
  methods: {
    onChange(e) {
      this.selectedRowKeys = e
    },
    moreIn(isOut) {
      let list = []
      this.selectedRowKeys.forEach(id => {
        let item = this.tableData.filter(stock => stock.sku_id === id)[0]
        list.push(item)
      })
      this.$modalRouter.push({
        name: 'store-put-in',
        props: { skuList: list, isOut }
      })
    },
    goDetail(product) {
      this.$router.push({
        path: './detail',
        query: {
          product_id: product.product_id,
          page: 1
        }
      })
    }
  }
}
</script>
