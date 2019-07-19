<template>
  <div>
    <a-row class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
          <a-select style="width: 160px;margin-right:12px" :defaultValue="-1" placeholder="请选择课程状态"  @change="onSingleSearch('schedule_status', $event)">
            <a-select-option :value="-1">全部预约状态</a-select-option>
            <a-select-option :value="1">预约失败</a-select-option>
            <a-select-option :value="3">候补中</a-select-option>
            <a-select-option :value="2">预约成功</a-select-option>
            <a-select-option :value="4">取消预约</a-select-option>
          </a-select>
          <a-range-picker @change="onChooseDate" format="YYYY-MM-DD"/>
        </a-col>
        <a-col :lg="2"></a-col>
        <a-col :lg="6">
          <st-input-search placeholder="请输入课程名称" @search="onSingleSearch('course_name', $event)"/>
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="courseColums"
          :dataSource="courseInfo"
          :scroll="{ x: 1000}"
          :loading="loading.getCoursesList"
          :page="page"
          rowKey="id"
          @change="onTableChange"
        >
          <template slot="schedule_status" slot-scope="text, record">
            <!-- 课程状态 -->
            {{record.schedule_status.name}}
          </template>
          <template slot="course_type" slot-scope="text, record">
            <!-- 课程类型 -->
            {{record.course_type.name}}
          </template>
          <template slot="action" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="onSearchDetail(record)">详情</a>
          </template>
          <!-- <template slot="course_name" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goCourseDetai(record)">{{ text }}</a>
          </template> -->
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { courseColums } from './columns.config'
import { CourseService } from './course.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'

export default {
  mixins: [ tableMixin ],
  serviceInject() {
    return {
      service: CourseService,
      routerService: RouteService
    }
  },
  rxState() {
    return {
      courseInfo: this.service.courseInfo$,
      loading: this.service.loading$,
      page: this.service.page$,
      query: this.routerService.query$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: { courseColums },
  mounted() {
    this.id = this.$route.meta.query.id
  },
  methods: {
    goCourseDetai(e) {
      console.log('跳转到课程详情', e)
      let course_type = e.course_type
      let course_id = e.course_id
      let routeMap = {
        1: {
          name: 'shop-product-course-team-info',
          query: {
            id: course_id
          }
        },
        2: {
          name: 'shop-product-course-personal-info',
          query: {
            id: course_id
          }
        },
        3: {
          name: 'shop-product-course-personal-team-info',
          query: {
            id: course_id
          }
        }
      }
      this.$router.push(routeMap[course_type])
    },
    // 查看详情 点击弹出预约详情弹窗，同【门店-课程排期-团体课】、【门店-课程排期-私教1v1】、【门店-课程排期-私教小团课】
    onSearchDetail(e) {
      console.log('查看详情', e)
      let course_type = e.course_type.id
      console.log(course_type, typeof course_type)
      switch (course_type) {
        case 1:
          this.$modalRouter.push({
            name: 'schedule-team-reserve-info',
            props: {
              id: e.id
            },
            on: {
              ok: res => {
                console.log(res)
              }
            }
          })
          break
        case 2:
          this.$modalRouter.push({
            name: 'schedule-personal-reserve-info',
            props: {
              id: e.id
            },
            on: {
              ok: res => {
                console.log(res)
              }
            }
          })
          break
        case 3:
          this.$modalRouter.push({
            name: 'schedule-personal-team-reserve-info',
            props: {
              id: e.id
            },
            on: {
              ok: res => {
                console.log(res)
              }
            }
          })
          break
      }
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
    }
  }
}
</script>
