<template>
  <div>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
          <a-range-picker @change="onChooseDate" format="YYYY-MM-DD"/>
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择门店" @change="onSelectShop">
            <a-select-option :value="1">门店1</a-select-option>
            <a-select-option :value="3">门店2</a-select-option>
            <a-select-option :value="2">门店3</a-select-option>
            <a-select-option :value="-1">全部</a-select-option>
          </a-select>
          <a-select style="width: 160px;margin-left:12px" :defaultValue="-1" placeholder="请选择预约状态"  @change="onSelectStatus">
            <a-select-option :value="-1">全部预约状态</a-select-option>
            <a-select-option :value="1">预约失败</a-select-option>
            <a-select-option :value="3">候补中</a-select-option>
            <a-select-option :value="2">预约成功</a-select-option>
            <a-select-option :value="4">取消预约</a-select-option>
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
          :dataSource="courseInfo.list"
          :scroll="{ x: 1750}"
          @change="pageChange"
          :pagination="pagination"
        >
          <template slot="action" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="onSearchDetail(record)">详情</a>
          </template>
          <template slot="course_name" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goCourseDetai(record)">{{ text }}</a>
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
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.meta.query.id
    this.pagination.total = this.courseInfo.page.total_counts
  },
  methods: {
    goCourseDetai(e) {
      console.log('跳转到课程详情', e)
    },
    // 选择课程状态
    onSelectStatus(e) {
      this.$router.push({
        query: {
          id: this.id,
          shop_id: e
        },
        force: true
      })
    },
    // 选择门店
    onSelectShop(e) {
      console.log('门店', e)
      this.$router.push({
        query: {
          id: this.id,
          shop_id: e
        },
        force: true
      })
    },
    // 查看详情 点击弹出预约详情弹窗，同【门店-课程排期-团体课】、【门店-课程排期-私教1v1】、【门店-课程排期-私教小团课】
    onSearchDetail(e) {
      console.log(e)
    },
    // 分页
    pageChange(pagination) {
      consoel.log(e)
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.$router.push({
        query: {
          id: this.id,
          page: pagination.current,
          size: pagination.pageSize
        },
        force: true
      })
    },
    // 日期选择
    onChooseDate(e) {
      console.log(e)
      this.$router.push({
        query: {
          id: this.id,
          start_time_first: moment(e[0]).format('YYYY-MM-DD'),
          start_time_last: moment(e[1]).format('YYYY-MM-DD')
        },
        force: true
      })
    },
    // 查询
    searchCourse(e) {
      console.log('查询课程名称', e)
      this.$router.push({
        query: {
          id: this.id,
          course_name: e
        },
        force: true
      })
    }
  }
}
</script>
