<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
          <a-range-picker @change="onChooseDate" format="YYYY-MM-DD"/>
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择门店">
            <a-select-option :value="1">门店1</a-select-option>
            <a-select-option :value="3">门店2</a-select-option>
            <a-select-option :value="2">门店3</a-select-option>
            <a-select-option :value="-1">全部</a-select-option>
          </a-select>
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择课程类型">
            <a-select-option :value="-1">全部课程类型</a-select-option>
            <a-select-option :value="1">团课</a-select-option>
            <a-select-option :value="3">私教课</a-select-option>
            <a-select-option :value="2">私教小班课</a-select-option>
          </a-select>
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择预约状态">
            <a-select-option :value="-1">全部预约状态</a-select-option>
            <a-select-option :value="1">预约失败</a-select-option>
            <a-select-option :value="3">候补中</a-select-option>
            <a-select-option :value="2">预约成功</a-select-option>
            <a-select-option :value="4">取消预约</a-select-option>
          </a-select>
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择签到状态">
            <a-select-option :value="-1">全部签到状态</a-select-option>
            <a-select-option :value="1">未签到</a-select-option>
            <a-select-option :value="2">已签到</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="2"></a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入课程名称" @search="searchCourse"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="courseColums"
          :dataSource="list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
        >
          <template slot="action" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="onCacelAppointment(record)">取消预约</a>
            <a href="javascript:;" @click="onSign(record)">签到</a>
          </template>
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { courseColums } from './columns'
import { CourseService } from './course.service'
export default {
  serviceInject() {
    return {
      service: CourseService
    }
  },
  rxState() {
    return {
      courseInfo: this.service.courseInfo$
    }
  },
  data() {
    return {
      pagination: {
        current: 1,
        pagesize: 10
      },
      courseColums,
      list: [
        {
          id: 1,
          course_time: '2018-01-02 12:22:33',
          course_shop: '上课门店1',
          course_type: '私教课',
          course_name: '减脂操',
          course_coach: '教练111',
          course_status: '已完成',
          course_nums: 11,
          sign_nums: 22
        }
      ]
    }
  },
  mounted() {
    console.log(this.courseInfo)
  },
  methods: {
    // 取消预约
    onCacelAppointment(e) {
      console.log('取消预约', e)
    },
    // 签到
    onSign(e) {
      console.log('签到', e)
    },
    pageChange(e) {
      consoel.log(e)
    },
    onChooseDate(e) {
      console.log(e)
    },
    searchCourse(e) {
      console.log('查询课程名称', e)
    }
  }
}
</script>
