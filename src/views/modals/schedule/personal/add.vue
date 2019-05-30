<template>
  <st-modal class="modal-add-schedule" okText="确定保存" title="添加排期" @ok="save" v-model="show">
    <st-form>
      <st-form-item labelWidth="42px" label="教练：" required>
        <a-select placeholder="请选择教练" v-model="coachId">
          <a-select-option v-for="coach in coachOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
        </a-select>
      </st-form-item>
    </st-form>
    <div class="modal-add-schedule__time">
      <st-shop-hour-picker></st-shop-hour-picker>
      <st-button class="copy" @click="onClickCopySchedule">复制上周</st-button>
    </div>

  </st-modal>
</template>

<script>
import { AddService } from './add.service'
import { MessageService } from '@/services/message.service'
import { PersonalScheduleCommonService as CommonService } from '../../../pages/shop/product/course/schedule/personal.service#/common.service'
import { PersonalScheduleScheduleService as ScheduleService } from '../../../pages/shop/product/course/schedule/personal.service#/schedule.service'
export default {
  serviceInject() {
    return {
      service: AddService,
      messageService: MessageService,
      commonService: CommonService,
      scheduleService: ScheduleService
    }
  },
  rxState() {
    return {
      coachOptions: this.commonService.coachOptions$ || []
    }
  },
  data() {
    return {
      show: false,
      coachId: ''
    }
  },
  methods: {
    onClickCopySchedule() {
      this.scheduleService.curd('copy', { id: this.coachId }, () => {
        this.messageService.success({ content: '复制成功' })
      })
    },
    save() {
      let reqdata = {
        coach_id: this.coachId,
        schedule_info: [
          {
            timing: [
              {
                start_time: '20:00:00',
                end_time: '22:00:00'
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
                start_time: '14:00:00',
                end_time: '16:00:00'
              },
              {
                start_time: '13:00:00',
                end_time: '14:00:00'
              }
            ]
          },
          {
            timing: [
              // {
              //   start_time: '10:00:00',
              //   end_time: '12:00:00'
              // },
              // {
              //   start_time: '13:00:00',
              //   end_time: '14:00:00'
              // }
            ]
          },
          {
            timing: [
              // {
              //   start_time: '10:00:00',
              //   end_time: '12:00:00'
              // },
              // {
              //   start_time: '13:00:00',
              //   end_time: '14:00:00'
              // }
            ]
          },
          {
            timing: [
              // {
              //   start_time: '10:00:00',
              //   end_time: '12:00:00'
              // },
              // {
              //   start_time: '13:00:00',
              //   end_time: '14:00:00'
              // }
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
      this.service.addSchedule(reqdata).subscribe(() => {
        console.log('ok')
        this.messageService.success({ content: '添加成功' })
        this.show = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
