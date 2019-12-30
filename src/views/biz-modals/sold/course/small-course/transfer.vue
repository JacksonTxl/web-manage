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
              {{ info.course_name }}
            </st-info-item>
            <st-info-item label="到期日期">
              {{ moment(info.end_time * 1000).format('YYYY-MM-DD HH:mm') }}
            </st-info-item>
            <st-info-item label="实付金额">
              {{ info.pay_price }}
            </st-info-item>
            <st-info-item label="转让手续费" v-if="info.transfer_unit">
              {{ info.transfer_num
              }}{{
                info.transfer_unit | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item label="订单状态" v-if="info.order_status">
              {{ info.order_status | enumFilter('sold_common.order_status') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">
              {{ info.member_name }}
            </st-info-item>
            <template v-if="info.is_minors === COURSE_TYPE.FIXED_COURSE">
              <st-info-item label="家长手机号">
                {{ info.parent_mobile }}
              </st-info-item>
              <st-info-item label="家长姓名">
                {{ info.parent_name }}({{ info.parent_user_role }})
              </st-info-item>
            </template>
            <st-info-item label="手机号" v-else>
              {{ info.mobile }}
            </st-info-item>
            <st-info-item label="销售人员">
              {{ info.staff_name }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ info.order_id }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr class="mg-0" />
      <st-form :form="form" labelWidth="88px">
        <div :class="transfer('transfer')">
          <member-search :form="form" label="转让会员"></member-search>
          <st-form-item required>
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
          <st-form-item required>
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
          <st-form-item label="手续费">{{ poundage }}元</st-form-item>
          <st-form-item label="减免金额">
            <st-input-number
              :float="true"
              v-decorator="decorators.handling_fee_reduce"
              placeholder="请输入减免金额"
              :max="poundage"
            >
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" required>
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
import { COURSE_TYPE } from '@/constants/course/small-course'
export default {
  name: 'ModalSoldCourseSmallCourseTransfer',
  bem: {
    transfer: 'modal-sold-course-transfer'
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
    autoContractBtn,
    MemberSearch
  },
  props: ['id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      COURSE_TYPE,
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
    moment,
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
