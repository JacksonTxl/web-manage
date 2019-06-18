<template>
  <st-modal title='工资账户设置'
    @ok='onSubmit'
    size="small"
    v-model='show'>
    <staff-info :staff="staff"></staff-info>
    <st-form :form="form" labelWidth='96px'>
      <st-form-item
        label="姓名"
        required>
        <a-input placeholder="请输入姓名" v-decorator="[
            'account_name',
            {rules: [{ required: true, message: '请输入姓名' }], initialValue: accountInfo.account_name}
          ]"/>
      </st-form-item>
      <st-form-item label="银行卡号" required>
        <a-input v-decorator="[
            'card_number',
            {rules: [{ required: true, message: '请输入姓名'}], initialValue: accountInfo.card_number }
          ]" placeholder="请输入银行卡号" />
      </st-form-item>
      <st-form-item  class="mg-b0" label="开户银行" required>
        <a-input v-decorator="[
            'bank_name',
            {rules: [{ required: true, message: '请输入开户银行' }], initialValue: accountInfo.bank_name }
          ]" placeholder="请输入开户银行" class="mg-b8"/>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { SalaryAccountSettingService } from './salary-account-setting.service'
export default {
  name: 'SalaryAccountSetting',
  serviceInject() {
    return {
      salaryAccountSettingService: SalaryAccountSettingService
    }
  },
  rxState() {
    return {
      accountInfo: this.salaryAccountSettingService.accountInfo$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    StaffInfo
  },
  methods: {
    getBankInfo() {
      this.salaryAccountSettingService.getBankInfo(1).subscribe()
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.salaryAccountSettingService.putStaffBindBank({ id: this.staff.id, ...values }).subscribe(res => {
            this.show = false
            this.$router.push({ force: true })
          })
        }
      })
    }
  },
  mounted() {
    this.getBankInfo()
  }
}
</script>
