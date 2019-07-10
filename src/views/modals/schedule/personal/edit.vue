<template>
  <st-modal title="编辑排期" @ok="onOkSave" v-model="show">
    <div class="modal-schedule-edit">
      <div class="modal-schedule-edit__info">
        <div class="coach">
          <span>上课教练:</span><span>{{staffName}}</span>
        </div>
        <div class="time">
          {{rangeTime}}
        </div>
      </div>
      <div class="copy-button-box mg-t16">
        <st-button class="copy-button" @click="onClickCopySchedule">复制上周</st-button>
      </div>

      <div class="modal-add-schedule__time mg-t16">
        <div class="modal-add-schedule__time" v-if="scheduleInfo.length">
          <st-container>
            <a-row class="time-header">
              <a-col :lg="3">
                <span class="time-header__label mg-l8">时间段</span>
              </a-col>
              <a-col :lg="21">
                <a-col class="time-header__value" :lg="6">00:00</a-col>
                <a-col class="time-header__value" :lg="6">06:00</a-col>
                <a-col class="time-header__value" :lg="6">12:00</a-col>
                <a-col :lg="6" class="time-header__value last">
                  <span>18:00</span>
                  <span class="mg-r8">24:00</span>
                </a-col>
              </a-col>

            </a-row>
            <a-row class="time-item" v-for="info in scheduleInfo" :key="info.time_type">
              <a-col :lg="2">
                <span>{{info.schedule_date | filterDate}}</span>
              </a-col>
              <a-col :lg="22">
                <st-time-picker v-model="info.timing" :key="info.time_type"></st-time-picker>
              </a-col>
            </a-row>
          </st-container>
        </div>
      </div>
    </div>

  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'
import { PersonalScheduleScheduleService } from '../../../pages/shop/product/course/schedule/personal.service#/schedule.service'
export default {
  name: 'EditShchedule',
  serviceInject() {
    return {
      messageService: MessageService,
      scheduleService: PersonalScheduleScheduleService
    }
  },
  data() {
    return {
      show: false,
      staffName: '',
      scheduleInfo: [{
        time_type: 0,
        timing: []
      }, {
        time_type: 1,
        timing: []
      }, {
        time_type: 2,
        timing: []
      }, {
        time_type: 3,
        timing: []
      }, {
        time_type: 4,
        timing: []
      }, {
        time_type: 5,
        timing: []
      }, {
        time_type: 6,
        timing: []
      }]
    }
  },
  props: {
    id: {
      type: Number
    },
    start: {
      type: String,
      default: ''
    }
  },
  filters: {
    filterDate(val) {
      return moment(val).format('dddd').valueOf()
    }
  },
  computed: {
    end() {
      return moment(moment(this.start).valueOf() + 24 * 6 * 3600 * 1000).format('YYYY-MM-DD').valueOf()
    },
    rangeTime() {
      return `${this.start} ~ ${this.end}`
    }
  },
  methods: {
    onOkSave() {
      let date = {
        id: this.id,
        schedule_info: this.scheduleInfo
      }
      this.scheduleService.update(date).subscribe(res => {
        this.messageService.success({ content: '编辑成功' })
        this.show = false
      })
    },
    onClickCopySchedule() {
      this.scheduleService.curd('copy', { id: this.id || 108 }, () => {})
    },
    getInfo() {
      let form = {
        id: this.id,
        start_time: this.start,
        end_time: this.end
      }
      this.scheduleService.getUpdateInfo(form).subscribe(res => {
        this.staffName = res.info.staff_name
        this.scheduleInfo = res.info.coach_info
      })
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
