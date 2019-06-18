<template>
  <st-modal
  title="批量上架会员卡"
  v-model="show"
  wrapClassName="modal-card-batch-shelves"
  width="668px">
  <section :class="shelves('content')">
    <div :class="shelves('info')" class="mg-b24">
      <img
      :class="shelves('card_bg')"
      v-if="info.card_bg"
      :src="info.card_bg.img_url | imgFilter({w:142,h:80})"
      width="142"
      height="80"
      alt="卡背景">
      <div :class="shelves('detail')">
        <p :class="shelves('detail-title')">
          <st-tag :type="cardTypeTag[info.card_type.id]" style="margin-right:8px;"/>
          {{info.card_name}}
        </p>
        <p :class="shelves('detail-cards')">
            本次共上架{{info.shelf_shop_num}}家门店，<span @click="onCardInfo">查看明细</span>
        </p>
        <p :class="shelves('detail-saletype')" v-if="info.sell_type">{{info.sell_type.name}}</p>
      </div>
    </div>
    <st-form :form="form" labelWidth="67px" :class="shelves('form')">
      <div :class="shelves('price')" class="mg-b18" v-if="info.price_setting.id===1">
        <st-form-table>
          <colgroup>
            <col style="width:4%;">
            <col style="width:16%;">
            <col style="width:22%;">
            <col style="width:22%;">
            <col style="width:18%;">
            <col style="width:18%;">
          </colgroup>
          <tr>
            <th></th>
            <th>次数</th>
            <th>售卖价格</th>
            <th>有效期限</th>
            <th>允许冻结</th>
            <th>赠送上限</th>
          </tr>
          <tbody>
            <tr v-for="(item,index) in info.price_gradient" :key="index">
              <td></td>
              <td>{{item.num}}{{item.unit | enumFilter('deposit_card.unit')}}</td>
              <td>{{item.rally_price}}</td>
              <td>没给数据</td>
              <td>{{item.frozen_day}}</td>
              <td>{{item.gift_unit}}</td>
            </tr>
          </tbody>
        </st-form-table>
      </div>
      <st-form-item labelGutter="12px" label="开卡方式" required>
        <a-checkbox-group v-model="info.open_type_list" :class="shelves('open-type')">
          <a-checkbox :value="3">指定日期开卡</a-checkbox>
          <a-checkbox :value="2">购买即开卡</a-checkbox>
          <span :class="shelves('day-input')">
            <a-checkbox :value="1">
              到店开卡
              <a-tooltip placement="right">
                <template slot="title">
                  <span>prompt text</span>
                </template>
                <a-icon type="info-circle"/>
              </a-tooltip>
            </a-checkbox>
            <div class="autoplay-card-day" v-if="info.open_type_list.includes(1)">
              <st-input-number v-model="openDay" class="autoplay-card-day-input">
                <span slot="addonAfter">天</span>
              </st-input-number>
              <span>内未开卡，则自动开卡</span>
            </div>
          </span>
        </a-checkbox-group>
      </st-form-item>
      <st-form-item labelGutter="12px" label="约课权益" class="mg-b16" required>
        <a-radio-group :class="shelves('course')">
          <a-radio :style="radioStyle" v-for="(item, index) in 3" :value="item" :key="index">{{item}}11111111</a-radio>
        </a-radio-group>
      </st-form-item>
      <div :class="shelves('course-list')" class="mg-b24">
        <table>
          <colgroup>
            <col style="width:10%;">
            <col style="width:19%;">
            <col style="width:19%;">
            <col style="width:30%;">
            <col style="width:22%;">
          </colgroup>
          <tr class="head">
            <th class="tx-c">
              <a-checkbox/>
            </th>
            <th>课程类别</th>
            <th>课程类型</th>
            <th>课程名称</th>
            <th>操作</th>
          </tr>
          <tbody>
            <tr>
              <td class="tx-c">
                <a-checkbox/>
              </td>
              <td>团体课程</td>
              <td>瑜珈</td>
              <td>王大多的课</td>
              <td>删除</td>
            </tr>
            <tr class="add-button">
              <td colspan="5">
                <a-button block type="dashed">
                  <st-icon type="add"></st-icon>
                  添加
                </a-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :class="shelves('show-more')" class="mg-b18">
        <span>展开更多设置</span>
        <st-icon type="down-small" />
      </div>
      <st-form-item labelGutter="12px" label="入场时段" class="mg-b16" required>
        <a-radio-group>
          <a-radio v-for="(item, index) in 2" :value="item" :key="index">{{item}}11111111</a-radio>
        </a-radio-group>
      </st-form-item>
      <st-shop-hour-picker></st-shop-hour-picker>
      <st-form-item labelGutter="12px" class="mg-t18 mg-b8" labelWidth="78px" label="VIP场地通行">仅支持门店设置</st-form-item>
      <div :class="shelves('hide-more')">
        <span>收起</span>
      </div>
    </st-form>
  </section>
  <template slot="footer">
    <div :class="shelves('footer')">
        <st-button>取消</st-button>
        <st-button type="primary">确认上架</st-button>
    </div>
  </template>
  </st-modal>
</template>
<script>
import { BatchShelvesService } from './batch-shelves.service'
export default {
  name: 'ModalCardBatchShelves',
  bem: {
    shelves: 'modal-card-batch-shelves'
  },
  serviceInject() {
    return {
      batchShelvesService: BatchShelvesService
    }
  },
  rxState() {
    return {
      info: this.batchShelvesService.info$
    }
  },
  props: ['id'],
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      // 卡tag类型
      cardTypeTag: {
        1: 'number-card',
        2: 'period-card'
      },
      // 到店开卡天数
      openDay: null,

      image_url: 'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/20190612/DVu9Xd-G4pxwn4bK.png'
    }
  },
  methods: {
    onCardInfo() {
      console.log(111)
    }
  },
  created() {
    console.log(1)
    this.batchShelvesService.getInfo(this.id).subscribe()
  }
}
</script>
