<template>
  <div>
    <a-row class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="16">
          <shop-select
            class="mg-r8"
            style="width: 160px"
            v-model="query.shop_id"
            @change="onSingleSearch('shop_id', $event)"
          ></shop-select>
          <a-range-picker
            class="mg-r8"
            @change="onChooseDate"
            format="YYYY-MM-DD"
          />
          <a-select
            style="width: 160px;"
            :defaultValue="-1"
            placeholder="请选择预约状态"
            @change="onSingleSearch('schedule_status', $event)"
          >
            <a-select-option :value="-1">全部预约状态</a-select-option>
            <a-select-option :value="1">预约失败</a-select-option>
            <a-select-option :value="3">候补中</a-select-option>
            <a-select-option :value="2">预约成功</a-select-option>
            <a-select-option :value="4">取消预约</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="2"></a-col>
        <a-col :lg="6">
          <st-input-search
            placeholder="请输入课程名称"
            @search="onSingleSearch('course_name', $event)"
          />
        </a-col>
      </a-col>
      <a-col :lg="24" class="mg-t16">
        <st-table
          :columns="courseColums"
          :dataSource="courseInfo"
          :scroll="{ x: 1000 }"
          :loading="loading.getCoursesList"
          :page="page"
          rowKey="id"
          @change="onTableChange"
        >
          <template slot="schedule_status" slot-scope="text, record">
            <!-- 课程状态 -->
            {{ record.schedule_status.name }}
          </template>
          <template slot="course_type" slot-scope="text, record">
            <!-- 课程类型 -->
            {{ record.course_type.name }}
          </template>
          <template slot="course_name" slot-scope="text, record">
            <a href="javascript:;" class="mg-r8" @click="goCourseDetai(record)">
              {{ text }}
            </a>
          </template>
          <!-- <template slot="action" slot-scope="text, record">
            <st-table-actions>
              <a href="javascript:;" class="mg-r8" @click="onSearchDetail(record)">详情</a>
            </st-table-actions>
          </template> -->
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { courseColums } from './columns.config'
import { CourseService } from './course.service'
import { RouteService } from '../../../../../services/route.service'
import ShopSelect from '@/views/biz-components/shop-select'
import tableMixin from '@/mixins/table.mixin'
import SchedulePersonalReserveInfo from '@/views/biz-modals/schedule/personal/reserve-info'
import SchedulePersonalTeamReserveInfo from '@/views/biz-modals/schedule/personal-team/reserve-info'
import ScheduleTeamReserveInfo from '@/views/biz-modals/schedule/team/reserve-info'
export default {
  mixins: [tableMixin],
  modals: {
    SchedulePersonalReserveInfo,
    SchedulePersonalTeamReserveInfo,
    ScheduleTeamReserveInfo
  },
  serviceInject() {
    return {
      service: CourseService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      courseInfo: this.service.courseInfo$,
      loading: this.service.loading$,
      page: this.service.page$,
      reserveStatus: this.service.reserveStatus$
    }
  },
  data() {
    return {
      id: ''
    }
  },
  computed: {
    courseColums
  },
  components: {
    ShopSelect
  },
  created() {
    console.log(this.page)
  },
  methods: {
    goCourseDetai(e) {
      let course_type = e.course_type.id
      let course_id = e.course_id
      if (course_type === 1 || course_type === 2) {
        this.$router.push({
          name: 'brand-product-course-personal-info',
          query: {
            id: course_id
          }
        })
      } else {
        this.$router.push({
          name: 'brand-product-course-team-info',
          query: {
            courseId: course_id
          }
        })
      }
    },
    // 查看详情 点击弹出预约详情弹窗，同【门店-课程排期-团体课】、【门店-课程排期-私教1v1】、【门店-课程排期-私教小团课】
    onSearchDetail(e) {
      console.log(e)
      let course_type = e.course_type.id
      let id = e.id
      switch (course_type) {
        case 1:
          this.$modalRouter.push({
            name: 'schedule-team-reserve-info',
            props: {
              id
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
            name: 'schedule-personal-team-reserve-info',
            props: {
              id
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
            name: 'schedule-personal-reserve-info',
            props: {
              id
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
          id: this.query.id,
          start_time_first: moment(e[0]).format('YYYY-MM-DD'),
          start_time_last: moment(e[1]).format('YYYY-MM-DD')
        },
        force: true
      })
    }
  }
}
</script>
