<template>
  <st-panel app :class="basic()" initial>
    <div :class="basic('body')">
      <div>
        <st-form :form="form" labelWidth="118px">
          <a-row :gutter="8" >
            <a-col :lg="24">
              <st-form-item label="优惠券类型" required>
                <a-radio-group defaultValue="1" v-if="couponEnums">
                  <a-radio-button
                    v-for="(item, index) in couponEnums.coupon_type.value"
                    :value="index"
                    :key="index"
                  >{{item}}</a-radio-button>
                </a-radio-group>
              </st-form-item>
              <st-form-item label="优惠券名称" required>
                <a-input
                  v-decorator="[
                  'card_name',
                  {rules: [{ validator: card_name_validator}]}
                  ]"
                  maxlength="10"
                  placeholder="请输入优惠券名称"
                  :class="basic('input')"
                ></a-input>
              </st-form-item>
              <st-form-item label="面额" required>
                <st-input-number  placeholder="请输入面额" :class="basic('input')">
                  <template slot="addonAfter">元</template>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-divider :class="basic('line')"></a-divider>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item label="优惠范围" required>
                <a-radio-group defaultValue="1" @change="changeProductType">
                  <a-radio value="1">全部类目</a-radio>
                  <a-radio value="2">指定类目</a-radio>
                </a-radio-group>
                <a-select v-if="showProductType === '2' && transaction" mode="multiple" defaultValue="1" placeholder="请选择类目">
                  <a-select-option v-for="(item, index) in transaction.product_type.value" :key="`${index}`" :value="index">
                    {{item}}
                  </a-select-option>
                </a-select>
              </st-form-item>
              <st-form-item label="可用门店" required>
                <a-radio-group defaultValue="1">
                  <a-radio value="1">全部门店</a-radio>
                  <a-radio value="2">指定门店</a-radio>
                </a-radio-group>
                <select-shop v-if="showShop === '2'" @change="onSelectShop"></select-shop>
              </st-form-item>
              <st-form-item label="使用条件" required>
                <a-radio-group @change="onChange" v-model="value">
                  <a-radio :value="1">无门槛使用</a-radio>
                  <a-radio :value="2">满<a-input :class="basic('radio-input')"/>元使用</a-radio>
                </a-radio-group>
              </st-form-item>
              <st-form-item  label="发放数量" required>
                <st-input-number :class="basic('input')" placeholder="请输入数量">
                  <template slot="addonAfter">张</template>
                </st-input-number>
                <label :class="basic('tip')">保存后只可增加不可减少</label>
              </st-form-item>
              <st-form-item  label="使用有效期" required>
                领券当日起
                <st-input-number placeholder="" :class="basic('radio-input')"></st-input-number>
                天内有效
              </st-form-item>
              <st-form-item  label="优惠共享" >
                <a-checkbox @change="onChange">不可与其它优惠同享</a-checkbox>
                <a-popover
                    trigger="hover"
                    placement="rightBottom"
                    arrowPointAtCenter
                  >
                    <div slot="content">
                      勾选时，如果商品参与了其他营销活动，<br/>如拼图、体验价等，则优惠券不可用。
                    </div>
                    <a-icon class="page-content-card-time__icon" type="info-circle"></a-icon>
                  </a-popover>
              </st-form-item>
              <st-form-item label="每人限领" required>
                <a-radio-group @change="onChange" v-model="value">
                  <a-radio :value="1">不限</a-radio>
                  <a-radio :value="2">每人限领<a-input :class="basic('radio-input')"/>次</a-radio>
                </a-radio-group>
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
import { cloneDeep, remove } from 'lodash-es'
import { AddService } from './add.service'
import SelectShop from '@/views/fragments/shop/select-shop'
export default {
  name: 'BrandMarketingPluginCouponAdd',
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
      shopName: this.userService.shop$,
      couponEnums: this.userService.couponEnums$,
      transaction: this.userService.transaction$
    }
  },
  bem: {
    basic: 'brand-marketing-coupon-add'
  },
  data() {
    return {
      form: this.$form.createForm(this),
      showProductType: '1',
      showShop: '1',

      // 结束时间面板是否显示
      endOpen: false,
      priceColumns: [
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
      // 价格梯度
      rallyPriceList: [],
      // 价格检验是否通过
      rallyPriceIsOk: true,
      // 价格是否未输入过
      rallyPriceIsNoInput: true,
      // 价格校验文案
      rallyPriceValidText: '',
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
      // 售卖时间
      start_time: null,
      end_time: null,
      // 是否支持转让
      is_transfer: false,
      // 转让单位
      transferUnit: 2,
      // 转让手续费
      transferNum: 0,
      // 售卖渠道
      sellType: [2],
      // 卡背景
      cardBg: {
        image_id: 0,
        image_key: 'image/VZ0RGBwTX7FA1yKb.png',
        image_url: '',
        index: 1
      },
      // 卡介绍
      cardIntroduction: '',
      // 备注
      cardContents: '',
      // 是否配置了用户端
      appConfig: false
    }
  },
  methods: {
    changeProductType(event) {
      this.showProductType = event.target.value
    },
    // 保存
    onHandleSubmit(e) {
      this.form.validateFieldsAndScroll((err, values) => {
        this.validatePrice()
        if (!err && this.priceValidateStatus === 'success') {
          let unit = this.is_transfer ? this.transferUnit : undefined
          let num = this.is_transfer ? this.transferNum : undefined
          let price_gradient = []
          this.rallyPriceList.forEach(i => {
            price_gradient.push({
              unit: +i.time.unit,
              num: +i.time.num,
              rally_price: +i.rally_price,
              frozen_day: +i.frozen_day,
              gift_unit: +i.gift_unit,
              validity_times: +i.validity_times
            })
          })
          this.addService.addCard({
            card_type: 1,
            card_name: values.card_name,
            start_time: `${this.start_time.format('YYYY-MM-DD')} 00:00:00`,
            end_time: `${this.end_time.format('YYYY-MM-DD')} 23:59:59`,
            is_transfer: +this.is_transfer,
            unit,
            num,
            sell_type: this.sellType,
            card_introduction: this.cardIntroduction,
            card_contents: this.cardContents,
            card_bg: this.cardBg,
            price_gradient
          }).subscribe(res => {
            // 新增成功
            this.$router.push({
              path: '/shop/product/card/member/list/all'
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
    // 价格梯度
    brandPriceSettingHandleChange({ value, key, col, prop }) {
      this.rallyPriceIsNoInput = false
      if (prop !== undefined) {
        this.rallyPriceList[key][col][prop] = value
      } else {
        this.rallyPriceList[key][col] = value
      }
    },
    // 删除价格
    price_delete(index) {
      this.rallyPriceList.splice(index, 1)
    },
    // 增加价格
    price_add() {
      let key = parseInt(Math.random() * 999999).toString()
      this.rallyPriceList.push({
        key,
        validity_times: null,
        rally_price: null,
        time: {
          unit: 2,
          num: null
        },
        frozen_day: null,
        gift_unit: null
      })
    },
    // 开始时间
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (!endValue) {
        // 结束时间未选择
        return startValue.valueOf() < moment().subtract(1, 'd').valueOf()
      }
      let start = endValue.valueOf() > moment().add(30, 'y').valueOf() ? moment(endValue).subtract(30, 'y').valueOf() : moment().subtract(1, 'd').add(1, 'ms').valueOf()
      return startValue.valueOf() < start || startValue.valueOf() > moment(endValue).subtract(1, 'd').valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    // 结束时间
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (!startValue) {
        // 开始时间未选择
        return endValue.valueOf() >= moment().add(30, 'y').valueOf() || endValue.valueOf() <= moment().valueOf()
      }
      return endValue.valueOf() >= moment(startValue).add(30, 'y').valueOf() || endValue.valueOf() < moment(startValue).add(1, 'd').valueOf()
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    // 转让
    transfer(e) {
      this.is_transfer = e.target.checked
      // 重置转让费用的校验
      this.form.resetFields(['transferNum'])
    },
    // transfer validatorFn
    transfer_validator(rule, value, callback) {
      if (!this.is_transfer) {
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
    transfter_change(data) {
      this.transferNum = data
    },
    // moment
    moment,
    // 检验price
    validatePrice() {
      this.rallyPriceIsNoInput = false
      if (!this.priceValidateRuleText.length) {
        this.rallyPriceIsOk = false
      } else {
        this.rallyPriceIsOk = this.priceValidateRuleText.every(i => this.rules.number.test(i))
      }
    }
  },
  watch: {
    priceValidateStatus(newVal) {
      this.rallyPriceValidText = newVal === 'success' ? '' : '请输入正确的数值'
    },
    'transferUnit': {
      deep: true,
      handler() {
        this.form.resetFields(['transferNum'])
      }
    }
  },
  computed: {
    priceValidateStatus() {
      if (this.rallyPriceIsNoInput) {
        return 'success'
      } else {
        return this.rallyPriceIsOk ? 'success' : 'error'
      }
    },
    priceValidateRuleText() {
      let text = []
      this.rallyPriceList.forEach(i => {
        Object.keys(i).forEach(o => {
          if (o !== 'key' && o !== 'time') {
            text.push(i[o])
          } else if (o === 'time') {
            text.push(i[o].num)
          }
        })
      })
      return text
    },
    // 售卖渠道
    sellTypeList() {
      let sell_type = cloneDeep(Object.entries(this.member_card.sell_type.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
        })
      })
      if (!this.appConfig) {
        remove(arr, i => i.value === 1)
      }
      return arr
    }
  },
  components: {
    SelectShop
  }
}
</script>
