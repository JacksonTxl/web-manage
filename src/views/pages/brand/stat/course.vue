<template>
  <div :class="bPage()">
    <div :class="bPage('section')">
      <header :class="bHeader('header')">
        <st-t3 :class="bHeader('title')">
          课程概览
        </st-t3>
        <div :class="bHeader('actions')">
          <shop-select
            :defaultValue="-1"
            class="mg-r12"
            v-model="chartParam.shop_id"
            @change="onChangeChartShop"
          />
          <!-- TODO: 暂时隐藏 -->
          <!-- <st-recent-radio-group
            @change="onChangeChartDays"
          ></st-recent-radio-group> -->
        </div>
      </header>

      <a-row :class="bPage('main')" class="mg-t32 mg-l24">
        <a-col :lg="8" class="main-item">
          <brand-statistics-course-ring
            name="总售课数"
            :height="198"
            tooltipId="TBDAC001"
            :total="soldChartTotal$"
            :data="soldChartData$"
          />
        </a-col>
        <a-col :lg="8" class="main-item">
          <brand-statistics-course-ring
            name="总消课数"
            :height="198"
            tooltipId="TBDAC002"
            :total="checkInCourseTotal$"
            :data="checkInChartData$"
          />
        </a-col>
        <a-col :lg="8" class="main-item">
          <brand-statistics-course-ring
            name="未消课节数"
            :height="198"
            tooltipId="TBDAC003"
            :total="notCheckInCourseTotal$"
            :data="notCheckInChartData$"
          />
        </a-col>
      </a-row>
    </div>
    <st-hr />
    <div :class="bPage('section')">
      <header :class="bHeader('header')">
        <st-t3 :class="bHeader('title')"></st-t3>
        <div :class="bHeader('actions')">
          <shop-select
            v-model="$searchQuery.shop_id"
            @change="onSingleSearch('shop_id', $event)"
            class="mg-r12"
          />
          <st-recent-radio-group
            @change="onChangeTableDays"
            :value="value"
          ></st-recent-radio-group>
        </div>
      </header>
      <main :class="bPage('mian')" class="mg-t16">
        <st-table
          :loading="loading$.getList"
          :columns="columns"
          :scroll="{ x: 800 }"
          rowKey="stat_date"
          :page="page$"
          @change="onTableChange"
          :dataSource="list$"
        ></st-table>
      </main>
    </div>
  </div>
</template>

<script>
import BrandStatisticsCourseRing from '@/views/biz-components/stat/brand-stat-course-ring'
import shopSelect from '@/views/biz-components/shop-select'
import { CourseService } from './course.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './course.config'
export default {
  name: 'BrandStatCourse',
  mixins: [tableMixin],
  serviceInject() {
    return {
      service: CourseService
    }
  },
  rxState() {
    const {
      list$,
      page$,
      auth$,
      loading$,
      soldChartData$,
      checkInChartData$,
      notCheckInChartData$,
      soldChartTotal$,
      checkInCourseTotal$,
      notCheckInCourseTotal$
    } = this.service
    return {
      list$,
      page$,
      auth$,
      loading$,
      soldChartData$,
      checkInChartData$,
      notCheckInChartData$,
      soldChartTotal$,
      checkInCourseTotal$,
      notCheckInCourseTotal$
    }
  },
  bem: {
    bPage: 'page-brand-stat-course',
    bHeader: 'page-brand-stat-header'
  },
  watch: {},
  data() {
    return {
      chartParam: {
        shop_id: -1,
        day: 7,
        start_date: undefined,
        end_date: undefined
      },
      dataParam: {
        shop_id: -1,
        day: 7
      }
    }
  },
  created() {
    this.getChart()
  },
  computed: {
    columns,
    value() {
      let day = this.$searchQuery.start_date ? 0 : this.$searchQuery.day
      return {
        day,
        start_date: this.$searchQuery.start_date,
        end_date: this.$searchQuery.end_date
      }
    }
  },
  methods: {
    onChangeChartShop(event) {
      this.getChart()
    },
    onChangeChartDays(event) {
      this.chartParam.day = event.recently_day || undefined
      this.chartParam.start_date = event.start_date || undefined
      this.chartParam.end_date = event.end_date || undefined
      this.getChart()
    },
    onChangeTableDays(event) {
      this.$searchQuery.day = event.recently_day || undefined
      this.$searchQuery.start_date = event.start_date || undefined
      this.$searchQuery.end_date = event.end_date || undefined
      this.onSearch()
    },
    getChart() {
      this.service.getChart(this.chartParam).subscribe()
    }
  },
  components: {
    shopSelect,
    BrandStatisticsCourseRing
  }
}
</script>
