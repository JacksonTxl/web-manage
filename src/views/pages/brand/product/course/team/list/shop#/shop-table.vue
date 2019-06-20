<template>
<st-table
  class="mg-t16"
  rowKey="id"
  :columns="columns"
  :dataSource="teamCourseList"
  :scroll="{ x: 1300}"
  :alertSelection="{onReset: start}"
  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
  :pagination="pagination"
  @change="onChange"
>
<a href="javascript:;" slot="course_name" slot-scope="text,record"  @click="onClickCourseInfo(record.id)">{{text}}</a>
<a-rate slot="strength_level" slot-scope="strength_level" :defaultValue="strength_level" disabled />
<div slot="action" slot-scope="text,record">
  <a href="javascript:;" v-if="record.auth['brand_shop:product:team_course|get']" class="mg-r8" @click="onClickCourseInfo(record.id)">详情</a>
</div>
</st-table>

</template>

<script>
import { columns } from './shop.config'
export default {
  name: 'TeamTableShop',
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
    },
    page: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pagination() {
      return {
        pageSize: this.page.size,
        total: this.page.total_counts
      }
    }
  },
  methods: {
    start() {
      this.selectedRowKeys = []
    },
    onChange() {
      this.$router.push({ query: { page: val.current, size: val.pageSize || 20, ...this.$router.query } })
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
    },
    onConfirmDeleteCourse(record) {
      this.$emit('delete-course', record)
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('change', selectedRowKeys)
    }
  }
}
</script>

<style scoped>

</style>
