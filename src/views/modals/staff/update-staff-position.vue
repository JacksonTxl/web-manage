<template>
  <a-modal title='更改员工职位'
    confirmLoading
    @ok='onSubmit'
    v-model='show'>
    <section>
      <div class="staff-tag mg-b24">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <st-form labelWidth='60px'>
      <st-form-item   label="工作性质">
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item label="教练等级">
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item  label="薪资模板">
        <a-input placeholder="支持中英文、数字,不超过10个字" class="mg-b8"/>
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
    </st-form>
  </a-modal>
</template>
<script>
export default {
  name: 'UpdateStaffPosition',
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
