<template>
  <st-panel>
    <div :class="b()">
      <st-form :class="b('head')" labelWidth="80px">
        <st-form-item label="小班课名称" required>
          <a-select placeholder="请选择" v-model="coachId">
            <a-select-option
              v-for="coach in {}"
              :key="coach.id"
              :value="coach.id"
            >
              {{ coach.staff_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item required label="排课方式">
          <a-select placeholder="请选择" v-model="scheduleId">
            <a-select-option key="1" value="1">
              周排课方式
            </a-select-option>
            <a-select-option key="0" value="0">
              自定义排课方式
            </a-select-option>
          </a-select>
        </st-form-item>
      </st-form>
      <div :class="b('schedule')">
        <st-container v-for="(scheduleItem, i) in scheduleList" :key="i">
          <st-form labelWidth="80px">
            <st-form-item required label="上课周期" :class="b('select__date')">
              <a-range-picker @change="onChangeRangePicker"></a-range-picker>
            </st-form-item>
          </st-form>
          <div :class="b('schedule__table')">
            <div
              :class="b('schedule__item')"
              v-for="(item, index) in weekList"
              :key="index"
            >
              <st-t4 class="mg-b12">{{ item.date }}</st-t4>
              <div
                :class="b('schedule__card')"
                v-for="cardItem in scheduleItem.scheduleInfo[item.item]"
                :key="cardItem.id"
              >
                <span class="time">
                  <st-icon type="timer"></st-icon>
                  {{ cardItem.start_time }}-{{ cardItem.end_time }}
                </span>
                <st-t3 class="course__name">{{ cardItem.course_name }}</st-t3>
                <p class="course__coach">
                  {{ $c('coach') }}：
                  <span>{{ cardItem.coach_name }}</span>
                </p>
                <p class="course__scene">
                  场地：
                  <span>{{ cardItem.court_site_name }}</span>
                </p>
              </div>
              <add-course :item="item"></add-course>
            </div>
          </div>
          <div :class="b('schedule__tips')">
            即：上课时间为
            <span class="schedule__tips-date">2019/7/11~2019/7/18</span>
            <span class="schedule__tips-time">每周一9: 00,</span>
            共
            <span class="schedule__tips-num">8</span>
            节
          </div>
        </st-container>
        <div :class="b('add-schedule-btn')">
          <a v-if="addScheduleFlag" @click="addScheduleWeek">新增上课周期</a>
          <span v-else>新增上课周期</span>
        </div>
        <div :class="b('save-schedule-btn')">
          <st-button>
            保存
          </st-button>
          <st-button type="primary" class="mg-l12">
            完成排课
          </st-button>
        </div>
      </div>
    </div>
  </st-panel>
</template>

<script>
import AddCourse from './add-course'

export default {
  name: 'AddScheduleInBatch',
  bem: {
    b: 'page-shop-schedule-inbatch-add'
  },
  // serviceInject() {
  //   return {
  //     commonService: PersonalScheduleCommonService,
  //     scheduleService: PersonalScheduleScheduleService
  //   }
  // },
  // rxState() {
  //   return {
  //     loading: this.scheduleService.loading$,
  //     coachOptions: this.commonService.coachInBatchOptions$
  //   }
  // },
  // [[{}, {}], [{}, {}]]
  data() {
    return {
      coachId: undefined,
      scheduleId: undefined,
      addScheduleFlag: true,
      start: '',
      end: '',
      weekList: [
        { item: 'date1', date: '周一', show: false },
        { item: 'date2', date: '周二' },
        { item: 'date3', date: '周三' },
        { item: 'date4', date: '周四' },
        { item: 'date5', date: '周五' },
        { item: 'date6', date: '周六' },
        { item: 'date7', date: '周日' }
      ],
      scheduleList: [
        {
          time_type: 1,
          scheduleInfo: {
            date1: [
              {
                id: 1,
                start_date: '2019-05-15',
                start_time: '04:12',
                end_time: '04:12',
                course_name: '小班课测试',
                current_course_name: '小班课测试',
                reserved_num: 1,
                coach_name: '姓名2',
                court_site_name: '场地',
                show: false
              },
              {
                id: 2,
                start_date: '2019-05-15',
                start_time: '04:12',
                end_time: '04:12',
                course_name: '小班课测试',
                current_course_name: '小班课测试',
                reserved_num: 1,
                coach_name: '姓名2',
                court_site_name: '场地'
              }
            ],
            date2: [
              {
                id: 1,
                start_date: '2019-05-15',
                start_time: '04:12',
                end_time: '04:12',
                course_name: '小班课测试',
                current_course_name: '小班课测试',
                reserved_num: 1,
                coach_name: '姓名2',
                court_site_name: '场地'
              },
              {
                id: 2,
                start_date: '2019-05-15',
                start_time: '04:12',
                end_time: '04:12',
                course_name: '小班课测试',
                current_course_name: '小班课测试',
                reserved_num: 1,
                coach_name: '姓名2',
                court_site_name: '场地'
              }
            ]
          }
        }
      ]
    }
  },
  watch: {
    scheduleId(newVal) {
      console.log(newVal)
    }
  },
  created() {
    console.log(this.scheduleList[0].scheduleInfo['date1'])
  },
  methods: {
    onChangeRangePicker(val) {
      this.start = val[0].format('YYYY-MM-DD').valueOf()
      this.end = val[1].format('YYYY-MM-DD').valueOf()
    },
    hide() {
      console.log(111)
      this.weekList[0].show = false
    },
    // 增加课程
    addCourse() {},
    // 新增周期排课
    addScheduleWeek() {
      this.scheduleList.push({ scheduleInfo: {} })
    }
    // save() {
    //   let reqdata = {
    //     id: this.coachId,
    //     schedule_start_time: this.start,
    //     schedule_end_time: this.end,
    //     scheduleInfo: this.scheduleInfo
    //   }
    //   this.scheduleService.addScheduleInBatch(reqdata).subscribe(() => {
    //     this.show = false
    //     this.$router.push({
    //       query: {
    //         ...this.$searchQuery
    //       }
    //     })
    //   })
    // }
  },
  components: {
    AddCourse
  }
}
</script>
