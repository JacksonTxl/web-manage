<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="id"
      :page="page"
      :columns="columns"
      :dataSource="list"
      :scroll="{ x: 1440}"
      :loading="loading.getList"
      @change="onTableChange"
    >
    <a href="javascript:;" slot="course_name" slot-scope="text,record"  @click="onClickCourseInfo(record.id)">{{text}}</a>
    <div slot="is_available" slot-scope="is_available">
        <span><a-badge :status="is_available === 1 ?'success':'error'" />{{is_available | enumFilter('personal_course.is_available')}}</span>
    </div>
    <a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
    <!-- 操作 -->
    <div slot="action" slot-scope="text,record">
      <st-table-actions>
        <a href="javascript:;" v-if="record.auth['brand_shop:product:team_course|get']" class="mg-r8" @click="onClickCourseInfo(record.id)">详情</a>
        <a href="javascript:;" v-if="record.auth['brand_shop:product:team_course|edit']" @click="onClickEditCourseInfo(record.id)">编辑</a>
        <a-popconfirm  :title="'一旦删除则无法恢复，确认删除'+record.course_name+'？'" @confirm="onConfirmDeleteCourse(record)" okText="确定" cancelText="取消">
          删除
        </a-popconfirm>
      </st-table-actions>
    </div>
    </st-table>

</div>

</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './brand.config'
import { BrandService } from '../brand.service'
import { RouteService } from '../../../../../../../../services/route.service'
export default {
  name: 'TeamTableBrand',
  mixins: [tableMixin],
  serviceInject() {
    return {
      service: BrandService,
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
  data() {
    return {
      columns,
      selectedRowKeys: []
    }
  },
  methods: {
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    },
    onClickCourseInfo(id) {
      this.$router.push({
        name: 'brand-product-course-team-info',
        query: {
          courseId: id
        }
      })
    },
    onClickEditCourseInfo(id) {
      this.$router.push({
        name: 'brand-product-course-team-edit',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
