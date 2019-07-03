<template>
  <div :class="shelves()">
    <div :class="shelves('search')">
      <st-button
        type="primary"
        v-if="auth.batchDown"
        :disabled="isSelectedDisabled"
        class="mg-b16"
        @click="onBatchShelfDown"
      >批量下架</st-button>
      <div>
        <a-select
          style="width: 160px"
          class="mg-r8"
          v-model="query.card_type"
          @change="onSingleSearch('card_type',$event)"
        >
          <a-select-option
            v-for="(item,index) in cardType"
            :key="index"
            :value="item.value"
          >{{item.label}}</a-select-option>
        </a-select>
        <a-select
          style="width: 160px"
          class="mg-r8"
          v-model="query.publish_channel"
          @change="onSingleSearch('publish_channel',$event)"
        >
          <a-select-option
            v-for="(item,index) in publishChannel"
            :key="index"
            :value="item.value"
          >{{item.label}}</a-select-option>
        </a-select>
        <a-select
          style="width: 160px"
          showSearch
          placeholder="输入门店名称搜索"
          optionFilterProp="children"
          v-model="query.shop_id"
          @change="onSingleSearch('shop_id',$event)"
          :filterOption="filterOption"
        >
          <a-select-option :value="-1">所有门店</a-select-option>
          <a-select-option
            v-for="(item,index) in shopList"
            :key="index"
            :value="item.id"
          >{{item.shop_name}}</a-select-option>
        </a-select>
      </div>
    </div>
    <st-table
      :alertSelection="{onReset: onResetSelection}"
      :scroll="{x:1440}"
      :loading="loading.getShopList"
      :rowSelection="{selectedRowKeys,fixed:true, onChange: onSelectionChange}"
      @change="onTableChange"
      :columns="columns"
      :dataSource="list"
      :pagination="{current:query.current_page,total:page.total_counts ,pageSize:query.size }"
      rowKey="shelf_id"
    >
      <!-- 售卖门店 -->
      <template slot="shop_name" slot-scope="text">{{text}}</template>
      <!-- 会员卡名称 -->
      <template slot="card_name" slot-scope="text">{{text}}</template>
      <!-- 类型 -->
      <template slot="card_type" slot-scope="text">{{text.name}}</template>
      <!-- 有效期/有效次数 -->
      <template slot="time_gradient" slot-scope="text">{{text}}</template>
      <!-- 支持入场门店 -->
      <template slot="admission_range" slot-scope="text,record">
        <a
          v-if="text.id === 2"
          v-modal-link="{ name: 'card-brand-member-shop-table' , props:{id: record.id,type:'Sale',title:'支持入场门店'}}"
        >{{text.name}}</a>
        <span v-else class="use_num">{{text.name}}</span>
      </template>
      <!-- 售卖时间 -->
      <template
        slot="sell_time"
        slot-scope="text, record"
      >{{record.start_time}}&nbsp;~&nbsp;{{record.end_time}}</template>
      <!-- 售卖价格 -->
      <template
        slot="price_gradient"
        slot-scope="text"
      >
      <span>{{`${text[0]}${text[1]?'&nbsp;~&nbsp;'+text[1]:''}`}}</span></template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">{{text.name}}</template>
      <!-- 操作 -->
      <div slot="action" slot-scope="text,record">
        <st-table-actions>
          <router-link
            v-if="record.auth['brand_shop:product:member_card|get']"
            :to="{
              path: `/brand/product/card/member/${CARD_TYPE[record.card_type.id]}/info`,
              query: { id: record.id }
            }"
          >详情</router-link>
          <a
            v-if="record.auth['brand_shop:product:member_card|down']"
            @click="onShelfDown(record)"
          >下架</a>
          <a
            v-if="record.auth['brand_shop:product:member_card|down']"
            @click="onShelfDown(record)"
          >下架</a>
          <a
            v-if="record.auth['brand_shop:product:member_card|down']"
            @click="onShelfDown(record)"
          >下架</a>
          <a
            v-if="record.auth['brand_shop:product:member_card|down']"
            @click="onShelfDown(record)"
          >下架</a>
          <a
            v-if="record.auth['brand_shop:product:member_card|down']"
            @click="onShelfDown(record)"
          >下架</a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import { ShelvesService } from './shelves.service'
import { RouteService } from '@/services/route.service'
import { columns, CARD_TYPE } from './shelves.config.ts'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [ tableMixin ],
  bem: {
    shelves: 'page-brand-product-member-list-shelves'
  },
  events: {
    'card-member-list-shelves:onSingleSearch'(args) {
      this.onSingleSearch(...args)
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
      // 路由query订阅
      query: this.routeService.query$,

      // 服务数据订阅
      publishChannel: this.shelvesService.publishChannel$,
      cardType: this.shelvesService.cardType$,
      auth: this.shelvesService.auth$,
      loading: this.shelvesService.loading$,
      shopList: this.shelvesService.shopList$,
      list: this.shelvesService.list$,
      page: this.shelvesService.page$
    }
  },
  data() {
    return {
      CARD_TYPE
    }
  },
  computed: {
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
              this.onClear()
              this.$router.push({ force: true, query: this.query })
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
              this.$router.push({ force: true, query: this.query })
            })
        }
      })
    }
  }
}
</script>
