<template>
  <st-panel :class="b()" app>
    <div slot="title">
      <st-input-search
        placeholder="小班课名称"
        v-model="$searchQuery.course_name"
        @search="onSearchCourseName"
      />
    </div>
    <a-row>
      <a-col :span="8">
        <st-button type="primary" class="mg-b16" icon="add" @click="goAddGroup">
          新增小班课
        </st-button>
      </a-col>
      <a-col :span="16" class="ta-r">
        <a-select
          class="mg-r8"
          v-model="$searchQuery.course_status"
          style="width: 160px"
          @change="onChange"
        >
          <a-select-option
            v-for="item in status"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>

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
      loading: this.listService.loading$,
      status: this.listService.status$
    }
  },
  bem: {
    b: 'shop-product-course-manage-group-list'
  },
  data() {
    return {
      // columns
    }
  },
  computed: {
    columns
  },
  methods: {
    goAddGroup() {
      this.$router.push({ path: './add-select' })
    },
    onClickAddCourse() {
      this.$router.push({ name: 'shop-product-course-manage-team-add' })
    },
    onSearchCourseName(val) {
      this.$router.push({
        query: { course_name: this.$searchQuery.course_name }
      })
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
