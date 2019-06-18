<template>
  <st-modal class="modal-staff-delete"
    title='修改密码'
    @ok='onSubmit'
    size="small"
    v-model='show'>
    {{rePasswordInfo}}
  </st-modal>
</template>

<script>
import { RePasswordService } from './re-password.service'
export default {
  name: 'RePassword',
  serviceInject() {
    return {
      rePasswordService: RePasswordService
    }
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      rePasswordInfo: {}
    }
  },
  methods: {
    getPasswordInfo() {
      this.rePasswordService.getRePassword(this.staff.id).subscribe(res => {
        this.rePasswordInfo = res.account
      })
    },
    onSubmit() {
      let form = {
        id: this.staff.id,
        name: '郑林雄',
        password: '123456',
        repeat_password: '123456'
      }
      this.rePasswordService.rePassword(form).subscribe()
      // this.rePasswordService.setAccount(form).subscribe()
    }
  },
  mounted() {
    this.getPasswordInfo()
  }
}
</script>

<style lang="scss" scoped>

</style>
