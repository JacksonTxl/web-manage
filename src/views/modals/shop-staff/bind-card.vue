<template>
  <st-modal title="绑定实体卡" size="small" v-model="show" @ok="onSubmit">
    <section>
      <div class="">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <section>
      <st-form
        labelWidth="60px"
        :form="form"
        @submit="onSubmit"
        class="mg-t24"
      >
        <st-form-item label="实体卡号">
          <a-input placeholder="请输入实体卡号"/>
        </st-form-item>
        <st-form-item label="物理ID">
          <a-input placeholder="请将实体卡置于读卡器上"/>
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  }
}
</script>
