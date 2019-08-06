<template>
  <st-modal
    class="modal-reserved"
    title="预约详情"
    :footer="null"
    width="848px"
    v-model="show"
  >
    <a-row :gutter="24" class="modal-reserved-info">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="会员名称">{{ info.member_name }}</st-info-item>
          <st-info-item label="上课教练">{{ info.coach_name }}</st-info-item>
          <st-info-item label="预约状态">
            <span v-if="info.is_checkin">
              {{ info.is_checkin | enumFilter('reserve.is_checkin') }}
            </span>
            <span v-else>
              {{ info.reserve_status | enumFilter('reserve.reserve_status') }}
            </span>
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="课程名称">{{ info.course_name }}</st-info-item>
          <st-info-item label="消费方式">{{ info.consume_name }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="预约日期">{{ info.start_date }}</st-info-item>
          <st-info-item label="预约时间">{{ info.start_time }}</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <div class="mg-t24 ta-r">
      <st-button
        class="mg-r8"
        type="primary"
        v-if="auth['shop:reserve:personal_course_reserve|edit']"
        @click="updateReserve"
      >
        修改预约
      </st-button>
      <st-button
        class="mg-r8"
        v-if="auth['shop:reserve:personal_course_reserve|del']"
        @click="cancelSchedule"
      >
        取消预约
      </st-button>
      <st-button
        @click="checkInConsume"
        v-if="auth['shop:reserve:personal_course_reserve|checkin']"
      >
        签到消费
      </st-button>
    </div>
  </st-modal>
</template>

<script>
import { PersonalScheduleReserveService as ReserveService } from '@/views/pages/shop/product/course/schedule/personal/service#/reserve.service'
import SchedulePersonalEditReserve from '@/views/biz-modals/schedule/personal/edit-reserve'
export default {
  name: 'ReserveInfo',
  modals: {
    SchedulePersonalEditReserve
  },
  serviceInject() {
    return {
      reserveService: ReserveService
    }
  },
  rxState() {
    return {
      auth: this.reserveService.infoAuth$ || {}
    }
  },
  props: {
    id: Number
  },
  data() {
    return {
      show: false,
      info: {}
    }
  },
  computed: {
    courseId() {
      return this.info.course_id
    },
    scheduleId() {
      return this.info.id
    }
  },
  created() {
    this.getReserveInfo()
  },
  methods: {
    updateReserve() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-personal-edit-reserve',
        props: {
          info: this.info
        }
      })
    },
    cancelSchedule() {
      this.reserveService.del(this.id).subscribe(() => {
        this.getReserveInfo()
      })
    },
    checkInConsume() {
      this.reserveService.check(this.id).subscribe(() => {
        this.getReserveInfo()
      })
    },
    getReserveInfo() {
      this.reserveService.getInfo(this.id).subscribe(res => {
        this.info = res.info
      })
    }
  }
}
</script>
