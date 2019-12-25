<template>
  <st-modal
    title="转让"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-course-transfer"
  >
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="课程名称">
              {{ packageTransferInfo.course_name }}
            </st-info-item>
            <st-info-item label="到期日期">
              {{
                moment(packageTransferInfo.course_end_time * 1000).format(
                  'YYYY-MM-DD HH:mm'
                )
              }}
            </st-info-item>
            <st-info-item label="实付金额">
              {{ packageTransferInfo.pay_price }}
            </st-info-item>
            <st-info-item
              label="转让手续费"
              v-if="packageTransferInfo.transfer_unit"
            >
              {{ packageTransferInfo.transfer_num
              }}{{
                packageTransferInfo.transfer_unit
                  | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item
              label="订单状态"
              v-if="packageTransferInfo.order_status"
            >
              {{
                packageTransferInfo.order_status
                  | enumFilter('sold_common.order_status')
              }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">
              {{ packageTransferInfo.member_name }}
            </st-info-item>
            <st-info-item label="手机号">
              {{ packageTransferInfo.mobile }}
            </st-info-item>
            <st-info-item label="销售人员">
              {{ packageTransferInfo.staff_name }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ packageTransferInfo.order_id }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr class="mg-0" />
      <st-form :form="form" labelWidth="88px">
        <div :class="transfer('transfer')">
          <member-search :form="form" label="转让会员"></member-search>
          <st-form-item required labelGutter="12px">
            <template slot="label">
              剩余价值
              <st-help-tooltip id="TSMC004" />
            </template>
            <st-input-number
              :max="99999.9"
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
              >
                自动生成
              </auto-contract-btn>
            </div>
          </st-form-item>
          <st-form-item label="手续费" labelGutter="12px">
            {{ poundage }}元
          </st-form-item>
          <st-form-item label="减免金额" labelGutter="12px">
            <st-input-number
              :float="true"
              v-decorator="decorators.handling_fee_reduce"
              placeholder="请输入减免金额"
              :max="poundage"
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
                v-for="(item, index) in memberPaymentlist"
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
        :loading="loading.editCourseTransfer"
        type="primary"
      >
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { TransferService } from './transfer.service'
import { cloneDeep, get } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
import { OPERATION_TYPES } from '@/constants/sold/operations'
import { ruleOptions } from './transfer.config'
import autoContractBtn from '@/views/biz-components/contract/auto-contract-btn.vue'
import MemberSearch from '@/views/biz-components/member-search/member-search'
export default {
  name: 'ModalSoldCourseSmallCourseTransfer',
  bem: {
    transfer: 'modal-sold-course-small-course-transfer'
  },
  components: {
    autoContractBtn
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
      info: this.transferService.info$,
      memberPaymentlist: this.transferService.memberPaymentlist$
    }
  },
  components: {
    MemberSearch
  },
  props: ['id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      OPERATION_TYPES,
      show: false,
      poundage: ''
    }
  },
  created() {
    this.transferService.getCourseInfo(this.id).subscribe(res => {
      this.poundage = this.info.poundage
      this.transferService
        .getMemberPaymentList({
          member_id: get(res, 'info.member_id'),
          product_type: 7,
          operation_type: OPERATION_TYPES.TRANSFORM
        })
        .subscribe()
    })
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.transferService
          .editCourseTransfer(
            {
              member_id: values.member_id,
              member_name: values.member_name,
              mobile: values.mobile ? values.mobile.phone : undefined,
              country_prefix: values.mobile ? values.mobile.code_id : undefined,
              remain_price: +values.remainPrice,
              contract_number: values.contractNumber,
              frozen_pay_type: +values.payType,
              sold_type: this.info.sold_type,
              handling_fee: this.poundage,
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
            this.id
          )
          .subscribe(res => {
            this.$emit('success')
            this.show = false
          })
      })
    },
    onCodeNumber() {
      this.transferService.getCodeNumber(this.info.sold_type).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    }
  }
}
</script>
