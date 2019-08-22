<template>
  <st-modal title="工资账户设置" @ok="onSubmit" size="small" v-model="show">
    <staff-info :staff="staff"></staff-info>
    <st-form :form="form" labelWidth="96px">
      <st-form-item label="姓名" required>
        <a-input
          placeholder="请输入姓名"
          v-decorator="decorators.account_name"
        />
      </st-form-item>
      <st-form-item label="银行卡号" required>
        <a-input
          v-decorator="decorators.card_number"
          placeholder="请输入银行卡号"
        />
      </st-form-item>
      <st-form-item class="mg-b0" label="开户银行" required>
        <a-input
          v-decorator="decorators.bank_name"
          placeholder="请输入开户银行"
          class="mg-b8"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { SalaryAccountSettingService } from './salary-account-setting.service'
import { ruleOptions } from './salary-account-setting.config'
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: false,
      form,
      decorators
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
      this.salaryAccountSettingService
        .getBankInfo(this.staff.id)
        .subscribe(res => {
          this.form.setFieldsValue({
            account_name: res.bank.account_name,
            card_number: res.bank.card_number,
            bank_name: res.bank.bank_name
          })
        })
    },
    onSubmit() {
      this.form.validate().then(values => {
        this.salaryAccountSettingService
          .putStaffBindBank({ id: this.staff.id, ...values })
          .subscribe(res => {
            this.show = false
            this.$router.reload()
          })
      })
    }
  },
  mounted() {
    this.getBankInfo()
  }
}
</script>
