<template>
  <st-modal
    title="转让"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-lease-transfer"
  >
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">
              {{ info.product_name }}
            </st-info-item>
            <st-info-item label="剩余天数">{{ info.remain_days }}</st-info-item>
            <st-info-item label="租赁天数">{{ info.lease_days }}</st-info-item>
            <st-info-item label="实付金额">{{ info.pay_price }}</st-info-item>
            <st-info-item label="销售人员">{{ info.staff_name }}</st-info-item>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">{{ info.member_name }}</st-info-item>
            <template v-if="info.is_minors === PERSON_TYPE.CHILD">
              <st-info-item label="家长手机号">
                {{ info.parent_mobile }}
              </st-info-item>
              <st-info-item label="家长姓名">
                {{ info.parent_name }}
              </st-info-item>
            </template>
            <st-info-item label="手机号" v-else>
              {{ info.mobile }}
            </st-info-item>
            <st-info-item label="起租日期">{{ info.start_time }}</st-info-item>
            <st-info-item label="到期日期">{{ info.end_time }}</st-info-item>
            <st-info-item label="订单状态" v-if="info.order_status">
              {{ info.order_status | enumFilter('sold_common.order_status') }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr class="mg-0" />
      <st-form :form="form" labelWidth="88px">
        <div :class="transfer('transfer')">
          <member-search
            v-if="info.sale_range"
            labelGutter="12px"
            :form="form"
            :saleRangeType="info.sale_range.type"
            label="转让会员"
          ></member-search>
          <st-form-item label="剩余价值" required labelGutter="12px">
            <template slot="label">
              剩余价值
              <st-help-tooltip id="TSMC004" />
            </template>
            <st-input-number
              :max="+info.pay_price"
              :float="true"
              placeholder="请输入剩余价值"
              v-decorator="decorators.remainPrice"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="合同编号" required labelGutter="12px">
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
          <st-form-item label="手续费" labelGutter="12px" type="text">
            {{ info.transfer_num }}元
          </st-form-item>
          <st-form-item label="减免金额" labelGutter="12px">
            <st-input-number
              :float="true"
              v-decorator="decorators.handling_fee_reduce"
              placeholder="请输入减免金额"
              :max="info.transfer_num"
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
        :loading="loading.setTransaction"
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
export default {
  name: 'ModalSoldLeaseTransfer',
  bem: {
    transfer: 'modal-sold-lease-transfer'
  },
  components: {
    autoContractBtn,
    MemberSearch
  },
  serviceProviders() {
    return [TransferService]
  },
  serviceInject() {
    return {
      userService: UserService,
      transferService: TransferService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.transferService.loading$,
      info: this.transferService.info$,
      payList: this.transferService.payList$
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
      show: false
    }
  },
  created() {
    this.transferService.getDetail(this.id, this.type).subscribe()
  },
  computed: {
    member_id() {
      return this.info.member_id
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.transferService
          .setTransaction(
            {
              id: this.id,
              transferee_member_id: +values.member_id,
              member_name: values.member_name,
              mobile: values.mobile ? values.mobile.phone : undefined,
              sale_range: this.info.sale_range.type,
              remain_amount: values.remainPrice,
              contract_number: values.contractNumber,
              pay_channel: +values.payType,
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
    onCodeNumber() {
      this.transferService
        .getCodeNumber(this.info.contract_type)
        .subscribe(res => {
          this.form.setFieldsValue({
            contractNumber: res.info.code
          })
        })
    }
  }
}
</script>
