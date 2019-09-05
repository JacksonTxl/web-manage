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
              :cardType="MEMBER_CARD.DEPOSIT_CARD"
            ></member-card>
          </template>
        </h5-container>
      </div>
      <div class="page-content">
        <div :class="item('card_name')" class="mb-24">
          <!-- 卡名称 -->
          <div class="st-preview-item" v-viewer="{ url: 'data-src' }">
            <img
              :class="item('card_bg')"
              :data-src="cardInfo.card_bg.image_url"
              :src="cardInfo.card_bg.image_url | imgFilter({ w: 192, h: 108 })"
              width="192"
              height="108"
              alt=""
            />
          </div>
          <div :class="item('name_time')">
            <p :class="item('name')">
              <st-tag type="deposit-card" />
              <span>{{ cardInfo.card_name }}</span>
              <span
                :class="{
                  'brand-card__selling':
                    cardInfo.sell_status === SELL_STATUS.CAN_SELL,
                  'brand-card__sellstop':
                    cardInfo.sell_status === SELL_STATUS.NO_SELL
                }"
              >
                {{
                  cardInfo.sell_status | enumFilter('deposit_card.sell_status')
                }}
                <a-popover
                  v-if="cardInfo.sell_status === SELL_STATUS.NO_SELL"
                  trigger="hover"
                  placement="bottomRight"
                  arrowPointAtCenter
                >
                  <div slot="content">
                    {{ cardInfo.stop_reason }}
                  </div>
                  <a-icon type="info-circle"></a-icon>
                </a-popover>
              </span>
              <span :class="item('shelf-status')" v-if="cardInfo.shelf_status">
                {{ cardInfo.shelf_status.name }}
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
            <span class="label">支持消费门店：</span>
            <span class="value">{{ canUseShop }}</span>
          </p>
          <st-container
            :class="item('scroll-container')"
            v-if="
              cardInfo.consumption_range.id === CONSUMPTION_RANGE.GENERAL_STORE
            "
          >
            <st-table
              size="middle"
              rowKey="shop_id"
              :columns="shop_columns"
              :dataSource="cardInfo.can_use_shop"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div class="mb-24">
          <!-- 支持消费类目 -->
          <p class="mb-8">
            <span class="label">支持消费类目：</span>
            <span
              v-if="!cardInfo.consumer_type || !cardInfo.consumer_type.length"
            >
              无
            </span>
            <template v-else>
              <span
                v-for="(item, index) in cardInfo.consumer_type"
                :key="index"
              >
                {{
                  item | enumFilter('deposit_card.consumer_type')
                }}&nbsp;&nbsp;
              </span>
            </template>
          </p>
        </div>
        <div :class="item('support_sales')" class="mb-24">
          <!-- 售卖门店 -->
          <p class="mb-8">
            <span class="label">售卖门店：</span>
            <span class="value">{{ cardInfo.shop_name }}</span>
          </p>
          <st-container
            :class="item('scroll-container')"
            v-if="cardInfo.support_sales !== SUPPORT_SALES.ALL_STORE"
          >
            <st-table
              size="middle"
              rowKey="shop_id"
              :columns="shop_columns"
              :dataSource="cardInfo.support_shop"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div class="mb-24">
          <!-- 售卖方式 -->
          <p class="mb-8">
            <span class="label">售卖方式：</span>
            <span
              class="value"
              v-for="(item, index) in cardInfo.sell_type"
              :key="index"
            >
              <i v-if="index > 0">/</i>
              {{ item | enumFilter('deposit_card.sell_type') }}
            </span>
          </p>
        </div>
        <div :class="item('price_gradient')" class="mb-24">
          <!-- 售卖定价 -->
          <p class="mb-8">
            <span class="label">售卖定价：</span>
          </p>
          <st-container>
            <st-table
              size="middle"
              rowKey="card_price"
              :columns="price_gradient_columns"
              :dataSource="[cardInfo.price]"
              :pagination="false"
            >
              <template slot="card_price" slot-scope="text">
                {{ text }} 元
              </template>
              <template slot="sell_price" slot-scope="text">
                {{ text }} 元
              </template>
              <template slot="deadline" slot-scope="text">
                {{ text.number }}
                {{ text.type | enumFilter('deposit_card.unit') }}
              </template>
            </st-table>
          </st-container>
        </div>
        <div :class="item('transfer')" class="mb-24">
          <!-- 转让设置 -->
          <p class="mb-8">
            <span class="label">转让设置：</span>
            <span class="value" v-if="cardInfo.is_transfer">
              支持转让，收费交易金额{{ cardInfo.transfer_fee.number
              }}{{
                cardInfo.transfer_fee.type
                  | enumFilter('deposit_card.transfer_unit')
              }}手续费
            </span>
            <span class="value" v-if="!cardInfo.is_transfer">不支持转让</span>
          </p>
        </div>
        <div :class="item('card_introduction')" class="mb-24">
          <!-- 会员卡说明 -->
          <p class="mb-8">
            <span class="label">储值卡说明：</span>
          </p>
          <st-container>{{ cardInfo.card_contents || '无' }}</st-container>
        </div>
        <div :class="item('card_contents')" class="mb-24">
          <!-- 备注 -->
          <p class="mb-8">
            <span class="label">备注：</span>
          </p>
          <st-container>{{ cardInfo.description || '无' }}</st-container>
        </div>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { InfoService } from './info.service'
import MemberCard from '@/views/biz-components/h5/pages/member-card'
import H5Container from '@/views/biz-components/h5/h5-container'
import { MEMBER_CARD } from '@/views/biz-components/h5/pages/member-card.config'
import {
  SELL_STATUS,
  SUPPORT_SALES,
  CONSUMPTION_RANGE
} from '@/constants/card/deposit'
import { shop_columns, price_gradient_columns } from './info.config'
export default {
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
      infoService: InfoService,
      userService: UserService
    }
  },
  rxState() {
    return {
      shopName: this.userService.shop$,
      cardInfo: this.infoService.cardInfo$,
      deposit_card: this.userService.depositCardEnums$
    }
  },
  data() {
    return {
      SELL_STATUS,
      SUPPORT_SALES,
      CONSUMPTION_RANGE,
      MEMBER_CARD,
      shop_columns,
      price_gradient_columns
    }
  },
  computed: {
    canUseShop() {
      let text = ''
      switch (this.cardInfo.consumption_range.id) {
        case CONSUMPTION_RANGE.ONLY_STORE:
          text = this.cardInfo.consumption_range.name
          break
        case CONSUMPTION_RANGE.GENERAL_STORE:
          text = `共${this.cardInfo.can_use_shop_num}家门店`
          break
        case CONSUMPTION_RANGE.ALL_STORE:
          text = '全门店'
          break
        default:
          text = '无'
      }
      return text
    }
  },
  mounted() {
    let consumerEnum = this.deposit_card.consumer_type.value
    this.cardInfo.consumerList = this.cardInfo.consumer_type.map(
      item => consumerEnum[item]
    )
  }
}
</script>
