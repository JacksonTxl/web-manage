<template>
  <div :class="all()">
    <div :class="all('search')">
      <router-link v-if="auth.add" to="../add-select">
        <st-button type="primary" icon="add">新增会员卡</st-button>
      </router-link>
      <div>
        <a-select
          :class="all('search__select')"
          class="mg-r8"
          v-model="query.card_type"
          @change="onSingleSearch('card_type', $event)"
        >
          <a-select-option
            v-for="(item, index) in cardType"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
        <a-select
          :class="all('search__select')"
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
          :class="all('search__select')"
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
      <!-- 卡类型 -->
      <template slot="card_type" slot-scope="text">
        {{ text.name }}
      </template>
      <!-- 有效期/有效次数 -->
      <template slot="time_gradient" slot-scope="text">
        {{ text }}
      </template>
      <!-- 支持入场门店 -->
      <template slot="admission_range" slot-scope="text, record">
        <a
          v-if="text.id === ADMISSION_RANGE.GENERAL_STORE"
          v-modal-link="{
            name: 'card-brand-member-shop-table',
            props: { id: record.id, type: 'Consume', title: '支持入场门店' }
          }"
        >
          {{ text.name }}
        </a>
        <span v-else class="use_num">{{ text.name }}</span>
      </template>
      <!-- 支持售卖门店 -->
      <template slot="support_sales" slot-scope="text, record">
        <a
          v-if="text.id === SUPPORT_SALES.SPECIFIED_STORE"
          v-modal-link="{
            name: 'card-brand-member-shop-table',
            props: { id: record.id, type: 'Sale', title: '支持售卖门店' }
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
      <!-- 定价方式 -->
      <template slot="price_setting" slot-scope="text">
        {{ text.name }}
      </template>
      <!-- 售卖价格 -->
      <template slot="price_gradient" slot-scope="text">
        {{ `${text[0]}${text[1] ? '&nbsp;~&nbsp;' + text[1] : ''}` }}
      </template>
      <!-- 上架门店数 -->
      <template slot="shelf_upper" slot-scope="text">
        {{ text }}
      </template>
      <!-- 下架门店数 -->
      <template slot="shelf_lower" slot-scope="text">
        {{ text }}
      </template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">
        {{ text.name }}
      </template>
      <!-- 售卖状态 -->
      <template slot="sell_status" slot-scope="text, record">
        <a-badge
          :status="text.id === SELL_STATUS.CAN_SELL ? 'success' : 'error'"
        />
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
          <a-icon
            type="exclamation-circle"
            v-if="text.id === SELL_STATUS.NO_SELL"
          />
        </a-popover>
      </template>
      <!-- 操作 -->
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <router-link
            v-if="record.auth['brand_shop:product:member_card|get']"
            :to="{
              path: `/brand/product/card/member/${
                CARD_TYPE[record.card_type.id]
              }/info`,
              query: { id: record.id }
            }"
          >
            详情
          </router-link>
          <a
            v-if="record.auth['brand_shop:product:member_card|del']"
            @click="onDelete(record)"
          >
            删除
          </a>
          <a
            v-if="record.auth['brand_shop:product:member_card|down']"
            @click="onShelfDown(record)"
          >
            下架
          </a>
          <a
            v-if="record.auth['brand_shop:product:member_card|edit']"
            @click="onEdit(record)"
          >
            编辑
          </a>
          <a
            v-if="record.auth['brand_shop:product:member_card|up']"
            @click="onShelf(record)"
          >
            上架
          </a>
          <a
            v-if="record.auth['brand_shop:product:member_card|pause']"
            @click="onStopSale(record)"
          >
            停售
          </a>
          <a
            v-if="record.auth['brand_shop:product:member_card|restore']"
            @click="onRecoverSale(record)"
          >
            恢复售卖
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import { AllService } from './all.service'
import { RouteService } from '@/services/route.service'
import { columns, CARD_TYPE } from './all.config.ts'
import tableMixin from '@/mixins/table.mixin'
import CardBrandMemberRecoverSale from '@/views/biz-modals/card/brand-member/recover-sale'
import CardBrandMemberShelf from '@/views/biz-modals/card/brand-member/shelf'
import CardBrandMemberShopTable from '@/views/biz-modals/card/brand-member/shop-table'
import CardBrandMemberStopSale from '@/views/biz-modals/card/brand-member/stop-sale'
import { BRAND_PRODUCT_CARD_MEMBER_KEYWORDS_SEARCH } from '@/constants/events'
import {
  ADMISSION_RANGE,
  SUPPORT_SALES,
  SELL_STATUS
} from '@/constants/card/member'
export default {
  mixins: [tableMixin],
  name: 'PageBrandProductMemberAll',
  bem: {
    all: 'page-brand-product-member-list-all'
  },
  events: {
    [BRAND_PRODUCT_CARD_MEMBER_KEYWORDS_SEARCH](key, data) {
      this.onKeywordsSearch(key, data)
    }
  },
  modals: {
    CardBrandMemberRecoverSale,
    CardBrandMemberShelf,
    CardBrandMemberShopTable,
    CardBrandMemberStopSale
  },
  serviceInject() {
    return {
      routeService: RouteService,
      allService: AllService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.allService.list$,
      page: this.allService.page$,
      auth: this.allService.auth$,
      loading: this.allService.loading$,
      publishChannel: this.allService.publishChannel$,
      cardType: this.allService.cardType$,
      sellStatus: this.allService.sellStatus$
    }
  },
  data() {
    return {
      CARD_TYPE,
      ADMISSION_RANGE,
      SUPPORT_SALES,
      SELL_STATUS
    }
  },
  computed: {
    columns
  },
  methods: {
    // 编辑
    onEdit(record) {
      this.$router.push({
        path: `/brand/product/card/member/${
          this.CARD_TYPE[record.card_type.id]
        }/edit`,
        query: { id: record.id }
      })
    },
    // 上架
    onShelf(record) {
      this.$modalRouter.push({
        name: 'card-brand-member-shelf',
        props: {
          id: record.id
        },
        on: {
          success: () => {
            this.$router.push({
              force: true,
              query: { ...this.query, current_page: 1 }
            })
          }
        }
      })
    },
    // 停售
    onStopSale(record) {
      this.$modalRouter.push({
        name: 'card-brand-member-stop-sale',
        props: {
          id: +record.id,
          cardType: record.card_type.id,
          cardName: record.card_name
        },
        on: {
          success: () => {
            this.$router.push({
              force: true,
              query: { ...this.query, current_page: 1 }
            })
          }
        }
      })
    },
    // 恢复售卖
    onRecoverSale(record) {
      this.$modalRouter.push({
        name: 'card-brand-member-recover-sale',
        props: {
          id: record.id,
          cardType: record.card_type.id,
          cardName: record.card_name
        },
        on: {
          success: () => {
            this.$router.push({
              force: true,
              query: { ...this.query, current_page: 1 }
            })
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
              this.$router.push({
                force: true,
                query: { ...this.query, current_page: 1 }
              })
            })
        }
      })
    }
  }
}
</script>
