<template>
  <st-modal
    class="modal-schedule modal-schedule-add"
    okText="确定保存"
    title="添加排期"
    @ok="save"
    v-model="show"
  >
    <st-form :form="form">
      <st-form-item labelWidth="42px" label="教练：" required>
        <a-select placeholder="请选择教练" v-model="coachId">
          <a-select-option
            v-for="coach in coachOptions"
            :key="coach.id"
            :value="coach.id"
          >
            {{ coach.staff_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
    </st-form>
    <div class="copy-button-box mg-t16">
      <st-button class="copy-button" @click="onClickCopySchedule">
        复制上周
      </st-button>
    </div>
    <div class="modal-schedule__time modal-add-schedule__time mg-t16">
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
        <a-row
          class="time-item mg-t48"
          v-for="(info, index) in schedule_info"
          :key="info.time_type"
        >
          <a-col :lg="2">
            <span>{{ index | filterDate }}</span>
          </a-col>
          <a-col :lg="22">
            <st-time-picker
              v-model="info.timing"
              :key="info.time_type"
            ></st-time-picker>
          </a-col>
        </a-row>
      </st-container>
    </div>
  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'

import { PersonalScheduleScheduleService as ScheduleService } from '../../../pages/shop/product/course/schedule/personal.service#/schedule.service'
import { PersonalScheduleCommonService } from '../../../pages/shop/product/course/schedule/personal.service#/common.service'
import { RouteService } from '@/services/route.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService,
      commonService: PersonalScheduleCommonService,
      scheduleService: ScheduleService,
      routeService: RouteService
    }
  },
  rxState() {
    console.log(this.commonService)
    return {
      query: this.routeService.query$,
      coachOptions: this.commonService.coachOptions$ || []
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      coachId: '',
      schedule_info: [
        {
          timing: []
        },
        {
          timing: []
        },
        {
          timing: []
        },
        {
          timing: []
        },
        {
          timing: []
        },
        {
          timing: []
        },
        {
          timing: []
        }
      ]
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
        this.$router.push({ query: this.routeService.query$, force: true })
        this.show = false
      })
    }
  }
}
</script>
