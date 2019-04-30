<template>
  <st-modal title='员工账户设置'
    confirmLoading
    @ok='onSubmit'
    size="small"
    v-model='show'>
    <section>
      <div class="staff-tag mg-b24">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <st-form labelWidth='96px'>
      <st-form-item   label="姓名" required>
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item label="银行等等卡号" required>
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item  class="mg-b0" label="开户银行" required>
        <a-input placeholder="支持中英文、数字,不超过10个字" class="mg-b8"/>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
export default {
  name: 'SalaryAccountSetting',
  data() {
    return {
      show: false
    }
  },
  methods: {
    onSubmit() {
      console.log('ok')
    }
  }
}
</script>
