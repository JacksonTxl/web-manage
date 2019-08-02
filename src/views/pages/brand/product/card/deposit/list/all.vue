<template>
  <div :class="all()">
    <div :class="all('search')">
      <router-link v-if="auth.add" to="../add">
        <st-button type="primary" icon="add">新增储值卡</st-button>
      </router-link>
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
          v-model="query.sell_status"
          @change="onSingleSearch('sell_status', $event)"
        >
          <a-select-option
            v-for="(item, index) in sellStatus"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <st-table
      :scroll="{ x: 1800 }"
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
      <!-- 支持售卖门店 -->
      <template slot="support_sales" slot-scope="text, record">
        <a
          v-if="text.id === 2"
          v-modal-link="{
            name: 'card-brand-deposit-shop-table',
            props: { id: record.id, type: 'Sale', title: '支持售卖门店' }
          }"
        >
          {{ text.name }}
        </a>
        <span v-else class="use_num">{{ text.name }}</span>
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
      <!-- 上架门店数 -->
      <template slot="upper_shelf_num" slot-scope="text">
        {{ text }}
      </template>
      <!-- 下架门店数 -->
      <template slot="lower_shelf_num" slot-scope="text">
        {{ text }}
      </template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">
        {{ text.name }}
      </template>
      <!-- 售卖状态 -->
      <template slot="sell_status" slot-scope="text, record">
        <a-badge :status="text.id === 1 ? 'success' : 'error'" />
        {{ text.name }}
        <a-popover
          v-if="record.stop_sale"
          :title="
            `操作人:${record.stop_sale.operator_name}  操作时间:${
              record.stop_sale.stop_time
            }`
          "
          trigger="click"
          placement="bottomRight"
          :overlayStyle="{ width: '336px' }"
        >
          <template slot="content">
            <p>{{ record.stop_sale.stop_reason }}</p>
          </template>
          <a-icon type="exclamation-circle" v-if="text.id === 2" />
        </a-popover>
      </template>
      <!-- 操作 -->
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
            v-if="record.auth['brand_shop:product:deposit_card|edit']"
            @click="onEdit(record)"
          >
            编辑
          </a>
          <a
            v-if="record.auth['brand_shop:product:deposit_card|up']"
            @click="onShelf(record)"
          >
            上架
          </a>
          <a
            v-if="record.auth['brand_shop:product:deposit_card|pause']"
            @click="onStopSale(record)"
          >
            停售
          </a>
          <a
            v-if="record.auth['brand_shop:product:deposit_card|restore']"
            @click="onRecoverSale(record)"
          >
            恢复售卖
          </a>
          <a
            v-if="record.auth['brand_shop:product:deposit_card|del']"
            @click="onDelete(record)"
          >
            删除
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import { AllService } from './all.service'
import { RouteService } from '@/services/route.service'
import { columns } from './all.config.ts'
import tableMixin from '@/mixins/table.mixin'
export default {
  mixins: [tableMixin],
  name: 'PageBrandProductDepositAll',
  bem: {
    all: 'page-brand-product-deposit-list-all'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      allService: AllService
    }
  },
  events: {
    'brand-product-card-deposit-list-all:onSingleSearch'(key, data, options) {
      this.onSingleSearch(key, data, options)
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      sellStatus: this.allService.sellStatus$,
      loading: this.allService.loading$,
      publishChannel: this.allService.publishChannel$,
      list: this.allService.list$,
      page: this.allService.page$,
      auth: this.allService.auth$
    }
  },
  computed: {
    columns
  },
  methods: {
    // 编辑
    onEdit(record) {
      this.$router.push({
        path: `/brand/product/card/deposit/edit`,
        query: { id: record.id }
      })
    },
    // 上架
    onShelf(record) {
      this.$confirm({
        title: '上架',
        content: `确认上架${record.card_name}储值卡至${
          record.wait_shelf_num
        }家门店？`,
        onOk: () => {
          return this.allService
            .setShelf(record.id)
            .toPromise()
            .then(() => {
              this.$router.push({ force: true, query: this.query })
            })
        }
      })
    },
    // 停售
    onStopSale(record) {
      this.$modalRouter.push({
        name: 'card-brand-deposit-stop-sale',
        props: {
          id: +record.id,
          cardName: record.card_name
        },
        on: {
          success: () => {
            this.$router.push({ query: this.query, force: true })
          }
        }
      })
    },
    // 恢复售卖
    onRecoverSale(record) {
      this.$modalRouter.push({
        name: 'card-brand-deposit-recover-sale',
        props: {
          id: record.id,
          cardName: record.card_name
        },
        on: {
          success: () => {
            this.$router.push({ query: this.query, force: true })
          }
        }
      })
    },
    // 删除
    onDelete(record) {
      this.$confirm({
        title: '确认要删除',
        content: `确认删除${record.card_name}会员卡？`,
        onOk: () => {
          return this.allService
            .deleteCard(record.id)
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
