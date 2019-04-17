<template>
  <st-panel app class="page-brand-period-card-info" initial>
    <div class="page-brand-period-card-info-body">
      <div class="page-preview">实时预览</div>
      <div class="page-content">
        <div :class="item('card_name')" class="mb-24">
          <!-- 卡名称 -->
          <img
          :class="item('card_bg')"
          src="http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/oRoVYhYc26wVMKb9.png"
          width="192"
          height="108"
          alt="">
          <div :class="item('name_time')">
            <p :class="item('name')">
              <st-tag type="period-card"/>
              <span>会员卡名称</span>
              <span>售卖中</span>
            </p>
            <p :class="item('time')">
              <span class="label">售卖时间：</span>
              <span class="value">2018/09/10 ~ 2019/10/10</span>
            </p>
          </div>
        </div>
        <div :class="item('support_sales')" class="mb-24">
          <!-- 售卖门店 -->
          <p class="mb-8">
            <span class="label">售卖门店：</span>
            <span class="value">全门店（已上架30家门店/共40家门店）</span>
          </p>
          <st-container>
            <a-table
              size="middle"
              :columns="shop_columns"
              :dataSource="shop_table"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div :class="item('admission_range')" class="mb-24">
          <!-- 支持入场范围 -->
          <p class="mb-8">
            <span class="label">支持入场范围：</span>
            <span class="value">共3家门店</span>
          </p>
          <st-container>
            <a-table
              size="middle"
              :columns="shop_columns"
              :dataSource="shop_table"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div :class="item('price_setting')" class="mb-24">
          <!-- 定价方式 -->
          <p class="mb-8">
            <span class="label">定价方式：</span>
            <span class="value">门店自主定价</span>
          </p>
        </div>
        <div :class="item('price_gradient')" class="mb-24">
          <!-- 售卖定价 -->
          <p class="mb-8">
            <span class="label">售卖定价：</span>
          </p>
          <st-container>
            <a-table
              size="middle"
              :columns="shop_columns"
              :dataSource="shop_table"
              :pagination="false"
              :scroll="{ y: 230 }"
            />
          </st-container>
        </div>
        <div :class="item('transfer')" class="mb-24">
          <!-- 转让设置 -->
          <p class="mb-8">
            <span class="label">转让设置：</span>
            <span class="value">支持转让，收费交易金额8%手续费</span>
          </p>
        </div>
        <div :class="item('card_introduction')" class="mb-24">
          <!-- 会员卡说明 -->
          <p class="mb-8">
            <span class="label">会员卡说明：</span>
          </p>
          <st-container>
            会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明
          </st-container>
        </div>
        <div :class="item('card_contents')" class="mb-24">
          <!-- 备注 -->
          <p class="mb-8">
            <span class="label">备注：</span>
          </p>
          <st-container>
            会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明会员卡说明
          </st-container>
        </div>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { InfoService } from './info.service'
export default {
  bem: {
    item: 'brand-period-card'
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  subscriptions() {
    return {
      cardInfo: this.infoService.cardInfo$
    }
  },
  mounted() {
    console.log(this.cardInfo)
  },
  data() {
    return {
      cardData: {
        admission_range: 1,
        price_setting: 1,
        support_sales: 1
      },
      // 支持入场门店
      admission_range_list: [
        { value: 1, label: '单个门店' },
        { value: 2, label: '多个门店' },
        { value: 3, label: '全部门店' }
      ],
      // 价格设置
      price_setting_list: [
        { value: 1, label: '品牌统一定价' },
        { value: 2, label: '场馆自主定价' }
      ],
      // 支持售卖门店
      support_sales_list: [
        { value: 0, label: '支持入场门店' },
        { value: 1, label: '全部门店' },
        { value: 2, label: '指定门店' }
      ],
      // 售卖渠道
      sell_type_list: [
        { value: 2, label: '线下售卖' },
        { value: 1, label: '用户端售卖' }
      ],

      shop_columns: [
        {
          title: '省',
          dataIndex: 'province',
          width: '22%'
        },
        {
          title: '市',
          dataIndex: 'city',
          width: '22%'
        },
        {
          title: '区',
          dataIndex: 'district',
          width: '22%'
        },
        {
          title: '门店名称',
          dataIndex: 'shopname',
          width: '34%'
        }
      ],
      shop_table: [
        {
          key: 1,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇1店'
        },
        {
          key: 2,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇2店'
        },
        {
          key: 3,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇3店'
        },
        {
          key: 4,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇4店'
        },
        {
          key: 5,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇5店'
        },
        {
          key: 6,
          province: '上海',
          city: '上海市',
          district: '徐汇区',
          shopname: '徐汇6店'
        }
      ],
      brand_price_columns: [
        {
          title: '期限',
          scopedSlots: { customRender: 'unit' },
          dataIndex: 'unit'
        },
        {
          title: '售价',
          scopedSlots: { customRender: 'rally_price' },
          dataIndex: 'rally_price'
        },
        {
          title: '允许冻结天数',
          scopedSlots: { customRender: 'frozen_day' },
          dataIndex: 'frozen_day'
        },
        {
          title: '赠送上限',
          scopedSlots: { customRender: 'gift_unit' },
          dataIndex: 'gift_unit'
        }
      ],
      brand_price_table: [
        {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }
      ],
      shop_price_columns: [
        {
          title: '期限',
          scopedSlots: { customRender: 'unit' },
          dataIndex: 'unit'
        },
        {
          title: '售价范围',
          scopedSlots: { customRender: 'rally_price' },
          dataIndex: 'rally_price',
          width: 180
        },
        {
          title: '允许冻结天数',
          scopedSlots: { customRender: 'frozen_day' },
          dataIndex: 'frozen_day'
        },
        {
          title: '赠送上限',
          scopedSlots: { customRender: 'gift_unit' },
          dataIndex: 'gift_unit'
        }
      ],
      shop_price_table: [
        {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }, {
          key: 1,
          unit: 10,
          rally_price: 11,
          frozen_day: 12,
          gift_unit: 13
        }
      ],
      nuit_list: [
        {
          value: 2,
          label: '天'
        },
        {
          value: 3,
          label: '月'
        },
        {
          value: 4,
          label: '年'
        }
      ]
    }
  },
  methods: {
    admission_range_delate(a, b, c) {
      console.log(a)
      console.log(b)
      console.log(c)
    }
  }
}
</script>
