<template>
<st-table
  class="mg-t16"
  rowKey="id"
  :columns="columns"
  :dataSource="teamCourseList"
  @change="onChange"
>
<template slot="course_name" slot-scope="text,record">
  <a href="javascript:;" v-if="record.auth['brand_shop:product:team_course|get']"  @click="onClickCourseInfo(record.id)">{{text}}</a>
  <span v-else>{{text}}</span>
</template>
<a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
<div slot="action" slot-scope="text,record">
  <a href="javascript:;" v-if="record.auth['brand_shop:product:team_course|get']" class="mg-r8" @click="onClickCourseInfo(record.id)">详情</a>
  <a href="javascript:;" v-if="record.auth['brand_shop:product:team_course|edit']" @click="onClickEditCourseInfo(record.id)">编辑</a>
  <st-more-dropdown style="margin-left: 12px;" v-if="record.auth['brand_shop:product:team_course|del']">
    <a-menu-item>
      <a-popconfirm  :title="'一旦删除则无法恢复，确认删除'+record.course_name+'？'" @confirm="onConfirmDeleteCourse(record)" okText="确定" cancelText="取消">
        删除
      </a-popconfirm>
    </a-menu-item>
  </st-more-dropdown>
</div>
</st-table>

</template>

<script>
import { columns } from './shop.config'
export default {
  name: 'TeamTableShop',
  data() {
    return {
      columns
    }
  },
  props: {
    teamCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange() {

    },
    onClickCourseInfo(course) {
      this.$router.push({
        name: 'shop-product-course-manage-team-info',
        query: {
          courseId: course.id
        }
      })
    },
    onClickEditCourseInfo(course) {
      this.$router.push({
        name: 'shop-product-course-manage-team-edit',
        query: {
          id: course.id
        }
      })
    },
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    }
  }
}
</script>

<style scoped>

</style>
