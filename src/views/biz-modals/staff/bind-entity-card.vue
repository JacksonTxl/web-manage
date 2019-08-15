<template>
  <st-modal title="绑定实体卡" @ok="save" size="small" v-model="show">
    <div class="modal-bind-entity-card">
      <staff-info :staff="staff"></staff-info>
      <a-row v-if="staff.has_card" class="staff-card  mg-b24">
        <a-col :span="24" class="pd-x8 pd-y16">
          <div class="card">
            <span class="label">当前绑定实体卡号：</span>
            <span class="vlaue">{{ staff.card_number }}</span>
          </div>
          <div class="card mg-t8">
            <span class="label">物理ID：</span>
            <span class="vlaue">{{ staff.physical_number }}</span>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <st-form
          labelWidth="88px"
          :form="form"
          @submit="save"
          class="modal-bind-entity-card__form"
        >
          <st-form-item label="实体卡号" required>
            <a-input
              placeholder="请输入实体卡号"
              v-decorator="decorators.card_number"
            />
          </st-form-item>
          <st-form-item label="物理ID" required>
            <a-input
              v-decorator="decorators.physical_number"
              placeholder="请将实体卡置于读卡器上"
            />
          </st-form-item>
        </st-form>
      </a-row>
    </div>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { BindEntityCardService } from './bind-entity-card.service'
import { ruleOptions } from './bind-entity-card.config'
export default {
  name: 'BindEntityCard',
  serviceInject() {
    return {
      bindEntityCardService: BindEntityCardService
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
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
    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        const form = { id: this.staff.id, ...values }
        this.bindEntityCardService.putStaffBindPhysical(form).subscribe(() => {
          this.show = false
          this.$router.push({ force: true })
        })
      })
    }
  }
}
</script>
