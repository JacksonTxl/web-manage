<template>
  <st-table
    class="mg-t16"
    rowKey="id"
    :columns="columns"
    :page="page"
    :dataSource="list"
    :scroll="{ x: 1440 }"
    :loading="loading.getList"
    @change="onTableChange"
  >
    <template slot="course_name" slot-scope="text, record">
      <a
        href="javascript:;"
        v-if="record.auth['brand_shop:product:team_course|get']"
        @click="onClickCourseInfo(record.id)"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
    </template>
    <a-rate
      slot="strength_level"
      slot-scope="strength_level"
      :defaultValue="strength_level"
      disabled
    />
    <div slot="action" slot-scope="text, record">
      <st-table-actions>
        <a
          href="javascript:;"
          v-if="record.auth['brand_shop:product:team_course|get']"
          class="mg-r8"
          @click="onClickCourseInfo(record.id)"
        >
          详情
        </a>
        <a
          href="javascript:;"
          v-if="record.auth['brand_shop:product:team_course|edit']"
          @click="onClickEditCourseInfo(record.id)"
        >
          编辑
        </a>

        <a href="javascript:;">
          <a-popconfirm
            :title="'一旦删除则无法恢复，确认删除' + record.course_name + '？'"
            @confirm="onConfirmDeleteCourse(record)"
            okText="确定"
            cancelText="取消"
          >
            删除
          </a-popconfirm>
        </a>
      </st-table-actions>
    </div>
  </st-table>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './shop.config'
import { ListService } from '../list.service'
import { RouteService } from '../../../../../../../../services/route.service'
export default {
  name: 'TeamTableShop',
  mixins: [tableMixin],
  data() {
    return {
      columns
    }
  },
  serviceInject() {
    return {
      service: ListService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      list: this.service.list$,
      page: this.service.page$,
      loading: this.service.loading$,
      query: this.routeService.query$
    }
  },
  methods: {
    onClickCourseInfo(id) {
      this.$router.push({
        name: 'shop-product-course-manage-team-info',
        query: {
          courseId: id
        }
      })
    },
    onClickEditCourseInfo(id) {
      this.$router.push({
        name: 'shop-product-course-manage-team-edit',
        query: {
          id
        }
      })
    },
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    }
  }
}
</script>
