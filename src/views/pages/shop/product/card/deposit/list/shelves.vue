<template>
  <div :class="shelves()">
    <div :class="shelves('search')">
      <a-select
        style="width: 160px"
        v-model="query.publish_channel"
        @change="onSingleSearch('publish_channel', $event)"
      >
        <a-select-option
          v-for="(item, index) in publishChannel"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <st-table
      :scroll="{ x: 1440 }"
      :page="page"
      @change="onTableChange"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <!-- 卡名称 -->
      <template slot="card_name" slot-scope="text">
        {{ text }}
      </template>
      <!-- 有效期 -->
      <template slot="num" slot-scope="text, record">
        {{ text }}{{ record.unit | enumFilter('deposit_card.unit') }}
      </template>
      <!-- 储值金额 -->
      <template slot="card_price" slot-scope="text">
        {{ text }}
      </template>
      <!-- 售卖价格 -->
      <template slot="sell_price" slot-scope="text">
        {{ text }}
      </template>
      <!-- 支持消费门店 -->
      <template slot="consumption_range" slot-scope="text, record">
        <a
          v-if="text.id === 2"
          v-modal-link="{
            name: 'card-shop-deposit-shop-table',
            props: { id: record.id, type: 'Consume', title: '支持消费门店' }
          }"
        >
          {{ text.name }}
        </a>
        <span v-else class="use_num">{{ text.name }}</span>
      </template>
      <!-- 支持售卖时间 -->
      <template slot="sell_time" slot-scope="text, record">
        {{ record.start_time }}&nbsp;~&nbsp;{{ record.end_time }}
      </template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">
        {{ text.name }}
      </template>
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <router-link
            v-if="record.auth['brand_shop:product:deposit_card|get']"
            :to="{
              path: `/shop/product/card/deposit/info`,
              query: { id: record.id }
            }"
          >
            详情
          </router-link>
          <a
            v-if="record.auth['brand_shop:product:deposit_card|down']"
            @click="onShelfDown(record)"
          >
            下架
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import { ShelvesService } from './shelves.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './shelves.config.ts'
import CardShopDepositShopTable from '@/views/biz-modals/card/shop-deposit/shop-table'
import { SHOP_PRODUCT_CARD_DEPOSIT_KEYWORDS_SEARCH } from '@/constants/events'
export default {
  mixins: [tableMixin],
  name: 'PageShopProductDepositShelves',
  bem: {
    shelves: 'page-shop-product-deposit-list-shelves'
  },
  events: {
    [SHOP_PRODUCT_CARD_DEPOSIT_KEYWORDS_SEARCH](key, data) {
      this.onKeywordsSearch(key, data)
    }
  },
  modals: {
    CardShopDepositShopTable
  },
  serviceInject() {
    return {
      routeService: RouteService,
      shelvesService: ShelvesService
    }
  },
  rxState() {
    return {
      loading: this.shelvesService.loading$,
      publishChannel: this.shelvesService.publishChannel$,
      list: this.shelvesService.list$,
      page: this.shelvesService.page$,
      query: this.routeService.query$
    }
  },
  computed: {
    columns
  },
  methods: {
    // 下架
    onShelfDown(record) {
      this.$confirm({
        title: '下架会员卡',
        content: `确定下架${record.card_name}储值卡吗？`,
        onOk: () => {
          return this.shelvesService
            .setCardShelfDown(record.id)
            .toPromise()
            .then(() => {
              this.$router.push({ force: true, query: this.query })
            })
        }
      })
    }
  }
}
</script>
