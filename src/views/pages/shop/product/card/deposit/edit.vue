<template>
  <st-panel
    app
    class="page-shop-basic-card page-shop-edit-deposit-card"
    initial
  >
    <div class="page-shop-basic-card-body">
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
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="22">
              <p class="page-content-card__card__name">
                <st-tag type="deposit-card" />
                <span>{{ cardInfo.card_name }}</span>
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item label="储值金额" required>
                <st-input-number
                  :float="true"
                  :min="1"
                  :max="9999999.9"
                  v-decorator="[
                    'cardData.card_price',
                    { rules: [{ validator: card_price_validator }] }
                  ]"
                  style="width: 360px"
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
                  v-decorator="[
                    'cardData.sell_price',
                    { rules: [{ validator: sell_price_validator }] }
                  ]"
                  style="width: 360px"
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
                  v-decorator="[
                    'cardData.num',
                    { rules: [{ validator: num_validator }] }
                  ]"
                  style="width: 360px"
                  placeholder="请输入期限"
                  @change="syncDeadlineNum"
                >
                  <a-select
                    v-model="cardData.unit"
                    slot="addonAfter"
                    style="width: 50px"
                  >
                    <a-select-option
                      v-for="(item, index) in Object.entries(
                        deposit_card.unit.value
                      )"
                      :value="+item[0]"
                      :key="index"
                    >
                      {{ item[1] }}
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
                  v-decorator="[
                    'cardData.card_consumer_id',
                    { rules: [{ validator: card_consumer_validator }] }
                  ]"
                  @change="syncConsumer"
                >
                  <a-checkbox
                    v-for="item in Object.entries(
                      deposit_card.consumer_type.value
                    )"
                    :key="+item[0]"
                    :value="+item[0]"
                  >
                    {{ item[1] }}
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
              >
                {{ shopName.name }}
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item
                class="page-content-card-support-sales"
                label="支持售卖门店"
              >
                {{ shopName.name }}
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
                    :disabled="startTimeIsDisabled"
                    :disabledDate="disabledStartDate"
                    v-decorator="[
                      'start_time',
                      {
                        rules: [
                          { required: true, message: '请选择开始售卖时间' }
                        ]
                      }
                    ]"
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
                    v-decorator="[
                      'end_time',
                      {
                        rules: [
                          { required: true, message: '请选择结束售卖时间' }
                        ]
                      }
                    ]"
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
                  <a-checkbox
                    class="page-checkbox"
                    :checked="cardData._is_transfer"
                    @change="transfer"
                  >
                    支持转让
                  </a-checkbox>
                  <st-input-number
                    style="width:200px"
                    v-decorator="[
                      'cardData.transfer_num',
                      { rules: [{ validator: transfer_validator }] }
                    ]"
                    class="page-input-group"
                    :float="cardData.transfer_unit === 2"
                    @change="transfter_change"
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
                        v-for="item in Object.entries(
                          deposit_card.transfer_unit.value
                        )"
                        :key="+item[0]"
                        :value="+item[0]"
                      >
                        {{ item[1] }}
                      </a-select-option>
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
              <st-form-item
                class="page-content-card-sell-type"
                label="售卖方式"
                required
              >
                <a-checkbox-group v-model="cardData.card_sell_type">
                  <a-checkbox
                    v-for="item in sell_type_list"
                    :key="item.value"
                    :disabled="item.value === 2"
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
                  :loading="addLoading.editCard"
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
import { cloneDeep, remove } from 'lodash-es'
import { EditService } from './edit.service'
import MemberCard from '@/views/biz-components/h5/pages/member-card'
import H5Container from '@/views/biz-components/h5/h5-container'
// TODO: 临时h5mixin文件，本文件重构后重新引用brand下的mixin
import h5mixin from './h5mixin'
import { MEMBER_CARD } from '@/views/biz-components/h5/pages/member-card.config'
import CardBgRadio from '@/views/biz-components/card-bg-radio/card-bg-radio'
export default {
  name: 'PageShopDepositCardEdit',
  mixins: [h5mixin],
  components: {
    MemberCard,
    H5Container,
    CardBgRadio
  },
  serviceInject() {
    return {
      rules: RuleConfig,
      addService: EditService,
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      addLoading: this.addService.loading$,
      shopName: this.userService.shop$,
      cardInfo: this.addService.cardInfo$,
      member_card: this.userService.memberCardEnums$,
      deposit_card: user.depositCardEnums$
    }
  },
  bem: {
    b: 'st-help-popover'
  },
  data() {
    return {
      // cardData
      cardType: MEMBER_CARD.DEPOSIT_CARD,
      MEMBER_CARD: MEMBER_CARD,
      cardData: {
        // 卡id
        card_id: null,
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
        // 支持售卖时间
        start_time: '',
        end_time: '',
        // 结束时间面板是否显示
        endOpen: false,
        // 卡背景
        bg_image: {
          image_id: 0,
          image_key: this.member_card.card_bg_list.value[0].image_key,
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
        transfer_unit: 2,
        // 转让手续费
        transfer_num: undefined,
        // 售卖方式
        card_sell_type: [2]
      },
      // 卡背景的help文本
      cardBgValidatorText: '',
      transfer_unit_is_first: true,
      // 售卖时间
      start_time: null,
      end_time: null,
      form: this.$form.createForm(this),
      // 是否禁止选择开始时间,如果卡状态是可售卖，则需要禁止修改开始时间
      startTimeIsDisabled: false
    }
  },
  mounted() {
    this.init()
    this.h5CardInfo.consumption_range = { id: 1, name: this.shopName.name }
  },
  methods: {
    init() {
      this.form.setFieldsValue({
        'cardData.card_price': this.cardInfo.card_price,
        'cardData.sell_price': this.cardInfo.sell_price,
        'cardData.num': this.cardInfo.num,
        'cardData.card_consumer_id': this.cardInfo.card_consumer_id,
        start_time: moment(this.cardInfo.start_time),
        end_time: moment(this.cardInfo.end_time),
        'cardData.transfer_num': this.cardInfo.transfer_num
      })
      // 储值金额
      this.cardData.card_price = this.cardInfo.card_price
      // 售卖价格
      this.cardData.sell_price = this.cardInfo.sell_price
      // 期限
      this.cardData.num = this.cardInfo.num
      this.cardData.unit = this.cardInfo.unit
      // 消费类目
      this.cardData.card_consumer_id = this.cardInfo.card_consumer_id
      // 支持售卖时间
      this.start_time = moment(this.cardInfo.start_time)
      this.end_time = moment(this.cardInfo.end_time)
      this.startTimeIsDisabled =
        moment(this.cardInfo.start_time).valueOf() <
          moment()
            .startOf('day')
            .valueOf() &&
        moment(this.cardInfo.end_time).valueOf() > moment().valueOf()
      // 转让设置
      this.cardData._is_transfer = !!this.cardInfo.is_transfer
      this.cardData.transfer_unit = this.cardInfo.transfer_unit
      this.cardData.transfer_num = this.cardInfo.transfer_num
      // 售卖方式
      this.cardData.card_sell_type = this.cardInfo.card_sell_type
      // 卡背景
      this.cardData.bg_image = cloneDeep(this.cardInfo.bg_image)
      // 卡介绍
      this.cardData.card_contents = this.cardInfo.card_contents
      // 卡备注
      this.cardData.description = this.cardInfo.description
      this.initH5CardInfo()
    },
    // 保存
    onHandleSubmit(e) {
      e.preventDefault()
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
          this.cardData.card_consumer_id = cloneDeep(
            values.cardData.card_consumer_id
          )
          // 时间
          this.cardData.start_time = `${this.start_time.format('YYYY-MM-DD')}`
          this.cardData.end_time = `${this.end_time.format('YYYY-MM-DD')}`
          // 卡id
          this.cardData.card_id = +this.$route.query.id
          this.addService.editCard(this.cardData).subscribe(res => {
            this.$router.push({
              name: 'shop-product-card-deposit-list-all'
            })
          })
        }
      })
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
    // 售卖时间-start
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    // 开始时间
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
    transfter_change(data) {
      this.cardData.transfer_num = data
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
        if (!this.transfer_unit_is_first) {
          this.form.resetFields(['cardData.transfer_num'])
        }
        this.transfer_unit_is_first = false
      }
    }
  },
  computed: {
    // 售卖方式
    sell_type_list() {
      let sell_type = cloneDeep(
        Object.entries(this.deposit_card.sell_type.value)
      )
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
