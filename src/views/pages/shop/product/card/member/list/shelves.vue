<template>
  <div :class="shelves()">
    <div :class="shelves('search')">
      <a-select
      style="width: 160px"
      class="mg-r8"
      v-model="query.card_type"
      @change="onSingleSearch('card_type',$event)"
      >
        <a-select-option v-for="(item,index) in cardType" :key="index" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
      <a-select
      style="width: 160px"
      v-model="query.publish_channel"
      @change="onSingleSearch('publish_channel',$event)"
      >
        <a-select-option v-for="(item,index) in publishChannel" :key="index" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <st-table
      :scroll="{x:1440}"
      :page='page'
      @change='onTableChange'
      :loading="loading.getList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
      >
      <!-- 会员卡名称 -->
      <template slot="card_name" slot-scope="text">
        {{text}}
      </template>
      <!-- 类型 -->
      <template slot="card_type" slot-scope="text">
        {{text.name}}
      </template>
      <!-- 有效期/有效次数 -->
      <template slot="time_gradient" slot-scope="text">
        {{text}}
      </template>
      <!-- 支持入场门店 -->
      <template slot="admission_range" slot-scope="text,record">
        <modal-link
          v-if="text.id === 2"
          tag="a"
          :to="{ name: 'card-brand-member-shop-table' , props:{id: record.id,type:'Sale',title:'支持入场门店'}}"
        >{{text.name}}</modal-link>
        <span v-else class="use_num">{{text.name}}</span>
      </template>
      <!-- 售卖时间 -->
      <template slot="sell_time" slot-scope="text, record">
        {{record.start_time}}&nbsp;~&nbsp;{{record.end_time}}
      </template>
      <!-- 售卖价格 -->
      <template slot="price_gradient" slot-scope="text">
        {{`${text[0]}${text[1]?'&nbsp;~&nbsp;'+text[1]:''}`}}
      </template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">
        {{text.name}}
      </template>
      <!-- 操作 -->
      <div slot="action" slot-scope="text,record">
        <st-table-actions>
          <router-link
            v-if="record.auth['brand_shop:product:member_card|get']"
            :to="{
              path: `/shop/product/card/member/${CARD_TYPE[record.card_type.id]}/info`,
              query: { id: record.id }
            }"
          >详情</router-link>
          <a v-if="record.auth['brand_shop:product:member_card|down']" @click="onShelfDown(record)">下架</a>
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
  name: 'PageShopProductMemberShelves',
  bem: {
    shelves: 'page-shop-product-member-list-shelves'
  },
  events: {
    'shop-product-card-member-list-shelves:onSingleSearch'(key, data, options) {
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
      loading: this.shelvesService.loading$,
      publishChannel: this.shelvesService.publishChannel$,
      cardType: this.shelvesService.cardType$,
      list: this.shelvesService.list$,
      page: this.shelvesService.page$,
      query: this.routeService.query$
    }
  },
  computed: {
    columns
  },
  data() {
    return {
      CARD_TYPE
    }
  },
  methods: {
    // 下架
    onShelfDown(record) {
      this.$confirm({
        title: '下架会员卡',
        content: `确定下架${record.card_name}会员卡吗？`,
        onOk: () => {
          return this.shelvesService.setCardShelfDown(record.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    }
  }
}
</script>
