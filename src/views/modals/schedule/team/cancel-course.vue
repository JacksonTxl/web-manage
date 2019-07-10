<template>
  <st-modal  @ok="save" title="预约详情" width="848px" v-model="show">
    <div class="modal-cancel-course">
      <st-t3 class="mg-b16">是否取消课程?</st-t3>
      <p class="tip">将发送消息通知已报名用户并发起自动退款</p>
    </div>

  </st-modal>
</template>

<script>
import { TeamScheduleScheduleService } from '../../../pages/shop/product/course/schedule/team.service#/schedule.service'
export default {
  name: 'CancelCourse',
  serviceInject() {
    return {
      teamScheduleService: TeamScheduleScheduleService
    }
  },
  data() {
    return {
      show: false
    }
  },
  props: {
    id: {
      type: Number,
      defalut: -1
    }
  },
  methods: {
    save() {
      this.teamScheduleService.del(this.id).subscribe(res => {
        this.show = false
      })
    }
  }
}
</script>
