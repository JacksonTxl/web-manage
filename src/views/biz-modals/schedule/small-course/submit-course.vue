<template>
  <st-modal
    wrapClassName="modal-submit-course"
    :footer="null"
    v-model="show"
    width="504px"
  >
    <div class="submit-course-content">
      <img
        class="submit-tips-pic"
        src="~@/assets/img/icon_setting_success.png"
        alt="验证成功提示图片"
      />
      <st-t3 class="submit-tips-text">验证成功</st-t3>
      <p class="submit-item">
        <span>总课时：</span>
        {{ courseInfo.course_times }}节
      </p>
      <p class="submit-item mg-b8">
        <span>总排课：</span>
        {{ totalCourseNum }}节
      </p>
      <p
        class="mg-b24"
        v-if="courseInfo.small_course_type === 1 && invalidNum > 0"
      >
        固定排课，已自动为您去掉后{{ invalidNum }}节
      </p>
      <div class="save-schedule-btn">
        <st-button @click="cancelSchedule">
          继续编辑
        </st-button>
        <st-button type="primary" class="mg-l12" @click="save">
          确认
        </st-button>
      </div>
    </div>
  </st-modal>
</template>

<script>
import { SmallCourseScheduleService } from '@/views/pages/shop/product/course/schedule/small-course/service#/schedule.service'
export default {
  name: 'SubmitCourse',
  serviceInject() {
    return {
      smallCourseScheduleService: SmallCourseScheduleService
    }
  },
  rxState() {
    return {}
  },
  props: {
    scheduleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    courseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cycle_type: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  computed: {
    invalidNum() {
      return this.totalCourseNum - this.courseInfo.course_times
    }
  },
  data() {
    return {
      show: false,
      totalCourseNum: 0
    }
  },
  created() {
    console.log(this.courseInfo)
    if (this.cycle_type === 1) {
      console.log(this.scheduleList)
      this.scheduleList.forEach((item, index) => {
        this.totalCourseNum += item.length
      })
    } else {
      this.totalCourseNum = this.scheduleList.length
    }
  },
  methods: {
    cancelSchedule() {
      this.show = false
    },
    save() {
      console.log(this.cycle_type)
      console.log(this.scheduleList)
      console.log(this.courseInfo)
      if (this.cycle_type === 1) {
        this.smallCourseScheduleService
          .save(this.courseInfo.course_id)
          .subscribe()
      } else {
        const params = {}
        params.course_id = this.courseInfo.course_id
        params.schedule_ids = []
        this.scheduleList.forEach((item, index) => {
          params.schedule_ids.push(item.id)
        })
        this.smallCourseScheduleService.saveCustom(params).subscribe()
      }
    }
  }
}
// this.show = false
// let weekOfday = moment().format('E')
// let start_date = moment()
//   .subtract(weekOfday - 1, 'days')
//   .format('YYYY-MM-DD')
// let end_date = moment()
//   .add(7 - weekOfday, 'days')
//   .format('YYYY-MM-DD')
// this.$router.push({
//   path: '/shop/product/course/schedule/small-course/small-course',
//   query: {
//     start_date,
//     end_date
//   }
// })
</script>
