<template>
  <st-panel
    app
    class="page-brand-card-info page-brand-period-card-info"
    initial
  >
    <div class="page-brand-card-info-body">
      <div class="page-preview">
        <h5-container>
          <template v-slot:title>
            购卡
          </template>
          <template v-slot:default>
            <member-card
              :data="cardInfo"
              :cardType="MEMBER_CARD.PERIOD_CARD"
            ></member-card>
          </template>
        </h5-container>
      </div>
      <div class="page-content">
        <div :class="item('card_name')" class="mb-24">
          <!-- 卡名称 -->
          <img
            :class="item('card_bg')"
            :src="cardInfo.card_bg.image_url | imgFilter({ w: 192, h: 108 })"
            width="192"
            height="108"
            alt=""
          />
          <div :class="item('name_time')">
            <p :class="item('name')">
              <st-tag type="period-card" />
              <span>{{ cardInfo.card_name }}</span>
              <span
                :class="{
                  'brand-card__selling':
                    cardInfo.sell_status.id === SELL_STATUS.CAN_SELL,
                  'brand-card__sellstop':
                    cardInfo.sell_status.id === SELL_STATUS.NO_SELL
                }"
              >
                {{ cardInfo.sell_status.name }}
                <a-popover
                  v-if="cardInfo.sell_status.id === SELL_STATUS.NO_SELL"
                  trigger="hover"
                  placement="bottomRight"
                  arrowPointAtCenter
                >
                  <div slot="content">
                    {{ cardInfo.sell_status.addition }}
                  </div>
                  <a-icon type="info-circle"></a-icon>
                </a-popover>
              </span>
            </p>
            <p :class="item('time')">
              <span class="label">售卖时间：</span>
              <span class="value">
                {{ cardInfo.start_time }} ~ {{ cardInfo.end_time }}
              </span>
            </p>
          </div>
        </div>
        <div :class="item('admission_range')" class="mb-24">
          <!-- 支持入场范围 -->
          <p class="mb-8">
            <span class="label">支持入场门店：</span>
            <span class="value">{{ cardInfo.admission_range.name }}</span>
          </p>
          <st-container
            :class="item('scroll-container')"
            v-if="cardInfo.admission_range.id === ADMISSION_RANGE.GENERAL_STORE"
          >
            <st-table
              size="middle"
              rowKey="shop_id"
              :columns="shop_columns"
              :dataSource="cardInfo.admission_shop_list"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div :class="item('support_sales')" class="mb-24">
          <!-- 售卖门店 -->
          <p class="mb-8">
            <span class="label">售卖门店：</span>
            <span class="value">
              {{ cardInfo.support_sales.name
              }}{{
                cardInfo.admission_range.id > ADMISSION_RANGE.ONLY_STORE
                  ? `（已上架${cardInfo.shelf_num}家门店/共${
                      cardInfo.sale_num
                    }家门店）`
                  : ''
              }}
            </span>
          </p>
          <st-container
            :class="item('scroll-container')"
            v-if="cardInfo.support_sales.id !== SUPPORT_SALES.ALL_STORE"
          >
            <st-table
              size="middle"
              rowKey="shop_id"
              :columns="shop_columns"
              :dataSource="cardInfo.sell_shop_list"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div :class="item('price_setting')" class="mb-24">
          <!-- 定价方式 -->
          <p class="mb-8">
            <span class="label">定价方式：</span>
            <span class="value">{{ cardInfo.price_setting.name }}</span>
          </p>
        </div>
        <div :class="item('price_gradient')" class="mb-24">
          <!-- 售卖定价 -->
          <p class="mb-8">
            <span class="label">售卖定价：</span>
          </p>
          <st-container :class="item('scroll-container')">
            <st-table
              v-if="cardInfo.price_setting.id === PRICE_SETTING.UNIFORM_PRICE"
              size="middle"
              rowKey="id"
              :columns="price_gradient_columns.brand"
              :dataSource="cardInfo.price_gradient"
              :pagination="false"
              :scroll="{ y: 230 }"
            ></st-table>
            <st-table
              v-if="cardInfo.price_setting.id === PRICE_SETTING.SHOP_PRICE"
              size="middle"
              rowKey="id"
              :columns="price_gradient_columns.shop"
              :dataSource="cardInfo.price_gradient"
              :pagination="false"
              :scroll="{ y: 230 }"
            ></st-table>
          </st-container>
        </div>
        <div :class="item('transfer')" class="mb-24">
          <!-- 转让设置 -->
          <p class="mb-8">
            <span class="label">转让设置：</span>
            <span class="value">{{ cardInfo.is_transfer.name }}</span>
          </p>
        </div>
        <div :class="item('card_introduction')" class="mb-24">
          <!-- 会员卡说明 -->
          <p class="mb-8">
            <span class="label">会员卡说明：</span>
          </p>
          <st-container>{{ cardInfo.card_introduction }}</st-container>
        </div>
        <div :class="item('card_contents')" class="mb-24">
          <!-- 备注 -->
          <p class="mb-8">
            <span class="label">备注：</span>
          </p>
          <st-container>{{ cardInfo.card_contents }}</st-container>
        </div>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { InfoService } from './info.service'
import MemberCard from '@/views/biz-components/h5/pages/member-card'
import H5Container from '@/views/biz-components/h5/h5-container'
import { MEMBER_CARD } from '@/views/biz-components/h5/pages/member-card.config'
import {
  ADMISSION_RANGE,
  PRICE_SETTING,
  SUPPORT_SALES,
  SELL_STATUS
} from '@/constants/card/member'
import { shop_columns, price_gradient_columns } from './info.config'
export default {
  name: 'BrandPeriodCardInfo',
  bem: {
    item: 'brand-card'
  },
  components: {
    MemberCard,
    H5Container
  },
  serviceProviders() {
    return [InfoService]
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      cardInfo: this.infoService.cardInfo$
    }
  },
  data() {
    return {
      ADMISSION_RANGE,
      PRICE_SETTING,
      SUPPORT_SALES,
      SELL_STATUS,
      MEMBER_CARD,
      // 门店表头
      shop_columns,
      // 售卖定价表头
      price_gradient_columns
    }
  }
}
</script>
