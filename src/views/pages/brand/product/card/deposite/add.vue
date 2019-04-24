<template>
  <st-panel app class="page-brand-basic-card page-brand-add-deposite-card" initial>
    <div class="page-brand-basic-card-body">
      <div class="page-preview">实时预览{{deposit_card}}</div>
      <div class="page-content">
        <st-form :form="form" labelWidth="116px">
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
                <a-input v-decorator="[
                  'cardData.card_price',
                  {rules: [{ validator: card_price_validator}]}
                ]"
                  style="width: 360px"
                  placeholder="请输入储值金额">
                  <span slot="suffix">元</span>
                </a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="售卖价格" required>
                <a-input v-decorator="[
                  'cardData.sell_price',
                  {rules: [{ validator: sell_price_validator}]}
                ]"
                  style="width: 360px"
                  placeholder="请输入售卖价格">
                  <span slot="suffix">元</span>
                </a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="期限" required>
                <a-input v-decorator="[
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
                </a-input>
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
            <a-col :lg="22">
              <st-form-item class="page-content-card-admission-range" label="支持消费门店" required>
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
                  <select-shop :shopIds="cardData.consumer_shop_list" @change="admission_range_change"></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-support-sales" label="支持售卖门店" required>
                <a-radio-group
                  @change="support_range"
                  v-decorator="['cardData.support_sales',{validateTrigger: 'blur',initialValue:1,rules:[{validator:support_sales_list_validator}]}]">
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
                  <a-input-group compact class="page-input-group">
                    <a-input-number
                    v-decorator="['cardData.transfer_num',{rules:[{validator:transfer_validator}]}]"
                    @change="transfter_change"
                    :disabled="!cardData._is_transfer"/>
                    <a-select v-model="cardData.transfer_unit" defaultValue="2" :disabled="!cardData._is_transfer">
                      <a-select-option v-for="item in Object.entries(deposit_card.transfer_unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                    </a-select>
                  </a-input-group>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-sell-type" label="售卖渠道" required>
                <a-checkbox-group v-model="cardData.sell_list">
                  <a-checkbox
                  v-for="item in sell_type_list"
                  :key="item.value"
                  :disabled="item.disabled"
                  :value="item.value">{{item.label}}</a-checkbox>
                </a-checkbox-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-bg" label="卡背景" required>
                <st-card-bg-radio v-model="cardData.bg_image" />
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
import { cloneDeep } from 'lodash-es'
import { AddService } from './add.service'
export default {
  name: 'BrandDepositeCardAdd',
  serviceInject() {
    return {
      rules: RuleConfig,
      addService: AddService,
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      addLoading: this.addService.loading$,
      deposit_card: user.depositeCardEnums$
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
        transfer_num: 0,
        // 售卖渠道
        sell_list: [2],
        card_sell_type: 2
      },
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
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
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
          this.cardData.start_time = `${this.start_time.format('YYYY-MM-DD')} 00:00:00`
          this.cardData.end_time = `${this.end_time.format('YYYY-MM-DD')} 00:00:00`
          this.addService.addCard(this.cardData).subscribe(res => {
            console.log(res)
          })
        }
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
      // eslint-disable-next-line
      callback()
      // if (value === 2 && !this.cardData.consumer_shop_list.length) {
      //   // eslint-disable-next-line
      //   callback('请添加支持入场门店')
      // } else {
      //   // eslint-disable-next-line
      //   callback()
      // }
    },
    // support_sales_list validatorFn
    support_sales_list_validator(rule, value, callback) {
      // eslint-disable-next-line
      callback()
      // if (value === 2 && !this.cardData.support_sales.length) {
      //   // eslint-disable-next-line
      //   callback('请添加支持售卖门店')
      // } else {
      //   // eslint-disable-next-line
      //   callback()
      // }
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
      // this.cardData.consumer_shop_list = cloneDeep(data)  kael
      this.cardData.consumer_shop_list = [1, 2]
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
      // this.cardData.sell_shop_list = cloneDeep(data)  kael
      this.cardData.sell_shop_list = [1]
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
        return startValue.valueOf() < moment().subtract(1, 'd').valueOf()
      }
      let start = endValue.valueOf() > moment().add(30, 'y').valueOf() ? moment(endValue).subtract(30, 'y').valueOf() : moment().subtract(1, 'd').add(1, 'ms').valueOf()
      return startValue.valueOf() < start || startValue.valueOf() > moment(endValue).subtract(1, 'd').valueOf()
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
    // 转让
    transfer(e) {
      this.cardData._is_transfer = e.target.checked
      // 重置转让费用的校验
      this.form.resetFields(['cardData.transfer_num'])
    },
    transfter_change(data) {
      this.cardData.transfer_num = data
    }
  },
  watch: {
    'cardData.sell_list': {
      deep: true,
      handler(newVal, oldVal) {
        this.cardData.card_sell_type = newVal.length > 1 ? 3 : 2
      }
    },
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
      let arr = [
        { value: 2, label: '线下售卖', disabled: true },
        { value: 1, label: '用户端售卖', disabled: false }
      ]
      let index = this.cardData.appConfig ? 999 : 1
      arr.splice(index, 1)
      return arr
    }
  }
}
</script>
