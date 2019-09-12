<template>
  <st-panel
    app
    class="page-brand-basic-card page-brand-add-number-card"
    initial
  >
    <div class="page-brand-basic-card-body">
      <div class="page-preview">
        <h5-container>
          <template v-slot:title>
            购卡
          </template>
          <template v-slot:default>
            <member-card
              :data="h5CardInfo"
              :cardType="MEMBER_CARD.NUMBER_CARD"
            ></member-card>
          </template>
        </h5-container>
      </div>
      <div class="page-content">
        <st-form :form="form" labelWidth="118px">
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="22">
              <st-form-item
                class="page-content-card-line"
                label="次卡名称"
                required
              >
                <a-input
                  v-decorator="decorators.cardData.card_name"
                  maxlength="30"
                  class="page-content-card-input"
                  placeholder="请输入次卡名称"
                  @change="syncName"
                ></a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <st-hr></st-hr>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item
                class="page-content-card-admission-range mt-4"
                required
              >
                <template slot="label">
                  支持入场范围
                  <st-help-tooltip id="TBMCTC001" />
                </template>
                <a-radio-group
                  @change="admission_range"
                  v-decorator="decorators.cardData.admission_range"
                >
                  <a-radio
                    v-for="item in admissionRange"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-radio-group>
                <div
                  class="page-admission-range-shop"
                  v-if="
                    cardData.admission_range === ADMISSION_RANGE.GENERAL_STORE
                  "
                >
                  <p class="page-admission-range-shop__describe">
                    设置支持此会员卡出入场馆范围
                  </p>
                  <select-shop
                    :shopIds="cardData.admission_shop_list"
                    @change="admission_range_change"
                  ></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :span="24">
              <st-form-item
                class="page-content-card-price-setting mt-4"
                required
                :help="priceValidatorText"
              >
                <template slot="label">
                  价格设置
                  <st-help-tooltip id="TBMCTC002" />
                </template>
                <a-radio-group
                  @change="price_range"
                  v-show="
                    cardData.admission_range === ADMISSION_RANGE.ONLY_STORE
                  "
                  v-decorator="decorators.cardData.price_setting"
                >
                  <a-radio
                    v-for="item in priceSetting"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-radio-group>
                <div
                  class="page-price-setting-set"
                  :class="{
                    error: !priceIsOk,
                    'brand-set':
                      cardData.price_setting === PRICE_SETTING.UNIFORM_PRICE &&
                      cardData.admission_range === ADMISSION_RANGE.ONLY_STORE
                  }"
                  v-if="cardData.price_setting === PRICE_SETTING.UNIFORM_PRICE"
                >
                  <st-form-table>
                    <colgroup>
                      <col />
                      <col />
                      <col style="width:25%;" />
                      <col />
                      <col />
                      <col style="width:60px;" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>入场次数/次</th>
                        <th>售价/元</th>
                        <th>有效期</th>
                        <th class="white-nowrap">允许冻结/天</th>
                        <th class="white-nowrap">赠送上限/天</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="6" class="pd-y0 pd-x0">
                          <st-button
                            :disabled="rallyPriceList.length > 3"
                            type="dashed"
                            icon="add"
                            class="page-price-setting-set__add"
                            block
                            @click="brand_price_add"
                          >
                            添加定价规格（{{ rallyPriceList.length }}/4）
                          </st-button>
                        </td>
                      </tr>
                      <tr
                        v-for="(item, index) in rallyPriceList"
                        :key="`${index}brand`"
                      >
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            placeholder="入场次数"
                            @change="
                              e =>
                                brandPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'validity_times'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            :float="true"
                            :min="0"
                            :max="999999.9"
                            placeholder="售价"
                            @change="
                              e =>
                                brandPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'rally_price'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            :value="item.time.num"
                            placeholder="有效期"
                            @change="
                              e =>
                                brandPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'time',
                                  prop: 'num'
                                })
                            "
                          >
                            <a-select
                              slot="addonAfter"
                              :value="item.time.unit"
                              @change="
                                e =>
                                  brandPriceSettingHandleChange({
                                    value: e,
                                    key: index,
                                    col: 'time',
                                    prop: 'unit'
                                  })
                              "
                            >
                              <a-select-option
                                v-for="(item, index) in unit_list"
                                :value="item.value"
                                :key="index"
                              >
                                {{ item.label }}
                              </a-select-option>
                            </a-select>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            placeholder="允许冻结"
                            @change="
                              e =>
                                brandPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'frozen_day'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            placeholder="赠送上限"
                            @change="
                              e =>
                                brandPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'gift_unit'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <a @click="brand_price_delete(index)">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </st-form-table>
                </div>
                <div
                  class="page-price-setting-set"
                  :class="{
                    error: !priceIsOk,
                    'shop-set':
                      cardData.price_setting === PRICE_SETTING.SHOP_PRICE &&
                      cardData.admission_range === ADMISSION_RANGE.ONLY_STORE
                  }"
                  v-if="cardData.price_setting === PRICE_SETTING.SHOP_PRICE"
                >
                  <st-form-table>
                    <colgroup>
                      <col />
                      <col />
                      <col style="width:20%;" />
                      <col />
                      <col />
                      <col style="width:60px;" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>入场次数/次</th>
                        <th>售价范围/元</th>
                        <th>有效期</th>
                        <th class="white-nowrap">冻结天数/天</th>
                        <th>赠送上限/天</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="6" class="pd-y0 pd-x0">
                          <st-button
                            :disabled="shopPriceList.length > 3"
                            type="dashed"
                            icon="add"
                            class="page-price-setting-set__add"
                            block
                            @click="shop_price_add"
                          >
                            添加定价规格（{{ shopPriceList.length }}/4）
                          </st-button>
                        </td>
                      </tr>
                      <tr
                        v-for="(item, index) in shopPriceList"
                        :key="`${index}shop`"
                      >
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            placeholder="入场次数"
                            @change="
                              e =>
                                shopPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'validity_times'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            style="width:45%"
                            :float="true"
                            :min="0"
                            placeholder="售价下限"
                            :max="999999.9"
                            @change="
                              e =>
                                shopPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'rally_price',
                                  prop: 'min_price'
                                })
                            "
                          ></st-input-number>
                          ~
                          <st-input-number
                            style="width:45%"
                            placeholder="售价上限"
                            :float="true"
                            :min="0"
                            :max="999999.9"
                            @change="
                              e =>
                                shopPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'rally_price',
                                  prop: 'max_price'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            :value="item.time.num"
                            placeholder="有效期"
                            @change="
                              e =>
                                shopPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'time',
                                  prop: 'num'
                                })
                            "
                          >
                            <a-select
                              slot="addonAfter"
                              :value="item.time.unit"
                              @change="
                                e =>
                                  shopPriceSettingHandleChange({
                                    value: e,
                                    key: index,
                                    col: 'time',
                                    prop: 'unit'
                                  })
                              "
                            >
                              <a-select-option
                                v-for="(item, index) in unit_list"
                                :value="item.value"
                                :key="index"
                              >
                                {{ item.label }}
                              </a-select-option>
                            </a-select>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            placeholder="冻结天数"
                            @change="
                              e =>
                                shopPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'frozen_day'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <st-input-number
                            :min="1"
                            :max="99999"
                            placeholder="赠送上限"
                            @change="
                              e =>
                                shopPriceSettingHandleChange({
                                  value: e,
                                  key: index,
                                  col: 'gift_unit'
                                })
                            "
                          ></st-input-number>
                        </td>
                        <td>
                          <a @click="shop_price_delete(index)">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </st-form-table>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item
                class="page-content-card-support-sales mt-4"
                label="支持售卖门店"
                required
              >
                <a-radio-group
                  @change="support_range"
                  v-decorator="decorators.cardData.support_sales"
                >
                  <a-radio
                    v-for="item in support_sales_list"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-radio-group>
                <div
                  class="page-support-sales-shop"
                  :class="{
                    'page-lot-shop':
                      cardData.admission_range === ADMISSION_RANGE.GENERAL_STORE
                  }"
                  v-if="
                    cardData.support_sales === SUPPORT_SALES.SPECIFIED_STORE
                  "
                >
                  <p class="page-support-sales-shop__describe">
                    设置支持此会员卡售卖场馆范围
                  </p>
                  <select-shop @change="sales_shop_change"></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item
                class="page-content-card-time"
                label="支持售卖时间"
                required
              >
                <a-form-item class="page-a-form">
                  <a-date-picker
                    :disabledDate="disabledStartDate"
                    v-decorator="decorators.start_time"
                    format="YYYY-MM-DD"
                    placeholder="开始时间"
                    :showToday="false"
                    @openChange="handleStartOpenChange"
                    @change="start_time_change"
                  />
                </a-form-item>
                ~
                <a-form-item class="page-a-form">
                  <a-date-picker
                    :disabledDate="disabledEndDate"
                    v-decorator="decorators.end_time"
                    format="YYYY-MM-DD"
                    placeholder="结束时间"
                    :showToday="false"
                    :open="cardData.endOpen"
                    @openChange="handleEndOpenChange"
                    @change="end_time_change"
                  />
                </a-form-item>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-transfer" label="转让设置">
                <div class="page-content-card-transfer-body">
                  <a-checkbox class="page-checkbox" @change="transfer">
                    支持转让
                  </a-checkbox>
                  <st-input-number
                    v-decorator="decorators.cardData.num"
                    class="page-input-group page-content-card-num-input"
                    :float="cardData.unit === UNIT.RMB"
                    :disabled="!cardData._is_transfer"
                    :min="transferMin"
                    :max="transferMax"
                  >
                    <a-select
                      slot="addonAfter"
                      v-model="cardData.unit"
                      :disabled="!cardData._is_transfer"
                    >
                      <a-select-option
                        v-for="item in unit"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </a-select-option>
                    </a-select>
                  </st-input-number>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item
                class="page-content-card-sell-type"
                label="售卖方式"
                required
              >
                <a-checkbox-group v-model="cardData.sell_type">
                  <a-checkbox
                    v-for="item in sell_type_list"
                    :key="item.value"
                    :disabled="item.value === SELL_TYPE.OFFLINE"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-checkbox>
                </a-checkbox-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item
                class="page-content-card-bg"
                label="卡背景"
                required
                :help="cardBgValidatorText"
              >
                <card-bg-radio
                  @change="onCardBgChange"
                  v-model="cardData.card_bg"
                />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item
                class="page-content-card-introduction mt-4"
                label="会员卡介绍"
              >
                <st-textarea
                  v-model="cardData.card_introduction"
                  maxlength="500"
                  class="page-content-card-textarea"
                  placeholder="请输入"
                />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item
                class="page-content-card-contents mt-4"
                label="备注"
              >
                <st-textarea
                  v-model="cardData.card_contents"
                  maxlength="500"
                  class="page-content-card-textarea"
                  placeholder="请输入"
                />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-submit" label=" ">
                <st-button
                  :loading="addLoading.addCard"
                  type="primary"
                  @click="onHandleSubmit"
                >
                  保 存
                </st-button>
              </st-form-item>
            </a-col>
          </a-row>
        </st-form>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import moment from 'moment'
import { RuleConfig } from '@/constants/rule'
import SelectShop from '@/views/fragments/shop/select-shop'
import { cloneDeep, remove } from 'lodash-es'
import { AddService } from './add.service'
import MemberCard from '@/views/biz-components/h5/pages/member-card'
import H5Container from '@/views/biz-components/h5/h5-container'
import h5mixin from '../period/h5mixin'
import { MEMBER_CARD } from '@/views/biz-components/h5/pages/member-card.config'
import CardBgRadio from '@/views/biz-components/card-bg-radio/card-bg-radio'
import {
  ADMISSION_RANGE,
  SELL_TYPE,
  PRICE_SETTING,
  SUPPORT_SALES,
  UNIT,
  CARD_TYPE
} from '@/constants/card/member'
import { ruleOptions } from './number.config'
export default {
  name: 'BrandNumberCardAdd',
  mixins: [h5mixin],
  serviceInject() {
    return {
      rules: RuleConfig,
      addService: AddService,
      userService: UserService
    }
  },
  rxState() {
    return {
      addLoading: this.addService.loading$,
      cardBgList: this.addService.cardBgList$,
      admissionRange: this.addService.admissionRange$,
      priceSetting: this.addService.priceSetting$,
      supportSales: this.addService.supportSales$,
      unit: this.addService.unit$,
      sellType: this.addService.sellType$
    }
  },
  bem: {
    b: 'st-help-popover'
  },
  components: {
    SelectShop,
    MemberCard,
    H5Container,
    CardBgRadio
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      // cardData
      form,
      decorators,
      ADMISSION_RANGE,
      SELL_TYPE,
      PRICE_SETTING,
      SUPPORT_SALES,
      UNIT,
      cardType: MEMBER_CARD.NUMBER_CARD,
      MEMBER_CARD,
      cardData: {
        // 会员卡类型1-次卡 2-期限卡
        card_type: CARD_TYPE.NUMBER,
        // 会员卡名称
        card_name: '',
        // 支持入场范围 1-单店 2-多店 3-全店
        admission_range: ADMISSION_RANGE.ONLY_STORE,
        // 支持入场门店
        admission_shop_list: [],
        // 价格设置类型 1-统一定价 2-门店定价
        price_setting: PRICE_SETTING.UNIFORM_PRICE,
        // 价格梯度
        price_gradient: [],
        // 支持售卖场馆类型 1-全部门店 2-指定门店
        support_sales: SUPPORT_SALES.ALL_STORE,
        // 支持售卖门店
        sell_shop_list: [],
        // 支持售卖时间
        start_time: '',
        end_time: '',
        // 结束时间面板是否显示
        endOpen: false,
        // 是否支持转让
        _is_transfer: false,
        is_transfer: 0,
        // 转让单位
        unit: UNIT.RMB,
        // 转让手续费
        num: undefined,
        // 售卖方式
        sell_type: [SELL_TYPE.OFFLINE],
        // 卡背景
        card_bg: {
          image_id: 0,
          image_key: this.cardBgList[0].image_key,
          image_url: this.cardBgList[0].image_url,
          index: 1
        },
        // 是否配置了用户端
        appConfig: true,
        // 卡介绍
        card_introduction: '',
        // 备注
        card_contents: ''
      },
      // 品牌统一定价-价格梯度
      rallyPriceList: [],
      // 门店自主定价-价格梯度
      shopPriceList: [],
      // 售卖时间
      start_time: null,
      end_time: null,
      unit_list: [
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
      ],
      // 校验价格的help文本
      priceValidatorText: '',
      // 卡背景的help文本
      cardBgValidatorText: ''
    }
  },
  mounted() {
    this.syncAdmission()
  },
  methods: {
    // 保存
    onHandleSubmit(e) {
      e.preventDefault()
      // 校验价格
      this.priceValidator(this.cardData.price_setting)
      // 校验卡背景
      this.cardBgValidator()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && this.priceIsOk && this.cardBgIsOk) {
          // 入场门店
          if (this.cardData.admission_range !== ADMISSION_RANGE.GENERAL_STORE) {
            // 不是多门店
            this.cardData.admission_shop_list = []
          }
          if (this.cardData.support_sales !== SUPPORT_SALES.SPECIFIED_STORE) {
            this.cardData.sell_shop_list = []
          }
          // 售卖门店
          if (
            this.cardData.admission_range === ADMISSION_RANGE.GENERAL_STORE &&
            this.cardData.support_sales === SUPPORT_SALES.ENTRY_STORE
          ) {
            // 多门店 && 支持入场门店
            this.cardData.sell_shop_list = cloneDeep(
              this.cardData.admission_shop_list
            )
          }
          // 价格梯度
          let p = []
          switch (this.cardData.price_setting) {
            case PRICE_SETTING.UNIFORM_PRICE:
              // 品牌统一定价
              this.rallyPriceList.forEach(i => {
                p.push({
                  unit: +i.time.unit,
                  num: +i.time.num,
                  rally_price: +i.rally_price,
                  frozen_day: +i.frozen_day,
                  validity_times: +i.validity_times,
                  gift_unit: +i.gift_unit
                })
              })
              break
            case PRICE_SETTING.SHOP_PRICE:
              // 门店自主定价
              this.shopPriceList.forEach(i => {
                p.push({
                  unit: +i.time.unit,
                  num: +i.time.num,
                  min_price: +i.rally_price.min_price,
                  max_price: +i.rally_price.max_price,
                  frozen_day: +i.frozen_day,
                  validity_times: +i.validity_times,
                  gift_unit: +i.gift_unit
                })
              })
              break
          }
          this.cardData.card_name = values.cardData.card_name
          this.cardData.price_gradient = cloneDeep(p)
          // 时间
          this.cardData.start_time = `${this.start_time.format('YYYY-MM-DD')}`
          this.cardData.end_time = `${this.end_time.format('YYYY-MM-DD')}`
          // 转让
          this.cardData.num = this.cardData._is_transfer
            ? +values.cardData.num
            : undefined
          this.addService.addCard(this.cardData).subscribe(res => {
            this.$router.push({
              name: 'brand-product-card-member-list-all'
            })
          })
        }
      })
    },
    // 增加入场门店
    admission_range_change(data) {
      this.cardData.admission_shop_list = cloneDeep(data)
      this.syncAdmissionShop()
    },
    // 入场门店支持方式change
    admission_range(data) {
      this.cardData.admission_range = data.target.value
      // 入场门店变化时，售卖门店和价格同时变化
      this.form.setFieldsValue({
        'cardData.support_sales': SUPPORT_SALES.ALL_STORE,
        'cardData.price_setting': PRICE_SETTING.UNIFORM_PRICE
      })
      this.cardData.support_sales = SUPPORT_SALES.ALL_STORE
      this.cardData.price_setting = PRICE_SETTING.UNIFORM_PRICE
      this.rallyPriceList = []
      this.shopPriceList = []
      this.priceValidatorText = ''
      this.syncAdmission()
    },
    // 价格设置方式change
    price_range(data) {
      this.cardData.price_setting = data.target.value
    },
    // 增加品牌价格
    brand_price_add() {
      let key = parseInt(Math.random() * 999999).toString()
      this.rallyPriceList.push({
        key,
        validity_times: null,
        time: {
          unit: 2,
          num: null
        },
        rally_price: null,
        frozen_day: null,
        gift_unit: null
      })
    },
    // 删除品牌价格
    brand_price_delete(index) {
      this.rallyPriceList.splice(index, 1)
    },
    // 品牌价格梯度-期限
    brandPriceSettingHandleChange({ value, key, col, prop }) {
      if (prop !== undefined) {
        this.rallyPriceList[key][col][prop] = value
      } else {
        this.rallyPriceList[key][col] = value
      }
    },
    // 增加门店价格
    shop_price_add() {
      let key = parseInt(Math.random() * 999999).toString()
      this.shopPriceList.push({
        key,
        validity_times: null,
        time: {
          unit: 2,
          num: null
        },
        rally_price: {
          min_price: null,
          max_price: null
        },
        frozen_day: null,
        gift_unit: null
      })
    },
    // 删除门店价格
    shop_price_delete(index) {
      this.shopPriceList.splice(index, 1)
    },
    // 门店价格梯度-期限
    shopPriceSettingHandleChange({ value, key, col, prop }) {
      if (prop !== undefined) {
        this.shopPriceList[key][col][prop] = value
      } else {
        this.shopPriceList[key][col] = value
      }
    },
    // 支持售卖门店change
    support_range(data) {
      this.cardData.support_sales = data.target.value
    },
    // 增加售卖门店
    sales_shop_change(data) {
      this.cardData.sell_shop_list = cloneDeep(data)
    },
    // 售卖时间-start
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.cardData.endOpen = true
      }
    },
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (!endValue) {
        // 结束时间未选择
        return (
          startValue.valueOf() <
          moment()
            .startOf('day')
            .valueOf()
        )
      }
      let start =
        endValue.valueOf() >
        moment()
          .add(30, 'y')
          .valueOf()
          ? moment(endValue)
              .subtract(30, 'y')
              .valueOf()
          : moment()
              .startOf('day')
              .valueOf()
      return (
        startValue.valueOf() < start ||
        startValue.valueOf() > moment(endValue).valueOf()
      )
    },
    // 售卖时间-end
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    handleEndOpenChange(open) {
      this.cardData.endOpen = open
    },
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (!startValue) {
        // 开始时间未选择
        return (
          endValue.valueOf() <
          moment()
            .startOf('day')
            .valueOf()
        )
      }
      return (
        endValue.valueOf() >=
          moment(startValue)
            .add(30, 'y')
            .valueOf() ||
        endValue.valueOf() < moment(startValue).valueOf() ||
        endValue.valueOf() <
          moment()
            .startOf('day')
            .valueOf()
      )
    },
    // moment
    moment,
    // 转让
    transfer(e) {
      this.cardData._is_transfer = e.target.checked
      // 重置转让费用的校验
      this.form.resetFields(['cardData.num'])
    },
    // 价格梯度校验
    priceValidator(type) {
      let fnName =
        type === PRICE_SETTING.UNIFORM_PRICE
          ? 'brandPriceValidataArray'
          : 'shopPriceValidataArray'
      let validata = this[fnName].length
        ? this[fnName].every(i => this.rules.number.test(i.split('-')[1]))
        : false
      this.priceValidatorText = validata ? '' : '请输入正确的价格'
    },
    onCardBgChange(e) {
      this.cardBgValidatorText = ''
    },
    // 卡背景校验
    cardBgValidator() {
      let validata = this.cardData.card_bg.image_key !== ''
      this.cardBgValidatorText = validata ? '' : '请上传卡背景'
    }
  },
  watch: {
    'cardData._is_transfer': {
      deep: true,
      handler(newVal, oldVal) {
        this.cardData.is_transfer = +newVal
      }
    },
    'cardData.unit': {
      deep: true,
      handler() {
        this.form.resetFields(['cardData.num'])
      }
    },
    'cardData.admission_shop_list': {
      deep: true,
      handler() {
        let v = this.cardData.admission_range
        this.cardData.admission_range = v
        this.form.setFieldsValue({
          'cardData.admission_range': v
        })
      }
    },
    'cardData.sell_shop_list': {
      deep: true,
      handler() {
        let v = this.cardData.support_sales
        this.cardData.support_sales = v
        this.form.setFieldsValue({
          'cardData.support_sales': v
        })
      }
    }
  },
  computed: {
    // 支持售卖门店
    support_sales_list() {
      let arr = cloneDeep(this.supportSales)
      let index =
        this.cardData.admission_range === ADMISSION_RANGE.GENERAL_STORE
          ? 999
          : 2
      arr.splice(index, 1)
      return arr
    },
    // 售卖方式
    sell_type_list() {
      let sell_type = cloneDeep(this.sellType)
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: i.value,
          label: i.label
        })
      })
      if (!this.cardData.appConfig) {
        remove(arr, i => i.value === SELL_TYPE.CLIENT)
      }
      return arr
    },
    // 品牌统一定价-价格梯度校验数组
    brandPriceValidataArray() {
      let array = []
      this.rallyPriceList.forEach(i => {
        Object.keys(i).forEach(o => {
          array.push(o === 'time' ? `time-${i.time.num}` : `${o}-${i[o]}`)
        })
      })
      return array
    },
    // 门店自主定价-价格梯度校验数组
    shopPriceValidataArray() {
      let array = []
      this.shopPriceList.forEach(i => {
        Object.keys(i).forEach(o => {
          let value = []
          if (o === 'time') {
            value = [`time-${i.time.num}`]
          } else if (o === 'rally_price') {
            value = [
              `min_price-${i.rally_price.min_price}`,
              `max_price-${i.rally_price.max_price}`
            ]
          } else {
            value = [`${o}-${i[o]}`]
          }
          array.push(...value)
        })
      })
      return array
    },
    // 价格是否校验通过
    priceIsOk() {
      return this.priceValidatorText === ''
    },
    // 卡背景是否校验通过
    cardBgIsOk() {
      return this.cardBgValidatorText === ''
    },
    // 转让设置的min
    transferMin() {
      // return this.cardData.transfer_unit === 1 ? 1 : 0.1
      return 0
    },
    // 转让设置的max
    transferMax() {
      return this.cardData.unit === UNIT.PERCENT ? 100 : 999999.9
    }
  }
}
</script>
