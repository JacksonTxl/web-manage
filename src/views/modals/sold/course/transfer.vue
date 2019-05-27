<template>
  <st-modal
  title="转让"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-course-transfer">
    <div :class="transfer('content')">
      <a-row :class="transfer('info')" v-if="isPackage">
        <a-col :span="13">
          <st-info>
            <st-info-item label="课程名称">{{packageTransferInfo.course_name}}</st-info-item>
            <st-info-item label="到期日期">{{moment(packageTransferInfo.course_end_time*1000).format('YYYY-MM-DD hh:mm')}}</st-info-item>
            <st-info-item label="实付金额">{{packageTransferInfo.pay_price}}</st-info-item>
            <st-info-item label="转让手续费" v-if="packageTransferInfo.transfer_unit ">{{packageTransferInfo.transfer_num}}{{packageTransferInfo.transfer_unit | enumFilter('package_course.transfer_unit')}}</st-info-item>
            <st-info-item label="订单状态" v-if="packageTransferInfo.order_status">{{packageTransferInfo.order_status | enumFilter('sold.order_status')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="会员姓名">{{packageTransferInfo.member_name}}</st-info-item>
            <st-info-item label="手机号">{{packageTransferInfo.mobile}}</st-info-item>
            <st-info-item label="销售人员">{{packageTransferInfo.staff_name}}</st-info-item>
            <st-info-item label="订单号">{{packageTransferInfo.order_id}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <a-row :class="transfer('info')" class="personal" v-if="isPersonal">
        <a-col :span="13">
          <st-info>
            <st-info-item label="课程名称">{{personalCourseInfo.course_name}}</st-info-item>
            <st-info-item label="剩余课时">{{personalCourseInfo.remain_course_num}}</st-info-item>
            <st-info-item label="购买课时">{{personalCourseInfo.init_course_num}}</st-info-item>
            <st-info-item label="到期日期">{{moment(personalCourseInfo.end_time*1000).format('YYYY-MM-DD hh:mm')}}</st-info-item>
            <st-info-item label="实付金额">{{personalCourseInfo.pay_price}}</st-info-item>
            <st-info-item label="销售人员">{{personalCourseInfo.staff_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="会员姓名">{{personalCourseInfo.member_name}}</st-info-item>
            <st-info-item label="手机号">{{personalCourseInfo.mobile}}</st-info-item>
            <st-info-item label="订单号">{{personalCourseInfo.order_id}}</st-info-item>
            <st-info-item label="订单状态" v-if="personalCourseInfo.order_status">{{personalCourseInfo.order_status | enumFilter('sold.order_status')}}</st-info-item>
            <st-info-item label="转让手续费" v-if="personalCourseInfo.transfer_unit ">{{personalCourseInfo.transfer_num}}{{personalCourseInfo.transfer_unit | enumFilter('package_course.transfer_unit')}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form-table :class="transfer('table')" v-if="isPackage">
        <colgroup>
          <col style="width:5%;">
          <col style="width:30%;">
          <col style="width:30%;">
          <col style="width:30%;">
          <col style="width:5%;">
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
          <tr class="table-item" v-for="(item,index) in packageCourseInfo" :key="index">
            <td></td>
            <td>{{item.course_name}}</td>
            <td>{{item.course_num_init}}</td>
            <td>{{item.course_num_remain}}</td>
            <td></td>
          </tr>
        </tbody>
      </st-form-table>
      <st-hr marginTop="0" marginBottom="0" />
      <st-form :form="form" labelWidth="68px">
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
              @change="onMemberChange"
              notFoundContent="无搜索结果"
            >
              <a-select-option
              v-for="(item,index) in memberList"
              :value="item.member_id"
              :key="index">
                <span v-html="`${item.member_name}&nbsp;&nbsp;&nbsp;${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                  {{item.member_name}}&nbsp;&nbsp;&nbsp;{{item.mobile}}
                </span>
              </a-select-option>
            </a-select>
            <p v-if="!memberList.length&&memberSearchText!==''" class="add-text">查无此会员，<span @click="onAddMember">添加新会员？</span></p>
          </st-form-item>
          <st-form-item v-show="!searchMemberIsShow" label="会员姓名" required labelGutter="12px">
            <a-input v-decorator="['memberName',{rules:[{validator:member_name_validator}]}]" placeholder="请输入会员姓名"></a-input>
          </st-form-item>
          <st-form-item  v-show="!searchMemberIsShow" label="手机号" required labelGutter="12px">
            <a-input v-decorator="['memberMobile',{rules:[{validator:member_mobile_validator}]}]" placeholder="请输入手机号"></a-input>
            <p class="add-text"><span @click="onCancelMember">取消添加</span></p>
          </st-form-item>
          <st-form-item class="mg-b0" label="有效时间" required labelGutter="12px">
            <div :class="transfer('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  v-decorator="['startTime',{rules:[{validator:start_time_validator}]}]"
                  @change="onStartTimeChange"
                  :showTime="{format: 'HH:mm'}"
                  style="width: 100%;"
                  format="YYYY-MM-DD hh:mm"
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
                  format="YYYY-MM-DD hh:mm"
                  placeholder="结束时间"
                  :showToday="false"
                />
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item label="剩余价值" required labelGutter="12px">
            <st-input-number
            :max="99999.9"
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
          <st-form-item label="手续费" class="global-form-item-text" labelGutter="12px">{{poundage}}元</st-form-item>
          <st-form-item label="支付方式" required labelGutter="12px">
            <a-select
            v-decorator="['payType',{rules:[{validator:pay_type_validator}]}]"
            placeholder="选择支付方式">
              <a-select-option
              v-for="(item,index) in Object.keys(sold.frozen_pay_type.value)"
              :key="index"
              :value="+item">{{sold.frozen_pay_type.value[item]}}</a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.editCourseTransfer" type="primary">确认提交</st-button>
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
  name: 'ModalSoldCourseTransfer',
  bem: {
    transfer: 'modal-sold-course-transfer'
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
      packageCourseInfo: this.transferService.packageCourseInfo$,
      packageTransferInfo: this.transferService.packageTransferInfo$,
      timeScope: this.transferService.timeScope$,
      personalCourseInfo: this.transferService.personalCourseInfo$,
      sold: this.userService.soldEnums$
    }
  },
  computed: {
    isPackage() {
      return this.type === 'package'
    },
    isPersonal() {
      return this.type === 'personal'
    }
  },
  props: ['id', 'type'],
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      // 搜索会员
      memberSearchText: '',
      searchMemberIsShow: true,
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
      poundage: ''
    }
  },
  created() {
    this.transferService.getCourseInfo(this.id, this.type).subscribe(res => {
      if (this.isPackage) {
        this.endTime = moment(this.packageTransferInfo.course_end_time * 1000)
        this.poundage = this.packageTransferInfo.transfer_unit === 1 ? (this.packageTransferInfo.transfer_num * this.packageTransferInfo.pay_price / 100) : this.packageTransferInfo.transfer_num
      }
      if (this.isPersonal) {
        this.endTime = moment(res.info.end_time * 1000)
        this.poundage = res.info.transfer_unit === 1 ? (res.info.transfer_num * res.info.pay_price / 100) : res.info.transfer_num
      }
    })
  },
  methods: {
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          let sold_type = this.isPackage ? this.packageTransferInfo.sold_type : this.isPersonal ? this.personalCourseInfo.sold_type : '1'
          this.transferService.editCourseTransfer({
            member_id: +values.memberId,
            member_name: values.memberName,
            mobile: values.memberMobile,
            start_time: values.startTime.format('YYYY-MM-DD hh:mm'),
            remain_price: +values.remainPrice,
            contract_number: values.contractNumber,
            frozen_pay_type: +values.payType,
            sold_type: +sold_type
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
        this.transferService.getMember(data).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['memberId'])
          }
        })
      }
    },
    // 选择会员
    onMemberChange(data) {
      console.log(data)
    },
    // time
    moment,
    disabledStartDate(startValue) {
      return startValue.valueOf() < moment().subtract(1, 'd').valueOf() || startValue.valueOf() > moment().add(31, 'd').valueOf()
    },
    onStartTimeChange(data) {
      this.endTime = cloneDeep(moment(data.valueOf() + this.timeScope))
    },
    onCodeNumber() {
      let sold_type = this.isPackage ? this.packageTransferInfo.sold_type : this.isPersonal ? this.personalCourseInfo.sold_type : '1'
      this.transferService.getCodeNumber(`${sold_type}`).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    }
  }
}
</script>
