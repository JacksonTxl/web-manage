<template>
  <st-panel app class="page-brand-basic-card page-brand-add-deposit-card" initial>
    <div class="page-brand-basic-card-body">
      <!-- <div class="page-preview">实时预览{{deposit_card}}</div> -->
      <div class="page-content">
        <st-form :form="form" labelWidth="118px">
          <a-row :gutter="8">
            <a-col :lg="16">
              <st-form-item class="page-content-card-line" label="储值卡名称" required>
                <a-input
                  v-decorator="[
                  'cardData.card_name',
                  {rules: [{ validator: card_name_validator}]}
                ]"
                  maxlength="30"
                  style="width: 360px"
                  placeholder="请输入储值卡名称"
                ></a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="16">
              <st-form-item label="储值金额" required>
                <st-input-number :float="true" :min="1" :max="9999999.9" v-decorator="[
                  'cardData.card_price',
                  {rules: [{ validator: card_price_validator}]}
                ]"
                  style="width: 360px"
                  placeholder="请输入储值金额">
                  <span slot="addonAfter">元</span>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="售卖价格" required>
                <st-input-number :float="true" :min="0" :max="9999999.9" v-decorator="[
                  'cardData.sell_price',
                  {rules: [{ validator: sell_price_validator}]}
                ]"
                  style="width: 360px"
                  placeholder="请输入售卖价格">
                  <span slot="addonAfter">元</span>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="期限" required>
                <st-input-number :min="1" :max="99999" v-decorator="[
                  'cardData.num',
                  {rules: [{ validator: num_validator}]}
                ]"
                  style="width: 360px"
                  placeholder="请输入期限">
                  <a-select v-model="cardData.unit" slot="addonAfter" style="width: 50px">
                    <a-select-option
                    v-for="(item,index) in Object.entries(deposit_card.unit.value)"
                    :value="+item[0]"
                    :key="index" >{{item[1]}}</a-select-option>
                  </a-select>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="支持消费类目" required>
                <a-checkbox-group
                v-decorator="['cardData.card_consumer_id',{rules:[{validator:card_consumer_validator}]}]">
                  <a-checkbox
                  v-for="item in Object.entries(deposit_card.consumer_type.value)"
                  :key="+item[0]"
                  :value="+item[0]">{{item[1]}}</a-checkbox>
                </a-checkbox-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="page-content-card-admission-range" label="支持消费门店" required>
                <template slot="label">
                  支持消费门店<st-help-tooltip id="TBMCSC001" />
                </template>
                <a-radio-group
                  @change="consumption_range"
                  v-decorator="['cardData.consumption_range',{initialValue:1,rules:[{validator:admission_shop_list_validator}]}]">
                  <a-radio
                    v-for="item in Object.entries(deposit_card.consumption_range.value)"
                    :key="+item[0]"
                    :value="+item[0]">{{item[1]}}</a-radio>
                </a-radio-group>
                <div class="page-admission-range-shop" v-if="cardData.consumption_range===2">
                  <p class="page-admission-range-shop__describe">设置支持此会员卡出入场馆范围</p>
                  <select-shop @change="admission_range_change"></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="page-content-card-support-sales" label="支持售卖门店" required>
                <a-radio-group
                  @change="support_range"
                  v-decorator="['cardData.support_sales',{initialValue:1,rules:[{validator:support_sales_list_validator}]}]">
                  <a-radio
                    v-for="item in support_sales_list"
                    :key="+item[0]"
                    :value="+item[0]">{{item[1]}}</a-radio>
                </a-radio-group>
                <div class="page-support-sales-shop" :class="{'page-lot-shop':cardData.consumption_range===2}" v-if="cardData.support_sales===2">
                  <p class="page-support-sales-shop__describe">设置支持此会员卡售卖场馆范围</p>
                  <select-shop @change="sales_shop_change"></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-time mg-b0" required>
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
                  v-decorator="['cardData.transfer_num',{rules:[{validator:transfer_validator}]}]"
                  class="page-input-group"
                  :float="cardData.unit===2"
                  :disabled="!cardData._is_transfer"
                  :min="transferMin" :max="transferMax">
                    <a-select slot="addonAfter" v-model="cardData.transfer_unit" :disabled="!cardData._is_transfer">
                      <a-select-option v-for="item in Object.entries(deposit_card.transfer_unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                    </a-select>
                  </st-input-number>
                  <!-- <a-input-group compact class="page-input-group">
                    <a-input-number
                    v-decorator="['cardData.transfer_num',{rules:[{validator:transfer_validator}]}]"
                    @change="transfter_change"
                    :disabled="!cardData._is_transfer"/>
                    <a-select v-model="cardData.transfer_unit" defaultValue="2" :disabled="!cardData._is_transfer">
                      <a-select-option v-for="item in Object.entries(deposit_card.transfer_unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                    </a-select>
                  </a-input-group> -->
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-sell-type" label="售卖渠道" required>
                <a-checkbox-group v-model="cardData.card_sell_type">
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
                <st-card-bg-radio @change="onCardBgChange" v-model="cardData.bg_image" />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-introduction mt-4" label="会员卡介绍">
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
            <a-col :lg="22">
              <st-form-item class="page-content-card-contents mt-4" label="备注">
                <a-textarea
                v-model="cardData.description"
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
import { AppConfig } from '@/constants/config'
import { MessageService } from '@/services/message.service'
export default {
  name: 'BrandDepositCardAdd',
  serviceInject() {
    return {
      rules: RuleConfig,
      addService: AddService,
      userService: UserService,
      appConfig: AppConfig,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      addLoading: this.addService.loading$,
      deposit_card: this.userService.depositCardEnums$
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
        // 会员卡名称
        card_name: '',
        // 储值金额
        card_price: null,
        // 售卖价格
        sell_price: null,
        // 期限
        num: null,
        // 期限单位
        unit: 1,
        // 消费类目
        card_consumer_id: [],
        // 支持入场范围 1-单店 2-多店 3-全店
        consumption_range: 1,
        // 支持入场门店
        consumer_shop_list: [],
        // 支持售卖场馆类型 1-全部门店 2-指定门店
        support_sales: 1,
        // 支持售卖门店
        sell_shop_list: [],
        // 支持售卖时间
        start_time: '',
        end_time: '',
        // 结束时间面板是否显示
        endOpen: false,
        // 卡背景
        bg_image: {
          image_id: 0,
          image_key: 'image/VZ0RGBwTX7FA1yKb.png',
          image_url: '',
          index: 1
        },
        // 是否配置了用户端
        appConfig: false,
        // 卡介绍
        card_contents: '',
        // 备注
        description: '',
        // 是否支持转让
        _is_transfer: false,
        is_transfer: 0,
        // 转让单位
        transfer_unit: 2,
        // 转让手续费
        transfer_num: undefined,
        // 售卖渠道
        card_sell_type: [2]
      },
      // 卡背景的help文本
      cardBgValidatorText: '',
      // 售卖时间
      start_time: null,
      end_time: null
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    // 保存
    onHandleSubmit(e) {
      e.preventDefault()
      // 校验卡背景
      this.cardBgValidator()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && this.cardBgIsOk) {
          // 卡名称
          this.cardData.card_name = values.cardData.card_name
          // 储值金额
          this.cardData.card_price = values.cardData.card_price
          // 售卖价格
          this.cardData.sell_price = values.cardData.sell_price
          // 期限
          this.cardData.num = values.cardData.num
          // 消费类目
          this.cardData.card_consumer_id = cloneDeep(values.cardData.card_consumer_id)
          // 消费门店
          if (this.cardData.consumption_range !== 2) {
            // 不是多门店
            this.cardData.consumer_shop_list = []
          }
          // 售卖门店
          if (this.cardData.support_sales !== 2) {
            // 不是多门店
            this.cardData.sell_shop_list = []
          }
          // 售卖门店
          if (this.cardData.consumption_range === 2 && this.cardData.support_sales === 3) {
            // 多门店 && 支持入场门店
            this.cardData.sell_shop_list = cloneDeep(this.cardData.consumer_shop_list)
          }
          // 时间
          const dateFormat = this.appConfig.DATE_FORMAT.date
          this.cardData.start_time = moment(this.start_time).format(dateFormat)
          this.cardData.end_time = moment(this.end_time).format(dateFormat)
          // 转让
          this.cardData.transfer_num = this.cardData._is_transfer ? +values.cardData.transfer_num : undefined
          this.addService.addCard(this.cardData).subscribe(this.onSubmitSuccess)
        }
      })
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '添加成功'
      })
      this.$router.push({
        name: 'brand-product-card-deposit-list-all'
      })
    },
    // card_name validatorFn
    card_name_validator(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请填写储值卡名称')
      } else if (value && !this.rules.card_name.test(value)) {
        // eslint-disable-next-line
        callback('输入的储值卡名称格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // card_price validatorFn
    card_price_validator(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请填写储值金额')
      } else if (value && !this.rules.number.test(value)) {
        // eslint-disable-next-line
        callback('输入的储值金额格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // sell_price validatorFn
    sell_price_validator(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请填写售卖价格')
      } else if (value && !this.rules.number.test(value)) {
        // eslint-disable-next-line
        callback('输入的售卖价格格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // num validatorFn
    num_validator(rule, value, callback) {
      if (value === undefined || value === '') {
        // eslint-disable-next-line
        callback('请填写期限')
      } else if (value && !this.rules.number.test(value)) {
        // eslint-disable-next-line
        callback('输入的期限格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // card_consumer_id validatorFn
    card_consumer_validator(rule, value, callback) {
      if (value === undefined || value === '' || value.length === 0) {
        // eslint-disable-next-line
        callback('请选择支持消费类目')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // consumer_shop_list validatorFn
    admission_shop_list_validator(rule, value, callback) {
      if (value === 2 && !this.cardData.consumer_shop_list.length) {
        // eslint-disable-next-line
        callback('请添加支持入场门店')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // support_sales_list validatorFn
    support_sales_list_validator(rule, value, callback) {
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
      } else {
        if (!value) {
          // eslint-disable-next-line
          callback('请输入转让费用')
        } else {
          // eslint-disable-next-line
          callback()
        }
      }
    },
    // 增加入场门店
    admission_range_change(data) {
      this.cardData.consumer_shop_list = cloneDeep(data)
    },
    // 入场门店支持方式change
    consumption_range(data) {
      this.cardData.consumption_range = data.target.value
      // 入场门店变化时，售卖门店同时变化
      this.form.setFieldsValue({
        'cardData.support_sales': 1
      })
      this.cardData.support_sales = 1
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
    // 转让
    transfer(e) {
      this.cardData._is_transfer = e.target.checked
      // 重置转让费用的校验
      this.form.resetFields(['cardData.transfer_num'])
    },
    onCardBgChange(e) {
      this.cardBgValidatorText = ''
    },
    // 卡背景校验
    cardBgValidator() {
      let validata = this.cardData.bg_image.image_key !== ''
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
    'cardData.transfer_unit': {
      deep: true,
      handler() {
        this.form.resetFields(['cardData.transfer_num'])
      }
    },
    'cardData.consumer_shop_list': {
      deep: true,
      handler() {
        let v = this.cardData.consumption_range
        this.cardData.consumption_range = v
        this.form.setFieldsValue({
          'cardData.consumption_range': v
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
      let arr = cloneDeep(Object.entries(this.deposit_card.support_sales.value))
      let index = this.cardData.consumption_range === 2 ? 999 : 2
      arr.splice(index, 1)
      return arr
    },
    // 售卖渠道
    sell_type_list() {
      let sell_type = cloneDeep(Object.entries(this.deposit_card.sell_type.value))
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
      return this.cardData.transfer_unit === 1 ? 100 : 999999.9
    }
  }
}
</script>
