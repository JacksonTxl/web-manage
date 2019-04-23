<template>
  <a-modal
    class="modal-bind-entity-card"
    title='绑定实体卡'
    @ok='save'
    v-model='show'>
    <section>
      <div class="modal-bind-entity-card__tag modal-staff-tag">
        <st-tag class="mg-r4" type="coach-personal"/>
        <st-tag class="mg-r4" type="coach-team"/>
        <st-tag class="mg-r8" type="role-staff"/>
      </div>
    </section>
    <section>
      <div class="modal-bind-entity-card__tip">

      </div>
    </section>
    <section>
      <st-form labelWidth='60px' :form="form" @submit="save" class="modal-bind-entity-card__form mg-t24">
        <st-form-item label="实体卡号" >
          <a-input placeholder="请输入实体卡号" />
        </st-form-item>
        <st-form-item label="物理ID" >
          <a-input placeholder="请将实体卡置于读卡器上"/>
        </st-form-item>
      </st-form>
    </section>
  </a-modal>
</template>
<script>
export default {
  name: 'BindEntityCard',
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  props: {
    staffId: {
      type: Number,
      default: -1
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
