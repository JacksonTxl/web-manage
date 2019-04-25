<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="id"
      :columns="columns"
      :dataSource="teamCourseList"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
    <a href="javascript:;" slot="course_name" slot-scope="text,record"  @click="onClickCourseInfo(record)">{{text}}</a>
    <div slot="is_available" slot-scope="is_available">
        <span><a-badge :status="is_available === 1 ?'success':'error'" />{{is_available | enumFilter('personal_course.is_available')}}</span>
    </div>
    <a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
    <div slot="action" slot-scope="text,record">
      <a href="javascript:;" class="mg-r8" @click="onClickCourseInfo(record.id)">详情</a>
      <a href="javascript:;" @click="onClickEditCourseInfo(record)">编辑</a>
      <st-more-dropdown style="margin-left: 12px;">
          <a-menu-item>
            <a-popconfirm  :title="record.is_available.id === 0?'确认将'+record.course_name+'进行恢复':'当前课程不再支持购买、排课，确认将'+record.course_name+'置为无效'" @confirm="onConfirmSetAvailable(record)" @cancel="cancel" okText="确定" cancelText="取消">
            {{record.is_available.id === 1 ? "置为无效":"恢复有效"}}
            </a-popconfirm>
          </a-menu-item>

          <a-menu-item>
            <a-popconfirm  :title="'一旦删除则无法恢复，确认删除'+record.course_name+'？'" @confirm="onConfirmDeleteCourse(record)" okText="确定" cancelText="取消">
              删除
            </a-popconfirm>
          </a-menu-item>
        </st-more-dropdown>
    </div>
    </st-table>

</div>

</template>

<script>
import { columns } from './brand.config'
export default {
  name: 'TeamTableBrand',
  serviceInject() {
    return {
      brandService: BrandService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      teamCourseList: this.brandService.teamCourseList$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      columns,
      selectedRowKeys: []
    }
  },
  props: {
    teamCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onConfirmSetAvailable(record) {

    },
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    },
    onClickCourseInfo(val) {
      console.log(val)
      this.$router.push({ name: 'brand-product-course-team-info', query: { courseId: val } })
    },
    onClickEditCourseInfo(val) {
      console.log(val)
    },
    onChange() {

    }
  }
}
</script>

<style scoped>

</style>
