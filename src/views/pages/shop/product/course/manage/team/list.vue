<template>
  <st-panel
    app>
    <div slot="actions">
      <st-input-search placeholder="团课名称" v-model="query.courseName" @search="onSearchCourseName"></st-input-search>
    </div>
    <a-row>
      <a-col :span="20">
        <st-button type="primary" @click="onClickAddCourse">新增门店团体课程</st-button>
      </a-col>
      <a-col :span="4">
        <a-select class="mg-r8" v-model="query.category_id" style="width: 160px" @change="onChange">
          <a-select-option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.setting_name}}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <shop-table @delete-course="deleteCourse" :teamCourseList="teamCourseList"></shop-table>
  </st-panel>
</template>
<script>
import ShopTable from './list#/shop-table'
import { ListService } from './list.service'
import { RouteService } from '../../../../../../../services/route.service'
export default {
  name: 'TeamCourseList',
  serviceInject() {
    return {
      routeService: RouteService,
      listService: ListService
    }
  },
  components: {
    ShopTable
  },
  rxState() {
    return {
      query: this.routeService.query$,
      shopsOptions: this.listService.shopSelectOptions$,
      categoryList: this.listService.categoryList$,
      teamCourseList: this.listService.teamCourseList$
    }
  },
  methods: {
    onClickAddCourse() {
      this.$router.push({ name: 'shop-product-course-manage-team-add' })
    },
    onSearchCourseName(val) {
      this.$router.push({ query: this.query })
    },
    deleteCourse(course) {
      this.listService.deleteCourse(course.id).subscribe()
    },
    onChange() {
      this.$router.push({ query: this.query })
    }
  }
}
</script>
