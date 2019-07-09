<template>
  <st-modal
  title="交易签单"
  size="small"
  v-model="show"
  @cancel="onCancel"
  wrapClassName="modal-sold-deal-sale">
    <div :class="sale('content')">
      <a-row :class="sale('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item class="mg-b24" label="租赁计费">{{info.price}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="售卖群体" v-if="info.sale_range">{{info.sale_range.name}}</st-info-item>
            <st-info-item label="允许转让">{{info.is_transfer}}</st-info-item>
            <st-info-item class="mg-b24" label="转让手续费">{{info.transfer}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="85px">
        <div :class="sale('sale')">
          <st-form-item labelGutter="12px" v-show="searchMemberIsShow" label="购买会员" required>
            <a-select
              showSearch
              allowClear
              placeholder="输入手机号或会员名搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              v-decorator="['memberId',{rules:[{validator:member_id_validator}]}]"
              @search="onMemberSearch"
              @change="onMemberChange"
              notFoundContent="无搜索结果"
            >
              <a-select-option
              v-for="(item,index) in memberList"
              :value="item.member_id"
              :key="index">
                <span v-html="`${item.member_name} ${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                  {{item.member_name}} {{item.mobile}}
                </span>
              </a-select-option>
            </a-select>
            <p v-if="!memberList.length&&memberSearchText!==''&&+info.sale_range.type===1" class="add-text">查无此会员，<span @click="onAddMember">添加新会员？</span></p>
          </st-form-item>
          <st-form-item labelGutter="12px" v-show="!searchMemberIsShow" label="会员姓名" required>
            <a-input v-decorator="['memberName',{rules:[{validator:member_name_validator}]}]" placeholder="请输入会员姓名"></a-input>
          </st-form-item>
          <st-form-item labelGutter="12px" v-show="!searchMemberIsShow" label="手机号" required>
            <a-input v-decorator="['memberMobile',{rules:[{validator:member_mobile_validator}]}]" placeholder="请输入手机号"></a-input>
            <p class="add-text"><span @click="onCancelMember">取消添加</span></p>
          </st-form-item>
          <st-form-item v-if="cabinetList" labelGutter="12px" label="租赁柜号" required>
            <a-cascader
            v-decorator="['cabinet',{rules:[{validator:cabinet_validator}]}]"
            @change="onCabinetChange"
            :allowClear="false"
            :fieldNames="cabinetFieldNames"
            :options="cabinetList"
            placeholder="请选择租赁柜号" />
          </st-form-item>
          <st-form-item required class="mg-b0" labelGutter="12px" label="租赁时间">
            <div :class="sale('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 100%;"
                  v-model="startTime"
                  disabled
                  format="YYYY-MM-DD HH:mm"
                  placeholder="开始时间"
                  :showToday="false"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form">
                <a-date-picker
                  :allowClear="false"
                  :disabled="disabledCalendar"
                  v-decorator="['endTimePicker',{rules:[{validator:endtime_picker_validator}]}]"
                  @change="endTimeChange"
                  style="width:170px"
                  :showTime="{defaultValue:startTime,format: 'HH:mm'}"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="结束时间"
                  :showToday="false"
                />
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item required labelGutter="12px" label="租赁天数">
            <st-input-number
              :disabledDate="disabledCalendar"
              @change="onEndTimeInputChange"
              v-decorator="['endTimeInput',{rules:[{validator:endtime_input_validator}]}]"
              :max="999999">
              <template slot="addonAfter">天</template>
            </st-input-number>
          </st-form-item>
          <st-form-item labelGutter="12px" required>
            <template slot="label">
                合同编号<st-help-tooltip id="TSSD001" />
            </template>
            <div :class="sale('contract')">
              <a-input
              v-decorator="['contractNumber',{rules:[{validator:contract_number}]}]"
              placeholder="请输入合同编号"></a-input>
              <st-button class="create-button" @click="onCodeNumber" :loading="loading.getCodeNumber">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item labelGutter="12px" class="mgb-12" label="租赁费用">{{orderAmountPrice}}</st-form-item>
          <st-form-item labelGutter="12px" :class="sale('discounts')" label="定金抵扣">
            <div>
              <div :class="sale('discounts-total')">
                <span>{{advanceText}}</span>
                <a-dropdown
                v-model="advanceDropdownVisible"
                :disabled="advanceList.length===0"
                :class="sale({disabled:advanceList.length===0})"
                placement="bottomRight"
                :getPopupContainer="trigger => trigger.parentNode"
                :trigger="['click']">
                  <div :class="sale('discounts-promotion')">
                    <span>{{advanceList.length===0?'无定金':'定金选择'}}</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectAdvance" @change="onSelectAdvanceChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
                      <a-menu-item @click="onSelectAdvance">
                        <a-radio :value="-1">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item @click="onSelectAdvance" :key="index" v-for="(item,index) in advanceList">
                        <a-radio :value="item.id">定金 {{item.price}}</a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item>
          <st-form-item labelGutter="12px" label="减免金额">
            <st-input-number v-model="reduceAmount" :float="true" placeholder="请输入">
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item validateStatus="error" :help="orderAmountText" class="mg-b0" label="小计">
            <span class="total">{{currentPrice}}</span>
          </st-form-item>
        </div>
        <div :class="sale('remarks')">
          <st-form-item label="销售人员" required>
            <a-select
            v-decorator="['saleName',{rules:[{validator:sale_name}]}]"
            placeholder="选择签单的工作人员">
              <a-select-option
              v-for="(item,index) in saleList"
              :key="index"
              :value="item.id">{{item.staff_name}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea v-model="description" :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <div class="price">
          <span>{{currentPrice}}</span>
          <span>订单总额：{{orderAmountPrice}}</span>
        </div>
        <div class="button">
          <st-button @click="onCreateOrder" :loading="loading.setTransaction">创建订单</st-button>
          <st-button @click="onPay" :loading="loading.setTransactionPay" type="primary">立即支付</st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
import { SaleCabinetService } from './sale-cabinet.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { RuleConfig } from '@/constants/rule'
export default {
  name: 'ModalSoldDealSaleCabinet',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  serviceInject() {
    return {
      saleCabinetService: SaleCabinetService,
      rules: RuleConfig
    }
  },
  rxState() {
    return {
      loading: this.saleCabinetService.loading$,
      memberList: this.saleCabinetService.memberList$,
      saleList: this.saleCabinetService.saleList$,
      cabinetList: this.saleCabinetService.cabinetList$,
      info: this.saleCabinetService.info$,
      currentPrice: this.saleCabinetService.currentPrice$,
      orderAmountPrice: this.saleCabinetService.orderAmountPrice$
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    areaId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      // 搜索会员
      memberSearchText: '',
      searchMemberIsShow: true,
      // 租赁柜
      cabinetFieldNames: {
        label: 'name',
        value: 'id',
        children: 'cabinets'
      },
      cabinetId: '',
      // 租赁天数
      disabledCalendar: true,
      startTime: moment(),
      days: '',
      // 定金
      advanceDropdownVisible: false,
      advanceList: [],
      advanceText: '未选择定金',
      advanceAmount: '',
      selectAdvance: '',
      reduceAmount: null,
      description: ''
    }
  },
  created() {
    this.saleCabinetService.orderAmountPrice$.commit(() => 0)
    this.saleCabinetService.currentPrice$.commit(() => 0)
    this.saleCabinetService.init(this.id, this.areaId).subscribe(res => {
      this.startTime = cloneDeep(moment(res[0].info.start_time))
    })
  },
  computed: {
    // 租赁费用
    leaseFee() {
      if (!this.cabinetId || !this.days > 0) {
        return '无'
      } else {
        return `${this.info.price_num * this.days}元`
      }
    },
    // 小计
    orderAmount() {
      if (!this.cabinetId || !this.days > 0) {
        return '无'
      } else {
        return `${(this.info.price_num * this.days) - +this.reduceAmount - +this.advanceAmount}元`
      }
    },
    orderAmountText() {
      return this.orderAmount.split('元')[0] < 0 ? '小计不能为负' : ''
    }
  },
  watch: {
    days(newVal, oldVal) {
      this.getOrderPrice()
      this.getPrice(this.selectAdvance, +this.reduceAmount)
    },
    selectAdvance: {
      deep: true,
      handler(newVal, oldVal) {
        this.getPrice(newVal, +this.reduceAmount)
      }
    },
    reduceAmount(newVal, oldVal) {
      this.getPrice(this.selectAdvance, +newVal)
    }
  },
  methods: {
    member_id_validator(rule, value, callback) {
      if (!value && this.searchMemberIsShow) {
        // eslint-disable-next-line
        callback('请选择转让会员')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    member_name_validator(rule, value, callback) {
      if (!value && !this.searchMemberIsShow) {
        // eslint-disable-next-line
        callback('请输入会员姓名')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    member_mobile_validator(rule, value, callback) {
      if (!value && !this.searchMemberIsShow) {
        // eslint-disable-next-line
        callback('请输入手机号')
      } else if (value && !this.rules.mobile.test(value)) {
        // eslint-disable-next-line
        callback('输入的手机号格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.saleCabinetService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.saleCabinetService.getMember(data).subscribe(res => {
          if (!res.list.length) {
            this.resetAdvance()
            this.form.resetFields(['memberId'])
          }
        })
      }
    },
    onMemberChange(data) {
      if (!data) {
        this.resetAdvance()
      } else {
        this.saleCabinetService.getAdvanceList(data).subscribe(res => {
          this.advanceList = cloneDeep(res.list)
        })
      }
    },
    // 重置定金选择
    resetAdvance() {
      this.advanceList = []
      this.advanceText = '未选择定金'
      this.advanceAmount = ''
      this.selectAdvance = ''
    },
    // 切换添加会员
    onAddMember() {
      this.searchMemberIsShow = false
      this.form.resetFields(['memberId', 'memberName', 'memberMobile'])
      this.resetAdvance()
    },
    onCancelMember() {
      this.searchMemberIsShow = true
      this.form.resetFields(['memberId', 'memberName', 'memberMobile'])
    },
    // 租赁柜
    cabinet_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择租赁柜号')
        this.disabledCalendar = true
      } else {
        // eslint-disable-next-line
        callback()
        this.disabledCalendar = false
      }
    },
    onCabinetChange(data) {
      this.cabinetId = data[1]
      this.saleCabinetService.getInfo(data[1]).subscribe()
    },
    // 租赁时间
    disabledEndDate(endValue) {
      return endValue.valueOf() < this.startTime.valueOf() || endValue.valueOf() > moment().add(999, 'd').valueOf()
    },
    // end_time validatorFn
    endtime_picker_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择租赁时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    endtime_input_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入租赁天数')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 租赁时间-end
    endTimeChange(data) {
      this.form.setFieldsValue({
        endTimeInput: Math.ceil(data.diff(this.startTime, 'minutes') / (24 * 60))
      })
      this.days = Math.ceil(data.diff(this.startTime, 'minutes') / (24 * 60))
    },
    onEndTimeInputChange(data) {
      this.days = data
      let start = cloneDeep(this.startTime)
      if (data > 0) {
      // 有效天数
        this.form.setFieldsValue({
          endTimePicker: start.add(data, 'd')
        })
      } else {
      // 无效天数
        this.form.resetFields(['endTimePicker'])
      }
    },
    // 合同
    contract_number(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入合同编号')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    onCodeNumber() {
      this.saleCabinetService.getCodeNumber(this.info.contract_type).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    },
    moment,
    sale_name(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择销售人员')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    onSelectAdvance() {
      timer(200).subscribe(() => {
        this.advanceDropdownVisible = false
      })
    },
    onCancel() {
      this.saleCabinetService.memberList$.commit(() => [])
      this.resetAdvance()
    },
    onSelectAdvanceChange(data) {
      if (data.target.value === -1) {
        this.advanceAmount = ''
        this.advanceText = '未选择定金'
      }
      let price = this.advanceList.filter(o => o.id === data.target.value)[0].price
      this.advanceAmount = price
      this.advanceText = `${price}元`
    },
    // 获取当前价钱
    getPrice(advance, reduce) {
      this.saleCabinetService.currentPriceAction$.dispatch({
        product_id: this.cabinetId,
        product_type: this.info.contract_type,
        product_num: this.days,
        advance_id: advance || undefined,
        reduce_amount: reduce || undefined
      })
    },
    // 获取订单总额
    getOrderPrice() {
      this.saleCabinetService.orderAmountPriceAction$.dispatch({
        product_id: this.cabinetId,
        product_type: this.info.contract_type,
        product_num: this.days
      })
    },
    onCreateOrder() {
      this.form.validateFields((error, values) => {
        if (!error) {
          let reduce_amount = this.reduceAmount ? +this.reduceAmount : 0
          this.saleCabinetService.setTransaction({
            cabinet_id: +this.cabinetId,
            start_time: `${this.startTime.format('YYYY-MM-DD HH:mm')}`,
            end_time: `${values.endTimePicker.format('YYYY-MM-DD HH:mm')}`,
            lease_days: +this.days,
            contract_number: values.contractNumber,
            advance_id: this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            order_amount: `${this.orderAmount.split('元')[0]}`,
            member_id: +values.memberId,
            member_name: values.memberName,
            mobile: values.memberMobile,
            sale_id: +values.saleName,
            description: this.description,
            sale_range: +this.info.sale_range.type
          }).subscribe(res => {
            this.show = false
            this.$emit('success', {
              type: 'create',
              orderId: res.info.order_id
            })
          })
        }
      })
    },
    onPay() {
      this.form.validateFields((error, values) => {
        if (!error) {
          let reduce_amount = this.reduceAmount ? +this.reduceAmount : 0
          this.saleCabinetService.setTransactionPay({
            cabinet_id: +this.cabinetId,
            start_time: `${this.startTime.format('YYYY-MM-DD HH:mm')}`,
            end_time: `${values.endTimePicker.format('YYYY-MM-DD HH:mm')}`,
            lease_days: +this.days,
            contract_number: values.contractNumber,
            advance_id: this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            order_amount: `${this.orderAmount.split('元')[0]}`,
            member_id: +values.memberId,
            member_name: values.memberName,
            mobile: values.memberMobile,
            sale_id: +values.saleName,
            description: this.description,
            sale_range: +this.info.sale_range.type
          }).subscribe(res => {
            this.show = false
            this.$emit('success', {
              type: 'createPay',
              orderId: res.info.order_id
            })
          })
        }
      })
    }
  }
}
</script>
