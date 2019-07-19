<template>
  <st-panel app class="page-brand-card-info page-brand-period-card-info" initial>
    <div class="page-brand-card-info-body">
      <!-- <div class="page-preview">实时预览</div> -->
      <div class="page-content">
        <div :class="item('card_name')" class="mb-24">
          <!-- 卡名称 -->
          <img
          :class="item('card_bg')"
          :src="cardInfo.card_bg.image_url | imgFilter({w:192,h:108})"
          width="192"
          height="108"
          alt="">
          <div :class="item('name_time')">
            <p :class="item('name')">
              <st-tag type="deposit-card"/>
              <span>{{cardInfo.card_name}}</span>
              <span :class="{'brand-card__selling':cardInfo.sell_status===1,'brand-card__sellstop':cardInfo.sell_status===2}">{{cardInfo.sell_status | enumFilter('deposit_card.sell_status')}}
                <a-popover
                  v-if="cardInfo.sell_status===2"
                  trigger="hover"
                  placement="bottomRight"
                  arrowPointAtCenter
                >
                  <div slot="content">
                    {{cardInfo.stop_reason}}
                  </div>
                  <a-icon type="info-circle"></a-icon>
                </a-popover>
              </span>
            </p>
            <p :class="item('time')">
              <span class="label">售卖时间：</span>
              <span class="value">{{cardInfo.start_time}} ~ {{cardInfo.end_time}}</span>
            </p>
          </div>
        </div>
        <div :class="item('admission_range')" class="mb-24">
          <!-- 支持入场范围 -->
          <p class="mb-8">
            <span class="label">支持消费门店：</span>
            <span class="value">{{canUseShop}}</span>
          </p>
          <st-container :class="item('scroll-container')" v-if="cardInfo.consumption_range.id===2">
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
        <div :class="item('support_sales')" class="mb-24">
          <!-- 售卖门店 -->
          <p class="mb-8">
            <span class="label">售卖门店：</span>
            <span class="value">{{cardInfo.support_sales | enumFilter('deposit_card.support_sales')}}</span>
            <span>(已上架{{cardInfo.can_use_shop_num}}家门店</span>
            <span>/共{{cardInfo.total_shop_num}}家门店)</span>
          </p>
          <st-container :class="item('scroll-container')" v-if="cardInfo.support_sales!==1">
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
                {{text}} 元
              </template>
              <template slot="sell_price" slot-scope="text">
                {{text}} 元
              </template>
              <template slot="deadline" slot-scope="text">
                {{text.number}} {{text.type|enumFilter('deposit_card.unit')}}
              </template>
            </st-table>
          </st-container>
        </div>
        <div :class="item('transfer')" class="mb-24">
          <!-- 转让设置 -->
          <p class="mb-8">
            <span class="label">转让设置：</span>
            <span class="value" v-if="cardInfo.is_transfer">支持转让，收费交易金额{{cardInfo.transfer_fee.number}}{{cardInfo.transfer_fee.type|enumFilter('deposit_card.transfer_unit')}}手续费</span>
            <span class="value" v-if="!cardInfo.is_transfer">不支持转让</span>
          </p>
        </div>
        <div :class="item('card_introduction')" class="mb-24">
          <!-- 会员卡说明 -->
          <p class="mb-8">
            <span class="label">储值卡说明：</span>
          </p>
          <st-container>{{cardInfo.card_contents?cardInfo.card_contents:'无'}}</st-container>
        </div>
        <div :class="item('card_contents')" class="mb-24">
          <!-- 备注 -->
          <p class="mb-8">
            <span class="label">备注：</span>
          </p>
          <st-container>{{cardInfo.description?cardInfo.description:'无'}}</st-container>
        </div>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { InfoService } from './info.service'
export default {
  bem: {
    item: 'brand-card'
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
  computed: {
    canUseShop() {
      let text = ''
      switch (this.cardInfo.consumption_range.id) {
        case 1:
          text = this.cardInfo.consumption_range.name
          break
        case 2:
          text = `共${this.cardInfo.can_use_shop_num}家门店`
          break
        case 3:
          text = '全门店'
          break
        default:
          text = '无'
      }
      return text
    }
  },
  data() {
    return {
      // 门店表头
      shop_columns: [
        {
          title: '省',
          dataIndex: 'province_name',
          width: '22%'
        },
        {
          title: '市',
          dataIndex: 'city_name',
          width: '22%'
        },
        {
          title: '区',
          dataIndex: 'district_name',
          width: '22%'
        },
        {
          title: '门店名称',
          dataIndex: 'shop_name',
          width: '34%'
        }
      ],
      // 售卖定价表头
      price_gradient_columns: [
        {
          title: '储值金额',
          scopedSlots: { customRender: 'card_price' },
          dataIndex: 'card_price'
        },
        {
          title: '售卖价格',
          scopedSlots: { customRender: 'sell_price' },
          dataIndex: 'sell_price'
        },
        {
          title: '有效期限',
          scopedSlots: { customRender: 'deadline' },
          dataIndex: 'deadline'
        }
      ]
    }
  }
}
</script>
