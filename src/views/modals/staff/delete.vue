<template>
  <st-modal
    class="modal-staff-delete"
    title="删除员工"
    @ok="onSubmit"
    size="small"
    :okText="operate ? '确定' : '知道了'"
    v-model="show"
  >
    <staff-info :staff="staff"></staff-info>
    <section v-if="!operate" class="mg-b16">
      <staff-modal-tips
        :list="list"
        :type="3"
        :canNotDelete="!operate"
        v-if="list && list.length"
      ></staff-modal-tips>
    </section>
    <section v-else>
      <div class="modal-staff-delete__sub-tip">
        删除员工后，将暂停进行中的服务，同时将无法恢复，确认删除？
      </div>
    </section>
  </st-modal>
</template>
<script>
import StaffInfo from './staff-info'
import { DeleteService } from './delete.service'
import StaffModalTips from '@/views/biz-components/staff/staff-modal-tips'
export default {
  name: 'DeleteStaff',
  serviceInject() {
    return {
      deleteService: DeleteService
    }
  },
  rxState() {
    return {
      list: this.deleteService.list$,
      operate: this.deleteService.operate$,
      loading: this.deleteService.loading$
    }
  },
  data() {
    return {
      show: false
    }
  },
  components: {
    StaffInfo,
    StaffModalTips
  },
  filters: {
    unitFilter(val) {
      console.log(val)
      return val === 5 ? '个' : '节'
    }
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onSubmit() {
      if (!this.operate) {
      } else {
        this.deleteService
          .deleteStaffBrandInfo(this.staff.id + '')
          .subscribe(res => {
            this.$router.push({ force: true })
          })
      }
      this.show = false
    },
    isTurnover() {
      this.deleteService.getStaffCheckJob(this.staff.id + '').subscribe()
    }
  },
  mounted() {
    this.isTurnover()
  }
}
</script>
