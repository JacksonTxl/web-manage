<template>
  <st-modal
    title="转让"
    v-model="show"
    wrapClassName="modal-sold-card-transfer"
  >
    <div :class="transfer('content')">
      <a-row :class="transfer('info')" v-if="isDeposit">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">
              {{ depositTransferInfo.card_name }}
            </st-info-item>
            <st-info-item label="剩余金额">
              {{ depositTransferInfo.now_amount }}
            </st-info-item>
            <st-info-item label="储值金额">
              {{ depositTransferInfo.init_amount }}
            </st-info-item>
            <st-info-item label="实付金额">
              {{ depositTransferInfo.pay_price }}
            </st-info-item>
            <st-info-item label="到期日期">
              {{ depositTransferInfo.end_time }}
            </st-info-item>
            <st-info-item label="销售人员">
              {{ depositTransferInfo.staff_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">
              {{ depositTransferInfo.member_name }}
            </st-info-item>
            <template
              v-if="depositTransferInfo.is_minors === PERSON_TYPE.CHILD"
            >
              <st-info-item label="家长手机号">
                {{ depositTransferInfo.parent_mobile }}
              </st-info-item>
              <st-info-item label="家长姓名">
                {{ depositTransferInfo.parent_name }}
              </st-info-item>
            </template>
            <st-info-item label="手机号" v-else>
              {{ depositTransferInfo.mobile }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ depositTransferInfo.order_id }}
            </st-info-item>
            <st-info-item
              label="订单状态"
              v-if="depositTransferInfo.order_status"
            >
              {{
                depositTransferInfo.order_status
                  | enumFilter('sold_common.order_status')
              }}
            </st-info-item>
            <st-info-item
              label="转让手续费"
              v-if="depositTransferInfo.transfer_unit"
            >
              {{ depositTransferInfo.transfer_num
              }}{{
                depositTransferInfo.transfer_unit
                  | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <a-row :class="transfer('info')" v-if="isMember">
        <a-col :span="13">
          <st-info>
            <st-info-item label="卡名">
              {{ memberTransferInfo.card_name }}
            </st-info-item>
            <st-info-item label="卡成员" v-if="isFamilyCard">
              {{ memberTransferInfo.card_member }}
            </st-info-item>
            <st-info-item label="当前额度">
              {{ memberTransferInfo.remain_amount }}
            </st-info-item>
            <st-info-item label="初始额度">
              {{ memberTransferInfo.init_amount }}
            </st-info-item>
            <st-info-item label="优惠赠送">
              {{ memberTransferInfo.gift_amount }}
            </st-info-item>
            <st-info-item label="实付金额">
              {{ memberTransferInfo.pay_price }}
            </st-info-item>
            <st-info-item label="到期日期">
              {{ memberTransferInfo.end_time }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">
              {{ memberTransferInfo.member_name }}
            </st-info-item>

            <template v-if="memberTransferInfo.is_minors === PERSON_TYPE.CHILD">
              <st-info-item label="家长手机号">
                {{ memberTransferInfo.parent_mobile }}
              </st-info-item>
              <st-info-item label="家长姓名">
                {{ memberTransferInfo.parent_name }}
              </st-info-item>
            </template>
            <st-info-item label="手机号" v-else>
              {{ memberTransferInfo.mobile }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ memberTransferInfo.order_id }}
            </st-info-item>
            <st-info-item
              label="订单状态"
              v-if="memberTransferInfo.order_status"
            >
              {{
                memberTransferInfo.order_status
                  | enumFilter('sold_common.order_status')
              }}
            </st-info-item>
            <st-info-item
              label="转让手续费"
              v-if="memberTransferInfo.transfer_unit"
            >
              {{ memberTransferInfo.transfer_num
              }}{{
                memberTransferInfo.transfer_unit
                  | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item label="销售人员">
              {{ memberTransferInfo.staff_name }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr class="mg-0" />
      <st-form :form="form" labelWidth="88px" enctype="multipart/form-data">
        <div :class="transfer('transfer')">
          <member-search
            :saleRangeType="2"
            labelGutter="12px"
            :form="form"
            type="transfer"
          ></member-search>
          <st-form-item
            v-if="isMember"
            class="mg-b0"
            label="有效时间"
            required
            labelGutter="12px"
          >
            <div :class="transfer('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  v-decorator="decorators.startTime"
                  @change="onStartTimeChange"
                  :showTime="{ format: 'HH:mm' }"
                  style="width: 100%;"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="开始时间"
                  :allowClear="false"
                  :showToday="false"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form">
                <a-date-picker
                  disabled
                  :value="endTime"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="结束时间"
                  :showToday="false"
                />
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item required labelGutter="12px">
            <template slot="label">
              剩余价值
              <st-help-tooltip id="TSMC004" />
            </template>
            <st-input-number
              :max="+depositTransferInfo.pay_price"
              :float="true"
              placeholder="请输入剩余价值"
              v-decorator="decorators.remainPrice"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item required labelGutter="12px">
            <template slot="label">
              合同编号
              <st-help-tooltip id="TSSD001" />
            </template>
            <div :class="transfer('contract')">
              <a-input
                v-decorator="decorators.contractNumber"
                placeholder="请输入合同编号"
              ></a-input>
              <auto-contract-btn
                class="create-button"
                @click="onCodeNumber"
                :loading="loading.getCodeNumber"
              ></auto-contract-btn>
            </div>
          </st-form-item>
          <st-form-item
            label="手续费"
            labelGutter="12px"
            v-if="isDeposit"
            type="text"
          >
            {{ depositTransferInfo.poundage }}元
          </st-form-item>
          <st-form-item
            label="手续费"
            labelGutter="12px"
            v-if="isMember"
            type="text"
          >
            {{ memberTransferInfo.poundage }}元
          </st-form-item>
          <st-form-item label="减免金额" labelGutter="12px">
            <st-input-number
              float
              v-decorator="decorators.handling_fee_reduce"
              placeholder="请输入减免金额"
              :max="reduceMax"
            >
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" required labelGutter="12px">
            <a-select
              v-decorator="decorators.payType"
              placeholder="选择支付方式"
            >
              <a-select-option
                v-for="(item, index) in payList"
                :key="index"
                :value="+item.payment_type"
              >
                {{ item.payment_type_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button
        @click="onSubmit"
        :loading="loading.editCardTransfer"
        type="primary"
      >
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { TransferService } from './transfer.service'
import { UserService } from '@/services/user.service'
import { cloneDeep } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './transfer.config'
import autoContractBtn from '@/views/biz-components/contract/auto-contract-btn.vue'
import MemberSearch from '@/views/biz-components/member-search/member-search'
import { PERSON_TYPE } from '@/constants/course/small-course'
import moment from 'moment'
export default {
  name: 'ModalSoldCardTransfer',
  components: {
    autoContractBtn,
    MemberSearch
  },
  bem: {
    transfer: 'modal-sold-card-transfer'
  },
  serviceProviders() {
    return [TransferService]
  },
  serviceInject() {
    return {
      transferService: TransferService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.transferService.loading$,
      depositTransferInfo: this.transferService.depositTransferInfo$,
      memberTransferInfo: this.transferService.memberTransferInfo$,
      timeScope: this.transferService.timeScope$,
      payList: this.transferService.payList$
    }
  },
  computed: {
    moment,
    member_id() {
      return this.memberTransferInfo.member_id
    },
    isDeposit() {
      return this.type === 'deposit'
    },
    isMember() {
      return this.type === 'member'
    },
    saleRange() {
      return (
        this.depositTransferInfo.sale_range ||
        this.memberTransferInfo.sale_range ||
        {}
      )
    },
    isFamilyCard() {
      return this.memberTransferInfo.card_number_type === 2
    },
    reduceMax() {
      return this.isMember
        ? this.memberTransferInfo.poundage
        : this.depositTransferInfo.poundage
    }
  },
  props: ['id', 'type'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      PERSON_TYPE,
      form,
      decorators,
      show: false,
      // 转让信息
      transferData: {
        member_id: null,
        member_name: '',
        mobile: '',
        remain_price: null,
        contract_number: '',
        handling_fee: null,
        frozen_pay_type: null
      },
      endTime: moment()
    }
  },
  created() {
    this.transferService.getTransferInfo(this.id, this.type).subscribe(res => {
      if (this.isMember) {
        this.endTime = moment(this.memberTransferInfo.end_time)
      }
    })
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        let sold_type = this.isDeposit
          ? this.depositTransferInfo.contract_type
          : this.isMember
          ? this.memberTransferInfo.contract_type
          : '1'

        let start_time = this.isMember
          ? values.startTime.format('YYYY-MM-DD HH:mm')
          : null
        this.transferService
          .editCardTransfer(
            {
              start_time,
              transferee_member_id: +values.member_id,
              member_name: values.member_name,
              mobile: values.mobile ? values.mobile.phone : undefined,
              country_prefix: values.mobile ? values.mobile.code_id : undefined,
              remain_price: +values.remainPrice,
              contract_number: values.contractNumber,
              pay_channel: +values.payType,
              contract_type: +sold_type,
              handling_fee_reduce: values.handling_fee_reduce,
              is_minors: values.is_minors,
              parent_name: values.parent_name,
              parent_mobile: values.parent_mobile
                ? values.parent_mobile.phone
                : undefined,
              parent_country_prefix: values.parent_mobile
                ? values.parent_mobile.code_id
                : undefined,
              parent_user_role: values.parent_user_role
            },
            this.id,
            this.type
          )
          .subscribe(res => {
            this.$emit('success')
            this.show = false
          })
      })
    },
    // time
    disabledStartDate(startValue) {
      return (
        startValue.valueOf() <
          moment()
            .subtract(1, 'd')
            .valueOf() ||
        startValue.valueOf() >
          moment()
            .add(31, 'd')
            .valueOf()
      )
    },
    onStartTimeChange(data) {
      this.endTime = cloneDeep(moment(data.valueOf() + this.timeScope))
    },
    onCodeNumber() {
      let sold_type = this.isDeposit
        ? this.depositTransferInfo.contract_type
        : this.isMember
        ? this.memberTransferInfo.contract_type
        : '1'
      this.transferService.getCodeNumber(`${sold_type}`).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    }
  }
}
</script>
