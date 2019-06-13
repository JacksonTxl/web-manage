<template>
<st-table
  class="mg-t16"
  rowKey="id"
  :columns="columns"
  :dataSource="teamCourseList"
  :scroll="{ x: 1300}"
  @change="onChange"
>
<a href="javascript:;" slot="course_name" slot-scope="text,record"  @click="onClickCourseInfo(record)">{{text}}</a>
<a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
<div slot="action" slot-scope="text,record">
  <a href="javascript:;" class="mg-r8" @click="onClickCourseInfo(record)">详情</a>
  <a href="javascript:;" @click="onClickEditCourseInfo(record)">编辑</a>
  <st-more-dropdown style="margin-left: 12px;">
    <!-- <a-menu-item>置为无效</a-menu-item>
    <a-menu-item>恢复有效</a-menu-item> -->

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
    onClickCourseInfo(val) {
      console.log(val)
    },
    onClickEditCourseInfo(val) {
      console.log(val)
    },
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    }
  }
}
</script>

<style scoped>

</style>
