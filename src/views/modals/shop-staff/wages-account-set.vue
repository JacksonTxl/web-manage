<template>
  <st-modal title="工资账户设置" size="small" v-model="show" @ok="onSubmit">
    <section>
      <div >
        <!-- <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r4" type="role-staff"/> -->
        <span >{{ data.staff_name }}</span>
      </div>
    </section>
    <section>
      <st-form
        labelWidth="66px"
        :form="form"
        @submit="onSubmit"
        class="mg-t24"
      >
        <st-form-item label="姓名" required>
          <a-input placeholder="请输入姓名" v-decorator="['id_number',{ rules: [{ required: true, message: '请输入姓名' }]}]"/>
        </st-form-item>
        <st-form-item label="银行卡号" required>
          <a-input placeholder="请输入银行卡号" v-decorator="['id_number',{ rules: [{ required: true, message: '请输入银行卡号' }]}]"/>
        </st-form-item>
        <st-form-item label="开户银行" required>
          <a-input placeholder="请输入开户银行" v-decorator="['id_number',{ rules: [{ required: true, message: '请输入开户银行' }]}]"/>
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
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
