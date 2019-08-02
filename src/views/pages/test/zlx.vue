<template>
  <div>
    <calendar @detail="onDetail" :cardList="cardList" :startDate="startDate">
      <div slot="toolbar-left">
        <st-button
          type="primary"
          class="mg-r32"
          @click="onClickScheduleInBatch"
        >
          批量排期
        </st-button>
        <st-button @click="onClickCopySchedule">复制排期</st-button>
      </div>
    </calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
import { ZlxService } from './zlx.service'
import { TeamScheduleScheduleService } from '../shop/product/course/schedule/team.service#/schedule.service'
import ScheduleTeamAddCourseScheduleBatch from '@/views/biz-modals/schedule/team/add-course-schedule-batch'
import ScheduleTeamCopySchedule from '@/views/biz-modals/schedule/team/copy-schedule'
export default {
  name: 'zlx',
  modals: {
    ScheduleTeamAddCourseScheduleBatch,
    ScheduleTeamCopySchedule
  },
  serviceInject() {
    return {
      zlxService: ZlxService,
      teamSchduleService: TeamScheduleScheduleService
    }
  },
  rxState() {
    return {
      cardList: this.teamSchduleService.scheduleTeamCourseList$
    }
  },
  components: {
    Calendar
  },
  data() {
    return {
      cardList: [
        {
          id: 96055669096767,
          coach_name: '团课教练汤汤测试勿动',
          member_id: 77159390052771,
          member_name: '汤汤汤测试',
          course_name: '汤汤好私教',
          consume_name: '范围内的课程（汤汤好私教）',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-27',
          start_time: '09:40',
          end_time: '11:20',
          end_date: '2019-07-27',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 100256717537549,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '核心马杀鸡',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-26',
          start_time: '16:38',
          end_time: '17:08',
          end_date: '2019-07-26',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 101853925278289,
          coach_name: '闵行店私教教练1',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '闵行店的健美操',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-22',
          start_time: '13:39',
          end_time: '14:29',
          end_date: '2019-07-22',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349444,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '06:18',
          end_time: '06:58',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349445,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '00:18',
          end_time: '00:58',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349446,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '01:18',
          end_time: '01:58',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349581,
          coach_name: '闵行店私教教练1',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '汤汤好私教',
          consume_name: '固定课程（汤汤好私教）',
          reserve_status: 3,
          is_checkin: 1,
          start_date: '2019-07-22',
          start_time: '05:55',
          end_time: '07:35',
          end_date: '2019-07-22',
          auth: []
        },
        {
          id: 107532677349582,
          coach_name: '闵行门店的私教3',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-22',
          start_time: '19:00',
          end_time: '19:40',
          end_date: '2019-07-22',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 96055669096767,
          coach_name: '团课教练汤汤测试勿动',
          member_id: 77159390052771,
          member_name: '汤汤汤测试',
          course_name: '汤汤好私教',
          consume_name: '范围内的课程（汤汤好私教）',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-27',
          start_time: '09:40',
          end_time: '11:20',
          end_date: '2019-07-27',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 100256717537549,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '核心马杀鸡',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-26',
          start_time: '16:38',
          end_time: '17:08',
          end_date: '2019-07-26',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 101853925278289,
          coach_name: '闵行店私教教练1',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '闵行店的健美操',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-22',
          start_time: '13:39',
          end_time: '14:29',
          end_date: '2019-07-22',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349444,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '06:18',
          end_time: '06:58',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349445,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '00:18',
          end_time: '00:58',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349446,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '01:18',
          end_time: '01:58',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349581,
          coach_name: '闵行店私教教练1',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '汤汤好私教',
          consume_name: '固定课程（汤汤好私教）',
          reserve_status: 3,
          is_checkin: 1,
          start_date: '2019-07-22',
          start_time: '05:55',
          end_time: '07:35',
          end_date: '2019-07-22',
          auth: []
        },
        {
          id: 107532677349582,
          coach_name: '闵行门店的私教3',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-22',
          start_time: '19:00',
          end_time: '19:40',
          end_date: '2019-07-22',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349589,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '01:58',
          end_time: '02:38',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349592,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '04:58',
          end_time: '05:38',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        },
        {
          id: 107532677349593,
          coach_name: '丝绒',
          member_id: 56635117076730,
          member_name: '汤汤测试用户617',
          course_name: '丝绒私教课测试',
          consume_name: '不限课程的课程包',
          reserve_status: 3,
          is_checkin: 0,
          start_date: '2019-07-24',
          start_time: '02:38',
          end_time: '03:18',
          end_date: '2019-07-24',
          auth: {
            'shop:reserve:personal_course_reserve|del': 1,
            'shop:reserve:personal_course_reserve|checkin': 1
          }
        }
      ]
    }
  },
  computed: {
    startDate() {
      return this.$route.query.start_date || moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    onMouseLeave() {
      console.log('onMouseLeave')
    },
    // 查看详情
    onDetail(info) {
      console.log(info)
    },
    // 批量排期
    onClickScheduleInBatch() {
      that.$modalRouter.push({
        name: 'schedule-team-add-course-schedule-batch',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    // 复制排期
    onClickCopySchedule() {
      that.$modalRouter.push({
        name: 'schedule-team-copy-schedule',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.query, force: true })
    }
  }
}
</script>

<style scoped>
.zlx {
  width: 100px;
  height: 100px;
  background: #3e4;
}
</style>
