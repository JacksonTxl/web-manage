<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-date-picker style="width: 160px" format="YYYY-MM-DD" @change="courseName"/>
        <a-select
          style="width: 160px;margin-left:12px"
          placeholder="课程类型"
          v-model="value.reserve_type"
        >
          <a-select-option :value="1">团课</a-select-option>
          <a-select-option :value="2">私教课</a-select-option>
          <a-select-option :value="3">私教小班课</a-select-option>
        </a-select>
        <a-select
          style="width: 160px;margin-left:12px"
          placeholder="预约状态"
          v-model="value.reserve_status"
        >
          <a-select-option :value="-1">全部预约状态</a-select-option>
          <a-select-option :value="1">预约失败</a-select-option>
          <a-select-option :value="2">候补中</a-select-option>
          <a-select-option :value="3">候补成功</a-select-option>
          <a-select-option :value="4">取消预约</a-select-option>
        </a-select>
        <a-select
          style="width: 160px;margin-left:12px"
          placeholder="签到状态"
          v-model="value.checkin_status"
        >
          <a-select-option :value="-1">全部签到状态</a-select-option>
          <a-select-option :value="1">为签到</a-select-option>
          <a-select-option :value="2">已签到</a-select-option>
        </a-select>
        <st-input-search
          placeholder="请输入课程名称"
          style="width: 290px;float: right;"
          @search="courseName1"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
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
