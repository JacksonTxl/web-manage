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
        v-if="auth.warehousing"
        type="primary"
        :class="search('btn--in')"
        @click="moreIn(false)"
      >
        批量入库
      </st-button>
      <st-button type="primary" @click="moreIn(true)">
        批量出库
      </st-button>
    </div>
    <st-table
      :columns="searchColumns"
      :dataSource="tableData"
      :scroll="{ x: 1200 }"
      :page="page"
      :rowSelection="{
        onChange: onChange,
        selectedRowKeys: selectedRowKeys
      }"
      @change="onTableChange"
      rowKey="sku_id"
    >
      <template slot="action" slot-scope="text, record">
        <st-table-actions sytle="width: 120px">
          <a
            v-if="record.auth['shop:cloud_store:stock|warehousing']"
            v-modal-link="{
              name: 'store-put-in',
              props: { skuList: [record] }
            }"
          >
            入库
          </a>
          <a
            v-if="record.auth['shop:cloud_store:stock|retrieval']"
            v-modal-link="{
              name: 'store-put-in',
              props: { isOut: true, skuList: [record] }
            }"
          >
            出库
          </a>
          <a
            v-if="record.auth['shop:cloud_store:stock|one_goods_obvious']"
            @click="goDetail(record)"
          >
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
      tableData: this.searchService.list$,
      loading: this.searchService.loading$,
      page: this.searchService.page$,
      auth: this.searchService.auth$
    }
  },
  mixins: [tableMixin],
  data() {
    return {
      searchColumns,
      name: '',
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
        props: { skuList: list, isOut },
        on: {
          success: () => {
            console.log('进来了success')
            this.selectedRowKeys = []
            this.$router.reload()
          }
        }
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
  },
  mounted() {
    console.log(this.auth)
  }
}
</script>
