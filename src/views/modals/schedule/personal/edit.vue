<template>
  <st-modal class="modal-schedule-edit" title="编辑排期" @ok="onOkSave" v-model="show">
    <div class="modal-schedule-edit__info">
      <div class="coach">
        <span>上课教练:</span><span>{{scheduleInfo.staff_name}}</span>
      </div>
      <div class="time">
        {{rangeTime}}
      </div>
    </div>
    <div class="modal-add-schedule__time">
      <st-shop-hour-picker></st-shop-hour-picker>
      <st-button class="copy" @click="onClickCopySchedule">复制上周</st-button>
    </div>
  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'
import { PersonalScheduleScheduleService } from '../../../pages/shop/product/course/schedule/personal.service#/schedule.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      scheduleService: PersonalScheduleScheduleService
    }
  },
  data() {
    return {
      show: false,
      scheduleInfo: {}
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
        id: 33,
        schedule_info: [
          {
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          },
          {
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          },
          {
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          },
          {
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          },
          {
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          },
          {
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          },
          {
            timing: [
              {
                start_time: '10:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          }
        ]
      }
      this.scheduleService.update(date).subscribe(res => {
        console.log('ok', res)
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
        console.log('ok', res)
        this.scheduleInfo = res.info
      })
    }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
