<template>
  <st-modal
  title="转让"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-lease-transfer">
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="剩余天数">{{info.remain_days}}</st-info-item>
            <st-info-item label="租赁天数">{{info.lease_days}}</st-info-item>
            <st-info-item label="实付金额">{{info.pay_price}}</st-info-item>
            <st-info-item label="销售人员">{{info.staff_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="会员姓名">{{info.member_name}}</st-info-item>
            <st-info-item label="手机号">{{info.mobile}}</st-info-item>
            <st-info-item label="起租日期">{{info.start_time}}</st-info-item>
            <st-info-item label="到期日期">{{info.end_time}}</st-info-item>
            <st-info-item label="订单号">{{info.order_id}}</st-info-item>
            <st-info-item label="订单状态" v-if="info.order_status">{{info.order_status | enumFilter('sold.order_status')}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr marginTop="0" marginBottom="0" />
      <st-form :form="form" labelWidth="85px">
        <div :class="transfer('transfer')">
          <st-form-item v-show="searchMemberIsShow" label="转让会员" required labelGutter="12px">
            <a-select
              showSearch
              allowClear
              placeholder="输入手机号或会员名搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              v-decorator="['memberId',{rules:[{validator:member_id_validator}]}]"
              @search="onMemberSearch"
              notFoundContent="无搜索结果"
            >
              <a-select-option
              v-for="(item,index) in memberList"
              :value="item.id"
              :key="index">
                <span v-html="`${item.member_name}   ${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                  {{item.member_name}}&nbsp;&nbsp;&nbsp;{{item.mobile}}
                </span>
              </a-select-option>
            </a-select>
            <p v-if="!memberList.length&&memberSearchText!==''&&+info.sale_range.type===1" class="add-text">查无此会员，<span @click="onAddMember">添加新会员？</span></p>
          </st-form-item>
          <st-form-item v-show="!searchMemberIsShow" label="会员姓名" required labelGutter="12px">
            <a-input v-decorator="['memberName',{rules:[{validator:member_name_validator}]}]" placeholder="请输入会员姓名"></a-input>
          </st-form-item>
          <st-form-item  v-show="!searchMemberIsShow" label="手机号" required labelGutter="12px">
            <a-input v-decorator="['memberMobile',{rules:[{validator:member_mobile_validator}]}]" placeholder="请输入手机号"></a-input>
            <p class="add-text"><span @click="onCancelMember">取消添加</span></p>
          </st-form-item>
          <st-form-item label="剩余价值" required labelGutter="12px">
            <template slot="label">
                剩余价值<st-help-tooltip id="TSMC004" />
            </template>
            <st-input-number
            :max="+info.pay_price"
            :float="true"
            placeholder="请输入剩余价值"
            v-decorator="['remainPrice',{rules:[{validator:remain_price_validator}]}]">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="合同编号" required labelGutter="12px">
            <div :class="transfer('contract')">
              <a-input
              v-decorator="['contractNumber',{rules:[{validator:contract_number}]}]"
              placeholder="请输入合同编号"></a-input>
              <st-button class="create-button" @click="onCodeNumber" :loading="loading.getCodeNumber">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item label="手续费" class="global-form-item-text" labelGutter="12px">{{info.transfer}}</st-form-item>
          <st-form-item label="支付方式" required labelGutter="12px">
            <a-select
            v-decorator="['payType',{rules:[{validator:pay_type_validator}]}]"
            placeholder="选择支付方式">
              <a-select-option
              v-for="(item,index) in payList"
              :key="index"
              :value="+item.payment_type">{{item.payment_type_name}}</a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.setTransaction" type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { TransferService } from './transfer.service'
import { UserService } from '@/services/user.service'
import { RuleConfig } from '@/constants/rule'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalSoldLeaseTransfer',
  bem: {
    transfer: 'modal-sold-lease-transfer'
  },
  serviceInject() {
    return {
      rules: RuleConfig,
      userService: UserService,
      transferService: TransferService
    }
  },
  rxState() {
    return {
      loading: this.transferService.loading$,
      memberList: this.transferService.memberList$,
      info: this.transferService.info$,
      payList: this.transferService.payList$,
      sold: this.userService.soldEnums$
    }
  },
  computed: {

  },
  props: ['id', 'type'],
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      // 搜索会员
      memberSearchText: '',
      searchMemberIsShow: true,
      member_id: ''
    }
  },
  created() {
    this.transferService.getDetail(this.id, this.type).subscribe(res => {
      this.transferService.getPayList(res.info.order_id).subscribe()
      this.member_id = res.info.member_id
    })
  },
  methods: {
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.transferService.setTransaction({
            id: this.id,
            transferee_member_id: +values.memberId,
            member_name: +values.memberName,
            mobile: +values.memberMobile,
            sale_range: this.info.sale_range.type,
            remain_amount: values.remainPrice,
            contract_number: values.contractNumber,
            pay_channel: +values.payType
          }, this.id, this.type).subscribe(res => {
            this.$emit('success')
            this.show = false
          })
        }
      })
    },
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
    start_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择有效开始日期')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    remain_price_validator(rule, value, callback) {
      if (!value || +value === 0) {
        // eslint-disable-next-line
        callback('请输入剩余价值')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    contract_number(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入合同编号')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    pay_type_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择支付方式')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 切换添加会员
    onAddMember() {
      this.searchMemberIsShow = false
      this.form.resetFields(['memberId', 'memberName', 'memberMobile'])
    },
    onCancelMember() {
      this.searchMemberIsShow = true
      this.form.resetFields(['memberId', 'memberName', 'memberMobile'])
    },
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.transferService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.transferService.getMember({
          member: data,
          escape_member_id: +this.member_id
        }).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['memberId'])
          }
        })
      }
    },
    // time
    moment,
    disabledStartDate(startValue) {
      return startValue.valueOf() < moment().subtract(1, 'd').valueOf() || startValue.valueOf() > moment().add(31, 'd').valueOf()
    },
    onCodeNumber() {
      this.transferService.getCodeNumber(this.info.contract_type).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    }
  }
}
</script>
