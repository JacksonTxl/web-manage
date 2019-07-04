<template>
  <st-modal class="modal-add-schedule" okText="确定保存" title="添加排期" @ok="save" v-model="show">
    <st-form :form="form">
      <st-form-item labelWidth="42px" label="教练：" required>
        <a-select placeholder="请选择教练" v-model="coachId">
          <a-select-option v-for="coach in coachOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
        </a-select>
      </st-form-item>
    </st-form>
    <div class="modal-add-schedule__time">
      <div class="time-item" v-for="info in schedule_info" :key="info.time_type">
        <span>{{info.time_type | filterDate}}</span> <st-time-picker class="mg-b32" v-model="info.timing" :key="info.time_type"></st-time-picker>
      </div>
      <st-button class="copy" @click="onClickCopySchedule">复制上周</st-button>
    </div>

  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'

import { PersonalScheduleScheduleService as ScheduleService } from '../../../pages/shop/product/course/schedule/personal.service#/schedule.service'
import { PersonalScheduleCommonService } from '../../../pages/shop/product/course/schedule/personal.service#/common.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      commonService: PersonalScheduleCommonService,
      scheduleService: ScheduleService
    }
  },
  rxState() {
    console.log(this.commonService)
    return {
      coachOptions: this.commonService.coachOptions$ || []
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      coachId: '',
      schedule_info: [{
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
  filters: {
    filterDate(val) {
      const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      return `${weekList[val]}`
    }
  },
  methods: {
    onClickCopySchedule() {
      if (this.coachId) {
        this.scheduleService.copy({ id: this.coachId }).subscribe()
      } else {
        this.messageService.error({ content: '请选择教练' })
      }
    },
    save() {
      let reqdata = {
        coach_id: this.coachId,
        schedule_info: this.schedule_info
      }
      this.scheduleService.add(reqdata).subscribe(() => {
        this.messageService.success({ content: '添加成功' })
        this.show = false
      })
    }
  }
}
</script>
