<template>
  <st-modal
    wrapClassName="modal-submit-remedial-info"
    :footer="null"
    v-model="show"
    width="504px"
  >
    <div>课程详情</div>
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
    courseNum: {
      type: Array,
      default: () => {
        return []
      }
    },
    cycle_type: {
      type: Number,
      default: () => {
        return 1
      }
    },
    editScheduleCycleFlag: {
      type: Boolean,
      default: () => {
        return false
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
    this.courseNum.forEach((item, index) => {
      this.totalCourseNum += item
    })
  },
  methods: {
    cancelSchedule() {
      this.show = false
    },
    save() {
      console.log(this.cycle_type)
      console.log(this.scheduleList)
      console.log(this.courseInfo)
      console.log(this.editScheduleCycleFlag)
      if (this.cycle_type === 1) {
        if (this.editScheduleCycleFlag) {
          this.scheduleList.id = this.courseInfo.course_id
          this.smallCourseScheduleService
            .addScheduleInBatchs(this.scheduleList)
            .subscribe(() => {
              this.show = false
              let weekOfday = moment().format('E')
              let start_date = moment()
                .subtract(weekOfday - 1, 'days')
                .format('YYYY-MM-DD')
              let end_date = moment()
                .add(7 - weekOfday, 'days')
                .format('YYYY-MM-DD')
              this.$router.push({
                path: '/shop/product/course/schedule/small-course/small-course',
                query: {
                  start_date,
                  end_date
                }
              })
            })
        } else {
          this.scheduleList.id = this.courseInfo.course_id
          this.smallCourseScheduleService
            .addScheduleInBatch(this.scheduleList)
            .subscribe(() => {
              this.show = false
              let weekOfday = moment().format('E')
              let start_date = moment()
                .subtract(weekOfday - 1, 'days')
                .format('YYYY-MM-DD')
              let end_date = moment()
                .add(7 - weekOfday, 'days')
                .format('YYYY-MM-DD')
              this.$router.push({
                path: '/shop/product/course/schedule/small-course/small-course',
                query: {
                  start_date,
                  end_date
                }
              })
            })
        }
      } else {
        console.log(this.courseInfo.course_id)
        if (this.editScheduleCycleFlag) {
          const scheduleList = {
            course_id: this.courseInfo.course_id,
            list: this.scheduleList
          }
          this.smallCourseScheduleService
            .addScheduleInBatchCustoms(scheduleList)
            .subscribe(() => {
              console.log('提交成功')
            })
        } else {
          const scheduleList = {
            course_id: this.courseInfo.course_id,
            list: this.scheduleList
          }
          this.smallCourseScheduleService
            .addScheduleInBatchCustom(scheduleList)
            .subscribe(() => {
              console.log('提交成功')
            })
        }
      }
    }
  }
}
</script>
