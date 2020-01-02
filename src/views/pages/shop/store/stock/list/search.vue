<template>
  <div :class="search()">
    <portal to="SHOP_STORE_STOCK_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.product_name"
        @search="onKeywordsSearch('product_name', $event)"
        :placeholder="`请输入商品名称`"
        maxlength="30"
      />
    </portal>

    <div :class="search('btn')">
      <st-button
        v-if="auth.warehousing"
        type="primary"
        :class="search('btn--in')"
        @click="moreIn()"
      >
        批量入库
      </st-button>
      <st-button type="primary" @click="moreOut()">
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
      <template slot="product_name" slot-scope="text, record">
        {{ record.product_name }}
        <span v-if="record.sku_name">（{{ record.sku_name }}）</span>
      </template>
      <template slot="action" slot-scope="text, record">
        <st-table-actions sytle="width: 120px">
          <a
            v-if="record.auth['shop:cloud_store:stock|warehousing']"
            @click="moreIn(record)"
          >
            入库
          </a>
          <a
            v-if="record.auth['shop:cloud_store:stock|retrieval']"
            @click="moreOut(record)"
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
import StorePutOut from '@/views/biz-modals/store/put-out'
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
  modals: { StorePutIn, StorePutOut },
  methods: {
    onChange(e) {
      this.selectedRowKeys = e
    },
    moreIn() {
      let list = []
      this.selectedRowKeys.forEach(id => {
        let item = this.tableData.filter(stock => stock.sku_id === id)[0]
        list.push(item)
      })
      this.$modalRouter.push({
        name: 'store-put-in',
        props: { skuList: list },
        on: {
          success: () => {
            this.selectedRowKeys = []
            this.$router.reload()
          }
        }
      })
    },
    moreOut(record) {
      let list = []
      if (record) {
        list = [record]
      } else {
        this.selectedRowKeys.forEach(id => {
          let item = this.tableData.filter(stock => stock.sku_id === id)[0]
          list.push(item)
        })
      }
      this.$modalRouter.push({
        name: 'store-put-out',
        props: { skuList: list },
        on: {
          success: () => {
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
  }
}
</script>
