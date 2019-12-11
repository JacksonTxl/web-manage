<template>
  <div :class="search()">
    <st-input-search
      v-model="$searchQuery.card_name"
      v-di-view="{ name: SHOP_STORED_STOCK_KEYWORDS_SEARCH }"
      @search="onKeywordsSearch('card_name', $event)"
      :placeholder="`请输入${$c('member_card')}名称查找`"
      maxlength="50"
    />
    <div :class="search('btn')">
      <st-button type="primary" :class="search('btn--in')">批量入库</st-button>
      <st-button type="primary">批量出库</st-button>
    </div>
    <st-table
      :columns="searchColumns"
      :dataSource="tableData"
      :scroll="{ x: 1200 }"
      :rowSelection="{
        onChange: onChange,
        selectedRowKeys: selectedRowKeys
      }"
    >
      <template slot="action" slot-scope="text, record">
        <st-table-actions sytle="width: 120px">
          <a
            v-modal-link="{
              name: 'store-put-in',
              props: { shopList: 1 }
            }"
          >
            入库{{ record }}
          </a>
          <a
            v-modal-link="{
              name: 'store-put-in',
              props: { shopList: 1 }
            }"
          >
            出库
          </a>
          <a>
            明细
          </a>
        </st-table-actions>
      </template>
    </st-table>
  </div>
</template>
<script>
import { SHOP_STORED_STOCK_KEYWORDS_SEARCH } from '@/constants/events'
import { searchColumns } from './search.config.ts'
import StorePutIn from '@/views/biz-modals/store/put-in'
export default {
  bem: {
    search: 'page-shop-store-stock-list-search'
  },
  data() {
    return {
      searchColumns,
      SHOP_STORED_STOCK_KEYWORDS_SEARCH,
      name: '',
      tableData: [{ spec: '11' }],
      selectedRowKeys: []
    }
  },
  modals: { StorePutIn },
  methods: {
    onChange() {
      console.log(selectedRowKeys, 'selectedRowKeys')
    }
  }
}
</script>
