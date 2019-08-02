<template>
  <div :class="shelves()">
    <div :class="shelves('search')" class="mg-b16">
      <div>
        <a-select
          style="width: 160px"
          class="mg-r8"
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
        <a-select
          style="width: 160px"
          showSearch
          placeholder="输入门店名称搜索"
          optionFilterProp="children"
          v-model="query.shop_id"
          @change="onSingleSearch('shop_id', $event)"
          :filterOption="filterOption"
        >
          <a-select-option :value="-1">所有门店</a-select-option>
          <a-select-option
            v-for="(item, index) in shopList"
            :key="index"
            :value="item.id"
          >
            {{ item.shop_name }}
          </a-select-option>
        </a-select>
      </div>
      <st-button
        v-if="auth.batchDown"
        type="primary"
        :disabled="!selectedRowKeys.length"
        @click="onBatchShelfDown"
      >
        批量下架
      </st-button>
    </div>
    <st-table
      :scroll="{ x: 1440 }"
      :page="page"
      :alertSelection="{ onReset: onSelectionReset }"
      @change="onTableChange"
      :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
      rowKey="key"
    >
      <!-- 售卖门店 -->
      <template slot="shop_name" slot-scope="text">
        {{ text }}
      </template>
      <!-- 会员卡名称 -->
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
            name: 'card-brand-deposit-shop-table',
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
              path: `/brand/product/card/deposit/info`,
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
import { columns } from './shelves.config.ts'
import tableMixin from '@/mixins/table.mixin'
export default {
  mixins: [tableMixin],
  name: 'PageBrandProductDepositShelves',
  bem: {
    shelves: 'page-brand-product-deposit-list-shelves'
  },
  events: {
    'brand-product-card-deposit-list-shelves:onSingleSearch'(
      key,
      data,
      options
    ) {
      this.onSingleSearch(key, data, options)
    }
  },
  serviceInject() {
    return {
      routeService: RouteService,
      shelvesService: ShelvesService
    }
  },
  rxState() {
    return {
      shopList: this.shelvesService.shopList$,
      publishChannel: this.shelvesService.publishChannel$,
      cardList: this.shelvesService.list$,
      page: this.shelvesService.page$,
      loading: this.shelvesService.loading$,
      query: this.routeService.query$,
      auth: this.shelvesService.auth$
    }
  },
  computed: {
    list() {
      let array = []
      this.cardList.forEach(i => {
        let key = parseInt(Math.random() * 999999).toString()
        array.push({ ...i, key: key })
      })
      return array
    },
    columns
  },
  methods: {
    // 门店下拉名称搜索
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input)
    },
    // 批量下架
    onBatchShelfDown() {
      let params = []
      this.selectedRows.forEach(i => {
        params.push({
          card_id: i.id,
          shop_id: i.shop_id
        })
      })
      this.$confirm({
        title: '批量下架',
        content: `确定下架所选的${this.selectedRowKeys.length}张会员卡吗？`,
        onOk: () => {
          return this.shelvesService
            .setCardShelfDown({ card_shop: params })
            .toPromise()
            .then(() => {
              this.onSelectionReset()
              this.onSearch()
            })
        }
      })
    },
    // 单个下架
    onShelfDown(record) {
      this.$confirm({
        title: '单个下架',
        content: `确定下架${record.card_name}会员卡吗？`,
        onOk: () => {
          return this.shelvesService
            .setCardShelfDown({
              card_shop: [{ card_id: record.id, shop_id: record.shop_id }]
            })
            .toPromise()
            .then(() => {
              this.onSearch()
            })
        }
      })
    }
  }
}
</script>
