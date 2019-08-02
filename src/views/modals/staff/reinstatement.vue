<template>
  <st-modal
    class="modal-turnover"
    title="员工复职"
    @ok="onSubmit"
    okText="保存"
    size="small"
    v-model="show"
  >
    <staff-info :staff="staff"></staff-info>
    <section>
      <st-form labelWidth="60px">
        <st-form-item labelWidth="60px" label="复职日期">
          <a-date-picker @change="onChange" />
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { ReinstatementService } from './reinstatement.service.ts'
export default {
  name: 'Reinstatement',
  serviceInject() {
    return {
      reinstatementService: ReinstatementService
    }
  },
  data() {
    return {
      show: false,
      restartTime: ''
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
    onChange(id, dateString) {
      this.restartTime = dateString
    },
    onSubmit() {
      this.reinstatementService
        .putStaffBrandRestart({
          id: this.staff.id,
          restart_time: this.restartTime
        })
        .subscribe(res => {
          this.$router.push({ force: true })
        })
      this.show = false
    }
  }
}
</script>
