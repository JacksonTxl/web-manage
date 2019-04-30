<template>
  <st-panel class="page-shop-sale-list-brand">
    <div slot="title">
      <st-input-search v-model="query.course_name" @search="onChange" placeholder="私教课名称" style="width:292px"></st-input-search>
    </div>
    <header>
      <div class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation">
        <st-button type="primary"
          @click="addPersonalCourse">+ 新增私教课</st-button>
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
      <list-table @delete-course="onDeleteCourse" :personalCourseList="personalCourseList"></list-table>
    </main>
  </st-panel>
</template>

<script>
import ListTable from './list#/list-table'
import { RouteService } from '../../../../../../../services/route.service'
import { ListService } from './list.service'
export default {
  name: 'PersonalCourseListInShop',
  serviceInject() {
    return {
      listService: ListService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      categoryList: this.listService.categoryList$,
      personalCourseList: this.listService.personalCourseList$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      courseStatus: [{ label: '有效', value: 1 }, { label: '无效', value: 0 }]
    }
  },
  components: {
    ListTable
  },
  methods: {
    onChange() {
      this.$router.push({ query: this.query })
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
