<template>
  <st-modal
    title="延时有效期"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-course-transfer"
  ></st-modal>
</template>

<script>
import moment from 'moment'
import { TransferService } from './transfer.service'
import { UserService } from '@/services/user.service'
import { cloneDeep, get } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
import { OPERATION_TYPES } from '@/constants/sold/operations'
import { ruleOptions } from './transfer.config'
export default {
  name: 'ModalSoldCourseTransfer',
  bem: {
    transfer: 'modal-sold-course-transfer'
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
      memberList: this.transferService.memberList$,
      packageCourseInfo: this.transferService.packageCourseInfo$,
      packageTransferInfo: this.transferService.packageTransferInfo$,
      timeScope: this.transferService.timeScope$,
      personalCourseInfo: this.transferService.personalCourseInfo$,
      memberPaymentlist: this.transferService.memberPaymentlist$,
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      OPERATION_TYPES,
      show: false,
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
      this.form.validate((error, values) => {
        if (!error) {
          let sold_type = this.isPackage
            ? this.packageTransferInfo.sold_type
            : this.isPersonal
            ? this.personalCourseInfo.sold_type
            : '1'
          this.transferService
            .editCourseTransfer(
              {
                member_id: +values.memberId,
                member_name: values.memberName,
                mobile: values.memberMobile,
                remain_price: +values.remainPrice,
                contract_number: values.contractNumber,
                frozen_pay_type: +values.payType,
                sold_type: +sold_type
              },
              this.id,
              this.type
            )
            .subscribe(res => {
              this.$emit('success')
              this.show = false
            })
        }
      })
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
      this.isSelectMember = false
      if (data === '') {
        this.transferService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        // 等于1的时候表示可以新增会员
        this.transferService
          .getMember(data, this.personalCourseInfo.can_add_member !== 1 ? 2 : 1)
          .subscribe(res => {
            if (!res.list.length) {
              this.form.resetFields(['memberId'])
            }
          })
      }
    },
    // 选择会员
    selectMember(event) {
      if (event) {
        this.isSelectMember = true
      }
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
