<template>
  <div>
    {{value}}
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-date-picker style="width: 160px"/>
        <a-select style="width: 160px;margin-left:12px">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-select style="width: 160px;margin-left:12px">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>

          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-select style="width: 160px;margin-left:12px">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>

          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <st-input-search
          placeholder="可输入姓名、手机号、卡号"
          style="width: 290px;float: right;"
          v-model="value.course_name"
          @change="courseName"
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
    return {
      form: {
        start_date: '', // 上课日期
        reserve_type: '预约课类型',
        reserve_status: '预约状态',
        checkin_status: '签到状态',
        course_name: '课程名称',
        size: '每页数量',
        page: '当前页'
      }
    }
  },
  methods: {
    courseName(value) {
      console.log('courseName', this.value, value)
      this.$emit('dataChange', this.value)
    },
    handleChange(value) {
      console.log(value)
      console.log(`selected ${value}`)
    }
  }
}
</script>
