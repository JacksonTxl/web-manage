<template>
  <st-panel app class="page-brand-basic-card page-brand-add-period-card" initial>
    <div class="page-brand-basic-card-body">
      <div class="page-preview">
        <h5-container>
          <template v-slot:title>购卡</template>
          <template v-slot:default>
            <member-card :data="h5CardInfo" :cardType="0"></member-card>
          </template>
        </h5-container>
      </div>
      <div class="page-content">
        <st-form :form="form" labelWidth="117px">
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="16">
              <st-form-item class="page-content-card-line" label="期限卡名称" required>
                <a-input
                  v-decorator="[
                  'cardData.card_name',
                  {rules: [{ validator: card_name_validator}]}
                ]"
                  maxlength="30"
                  style="width: 360px"
                  placeholder="请输入期限卡名称"
                  @change="syncName"
                ></a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="page-content-card-admission-range mt-4" required>
                <template slot="label">
                    支持入场范围<st-help-tooltip id="TBMCDC001" />
                </template>
                <a-radio-group
                  @change="admission_range"
                  v-decorator="['cardData.admission_range',{initialValue:1,rules:[{validator:admission_shop_list_validator}]}]">
                  <a-radio
                    v-for="item in Object.entries(member_card.admission_range.value)"
                    :key="+item[0]"
                    :value="+item[0]">{{item[1]}}</a-radio>
                </a-radio-group>
                <div class="page-admission-range-shop" v-if="cardData.admission_range===2">
                  <p class="page-admission-range-shop__describe">设置支持此会员卡出入场馆范围</p>
                  <select-shop :shopIds="cardData.admission_shop_list" @change="admission_range_change"></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="page-content-card-price-setting mt-4" required :help="priceValidatorText">
                <template slot="label">
                    价格设置<st-help-tooltip id="TBMCTC002" />
                </template>
                <a-radio-group
                  @change="price_range"
                  v-show="cardData.admission_range===1"
                  v-decorator="['cardData.price_setting',{validateTrigger: 'blur',initialValue:1,rules:[{validator:price_gradient_list_validator}]}]">
                  <a-radio
                    v-for="item in Object.entries(member_card.price_setting.value)"
                    :key="+item[0]"
                    :value="+item[0]">{{item[1]}}</a-radio>
                </a-radio-group>
                <div class="page-price-setting-set" :class="{'error':!priceIsOk,'brand-set': cardData.price_setting===1&&cardData.admission_range===1}" v-if="cardData.price_setting===1">
                  <st-form-table>
                     <colgroup>
                      <col style="width:23%;">
                      <col style="width:23%;">
                      <col style="width:23%;">
                      <col style="width:23%;">
                      <col style="width:8%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th>期限</th>
                        <th>售价</th>
                        <th class="white-nowrap">允许冻结天数</th>
                        <th>赠送上限</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="5" class="pd-y0 pd-x0">
                          <st-button :disabled="rallyPriceList.length>3" type="dashed" icon="add" class="page-price-setting-set__add" block @click="brand_price_add">添加定价规格（{{rallyPriceList.length}}/4）</st-button>
                        </td>
                      </tr>
                      <tr v-for="(item,index) in rallyPriceList" :key="`${index}brand`" >
                        <td>
                          <st-input-number :min="1" :max="99999" :value="item.time.num" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'time', prop:'num'})">
                            <a-select slot="addonAfter" :value="item.time.unit" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'time', prop:'unit'})">
                              <a-select-option
                              v-for="(item,index) in unit_list"
                              :value="item.value"
                              :key="index" >{{item.label}}</a-select-option>
                            </a-select>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number :float="true" :min="0" :value="item.rally_price" :max="999999.9" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'rally_price'})">
                            <span slot="addonAfter">元</span>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number :min="1" :max="99999" :value="item.frozen_day" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'frozen_day'})">
                            <span slot="addonAfter">天</span>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number :min="1" :max="99999" :value="item.gift_unit" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'gift_unit'})">
                            <span slot="addonAfter">天</span>
                          </st-input-number>
                        </td>
                        <td>
                          <a @click="brand_price_delete(index)">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </st-form-table>
                </div>
                <div class="page-price-setting-set" :class="{'error':!priceIsOk,'shop-set': cardData.price_setting===2&&cardData.admission_range===1}" v-if="cardData.price_setting===2">
                  <st-form-table>
                    <colgroup>
                      <col style="width:18%;">
                      <col style="width:36%;">
                      <col style="width:18%;">
                      <col style="width:18%;">
                      <col style="width:10%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th>期限</th>
                        <th>售价范围</th>
                        <th class="white-nowrap">允许冻结天数</th>
                        <th>赠送上限</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="5" class="pd-y0 pd-x0">
                          <st-button :disabled="shopPriceList.length>3" type="dashed" icon="add" class="page-price-setting-set__add" block @click="shop_price_add">添加定价规格（{{shopPriceList.length}}/4）</st-button>
                        </td>
                      </tr>
                      <tr v-for="(item,index) in shopPriceList" :key="`${index}shop`" >
                        <td>
                          <st-input-number style="width:100px;" :min="1" :max="99999" :value="item.time.num" @change="e => shopPriceSettingHandleChange({value:e, key:index,col:'time', prop:'num'})">
                            <a-select slot="addonAfter" :value="item.time.unit" @change="e => shopPriceSettingHandleChange({value:e, key:index,col:'time', prop:'unit'})">
                              <a-select-option
                              v-for="(item,index) in unit_list"
                              :value="item.value"
                              :key="index" >{{item.label}}</a-select-option>
                            </a-select>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number style="width:40%" :float="true" :value="item.rally_price.min_price" :min="0" :max="999999.9" @change="e => shopPriceSettingHandleChange({value:e, key:index,col:'rally_price', prop:'min_price'})">
                            <span slot="addonAfter">元</span>
                          </st-input-number>
                          &nbsp;
                          ~
                          &nbsp;
                          <st-input-number style="width:40%" :float="true" :min="0" :value="item.rally_price.max_price" :max="999999.9" @change="e => shopPriceSettingHandleChange({value:e, key:index,col:'rally_price', prop:'max_price'})">
                            <span slot="addonAfter">元</span>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number :min="1" :max="99999" :value="item.frozen_day" @change="e => shopPriceSettingHandleChange({value:e, key:index,col:'frozen_day'})">
                            <span slot="addonAfter">天</span>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number :min="1" :max="99999" :value="item.gift_unit" @change="e => shopPriceSettingHandleChange({value:e, key:index,col:'gift_unit'})">
                            <span slot="addonAfter">天</span>
                          </st-input-number>
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
              <st-form-item class="page-content-card-support-sales mt-4" label="支持售卖门店" required>
                <a-radio-group
                  @change="support_range"
                  v-decorator="['cardData.support_sales',{initialValue:1,rules:[{validator:support_sales_list_validator}]}]">
                  <a-radio
                    v-for="item in support_sales_list"
                    :key="+item[0]"
                    :value="+item[0]">{{item[1]}}</a-radio>
                </a-radio-group>
                <div class="page-support-sales-shop" :class="{'page-lot-shop':cardData.admission_range===2}" v-if="cardData.support_sales===2">
                  <p class="page-support-sales-shop__describe">设置支持此会员卡售卖场馆范围</p>
                  <select-shop :shopIds="cardData.sell_shop_list" @change="sales_shop_change"></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-time" label="支持售卖时间" required>
                <a-form-item class="page-a-form">
                  <a-date-picker
                    :disabledDate="disabledStartDate"
                    v-decorator="['start_time',{rules:[{validator:start_time_validator}]}]"
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
                    v-decorator="['end_time',{rules:[{validator:end_time_validator}]}]"
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
                  <a-checkbox class="page-checkbox" @change="transfer">支持转让</a-checkbox>
                  <st-input-number
                  style="width:200px"
                  v-decorator="['cardData.num',{rules:[{validator:transfer_validator}]}]"
                  class="page-input-group"
                  :float="cardData.unit===2"
                  :disabled="!cardData._is_transfer"
                  :min="transferMin" :max="transferMax">
                    <a-select slot="addonAfter" v-model="cardData.unit" :disabled="!cardData._is_transfer">
                      <a-select-option v-for="item in Object.entries(member_card.unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                    </a-select>
                  </st-input-number>
                  <!-- <a-input-group compact class="page-input-group">
                    <a-input-number
                    v-decorator="['cardData.num',{rules:[{validator:transfer_validator}]}]"
                    @change="transfter_change"
                    :disabled="!cardData._is_transfer"/>
                    <a-select v-model="cardData.unit" defaultValue="2" :disabled="!cardData._is_transfer">
                      <a-select-option v-for="item in Object.entries(member_card.unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                    </a-select>
                  </a-input-group> -->
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-sell-type" label="售卖方式" required>
                <a-checkbox-group v-model="cardData.sell_type">
                  <a-checkbox
                  v-for="item in sell_type_list"
                  :key="item.value"
                  :disabled="item.value===2"
                  :value="item.value">{{item.label}}</a-checkbox>
                </a-checkbox-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-bg" label="卡背景" required :help="cardBgValidatorText">
                <st-card-bg-radio @change="onCardBgChange" v-model="cardData.card_bg" />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-introduction mt-4" label="会员卡介绍">
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
              <st-form-item class="page-content-card-contents mt-4" label="备注">
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
                <st-button :loading="addLoading.addCard" type="primary" @click="onHandleSubmit">保 存</st-button>
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
import h5mixin from './h5mixin'
export default {
  name: 'BrandPeriodCardAdd',
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
      member_card: this.userService.memberCardEnums$
    }
  },
  bem: {
    b: 'st-help-popover'
  },
  components: {
    SelectShop,
    MemberCard,
    H5Container
  },
  data() {
    return {
      // cardData
      cardType: 0,
      cardData: {
        // 会员卡类型1-次卡 2-期限卡
        card_type: 2,
        // 会员卡名称
        card_name: '',
        // 支持入场范围 1-单店 2-多店 3-全店
        admission_range: 1,
        // 支持入场门店
        admission_shop_list: [],
        // 价格设置类型 1-统一定价 2-门店定价
        price_setting: 1,
        // 价格梯度
        price_gradient: [],
        support_sales: 1,
        // 支持售卖门店
        sell_shop_list: [],
        // 支持售卖时间
        start_time: '',
        end_time: '',
        // 结束时间面板是否显示
        endOpen: false, // kael
        // 是否支持转让
        _is_transfer: false, // kael
        is_transfer: 0,
        // 转让单位
        unit: 2,
        // 转让手续费
        num: undefined,
        // 售卖方式
        sell_type: [2],
        // 卡背景
        card_bg: {
          image_id: 0,
          image_key: this.member_card.card_bg_list.value[0].image_key,
          image_url: this.member_card.card_bg_list.value[0].image_url,
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
  beforeCreate() {
    let that = this
    this.form = this.$form.createForm(this)
    // this.form = this.$form.createForm(this,{
    //   onFieldsChange (_, values) {
    //     debugger
    //     console.log(values);
    //     let formValues = _.getFieldsValue()
    //     that.transformCardData(formValues)
    //   }
    // })
  },
  methods: {
    transformCardData(values) {
      // 入场门店
      if (this.cardData.admission_range !== 2) {
        // 不是多门店
        this.cardData.admission_shop_list = []
      }
      if (this.cardData.support_sales !== 2) {
        this.cardData.sell_shop_list = []
      }
      // 售卖门店
      if (this.cardData.admission_range === 2 && this.cardData.support_sales === 3) {
        // 多门店 && 支持入场门店
        this.cardData.sell_shop_list = cloneDeep(this.cardData.admission_shop_list)
      }
      // 价格梯度
      let p = []
      switch (this.cardData.price_setting) {
        case 1:
          // 品牌统一定价
          this.rallyPriceList.forEach(i => {
            p.push({
              unit: +i.time.unit,
              num: +i.time.num,
              rally_price: +i.rally_price,
              frozen_day: +i.frozen_day,
              gift_unit: +i.gift_unit
            })
          })
          break
        case 2:
          // 门店自主定价
          this.shopPriceList.forEach(i => {
            p.push({
              unit: +i.time.unit,
              num: +i.time.num,
              min_price: +i.rally_price.min_price,
              max_price: +i.rally_price.max_price,
              frozen_day: +i.frozen_day,
              gift_unit: +i.gift_unit
            })
          })
          break
      }
      this.cardData.card_name = values.cardData.card_name
      this.cardData.price_gradient = cloneDeep(p)
      // 时间
      if (this.start_time) {
        this.cardData.start_time = `${this.start_time.format('YYYY-MM-DD')}`
      }
      if (this.end_time) {
        this.cardData.end_time = `${this.end_time.format('YYYY-MM-DD')}`
      }
      // 转让
      this.cardData.num = this.cardData._is_transfer ? +values.cardData.num : undefined
    },
    // 保存
    onHandleSubmit(e) {
      e.preventDefault()
      // 校验价格
      this.priceValidator(this.cardData.price_setting)
      // 校验卡背景
      this.cardBgValidator()
      this.form.validateFieldsAndScroll((err, values) => {
        console.log(values)
        if (!err && this.priceIsOk && this.cardBgIsOk) {
          // 入场门店
          if (this.cardData.admission_range !== 2) {
            // 不是多门店
            this.cardData.admission_shop_list = []
          }
          if (this.cardData.support_sales !== 2) {
            this.cardData.sell_shop_list = []
          }
          // 售卖门店
          if (this.cardData.admission_range === 2 && this.cardData.support_sales === 3) {
            // 多门店 && 支持入场门店
            this.cardData.sell_shop_list = cloneDeep(this.cardData.admission_shop_list)
          }
          // 价格梯度
          let p = []
          switch (this.cardData.price_setting) {
            case 1:
              // 品牌统一定价
              this.rallyPriceList.forEach(i => {
                p.push({
                  unit: +i.time.unit,
                  num: +i.time.num,
                  rally_price: +i.rally_price,
                  frozen_day: +i.frozen_day,
                  gift_unit: +i.gift_unit
                })
              })
              break
            case 2:
              // 门店自主定价
              this.shopPriceList.forEach(i => {
                p.push({
                  unit: +i.time.unit,
                  num: +i.time.num,
                  min_price: +i.rally_price.min_price,
                  max_price: +i.rally_price.max_price,
                  frozen_day: +i.frozen_day,
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
          this.cardData.num = this.cardData._is_transfer ? +values.cardData.num : undefined
          this.addService.addCard(this.cardData).subscribe(res => {
            this.$router.push({
              name: 'brand-product-card-member-list-all'
            })
          })
        }
      })
    },
    // card_name validatorFn
    card_name_validator(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请填写期限卡名称')
      } else if (value && !this.rules.card_name.test(value)) {
        // eslint-disable-next-line
        callback('输入的期限卡名称格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // admission_shop_list validatorFn
    admission_shop_list_validator(rule, value, callback) {
      // eslint-disable-next-line
      if (value === 2 && !this.cardData.admission_shop_list.length) {
        // eslint-disable-next-line
        callback('请添加支持入场门店')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // price_gradient_list validatorFn
    price_gradient_list_validator(rule, value, callback) {
      // eslint-disable-next-line
      callback()
      // if (value === 1 && !this.rallyPriceList.length) {
      //   // eslint-disable-next-line
      //   callback('请添加价格设置')
      // } else if (value === 2 && !this.shopPriceList.length) {
      //   // eslint-disable-next-line
      //   callback('请添加价格设置')
      // } else {
      //   // eslint-disable-next-line
      //   callback()
      // }
    },
    // support_sales_list validatorFn
    support_sales_list_validator(rule, value, callback) {
      // eslint-disable-next-line
      if (value === 2 && !this.cardData.sell_shop_list.length) {
        // eslint-disable-next-line
        callback('请添加支持售卖门店')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // start_time validatorFn
    start_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择开始售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // end_time validatorFn
    end_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择结束售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // transfer validatorFn
    transfer_validator(rule, value, callback) {
      if (!this.cardData._is_transfer) {
        // eslint-disable-next-line
        callback()
      }
      if (!value) {
        // eslint-disable-next-line
        callback('请输入转让费用')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 增加入场门店
    admission_range_change(data) {
      this.cardData.admission_shop_list = cloneDeep(data)
      this.syncAdmissionShop()
    },
    // 入场门店支持方式change
    admission_range(data) {
      this.cardData.admission_range = data.target.value
      // 售卖价格变化
      if (data.target.value !== 1) {
        // 只能有品牌统一定价

      }
      // 入场门店变化时，售卖门店/售卖价格同时变化
      this.form.setFieldsValue({
        'cardData.support_sales': 1,
        'cardData.price_setting': 1
      })
      this.cardData.support_sales = 1
      this.cardData.price_setting = 1
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
        return startValue.valueOf() < moment().startOf('day').valueOf()
      }
      let start = endValue.valueOf() > moment().add(30, 'y').valueOf() ? moment(endValue).subtract(30, 'y').valueOf() : moment().startOf('day').valueOf()
      return startValue.valueOf() < start || startValue.valueOf() > moment(endValue).valueOf()
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
        return endValue.valueOf() < moment().startOf('day').valueOf()
      }
      return endValue.valueOf() >= moment(startValue).add(30, 'y').valueOf() || endValue.valueOf() < moment(startValue).valueOf() || endValue.valueOf() < moment().startOf('day').valueOf()
    },
    // moment
    moment,
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    // 转让
    transfer(e) {
      this.cardData._is_transfer = e.target.checked
      // 重置转让费用的校验
      this.form.resetFields(['cardData.num'])
    },
    // 价格梯度校验
    priceValidator(type) {
      let fnName = type === 1 ? 'brandPriceValidataArray' : 'shopPriceValidataArray'
      let validata = this[fnName].length ? this[fnName].every(i => this.rules.number.test(i.split('-')[1])) : false
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
      let arr = cloneDeep(Object.entries(this.member_card.support_sales.value))
      let index = this.cardData.admission_range === 2 ? 999 : 2
      arr.splice(index, 1)
      return arr
    },
    // 售卖方式
    sell_type_list() {
      let sell_type = cloneDeep(Object.entries(this.member_card.sell_type.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
        })
      })
      if (!this.cardData.appConfig) {
        remove(arr, i => i.value === 1)
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
            value = [`min_price-${i.rally_price.min_price}`, `max_price-${i.rally_price.max_price}`]
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
      return this.cardData.unit === 1 ? 100 : 999999.9
    }
  }
}
</script>
