<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary"
          @click="addPersonalCourse">+ 新增团体课</st-button>
        <div>
          <a-select  defaultValue="" v-model="query.category_id" class="mg-r16" style="width: 160px" @change="onChange">
            <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.setting_name}}</a-select-option>
          </a-select>
          <a-select  defaultValue="" v-model="query.is_available" style="width: 160px" @change="onChange">
            <a-select-option v-for="status in courseStatus" :key="status.value" :value="status.value">{{status.label}}</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-brand__table mg-t8">
      <team-table @delete-course="onDeleteCourse" :teamCourseList="teamCourseList"></team-table>
    </main>
  </div>
</template>

<script>
import TeamTable from './brand#/brand-table'
import { RouteService } from '../../../../../../../services/route.service'
import { BrandService } from './brand.service'
import { ListService } from '../list.service'
export default {
  name: 'TeamCourseBrand',
  serviceInject() {
    return {
      brandService: BrandService,
      listService: ListService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      categoryList: this.listService.categoryList$,
      teamCourseList: this.brandService.teamCourseList$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      courseStatus: [{ label: '所有状态', value: -1 }, { label: '有效', value: 1 }, { label: '无效', value: 0 }]
    }
  },
  components: {
    TeamTable
  },
  methods: {
    onChange() {
      this.$router.push({ query: { ...this.query, course_name: '' } })
    },
    onDeleteCourse(record) {
      this.brandService.deleteCourse(record.id).subscribe(() => {
        this.$router.push({ force: true })
      })
    },
    addPersonalCourse() {
      this.$router.push({ name: 'brand-product-course-team-add' })
    }
  }
}
</script>
