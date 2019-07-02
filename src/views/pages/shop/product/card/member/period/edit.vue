<template>
  <st-panel app class="page-shop-basic-card page-shop-edit-period-card" initial>
    <div class="page-shop-basic-card-body">
      <!-- <div class="page-preview">实时预览{{member_card}}</div> -->
      <div class="page-content">
        <st-form :form="form" labelWidth="118px">
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="16">
              <p class="page-content-card__card__name">
                <st-tag type="period-card"/>
                <span>{{cardInfo.card_name}}</span>
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="mg-b16" label="支持入场门店">{{shopName.name}}</st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item class="page-content-card-price-setting" label="价格设置" required :help="rallyPriceValidText">
                <div class="page-price-setting-set" :class="{'page-price-setting-set-error':priceValidateStatus==='error'}">
                  <a-table
                    size="middle"
                    :columns="priceColumns"
                    :dataSource="rallyPriceList"
                    rowKey="key"
                    :pagination="false"
                  >
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
                    <template slot="rally_price" slot-scope="text, record, index">
                        <a-input :value="text" @change="e => brandPriceSettingHandleChange({value:e.target.value, key:index,col:'rally_price'})">
                          <span slot="suffix">元</span>
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
                  <st-button :disabled="rallyPriceList.length>3" type="dashed" class="page-price-setting-set__add" block @click="brand_price_add">+ 添加定价规格（{{rallyPriceList.length}}/4）</st-button>
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
                    v-decorator="['start_time',{rules:[{required: true,message: '请选择开始售卖时间'}]}]"
                    format="YYYY-MM-DD"
                    placeholder="开始时间"
                    :showToday="false"
                    @openChange="handleStartOpenChange"
                    @change="start_time_change"
                  />
                </a-form-item>
                &nbsp;~&nbsp;
                <a-form-item class="page-a-form">
                  <a-date-picker
                    :disabledDate="disabledEndDate"
                    v-decorator="['end_time',{rules:[{required: true,message: '请选择结束售卖时间'}]}]"
                    format="YYYY-MM-DD"
                    placeholder="结束时间"
                    :showToday="false"
                    :open="endOpen"
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
                  <a-checkbox class="page-checkbox" :checked="is_transfer" @change="transfer">支持转让</a-checkbox>
                  <a-input-group compact class="page-input-group">
                    <a-input-number
                    v-decorator="['transferNum',{rules:[{validator:transfer_validator}]}]"
                    @change="transfter_change"
                    :disabled="!is_transfer"/>
                    <a-select v-model="transferUnit" defaultValue="2" :disabled="!is_transfer">
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
                <a-checkbox-group v-model="sellType">
                  <a-checkbox
                  v-for="item in sellTypeList"
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
                <st-card-bg-radio v-model="cardBg" />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-introduction " label="会员卡介绍">
                <a-textarea
                v-model="cardIntroduction"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入"
                :rows="4"/>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-contents " label="备注">
                <a-textarea
                v-model="cardContents"
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
                <st-button :loading="loading.editCard" type="primary" @click="onHandleSubmit">保 存</st-button>
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
export default {
  name: 'PageShopPeriodCardAdd',
  serviceInject() {
    return {
      rules: RuleConfig,
      editService: EditService,
      userService: UserService
    }
  },
  rxState() {
    return {
      cardInfo: this.editService.cardInfo$,
      loading: this.editService.loading$,
      shopName: this.userService.shop$,
      member_card: this.userService.memberCardEnums$
    }
  },
  bem: {
    b: 'st-help-popover'
  },
  data() {
    return {
      form: this.$form.createForm(this),
      // 结束时间面板是否显示
      endOpen: false,
      priceColumns: [
        {
          title: '期限',
          scopedSlots: { customRender: 'time' },
          dataIndex: 'time'
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
      startTime: null,
      endTime: null,
      // 是否支持转让
      is_transfer: false,
      // 转让单位
      transferUnit: 2,
      // 转让手续费
      transferNum: 0,
      transfer_unit_is_first: true,
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
  mounted() {
    this.init()
  },
  methods: {
    // init
    init() {
      // 价格设置
      this.cardInfo.price_gradient.forEach(i => {
        this.rallyPriceList.push({
          key: i.id,
          time: {
            unit: +i.unit,
            num: +i.num
          },
          rally_price: +i.rally_price,
          frozen_day: +i.frozen_day,
          gift_unit: +i.gift_unit
        })
      })
      // 支持售卖时间
      this.form.setFieldsValue({
        'start_time': moment(this.cardInfo.start_time * 1000),
        'end_time': moment(this.cardInfo.end_time * 1000),
        'transferNum': this.cardInfo.transfer_num
      })
      this.startTime = moment(this.cardInfo.start_time * 1000)
      this.endTime = moment(this.cardInfo.end_time * 1000)
      // 转让设置
      this.is_transfer = !!this.cardInfo.is_transfer
      this.transferUnit = this.cardInfo.transfer_unit
      this.transferNum = this.cardInfo.transfer_num
      // 售卖渠道
      this.sellType = this.cardInfo.sell_type
      // 卡背景
      this.cardBg = cloneDeep(this.cardInfo.card_bg)
      // 卡介绍
      this.cardIntroduction = this.cardInfo.card_introduction
      // 卡备注
      this.cardContents = this.cardInfo.card_contents
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
              unit: i.time.unit,
              num: i.time.num,
              rally_price: i.rally_price,
              frozen_day: i.frozen_day,
              gift_unit: i.gift_unit
            })
          })
          this.editService.editCard({
            id: this.cardInfo.card_id,
            card_type: 2,
            card_name: values.card_name,
            start_time: `${this.startTime.format('YYYY-MM-DD')}`,
            end_time: `${this.endTime.format('YYYY-MM-DD')}`,
            is_transfer: +this.is_transfer,
            unit,
            num,
            sell_type: this.sellType,
            card_introduction: this.cardIntroduction,
            card_contents: this.cardContents,
            card_bg: this.cardBg,
            price_gradient
          }).subscribe(res => {
            // 编辑成功
            this.$router.push({
              name: 'shop-product-card-member-list-all'
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
    brand_price_delete(index) {
      this.rallyPriceList.splice(index, 1)
    },
    // 增加价格
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
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    start_time_change(data) {
      this.startTime = cloneDeep(data)
    },
    // 结束时间
    disabledEndDate(endValue) {
      const startValue = this.startTime
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
      this.endTime = cloneDeep(data)
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
        if (!this.transfer_unit_is_first) {
          this.form.resetFields(['transferNum'])
        }
        this.transfer_unit_is_first = false
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
  }
}
</script>
