<template>
  <st-panel class="page-shop-sale-list-brand">
    <div slot="title">
      <st-input-search
        v-model="query.course_name"
        @search="onChange"
        placeholder="私教课名称"
        style="width:292px"
      ></st-input-search>
    </div>
    <header>
      <div
        class="page-shop-sale-list-brand__opreation page-shop-sale-list__opreation"
      >
        <st-button
          type="primary"
          v-if="auth.add"
          icon="add"
          @click="addPersonalCourse"
        >
          新增私教课
        </st-button>
        <div>
          <a-select
            :defaultValue="-1"
            v-model="query.category_id"
            class="mg-r16"
            style="width: 160px"
            @change="onChange"
          >
            <a-select-option
              v-for="category in categoryList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.setting_name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-brand__table mg-t8">
      <list-table @delete-course="onDeleteCourse"></list-table>
    </main>
  </st-panel>
</template>

<script>
import ListTable from './list#/list-table'
import { RouteService } from '@/services/route.service'
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
      query: this.routeService.query$,
      auth: this.listService.auth$
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
    onDeleteCourse(id) {
      this.listService.deleteCourse(id).subscribe(() => {
        this.$router.push({ force: true })
      })
    },
    addPersonalCourse() {
      this.$router.push({ name: 'shop-product-course-manage-personal-add' })
    }
  }
}
</script>
