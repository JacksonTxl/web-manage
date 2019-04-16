<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary" @click="addPersonalCourse">+ 新增团体课</st-button>
        <div>
          <a-select></a-select>
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
import { BrandService } from './brand.service'
export default {
  name: 'TeamCourseBrand',
  serviceInject() {
    return {
      brandService: BrandService
    }
  },
  subscriptions() {
    return {
      teamCourseList: this.brandService.teamCourseList$
    }
  },
  components: {
    TeamTable
  },
  methods: {
    addPersonalCourse() {
      this.$router.push({ name: 'brand-product-course-team-add' })
    }
  }
}
</script>
