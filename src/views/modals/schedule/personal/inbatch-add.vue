<template>
  <st-modal title="批量排期" @ok="save" v-model="show">
    <st-form>
      <st-form-item  label="应用日期" required>
        <a-range-picker @change="onChangeRangePicker" :disabledDate="disabledDate"></a-range-picker>
      </st-form-item>
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

    </div>
  </st-modal>
</template>n

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
      end: '',
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
    disabledDate(currentDate) {
      // 往前推30天时间不可选 往后推60天不可选
      const current = moment().valueOf()
      return currentDate.valueOf() < (current - 24 * 3600 * 30 * 1000) || (current + 24 * 3600 * 60 * 1000) < currentDate.valueOf()
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
