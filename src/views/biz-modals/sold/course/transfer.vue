<template>
  <st-modal
    title="转让"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-course-transfer"
  >
    <div :class="transfer('content')">
      <a-row :class="transfer('info')" v-if="isPackage">
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
            <template
              v-if="packageTransferInfo.is_minors === PERSON_TYPE.CHILD"
            >
              <st-info-item label="家长手机号">
                {{ packageTransferInfo.parent_mobile }}
              </st-info-item>
              <st-info-item label="家长姓名">
                {{ packageTransferInfo.parent_name }}
              </st-info-item>
            </template>
            <st-info-item label="手机号" v-else>
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
      <a-row :class="transfer('info')" class="personal" v-if="isPersonal">
        <a-col :span="13">
          <st-info>
            <st-info-item label="课程名称">
              {{ personalCourseInfo.course_name }}
            </st-info-item>
            <st-info-item label="剩余课时">
              {{ personalCourseInfo.remain_course_num }}
            </st-info-item>
            <st-info-item label="购买课时">
              {{ personalCourseInfo.init_course_num }}
            </st-info-item>
            <st-info-item label="到期日期">
              {{
                moment(personalCourseInfo.end_time * 1000).format(
                  'YYYY-MM-DD HH:mm'
                )
              }}
            </st-info-item>
            <st-info-item label="实付金额">
              {{ personalCourseInfo.pay_price }}
            </st-info-item>
            <st-info-item label="销售人员">
              {{ personalCourseInfo.staff_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名">
              {{ personalCourseInfo.member_name }}
            </st-info-item>
            <template v-if="personalCourseInfo.is_minors === PERSON_TYPE.CHILD">
              <st-info-item label="家长手机号">
                {{ personalCourseInfo.parent_mobile }}
              </st-info-item>
              <st-info-item label="家长姓名">
                {{ personalCourseInfo.parent_name }}
              </st-info-item>
            </template>
            <st-info-item label="手机号" v-else>
              {{ personalCourseInfo.mobile }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ personalCourseInfo.order_id }}
            </st-info-item>
            <st-info-item
              label="订单状态"
              v-if="personalCourseInfo.order_status"
            >
              {{
                personalCourseInfo.order_status
                  | enumFilter('sold_common.order_status')
              }}
            </st-info-item>
            <st-info-item
              label="转让手续费"
              v-if="personalCourseInfo.transfer_unit"
            >
              {{ personalCourseInfo.transfer_num
              }}{{
                personalCourseInfo.transfer_unit
                  | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form-table :class="transfer('table')" v-if="isPackage">
        <colgroup>
          <col style="width:5%;" />
          <col style="width:30%;" />
          <col style="width:30%;" />
          <col style="width:30%;" />
          <col style="width:5%;" />
        </colgroup>
        <thead>
          <tr class="table-header">
            <th></th>
            <th>课程名称</th>
            <th>购买课时</th>
            <th>剩余课时</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table-item"
            v-for="(item, index) in packageCourseInfo"
            :key="index"
          >
            <td></td>
            <td>{{ item.course_name }}</td>
            <td>{{ item.course_num_init }}</td>
            <td>{{ item.course_num_remain }}</td>
            <td></td>
          </tr>
        </tbody>
      </st-form-table>
      <st-hr class="mg-0" />
      <st-form :form="form" labelWidth="88px">
        <div :class="transfer('transfer')">
          <member-search
            labelGutter="12px"
            :form="form"
            :saleRangeType="isCanAddNewMember"
          ></member-search>
          <!-- <st-form-item class="mg-b0" label="有效时间" required labelGutter="12px">
            <div :class="transfer('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  v-decorator="['startTime',{rules:[{validator:start_time_validator}]}]"
                  @change="onStartTimeChange"
                  :showTime="{format: 'HH:mm'}"
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
          </st-form-item> -->
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
import { PERSON_TYPE } from '@/constants/course/small-course'
export default {
  name: 'ModalSoldCourseTransfer',
  bem: {
    transfer: 'modal-sold-course-transfer'
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
      transferService: TransferService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.transferService.loading$,
      packageCourseInfo: this.transferService.packageCourseInfo$,
      packageTransferInfo: this.transferService.packageTransferInfo$,
      timeScope: this.transferService.timeScope$,
      personalCourseInfo: this.transferService.personalCourseInfo$,
      memberPaymentlist: this.transferService.memberPaymentlist$
    }
  },
  computed: {
    isPackage() {
      return this.type === 'package'
    },
    isPersonal() {
      return this.type === 'personal'
    },
    isCanAddNewMember() {
      if (this.isPackage) {
        return this.packageTransferInfo.can_add_member === 1 ? 1 : 2
      }
      if (this.isPersonal) {
        return this.personalCourseInfo.can_add_member === 1 ? 1 : 2
      }
      return 2
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
      OPERATION_TYPES,
      show: false,
      // 转让信息
      transferData: {
        member_id: null,
        member_name: '',
        mobile: '',
        start_time: '',
        remain_price: null,
        contract_number: '',
        handling_fee: null,
        frozen_pay_type: null
      },
      endTime: moment(),
      poundage: '',
      isSelectMember: false
    }
  },
  created() {
    this.transferService.getCourseInfo(this.id, this.type).subscribe(res => {
      if (this.isPackage) {
        this.endTime = moment(this.packageTransferInfo.course_end_time * 1000)
        this.poundage = this.packageTransferInfo.poundage
        this.transferService
          .getMemberPaymentList({
            member_id: get(res, 'info.transfer_info.member_id'),
            product_type: 4,
            operation_type: OPERATION_TYPES.TRANSFORM
          })
          .subscribe()
      }
      if (this.isPersonal) {
        this.endTime = moment(res.info.end_time * 1000)
        this.poundage = res.info.poundage
        this.transferService
          .getMemberPaymentList({
            member_id: get(res, 'info.member_id'),
            product_type: 2,
            operation_type: OPERATION_TYPES.TRANSFORM
          })
          .subscribe()
      }
    })
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        let sold_type = this.isPackage
          ? this.packageTransferInfo.sold_type
          : this.isPersonal
          ? this.personalCourseInfo.sold_type
          : '1'
        this.transferService
          .editCourseTransfer(
            {
              member_id: +values.member_id,
              member_name: values.member_name,
              mobile: values.mobile ? values.mobile.phone : undefined,
              remain_price: +values.remainPrice,
              contract_number: values.contractNumber,
              frozen_pay_type: +values.payType,
              sold_type: +sold_type,
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
    moment,
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
      let sold_type = this.isPackage
        ? this.packageTransferInfo.sold_type
        : this.isPersonal
        ? this.personalCourseInfo.sold_type
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
