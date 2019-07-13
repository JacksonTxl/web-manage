<template>
  <st-panel app class="page-shop-card-info page-shop-period-card-info" initial>
    <div class="page-shop-card-info-body">
      <!-- <div class="page-preview">实时预览{{cardInfo}}</div> -->
      <div class="page-content">
        <div :class="item('card_name')" class="mb-24">
          <!-- 卡名称 -->
          <img
          v-if="cardInfo.card_bg"
          :class="item('card_bg')"
          :src="cardInfo.card_bg.image_url | imgFilter({w:192,h:108})"
          width="192"
          height="108"
          alt="">
          <div :class="item('name_time')">
            <p :class="item('name')">
              <st-tag type="period-card"/>
              <span>{{cardInfo.card_name}}</span>
              <span :class="{'shop-card__selling':cardInfo.sell_status.id===1,'shop-card__sellstop':cardInfo.sell_status.id===2}">{{cardInfo.sell_status.name}}
                <a-popover
                  v-if="cardInfo.sell_status.id===2"
                  trigger="hover"
                  placement="bottomRight"
                  arrowPointAtCenter
                >
                  <div slot="content">
                    {{cardInfo.sell_status.addition}}
                  </div>
                  <a-icon type="info-circle"></a-icon>
                </a-popover>
              </span>
              <span :class="item('shelf-status')">{{cardInfo.shelf_status | enumFilter('member_card.shelf_status')}}</span>
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
            <span class="label">支持入场门店：</span>
            <span class="value">{{cardInfo.admission_range.name}}</span>
          </p>
          <st-container :class="item('scroll-container')" v-if="cardInfo.admission_range.id===2">
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
            <span class="value">{{cardInfo.support_sales.name}}</span>
          </p>
          <st-container :class="item('scroll-container')" v-if="cardInfo.support_sales.id!==1">
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
            <span class="value">{{cardInfo.price_setting.name}}</span>
          </p>
        </div>
        <div :class="item('price_gradient')" class="mb-24">
          <!-- 售卖定价 -->
          <p class="mb-8">
            <span class="label">售卖定价：</span>
          </p>
          <st-container :class="item('scroll-container')">
            <st-table
              size="middle"
              rowKey="id"
              :columns="price_gradient_columns"
              :dataSource="cardInfo.price_gradient"
              :pagination="false"
              :scroll="{ y: 230 }"
            >
            </st-table>
          </st-container>
        </div>
        <div class="mb-24">
          <!-- 售卖方式 -->
          <p class="mb-8">
            <span class="label">售卖方式：</span>
            <span class="value" v-for="(item,index) in cardInfo.sell_type" :key="index">{{item.name}}&nbsp;&nbsp;</span>
          </p>
        </div>
        <div class="mb-24">
          <!-- 支持开卡方式 -->
          <p class="mb-8">
            <span class="label">支持开卡方式：</span>
            <span v-if="cardInfo.shelf_status===3" class="value" >无</span>
            <template v-else>
              <span class="value" v-for="(item,index) in cardInfo.activate_type" :key="index">{{item | enumFilter('member_card.activate_type')}}{{item===2?`(${cardInfo.automatic_num}天内未开卡，则自动开卡)`:''}}&nbsp;&nbsp;</span>
            </template>
          </p>
        </div>
        <div class="mb-24">
          <!-- 约课权益 -->
          <p class="mb-8">
            <span class="label">约课权益：</span>
            <span v-if="cardInfo.shelf_status===3" class="value" >无</span>
            <span v-else>{{cardInfo.course_interests | enumFilter('member_card.course_interests')}}</span>
          </p>
          <st-container :class="item('scroll-container')" v-if="cardInfo.course_interests===3&&cardInfo.shelf_status!==3">
            <st-table
              size="middle"
              rowKey="id"
              :columns="courses_columns"
              :dataSource="cardInfo.courses"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div class="mb-24">
          <!-- 入场时段 -->
          <p class="mb-8">
            <span class="label">入场时段：</span>
            <span v-if="cardInfo.shelf_status===3" class="value" >无</span>
            <template v-else>
              <span class="value">{{cardInfo.inout_type | enumFilter('member_card.inout_type')}}&nbsp;&nbsp;</span>
            </template>
          </p>
          <st-container v-if="cardInfo.inout_type===2&&cardInfo.shelf_status!==3">
            <a-list
              :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
              :dataSource="cardInfo.inout_time"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <a-card :title="weekList[item.week_day]">
                  <p v-for="(innerItem, innerIndex) in item.duration" :key="innerIndex">{{innerItem.start_time}}&nbsp;~&nbsp;{{innerItem.end_time}}</p>
                </a-card>
              </a-list-item>
            </a-list>
          </st-container>
        </div>
        <div class="mb-24">
          <!-- VIP场地通行 -->
          <p class="mb-8">
            <span class="label">VIP场地通行：</span>
            <span v-if="cardInfo.shelf_status===3 || !cardInfo.areas.length" class="value" >无</span>
            <template v-else>
              <span class="value" v-for="(item,index) in cardInfo.areas" :key="index">{{item.area_name}}&nbsp;&nbsp;</span>
            </template>
          </p>
        </div>
        <div :class="item('transfer')" class="mb-24">
          <!-- 转让设置 -->
          <p class="mb-8">
            <span class="label">转让设置：</span>
            <span class="value">{{cardInfo.is_transfer.name}}</span>
          </p>
        </div>
        <div :class="item('card_introduction')" class="mb-24">
          <!-- 会员卡说明 -->
          <p class="mb-8">
            <span class="label">会员卡说明：</span>
          </p>
          <st-container>{{cardInfo.card_introduction || '无'}}</st-container>
        </div>
        <div :class="item('card_contents')" class="mb-24">
          <!-- 备注 -->
          <p class="mb-8">
            <span class="label">备注：</span>
          </p>
          <st-container>{{cardInfo.card_contents || '无'}}</st-container>
        </div>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { InfoService } from './info.service'
export default {
  name: 'PageShopPeriodCardInfo',
  bem: {
    item: 'shop-card'
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
      // week
      weekList: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
          title: '期限',
          scopedSlots: { customRender: 'validity_period' },
          dataIndex: 'validity_period',
          width: '25%'
        },
        {
          title: '售价',
          scopedSlots: { customRender: 'sale_price' },
          dataIndex: 'sale_price',
          width: '25%'
        },
        {
          title: '允许冻结天数',
          scopedSlots: { customRender: 'frozen_day' },
          dataIndex: 'frozen_day',
          width: '25%'
        },
        {
          title: '赠送上限',
          scopedSlots: { customRender: 'gift_unit' },
          dataIndex: 'gift_unit',
          width: '25%'
        }
      ],
      // 约课权益表头
      courses_columns: [
        {
          title: '课程类别',
          scopedSlots: { customRender: 'course_type' },
          dataIndex: 'course_type',
          width: '33%'
        },
        {
          title: '课程类型',
          scopedSlots: { customRender: 'category' },
          dataIndex: 'category',
          width: '33%'
        },
        {
          title: '课程名称',
          scopedSlots: { customRender: 'course_name' },
          dataIndex: 'course_name',
          width: '34%'
        }
      ]
    }
  }
}
</script>
