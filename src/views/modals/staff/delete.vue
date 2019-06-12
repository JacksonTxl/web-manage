<template>
  <st-modal class="modal-staff-delete"
    title='删除员工'
    @ok='onSubmit'
    size="small"
    :okText="operate? '确定':'知道了'"
    v-model='show'>
    <staff-info :staff="staff"></staff-info>
    <section  v-if="!operate" class="mg-b16">
      <div class="modal-staff-delete__tip modal-staff-tip">
        <p>无法删除员工，该员工有以下几个事项待处理</p>
        <ul>
          <li v-for="(tip, index) in tips" :key="index" class="item"><span class="count">{{index + 1}}</span> {{tip.num}}{{tip.type|unitFilter}}{{tip.name}}, <a href="">查看详情</a></li>
        </ul>
      </div>
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
export default {
  name: 'DeleteStaff',
  serviceInject() {
    return {
      deleteService: DeleteService
    }
  },
  rxState() {
    return {
      conditionDeleteInfo: this.deleteService.conditionDeleteInfo$
    }
  },
  data() {
    return {
      show: false
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
  props: {
    staff: {
      type: Object,
      default: () => {}
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
    onSubmit() {
      if (!this.operate) {
      } else {
        this.deleteService.deleteStaffBrandInfo(this.staff.id + '').subscribe(res => {
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
