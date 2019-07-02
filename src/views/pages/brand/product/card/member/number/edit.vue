<template>
  <st-panel app class="page-brand-basic-card page-brand-edit-number-card" initial>
    <div class="page-brand-basic-card-body">
      <!-- <div class="page-preview">实时预览{{member_card}}</div> -->
      <div class="page-content">
        <st-form :form="form" labelWidth="116px">
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="16">
              <p class="page-content-card__card__name">
                <st-tag type="number-card"/>
                <span>{{cardInfo.card_name}}</span>
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="page-content-card-admission-range mt-4" label="支持入场门店" required>
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
              <st-form-item class="page-content-card-price-setting mt-4" label="价格设置" required>
                <a-radio-group
                  @change="price_range"
                  v-show="cardData.admission_range===1"
                  v-decorator="['cardData.price_setting',{initialValue:1,rules:[{validator:price_gradient_list_validator}]}]">
                  <a-radio
                    v-for="item in Object.entries(member_card.price_setting.value)"
                    :key="+item[0]"
                    :value="+item[0]">{{item[1]}}</a-radio>
                </a-radio-group>
                <div class="page-price-setting-set" :class="{'brand-set': cardData.price_setting===1&&cardData.admission_range===1}" v-if="cardData.price_setting===1">
                  <a-table
                    size="middle"
                    :columns="brand_price_columns"
                    :dataSource="rally_price_list"
                    rowKey="key"
                    :pagination="false"
                  >
                    <template slot="validity_times" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => brandPriceSettingHandleChange({value:e.target.value, key:index,col:'validity_times'})">
                          <span slot="suffix">次</span>
                        </a-input>
                    </template>
                    <template slot="rally_price" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => brandPriceSettingHandleChange({value:e.target.value, key:index,col:'rally_price'})">
                          <span slot="suffix">元</span>
                        </a-input>
                    </template>
                    <template slot="time" slot-scope="text, record, index">
                      <a-input :value="text.num" @change="e => brandPriceSettingHandleChange({value:e.target.value, key:index,col:'time', prop:'num'})">
                        <a-select slot="addonAfter" :value="text.unit" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'time', prop:'unit'})"  style="width: 50px">
                          <a-select-option
                          v-for="(item,index) in nuit_list"
                          :value="item.value"
                          :key="index" >{{item.label}}</a-select-option>
                        </a-select>
                      </a-input>
                    </template>
                    <template slot="frozen_day" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => brandPriceSettingHandleChange({value:e.target.value, key:index,col:'frozen_day'})">
                          <span slot="suffix">天</span>
                        </a-input>
                    </template>
                    <template slot="gift_unit" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => brandPriceSettingHandleChange({value:e.target.value, key:index,col:'gift_unit'})">
                          <span slot="suffix">天</span>
                        </a-input>
                    </template>
                    <a slot="operation" slot-scope="text, record, index" href="javascript:;" @click="brand_price_delete(index)">
                      删除
                    </a>
                  </a-table>
                  <st-button :disabled="rally_price_list.length>3" type="dashed" class="page-price-setting-set__add" block @click="brand_price_add">+ 添加定价规格（{{rally_price_list.length}}/4）</st-button>
                </div>
                <div class="page-price-setting-set" :class="{'shop-set': cardData.price_setting===2&&cardData.admission_range===1}" v-if="cardData.price_setting===2">
                  <a-table
                    size="middle"
                    :columns="shop_price_columns"
                    :dataSource="shop_price_list"
                    rowKey="key"
                    :pagination="false"
                  >
                     <template slot="validity_times" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => shopPriceSettingHandleChange({value:e.target.value, key:index,col:'validity_times'})">
                          <span slot="suffix">次</span>
                        </a-input>
                    </template>
                    <template slot="rally_price" slot-scope="text, record, index">
                        <a-input :value="text.min_price" @change="e => shopPriceSettingHandleChange({value:e.target.value, key:index,col:'rally_price', prop:'min_price'})" style="width:70px">
                          <span slot="suffix">元</span>
                        </a-input>
                        ~
                        <a-input :value="text.max_price" @change="e => shopPriceSettingHandleChange({value:e.target.value, key:index,col:'rally_price', prop:'max_price'})" style="width:70px">
                          <span slot="suffix">元</span>
                        </a-input>
                    </template>
                    <template slot="time" slot-scope="text, record, index">
                      <a-input :value="text.num" @change="e => shopPriceSettingHandleChange({value:e.target.value, key:index,col:'time', prop:'num'})">
                        <a-select slot="addonAfter" :value="text.unit" @change="e => shopPriceSettingHandleChange({value:e, key:index,col:'time', prop:'unit'})"  style="width: 50px">
                          <a-select-option
                          v-for="(item,index) in nuit_list"
                          :value="item.value"
                          :key="index" >{{item.label}}</a-select-option>
                        </a-select>
                      </a-input>
                    </template>
                    <template slot="frozen_day" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => shopPriceSettingHandleChange({value:e.target.value, key:index,col:'frozen_day'})">
                          <span slot="suffix">天</span>
                        </a-input>
                    </template>
                    <template slot="gift_unit" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => shopPriceSettingHandleChange({value:e.target.value, key:index,col:'gift_unit'})">
                          <span slot="suffix">天</span>
                        </a-input>
                    </template>
                    <a slot="operation" slot-scope="text, record, index" href="javascript:;" @click="shop_price_delete(index)">
                      删除
                    </a>
                  </a-table>
                  <st-button :disabled="shop_price_list.length>3" type="dashed" class="page-price-setting-set__add" block @click="shop_price_add">+ 添加定价规格（{{shop_price_list.length}}/4）</st-button>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="page-content-card-support-sales mt-4" label="支持售卖门店" required>
                <a-radio-group
                  @change="support_range"
                  v-decorator="['cardData.support_sales',{validateTrigger: 'blur',initialValue:1,rules:[{validator:support_sales_list_validator}]}]">
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
              <st-form-item class="page-content-card-time" required>
                <span slot="label">
                  支持售卖时间
                  <a-popover
                    trigger="hover"
                    placement="bottomRight"
                    arrowPointAtCenter
                  >
                    <div slot="content">
                      设置此会员卡可售卖的时间范围
                    </div>
                    <a-icon class="page-content-card-time__icon" type="info-circle"></a-icon>
                  </a-popover>
                </span>
                <a-form-item class="page-a-form">
                  <a-date-picker
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
                  <a-checkbox class="page-checkbox" :checked="cardData._is_transfer" @change="transfer">支持转让</a-checkbox>
                  <a-input-group compact class="page-input-group">
                    <a-input-number
                    v-decorator="['cardData.num',{rules:[{validator:transfer_validator}]}]"
                    @change="transfter_change"
                    :disabled="!cardData._is_transfer"/>
                    <a-select v-model="cardData.unit" defaultValue="2" :disabled="!cardData._is_transfer">
                      <a-select-option v-for="item in Object.entries(member_card.unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                    </a-select>
                  </a-input-group>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-sell-type" label="售卖渠道" required>
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
              <st-form-item class="page-content-card-bg" label="卡背景" required>
                <st-card-bg-radio v-model="cardData.card_bg" />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-introduction mt-4" label="会员卡介绍">
                <a-textarea
                v-model="cardData.card_introduction"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入"
                :rows="4"/>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-contents mt-4" label="备注">
                <a-textarea
                v-model="cardData.card_contents"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入"
                :rows="4"/>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-submit" label=" ">
                <st-button :loading="addLoading.editCard" type="primary" @click="onHandleSubmit">保 存</st-button>
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
import { EditService } from './edit.service'
export default {
  name: 'BrandNumberCardEdit',
  serviceInject() {
    return {
      rules: RuleConfig,
      editService: EditService,
      userService: UserService
    }
  },
  rxState() {
    return {
      addLoading: this.editService.loading$,
      cardInfo: this.editService.cardInfo$,
      member_card: this.userService.memberCardEnums$
    }
  },
  bem: {
    b: 'st-help-popover'
  },
  components: {
    SelectShop
  },
  data() {
    return {
      // cardData
      cardData: {
        // 卡id
        id: null,
        // 会员卡类型1-次卡 2-期限卡
        card_type: 1,
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
        // 支持售卖场馆类型 1-全部门店 2-指定门店
        support_sales: 1,
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
        unit: 2,
        // 转让手续费
        num: 0,
        // 售卖渠道
        sell_type: [2],
        // 卡背景
        card_bg: {
          image_id: 0,
          image_key: 'image/VZ0RGBwTX7FA1yKb.png',
          image_url: '',
          index: 1
        },
        // 是否配置了用户端
        appConfig: false,
        // 卡介绍
        card_introduction: '',
        // 备注
        card_contents: ''
      },
      transfer_unit_is_first: true,
      // 品牌统一定价-价格梯度
      rally_price_list: [],
      // 门店自主定价-价格梯度
      shop_price_list: [],
      // 售卖时间
      start_time: null,
      end_time: null,
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
      ],
      // 品牌统一定价表格表头
      brand_price_columns: [
        {
          title: '入场次数',
          scopedSlots: { customRender: 'validity_times' },
          dataIndex: 'validity_times'
        },
        {
          title: '售价',
          scopedSlots: { customRender: 'rally_price' },
          dataIndex: 'rally_price'
        },
        {
          title: '有效期',
          scopedSlots: { customRender: 'time' },
          dataIndex: 'time',
          width: 120
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
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '10%',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      // 门店自主定价表格表头
      shop_price_columns: [
        {
          title: '入场次数',
          scopedSlots: { customRender: 'validity_times' },
          dataIndex: 'validity_times',
          width: 80
        },
        {
          title: '售价范围',
          scopedSlots: { customRender: 'rally_price' },
          dataIndex: 'rally_price',
          width: 180
        },
        {
          title: '有效期',
          scopedSlots: { customRender: 'time' },
          dataIndex: 'time',
          width: 120
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
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '10%',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  mounted() {
    this.init()
  },
  methods: {
    // init
    init() {
      this.form.setFieldsValue({
        'cardData.admission_range': this.cardInfo.admission_range,
        'cardData.price_setting': this.cardInfo.price_setting,
        'cardData.support_sales': this.cardInfo.support_sales,
        'start_time': moment(this.cardInfo.start_time * 1000),
        'end_time': moment(this.cardInfo.end_time * 1000),
        'cardData.num': this.cardInfo.transfer_num
      })
      // 入场门店
      this.cardData.admission_range = this.cardInfo.admission_range
      this.cardData.admission_shop_list = this.cardInfo.admission_shop_list
      // 价格设置
      this.cardData.price_setting = this.cardInfo.price_setting
      if (this.cardInfo.price_setting === 1) {
        // 品牌定价
        this.cardInfo.price_gradient.forEach(i => {
          let key = parseInt(Math.random() * 999999).toString()
          this.rally_price_list.push({
            key,
            time: {
              unit: +i.unit,
              num: +i.num
            },
            validity_times: +i.validity_times,
            rally_price: +i.rally_price,
            frozen_day: +i.frozen_day,
            gift_unit: +i.gift_unit
          })
        })
      } else {
        // 门店定价
        this.cardInfo.price_gradient.forEach(i => {
          let key = parseInt(Math.random() * 999999).toString()
          this.shop_price_list.push({
            key,
            time: {
              unit: +i.unit,
              num: +i.num
            },
            validity_times: +i.validity_times,
            frozen_day: +i.frozen_day,
            gift_unit: +i.gift_unit,
            rally_price: {
              min_price: +i.min_price,
              max_price: +i.max_price
            }
          })
        })
      }
      // 支持售卖门店
      this.cardData.support_sales = this.cardInfo.support_sales
      this.cardData.sell_shop_list = this.cardData.support_sales === 2 ? cloneDeep(this.cardInfo.sell_shop_list) : []
      // 支持售卖时间
      this.start_time = moment(this.cardInfo.start_time * 1000)
      this.end_time = moment(this.cardInfo.end_time * 1000)
      // 转让设置
      this.cardData._is_transfer = !!this.cardInfo.is_transfer
      this.cardData.unit = this.cardInfo.transfer_unit
      this.cardData.num = this.cardInfo.transfer_num
      // 售卖渠道
      this.cardData.sell_type = this.cardInfo.sell_type
      // 卡背景
      this.cardData.card_bg = cloneDeep(this.cardInfo.card_bg)
      // 卡介绍
      this.cardData.card_introduction = this.cardInfo.card_introduction
      // 卡备注
      this.cardData.card_contents = this.cardInfo.card_contents
    },
    // 保存
    onHandleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // 入场门店
          if (this.cardData.admission_range !== 2) {
            // 不是多门店
            this.cardData.admission_shop_list = []
          }
          // 售卖门店
          if (this.cardData.support_sales !== 2) {
            // 不是多门店
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
              this.rally_price_list.forEach(i => {
                p.push({
                  unit: +i.time.unit,
                  num: +i.time.num,
                  validity_times: +i.validity_times,
                  rally_price: +i.rally_price,
                  frozen_day: +i.frozen_day,
                  gift_unit: +i.gift_unit
                })
              })
              break
            case 2:
              // 门店自主定价
              this.shop_price_list.forEach(i => {
                p.push({
                  unit: +i.time.unit,
                  num: +i.time.num,
                  validity_times: +i.validity_times,
                  min_price: +i.rally_price.min_price,
                  max_price: +i.rally_price.max_price,
                  frozen_day: +i.frozen_day,
                  gift_unit: +i.gift_unit
                })
              })
              break
          }
          this.cardData.price_gradient = cloneDeep(p)
          // 时间
          this.cardData.start_time = `${this.start_time.format('YYYY-MM-DD')}`
          this.cardData.end_time = `${this.end_time.format('YYYY-MM-DD')}`
          // 卡id
          this.cardData.id = +this.$route.query.id
          this.editService.editCard(this.cardData).subscribe(res => {
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
        callback('请填写次卡名称')
      } else if (value && !this.rules.card_name.test(value)) {
        // eslint-disable-next-line
        callback('输入的次卡名称格式错误，请重新输入')
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
      // if (value === 1 && !this.rally_price_list.length) {
      //   // eslint-disable-next-line
      //   callback('请添加价格设置')
      // } else if (value === 2 && !this.shop_price_list.length) {
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
    },
    // 入场门店支持方式change
    admission_range(data) {
      this.cardData.admission_range = data.target.value
      // 入场门店变化时，售卖门店同时变化
      this.form.setFieldsValue({
        'cardData.support_sales': 1
      })
      this.cardData.support_sales = 1
    },
    // 价格设置方式change
    price_range(data) {
      this.cardData.price_setting = data.target.value
    },
    // 增加品牌价格
    brand_price_add() {
      let key = parseInt(Math.random() * 999999).toString()
      this.rally_price_list.push({
        key,
        time: {
          unit: 2,
          num: null
        },
        validity_times: null,
        rally_price: null,
        frozen_day: null,
        gift_unit: null
      })
    },
    // 删除品牌价格
    brand_price_delete(index) {
      this.rally_price_list.splice(index, 1)
    },
    // 品牌价格梯度-期限
    brandPriceSettingHandleChange({ value, key, col, prop }) {
      if (prop !== undefined) {
        this.rally_price_list[key][col][prop] = value
      } else {
        this.rally_price_list[key][col] = value
      }
    },
    // 增加门店价格
    shop_price_add() {
      let key = parseInt(Math.random() * 999999).toString()
      this.shop_price_list.push({
        key,
        time: {
          unit: 2,
          num: null
        },
        rally_price: {
          min_price: null,
          max_price: null
        },
        validity_times: null,
        frozen_day: null,
        gift_unit: null
      })
    },
    // 删除门店价格
    shop_price_delete(index) {
      this.shop_price_list.splice(index, 1)
    },
    // 门店价格梯度-期限
    shopPriceSettingHandleChange({ value, key, col, prop }) {
      console.log(prop)
      if (prop !== undefined) {
        this.shop_price_list[key][col][prop] = value
        console.log(value, key, col, prop)
      } else {
        this.shop_price_list[key][col] = value
        console.log(value, key, col, prop)
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
        return endValue.valueOf() >= moment().add(30, 'y').valueOf() || endValue.valueOf() <= moment().valueOf()
      }
      return endValue.valueOf() >= moment(startValue).add(30, 'y').valueOf() || endValue.valueOf() < moment(startValue).add(1, 'd').valueOf()
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
    transfter_change(data) {
      this.cardData.num = data
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
        if (!this.transfer_unit_is_first) {
          this.form.resetFields(['cardData.num'])
        }
        this.transfer_unit_is_first = false
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
    // 售卖渠道
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
    }
  }
}
</script>
