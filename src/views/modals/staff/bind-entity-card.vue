<template>
  <st-modal
    class="modal-bind-entity-card"
    title='绑定实体卡'
    @ok='save'
    size="small"
    v-model='show'>
    <section>
      {{staff}}
      <div class="modal-bind-entity-card__tag modal-staff-tag">
        <st-tag v-for="item in identity" :key="item.id" class="mg-r4" :type="item.id | identityFilter"/>
        <st-tag class="mg-r4" type="identity-1"/>
        <st-tag class="mg-r8" type="role-staff"/>
        <st-t3>{{staff.staff_name}}</st-t3>
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
  </st-modal>
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
    staff: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    identityFilter(key) {
      const identityTag = ['role-staff', 'role-saler', 'coach-personal', 'coach-team', 'swimming-coach']
      return identityTag[key]
    }
  },
  computed: {
    identity() {
      return this.staff.identity
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
