<template>
  <st-panel app>
    <div slot="title">
      <st-input-search
        placeholder="团课名称"
        v-model="course_name"
        @search="onSearchCourseName"
      />
    </div>
    <a-row>
      <a-col :span="8">
        <st-button
          v-if="auth.add"
          type="primary"
          icon="add"
          @click="onClickAddCourse"
        >
          新增门店团体课程
        </st-button>
      </a-col>
      <a-col :span="16" class="ta-r">
        <a-select
          class="mg-r8"
          v-model="$searchQuery.category_id"
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
      </a-col>
    </a-row>
    <div>
      <shop-table @delete-course="deleteCourse"></shop-table>
    </div>
  </st-panel>
</template>
<script>
import ShopTable from './list#/shop-table'
import { ListService } from './list.service'
export default {
  name: 'TeamCourseList',
  serviceInject() {
    return {
      listService: ListService
    }
  },
  components: {
    ShopTable
  },
  rxState() {
    return {
      categoryList: this.listService.categoryList$,
      auth: this.listService.auth$
    }
  },
  data() {
    return {
      course_name: ''
    }
  },
  methods: {
    onClickAddCourse() {
      this.$router.push({ name: 'shop-product-course-manage-team-add' })
    },
    onSearchCourseName(val) {
      this.$router.push({ query: { course_name: this.course_name } })
    },
    onChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    deleteCourse(course) {
      this.listService.deleteCourse(course.id).subscribe(() => {
        this.$router.reload()
      })
    }
  },
  mounted() {
    this.$searchQuery.category_id = -1
  }
}
</script>
