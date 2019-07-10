<template>
  <st-modal class="modal-staff-turnover" title='员工离职'
    @ok='onSubmit'
    :okText="!operate? '知道了':'保存'"
    size="small"
    :confirmLoading="loading.putStaffBrandQuit"
    v-model='show'>
    <section>
      <staff-info :staff="staff"></staff-info>
      <div v-if="!operate" class="modal-staff-turnover__tip modal-staff-tip mg-b24">
        <p >该员工有以下几个事项待处理，无法进行离职</p>
        <ul>
          <li v-for="(tip, index) in tips" :key="tip.type" class="item"><span class="count">{{index + 1}}</span> {{tip.num}}{{tip.type | unitFilter}}{{tip.name}}</li>
        </ul>
      </div>
      <st-form class="modal-staff-turnover__form" labelWidth='60px'>
        <st-form-item  labelWidth='60px' label="离职日期" class="mg-b0">
          <a-date-picker @change="onChange" />
        </st-form-item>
      </st-form>
    </section>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { TurnoverService } from './turnover.service'
export default {
  name: 'turnover',
  serviceInject() {
    return {
      turnoverService: TurnoverService
    }
  },
  rxState() {
    return {
      conditionDeleteInfo: this.turnoverService.conditionDeleteInfo$,
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
    StaffInfo
  },
  filters: {
    unitFilter(val) {
      console.log(val)
      return val === 5 ? '个' : '节'
    }
  },
  computed: {
    tips() {
      return this.conditionDeleteInfo.list
    },
    operate() {
      return this.conditionDeleteInfo.operate
    }
  },
  methods: {
    onChange(id, dateString) {
      console.log(dateString)
      this.dateString = dateString
    },
    isTurnover() {
      this.turnoverService.getStaffCheckJob(this.staff.id + '').subscribe(() => {
        console.log('conditionDeleteInfo', this.conditionDeleteInfo)
      })
    },
    onSubmit() {
      this.show = false
      if (!this.operate) {
      } else {
        this.turnoverService.putStaffBrandQuit({ id: this.staff.id, quit_time: this.dateString }).subscribe(res => {
          this.$router.push({ force: true })
        })
      }
    }
  },
  mounted() {
    this.isTurnover()
  }
}
</script>
