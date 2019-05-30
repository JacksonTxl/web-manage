<template>
  <st-modal
    title="重绑定实体卡"
    size="small"
    v-model="show"
    @ok="onSubmit"
    class="model-re-bind-container"
  >
    <section>
      <div class>
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r4" type="role-staff"/>
        <span>{{ staff_name }}</span>
      </div>
    </section>
    <section class="model-re-bind-container_info mg-t16 aaaa">
      <div class="model-re-bind-container_same">
        <span class="model-re-bind-container_title">当前绑定实体卡号：</span>
        <span>2132323213123</span>
      </div>
      <div class="model-re-bind-container_same">
        <span class="model-re-bind-container_titl">当前物理ID：</span>
        <span>123213</span>
      </div>
    </section>
    <section>
      <st-form labelWidth="60px" :form="form" @submit="onSubmit" class="mg-t16">
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
  props: {
    staff_name: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    }
  }
}
</script>
