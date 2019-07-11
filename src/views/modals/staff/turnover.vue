<template>
  <st-modal title='员工离职'
    @ok='onSubmit'
    :okText="!operate? '知道了':'保存'"
    size="small"
    wrapClassName="modal-staff-turnover"
    :confirmLoading="loading.putStaffBrandQuit"
    v-model='show'>
    <section>
      <staff-info :staff="staff"></staff-info>
      <staff-modal-tips :list="list" :canNotDelete="!operate" v-if="list && list.length" class="modal-tips"></staff-modal-tips>
      <st-form class="modal-staff-turnover__form" labelWidth='60px'>
        <st-form-item  labelWidth='60px' label="离职日期" class="mg-b0">
          <a-date-picker @change="onDateChange"/>
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { TurnoverService } from './turnover.service'
import StaffModalTips from '@/views/biz-components/staff/staff-modal-tips'

export default {
  name: 'turnover',
  serviceInject() {
    return {
      turnoverService: TurnoverService
    }
  },
  rxState() {
    return {
      list: this.turnoverService.list$,
      operate: this.turnoverService.operate$,
      loading: this.turnoverService.loading$
    }
  },
  data() {
    return {
      show: false,
      checkJob: {},
      dateString: ''
    }
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    StaffInfo,
    StaffModalTips
  },
  filters: {
    unitFilter(val) {
      return val === 5 ? '个' : '节'
    }
  },
  mounted() {
    this.isTurnover()
  },
  methods: {
    onDateChange(id, dateString) {
      console.log('dateString', dateString)
      this.dateString = dateString
    },
    isTurnover() {
      this.turnoverService.getStaffCheckJob(String(this.staff.id)).subscribe(() => {
        console.log('list', this.list)
      })
    },
    onSubmit() {
      this.show = false
      if (this.operate) {
        this.turnoverService.putStaffBrandQuit({ id: this.staff.id, quit_time: this.dateString }).subscribe(res => {
          this.$router.push({ force: true })
        })
      }
    }
  }
}
</script>
