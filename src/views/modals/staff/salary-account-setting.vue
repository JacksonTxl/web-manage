<template>
  <a-modal title='员工账户设置'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <section>
      <div class="staff-tag">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
  </a-modal>
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
