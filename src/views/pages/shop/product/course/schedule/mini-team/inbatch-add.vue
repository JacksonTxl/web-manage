<template>
  <st-panel>
    <div :class="b()">
      <st-form :class="b('head')" labelWidth="80px">
        <st-form-item label="小班课名称" required>
          <a-select placeholder="请选择" v-model="coachId">
            <a-select-option
              v-for="coach in coachOptions"
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
            <a-select-option key="2" value="2">
              自定义排课方式
            </a-select-option>
          </a-select>
        </st-form-item>
      </st-form>
      <div :class="b('schedule')">
        <st-container>
          <st-form labelWidth="80px">
            <st-form-item required label="上课周期" :class="b('select__date')">
              <a-range-picker
                @change="onChangeRangePicker"
                :disabledDate="disabledDate"
              ></a-range-picker>
            </st-form-item>
          </st-form>
          <div :class="b('schedule__table')">
            <div
              :class="b('schedule__item')"
              v-for="(item, index) in weekList"
              :key="index"
            >
              <st-t4>{{ item }}</st-t4>
              <div :class="b('schedule__card')">
                <span class="time">
                  <st-icon type="timer"></st-icon>
                  11:30-12:30
                </span>
                <st-t3 class="course__name">训练</st-t3>
                <p class="course__coach">
                  {{ $c('coach') }}：
                  <span>狼狼</span>
                </p>
                <p class="course__scene">
                  场地
                  <span>VIP场地</span>
                </p>
              </div>
              <st-button
                block
                type="dashed"
                icon="add"
                @click="addCourse('team')"
                class="mg-t10"
              >
                添加课程
              </st-button>
            </div>
          </div>
          <div :class="b('schedule__tips')">
            即：上课时间为
            <span class="schedule__tips-date">2019/7/11~2019/7/18</span>
            <span class="schedule__tips-time">每周一9: 00,</span>
            <span class="schedule__tips-num">共8节</span>
          </div>
        </st-container>
        <div>新增上课周期</div>
        <div>
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
import { PersonalScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/personal/service#/schedule.service'
import { PersonalScheduleCommonService } from '@/views/pages/shop/product/course/schedule/personal/service#/common.service'
export default {
  name: 'AddScheduleInBatch',
  bem: {
    b: 'page-shop-schedule-inbatch-add'
  },
  serviceInject() {
    return {
      commonService: PersonalScheduleCommonService,
      scheduleService: PersonalScheduleScheduleService
    }
  },
  rxState() {
    return {
      loading: this.scheduleService.loading$,
      coachOptions: this.commonService.coachInBatchOptions$
    }
  },
  data() {
    return {
      show: false,
      coachId: undefined,
      scheduleId: undefined,
      start: '',
      end: '',
      weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      scheduleInfo: [
        {
          time_type: 1,
          timing: []
        },
        {
          time_type: 2,
          timing: []
        },
        {
          time_type: 3,
          timing: []
        },
        {
          time_type: 4,
          timing: []
        },
        {
          time_type: 5,
          timing: []
        },
        {
          time_type: 6,
          timing: []
        },
        {
          time_type: 0,
          timing: []
        }
      ]
    }
  },
  methods: {
    disabledDate(currentDate) {
      // 往前推30天时间不可选 往后推60天不可选
      const current = moment().valueOf()
      return (
        currentDate.valueOf() < current - 24 * 3600 * 30 * 1000 ||
        current + 24 * 3600 * 60 * 1000 < currentDate.valueOf()
      )
    },
    onChangeRangePicker(val) {
      this.start = val[0].format('YYYY-MM-DD').valueOf()
      this.end = val[1].format('YYYY-MM-DD').valueOf()
    },
    save() {
      let reqdata = {
        id: this.coachId,
        schedule_start_time: this.start,
        schedule_end_time: this.end,
        scheduleInfo: this.scheduleInfo
      }
      this.scheduleService.addScheduleInBatch(reqdata).subscribe(() => {
        this.show = false
        this.$router.push({
          query: {
            ...this.$searchQuery
          }
        })
      })
    }
  }
}
</script>
