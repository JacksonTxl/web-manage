<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary"
          @click="addPersonalCourse">+ 新增团体课</st-button>
        <div>
          <a-select  defaultValue="" v-model="query.isAvailable" style="width: 160px" @change="handleChange">
            <a-select-option v-for="status in courseStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
          </a-select>
          <a-select  defaultValue="" v-model="query.category_id" style="width: 160px" @change="handleChange">
            <a-select-option v-for="status in courseStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-brand__table mg-t8">
      <team-table :teamCourseList="teamCourseList"></team-table>
    </main>
  </div>
</template>

<script>
import TeamTable from './brand#/brand-table'
import { RouteService } from '../../../../../../../services/route.service'
import { BrandService } from './brand.service'
export default {
  name: 'TeamCourseBrand',
  serviceInject() {
    return {
      brandService: BrandService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      teamCourseList: this.brandService.teamCourseList$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      courseStatus: [{ label: '所有状态', value: '' }, { label: '有效', value: '1' }, { label: '无效', value: '0' }]
    }
  },
  components: {
    TeamTable
  },
  methods: {
    handleChange() {
      this.$router.push({ query: { ...this.query, courseName: '' } })
    },
    addPersonalCourse() {
      this.$router.push({ name: 'brand-product-course-team-add' })
    }
  }
}
</script>
