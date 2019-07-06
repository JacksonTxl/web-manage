<template>
  <div class="page-shop-sale-list-brand">
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button
          icon="add"
          type="primary"
          v-if="auth.add"
          @click="addPersonalCourse"
        >新增团体课</st-button>
        <div>
          <a-select  defaultValue="" v-model="query.category_id" class="mg-r16" style="width: 160px" @change="onChange">
            <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.setting_name}}</a-select-option>
          </a-select>

        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-brand__table mg-t8">
      <team-table @delete-course="onDeleteCourse"></team-table>
    </main>
  </div>
</template>

<script>
import TeamTable from './brand#/brand-table'
import { RouteService } from '@/services/route.service'
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
      query: this.routeService.query$,
      auth: this.brandService.auth$
    }
  },
  data() {
    return {
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
