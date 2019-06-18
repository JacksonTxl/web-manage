<template>
  <st-modal title="批量排期" @ok="save" v-model="show">
    <st-form>
      <st-form-item  label="应用日期" required>
        <a-range-picker @change="onChangeRangePicker" ></a-range-picker>
      </st-form-item>
      <st-form-item labelWidth="42px" label="教练：" required>
        <a-select placeholder="请选择教练" v-model="coachId">
          <a-select-option v-for="coach in coachOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
        </a-select>
      </st-form-item>
    </st-form>
    <div class="modal-add-schedule__time">
      <st-shop-hour-picker></st-shop-hour-picker>
    </div>
  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'
import { PersonalScheduleScheduleService } from '../../../pages/shop/product/course/schedule/personal.service#/schedule.service'
import { PersonalScheduleCommonService } from '../../../pages/shop/product/course/schedule/personal.service#/common.service'
export default {
  name: 'AddScheduleInBatch',
  serviceInject() {
    return {
      commonService: PersonalScheduleCommonService,
      scheduleService: PersonalScheduleScheduleService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      coachOptions: this.commonService.coachInBatchOptions$
    }
  },
  data() {
    return {
      show: false,
      coachId: '',
      start: '',
      end: ''
    }
  },
  methods: {
    onChangeRangePicker(val) {
      console.log(val)
      this.start = val[0].format('YYYY-MM-DD').valueOf()
      this.end = val[1].format('YYYY-MM-DD').valueOf()
    },
    save() {
      let reqdata = {
        id: this.coachId,
        schedule_start_time: this.start,
        schedule_end_time: this.end,
        schedule_info: [
          {
            time_type: 0,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '10:00:00'
              },
              {
                start_time: '20:00:00',
                end_time: '22:00:00'
              }
            ]
          },
          {
            time_type: 1,
            timing: [
              {
                start_time: '11:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '14:00:00',
                end_time: '15:00:00'
              }
            ]
          },
          {
            time_type: 2,
            timing: [
            ]
          },
          {
            time_type: 3,
            timing: [
              {
                start_time: '08:00:00',
                end_time: '09:00:00'
              },
              {
                start_time: '11:00:00',
                end_time: '13:00:00'
              }
            ]
          },
          {
            time_type: 4,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '10:00:00'
              },
              {
                start_time: '19:00:00',
                end_time: '20:00:00'
              }
            ]
          },
          {
            time_type: 5,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '10:00:00'
              },
              {
                start_time: '15:00:00',
                end_time: '16:00:00'
              }
            ]
          },
          {
            time_type: 6,
            timing: [
              {
                start_time: '09:00:00',
                end_time: '12:00:00'
              },
              {
                start_time: '20:00:00',
                end_time: '21:00:00'
              }
            ]
          }
        ]
      }
      this.scheduleService.addScheduleInBatch(reqdata).subscribe(() => {
        console.log('ok')
        this.messageService.success({ content: '添加成功' })
        this.show = false
        // this.$router.push({ query: {
        //   size: 51,
        //   page: 1
        // },
        // force: true })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
