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
    >
      <a slot="course_arrangement" slot-scope="text, record">
        {{ record.course_arrangement }}
      </a>
      <span slot="small_course_type" slot-scope="text, record">
        {{ record.small_course_type ? '固定排课' : '自主排课' }}
      </span>
      <span slot="course_status" slot-scope="text, record">
        {{ record.class_status | enumFilter('small_course.class_status') }}
      </span>
      <template slot="action" slot-scope="text, record">
        <st-table-actions>
          <a @click="onGoDetail(record)">
            详情
          </a>
          <a
            @click="onGoEdit(record)"
            v-if="
              record.course_status !== CLASS_STATUS.CLASS_FAILED ||
                record.course_status !== CLASS_STATUS.CLASS_END
            "
          >
            编辑
          </a>
          <a
            @click="onBeGroup(record)"
            v-if="record.course_status === CLASS_STATUS.SIGNING_UNCLASSED"
          >
            立即成班
          </a>
          <a
            @click="onGoOrder()"
            v-if="record.course_status === CLASS_STATUS.CLASS_FAILED"
          >
            去退款
          </a>
          <a
            v-if="
              record.course_status === CLASS_STATUS.UNPUBLISH ||
                record.course_status === CLASS_STATUS.PUBLISH_UNSTARTED ||
                record.course_status === CLASS_STATUS.SIGNING_UNCLASSED
            "
          >
            <st-popconfirm
              :title="
                '一旦删除则无法恢复，确认删除' + record.category_name + '？'
              "
              @confirm="onDelGroup(record)"
            >
              删除
            </st-popconfirm>
          </a>
        </st-table-actions>
      </template>
    </st-table>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import { columns } from './list.config'
import { CLASS_STATUS } from '@/constants/course/small-course'

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
      CLASS_STATUS
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
    onSearchCourseName(val) {
      this.$router.push({
        query: { course_name: this.$searchQuery.course_name }
      })
    },
    onChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    onDelGroup(course) {
      this.listService.deleteGroup(course.course_id).subscribe(() => {
        this.$router.reload()
      })
    },
    onGoOrder() {
      this.$router.push({
        path: '/shop/stat/order',
        query: this.$searchQuery
      })
    },
    onBeGroup(course) {
      this.listService.beGroup(course.course_id).subscribe(() => {
        this.$router.reload()
      })
    },
    onGoDetail(course) {
      this.$router.push({
        path: './info/basic',
        query: {
          courseId: course.course_id
        }
      })
    },
    onGoEdit(course) {
      this.$router.push({
        path: './edit',
        query: {
          id: course.course_id,
          type: course.small_course_type
        }
      })
    }
  }
}
</script>
