<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-date-picker
          style="width: 160px"
          format="YYYY-MM-DD"
          @change="courseName"
        />
        <a-select
          style="width: 160px;margin-left:12px"
          placeholder="课程类型"
          :options="reserveTypeOptions"
          v-model="value.reserve_type"
        ></a-select>
        <a-select
          style="width: 160px;margin-left:12px"
          placeholder="预约状态"
          v-model="value.reserve_status"
          :options="reserveStatusOptions"
        ></a-select>
        <a-select
          style="width: 160px;margin-left:12px"
          placeholder="签到状态"
          :options="reserveCheckinOptions"
          v-model="value.checkin_status"
        ></a-select>
        <st-input-search
          placeholder="请输入课程名称"
          style="float: right;"
          @search="courseName1"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
export default {
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    /**
     * @type {UserService}
     */
    const userService = this.userService
    return {
      reserveTypeOptions: userService.getOptions$('reserve.reserve_type', {
        addAll: '全部预约类型'
      }),
      reserveStatusOptions: userService.getOptions$('reserve.reserve_status', {
        addAll: '全部预约状态'
      }),
      reserveCheckinOptions: userService.getOptions$('reserve.is_checkin', {
        addAll: '签到状态'
      })
    }
  },
  name: 'formData',
  model: {
    prop: 'value',
    event: 'dataChange'
  },
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    courseName(value, time) {
      this.value.start_date = time
      this.$emit('dataChange', this.value)
    },
    courseName1(value, time) {
      this.value.course_name = value
      this.$emit('dataChange', this.value)
    }
  }
}
</script>
