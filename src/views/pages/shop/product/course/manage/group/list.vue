<template>
  <st-panel :class="b()" app>
    <st-button type="primary" @click="goAddGroup">新建小班课</st-button>
    <div :class="b('action')">
      <st-input-search
        placeholder="团课名称"
        v-model="$searchQuery.course_name"
        @search="onSearchCourseName"
      />
      <a-select
        class="mg-r8"
        v-model="$searchQuery.course_status"
        style="width: 160px"
        @change="onChange"
      >
        <a-select-option v-for="item in []" :key="item.id" :value="item.id">
          {{ item.setting_name }}
        </a-select-option>
      </a-select>
    </div>

    <st-table
      rowKey="id"
      :loading="loading.getList"
      :dataSource="list"
      :columns="columns"
      @change="onTableChange"
      :page="page"
    ></st-table>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { columns } from './list.config'
export default {
  name: 'GroupCourseList',
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      auth: this.listService.auth$,
      loading: this.listService.loading$
    }
  },
  bem: {
    b: 'shop-product-course-manage-group-list'
  },
  data() {
    return {
      columns
    }
  },
  // computed: {
  //   columns
  // },
  methods: {
    goAddGroup() {
      this.$router.push({ path: './add' })
    },
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
  }
}
</script>
