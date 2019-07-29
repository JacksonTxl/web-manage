<template>
  <st-panel app class="page-shop-basic-card page-shop-add-number-card" initial>
    <div class="page-shop-basic-card-body">
      <div class="page-preview">
        <h5-container>
          <template v-slot:title>购卡</template>
          <template v-slot:default>
            <member-card :data="h5CardInfo" :cardType="1"></member-card>
          </template>
        </h5-container>
      </div>
      <div class="page-content">
        <st-form :form="form" labelWidth="118px">
          <a-row :gutter="8" class="page-content-card-line__row">
            <a-col :lg="16">
              <st-form-item class="page-content-card-line" label="次卡名称" required>
                <a-input
                  v-decorator="[
                  'card_name',
                  {rules: [{ validator: card_name_validator}]}
                ]"
                  maxlength="30"
                  style="width: 360px"
                  placeholder="请输入次卡名称"
                  @change="syncName"
                ></a-input>
              </st-form-item>
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
                  <st-form-table>
                     <colgroup>
                      <col style="width:18%;">
                      <col style="width:18%;">
                      <col style="width:18%;">
                      <col style="width:18%;">
                      <col style="width:18%;">
                      <col style="width:10%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th>入场次数</th>
                        <th>售价</th>
                        <th>有效期</th>
                        <th class="white-nowrap">允许冻结天数</th>
                        <th>赠送上限</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="6" class="pd-y0 pd-x0">
                          <st-button :disabled="rallyPriceList.length>3" type="dashed" icon="add" class="page-price-setting-set__add" block @click="price_add">添加定价规格（{{rallyPriceList.length}}/4）</st-button>
                        </td>
                      </tr>
                      <tr v-for="(item,index) in rallyPriceList" :key="`${index}brand`" >
                        <td>
                          <st-input-number :min="1" :max="99999" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'validity_times'})">
                            <span slot="addonAfter">次</span>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number :float="true" :min="0" :max="999999.9" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'rally_price'})">
                            <span slot="addonAfter">元</span>
                          </st-input-number>
                        </td>
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
                          <st-input-number :min="1" :max="99999" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'frozen_day'})">
                            <span slot="addonAfter">天</span>
                          </st-input-number>
                        </td>
                        <td>
                          <st-input-number :min="1" :max="99999" @change="e => brandPriceSettingHandleChange({value:e, key:index,col:'gift_unit'})">
                            <span slot="addonAfter">次</span>
                          </st-input-number>
                        </td>
                        <td>
                          <a @click="price_delete(index)">删除</a>
                        </td>
                      </tr>
                    </tbody>
                  </st-form-table>
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
                    :disabledDate="disabledStartDate"
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
                  <a-checkbox class="page-checkbox" @change="transfer">支持转让</a-checkbox>
                  <st-input-number
                  style="width:200px"
                  v-decorator="['transferNum',{rules:[{validator:transfer_validator}]}]"
                  class="page-input-group"
                  :float="transferUnit===2"
                  @change="transfter_change"
                  :disabled="!is_transfer"
                  :min="transferMin" :max="transferMax">
                    <a-select slot="addonAfter" v-model="transferUnit" :disabled="!is_transfer">
                      <a-select-option v-for="item in Object.entries(member_card.unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                    </a-select>
                  </st-input-number>
                  <!-- <a-input-group compact class="page-input-group">
                    <a-input-number
                    v-decorator="['transferNum',{rules:[{validator:transfer_validator}]}]"
                    @change="transfter_change"
                    :disabled="!is_transfer"/>
                    <a-select v-model="transferUnit" defaultValue="2" :disabled="!is_transfer">
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
              <st-form-item class="page-content-card-bg" label="卡背景" required :help="cardBgValidatorText">
                <st-card-bg-radio @change="onCardBgChange" v-model="cardBg" />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-introduction " label="会员卡介绍">
                <st-textarea
                v-model="cardIntroduction"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入"
                />
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="22">
              <st-form-item class="page-content-card-contents " label="备注">
                <st-textarea
                v-model="cardContents"
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
import { cloneDeep, remove } from 'lodash-es'
import { AddService } from './add.service'
import MemberCard from '@/views/biz-components/h5/pages/member-card'
import H5Container from '@/views/biz-components/h5/h5-container'
import h5mixin from '../period/h5mixin'
export default {
  name: 'PageShopNumberCardAdd',
  mixins: [h5mixin],
  components: {
    MemberCard,
    H5Container
  },
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
      member_card: this.userService.memberCardEnums$
    }
  },
  bem: {
    b: 'st-help-popover'
  },
  data() {
    return {
      cardType: 1,
      form: this.$form.createForm(this),
      // 结束时间面板是否显示
      endOpen: false,
      // 价格梯度
      rallyPriceList: [],
      // 价格检验是否通过
      rallyPriceIsOk: true,
      // 价格是否未输入过
      rallyPriceIsNoInput: true,
      // 价格校验文案
      rallyPriceValidText: '',
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
      // 售卖时间
      start_time: null,
      end_time: null,
      // 是否支持转让
      is_transfer: false,
      // 转让单位
      transferUnit: 2,
      // 转让手续费
      transferNum: 0,
      // 售卖方式
      sellType: [2],
      // 卡背景
      cardBg: {
        image_id: 0,
        image_key: this.member_card.card_bg_list.value[0].image_key,
        image_url: '',
        index: 1
      },
      // 卡背景的help文本
      cardBgValidatorText: '',
      // 卡介绍
      cardIntroduction: '',
      // 备注
      cardContents: '',
      // 是否配置了用户端
      appConfig: true
    }
  },
  methods: {
    // 保存
    onHandleSubmit(e) {
      this.form.validateFieldsAndScroll((err, values) => {
        this.validatePrice()
        this.cardBgValidator()
        if (!err && this.priceValidateStatus === 'success' && this.cardBgIsOk) {
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
            start_time: `${this.start_time.format('YYYY-MM-DD')}`,
            end_time: `${this.end_time.format('YYYY-MM-DD')}`,
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
        return startValue.valueOf() < moment().startOf('day').valueOf()
      }
      let start = endValue.valueOf() > moment().add(30, 'y').valueOf() ? moment(endValue).subtract(30, 'y').valueOf() : moment().startOf('day').valueOf()
      return startValue.valueOf() < start || startValue.valueOf() > moment(endValue).valueOf()
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
        return endValue.valueOf() < moment().startOf('day').valueOf()
      }
      return endValue.valueOf() >= moment(startValue).add(30, 'y').valueOf() || endValue.valueOf() < moment(startValue).valueOf() || endValue.valueOf() < moment().startOf('day').valueOf()
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
    },
    onCardBgChange(e) {
      this.cardBgValidatorText = ''
    },
    // 卡背景校验
    cardBgValidator() {
      let validata = this.cardBg.image_key !== ''
      this.cardBgValidatorText = validata ? '' : '请上传卡背景'
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
    // 售卖方式
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
      return this.transferUnit === 1 ? 100 : 999999.9
    }
  }
}
</script>
