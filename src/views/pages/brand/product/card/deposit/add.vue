<template>
  <st-panel
    app
    class="page-brand-basic-card page-brand-add-deposit-card"
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
              :cardType="MEMBER_CARD.DEPOSIT_CARD"
            ></member-card>
          </template>
        </h5-container>
      </div>
      <div class="page-content">
        <st-form :form="form" labelWidth="118px">
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item
                class="page-content-card-line"
                label="储值卡名称"
                required
              >
                <a-input
                  v-decorator="decorators.cardData.card_name"
                  maxlength="30"
                  class="page-content-card-input"
                  placeholder="请输入储值卡名称"
                  @change="syncName"
                ></a-input>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="22">
              <st-form-item label="储值金额" required>
                <st-input-number
                  :float="true"
                  :min="1"
                  :max="9999999.9"
                  v-decorator="decorators.cardData.card_price"
                  class="page-content-card-input"
                  placeholder="请输入储值金额"
                  @change="syncDepositPrice"
                >
                  <span slot="addonAfter">元</span>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="售卖价格" required>
                <st-input-number
                  :float="true"
                  :min="0"
                  :max="9999999.9"
                  v-decorator="decorators.cardData.sell_price"
                  class="page-content-card-input"
                  placeholder="请输入售卖价格"
                >
                  <span slot="addonAfter">元</span>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="期限" required>
                <st-input-number
                  :min="1"
                  :max="99999"
                  v-decorator="decorators.cardData.num"
                  class="page-content-card-input"
                  placeholder="请输入期限"
                  @change="syncDeadlineNum"
                >
                  <a-select
                    v-model="cardData.unit"
                    slot="addonAfter"
                    class="page-content-card-small-select"
                  >
                    <a-select-option
                      v-for="(item, index) in unit"
                      :value="item.value"
                      :key="index"
                    >
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="支持消费类目" required>
                <a-checkbox-group
                  v-decorator="decorators.cardData.card_consumer_id"
                  @change="syncConsumer"
                >
                  <a-checkbox
                    v-for="item in consumerType"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-checkbox>
                </a-checkbox-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item
                class="page-content-card-admission-range"
                label="支持消费门店"
                required
              >
                <template slot="label">
                  支持消费门店
                  <st-help-tooltip id="TBMCSC001" />
                </template>
                <a-radio-group
                  @change="consumption_range"
                  v-decorator="decorators.cardData.consumption_range"
                >
                  <a-radio
                    v-for="item in consumptionRange"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-radio-group>
                <div
                  class="page-admission-range-shop"
                  v-if="
                    cardData.consumption_range ===
                      CONSUMPTION_RANGE.GENERAL_STORE
                  "
                >
                  <p class="page-admission-range-shop__describe">
                    设置支持此会员卡出入场馆范围
                  </p>
                  <select-shop
                    :shopIds="cardData.consumer_shop_list"
                    @change="admission_range_change"
                  ></select-shop>
                </div>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item
                class="page-content-card-support-sales"
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
                      cardData.consumption_range ===
                      CONSUMPTION_RANGE.GENERAL_STORE
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
                    <a-icon
                      class="page-content-card-time__icon"
                      type="info-circle"
                    ></a-icon>
                  </a-popover>
                </span>
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
                    class="page-content-card-num-input page-input-group"
                    v-decorator="decorators.cardData.transfer_num"
                    :float="cardData.transfer_unit === TRANSFER_UNIT.RMB"
                    :disabled="!cardData._is_transfer"
                    :min="transferMin"
                    :max="transferMax"
                  >
                    <a-select
                      slot="addonAfter"
                      v-model="cardData.transfer_unit"
                      :disabled="!cardData._is_transfer"
                    >
                      <a-select-option
                        v-for="item in transferUnit"
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
                <a-checkbox-group v-model="cardData.card_sell_type">
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
                  v-model="cardData.bg_image"
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
                  v-model="cardData.card_contents"
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
                  v-model="cardData.description"
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
import moment from 'moment'
import { RuleConfig } from '@/constants/rule'
import SelectShop from '@/views/fragments/shop/select-shop'
import { cloneDeep, remove } from 'lodash-es'
import { AddService } from './add.service'
import { AppConfig } from '@/constants/config'
import { MessageService } from '@/services/message.service'
import MemberCard from '@/views/biz-components/h5/pages/member-card'
import H5Container from '@/views/biz-components/h5/h5-container'
import h5mixin from '../member/period/h5mixin'
import { MEMBER_CARD } from '@/views/biz-components/h5/pages/member-card.config'
import CardBgRadio from '@/views/biz-components/card-bg-radio/card-bg-radio'
import {
  CONSUMPTION_RANGE,
  SUPPORT_SALES,
  UNIT,
  SELL_TYPE,
  TRANSFER_UNIT
} from '@/constants/card/deposit'
import { ruleOptions } from './deposit.config'
export default {
  name: 'BrandDepositCardAdd',
  mixins: [h5mixin],
  serviceProviders() {
    return [AddService]
  },
  serviceInject() {
    return {
      rules: RuleConfig,
      addService: AddService,
      appConfig: AppConfig,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      addLoading: this.addService.loading$,
      cardBgList: this.addService.cardBgList$,
      unit: this.addService.unit$,
      consumerType: this.addService.consumerType$,
      consumptionRange: this.addService.consumptionRange$,
      transferUnit: this.addService.transferUnit$,
      supportSales: this.addService.supportSales$,
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
      form,
      decorators,
      // cardData
      CONSUMPTION_RANGE,
      SUPPORT_SALES,
      UNIT,
      SELL_TYPE,
      TRANSFER_UNIT,
      cardType: MEMBER_CARD.DEPOSIT_CARD,
      MEMBER_CARD,
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
        unit: UNIT.DAY,
        // 消费类目
        card_consumer_id: [],
        // 支持入场范围 1-单店 2-多店 3-全店
        consumption_range: CONSUMPTION_RANGE.ONLY_STORE,
        // 支持入场门店
        consumer_shop_list: [],
        // 支持售卖场馆类型 1-全部门店 2-指定门店
        support_sales: SUPPORT_SALES.ALL_STORE,
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
          image_key: this.cardBgList[0].image_key,
          image_url: '',
          index: 1
        },
        // 是否配置了用户端
        appConfig: true,
        // 卡介绍
        card_contents: '',
        // 备注
        description: '',
        // 是否支持转让
        _is_transfer: false,
        is_transfer: 0,
        // 转让单位
        transfer_unit: TRANSFER_UNIT.RMB,
        // 转让手续费
        transfer_num: undefined,
        // 售卖方式
        card_sell_type: [SELL_TYPE.OFFLINE]
      },
      // 卡背景的help文本
      cardBgValidatorText: '',
      // 售卖时间
      start_time: null,
      end_time: null
    }
  },
  mounted() {
    this.syncAdmission()
    this.syncAdmissionShop()
  },
  methods: {
    // 保存
    onHandleSubmit(e) {
      e.preventDefault()
      // 校验卡背景
      this.cardBgValidator()
      this.form.validate().then(values => {
        if (this.cardBgIsOk) {
          // 卡名称
          this.cardData.card_name = values.cardData.card_name
          // 储值金额
          this.cardData.card_price = values.cardData.card_price
          // 售卖价格
          this.cardData.sell_price = values.cardData.sell_price
          // 期限
          this.cardData.num = values.cardData.num
          // 消费类目
          this.cardData.card_consumer_id = cloneDeep(
            values.cardData.card_consumer_id
          )
          // 消费门店
          if (
            this.cardData.consumption_range !== CONSUMPTION_RANGE.GENERAL_STORE
          ) {
            // 不是多门店
            this.cardData.consumer_shop_list = []
          }
          // 售卖门店
          if (this.cardData.support_sales !== SUPPORT_SALES.SPECIFIED_STORE) {
            // 不是多门店
            this.cardData.sell_shop_list = []
          }
          // 售卖门店
          if (
            this.cardData.consumption_range ===
              CONSUMPTION_RANGE.GENERAL_STORE &&
            this.cardData.support_sales === SUPPORT_SALES.CONSUMER_STORE
          ) {
            // 多门店 && 支持入场门店
            this.cardData.sell_shop_list = cloneDeep(
              this.cardData.consumer_shop_list
            )
          }
          // 时间
          const dateFormat = this.appConfig.DATE_FORMAT.date
          this.cardData.start_time = moment(this.start_time).format(dateFormat)
          this.cardData.end_time = moment(this.end_time).format(dateFormat)
          // 转让
          this.cardData.transfer_num = this.cardData._is_transfer
            ? +values.cardData.transfer_num
            : undefined
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
    // 增加入场门店
    admission_range_change(data) {
      this.cardData.consumer_shop_list = cloneDeep(data)
      this.syncAdmissionShop()
    },
    // 入场门店支持方式change
    consumption_range(data) {
      this.cardData.consumption_range = data.target.value
      // 入场门店变化时，售卖门店同时变化
      this.form.setFieldsValue({
        'cardData.support_sales': SUPPORT_SALES.ALL_STORE
      })
      this.cardData.support_sales = SUPPORT_SALES.ALL_STORE
      this.syncAdmission()
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
      let arr = cloneDeep(this.supportSales)
      let index =
        this.cardData.consumption_range === this.CONSUMPTION_RANGE.GENERAL_STORE
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
    // 卡背景是否校验通过
    cardBgIsOk() {
      return this.cardBgValidatorText === ''
    },
    // 转让设置的min
    transferMin() {
      return 0
    },
    // 转让设置的max
    transferMax() {
      return this.cardData.transfer_unit === TRANSFER_UNIT.PERCENT
        ? 100
        : 999999.9
    }
  }
}
</script>
