<template>
  <div :class="bPage()">
    <div :class="bPage('section')">
      <header :class="bPage('header')">
        <st-t3 :class="bPage('title')">
          课程概览
        </st-t3>
        <div :class="bPage('actions')">
          <brand-shop class="mg-r12" @change="onChangeChartShop"></brand-shop>
          <st-recent-radio-group
            @change="onChangeChartDays"
          ></st-recent-radio-group>
        </div>
      </header>

      <a-row :class="bPage('main')" class="mg-t32 mg-l24">
        <a-col :lg="8" class="main-item">
          <brand-statistics-course-ring
            name="总售课节数"
            :height="198"
            tooltipId="TBDAC001"
            :data="soldChartData$"
          />
        </a-col>
        <a-col :lg="8" class="main-item">
          <brand-statistics-course-ring
            name="总消课节数"
            :height="198"
            tooltipId="TBDAC002"
            :data="checkInChartData$"
          />
        </a-col>
        <a-col :lg="8" class="main-item">
          <brand-statistics-course-ring
            name="未消课节数"
            :height="198"
            tooltipId="TBDAC003"
            :data="notCheckInChartData$"
          />
        </a-col>
      </a-row>
    </div>
    <st-hr />
    <div :class="bPage('section')">
      <header :class="bPage('header')">
        <st-t3 :class="bPage('title')"></st-t3>
        <div :class="bPage('actions')">
          <brand-shop class="mg-r12" @change="onChangeTableShop"></brand-shop>
          <st-recent-radio-group
            @change="onChangeTableDays"
          ></st-recent-radio-group>
        </div>
      </header>
      <main :class="bPage('mian')" class="mg-t16">
        <st-table
          :loading="loading$.getList"
          :columns="columns"
          :scroll="{ x: 1800 }"
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
import BrandShop from './components#/brand-shop'
import BrandStatisticsCourseRing from '@/views/biz-components/stat/brand-stat-course-ring'
import { RouteService } from '@/services/route.service'
import { CourseService } from './course.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './course.config'
export default {
  name: 'BrandStatCourse',
  mixins: [tableMixin],
  serviceInject() {
    return {
      service: CourseService,
      routeService: RouteService
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
      notCheckInChartData$
    } = this.service
    return {
      query: this.routeService.query$,
      list$,
      page$,
      auth$,
      loading$,
      soldChartData$,
      checkInChartData$,
      notCheckInChartData$
    }
  },
  bem: {
    bPage: 'page-brand-stat-course'
  },
  watch: {},
  data() {
    return {
      chartParam: {
        shop_id: 0,
        day: 7,
        start_date: undefined,
        end_date: undefined
      },
      dataParam: {
        shop: 0,
        day: 7
      }
    }
  },
  created() {
    this.getChart()
  },
  computed: {
    columns
  },
  methods: {
    onChangeChartShop(event) {
      this.chartParam.shop = event
      this.getChart()
    },
    onChangeChartDays(event) {
      this.chartParam.day = event.recently_day || undefined
      this.chartParam.start_date = event.start_date || undefined
      this.chartParam.end_date = event.end_date || undefined
      this.getChart()
    },
    onChangeTableShop(event) {
      this.query.shop_id = event
      this.onSearch()
    },
    onChangeTableDays(event) {
      this.query.day = event.recently_day || undefined
      this.query.start_date = event.start_date || undefined
      this.query.end_date = event.end_date || undefined
      this.onSearch()
    },
    getChart() {
      this.service.getChart(this.chartParam).subscribe()
    }
  },
  components: {
    BrandShop,
    BrandStatisticsCourseRing
  }
}
</script>
