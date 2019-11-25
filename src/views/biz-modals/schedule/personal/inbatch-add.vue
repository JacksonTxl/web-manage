<template>
  <st-modal
    title="批量排期"
    v-model="show"
    wrapClassName="modal-schedule-inbatch-add"
  >
    <st-form>
      <st-form-item required>
        <template slot="label">
          应用日期
          <st-help-tooltip id="TSPT001" />
        </template>
        <a-range-picker
          @change="onChangeRangePicker"
          :disabledDate="disabledDate"
        ></a-range-picker>
      </st-form-item>
      <st-form-item
        labelWidth="88px"
        :label="`${$c('coach')}：`"
        labelAuto
        required
      >
        <a-select
          :placeholder="`请选择${$c('coach')}`"
          mode="multiple"
          v-model="coachId"
        >
          <a-select-option
            v-for="coach in coachOptions"
            :key="coach.id"
            :value="coach.id"
          >
            {{ coach.staff_name }}
          </a-select-option>
        </a-select>
        <div class="color-danger">建议选择{{ $c('coach') }}数不超过4人</div>
      </st-form-item>
    </st-form>
    <div class="modal-schedule__time modal-reserve-schedule__time mg-t16">
      <st-container>
        <a-row class="time-header">
          <a-col :lg="3">
            <span class="time-header__label mg-l8">时间段</span>
          </a-col>
          <a-col :lg="21" class="time-heade-wrapper">
            <a-col class="time-header__value" :lg="6">00:00</a-col>
            <a-col class="time-header__value" :lg="6">06:00</a-col>
            <a-col class="time-header__value" :lg="6">12:00</a-col>
            <a-col class="time-header__value" :lg="6">18:00</a-col>
            <a-col class="time-header__value" :lg="6">24:00</a-col>

            <!-- <a-col :lg="6" class="time-header__value last">
              <span>18:00</span>
              <span class="mg-r8">24:00</span>
            </a-col> -->
          </a-col>
        </a-row>
        <a-row
          class="time-item mg-t48"
          v-for="info in schedule_info"
          :key="info.time_type"
        >
          <a-col :lg="2">
            <span>{{ info.time_type | filterDate }}</span>
          </a-col>
          <a-col :lg="22">
            <schedule-time-picker
              v-model="info.timing"
              :key="info.time_type"
            ></schedule-time-picker>
          </a-col>
        </a-row>
      </st-container>
    </div>
    <slot name="footer" slot="footer">
      <st-button @click="show = false">取消</st-button>
      <st-button
        @click="save"
        :loading="loading.addScheduleInBatch"
        type="primary"
      >
        确定
      </st-button>
    </slot>
  </st-modal>
</template>

<script>
import { PersonalScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/personal/service#/schedule.service'
import { PersonalScheduleCommonService } from '@/views/pages/shop/product/course/schedule/personal/service#/common.service'
import ScheduleTimePicker from '@/views/biz-components/schedule-time-picker/schedule-time-picker'
export default {
  name: 'AddScheduleInBatch',
  components: {
    ScheduleTimePicker
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
      start: '',
      end: '',
      schedule_info: [
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
  filters: {
    filterDate(val) {
      const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return `${weekList[val]}`
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
        schedule_info: this.schedule_info
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
