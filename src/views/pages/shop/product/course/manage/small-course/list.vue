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
          v-model="$searchQuery.class_status"
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
      rowKey="course_id"
      :loading="loading.getList"
      :dataSource="list"
      :columns="columns"
      :scroll="{ x: 1800 }"
      @change="onTableChange"
      :page="page"
    >
      <a
        slot="course_arrangement"
        slot-scope="text, record"
        @click="goSchedule"
      >
        {{ record.course_arrangement }}
      </a>
      <span slot="small_course_type" slot-scope="text, record">
        {{
          record.small_course_type
            | enumFilter('small_course.small_course_type')
        }}
      </span>
      <span slot="course_status" slot-scope="text, record">
        {{ record.class_status | enumFilter('small_course.class_status') }}
      </span>
      <span slot="class_conditions">
        成班条件
        <!-- <st-help-tooltip id="TSCRM001" /> -->
      </span>
      <span slot="course_status">
        状态
        <!-- <st-help-tooltip id="TSCRM001" /> -->
      </span>
      <template slot="action" slot-scope="text, record">
        <st-table-actions>
          <a
            @click="onGoDetail(record)"
            v-if="record.auth['shop:product:small_class_course|get']"
          >
            详情
          </a>
          <a
            v-if="record.auth['shop:product:small_class_course|edit']"
            @click="onGoEdit(record)"
          >
            编辑
          </a>
          <a
            v-if="record.auth['shop:product:small_class_course|finish']"
            @click="onBeGroup(record)"
          >
            立即成班
          </a>
          <a
            v-if="record.auth['shop:product:small_class_course|publish']"
            @click="onPublish(record)"
          >
            发布
          </a>
          <a
            v-if="record.auth['shop:product:small_class_course|refund']"
            @click="onGoOrder()"
          >
            去退款
          </a>
          <a v-if="record.auth['shop:product:small_class_course|del']">
            <st-popconfirm
              :title="
                '一旦删除则无法恢复，确认删除' + record.course_name + '？'
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
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'SmallCourseList',
  mixins: [tableMixin],
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
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
    }
  },
  computed: {
    columns
  },
  methods: {
    goAddGroup() {
      this.$router.push({ path: './add-select' })
    },
    goSchedule() {
      this.$router.push({
        path: '/shop/product/course/schedule/small-course'
      })
    },
    onSearchCourseName(val) {
      this.$router.push({
        query: { course_name: this.$searchQuery.course_name }
      })
    },
    onChange() {
      this.$router.push({
        query: { current_page: 1, class_status: this.$searchQuery.class_status }
      })
    },
    onDelGroup(course) {
      this.listService.deleteGroup(course.course_id).subscribe(() => {
        this.$router.reload()
      })
    },
    onPublish(course) {
      this.listService.publish(course.course_id).subscribe(() => {
        this.$router.reload()
      })
    },
    onGoOrder(course) {
      this.$router.push({
        path: '/shop/finance/order/list',
        query: {
          course_id: course.course_id,
          course_type: course.small_course_type
        }
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
          courseId: course.course_id,
          status: course.class_status
        }
      })
    },
    onGoEdit(course) {
      this.$router.push({
        path: './edit',
        query: {
          id: course.course_id,
          type: course.small_course_type + ''
        }
      })
    }
  }
}
</script>
